import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en/index.js'
import ru from './ru/index.js'
import ro from './ro/index.js'

Vue.use(VueI18n);

export default new VueI18n({
  locale: `ru`,
  fallbackLocale: `ru`,
  messages: {
    ru, ro, en,
  }
});