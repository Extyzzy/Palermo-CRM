<template>
  <main class="default">
    <SideBar v-if="$store.state.user.credentials" />
    <div class="default__inner">
      <NavBar v-if="$store.state.user.credentials" :pageTitle="pageName" />
      <div :class="{ 'route-view': $store.state.user.credentials }">
        <div class="route-view__container">
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      pageName: '',
    };
  },
  watch: {
    // eslint-disable-next-line quote-props
    $route: {
      immediate: true,
      handler(to) {
        this.pageName = to.meta.title() || '';
      },
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
body * ::-webkit-scrollbar {
  width: 14px;
}
body * ::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}
body * ::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
body * ::-webkit-scrollbar-corner {
  background-color: transparent;
}
.default {
  background-color: #F6F8F9;
  display: flex;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
}

.default__inner {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.route-view {
  flex: 1;
  height: calc(100vh - 89px);
  padding: 30px 30px 0;
  width: 100%;
}

.route-view__container {
  background-color: $color--white;
  box-shadow: 0 0 10px rgba(59, 75, 104, 0.25);
  height: 100%;
  width: 100%;
}
</style>
