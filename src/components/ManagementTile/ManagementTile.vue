<template>
  <div>
    <div class="management-tile">
      <div class="management-tile__container">
        <div
          :class="{
            'management-tile__column--child': isChild,
            'management-tile__column--nephew': isNephew
          }"
          class="management-tile__column management-tile__column--naming"
        >
          <div class="management-tile__tile-checkbox">
            <CheckBox
              :id="id"
              :isChecked="isTileChecked"
              @input="handleTileCheckBox"
            />
          </div>
          <div class="management-tile__list-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10"><path d="M0,108H2v-2H0Zm0,4H2v-2H0Zm0-8H2v-2H0Zm4,4H18v-2H4Zm0,4H18v-2H4Zm0-10v2H18v-2Z" transform="translate(0 -102)" fill="#8E9BAD"/></svg>
          </div>
          <button
            @click.prevent="$emit('tile-title-click')"
            class="management-tile__name"
          >
            <span
              v-if="hasChildren"
              class="management-tile__name-drop-down-icon"
            >
              <svg :transform="isDropDownOpen ? 'rotate(90)' : null" xmlns="http://www.w3.org/2000/svg" width="4" height="6.486" viewBox="0 0 4 6.486"><path d="M.757,0,0,.757,2.486,3.243,0,5.73l.757.757L4,3.243Z" fill="#3b4b68" /></svg>
            </span>
            <span v-if="searchValue === '' ">{{title}}</span>
            <span v-else>
              {{
                `${title.slice(0, title.toLowerCase().indexOf(searchValueLowerCase))}` }}<span class="search-dropdown__link--bold">{{ `${title.slice(title.toLowerCase().indexOf(searchValueLowerCase), indexOfEnd(title.toLowerCase()))}` }}</span>{{ `${title.slice(indexOfEnd(title.toLowerCase()), title.length)}`
              }}
            </span>
          </button>
          <div class="management-tile__name-edit-wrapper">
            <router-link
              :to="{ name: 'edit--category', query: {id: dataCategory.id}}"
              class="management-tile__name-edit"
            >
              {{translations.trnsladm_edit}}
            </router-link>
          </div>
        </div>
        <div class="management-tile__column management-tile__column--display">
          <CheckBox
            :id="`${id}-active`"
            :isChecked="menuState[0] === 2"
            @input="handleTileMenuState"
            class="management-tile__checkbox"
            name="is_active"
            text="активна"
          />
          <CheckBox
            :id="`${id}-in-menu`"
            :isChecked="menuState[1] === 2"
            @input="handleTileMenuState"
            class="management-tile__checkbox"
            name="is_in_menu"
            text="в меню"
          />
          <CheckBox
            :id="`${id}-in-favorite-menu`"
            :isChecked="menuState[2] === 2"
            @input="handleTileMenuState"
            class="management-tile__checkbox"
            name="is_in_favorite"
            text="в избранном меню"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBox from '@/components/CheckBox.vue';
  import { mapGetters } from 'vuex'

  export default {
    components: {
      CheckBox,
    },
    props: {
      dataCategory: {
        required: true,
        type: Object,
      },
      hasChildren: {
        default: false,
        type: Boolean,
      },
      id: {
        required: true,
        type: String,
      },
      isChild: {
        type: Boolean,
      },
      isDropDownOpen: {
        default: false,
        type: Boolean,
      },
      isNephew: {
        type: Boolean,
      },
      isParent: {
        type: Boolean,
      },
      isTileChecked: {
        default: false,
        type: Boolean,
      },
      menuState: {
        type: Array,
      },
      title: {
        type: String,
      },
      searchValue: {
        required: true,
        type: String
      },
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
      searchValueLowerCase () {
        return this.searchValue.toLowerCase()
      }
    },
    methods: {
      async handleTileMenuState({ target: { checked, name }}) {
        // await this.axios.post(`${process.env.VUE_APP_API_URL}admin/category/update/is-settings?id=${this.id}&type=${name}&value=${checked ? 2 : 1}`);
        await this.axios.post(`${process.env.VUE_APP_API_URL}admin/category/update/is-settings?id=${this.id}&type=${name}&value=${checked ? 2 : 1}`)
          .then(data => {
            if (data.data.success)  {
              this.$toast.open({
                message: `Категория ${this.dataCategory.short} была успешно обновлена !`,
                type: 'success',
                duration: 30000
                // all other options
              });
            }
          })
      },
      handleTileCheckBox({ target: { checked }}) {
        this.$emit('tile-checked', checked);
      },
      indexOfEnd (suggestion) {
        const searchValue = this.searchValue.toLowerCase();
        const formatedeSuggestion = suggestion.toLowerCase();
        const io = formatedeSuggestion.indexOf(searchValue);

        return io === -1 ? -1 : io + searchValue.length
      },
      handleDragStart(event) {
        event.target.opacity = '0';
      }
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .management-tile {
    border-bottom: 1px solid #E0E4ED;
    height: 47px;
    padding: 0 15px;
  }

  .management-tile__container {
    display: flex;
    height: 100%;
    position: relative;
  }

  .management-tile__column {
    align-items: center;
    display: inline-flex;
    height: 100%;
    margin-right: 20px;
  }

  .management-tile__column--child {
    padding-left: 30px;
  }

  .management-tile__column--nephew {
    padding-left: 60px;
  }

  .management-tile__column--naming {
    position: relative;
    width: 470px;

    &:focus .management-tile__name-edit-wrapper,
    &:hover .management-tile__name-edit-wrapper {
      visibility: visible;
    }
  }

  .management-tile__tile-checkbox {
    margin-right: 20px;
  }

  .management-tile__list-icon {
    align-items: center;
    cursor: grab;
    display: flex;
    margin-right: 20px;
  }

  .management-tile__name {
    align-items: center;
    color: #3B4B68;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    height: 100%;
  }

  .management-tile__name-drop-down-icon {
    display: inline-flex;
    margin-right: 15px;

    & > svg {
      transition: transform 200ms ease;
    }
  }

  .management-tile__name-edit-wrapper {
    background: rgba(255,255,255,0);
    background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,255,255,0)), color-stop(12%, rgba(255,255,255,0.75)), color-stop(24%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,1)));
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 100%);
    background: -o-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 100%);
    background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 100%);
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1 );
    padding-left: 25px;
    position: absolute;
    right: 10px;
    top: calc(50% - 1px);
    transform: translateY(-50%);
    visibility: hidden;
  }

  .management-tile__name-edit {
    color: #3B4B68;
    font-size: 12px;
    font-weight: 400;

    &:focus,
    &:hover {
      color: $color--blue;
    }
  }

  .management-tile__checkbox {
    margin-right: 30px;
  }
  .search-dropdown__link--bold {
    color: $color--blue;
  }
</style>
