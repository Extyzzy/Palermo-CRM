import axios from 'axios'
import state from './state'
import * as mutations from './mutations'

export default {
  namespaced: true,
  mutations,
  state,
  getters: {
    translations (state) {
      return state.translation
    },
    lang (state) {
      return state.lang
    },
    languages (state) {
      return state.languages
    },
    app (state) {
      return state.app
    },
  },
  actions: {
    fetchApplicationData ({ dispatch, commit, state }, lang) {
      dispatch('getInfoApp', lang);
      dispatch('fetchLanguages');
      dispatch('fetchTranslations', lang);
    },
    async getInfoApp({ dispatch }, lang) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          dispatch('fetchInitial', lang, pos.coords.latitude, pos.coords.longitude);
        }, err => {
          console.error(err.message);
        })
      }

      dispatch('fetchInitial', lang);
    },
    async fetchInitial({ commit, dispatch }, lang, lat = '', lng = '') {
      await axios.get(`${process.env.VUE_APP_API_URL}initial?lat=${lat}&lng=${lng}&lang=${lang}`)
        .then(data => {
          if (data.data.success) {
            commit('SET_APP_INFO', data.data)
          }
        })
    },
    async fetchLanguages ({ commit }) {
      try {
        const fetchLanguages = (await axios.get(`${process.env.VUE_APP_API_URL}information/languages-with-keys?keys=1`)).data.data;

        commit('LOAD_LANGUAGES', fetchLanguages)
      } catch (e) {
        console.error(e)
      }
    },
    async fetchTranslations ({ commit }, lang) {
      try {
        const fetchedTranslations = (await axios.get(process.env.VUE_APP_API_URL + `sitewordsadmin?lang=${lang}&min=1`)).data.data
        commit('LOAD_LANGUAGES_TRANSLATIONS', fetchedTranslations)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
