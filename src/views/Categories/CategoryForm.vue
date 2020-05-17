<template>
  <div class="add-product-categories">
    <div class="add-product-categories__container">
      <div class="languages">
        <p class="languages__title">Язык:</p>
        <div class="languages__checkboxes">
          <div :key="lang" v-for="lang in $store.state.app.languages.map(l => l.code)" class="languages__language-checkbox">
            <input
              @change="onActiveLangChange(lang)"
              :checked="lang === activeLang"
              class="languages__checkbox"
              :id="lang"
              name="active-lang"
              type="radio"
            >
            <label
              class="languages__checkbox-label"
              :for="lang"
            >
              {{lang}}
            </label>
          </div>
        </div>
      </div>
      <div class="form">
        <form class="form__form">
          <div class="form__meta-row">
            <div class="form__meta-row-side">
              <div class="form__label-wrapper">
                <label
                  :for="`${activeLang}-nameCategory`"
                  class="form__label"
                >
                  <span class="form__label-inner">
                    {{translations.trnsladm_name_category}}
                    <span class="form__label--lang">
                      {{ activeLang.toUpperCase() }}
                    </span>
                  </span>
                  <input
                    v-model="nameCategory[activeLang]"
                    :id="`${activeLang}-nameCategory`"
                    class="form__input"
                    placeholder="text"
                    type="text"
                    ref="nameCategory"
                  >
                </label>
              </div>

              <div v-if="ownLevel !== 1" v-click-outside="outside" class="form__label-wrapper arrow_wrapper">
                <label
                  for="root-category"
                  class="form__label"
                >
                  <span class="form__label-inner">
                    {{translations.trnsladm_corny_category}}
                  </span>

                  <div
                    id="root-category"
                    class="form__input set__category"
                    v-bind:style="{ color: setCategory ? '' : '#8E9BAD' }"
                    @click="activeMenu = !activeMenu"
                  >
                    {{setCategory && setCategory.parent_translation !== 'parent_id 0' &&
                    (setCategory.parent_translation ? setCategory.parent_translation : setCategory.short === '' ? setCategory.translation : setCategory.short) || 'Выбрать категорию'}}
                    <span
                      :class="{ 'side-bar__arrow--down': activeMenu}"
                      class="set__category__arrow"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="9.73" height="6" viewBox="0 0 9.73 6">
                      <g id="keyboard-right-arrow-button" transform="translate(0 6) rotate(-90)">
                        <g id="chevron-right">
                          <path id="Path_6" data-name="Path 6" d="M1.135,0,0,1.135l3.73,3.73L0,8.595,1.135,9.73,6,4.865Z" fill="#3b4b68"/>
                        </g>
                      </g>
                    </svg>
                 </span>
                  </div>
                  <div v-if="activeMenu" class="dropdownCategories" :class="{ 'small-height': searchValue.length > 2 && filteredData.length === 0 }">
                    <div class="product-categories-search-input-icon-form">
                      <span style="cursor: pointer" v-if="searchValue !== ''" @click="searchValue = ''">
                        <svg  id="close" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                        <path id="Path_7" data-name="Path 7" d="M10,1,9,0,5,4,1,0,0,1,4,5,0,9l1,1L5,6l4,4,1-1L6,5Z" fill="#8e9bad"/>
                      </svg>
                      </span>
                      <span v-else> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path d="M10.714,9.429h-.686l-.257-.257a5.365,5.365,0,0,0,1.371-3.6,5.571,5.571,0,1,0-5.571,5.571,5.365,5.365,0,0,0,3.6-1.371l.257.257v.686L13.714,15,15,13.714Zm-5.143,0A3.857,3.857,0,1,1,9.429,5.571,3.841,3.841,0,0,1,5.571,9.429Z" fill="#9097a9"/></svg></span>
                    </div>
                    <input
                      class="form__input"
                      placeholder="Поиск категории"
                      v-model="searchValue"
                      type="search"
                      style="margin: 10px; width: 334px;"
                    >
                    <div style="margin-left: 15px" v-if="searchValue.length > 2 && filteredData.length === 0">
                      {{translations.trnsladm_notFound}}
                    </div>
                    <div v-else>
                      <template v-if="tilesFetchedData.length">
                        <TreeChildrensMenuContainer
                          v-bind:key="grandParent.id"
                          class="grandParent"
                          v-for="grandParent in filteredData.length ? filteredData : tilesFetchedData"
                          :title="isEdit ? setCategory.translation : grandParent.translation"
                          :tileData="grandParent"
                          :searchValue="searchValue"
                          :setCategory="setCategory"
                          :activeMenu="activeMenu"
                          :isEdit="isEdit"
                          :firstLoadEdit="firstLoadEdit"
                          @onSetCategory="onSetCategory"
                        />
                      </template>
                    </div>
                  </div>
                </label>
              </div>
              <div class="form__checkboxes">
                <CheckBox
                  :isChecked="isActive"
                  id="active"
                  class="form__checkbox"
                  text="активна"
                  @input="onChangeCheckBox"
                />
                <CheckBox
                  :isChecked="isMenu"
                  id="menu"
                  class="form__checkbox"
                  text="в меню"
                  @input="onChangeCheckBox"
                />
                <CheckBox
                  :isChecked="isFavoriteMenu"
                  id="favorite"
                  class="form__checkbox"
                  text="в избранном меню"
                  @input="onChangeCheckBox"
                />
              </div>
            </div>
            <div class="form__meta-row-thumbnail-preview">
              <label
                class="form__label form__label--top"
                for="thumbnail"
              >
                {{translations.trnsladm_image_category}} <span style="color: #F02C5A">*</span>
              </label>
              <input
                @change="setThumbnail($event)"
                accept=".jpg, .jpeg, .png"
                class="image-thumbnail-input"
                id="thumbnail"
                name="image_uploads"
                ref="thumbnailInput"
                type="file"
              />
              <button
                @click.prevent="$refs.thumbnailInput.click()"
                class="thumbnail-preview"
                ref="imagePreviewButton"
              >
                <img
                  v-if="!!imagePreviewSrc"
                  :alt="pageHeadline.en"
                  class="thumbnail-preview__img"
                  ref="imagePreview"
                  :src="imagePreviewSrc"
                />
                <span class="add-image">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                  <g id="Baton" transform="translate(-668.078 -1198)">
                    <g id="add-plus-button" transform="translate(668.078 1198)">
                      <g id="add">
                        <path id="Path_8" data-name="Path 8" d="M14,8H8v6H6V8H0V6H6V0H8V6h6Z" fill="#8e9bad"/>
                      </g>
                    </g>
                  </g>
                </svg>
                </span>
              </button>
              <div v-if="!!imagePreviewSrc">
                <div :style="{ display: thumbnailFile ? 'block' : 'none' }" ref="overlay" class="overlay-block">
                </div>
                <span :style="{ display: thumbnailFile ? 'block' : 'none' }" @click="imagePreviewSrc = null" ref="deleteSvg" class="delete-image">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path id="Path_1262" data-name="Path 1262" d="M9,0a9,9,0,1,0,9,9A9.026,9.026,0,0,0,9,0Zm4.5,12.24L12.24,13.5,9,10.26,5.76,13.5,4.5,12.24,7.74,9,4.5,5.76,5.76,4.5,9,7.74,12.24,4.5,13.5,5.76,10.26,9Z" fill="#f02c5a"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="page-params">
            <p class="page-params__title">{{translations.trnsladm_parameters}}</p>
            <div class="page-params__inputs">
              <div
                class="form__label form__label--right"
              >
                <span class="form__label-inner form__label-inner--right">
                  {{translations.trnsladm_slug}}  <span style="color: #F02C5A"> *</span>
                </span>
                <Input
                  :id="`slug`"
                  v-model="slug"
                  placeholder="Slug"
                  autocomplete="off"
                  type="text"
                  :errorMessage="errors.hasOwnProperty('slug') && errors.slug[0]"
                  required
                />
              </div>
              <div
                class="form__label form__label--right"
              >
                <span class="form__label-inner form__label-inner--right">
                  {{translations.trnsladm_headline}}  <span style="color: #F02C5A"> *</span>
                </span>
                <Input
                  :id="slug"
                  v-model="pageHeadline[activeLang]"
                  placeholder="Заголовок страницы"
                  autocomplete="off"
                  type="text"
                  required
                />
              </div>
              <label
                :for="`${activeLang}-keywords`"
                class="form__label form__label--right"
              >
                <span class="form__label-inner form__label-inner--right">
                  {{translations.trnsladm_keywords}} <span style="color: #F02C5A"> *</span>
                </span>
                <input
                  v-model="keywords[activeLang]"
                  :id="`${activeLang}-keywords`"
                  class="form__input form__input--right"
                  placeholder="text"
                  type="text"
                  ref="keys"
                >
              </label>
              <label
                :for="`${activeLang}-description`"
                class="form__label form__label--right"
              >
                <span class="form__label-inner form__label-inner--right">
                  {{translations.trnsladm_description}} <span style="color: #F02C5A"> *</span>
                </span>
                <textarea
                  v-model="description[activeLang]"
                  :id="`${activeLang}-description`"
                  class="form__input form__input--right"
                  placeholder="text"
                  rows="3"
                  type="text"
                  style="min-height:70px;resize: vertical;"
                  ref="description"
                />
              </label>
            </div>
            <button type="button" v-on:click="submitAddCategory()" class="form__submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Input from '@/components/Form/Input'
  import CheckBox from '@/components/CheckBox.vue';
  import TreeChildrensMenuContainer from '@/components/TreeChildrensMenu/TreeChildrensMenuContainer.vue';
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Input,
      CheckBox,
      TreeChildrensMenuContainer
    },
    data() {
      const {languages} = this.$store.state.app;
      const {id} = this.$route.query;
      const langStorage = localStorage.getItem('langForm');
      const langs = languages.map(l => l.code);

      return {
        searchValue: '',
        id: id,
        data: null,
        ownLevel: this.$route.path === '/product-categories/add' ? 99 : 1,
        isEdit: !!id,
        firstLoadEdit: this.$route.name === 'edit--category',
        setCategory: null,
        childrenActive: null,
        tilesFetchedData: [],
        filteredData: [],
        activeLang: langStorage ? langStorage : 'ru',
        activeMenu: false,
        isActive: false,
        wasChangeIsActive: false,
        isFavoriteMenu: false,
        wasChangeIsFavoriteMenu: false,
        isMenu: false,
        wasChangeIsMenu: false,
        slug: null,
        wasChangeSlug: false,
        description: {
          ...langs
        },
        keywords: {
          ...langs
        },
        nameCategory: {
          ...langs
        },
        pageHeadline: {
          ...langs
        },
        rootCategory: null,
        imagePreviewSrc: null,
        thumbnailFile: null,
        errors: {}
      };
    },
    async mounted() {
      if (this.isEdit) {
        this.fetchCategory();
      }

      this.fetchCategoriesAll();
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      onChangeCheckBox({ target: { checked, name }}) {
        if (name === 'active') {
          this.isActive = checked;
          this.wasChangeIsActive = true
        }

        if (name === 'favorite') {
          this.isFavoriteMenu = checked;
          this.wasChangeIsFavoriteMenu = true
        }

        if (name === 'menu') {
          this.isMenu = checked;
          this.wasChangeIsMenu = true
        }
      },
      outside() {
        this.activeMenu = false;
      },
      async fetchCategoriesAll() {

        const categoriesStorage = localStorage.getItem(`${this.activeLang}_categories`);

        if (categoriesStorage) {
          return this.tilesFetchedData = JSON.parse(categoriesStorage)
        }

        this.tilesFetchedData = Object.values({...(await this.axios.get(`${process.env.VUE_APP_API_URL}admin/categories?lang=${this.activeLang}`)).data.data});
        this.tilesFetchedData.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);

        this.tilesFetchedData.map((data) => {
          if (data.hasOwnProperty('children')) {
            data.children = (Object.values({...data.children})).sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);

            data.children.map((child) => {
              if (child.hasOwnProperty('children')) {
                child.children = (Object.values({...child.children})).sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);
              }
            })
          }
        });

        localStorage.setItem(`${this.activeLang}_categories`, JSON.stringify(this.tilesFetchedData));
      },
      async fetchCategory() {
        const {data} = (await this.axios.get(`${process.env.VUE_APP_API_URL}category?lang=all&id=${this.$route.query.id}&parent_lang=${this.activeLang}`)).data;

        for (let lang of data.translationsmeta) {
          if (!this.nameCategory[lang.code]) {
            this.nameCategory[lang.code] = lang.pivot.short === "" ? lang.pivot.value : lang.pivot.short;
          }

          if (!this.keywords[lang.code]) {
            this.keywords[lang.code] = lang.pivot.meta_keys;
          }

          if (!this.description[lang.code]) {
            this.description[lang.code] = lang.pivot.meta_description;
          }

          if (!this.pageHeadline[lang.code]) {
            this.pageHeadline[lang.code] = lang.pivot.meta_title;
          }
        }

        if (!this.imagePreviewSrc) {
          this.imagePreviewSrc = `https://backend-dev.palermo.md` + data.image;
          this.thumbnailFile = data.image;
        }

        if ( ! this.wasChangeIsMenu) {
          this.isMenu = data.is_in_menu === 2;
        }

        if ( ! this.wasChangeIsFavoriteMenu) {
          this.isFavoriteMenu = data.is_in_favorite === 2;
        }

        if ( ! this.wasChangeIsActive) {
          this.isActive = data.is_active === 2;
        }

        if ( ! this.wasChangeSlug) {
          this.slug = data.slug;
        }

        this.setCategory = data;
        this.ownLevel = data.own_level;

        this.$forceUpdate();
      },
      onSetCategory(category) {
        this.setCategory = category;
        this.data = category;
        this.activeMenu = false;
        this.firstLoadEdit = false;
        this.$nextTick()
      },
      onActiveLangChange(lang) {
        localStorage.setItem('langForm', lang);
        this.activeLang = lang;
        this.fetchCategoriesAll();
        if (this.isEdit) {
          this.fetchCategory();
        }
      },
      setThumbnail(event) {
        this.thumbnailFile = event.target.files[0];
        // this.$refs.imagePreview.src = URL.createObjectURL(this.thumbnailFile);
        this.imagePreviewSrc = URL.createObjectURL(this.thumbnailFile);
        this.$refs.imagePreviewButton.style.backgroundColor = '#ffffff';
        this.$refs.deleteSvg.style.display = 'block';
        this.$refs.overlay.style.display = 'block';
      },
      formData() {
        const formData = new FormData();
        const {languages} = this.$store.state.app;
        const langs = languages.map(l => l.code);

        if (this.$route.name === 'edit--category') {
          formData.append(`id`, this.id);
          formData.append('parent_id', this.firstLoadEdit ? this.ownLevel === 1 ?  0 : this.setCategory.parent_id : this.setCategory.id);

          if (typeof this.thumbnailFile === 'string') {
            formData.append('image_hidden', this.thumbnailFile);
          } else {
            formData.append('image_hidden', "");
            formData.append('image', this.thumbnailFile);
          }
        } else if (this.$route.name === 'AddProductCategories') {
          formData.append('image_hidden', "");
          formData.append('image', this.thumbnailFile);

          formData.append('parent_id', this.firstLoadEdit ? 0 : this.setCategory ? this.setCategory.id : 0);
        }

        for (const lang of langs) {
          if (this.nameCategory[lang]) {
            formData.append(`${lang}_name`, this.nameCategory[lang]);
          }

          if (this.pageHeadline[lang]) {
            formData.append(`${lang}_meta_title`, this.pageHeadline[lang]);
          }

          if (this.keywords[lang]) {
            formData.append(`${lang}_meta_keys`, this.keywords[lang]);
          }

          if (this.description[lang]) {
            formData.append(`${lang}_meta_description`, this.description[lang]);
          }
        }

        formData.append('slug', this.slug);
        formData.append('is_in_menu', this.isMenu ? 2 : 1);
        formData.append('is_in_favorite', this.isFavoriteMenu ? 2 : 1);
        formData.append('is_active', this.isActive ? 2 : 1);

        return formData
      },
      submitAddCategory() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        this.axios.post(`${process.env.VUE_APP_API_URL}admin/category/${this.isEdit ? 'update' : 'store'}`, this.formData(),
          {headers: { Authorization: `Bearer ${credentials.access_token}` }})
          .then(data => {
            if (data.data.success) {
              this.$toast.open(`Категория ${this.nameCategory[this.$store.state.app.lang]} была успешно обновлена !`);
              return this.$router.push({ path: '/product-categories'})
            } else {
              console.error(data.data.message);
              this.errors = data.data.errors;
              this.$toast.open({
                message: `Не удалось ${this.isEdit ? 'редактировать' : 'создать'} категорию`,
                type: 'error'
              });
            }
          })
          .catch(e => {
            console.error(e);
          });
      },
      search() {
        let dataTilesFetchedData = [];

        for (let grandParent of this.tilesFetchedData) {
          if (grandParent.translation.toLowerCase().includes(this.searchValue.toLowerCase())) {
            dataTilesFetchedData = [...dataTilesFetchedData, grandParent]
          }

          if (grandParent.hasOwnProperty('children')) {
            for (let children of grandParent.children) {
              if (children.translation.toLowerCase().includes(this.searchValue.toLowerCase())) {
                dataTilesFetchedData = [...dataTilesFetchedData, grandParent]
              }

              if (children.hasOwnProperty('children')) {
                for (let child of children.children) {
                  if (child.translation.toLowerCase().includes(this.searchValue.toLowerCase())) {
                    dataTilesFetchedData = [...dataTilesFetchedData, grandParent]
                  }
                }
              }
            }
          }

          const uniqueArray = dataTilesFetchedData.filter((item, pos) => dataTilesFetchedData.indexOf(item) === pos);

          this.filteredData = uniqueArray;
        }
      },
    },
    watch: {
      slug() {
        this.wasChangeSlug = true
      },
      $route() {
        if (this.$route.name === 'AddProductCategories') {
          const {languages} = this.$store.state.app;
          const langs = languages.map(l => l.code);

          this.description = {
            ...langs
          }
          this.keywords = {
            ...langs
          }
          this.nameCategory = {
            ...langs
          }
          this.pageHeadline = {
            ...langs
          }

          this.slug = null;
          this.imagePreviewSrc = null;
          this.data = null;
          this.setCategory = null;
          this.isEdit = false;
        }
      },
      searchValue: function(){
        if (this.searchValue.length > 2) {
          this.search();
        } else {
          this.filteredData = [];
        }
      }
    },
    beforeDestroy: function() {
      // TODO remove the event listener
    },
  };
</script>

<style
  lang="scss"
>
  .product-categories-search-input-icon-form {
    position: absolute;
    right: 25px;
    top: 30px;
    transform: translateY(-50%);
  }
  .small-height {
    height: 84px !important;
  }
  .side-bar__arrow--down {
    & > svg {
      transform: rotate(0) !important;
    }
  }
  .arrow_wrapper {
    position: relative;
  }
  .dropdownCategories {
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    width: 100%;
    background-color: white;
    border: 1px solid #a4b0be;
    border-top: none;
    border-radius: 3px;
    left: 0;
    top: 54px;
    z-index: 7;
  }
  .set__category {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .set__category__arrow {
    transform-origin: center;

    & > svg {
      transform: rotate(180deg);
    }
  }
  .add-product-categories {
    height: 100%;
    overflow-y: auto;
    padding: 30px 30px 0;
  }

  .languages {
    align-items: center;
    display: flex;
    margin-bottom: 40px;
  }

  .languages__title {
    margin-right: 20px;
  }

  .form__form {
    padding-bottom: 100px;
  }

  .form__meta-row {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 70px;
  }

  .form__meta-row-thumbnail-preview {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .form__meta-row-side {
    align-items: center;
    display: flex;
    flex-wrap: wrap;

     & > div {
       margin-bottom: 30px;
     }
  }

  .thumbnail-preview {
    background-color: #F5F6FA;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    height: 155px;
    width: 155px;
    position: relative;
  }

  .form__meta-row-thumbnail-preview:hover .overlay-block {
    opacity: 0.3 !important;
  }

  .form__meta-row-thumbnail-preview:hover .delete-image {
    opacity: 1 !important;
  }

  .thumbnail-preview__img {
    border-radius: 5px;
    object-fit: contain;
    pointer-events: none;
    height: 155px;
    width: 155px;
    z-index: 1;
  }

  .overlay-block {
    position: absolute;
    top: 25px;
    z-index: 4;
    height: 155px;
    width: 155px;
    background-color: #3B4B68;
    border-radius: 5px;
    object-fit: contain;
    pointer-events: none;
    opacity: 0;
  }

  .delete-image {
    position: absolute;
    right: 10px;
    display: none;
    top: 33px;
    z-index: 5;
    cursor: pointer;
    opacity: 0;
  }

  .add-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }

  .img__none {
    border-radius: 5px;
    object-fit: contain;
    pointer-events: none;
    height: 155px;
    width: 155px;
  }

  .image-thumbnail-input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
  }

  .form__label-wrapper {
    margin-right: 30px;
  }

  .languages__checkboxes {
    display: flex;
  }

  .languages__language-checkbox {
    height: 30px;
    margin-right: 10px;
    position: relative;
    width: 30px;
  }

  .languages__checkbox {
    appearance: none;
    opacity: 0;
    position: absolute;

    &:checked + .languages__checkbox-label {
      background-color: $color-port-gore;
      border: 1px solid $color-port-gore;
      color: #FFFFFF;
    }
  }

  .languages__checkbox-label {
    align-items: center;
    border: 1px solid $color--light-gray;
    border-radius: 5px;
    color: $color-port-gore;
    cursor: pointer;
    display: inline-flex;
    font-size: 12px;
    font-weight: 400;
    height: 100%;
    justify-content: center;
    text-transform: uppercase;
    width: 100%;
  }

  .languages__title,
  .form__label {
    color: $color--dark--blue;
    font-size: 12px;
    font-weight: 400;
  }

  .form__label--right {
    display: flex;
    margin-bottom: 20px;
  }

  .form__label--top {
    margin-bottom: 10px;
  }

  .form__label-inner {
    display: block;
    margin-bottom: 10px;

    &--right {
      display: inline-flex;
      width: 195px;
    }
  }

  .form__label--lang {
    font-weight: 700;
    text-transform: uppercase;
  }

  .form__input {
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: $color--dark--blue;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    padding: 8px 15px;
    width: 365px;
    -webkit-appearance: none;

    &::placeholder {
      color: $color--light-gray;
    }
  }

  .form__checkboxes {
    align-items: center;
    display: flex;
    height: 100%;
    padding-top: 23px;
  }

  .form__checkbox {
    margin-right: 30px;
  }

  .page-params__title {
    color: $color--dark--blue;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  .page-params__inputs {
    display: flex;
    flex-direction: column;
  }

  .form__submit {
    background-color: #E0E4ED;
    border-radius: 5px;
    color: $color--dark--blue;
    font-size: 12px;
    font-weight: 400;
    margin-top: 20px;
    padding: 9px 50px;
  }
</style>
