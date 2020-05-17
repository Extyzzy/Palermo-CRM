<template>
  <div>
  <div v-if="isLoaded" class="user-container">
    <div class="user-info">

      <div class="image">
        <!--<img :src="`https://backend-dev.palermo.md` + user.image" />-->
        <ImagePreview
          :defaultImage="user.image"
          :changedImage="img => thumbnailFile = img"
        />
        <span class="sub-img-text">Привязанные социальные сети:</span>

        <span @click="unLinkGoogle" class="sub-img-text social-network">
          <svg xmlns="http://www.w3.org/2000/svg" width="29.002" height="29" viewBox="0 0 29.002 29">
            <g id="google-social" transform="translate(0.008)">
              <path id="Path_1324" data-name="Path 1324" d="M103.918,117.834A13.918,13.918,0,1,0,90,103.917,13.918,13.918,0,0,0,103.918,117.834Zm0-21.253a7.3,7.3,0,0,1,5.059,2.024l-1.735,1.821a4.821,4.821,0,1,0,1.33,4.749h-4.654V102.66h7.336v1.258a7.336,7.336,0,1,1-7.336-7.336Z" transform="translate(-89.423 -89.417)" fill="#8e9bad"/>
              <path id="Path_1325" data-name="Path 1325" d="M-.005,1.394V27.367A1.548,1.548,0,0,0,1.466,29H27.218a1.565,1.565,0,0,0,1.777-1.688V1.4A1.543,1.543,0,0,0,27.562,0H1.506A1.544,1.544,0,0,0-.005,1.394ZM14.495,3.4a11.1,11.1,0,1,1-11.1,11.1,11.1,11.1,0,0,1,11.1-11.1Z" fill="#8e9bad"/>
            </g>
          </svg>

          <span class="text-social">
            Отвязать профиль <i class="icon-close-button"></i>
          </span>
        </span>

      </div>
      <div class="form-user">
        <span class="general-info">Настройки</span>
        <form action="">
          <div v-if="user.my_language" class="container-input">
            <div class="label">Язык интерфейса</div>
            <Select
              :list="languages"
              :selected="user.my_language"
              multi="single"
              @changedValue="getLang"
            />
          </div>

          <div class="container-input">
            <div class="label">Статус Покупателя</div>
            <Input
              id="statusBuyer"
              v-model="user.status"
              placeholder=""
              autocomplete="off"
              type="text"
              :errorMessage="errors.hasOwnProperty('status') && errors.status[0]"
              required
            />
          </div>

          <div class="container-input">
            <div class="label">Статус Продавца</div>
            <Input
              id="status"
              v-model="user.status"
              placeholder=""
              autocomplete="off"
              type="text"
              :errorMessage="errors.hasOwnProperty('status') && errors.status[0]"
              required
            />
          </div>

          <div class="container-input">
            <div class="label">Роль в системе</div>
            <MultiSelect
              :list="[{id: 1, name: 'Владелец'}, {id: 2, name: 'Менеджер'},
                      {id: 3, name: 'Кладовщик'}, {id: 4, name: 'Бухгалтер'},
                      {id: 5, name: 'Курьер'}]"
              :selected="[{id: 1, name: 'Владелец'}, {id: 2, name: 'Менеджер'} ]"
              @changedValues="getRoles"
              notFoundMessage="Нет доступных ролей"
            />
          </div>

          <div class="container-input">
            <div class="label"></div>
            <div class="change-password-user"><span @click="changePassword()">Изменить пароль</span></div>
          </div>

          <div class="button-save">
            <Button
              text="Сохранить"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Input from '@/components/Form/Input.vue';
  import Button from '@/components/Form/Button.vue';
  import Select from '@/components/Form/Select.vue';
  import MultiSelect from '@/components/Form/MultiSelect.vue';
  import ImagePreview from '@/components/ImagePreview/ImagePreview.vue';
  import EmailModal from '../Modals/ChangeEmail/Modal.vue';
  import PasswordModal from '../Modals/ChangePassword/Modal.vue';
  import UnLinkGoogle from '../Modals/UnLinkGoogle/UnLinkGoogle.vue';

  export default {
    name: 'Settings',
    components: {
      Input,
      Select,
      MultiSelect,
      ImagePreview,
      Button
    },
    data() {
      return {
        id: parseInt(this.$route.query.id) || null,
        isLoaded: false,
        thumbnailFile: null,
        selectedLang: {},
        user: {
          email: '',
          phone: '',
          language: 'English'
        },
        errors: {},
      };
    },
    beforeCreate() {
      this.$router.replace({ name: "User", query: { id: this.$route.query.id, type: 'settings' }});
    },
    computed: {
      ...mapGetters({
        languages: 'app/languages',
        translations: 'app/translations',
        accessToken: 'user/accessToken',
        email: 'user/email',
      }),
    },
    updated() {
      this.user.email = this.email
    },
    methods: {
      unLinkGoogle() {
        this.$modal.show(UnLinkGoogle, {
          initialActiveScreen: 'email'
        }, {
          height: 'auto',
          width: 490
        })
      },
      async sendEmailConfirm() {
        const data = await this.axios.post(`${process.env.VUE_APP_API_URL}register-send-email-again?email=${this.user.email}&from=crm`);
        if (data.data.success) {
          this.$toast.open({
            message: `Письмо было отправлено ! Пожайлусто проверьте ваш Email.`,
            type: 'success',
            position: 'bottom-right',
            duration: 5000
          });
        }
      },
      changePassword () {
        this.$modal.show(PasswordModal, {
          initialActiveScreen: 'password'
        }, {
          height: 'auto',
          width: 490
        })
      },
      changeEmail () {
        this.$modal.show(EmailModal, {
          initialActiveScreen: 'email'
        }, {
          height: 'auto',
          width: 490
        })
      },
      getRoles(item) {
        console.info('Roles array =>', item);
      },
      getLang (item) {
        this.user.my_language = item;
      },
      async fetchUser() {

        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        await this.axios.get(`${process.env.VUE_APP_API_URL}admin/users?id=${this.id}`,
          {headers: { Authorization: `Bearer ${credentials.access_token}` }})
          .then(data => {
            if (data.data.success) {
              this.user = data.data.data;
              this.isLoaded = true
            } else {
              this.$toast.open({
                message: `Не удалось загрузить пользователя`,
                type: 'error'
              });
            }
          })
          .catch(e => {
            alert(e);
          });
      }
    },
    watch: {
      '$route.query': {
        immediate: true,
        handler(newVal) {
          this.id = newVal.id;
          this.fetchUser()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .confirm-link {
    display: block;
    font-size: 12px;
    cursor: pointer;
    color: $color--blue;
    margin-bottom: 10px;
    text-align: right;

    &:hover {
      text-decoration: underline;
    }
  }
  .change-password-user {
    margin-top: 20px;
    font-size: 12px;
    color: $color--dark--blue;
    text-align: left;
    cursor: pointer;
    width: 364px;

    &:hover {
      color: $color--blue
    }
  }
  .change-email {
    font-size: 12px;
    color: $color--light-gray;
    position: absolute;
    right: -110px;
    display: block;
    cursor: pointer;

    &:hover {
      color: $color--blue
    }
  }
  .sub-img-text {
    display: block;
    font-size: 12px;
    color: $color--dark--blue;
  }
  .label {
    color: $color--dark--blue;
    font-size: 12px;
  }
  .form-user {
    margin-left: 100px;
  }
  .container-input {
    margin-bottom: 15px;
    justify-content: space-between;
    width: 550px;
    display: flex;
    align-items: center;
    position: relative;

    .required {
      color: #F02C5A
    }
  }
  .user-container {
    padding: 0 30px;

    .general-info {
      color: $color--dark--blue;
      font-size: 14px;
      font-weight: 700;
    }

    .user-info {
      margin-top: 30px;
      display: flex;

      .image {
        width: 220px;
        height: 220px;

         img {
           width: 100%;
           height: 100%;
         }
      }
    }
  }
</style>
