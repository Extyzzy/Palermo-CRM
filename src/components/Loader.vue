<template>
  <span class="sbl-circ-path"
       v-bind:style="{
            height: size ? size : 25,
            width: size ? size : 25,
            borderWidth: fill ? fill : 4,
         }"
  ></span>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    size: {
      type: String,
    },
    fill: {
      type: String,
    },
  }
}
</script>

<style>
.sbl-circ-path {
  color: #EDEFF3;
  position: relative;
  display: inline-block;
  border: 3px solid;
  border-radius: 50%;
  border-right-color: #3B4B68;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }
</style>
