<template>
  <div class="authorization-modal">
    <ButtonCloseModal />
      <h2 class="authorization-modal__logo">
        <span class="authorization-modal__logo--bold">Изменить пароль</span>
      </h2>

    <div class="authorization-modal__form">
      <Password
        v-if="activeScreen === 'password'"
        @updateActiveScreen="updateActiveScreen"
      />
      <Success
        v-else-if="activeScreen === 'success'"
        @updateActiveScreen="updateActiveScreen"
      />
    </div>
  </div>
</template>

<script>
  import ButtonCloseModal from '@/components/ButtonCloseModal.vue'
  import Password from './Password.vue'
  import Success from './Success.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Modal',
    components: {
      ButtonCloseModal,
      Password,
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
        activeScreen: this.initialActiveScreen
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      updateActiveScreen (screen) {
        this.activeScreen = screen
      }
    }
  }
</script>

<style lang="scss">
  .authorization-modal {
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    padding: 35px 45px 65px;
    position: relative;
  }

  .authorization-modal__container {
    display: flex;
    flex-direction: column;
  }

  .authorization-modal__logo {
    color: #3B4B68;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    text-align: left;
  }

  .authorization-modal__logo--bold {
    font-weight: 700;
  }

  .authorization-modal__instructions {
    margin-bottom: 28px;
    text-align: center;
  }

  .authorization-modal__instructions-title {
    color: #3B4B68;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 5px;
  }

  .authorization-modal__instructions-message {
    color: #3B4B68;
    font-size: 12px;
    line-height: 2;
  }

  ::v-deep .authorization-modal-form__inputs {
    margin-bottom: 20px;
  }

  ::v-deep .authorization-modal__modal-link {
    color: $color--blue;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;

    &:active,
    &:hover {
      text-decoration: underline;
    }

    &--underline {
      text-decoration: underline;
    }
  }

  ::v-deep .authorization-modal__submit {
    background-color: #E0E4ED;
    border: none;
    border-radius: 20px;
    color: #3B4B68;
    cursor: pointer;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    font-weight: 800;
    margin: 0 auto 28px;
    padding: 12px 35px;
    text-transform: uppercase;
    width: 100%;

    &:active,
    &:hover:active {
      background-color: #637188;
    }

    &:disabled,
    &:hover:disabled {
      background-color: #E0E4ED;
      color: $color--light-gray;
      cursor: auto;
    }

    &:hover {
      background-color: $color--light-gray;
      color: #FFFFFF;
    }
  }

  ::v-deep .authorization-modal__footer {
    color: #3B4B68;
    text-align: center;
  }
</style>
