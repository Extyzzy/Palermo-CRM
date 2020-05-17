<template>
  <button
    @click="$parent.$emit('close')"
    class="modal-close-button-text"
  >
    <svg
      id="close"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <rect
        id="Rectangle_170"
        data-name="Rectangle 170"
        width="20.566"
        height="2.061"
        transform="translate(0 14.543) rotate(-45)"
        fill="#8e9bad"
      />
      <rect
        id="Rectangle_171"
        data-name="Rectangle 171"
        width="20.566"
        height="2.053"
        transform="translate(14.543 15.996) rotate(-135)"
        fill="#8e9bad"
      />
    </svg>
    <span>Отменить</span>
  </button>
</template>

<script>
export default {
  name: 'TextCloseModal'
}
</script>

<style lang="scss" scoped>
.modal-close-button-text {
  background-color: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;

  & > span {
    margin-left: 7px;
  }
  & > svg {
    margin: 0 10px;
  }
}
</style>
