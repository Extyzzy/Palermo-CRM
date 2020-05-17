<template>
  <div class="button">
    <button
      class="button__button"
      type="type"
      @click="$emit('click')"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
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
.button {
  display: inline-flex;
  justify-content: flex-end;
  padding: 5px 13px;
}

.button__button {
  background-color: $color-solitude;
  border-radius: 5px;
  color: $color-port-gore;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  padding: 9px 20px;
  width: 167px;

  &:focus:active,
  &:hover:active {
    background-color: #778291;
  }

  &:focus,
  &:hover {
    background-color: $color-bali-hai;
    color: #FFFFFF;
  }
}
</style>
