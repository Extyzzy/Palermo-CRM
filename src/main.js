import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueI18n from "vue-i18n";
import VModal from 'vue-js-modal'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import GAuth from 'vue-google-oauth2'
import wysiwyg from "vue-wysiwyg";

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from "./i18n/index.js";

const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(wysiwyg, {
  maxHeight: "300px",
  //iconOverrides: { "bold": `<i class="icon-half-filled-rating-star"></i>` },
});

Vue.use(GAuth, gauthOption)

Vue.use(VueToast, {
  // One of options
  position: 'top-right'
})
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) {
        warn += `Found in component '${compName}'`
      }

      console.warn(warn)
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
  },
  unbind: function (el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
});

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
