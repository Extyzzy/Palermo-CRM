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
        class="large-screen-logo"
      >
        <h1 class="side-bar__palermo">
          <span class="side-bar__palermo--gray">Palermo</span>CRM
        </h1>
      </router-link>
      <div v-if="!successRegistration">
      <span class="welcome">{{translations.trnsladm_register_welcome}}</span>
      <span class="mini-text">{{translations.trnsladm_all_inputs}}</span>

      <form @submit.prevent="onSubmit" class="form__admin">
        <div class="auth-container">
          <InputAuth
            id="name"
            v-model="name"
            :labelText="translations.trnsladm_your_name_required"
            autocomplete="off"
            type="text"
            :errorMessage="errors.hasOwnProperty('name') && errors.name[0]"
          />
        </div>
        <div class="auth-container">
          <InputPhones
            v-if="mobileRegistration"
            id="phone"
            :defaultCode="defaultCodeCountry"
            :maxLength="maxLength"
            :allCodesCountry="allCodesCountry"
            v-model="phone"
            :labelText="translations.trnsladm_your_phone_required"
            autocomplete="off"
            @updateDefaultCode="updateDefaultCode"
            @number="number"
            @changeDefaultCode="changeDefaultCode"
            :errorMessage="errors.hasOwnProperty('phone') && errors.phone[0]"
          />
          <InputAuth
            v-else
            id="email"
            v-model="email"
            :labelText="translations.trnsladm_your_email_required"
            autocomplete="off"
            type="text"
            :errorMessage="errors.hasOwnProperty('email') && errors.email[0]"
          />
        </div>

        <p @click='mobileEntry' class="change-type-registration">
          {{mobileRegistration ?  translations.trnsladm_register_email : translations.trnsladm_register_phone}}
        </p>

        <div class="auth-container">
          <InputAuth
            id="password"
            v-model="password"
            :labelText="translations.trnsladm_new_password"
            autocomplete="off"
            type="password"
            :errorMessage="errors.hasOwnProperty('password') && errors.password[0]"
            :subtext="translations.trnsladm_password_subtext"
          />
        </div>
        <div class="auth-container">
          <InputAuth
            id="confirmPassword"
            v-model="confirmPassword"
            :labelText="translations.trnsladm_confirm_password"
            autocomplete="off"
            type="password"
            :errorMessage="errors.hasOwnProperty('password_confirmation') && errors.password_confirmation[0]"
            :subtext="translations.trnsladm_password_subtext"
          />
        </div>
        <div class="captcha">
          <reCaptcha
            :sitekey="sitekey"
            :callback="onVerify"
          />
          <p v-if="errors.hasOwnProperty('captcha')" class="error">{{translations.trnsladm_captcha_not_robot}}</p>
        </div>

        <div class="google-auth" @click="authGoogle">{{translations.trnsladm_register_via}}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <path id="google-plus" d="M0,0V30H30V0ZM15.078,22.594a7.594,7.594,0,1,1,0-15.189,7.034,7.034,0,0,1,5.1,2.061L18.116,11.42a4.18,4.18,0,0,0-3.038-1.193,4.775,4.775,0,0,0,0,9.547,4.166,4.166,0,0,0,4.34-3.255h-4.34v-2.6h7.16a4.862,4.862,0,0,1,.109,1.3A6.977,6.977,0,0,1,15.078,22.594Z" fill="#8e9bad" fill-rule="evenodd"/>
          </svg>
        </div>

        <Button
          @click="registerUser()"
          :text="translations.trnsladm_create_account"
          :isLoading="isLoading"
          :disabled="isDisable()"
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
        <div class="welcome">{{translations.trnsladm_thank_for_registration}}</div>
        <div style='margin: 10px 0' class="mini-text">
          <span v-if="!mobileRegistration">{{translations.trnsladm_send_email}}</span>
        </div>
        <Button
          @click="loginUser()"
          :text="translations.trnsladm_continue"
          :isLoading="isLoading"
        />

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InputAuth from '@/components/Form/InputAuth'
  import InputPhones from '@/components/Form/InputPhones'
  import reCaptcha from './reCaptcha';
  import Button from './components/Button'

  export default {
    components: {InputAuth, InputPhones,  reCaptcha, Button},
    name: 'Home',
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        recaptchaToken: '',
        mobileRegistration: false,
        successRegistration: false,
        isLoading: false,
        errors: {},
        successCaptcha: false,
        allCodesCountry: [],
        defaultCodeCountry: null,
        maxLength: null,
        sitekey: process.env.VUE_APP_CAPTCHA_KEY,
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
      isDisable() {
        const {name, email, phone, password, confirmPassword, mobileRegistration} = this;

        return (mobileRegistration ? phone === '' : email === '') ||
          name === '' || password === '' || confirmPassword === ''
      },
      async mobileEntry() {
        this.mobileRegistration = !this.mobileRegistration

        await this.axios.get(`${process.env.VUE_APP_API_URL}information/phone-codes?city_id=${this.$store.state.app.api.city_id}&lang=${this.$store.state.app.lang}&unlisted_country=${this.$store.state.app.api.unlisted_country}`)
          .then(data => {
            if (data.data.success) {
              this.defaultCodeCountry = data.data.data.thisCode;
              this.maxLength = data.data.data.thisLength;
              this.allCodesCountry = data.data.data.allCodes;
              console.info(this.allCodesCountry);
            }
          })
      },
      changeDefaultCode(code) {
        this.defaultCodeCountry = code.code_num;
        this.maxLength = code.code_length;
      },
      updateDefaultCode(code) {
        this.defaultCodeCountry = code;
      },
      number(number) {
        this.phone = number;
      },
      async onVerify(response) {
        if (response) {
        this.recaptchaToken =  response;
        this.successCaptcha = true;
        }
      },
      authGoogle() {
        this.$gAuth.signIn()
          .then(async GoogleUser => {
            const profile = await GoogleUser.getBasicProfile();
            const googleResponse = await GoogleUser.getAuthResponse();

            console.info(`FOR BACK`, googleResponse);

            const formData = new FormData();
            formData.append(`email`, profile.yu);
            formData.append(`name`, profile.Ad);
            formData.append(`image`, profile.hasOwnProperty('QK') ? profile.QK : profile.fL);
            formData.append(`lang`, this.$store.state.app.lang);
            formData.append(`google_id`, GoogleUser.getId());
            formData.append(`from`, "crm");

            await this.axios.post(`${process.env.VUE_APP_API_URL}auth/login/google`, formData)
              .then(async data => {

                console.info(`BACK_RESPONSE`, data);

                if (data.data.success) {
                  await this.$store.dispatch('user/auth_me', data.data.access_token)

                  localStorage.setItem('Credentials', JSON.stringify(data.data));
                  this.$store.commit('user/LOAD_CREDENTIALS_USER', data.data);
                  this.$store.commit('user/LOAD_IS_LOGIN', true);

                  return this.$router.push({ path: '/main'})
                }
              });
          })
          .then(response => {
            //after ajax
            console.info(`after ajax`, response);
          })
          .catch(error => {
            //on fail do something
          })
      },
      async switchLang(lang) {
        await this.$store.dispatch('app/fetchTranslations', lang);
        this.$store.commit('app/SET_LANG', lang);
      },
      async loginUser() {
        this.isLoading = true;
        const formData = new FormData();
        if (this.mobileRegistration) {
          formData.append(`phone`, this.defaultCodeCountry + this.phone);
        } else {
          formData.append(`email`, this.email);
        }
        formData.append(`password`, this.password);
        formData.append(`lang`, this.$store.state.app.lang);
        formData.append(`logined_in`, "crm");

        await this.$store.dispatch('user/login', formData)
          .then(data =>  {
            this.isLoading = false;
            this.errors = data.data.errors;
          })
      },
      async registerUser() {
        this.isLoading = true;
        const formData = new FormData();

        if (this.mobileRegistration) {
          formData.append(`phone`, this.defaultCodeCountry + this.phone);
        } else {
          formData.append(`email`, this.email);
        }

        formData.append('name', this.name);
        formData.append('password', this.password);
        formData.append(`lang`, this.$store.state.app.lang);
        formData.append('password_confirmation', this.confirmPassword);
        formData.append(`from`, "crm");
        formData.append('recaptcha_token', this.recaptchaToken);

        await this.axios.post(`${process.env.VUE_APP_API_URL}register`, formData)
          .then(async data => {
            this.isLoading = false;
            if (data.data.success) {
              this.successRegistration = true;
            } else {
              this.errors = data.data.errors;

              if (!this.successCaptcha) {
                this.errors.captcha = true
              }
            }
          })
          .catch(e => {
              this.isLoading = false;
              this.errors = e.response.data.errors;
              if (!this.successCaptcha) {
                this.errors.captcha = true
              }
          });
      },
    },
  };
</script>

<style
  lang="scss"
>
  .error {
    color: $color-amaranth;
    font-size: 12px;
    margin-top: 5px;
  }
  @media only screen and (max-height: 750px) {
    .form__admin {
      padding-top: 15px !important;
    }
    .large-screen-logo {
      position: absolute;
      top: -15px;
      right: 40px;
    }
  }
  @media only screen and (max-height: 800px) {
    .change-type-registration {
      margin-bottom: 20px !important;
      margin-top: -10px;
    }
    .google-auth {
      margin: 10px 0;
    }
    .captcha{
      margin-top: -5px;
      height: auto;
    }
    .bottom-content {
      margin-top: 15px !important;
    }
  }
  .google-auth {
    margin: 20px 0;
    color: $color--dark--blue;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-left: 10px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  .change-type-registration {
    font-size: 12px;
    color: $color--blue;
    margin-bottom: 30px;
    cursor: pointer;
    text-align: left;

    &:hover {
      text-decoration: underline;
    }
  }
  .captcha {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100px;
  }
  .auth {
    width: 500px !important;
  }
  .activeLinkNavigator {
    color: #3B4B68 !important;
    font-weight: 600;
  }
  .languages__admin {
    align-items: center;
    display: flex;
    color: $color--light-gray !important;
    margin: 0 auto;
  }
  .languages__admin > span {
    text-decoration: none;
    color: $color--light-gray;
    cursor: pointer;
    font-size: 12px;
  }
  .languages__change-language,
  .languages__change-language:focus,
  .languages__change-language:link,
  .languages__change-language:visited {
    color: $color--light-gray;
    text-decoration: none;
  }
  .languages__vertical-separator {
    background-color: #3B4B68;
    display: inline-flex;
    height: 9px;
    margin: 0 9px 0 5px;
    width: 1px;
  }
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
    margin-top: 30px;
    margin-bottom: 10px;
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
    margin-top: 40px;
    margin-bottom: -15px;
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
