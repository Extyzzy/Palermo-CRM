<template>
  <div class="button">
    <router-link
      :class="{ 'button__button--small': small }"
      :to="to"
      class="button__button"
    >
      {{ text }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    small: {
      default: false,
      required: false,
      type: Boolean,
    },
    text: {
      required: true,
      type: String,
    },
    to: {
      required: true,
      type: String,
    }
  },
};
</script>

<style
  lang="scss"
  scoped
>
.button {
  display: inline-flex;
}

.button__button {
  background-color: $color-solitude;
  border-radius: 5px;
  color: $color-port-gore;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  padding: 9px 50px;

  &:focus:active,
  &:hover:active {
    background-color: #778291;
  }

  &:focus,
  &:hover {
    background-color: $color-bali-hai;
    color: #FFFFFF;
  }

  &--small {
    padding: 9px 25px;
  }
}
</style>
