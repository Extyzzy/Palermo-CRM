<template>
  <div class="button">
    <button
      class="button__button"
      :class="{
        'disabled': disabled,
        'cancel': cancel
       }"
      type="type"
      :disabled="disabled"
    >
      {{ text ? text : translations.trnsladm_default_submit_button }}
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

export default {
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    text: {
      required: false,
      type: String
    },
    type: {
      required: false,
      type: String,
    },
    cancel: {
      default: false,
      required: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      translations: 'app/translations',
    }),
  },
};
</script>

<style
  lang="scss"
  scoped
>
.disabled {
  background-color: #EDEFF3 !important;
  border: 1px solid #EDEFF3 !important;
  color: #8E9BAD !important;

  &:focus:active,
  &:hover:active {
    background-color: #EDEFF3 !important;
    border: 1px solid #EDEFF3;
  }

  &:focus,
  &:hover {
    background-color: $color-solitude;
    color: #8E9BAD !important;
    border: 1px solid #EDEFF3 !important;
  }
}
.button {
  display: inline-flex;
}

.cancel {
  background-color: white !important;
  color: $color--dark--blue;
  border: 1px solid $color--light-gray;

   &:hover {
     background-color: $color--dark--blue !important;
   }
}

.button__button {
  background-color: $color-solitude;
  border: 1px solid $color-solitude;
  border-radius: 5px;
  color: $color--dark--blue;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  padding: 9px 50px;

  &:focus:active,
  &:hover:active {
    background-color: $color--light-gray;
  }

  &:focus,
  &:hover {
    background-color: $color--dark--blue;
    border: 1px solid $color--dark--blue;
    color: #FFFFFF;
  }
}
</style>
