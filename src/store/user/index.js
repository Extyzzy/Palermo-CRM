import axios from 'axios'
import state from './state'
import * as mutations from './mutations'
import router from '../../router'

export default {
  namespaced: true,
  mutations,
  state,
  getters: {
    translations (state) {
      return state.translation
    },
    info (state) {
      return state.info
    },
    avatar (state) {
      return state.avatar
    },
    email (state) {
      return state.info.user.email
    },
    permissions (state) {
      return state.permissions
    },
    accessToken (state) {
      return state.credentials.access_token
    },
    availableRoles (state) {
      return state.availableRoles
    },
  },
  actions: {
    async fetchAvailableRoles({ dispatch, commit, state }) {
      let roles = [];

      const {slug} = state.info.actual_role;

      await axios.get(`${process.env.VUE_APP_API_URL}${slug}/roles`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${state.credentials.access_token}`
          }},)
        .then( async data => {
          await commit('SET_AVAILABLE_ROLES', data.data.data);
          roles = data.data.data
        })
        .catch(async e => {
          console.error(e);
        });
      return roles
    },
    async auth_me({ dispatch, commit, state }, accessToken) {
      axios.defaults.withCredentials = true;
      await axios.get(`${process.env.VUE_APP_API_URL}information/me`,
        {headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        }},)
        .then( async data => {
          if (data.status === 401) {
            dispatch('logout')
          }

          await commit('SET_PERMISSIONS', data.data.data.role_permission);
          await commit('LOAD_USER_INFO', data.data.data);
          await commit('SET_AVATAR', data.data.data.user.image);
        })
        .catch(async e => {
          console.error(e);
          dispatch('logout')
        })
    },
    async login({ dispatch, commit, state }, formData) {
      let errors = null;

      await axios.post(`${process.env.VUE_APP_API_URL}auth/login`, formData)
        .then(async data => {
          if (data.status === 200) {
            await dispatch('auth_me', data.data.access_token);
            localStorage.setItem('Credentials', JSON.stringify(data.data));

            commit('LOAD_CREDENTIALS_USER', data.data);
            commit('LOAD_IS_LOGIN', true);

            if (errors) {
              return errors
            } else {
              return router.push({ path: '/main'})
            }
          } else {
            console.info('Error message:', data);
            return errors
          }
        })
        .catch(error => {
          const {response} = error;
          errors = response;
        });

      if (errors)  {
        return errors
      }

      return router.push({ path: '/'})
    },
    async logout({ dispatch, commit, state }) {
      await axios.post(`${process.env.VUE_APP_API_URL}auth/logout`,{},
        {headers: { Authorization: `Bearer ${state.credentials.access_token}` }})
        .catch(e => {
          console.error(e);
        });

      localStorage.removeItem('Credentials');
      commit('LOAD_IS_LOGIN', false);
      commit('LOAD_CREDENTIALS_USER', null);
      commit('LOAD_USER_INFO', {});
      return router.push({ path: '/'})
    }
  }
}
