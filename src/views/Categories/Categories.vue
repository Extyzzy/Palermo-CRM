<template>
  <div class="product-categories">
    <section class="product-categories__section-search-form">
      <form
        @submit.prevent=""
        class="product-categories__search-form"
        spellcheck="false"
      >
        <div class="product-categories-search-input-container">
          <div class="product-categories-search-input-icon">
            <span style="cursor: pointer" v-if="searchValue !== ''" @click="searchValue = ''">
              <svg  id="close" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
              <path id="Path_7" data-name="Path 7" d="M10,1,9,0,5,4,1,0,0,1,4,5,0,9l1,1L5,6l4,4,1-1L6,5Z" fill="#8e9bad"/>
            </svg>
            </span>
            <span v-else> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path d="M10.714,9.429h-.686l-.257-.257a5.365,5.365,0,0,0,1.371-3.6,5.571,5.571,0,1,0-5.571,5.571,5.365,5.365,0,0,0,3.6-1.371l.257.257v.686L13.714,15,15,13.714Zm-5.143,0A3.857,3.857,0,1,1,9.429,5.571,3.841,3.841,0,0,1,5.571,9.429Z" fill="#9097a9"/></svg></span>
          </div>
          <input
            class="product-categories__search-input"
            v-bind:placeholder="translations.trnsladm_search_category"
            v-model="searchValue"
            type="search"
          >
        </div>
        <ButtonLink
          :small="true"
          :text="translations.trnsladm_add_category"
          to="/product-categories/add"
        />
      </form>
    </section>
    <section class="list">
      <div class="list__head">
        <div class="list__head-column">
          <CheckBox
            :id="`tile`"
            :isChecked="areTilesChecked"
            @input="handleAllTilesCheck"
          />
        </div>
        <div class="list__head-column">
          <p class="list__head-title">
            {{translations.trnsladm_naming}}
          </p>
        </div>
        <div class="list__head-column">
          <p class="list__head-title">
            {{translations.trnsladm_showing}}
          </p>
        </div>
      </div>
      <div class="not-found" v-if="searchValue.length > 2 && filteredData.length === 0">
        {{translations.trnsladm_notFound}}
      </div>
      <div v-else class="list-body">
        <template v-if="tilesFetchedData.length">
          <draggable
            v-bind="dragOptions"
            v-model="tilesFetchedData"
            @change="updateListPosition"
            @end="dragEnd"
            @start="drag=true"
            group="lvl1"
            handle=".management-tile__list-icon"
          >
            <transition-group
              :name="!drag ? 'flip-list' : null"
              type="transition"
            >
              <ManagementTileContainer
                v-for="tileData in filteredData.length ? filteredData : tilesFetchedData"
                :isChecked="areTilesChecked"
                :key="tileData.id"
                :menuState="[ tileData.is_active, tileData.is_in_menu, tileData.is_in_favorite ]"
                :tileData="tileData"
                :searchValue="searchValue"
              />
            </transition-group>
          </draggable>
        </template>
        <template v-else>
          <ManagementTileSkeleton
            :id="index.toString()"
            :key="index"
            v-for="index in 15"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import TilesData from '@/templates/product-categories';
  import { mapGetters } from 'vuex'
  import ButtonLink from '@/components/Form/ButtonLink.vue';
  import CheckBox from '@/components/CheckBox.vue';
  import ManagementTileContainer from '@/components/ManagementTile/ManagementTileContainer.vue';
  import ManagementTileSkeleton from '@/components/ManagementTile/ManagementTileSkeleton.vue';

  export default {
    components: {
      ButtonLink,
      CheckBox,
      draggable,
      ManagementTileContainer,
      ManagementTileSkeleton,
      // ManagementTile,
    },
    data() {
      return {
        areTilesChecked: false,
        drag: false,
        tilesData: TilesData,
        tilesFetchedData: [],
        filteredData: [],
        filteredChildren: [],
        searchValue: ''
      };
    },
    async mounted() {
      const lastUpdatedCategoryStorage = localStorage.getItem(`lastUpdatedCategoryStorage`);

      const lastUpdatedCategory = (await this.axios.get(process.env.VUE_APP_API_URL + `information/oldest-category`)).data.unix

      localStorage.setItem(`lastUpdatedCategoryStorage`, lastUpdatedCategory);

      if (lastUpdatedCategoryStorage && lastUpdatedCategory > lastUpdatedCategoryStorage) {
        localStorage.setItem(`lastUpdatedCategoryStorage`, lastUpdatedCategory);
        this.setCategories();
      } else {
        const {lang} = this.$store.state.app;
        const categoriesFromStorage = localStorage.getItem(`${lang}_categories`);

        if (categoriesFromStorage) {
          this.tilesFetchedData = JSON.parse(categoriesFromStorage)
        } else {
          this.setCategories();
        }
      }
    },
    computed: {
      ...mapGetters({
        lang: 'app/lang',
        translations: 'app/translations',
      }),
      dragOptions() {
        return {
          animation: 200,
          group: "lvl1",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    methods: {
      async setCategories() {
        const {lang} = this.$store.state.app;
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        this.tilesFetchedData = Object.values({...(await this.axios.get(`${process.env.VUE_APP_API_URL}admin/categories?lang=${lang}`, {
          headers: { Authorization: `Bearer ${credentials.access_token}`
          }})).data.data});
        this.tilesFetchedData.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);

        await this.tilesFetchedData.map((data) => {
          if (data.hasOwnProperty('children')) {
            data.children = (Object.values({...data.children})).sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);

            data.children.map((child) => {
              if (child.hasOwnProperty('children')) {
                child.children = (Object.values({...child.children})).sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);
              }
            })
          }
        });

        localStorage.setItem(`${lang}_categories`, JSON.stringify(this.tilesFetchedData));
      },
      dragEnd() {
        this.drag = false;
      },
      handleAllTilesCheck({target: {checked}}) {
        this.areTilesChecked = checked;
      },
      async updateListPosition({moved: {element: {id, sort_order}, newIndex, oldIndex}}) {
        // Swapping the sort_order between the elements

        const generatedArray = [];

        if (newIndex > oldIndex) {
          const tempSortOrder = this.tilesFetchedData[newIndex].sort_order;

          for (let i = newIndex; i > oldIndex; i--) {
            // console.log(`[${i}] Sort order: `, this.tilesFetchedData[i].sort_order, ' -> ', this.tilesFetchedData[i - 1].sort_order)
            this.tilesFetchedData[i].sort_order = this.tilesFetchedData[i - 1].sort_order;
          }

          this.tilesFetchedData[oldIndex].sort_order = tempSortOrder;

          for (let i = oldIndex; i < newIndex + 1; i++) {
            generatedArray.push([this.tilesFetchedData[i].id, this.tilesFetchedData[i].sort_order]);
          }
        }
        else {
          const tempSortOrder = this.tilesFetchedData[newIndex].sort_order;

          for (let i = newIndex; i < oldIndex; i++) {
            // console.log(`[${i}] Sort order: `, this.tilesFetchedData[i].sort_order, ' -> ', this.tilesFetchedData[i - 1].sort_order)
            this.tilesFetchedData[i].sort_order = this.tilesFetchedData[i + 1].sort_order;
          }

          this.tilesFetchedData[oldIndex].sort_order = tempSortOrder;

          for (let i = oldIndex; i >= newIndex; i--) {
            generatedArray.push([this.tilesFetchedData[i].id, this.tilesFetchedData[i].sort_order]);
          }
        }

        await this.axios.post(`${process.env.VUE_APP_API_URL}admin/category/update/sort-order?sort_order_array=${ JSON.stringify(generatedArray) }`)
      },
     search() {
          let dataTilesFetchedData = [];

          for ( let grandParent of this.tilesFetchedData ) {
            if (grandParent.translation.toLowerCase().includes(this.searchValue.toLowerCase())) {
              dataTilesFetchedData = [...dataTilesFetchedData, grandParent]
            }

            if (grandParent.hasOwnProperty('children')) {
              for ( let children of grandParent.children ) {
                if (children.translation.toLowerCase().includes(this.searchValue.toLowerCase())) {
                  dataTilesFetchedData = [...dataTilesFetchedData, grandParent]
                }

                if (children.hasOwnProperty('children')) {
                  for ( let child of children.children ) {
                    if (child.translation.toLowerCase().includes(this.searchValue.toLowerCase())) {
                      dataTilesFetchedData = [...dataTilesFetchedData, grandParent]
                    }
                  }
                }
              }
            }

          const uniqueArray = dataTilesFetchedData.filter((item, pos)  => dataTilesFetchedData.indexOf(item) === pos);

          this.filteredData = uniqueArray;
        }
      }
    },
    watch: {
      searchValue: function(){
        if (this.searchValue.length > 2) {
          this.search();
        } else {
          this.filteredData = [];
        }
      }
    }
  }
</script>

<style lang="scss">
  .not-found {
    color: #3B4B68;
    padding-top: 20px;
    padding-left: 30px;
    font-size: 12px;
  }
  /* Drag and drop styles */
  .flip-list-move {
    transition: transform 0.5s;
  }

  .ghost {
    opacity: 0.5;
    background: #f5f6fa;
  }

  /* Styles */
  .product-categories {
    height: 100%;
  }
  .product-categories__section-search-form {
    flex-direction: row;
    padding: 30px 30px 20px;
  }

  .product-categories__search-form {
    align-items: center;
    display: flex;
  }

  .product-categories-search-input-container {
    margin-right: 30px;
    position: relative;
  }

  .product-categories-search-input-icon {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
  }

  .product-categories__search-input {
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: #3B4B68;
    flex-shrink: 1;
    font-size: 12px;
    font-weight: 400;
    padding: 8px 15px;
    width: 560px;
  }

  .product-categories__search-input::placeholder {
    color: #3B4B68;
  }

  .product-categories__search-button {
    background-color: #E0E4ED;
    border-radius: 5px;
    color: #3B4B68;
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 400;
    padding: 9px 23px;
  }

  .product-categories__search-button:focus,
  .product-categories__search-button:hover {
    background-color: $color--light-gray;
    color: #FFFFFF;
  }

  .list {
    height: calc(100% - 132px);
  }

  .list__head {
    align-items: center;
    background-color: #F5F6FA;
    display: flex;
    height: 45px;
    padding: 0 30px;
  }

  .list__head-column {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  .list__head-column:first-child {
    margin-right: 20px;
    width: 13px;
  }

  .list__head-column:nth-child(2) {
    margin-right: 20px;
    width: 435px;
  }

  .list__head-column:nth-child(2) .list__head-title {
    margin-left: 33px;
  }

  .list__head-title {
    color: #3B4B68;
    font-size: 12px;
    font-weight: 400;
  }

  .list-body {
    height: 100%;
    overflow-y: auto;
    padding: 0 15px;
  }

  .list-body__item {
    border-bottom: 1px solid #E0E4ED;
    height: 45px;
  }

  .list-body__item-container {
    align-items: center;
    display: flex;
    height: 100%;
  }

  .list-body__item-column {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    height: 100%;
  }

  .list-body__item-column:first-child {
    margin-left: 15px;
    width: 33px;
  }

  .list-body__item-column:nth-child(2) {
    margin-right: 20px;
    width: 435px;
  }

  .list-body__item-column-icon {
    display: inline-flex;
    margin-right: 20px;
  }

  .list-body__item-column-title {
    color: #3B4B68;
    font-size: 12px;
    font-weight: 400;
  }

  .list-body__item-label {
    align-items: center;
    color: #3B4B68;
    cursor: pointer;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    margin-right: 30px;
  }

  .list-body__item-label input {
    margin-right: 10px;
  }
</style>
