<template>
  <div class="users-small-modal">
    <ButtonCloseModal />
    <p class="head-text">Отправить сообщение на E-mail</p>
    <div v-bind:style="{  maxHeight: show ? '200px' : null }" class="container-users-email">
      <span class="sub-text">Получатели: </span>
      <span class="sub-text" v-bind:key="index" v-for="(data, index) in usersState">
      {{data.email}} <span v-if=" usersState[usersState.length - 1].id !== data.id">, </span>
    </span>

    <span v-if="(users.length - usersState.length !== 0) && users.length > 3"
          class="show-more"
          @click="showMore">
        еще {{users.length - usersState.length }} получателей
    </span>
    </div>

    <p  @click="showLess"
         class="show-more"
         v-if="show && users.length - usersState.length === 0">
      Скрыть получателей</p>

    <div class="editor">
      <div class="sub-text flex"><p>Тема:</p> <input v-model="subject" class="head-text-input" type="text" /></div>

      <p class="error air" v-if="errors['subject']" v-html="errors['subject'] && errors['subject'][0]"></p>
      <p class="sub-text">Текст сообщения:</p>
      <wysiwyg v-model="myHTML" />
    </div>
    <p class="error" v-if="errors['body']" v-html="errors['body'] && errors['body'][0]"></p>

    <div class="buttons-emails">
      <span @click='sendEmails()'>
        <Button  :disabled="subject && myHTML === ''"
                 text="Отправить "/>
        </span>

        <span @click="$emit('close')">
          <Button cancel text="Отмена "/>
        </span>
    </div>

  </div>
</template>

<script>
  import Button from '@/components/Form/Button'
  import ButtonCloseModal from '@/components/ButtonCloseModal.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DeleteUsersModal',
    components: {
      Button,
      ButtonCloseModal
    },
    props: {
      users: {
        type: Array,
        required: true,
      }
    },
    data () {
      console.info(this.users);
      return {
        myHTML: '',
        subject: '',
        usersState: this.users.slice(0,3),
        show: false,
        errors: []
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    mounted() {
      document.getElementsByClassName("editr--content")[0].setAttribute("placeholder", "Введите текст");
    },
    methods: {
      showLess() {
        this.usersState = this.users.slice(0,3);
        this.show = false
      },
      showMore() {
        this.usersState = this.users;
        this.show = true
      },
      async sendEmails() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));
        const {lang} = this.$store.state.app;
        const {slug} = this.$store.state.user.info.actual_role;

        const formData = new FormData();
        formData.append(`subject`, this.subject);
        formData.append(`body`, this.myHTML);
        formData.append(`lang`, lang);

        this.users.map(d => {
          formData.append(`recipients[]`, d.email);
        });

        await this.axios.post(`${process.env.VUE_APP_API_URL}${slug}/email`, formData,
          {headers: { Authorization: `Bearer ${credentials.access_token}` }})
          .then(data => {
            if (data.data.success) {
              this.$emit('close');
                this.$toast.open({
                  message: `Письмо(а) успешно отправлено`,
                  type: 'success',
                  duration: 3000
                });
            } else {
              this.errors = data.data.message
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .flex {
    display: flex;
    align-items: center;
  }
  .container-users-email {
    overflow: scroll;
  }
  .air {
    position: absolute;
    top: 41px;
    left: 46px;
  }
  .error {
    color: $color-amaranth;
    font-size: 12px;
    margin-top: 5px;
  }
  .editor {
    margin-top: 10px;
    position: relative;
  }
  .users-small-modal {
    padding: 35px 45px 65px;
    position: relative;

    .head-text-input {
      border-radius: 5px;
      border: 1px solid $color--light-gray;
      width: 100%;
      height: 35px;
      padding: 5px 10px;
      margin: 10px 0;
      margin-left: 10px;
      color: $color--dark--blue;
    }

    .head-text {
      color: $color--dark--blue;
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 30px;
    }
    .sub-text {
      color: $color--dark--blue;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .show-more {
      color: $color--light-gray;
      font-size: 12px;

      &:hover {
        color: $color--blue;
        cursor: pointer;
      }
    }
  }

    .buttons-emails {
      display: flex;
      margin-top: 30px;
      width: 100%;

       span {
         margin-right: 30px;
       }
    }

    .text-entry-email {
      font-size: 12px;
      color: $color--dark--blue;
      margin-bottom: 10px;
    }
</style>
