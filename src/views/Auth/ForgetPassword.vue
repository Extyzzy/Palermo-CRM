<template>
  <div class="home--container">
    <div class="content">
    </div>
    <div class="auth">
      <div class="languages__admin">
       <span
         :class="{ activeLinkNavigator: $store.state.app.lang === lang.code}"
         @click="switchLang(lang.code)"
         class="languages__change-language"
         v-for="lang in $store.state.app.languages"
         v-bind:key="lang.id"
       >{{lang.code.toUpperCase()}}
           <span v-if="lang.id !== $store.state.app.languages[$store.state.app.languages.length - 1].id" class="languages__vertical-separator" />
         </span>
      </div>
      <router-link
        to="/"
      >
        <h1 class="side-bar__palermo">
          <span class="side-bar__palermo--gray">Palermo</span>CRM
        </h1>
      </router-link>
      <div v-if="!forgotPasswordSuccess">

      <span class="welcome">{{translations.trnsladm_reset_password}}</span> <br />
      <span class="mini-text">{{translations.trnsladm_reset_password_subtext}}</span>

      <form @submit.prevent="forgetPass" class="form__admin">
        <div class="auth-container">
          <InputAuth
            id="email"
            v-model="email"
            :labelText="translations.trnsladm_your_email_required"
            autocomplete="off"
            type="text"
            :errorMessage="errors.hasOwnProperty('email') && errors.email[0]"
          />
        </div>

          <Button
          :text="translations.trnsladm_send"
          :isLoading="isLoading"
          :disabled="email === ''"
        />

        <div class="bottom-content">
          <span class="mini-text">{{translations.trnsladm_back_to}}</span>
          <router-link
            to="/"
          >
            <span style="margin-left: 5px" class="forget-password">{{translations.trnsladm_login}}</span>
          </router-link>
        </div>
      </form>
      </div>
      <div v-else>
        <div class="welcome">{{translations.trnsladm_reset_password}}</div> <br />
        <div class="mini-text">{{translations.trnsladm_send_email_instructions}}</div>

        <div style="margin-top: 50px" class="bottom-content">
          <span class="mini-text">{{translations.trnsladm_back_to}}</span>
          <router-link
            to="/"
          >
            <span style="margin-left: 5px" class="forget-password">{{translations.trnsladm_login}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InputAuth from '@/components/Form/InputAuth'
  import Button from './components/Button'

  export default {
    components: {InputAuth, Button},
    name: 'Home',
    data() {
      return {
        email: this.$route.query.email || '',
        forgotPasswordSuccess: false,
        isLoading: false,
        errors: {}
      }
    },
    mounted() {
      const credentials = localStorage.getItem('Credentials');

      if (credentials && credentials !== undefined) {
        return this.$router.push({ path: '/main'})
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      async switchLang(lang) {
        await this.$store.dispatch('app/fetchTranslations', lang);
        this.$store.commit('app/SET_LANG', lang);
      },
      async forgetPass() {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('email', this.email);
        formData.append('lang', this.$store.state.app.lang);

        await this.axios.post(`${process.env.VUE_APP_API_URL}forgot-password`, formData)
          .then(data => {
            if (data.data.success) {
              this.isLoading = false;
              this.forgotPasswordSuccess = true;
            } else {
              this.isLoading = false;
              this.errors = data.data.errors
            }
          })
          .catch(e => {
            this.isLoading = false;
            this.errors = e.response.data.data
          });
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .bottom-content {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    justify-content: center;
  }
  .authorization-modal__submit {
    background-color: #e0e4ed;
    border: none;
    border-radius: 20px;
    color: $color--light-gray;
    cursor: pointer;
    font-family: Open Sans,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 12px 35px;
    text-transform: uppercase;
    width: 100%;
    margin-top: 20px;

    &:hover {
      background-color: $color--light-gray;
      color: #fff;
    }
  }

  .forget-password {
    color: $color--blue;
    font-size: 12px;
    cursor: pointer;
    display: block;
    text-align: right;

    &:hover {
      text-decoration: underline;
    }
  }
  .form__admin {
    padding-top: 30px;
    margin: 0 auto;

    .form__input {
      padding: 12px 15px !important;
    }
  }

  .mini-text {
    color: #3B4B68;
    font-size: 12px;
    display: block;
  }
  .welcome {
    color: #3B4B68;
    font-size: 18px;
    font-weight: 700;
    margin-top: 50px;
    display: block;
  }
  .auth {
    width: 500px !important;
  }
  .content {
    width: calc(100% - 500px);
    box-shadow: 0 0 10px rgba(59, 75, 104, 0.25);
    z-index: 2;
  }
  .auth {
    z-index: 1;
    width: 30%;
    background-color: white;
    padding: 0 40px;
    padding-top: 30px;
    text-align: center;
  }
  .side-bar__palermo {
    color: $color--light-gray;
    font-size: 24px;
    font-weight: 300;
  }

  .side-bar__palermo--gray {
    color: #3B4B68;
    font-weight: 700;
  }

  .home--container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
    background-color: white;
  }
</style>
