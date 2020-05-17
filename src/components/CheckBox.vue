<template>
  <label
    :for="id"
    :class="{ 'check--disabled': isDisabled }"
    class="check"
  >
    <input
      :checked="isChecked"
      :id="id"
      :disabled="isDisabled"
      :name="name || id"
      @input="item ? $emit('input', {$event, item}) : $emit('input', $event)"
      class="check__input"
      type="checkbox"
    >
    <span class="check__box"></span>
    <span
      v-if="text"
      class="check__text"
    >
      {{ text }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: false,
    },
    onClick: {
      type: Function,
      required: false,
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.check {
  align-items: center;
  color: #3B4B68;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 400;
  min-height: 13px;
  padding-left: 13px;
  position: relative;

  &--disabled {
    cursor: auto;
  }
}

.check__input {
  appearance: none;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
}

.check__box {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 13 13'%3E%3Cpath d='M11.556,1.444V11.556H1.444V1.444H11.556m0-1.444H1.444A1.449,1.449,0,0,0,0,1.444V11.556A1.449,1.449,0,0,0,1.444,13H11.556A1.449,1.449,0,0,0,13,11.556V1.444A1.449,1.449,0,0,0,11.556,0Z' fill='%238e9bad'/%3E%3C/svg%3E");
  /* background-color: transparent;
  border: 2px solid #8E9BAD;
  border-radius: 3px; */
  height: 13px;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
}

.check__input:checked + .check__box {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 13 13'%3E%3Cpath d='M11.556,0H1.444A1.449,1.449,0,0,0,0,1.444V11.556A1.449,1.449,0,0,0,1.444,13H11.556A1.449,1.449,0,0,0,13,11.556V1.444A1.449,1.449,0,0,0,11.556,0Zm-6.5,10.111L1.444,6.5,2.456,5.489l2.6,2.6L10.544,2.6l1.011,1.011Z' fill='%233b4b68'/%3E%3C/svg%3E");
  /* background-color: #3B4B68;
  border: 2px solid #3B4B68; */
}

.check__input:disabled + .check__box {
  /* background-color: #CED6E0;
  border: 2px solid #CED6E0; */
}

.check__text {
  padding-left: 10px;
}
</style>
