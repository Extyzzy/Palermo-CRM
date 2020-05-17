<template>
  <div>

    <div v-if="!credentials" class="home--container">
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

        <div>
          <div class="welcome">{{emailConfirm ? translations.trnsladm_success_email : translations.trnsladm_fail_success_email}}</div> <br />
          <div class="bottom-content">
            <Button
              @click="redirect()"
              :text="translations.trnsladm_continue"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="center">
      <div v-if="emailConfirm" class="welcome">{{translations.trnsladm_success_email}}</div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Button from './components/Button'

  export default {
    components: {Button},
    name: 'Home',
    data() {
      const credentials = localStorage.getItem('Credentials');
      return {
        role: this.$route.query.role,
        code: this.$route.query.code,
        emailConfirm: false,
        credentials: !!credentials
      }
    },
    mounted() {
      this.confirmEmail();
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
      redirect() {
        this.$router.push({ path: '/'})
      },
      async confirmEmail() {
        await this.axios.get(`${process.env.VUE_APP_API_URL}register/confirm/${this.role}/${this.code}`)
          .then(data => {
            if (data.data.success) {
              this.emailConfirm = true;
            }
          })
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom-content {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    justify-content: center;
  }
  .success-modal__submit {
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
    width: 400px;
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
