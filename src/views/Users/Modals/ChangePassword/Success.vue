<template>
  <div>
    <p class="succes-password">Пароль успешно изменен.</p>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SuccessModal',
    components: {
    },
    props: {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .succes-password {
    font-size: 12px;
    color: $color--dark--blue;
  }
</style>
