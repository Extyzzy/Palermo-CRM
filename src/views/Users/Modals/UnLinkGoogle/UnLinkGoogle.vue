<template>
  <div class="users-small-modal">
    <ButtonCloseModal />
    <p class="head-text">Отвязать профиль</p>
    <span class="sub-text">Привязанный профиль <b>Google</b> будет отвязан.</span>

    <div class="buttons">
      <span @click='submitDelete'>
        <Button text="Подтвердить "/>
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
    name: 'UnLinkGoogle',
    components: {
      Button,
      ButtonCloseModal
    },
    props: {
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      async submitDelete() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        await this.axios.delete(`${process.env.VUE_APP_API_URL}delete-google`,
          {
            headers: { Authorization: `Bearer ${credentials.access_token}` }
          })
          .then(data => {
            if (data.data.success) {
              this.$emit('close');
              this.$toast.open({
                message: `Вы успешно удалили ${this.usersIds.length} пользователя !`,
                type: 'success',
                duration: 3000
              });
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .users-small-modal {
    padding: 35px 45px 65px;
    position: relative;
    .head-text {
      color: $color--dark--blue;
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 30px;
    }
    .sub-text {
      color: $color--dark--blue;
      font-size: 12px;
      padding-bottom: 5px;
    }
  }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      width: 100%;
    }

    .text-entry-email {
      font-size: 12px;
      color: $color--dark--blue;
      margin-bottom: 10px;
    }
</style>
