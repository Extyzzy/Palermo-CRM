<template>
  <header class="header">
    <nav class="nav">
      <h2 class="nav__page-title">
        {{ pageTitle }}
      </h2>
      <div class="nav__actions">
        <button @click="$router.push({ path: '/roles-users/user', query: { id: infoUser.user.id }})" class="nav__profile nav__button">
          <span class="nav__profile-name">
            {{infoUser.user.name}}
          </span>
          <div class="nav__profile-picture">
            <img
              alt="man profile"
              class="nav__profile-src"
              :src="avatar"
            >
          </div>
        </button>
        <!--<button class="nav__button">-->
          <!--<svg xmlns="http://www.w3.org/2000/svg" width="20.343" height="16" viewBox="0 0 20.343 16"><g transform="translate(0 -10.497)"><g transform="translate(0 10.497)"><path d="M16.6,16.306c0-3.2-3.723-5.809-8.3-5.809S0,13.1,0,16.306c0,1.818,1.169,3.485,3.214,4.594a11.091,11.091,0,0,1-1.6,3.709.185.185,0,0,0,.142.3h.017a10.75,10.75,0,0,0,6.136-2.8c.128,0,.257.006.387.006C12.876,22.114,16.6,19.508,16.6,16.306Z" transform="translate(0 -10.497)" fill="#8e9bad"/><path d="M53.1,27.04c0-2.13-1.648-3.995-4.1-5.005a5.414,5.414,0,0,1,1.45,3.594c0,3.677-4.11,6.67-9.162,6.67h-.009a11.3,11.3,0,0,0,3.519.549c.13,0,.259,0,.387-.007a10.748,10.748,0,0,0,6.137,2.8h.017a.185.185,0,0,0,.142-.3,11.088,11.088,0,0,1-1.6-3.709C51.927,30.526,53.1,28.858,53.1,27.04Z" transform="translate(-32.753 -19.645)" fill="#8e9bad"/></g></g></svg>-->
          <!--<span class="nav__button-notification">1</span>-->
        <!--</button>-->
        <!--<button class="nav__button">-->
          <!--<svg xmlns="http://www.w3.org/2000/svg" width="16.8" height="16" viewBox="0 0 16.8 16"><g transform="translate(0 0)"><path d="M4.48,14.03,3.36,12.91A8.435,8.435,0,0,0,0,19.15H1.6A6.611,6.611,0,0,1,4.48,14.03ZM15.2,19.15h1.6a8.355,8.355,0,0,0-3.28-6.24L12.4,14.03A6.767,6.767,0,0,1,15.2,19.15Zm-1.6.4a5.148,5.148,0,0,0-4-5.04v-.56a1.2,1.2,0,0,0-2.4,0v.56a5.148,5.148,0,0,0-4,5.04v4.4l-1.6,1.6v.8H15.2v-.8l-1.6-1.6Zm-5.2,9.2h.32a1.391,1.391,0,0,0,1.12-.96,1.507,1.507,0,0,0,.16-.64H6.8A1.6,1.6,0,0,0,8.4,28.75Z" transform="translate(0 -12.75)" fill="#8e9bad"/></g></svg>-->
          <!--<span class="nav__button-notification">3</span>-->
        <!--</button>-->
        <!--<button class="nav__button">-->
          <!--<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g transform="translate(-3.762)"><g transform="translate(3.762)"><path d="M17.749,8.844c0-.241.082-.482.082-.8a2.444,2.444,0,0,0-.082-.8l1.714-1.367a.375.375,0,0,0,.082-.482L17.913,2.573a.462.462,0,0,0-.49-.08l-2.04.8A7.777,7.777,0,0,0,14,2.492L13.669.4c.082-.241-.163-.4-.326-.4H10.078C9.915,0,9.67.161,9.67.322L9.343,2.492a6.178,6.178,0,0,0-1.387.8L6,2.492a.509.509,0,0,0-.571.161L3.794,5.467c-.082.08,0,.322.163.482L5.671,7.236c0,.241-.082.482-.082.8a2.444,2.444,0,0,0,.082.8L3.957,10.211a.375.375,0,0,0-.082.482l1.632,2.814a.462.462,0,0,0,.49.08l2.04-.8a7.777,7.777,0,0,0,1.387.8l.326,2.09a.372.372,0,0,0,.408.322h3.264c.163,0,.408-.161.408-.322l.326-2.09a7.777,7.777,0,0,0,1.387-.8l2.04.8a.4.4,0,0,0,.49-.161l1.632-2.814c.082-.161.082-.4-.082-.482Zm-6.039,2.01A2.87,2.87,0,0,1,8.854,8.04a2.857,2.857,0,0,1,5.713,0A2.87,2.87,0,0,1,11.71,10.854Z" transform="translate(-3.762)" fill="#8e9bad"/></g></g></svg>-->
        <!--</button>-->
          <button @click="logout()" class="nav__button">
            <i class="icon-exit-to-app-button"></i>
          </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    pageTitle: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      avatar: 'user/avatar',
      infoUser: 'user/info',
    }),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
    }
  }
};
</script>

<style lang="scss">
@media only screen and (max-width: 1200px) {
  .nav {
    justify-content: flex-start !important;
  }
  .nav__profile-name {
    display: none;
  }
  .nav__actions {
    margin-left: 20px;
  }
  .form__checkboxes {
   padding-top: 0 !important;
  }
}

.header {
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(59, 75, 104, 0.25);
  width: 100%;
}

.nav {
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 59px;
  padding: 0 60px 0 30px;
  width: 100%;
}

.nav__page-title {
  color: #3B4B68;
  font-size: 14px;
  font-weight: 700;
}

.nav__actions {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

.nav__button {
  display: inline-flex;
  position: relative;
}

.nav__button:not(:last-child) {
  margin-right: 28px;
}

.nav__button-notification {
  align-items: center;
  background-color: #3B4B68;
  border-radius: 50%;
  color: #FFFFFF;
  display: flex;
  height: 14px;
  font-size: 9px;
  font-weight: 400;
  justify-content: center;
  position: absolute;
  right: -9px;
  top: -8px;
  width: 14px;
}

.nav__profile {
  align-items: center;
  display: flex;
}

.nav__profile-name {
  color: #3B4B68;
  font-size: 12px;
  font-weight: 400;
  margin-right: 15px;
}

.nav__profile-picture {
  border-radius: 50%;
  height: 35px;
  overflow: hidden;
  width: 35px;
}

.nav__profile-src {
  height: 100%;
  object-fit: cover;
  width: 100%;
}
</style>
