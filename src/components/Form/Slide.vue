<template>
  <div @click="$emit('onChangeActive', !isChecked)" class="slide">
    <span class="white-circle"></span>
  </div>
</template>

<script>
export default {
  props: {
    onChangeActive: {
      type: Function,
      required: false,
    },
    isChecked: {
      required: true,
      type: Boolean,
    },
    isDisabled: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.slide {
  cursor: pointer;
  display: inline-flex;
  width: 35px;
  height: 20px;
  border-radius: 25px;
  background-color: $color--light-gray;
  position: relative;
}

.white-circle {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 4px;
  left: 5px;
  background-color: white;
  border-radius: 25px;
}

</style>
