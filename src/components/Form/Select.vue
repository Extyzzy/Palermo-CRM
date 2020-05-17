<template>
  <div v-click-outside="outside" class="input-block">
    <div class="input-block__container-select"
         v-bind:style="{ width: width ? width : '364px' }">
      <div
        @click="show = !show"
        class="input-block__input"
        :class="{ 'borders': show }"
        v-bind:style="{
            borderColor: disabled ? '#F5F6FA' : errorMessage ? '#F02C5A' : '#A4B0BE',
            backgroundColor:  disabled ? '#F5F6FA' : 'white',
            boxShadow: show ? '0 0 5px rgba(59, 75, 104, .3)' : ''
         }"
      >
        {{selected.name}}
        <span v-bind:style="{
            transform: show ? 'rotate(0deg)' : 'rotate(180deg)',
            top: show ? '6px' : '10px'
         }" class="arrow">
           <svg xmlns="http://www.w3.org/2000/svg" width="9.73" height="6" viewBox="0 0 9.73 6">
          <g id="keyboard-right-arrow-button" transform="translate(0 6) rotate(-90)">
            <g id="chevron-right">
              <path id="Path_6" data-name="Path 6" d="M1.135,0,0,1.135l3.73,3.73L0,8.595,1.135,9.73,6,4.865Z" fill="#3b4b68"/>
            </g>
          </g>
        </svg>
        </span>
      </div>
      <div class="dropdown-select" v-if="show">
      <span
        v-bind:style="{ padding: padding ? padding : '10px 20px'}"
        @click="updateValue(item)"
        v-bind:key="item.id"
        v-for="item in filteredList">
        {{item.name}}
      </span>
      </div>
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
    name: 'Select',
    props: {
      multi: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      },
      selected: {
        type: Object,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      width: {
        type: String,
        required: false
      },
      padding: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required: false
      },
      value: {
        type: String,
        required: false
      },
      changedValue: {
        type: Function,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        isFocused: false,
        show: false,
        allList: this.list,
        filteredList: this.list.filter(f => f.id !== this.selected.id)
      }
    },
    methods: {
      outside() {
        this.show = false;
      },
      updateValue (value) {
        if (this.multi !== 'simple') {
          this.filteredList = this.allList.filter(f => f.id !== value.id);
        }
        this.show = !this.show;
        this.$emit('changedValue', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .borders {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .dropdown-select {
    box-shadow: 0 3px 5px rgba(59, 75, 104, .3);
    border: 1px solid #A4B0BE;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 33px;
    background-color: white;
    width: 100%;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    span {
       cursor: pointer;
       padding: 10px 20px;
       font-size: 12px;
       color: $color--dark--blue;

        &:hover {
          background-color: #E0E4ED;
        }
     }
  }
  .input-block__container-select {
      position: relative;
  }
  .input-block {
    z-index: 90;
    position: relative;
    margin-bottom: 5px;
    cursor: pointer;
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
    height: 35px;
    align-items: center;
    display: flex;
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: #3B4B68;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    padding: 0 14px;
    width: 100%;
    border-color: rgb(59, 75, 104);
    font-size: 12px;

    .arrow {
      position: absolute;
      right: 15px;
      top: 13px;
      transform: rotate(180deg);
      transition: ease;
    }
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
