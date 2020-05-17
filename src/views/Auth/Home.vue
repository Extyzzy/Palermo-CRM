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

      <span class="welcome">{{translations.trnsladm_welcome}} !</span>
      <span class="mini-text">{{translations.trnsladm_hello}}</span>

      <form @submit.prevent="loginUser" class="form__admin">
        <div class="auth-container">
          <InputPhones
            v-if="mobileRegistration"
            id="phone"
            :defaultCode="defaultCodeCountry"
            :maxLength="maxLength"
            :allCodesCountry="allCodesCountry"
            :value="phone"
            :labelText="translations.trnsladm_your_phone_required"
            autocomplete="off"
            @changeDefaultCode="changeDefaultCode"
            @updateDefaultCode="updateDefaultCode"
            @number="number"
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
          {{mobileRegistration ?  translations.trnsladm_entry_email : translations.trnsladm_entry_phone}}
        </p>
        <div class="auth-container">
          <InputAuth
            id="password"
            v-model="password"
            :labelText="translations.trnsladm_your_password"
            autocomplete="off"
            type="password"
            :errorMessage="errors.hasOwnProperty('password') && errors.password[0]"
          />
        </div>
        <router-link
          :to="{ path: '/forget-password', query: { email: email }}"
        >
          <span class="forget-password">{{translations.trnsladm_forget_password}} ?</span>
        </router-link>

        <div class="google-auth" @click="authGoogle">{{translations.trnsladm_entry_via}}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
          <path id="google-plus" d="M0,0V30H30V0ZM15.078,22.594a7.594,7.594,0,1,1,0-15.189,7.034,7.034,0,0,1,5.1,2.061L18.116,11.42a4.18,4.18,0,0,0-3.038-1.193,4.775,4.775,0,0,0,0,9.547,4.166,4.166,0,0,0,4.34-3.255h-4.34v-2.6h7.16a4.862,4.862,0,0,1,.109,1.3A6.977,6.977,0,0,1,15.078,22.594Z" fill="#8e9bad" fill-rule="evenodd"/>
        </svg>
        </div>

        <Button
          :text="translations.trnsladm_entry"
          :isLoading="isLoading"
          :disabled="(password === '' || (mobileRegistration ? phone === '' :
          email === ''))"
        />

        <div class="bottom-content">
          <span class="mini-text">{{translations.trnsladm_have_account}} ?</span>
          <router-link
            to="/register"
          >
            <span style="margin-left: 5px" class="forget-password">{{translations.trnsladm_register}}</span>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InputAuth from '@/components/Form/InputAuth'
  import InputPhones from '@/components/Form/InputPhones'
  import Button from './components/Button'

  export default {
    components: {InputAuth, InputPhones, Button},
    name: 'Home',
    data() {
      return {
        email: '',
        password: '',
        phone: '',
        errors:  {},
        mobileRegistration: false,
        allCodesCountry: [],
        defaultCodeCountry: null,
        maxLength: null,
        isLoading: false,
      }
    },
    async mounted() {
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
      async mobileEntry() {
        this.mobileRegistration = !this.mobileRegistration

        await this.axios.get(`${process.env.VUE_APP_API_URL}information/phone-codes?city_id=${this.$store.state.app.api.city_id}&lang=${this.$store.state.app.lang}&unlisted_country=${this.$store.state.app.api.unlisted_country}`)
          .then(data => {
            if (data.data.success) {
              this.defaultCodeCountry = data.data.data.thisCode;
              this.maxLength = data.data.data.thisLength;
              this.allCodesCountry = data.data.data.allCodes;
            }
          })
      },
      authGoogle() {
        this.$gAuth.signIn()
          .then(async GoogleUser => {

            console.info(GoogleUser);

            console.info(`BasicProfile =>`, GoogleUser.getBasicProfile());
            console.info(`AuthResponse =>`, GoogleUser.getAuthResponse());

            const profile = await GoogleUser.getBasicProfile();

            const formData = new FormData();
            formData.append(`email`, profile.yu);
            formData.append(`name`, profile.Ad);
            formData.append(`lang`, this.$store.state.app.lang);
            formData.append(`image`, profile.hasOwnProperty('QK') ? profile.QK : profile.fL);
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
      updateDefaultCode(code) {
        this.defaultCodeCountry = code;
      },
      changeDefaultCode(country) {
        this.defaultCodeCountry = country.code_num;
        this.maxLength = country.code_length;
      },
      number(number) {
        this.phone = number;
      },
      async switchLang(lang) {
        await this.$store.dispatch('app/fetchTranslations', lang);
        this.$store.commit('app/SET_LANG', lang);
      },
      async loginUser() {
        this.isLoading = true
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
    },
  };
</script>

<style
  lang="scss"
  scoped
>
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
  .bottom-content {
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    justify-content: center;
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
