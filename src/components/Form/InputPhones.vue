<template>
  <div class="input-block">
    <div class="input-block__container">
      <input
        :autocomplete="autocomplete"
        :id="id"
        :spellcheck="spellcheck"
        :value="value"
        type="number"
        @blur="isFocused = false"
        @focus="isFocused = true"
        @input="updateValue($event.target.value)"
        class="input-block__input"
        v-bind:style="{
            borderColor: showAllCodes || isFocused ? '#3B4B68' : errorMessage ? '#F02C5A' : '#A4B0BE',
        }"
      >
      <div v-click-outside="outside" class="defaultCode" @click='showAllCodes = !showAllCodes'>
        +
        <input
          :value="defaultCode"
          @input="updateCode($event.target.value)"
          type="number"
          class="defaultCode__number"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="9.73" height="6" viewBox="0 0 9.73 6">
          <g id="keyboard-right-arrow-button" transform="translate(9.73) rotate(90)">
            <g id="chevron-right">
              <path id="Path_6" data-name="Path 6" d="M1.135,0,0,1.135l3.73,3.73L0,8.595,1.135,9.73,6,4.865Z" fill="#8e9bad"/>
            </g>
          </g>
        </svg>
      </div>

      <label
        :for="id"
        :class="{ 'input-block__label--transform': isFocused || value.length }"
        class="input-block__label"
      >
        {{ labelText }}
      </label>
    </div>
    <div v-if="showAllCodes" class="phones-container"
         v-bind:style="{
            height: filteredCode.length !== 0 ? 'auto' : '250px',
        }">
      <p @click="$emit('changeDefaultCode', code)"
         v-bind:key="code.id"
         v-for="code in filteredCode.length !== 0 ? filteredCode : allCodesCountry"
         class="number"
      >+ {{code.code_num}}  <span class="country_name">| {{code.country_translation}}</span>
      </p>

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
    name: 'InputPhones',
    props: {
      allCodesCountry: {
        type: Array,
        required: true
      },
      defaultCode: {
        type: Number,
        required: true
      },
      maxLength: {
        type: Number,
        required: true
      },
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
      labelText: {
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
      value: {
        type: Number,
        required: true
      },
    },
    data () {
      return {
        isFocused: false,
        showPassword: false,
        showAllCodes: false,
        code: '',
        filteredCode: []
      }
    },
    methods: {
      outside () {
        this.showAllCodes = false
      },
      updateCode(code) {
          this.filteredCode = this.allCodesCountry.filter(c => c.code_num.toString() === code.toString())

          this.$emit('updateDefaultCode', code)
      },
      updateValue (value) {
        if (String(value).length <= this.maxLength) {
          this.$emit('number', value)
        }
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    display: none;
  }

  .phones-container {
    box-shadow: 0 0 10px rgba(59, 75, 104, 0.25);
    height: 250px;
    overflow-y: scroll;
    cursor: pointer;
    border: 1px solid $color--dark--blue;
    border-radius: 5px;
    padding: 10px 0;
    margin-top: -11px;
    position: absolute;
    width: 100%;
    z-index: 2;
    background-color: white;

    .number {
      padding: 7px 18px;
      text-align: left;
      color: $color--light-gray;
      font-size: 15px;

      .country_name {
        position: absolute;
        left: 70px;
      }

      &:hover {
        background-color: $color-solitude;
      }
    }
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .defaultCode {
    position: absolute;
    left: 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    top: 14px;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #8E9BAD;

    .defaultCode__number {
      width: 31px;
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #8E9BAD;
    }

    & > svg {
      margin-left: 2px;
      margin-bottom: 2px;
    }
  }
  .password--icon {
    position: absolute;
    right: 15px;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
  }
  .input-block {
    padding-bottom: 20px;
    margin-bottom: 10px;
    position: relative;
  }

  .input-block:not(:last-child) {
    margin-bottom: 1px;
  }

  .input-block__container {
    position: relative;
    z-index: 3;
  }

  .input-block__input {
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: #3B4B68;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    height: 46px;
    padding: 0 13px;
    width: 100%;
    padding-left: 75px;
  }

  .input-block__input:focus {
    border-color: #3B4B68;
  }

  .input-block__label {
    background-color: #FFFFFF;
    color: #8E9BAD;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    left: 70px;
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
    transform: translateY(-29px) translateX(-58px) scale(0.8);
  }

  .input-block__error-message {
    bottom: 0;
    color: #F02C5A;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;
    left: 0;
    position: absolute;
  }
</style>
