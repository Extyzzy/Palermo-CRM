<template>
  <div class="authorization-modal">
    <ButtonCloseModal />
      <h2 class="authorization-modal__logo">
        <span class="authorization-modal__logo--bold">{{activeScreen === 'email' ? 'Изменить' : 'Подтверждение'}} E-mail</span>
      </h2>

    <div class="authorization-modal__form">
      <Email
        v-if="activeScreen === 'email'"
        @updateActiveScreen="updateActiveScreen"
      />
      <EmailCode
        :email="email"
        v-else-if="activeScreen === 'code'"
        @updateActiveScreen="updateActiveScreen"
      />
      <Success
        :email="email"
        v-else-if="activeScreen === 'success'"
        @updateEmail="updateEmail"
      />
    </div>
  </div>
</template>

<script>
  import ButtonCloseModal from '@/components/ButtonCloseModal.vue'
  import Email from './Email.vue'
  import EmailCode from './EmailCode.vue'
  import Success from './Success.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Modal',
    components: {
      ButtonCloseModal,
      Email,
      EmailCode,
      Success
    },
    props: {
      initialActiveScreen: {
        type: String,
        required: true,
        validator: value => (
          [
            'email',
            'code',
            'success'
          ].includes(value)
        )
      }
    },
    data () {
      return {
        activeScreen: this.initialActiveScreen,
        email: ''
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      updateActiveScreen (screen, email) {
        this.activeScreen = screen;
        if (email) {
          this.email = email
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
