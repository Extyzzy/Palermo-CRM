<template>
  <div v-click-outside="outside" class="input-block">
    <div class="input-block__container-select"
         v-bind:style="{  width: width ? width : '364px' }">
      <div
        @click="show = !show"
        class="input-block__input"
        :class="{ 'borders': show }"
        v-bind:style="{
            borderColor: disabled ? '#F5F6FA' : errorMessage ? '#F02C5A' : '#A4B0BE',
            backgroundColor:  disabled ? '#F5F6FA' : 'white',
            height:  selected.length === 0 ? '38px' : '100%',
         }"
      >

        <span @click="removeValue(item)" class="selected-item" v-bind:key="item.id" v-for="item in selected">
          {{item.name}}
           <i id="close" class="icon-close-button"></i>
        </span>

        <span v-bind:style="{
            transform: show ? 'rotate(0deg)' : 'rotate(180deg)'
         }" class="arrow">
           <i class="icon-expand-arrow"></i>
        </span>
      </div>
      <div class="dropdown-select" v-if="show">
      <span
        class="item-select"
        @click="updateValue(item)"
        v-bind:key="item.id"
        v-for="item in filteredList">
        {{item.name}}
      </span>

        <span
          class="notFound"
          v-if="!filteredList.length">
          {{notFoundMessage}}
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
    name: 'MultiSelect',
    props: {
      notFoundMessage: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      },
      multi: {
        type: Boolean,
        default: false,
        required: false
      },
      selected: {
        type: Array,
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
      height: {
        type: String,
        required: false
      },
      value: {
        type: String,
        required: true
      },
      changedValue: {
        type: Function,
        required: true
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
        filteredList: this.list.filter(e => !this.selected.some(innerE => innerE.id === e.id))
      }
    },
    methods: {
      outside() {
        this.show = false;
      },
      removeValue(item) {
        this.selected = this.selected.filter(v => v.id !== item.id)
        this.filteredList = this.list.filter(e => !this.selected.some(innerE => innerE.id === e.id))
        this.$emit('changedValues', this.selected)
      },
      updateValue (value) {
        this.selected.push(value)
        this.filteredList = this.list.filter(e => !this.selected.some(innerE => innerE.id === e.id))
        this.show = !this.show;

        this.$emit('changedValues', this.selected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .selected-item {
    background-color: $color-solitude;
    color: $color--dark--blue;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    margin-top: 5px;

    &:hover {
      i {
        color: $color--dark--blue;
      }
    }
  }
  svg {
    margin-left: 5px;
  }
  .borders {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .dropdown-select {
    border: 1px solid #A4B0BE;
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    position: absolute;

    .notFound {
      padding: 10px 20px;
      font-size: 12px;
      color: $color--dark--blue;
    }
    .item-select {
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
    height: 100%;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: #3B4B68;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    padding: 0 4px;
    padding-bottom: 4px;
    width: 100%;
    border-color: rgb(59, 75, 104);
    font-size: 12px;

    .arrow {
      position: absolute;
      right: 16px;
      transform: rotate(180deg);
      transition: ease;
      top: 10px;

      i {
        font-size: 10px;
        color: $color--dark--blue;
      }
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
