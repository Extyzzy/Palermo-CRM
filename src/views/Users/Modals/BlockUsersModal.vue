<template>
  <div class="users-small-modal">
    <ButtonCloseModal />
    <p class="head-text">Заблокировать пользователей</p>
    <span class="sub-text">Заблокировать выбранное количество пользователей?</span>
    <p class="sub-text">Выбрано: <b>{{usersIds.length}}</b></p>

    <div class="buttons">
      <span @click='submitBlock()'>
        <Button  text="Подтвердить "/>
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
      },
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
      async submitBlock() {
        const buyers = this.users.filter(d => d.status_buyer !== null);
        const supplier = this.users.filter(d => d.status_supplier !== null);

        if (buyers) {
          this.fetchBlock(buyers, 'buyer');
        }

        if (supplier) {
          this.fetchBlock(supplier, 'supplier');
        }
      },
      async fetchBlock(user, status) {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        const {slug} = this.$store.state.user.info.actual_role;

        await this.axios.post(`${process.env.VUE_APP_API_URL}${slug}/users-block`, {},
          {headers: { Authorization: `Bearer ${credentials.access_token}` },
            params: {
              ids: user.map(d => d.id),
              status: status
            }
          })
          .then(data => {
            if (data.data.success) {
              this.$emit('close');
                this.$toast.open({
                  message: `Вы успешно заблокировали ${user.length} пользователей !`,
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
