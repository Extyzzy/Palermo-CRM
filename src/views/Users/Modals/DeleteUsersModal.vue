<template>
  <div class="users-small-modal">
    <ButtonCloseModal />
    <p class="head-text">Удалить пользователя</p>
    <span class="sub-text">Удалить выбранное количество пользователей ?</span>
    <p class="sub-text">Выбрано: <b>{{usersIds.length}}</b></p>

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
    name: 'DeleteUsersModal',
    components: {
      Button,
      ButtonCloseModal
    },
    props: {
      usersIds: {
        type: Array,
        required: true,
      }
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

        const {slug} = this.$store.state.user.info.actual_role;

        await this.axios.delete(`${process.env.VUE_APP_API_URL}${slug}/users`,
          {
            headers: { Authorization: `Bearer ${credentials.access_token}` },
            params: {
              ids: this.usersIds.map(d => parseInt(d))
            }
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
