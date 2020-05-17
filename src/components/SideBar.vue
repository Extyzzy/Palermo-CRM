<template>
  <div class="side-bar">
    <div class="side-bar__container">
      <div class="side-bar__head">
        <router-link
          to="/main"
        >
        <h1 class="side-bar__palermo_logo">
          <span class="side-bar__palermo--gray">Palermo</span>CRM
        </h1>
        </router-link>
      </div>
      <ul class="side-bar__menu">
        <li
          :key="id"
          v-for="({ id, childrens, name, slug }) in menuData"
          class="side-bar__item"
        >
            <button
              v-if="childrens.find(d => d.show)"
              @click.prevent="setActiveMenuItemId(id)"
              class="side-bar__link"
            >
            <span
              v-if="!slug"
              :class="{ 'side-bar__arrow--down': activeMenuItemId === id}"
              class="side-bar__arrow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="6.167" height="10" viewBox="0 0 6.167 10"><g><g transform="translate(0)"><path d="M1.167,0,0,1.167,3.833,5,0,8.833,1.167,10l5-5Z" fill="#fff"/></g></g></svg>
            </span>
              {{ name }}
            </button>
          <ul
            v-if="activeMenuItemId === id"
            class="side-bar-drop-down"
          >
            <li
              :key="id"
              v-for="({ addUrl, id, name, slug, requirements, show }) in childrens"
              class="side-bar-drop-down__item"
            >
              <div v-if="show">
                <router-link
                  :to="slug"
                  class="side-bar-drop-down__link"
                >
                  {{ name }}
                </router-link>
                <router-link
                  :to="addUrl"
                  v-if="addUrl"
                  class="side-bar-drop-down__add-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M12,6.857H6.857V12H5.143V6.857H0V5.143H5.143V0H6.857V5.143H12Z" fill="#8e9bad"/></svg>
                </router-link>
              </div>

            </li>
          </ul>
        </li>
        <li
          class="side-bar__link"
        >
          <router-link
            to="/test"
            class="side-bar-drop-down__link"
            style="justify-content: center; padding: 12px 20px;"
          >
            Test page
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash';

export default {
  data() {
    return {
      resultState: [],
      activeMenuItemId: '',
      menuData: []
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters({
      lang: 'app/lang',
      permissions: 'user/permissions',
    }),
  },
  watch: {
    '$store.state.user.permissions': {
      immediate: true,
      handler(permissions) {
        if (permissions.length > 0 ) {
          this.menuData = this.setMenu()
        }
      }
    }
  },
  methods: {
    showMenu(requirements) {
      //compare two arrays from menuData(front-end) and permissions (back-end)  to show right menu for user.

      const back_have_just = this.permissions.filter(p => {
        if (requirements.includes(p.permission)) {
          return p
        }
      }).map(e => e.permission);

      return _.isEqual(back_have_just.sort(), requirements.sort());
    },
    setActiveMenuItemId(id) {
      if (this.activeMenuItemId === id) {
        this.activeMenuItemId = '';
      } else {
        this.activeMenuItemId = id;
      }
    },
    setMenu() {
      return [
        {
          id: 1,
          name: 'Каталог',
          slug: null,
          childrens: [
            {
              id: 1,
              name: 'Категории товаров',
              slug: '/catalog',
              requirements: ['/category', '/roles'],
              show: this.showMenu(['/category', '/roles']),
              addUrl: '/catalog/add'
            }
          ]
        },
        {
          id: 2,
          name: 'Пользователи и роли',
          slug: null,
          childrens: [
            {
              id: 2,
              name: 'Пользователи',
              slug: '/users',
              requirements: ['/users', '/roles', '/shops'],
              show: this.showMenu(['/users', '/roles', '/shops']),
              addUrl: '/users/add'
            },
            {
              id: 3,
              name: 'Роли',
              slug: '/roles',
              requirements: ['/roles', '/shops'],
              show: this.showMenu(['/roles', '/shops']),
              addUrl: '/roles/add'
            }
          ]
        },
        {
          id: 3,
          name: 'Товары',
          slug: null,
          childrens: [
            {
              id: 3,
              name: 'Все товары',
              slug: '/shops',
              requirements: ['/shops'],
              show: this.showMenu(['/shops']),
              addUrl: '/shops/add'
            }
          ]
        }
      ]
    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
.side-bar {
  background-color: $color--dark-grey;
  flex-shrink: 0;
  height: 100vh;
  width: 250px;
}

.side-bar__head {
  padding: 20px;
}

.side-bar__palermo_logo {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 300;
}

.side-bar__palermo--gray {
  color: #B2B9C4;
  font-weight: 700;
}

.side-bar__item {
  border-bottom: 1px solid #5E5E5E;
}

.side-bar__item:first-child {
  border-top: 1px solid #5E5E5E;
}

.side-bar__link,
.side-bar-drop-down__link {
  align-items: center;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  padding: 12px 20px;
  width: 100%;
}

.side-bar__arrow {
  margin-right: 12px;
  transform-origin: center;
  transition: transform 200ms ease;
}

.side-bar__arrow--down {
  transform: rotate(90deg);
}

.side-bar-drop-down__item {
  position: relative;

  &:hover .side-bar-drop-down__link {
    background-color: #5E5E5E;
  }

  &:hover .side-bar-drop-down__add-link > svg > path {
    fill: #FFFFFF;
  }
}

.side-bar-drop-down__link {
  background-color: #333333;
  padding: 12px 20px 12px 38px;
}

.side-bar-drop-down__add-link {
  align-items: center;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;

  &:hover {
    background-color: #7E7E7E;
  }
}
</style>
