<template>
  <div class="input-block">
    <div class="input-block__container"
         v-bind:style="{  width: width ? width : '364px' }">
      <input
        :disabled="disabled"
        :autocomplete="autocomplete"
        :id="id"
        :spellcheck="spellcheck"
        :value="value"
        :type="showPassword ? 'text' : type"
        @input="updateValue($event.target.value)"
        class="input-block__input"
        :placeholder="placeholder"
        v-bind:style="{
            borderColor: isFocused ? '#3B4B68' : disabled ? '#F5F6FA' : errorMessage ? '#F02C5A' : '#A4B0BE',
            height: height ? height : '35px',
            fontSize: height ? '15px' : '12px',
            backgroundColor:  disabled ? '#F5F6FA' : 'white'
         }"
      />
      <span @click="showPassword = !showPassword" class="password--icon" v-if="type === 'password'">
          <svg  id="visible-eye" xmlns="http://www.w3.org/2000/svg" width="15.125" height="9.998" viewBox="0 0 15.125 9.998">
            <path id="Path_1191" data-name="Path 1191" d="M.169,25.974c.987,1.237,3.924,4.537,7.4,4.537s6.411-3.3,7.4-4.537a.751.751,0,0,0,0-.925c-.987-1.237-3.924-4.537-7.4-4.537S1.156,23.8.169,25.037A.735.735,0,0,0,.169,25.974Zm7.4-3.474a3,3,0,1,1-3,3A2.992,2.992,0,0,1,7.567,22.5Z" transform="translate(0 -20.513)" fill="#8e9bad"/>
            <circle id="Ellipse_80" data-name="Ellipse 80" cx="1.5" cy="1.5" r="1.5" transform="translate(6.068 3.487)" fill="#8e9bad"/>
         </svg>
      </span>
    </div>
    <p
      v-if="errorMessage"
      class="input-block__error-message"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      autocomplete: {
        type: String,
        default: 'on',
        validator: value => (
          [
            'off',
            'on'
          ].includes(value)
        )
      },
      errorMessage: {
        default: ''
      },
      id: {
        type: String,
        required: true
      },
      spellcheck: {
        type: String,
        default: 'false',
        validator: value => (
          [
            'false',
            'true'
          ].includes(value)
        )
      },
      type: {
        type: String,
        required: true
      },
      width: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required: false
      },
      value: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        isFocused: false,
        showPassword: false,
      }
    },
    methods: {
      updateValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .password--icon {
    position: absolute;
    right: 15px;
    cursor: pointer;
    top: 15px;
  }
  .input-block {
    position: relative;
    margin-bottom: 5px;
  }

  .input-block:not(:last-child) {
    margin-bottom: 1px;
  }

  .input-block__input::placeholder {
    color: #A4B0BE;
    opacity: 1;
    font-size: 12px !important;
  }

  .input-block__container {
    position: relative;
  }

  .input-block__input {
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: #3B4B68;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    padding: 0 14px;
    width: 100%;
    border-color: rgb(59, 75, 104);
  }

  .input-block__input:focus {
    border-color: #3B4B68;
  }

  .input-block__label {
    background-color: #FFFFFF;
    color: $color--light-gray;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    left: 14px;
    padding: 0 5px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: top left;
    transition: transform 150ms ease;
  }

  .input-block__label--transform {
    color: #3B4B68;
    transform: translateY(-29px) scale(0.8);
    border-radius: 25px;
  }

  .input-block__error-message {
    color: #F02C5A;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;
    left: 0;
    position: absolute;
  }
</style>
