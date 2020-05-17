<template>
  <main class="main-page">
    <div class="side-bar__palermo_logo-main">
      <div class="side-bar__palermo--gray-main animate-flicker">Palermo</div>
      <div class="animate-flicker-sub">
        <span class="sub-text-first">Customer </span>
        <span class="sub-text-two">Relationship </span>
        <span class="sub-text-third">Management</span>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {

    }
  },
  methods: {

  }
};
</script>

<style
  lang="scss"
  scoped
>
  .main-page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .side-bar__palermo_logo-main {
    text-align: center;
    color: $color--light-gray;
    font-weight: 300;
    font-size: 62px;
    .side-bar__palermo--gray-main {
      color: #3B4B68;
      font-weight: 700;
    }
  }
  .animate-flicker-sub {
    font-weight: 300;
    font-size: 22px;
  }
  @keyframes flickerAnimationSubText {
    0%   { opacity:0; }
    100% { opacity:1; }
  }


  .sub-text-first {
    animation: flickerAnimationSubText 4s ;
  }

  .sub-text-two {
    animation: flickerAnimationSubText 6s ;
  }

  .sub-text-third {
    animation: flickerAnimationSubText 6s;
  }

  @keyframes flickerAnimation {
    0%   { opacity:0; }
    100% { opacity:1; }
  }
  .animate-flicker {
    animation: flickerAnimation 3s ;
  }
</style>
