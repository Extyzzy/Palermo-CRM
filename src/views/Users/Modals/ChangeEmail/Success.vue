<template>
  <div>
    <span class="succes-email-conirm">E-mail: <b>{{email}}</b> успешно подтвержден.</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SuccessModal',
    props: {
      email: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    mounted() {
      this.$store.commit('user/SET_EMAIL', this.email);
    }
  }
</script>

<style lang="scss" scoped>
  .succes-email-conirm {
    font-size: 12px;
    color: $color--dark--blue;
  }
</style>
