<template>
  <div @click="$emit('click')" class="button">
    <button
      class="button__button_auth"
      :class="{ 'disabled': disabled }"
      type="type"
      :disabled="disabled"
    >
      {{ text }}
    </button>
    <div class="loader">
      <Loader v-if="isLoading" size="25px" fill="3px"/>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  components: {Loader},
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    click: {
      type: Function,
    },
    isLoading: {
      default: false,
      type: Boolean,
    },
    text: {
      required: true,
      type: String,
    },
    type: {
      required: false,
      type: String,
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
  .disabled {
    background-color: #EDEFF3 !important;

    &:focus:active,
    &:hover:active {
      background-color: #EDEFF3 !important;
    }

    &:focus,
    &:hover {
      background-color: $color-solitude;
      color: #8E9BAD !important;
    }
  }
  .loader {
    position: absolute;
    right: 10px;
    top: 8px;
  }
  .button {
   position: relative;
  }
  .button__button_auth {
    background-color: #e0e4ed;
    border: none;
    border-radius: 20px;
    color: #8E9BAD;
    cursor: pointer;
    font-family: Open Sans, Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 12px 35px;
    text-transform: uppercase;
    width: 100%;

    &:hover {
      background-color: #3B4B68;
      color: #fff;
    }
  }
</style>
