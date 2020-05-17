<template>
  <div>
  <div class="nav-menu-bar">
    <span :class="{ 'active-nav': form === 'general' }" @click="form = 'general'">Общая информация</span>
    <span :class="{ 'active-nav': form === 'settings' }" @click="form = 'settings'">Настройки</span>
    <span :class="{ 'active-nav': form === 'address' }" @click="form = 'address'">
      Адреса доставки покупателя</span>
  </div>

    <General v-if="form === 'general'"/>
    <Settings v-if="form === 'settings'"/>
    <Address v-if="form === 'address'"/>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import General from './General.vue';
  import Settings from './Settings.vue';
  import Address from './Address.vue';

  export default {
    components: {
      General,
      Settings,
      Address
    },
    data() {
      return {
        form: 'general',
      };
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {

    },
    watch: {
      '$route.query': {
        immediate: true,
        handler(newVal) {
          this.form = newVal.type;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .active-nav {
    background-color: white;
    border-radius: 5px;
  }
  .nav-menu-bar {
    padding: 12px 0;
    background-color: #EDEFF3;

     & > span {
       padding: 16px 30px;
       cursor: pointer;
       font-size: 12px;
       color: $color--dark--blue;
     }
  }
</style>
