<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue';

export default {
  data() {
    return {

    }
  },
  components: {
    DefaultLayout,
  },
  async beforeCreate () {
    let lang = navigator.language.toLocaleLowerCase().substring(0, 2);

    const langStorage = localStorage.getItem('language');

    if (langStorage) {
      lang =  localStorage.getItem('language');
    }

    await this.$store.commit('app/SET_LANG', lang);

    await this.$store.dispatch('app/fetchApplicationData', lang)

    const credentials = JSON.parse(localStorage.getItem('Credentials'));

    if (credentials) {
      this.$store.commit('user/LOAD_CREDENTIALS_USER', credentials);
      await this.$store.dispatch('user/auth_me', credentials.access_token)
      this.$store.commit('user/LOAD_IS_LOGIN', true);
    } else {
      switch (this.$router.currentRoute.path) {
        case '/forget-password':
          return this.$router.push({ path: '/forget-password'});
        case '/new-password':
          return this.$router.push({ path: '/new-password'});
        case '/success-confirm':
          return this.$router.push({ path: '/success-confirm'});
        case '/register':
          return this.$router.push({ path: '/register'});
        default:
          this.$router.push({ path: '/'});
      }
    }
  },
  computed: {
    layout() {
      return 'default-layout';
    },
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap');
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.notices .toast-error .toast-icon {
  background: url('./assets/icons/error.svg') no-repeat;
  display: block;
  width: 18px;
  min-width: 18px;
  height: 18px;
  margin: 0 10px;
}

.toast-error {
  background-color: #FDE1ED !important;
  color: #AF0007 !important;
  box-shadow: 0 0 10px rgba(175,0,7,0.3) !important;
}

.notices .toast-warning .toast-icon {
  background: url('./assets/icons/warn.svg') no-repeat;
  display: block;
  width: 18px;
  min-width: 18px;
  height: 18px;
  margin: 0 10px;
}

.toast-warning {
  background-color: #FFF3E0 !important;
  color: #684600 !important;
  box-shadow: 0 0 10px rgba(104,70,0,0.3) !important;
}

.notices .toast-info .toast-icon {
  background: url('./assets/icons/info.svg') no-repeat;
  display: block;
  width: 18px;
  min-width: 18px;
  height: 18px;
  margin: 0 10px;
}

.toast-info {
  background-color: #E3F2FD !important;
  color: #2452A1 !important;
  box-shadow: 0 0 10px rgba(36,82,161,0.3) !important;
}

.notices .toast-success .toast-icon {
  background: url('./assets/icons/success.svg') no-repeat;
  display: block;
  width: 18px;
  min-width: 18px;
  height: 18px;
  margin: 0 10px;
}

.notices .toast .toast-text {
  padding: .5em 1em .5em 0.2em;
}

.toast {
  width: 392px;
  font-family: 'Open Sans', sans-serif;
}
.toast-success {
  background-color: #E8F5E9 !important;
  color: #016E3B !important;
  box-shadow: 0 0 10px rgba(1,110,59,0.3) !important;
}
.notices.is-top {
  top: 30px !important;
}

input:-webkit-autofill {
  background-color: white !important;
  color: #3B4B68
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #3B4B68 !important;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
button,
input,
html,
select {
  font-family: 'Open Sans', sans-serif;
  outline: none;
}

a {
  text-decoration: none;
}

body {
  overflow-x: hidden;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

input[type=search]::-webkit-search-cancel-button,
input[type=search]::-webkit-search-decoration,
input[type=search]::-webkit-search-results-button,
input[type=search]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
input[type=search] {
  -webkit-appearance: textfield;
}

ol, ul {
  list-style-type: none;
}

span > svg {
  display: inline-flex;
}

#app {
  font-family: 'Open Sans', sans-serif;
}
</style>
