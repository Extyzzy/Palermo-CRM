<template>
  <div class="product-categories">
    <section class="product-categories__section-search-form">
      <form
        class="product-categories__search-form"
        style="justify-content: space-between"
        spellcheck="false"
      >
        <div style="display: flex">
          <div class="product-categories-search-input-container">
            <div class="product-categories-search-input-icon">
              <span style="cursor: pointer" v-if="searchValue !== ''" @click="searchValue = ''">
                <i id="close" class="icon-close-button"></i>
              </span>
              <span v-else><i class="icon-searching-magnifying-glass"></i></span>
            </div>
            <input
              class="product-categories__search-input"
              placeholder="Найти пользователей"
              v-model="searchValue"
              type="search"
            >
          </div>
          <ButtonLink
            :small="true"
            text="Добавить пользователя"
            to="/users/add"
          />
        </div>

        <div class="pagination--control">
          <p class="text">Показать на странице:</p>
            <span :class="{ 'blue-color': limit === 10 }" @click="setLimit(10)" class="number">10</span>
            <span :class="{ 'blue-color': limit === 25 }" @click="setLimit(25)" class="number">25</span>
            <span :class="{ 'blue-color': limit === 50 }" @click="setLimit(50)" class="number">50</span>
            <span :class="{ 'blue-color': limit === 100 }" @click="setLimit(100)" class="number">100</span>
            <span :class="{ 'blue-color': limit === 1000000 }" @click="setLimit(1000000)" class="number">все</span>
        </div>
      </form>
    </section>
    <section class="list-users">
      <div v-if="selectedCheckboxes.length" class="checkboxes-container">
        <Select
          :list="[
            {id: '1', name: 'Заблокировать пользователя'},
            {id: '2', name: 'Удалить пользователя'},
            {id: '3', name: 'Добавить роль'},
            {id: '4', name: 'Отменить (исключить) роль'},
            {id: '5', name: 'Отправить сообщение на E-mail'},
          ]"
          :selected="{id: '9', name: `Дествия для ${selectedCheckboxes.length} позиций`}"
          multi="simple"
          @changedValue="onClickValue"
          width="220px"
          padding="10px 13px"
        />
      </div>
      <div class="users_containers list__head_users">
        <div class="user list__head_user-child">

          <div v-if="!userSearch" class="list__head-column_users">
            <div class="list__head-title_users title-users-left">
              <CheckBox
                :id="`tile`"
                :isChecked="areTilesChecked"
                @input="handleAllTilesCheck"
              />
              <span @click="sortUsers" class="filter-arrows">
                <i :class="{ 'blue-color': usersSort === 'asc' }" class="icon-expand-arrow"></i>
                <i :class="{ 'blue-color': usersSort === 'desc' }" class="icon-expand-button"></i>
              </span>
              <div @click="userSearch = true"  class="search-area">Пользователь <i class="users-icon-search icon-searching-magnifying-glass"></i></div>
            </div>

          </div>

          <div v-else class="list__head-column_users">
            <div class="input--search--container">
              <input
                class="input--search"
                placeholder=""
                v-model="userValue"
                type="search"
                @focus="true"
                style="margin: 10px; width: 334px;"
              >
              <i @click="onCloseUsersSearch()" class="icon-close-button"></i>
            </div>
          </div>

          <div v-if="!companySearch" class="list__head-column_users">
            <div class="list__head-title_users title-users-left">

            <span @click="sortComapanies" class="filter-arrows">
                <i :class="{ 'blue-color': companiesSort === 'asc' }" class="icon-expand-arrow"></i>
                <i :class="{ 'blue-color': companiesSort === 'desc' }" class="icon-expand-button"></i>
              </span>
              <div  @click="companySearch = true"  class="search-area">Компания <i class="users-icon-search icon-searching-magnifying-glass"></i></div>

            </div>
          </div>

          <div v-else class="list__head-column_users">
            <div class="input--search--container">
              <input
                class="input--search"
                placeholder=""
                v-model="companyValue"
                type="search"
                @focus="true"
                style="margin: 10px; width: 334px;"
              >
              <i @click="onCloseCompanySearch()" class="icon-close-button"></i>
            </div>
          </div>

          <div v-if="!contactsSearch" @click="contactsSearch = true" class="contacts-search list__head-column_users">
            <div class="list__head-title_users">
              Контактные данные
            </div>
            <i @click="contactsSearch = true" class="users-icon-search icon-searching-magnifying-glass"></i>
          </div>

          <div v-else class="list__head-column_users">
            <div class="input--search--container">
              <input
                class="input--search"
                placeholder=""
                v-model="contactsValue"
                type="search"
                @focus="true"
                style="margin: 10px; width: 220px !important;"
              >
              <i @click="onCloseContactsSearch()" class="icon-close-button"></i>
            </div>
          </div>

          <div @click="sellerStatus = true" v-if="!sellerStatus" class="list__head-column_users">
            <div class="list__head-title_users">
              <span class="top-text">Статус продавца</span>
              <p class="sub-text">
                <span class="color-blue-top-text"
                      v-if="sellerStatusList.filter(a => a.checked).length">
                  {{sellerStatusList.find(a => a.checked).name}}
                </span>
                <span v-else>Все статусы</span>
              </p>
           </div>
            <i class="users-icon-down icon-expand-button"></i>
          </div>

          <div v-else class="list__head-column_users select">
              <SelectCheckboxes
                :list="sellerStatusList"
                :selected="{id: 'status-seller-6', name: `Статус продавца`}"
                @changedValue="list => sellerStatusList = list"
                width="100%"
                padding="10px 13px"
                @apply="sellerStatusListFilterData"
                @onClose="sellerStatus = false"
              />
            </div>

          <div @click="buyerStatus = true" v-if="!buyerStatus" class="list__head-column_users">
            <div class="list__head-title_users">
              <span class="top-text">Статус покупателя</span>
              <p class="sub-text">
                <span class="color-blue-top-text"
                      v-if="buyerStatusList.filter(a => a.checked).length">
                  {{buyerStatusList.find(a => a.checked).name}}
                </span>
                <span v-else>Все статусы</span>
              </p>
            </div>
            <i class="users-icon-down icon-expand-button"></i>
          </div>

          <div v-else class="list__head-column_users select">
            <SelectCheckboxes
              :list="buyerStatusList"
              :selected="{id: 'status-buyer-6', name: `Статус покупателя`}"
              @changedValue="list => buyerStatusList = list"
              width="100%"
              padding="10px 13px"
              @apply="buyerStatusListFilterData"
              @onClose="closeSelect"
            />
          </div>

          <div @click="openRolesList" v-if="!rolesStatus" class="list__head-column_users">
            <div class="list__head-title_users">
              <span class="top-text">Роль</span>
              <p class="sub-text">
                <span class="color-blue-top-text"
                      v-if="rolesStatusList.filter(a => a.checked).length">
                  {{rolesStatusList.find(a => a.checked).name}}
                </span>
                <span v-else>Все роли</span>
              </p>
            </div>
            <i class="users-icon-down icon-expand-button"></i>
          </div>

          <div v-else class="list__head-column_users select">
            <SelectCheckboxes
              :list="rolesStatusList"
              :selected="{id: 'status-roles-6', name: `Роль`}"
              @changedValue="list => rolesStatusList = list"
              width="100%"
              padding="10px 13px"
              @apply="rolesListFilterData"
              @onClose="closeRoles"
            />
          </div>

        </div>
      </div>

      <div class="not-found" v-if="!isloading && users.length === 0">
        {{ translations.trnsladm_notFound }}
      </div>

      <div class="not-found" v-if="isloading">
        Загружается..
      </div>

      <div v-else class="users_containers">
          <div :key="index"
               v-for="(user, index) in users"
               class="user">

            <div class="name_user">
              <CheckBox
                :isChecked="!!selectedCheckboxes.find(c => parseInt(c) === user.id)"
                :id="`${user.id}`"
                :item="user"
                @input="addItemCheckbox"
              />
              <h2 v-html="userValue === '' ? user.name : findWords(user.name, userValue)" @click="$router.push({ path: '/user', query: { id: user.id, type: 'general' }})" class="name"></h2>
            </div>
            <div class="name_user">
              <h2 v-html="user.my_company_as_worker.length > 0 ?
                companyValue === '' ? user.my_company_as_worker[0].name : findWords(user.my_company_as_worker[0].name, companyValue)
               : '' " class="name"></h2>
            </div>
            <div class="email_tel">
              <span v-html="contactsValue === '' ? user.email : typeof contactsValue === 'string'  ? findWords(user.email, contactsValue) : ''" class="email"></span>
              <h2 v-html="isNaN(parseInt(contactsValue)) ? user.phone : findWords(user.phone, contactsValue)"
                  class="telephone"></h2>
            </div>
            <div class="status">
              {{user.supplier_status_data && user.supplier_status_data.translation.value}}
            </div>
            <div class="status">
              {{user.buyer_status_data && user.buyer_status_data.translation.value}}
            </div>
            <div class="type">
                <span v-bind:key="index" v-for="(role, index) in user.roles_with_names">{{role.name}} <span v-if="(index + 1) !== user.roles_with_names.length">, </span></span>
            </div>
            <i @click='() => showMore === user.id ? showMore = "" : showMore = user.id' class="icon-more icon-show-more-button-with-three-dots"></i>
            <div v-if="showMore === user.id" class="showModal">
                <span @click='() => showMore = ""' class="item">Редактировать</span>
                <span @click='() => showMore = ""' class="item">Войти как пользователь</span>
                <span @click='showSendEmailModal([user])' class="item">Отправить сообщение на E-mail</span>
            </div>
          </div>
        <template v-if="users.length !== 0 && pagesNum !== currentPage">
          <div class="page__numbers">
            <button
              v-if="pagination.previous"
              @click="changeActivePage(activePageNum - 1)"
              class="page__number page__number-chevron"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8.108" viewBox="0 0 5 8.108"> <path id="Path_6" data-name="Path 6" d="M59.6,0l-.95.946,3.108,3.108L58.65,7.162l.946.946L63.65,4.054Z" transform="translate(63.65 8.108) rotate(180)" fill="#3b4b68" /> </svg>
            </button>
            <button
              v-if="pagination.initial"
              @click="changeActivePage(1)"
              class="page__number"
            >
              {{ 1 }}
            </button>
            <button
              v-if="pagination.initial"
              class="page__number"
              disabled
            >
              {{ '...' }}
            </button>
            <button @click="changeActivePage(index)" :class="{ 'page__number--active': index === activePageNum }" :key="index" v-for="index in pagination.paginationPages" class="page__number">
              {{ index }}
            </button>
            <button
              v-if="pagination.last"
              class="page__number"
              disabled
            >
              {{ '...' }}
            </button>
            <button
              v-if="pagination.last"
              @click="changeActivePage(pagesNum)"
              class="page__number"
            >
              {{ pagesNum }}
            </button>
            <button
              v-if="pagination.next"
              @click="changeActivePage(activePageNum + 1)"
              class="page__number page__number-chevron"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8.108" viewBox="0 0 5 8.108"> <path id="Path_6" data-name="Path 6" d="M59.6,0l-.95.946,3.108,3.108L58.65,7.162l.946.946L63.65,4.054Z" transform="translate(-58.65)" fill="#3b4b68" /> </svg>
            </button>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ButtonLink from '@/components/Form/ButtonLink.vue';
  import Select from '@/components/Form/Select.vue';
  import CheckBox from '@/components/CheckBox.vue';
  import SelectCheckboxes from './components/SelectCheckboxes.vue';
  import DeleteUsersModal from './Modals/DeleteUsersModal.vue';
  import BlockUsersModal from './Modals/BlockUsersModal.vue';
  import SendEmailUsersModal from './Modals/SendEmailUsersModal.vue';
  import AddRolesModal from './Modals/AddRolesModal.vue';
  import RemoveRolesModal from './Modals/RemoveRolesModal.vue';
  import endpoint from '../../helpers/endpoint.js'

  export default {
    components: {
      ButtonLink,
      CheckBox,
      SelectCheckboxes,
      Select
    },
    data() {
      return {
        activePageNum: parseInt(this.$route.query.page) || 1,
        pagesNum: 0,
        currentPage: 1,
        limit: 10,
        users: [],
        filteredData: [],
        selectedCheckboxes: [],
        selectedUsers: [],
        searchValue: '',
        showMore: '',
        usersSort: 'asc',
        companiesSort: '',
        isloading: false,
        areTilesChecked: false,
        userSearch: false,
        contactsSearch: false,
        companySearch: false,
        buyerStatus: false,
        sellerStatus: false,
        rolesStatus: false,
        rolesStatusList: [],
        sellerStatusList: [],
        buyerStatusList: [],
        rolesList: [],
        companyValue: '',
        userValue: '',
        contactsValue: '',
      };
    },
    mounted() {
      this.fetchUsers();
      this.fetchHeadFilterList();
    },
    methods: {
      outside () {
        this.sellerStatus = false;
      },
      onClickValue(list) {
        console.info('Checkbox event =>', list);
        switch (parseInt(list.id)) {
          case 1:
            this.showBlockUsersModal();
            break;
          case 2:
            this.showDeleteUsersModal();
            break;
          case 3:
            this.showAddRolesModal();
            break;
          case 4:
            this.showRemoveRolesModal();
            break;
          case 5:
            this.showSendEmailModal(this.selectedUsers);
            break;
        }
      },
      showSendEmailModal (users) {
        this.showMore = "";
        this.$modal.show(SendEmailUsersModal, {
          users: users,
        },{
          height: 'auto',
          width: '733px'
        })
      },
      showBlockUsersModal () {
        this.showMore = "";
        this.$modal.show(BlockUsersModal, {
          usersIds: this.selectedCheckboxes,
          users: this.selectedUsers,
        },{
          height: '239px',
          width: '454px'
        }, {
          'before-close': (event) => { this.fetchUsers() }
        })
      },
      showDeleteUsersModal () {
        this.showMore = "";
        this.$modal.show(DeleteUsersModal, {
          usersIds: this.selectedCheckboxes
        },{
          height: '239px',
          width: '454px'
        }, {
          'before-close': (event) => { this.fetchUsers() }
        })
      },
      showAddRolesModal () {
        this.showMore = "";
        this.$modal.show(AddRolesModal, {
          roles: this.rolesList,
          userIds: this.selectedUsers,
        },{
          height: 'auto',
          width: '733px'
        }, {
          'before-close': (event) => { this.fetchUsers() }
        })
      },
      showRemoveRolesModal () {
        this.showMore = "";
        this.$modal.show(RemoveRolesModal, {
          roles: this.rolesList,
          userIds: this.selectedUsers,
        },{
          height: 'auto',
          width: '733px'
        }, {
          'before-close': (event) => { this.fetchUsers() }
        })
      },
      setLimit(number) {
        this.limit = number;
        this.fetchUsers()
      },
      indexOfEnd (formatedeSuggestion, searchValue) {
        const io = formatedeSuggestion.indexOf(searchValue);

        return io === -1 ? -1 : io + searchValue.length
      },
      findWords(value, searchValue) {
        const title = value.toString().toLowerCase();
        const search = searchValue.toString().toLowerCase();

        const one = title.slice(0, title.indexOf(search));
        const two = title.slice(title.indexOf(search), this.indexOfEnd(title, search));
        const three = title.slice(this.indexOfEnd(title, search), title.length);

        return `${one}<span class="search-dropdown__link--bold">${two}</span>${three}`
      },
      onCloseCompanySearch() {
        this.companyValue = '';
        this.companySearch = false;
        this.fetchUsers()
      },
      onCloseUsersSearch() {
        this.userValue = '';
        this.userSearch = false;
        this.fetchUsers()
      },
      onCloseContactsSearch() {
        this.contactsValue = '';
        this.contactsSearch = false;
        this.fetchUsers()
      },
      openRolesList () {
        this.rolesStatus = true;
        this.rolesStatusList.length === 0 && this.$store.dispatch('user/fetchAvailableRoles')
            .then(data => {
              this.rolesStatusList = [{id: 'all', name: 'Все роли', checked: false}, ...data.map(data => ({id: data.id, name: data.name, checked: false}))]
            });
      },
      rolesListFilterData() {
        this.fetchUsers();
        this.closeRoles();
      },
      closeRoles() {
        this.rolesStatus = false
      },
      closeSelect() {
        this.buyerStatus = false
      },
      sellerStatusListFilterData() {
        this.sellerStatus = false;
        this.fetchUsers()
      },
      buyerStatusListFilterData() {
        this.buyerStatus = false;
        this.fetchUsers()
      },
      sortComapanies() {
        this.usersSort = '';

        if ( this.companiesSort === 'desc' || this.companiesSort === '') {
          this.companiesSort = 'asc';
        } else {
          this.companiesSort = 'desc';
        }

        this.fetchUsers()
      },
      sortUsers() {
        this.companiesSort = '';

        if ( this.usersSort === 'desc' || this.usersSort === '') {
          this.usersSort = 'asc';
        } else {
          this.usersSort = 'desc';
        }

        this.fetchUsers()
      },
      handleAllTilesCheck({target: {checked}}) {
        this.areTilesChecked = checked;
        if ( checked ) {
            this.selectedCheckboxes = this.users.map(d => d.id.toString());
            this.selectedUsers = this.users.map(d => d);
        } else {
          this.selectedCheckboxes = [];
          this.selectedUsers = [];
        }
      },
      addItemCheckbox(input) {
        const {$event: {target: {checked, id}}, item} = input;
        this.userSearch = false;

        if (checked) {
          this.selectedCheckboxes.push(id);
          this.selectedUsers.push(item);
        } else {
          this.selectedUsers = this.selectedUsers.filter(u => u.id !== item.id);
          this.selectedCheckboxes = this.selectedCheckboxes.filter(d => d !== id);
        }
      },
      changeActivePage (pageNumber) {
        this.areTilesChecked = false;
        this.selectedCheckboxes = [];
        this.selectedUsers = [];
        this.activePageNum = pageNumber;
        const query = { ...this.$route.query };

        if (this.activePageNum !== 1) {
          this.$router.push({ query: { ...query, page: this.activePageNum } })
        } else if (query.hasOwnProperty('page')) {
          delete query.page
          this.$router.push({ query: { ...query } })
        }
        this.fetchUsers()
      },
      async fetchHeadFilterList() {
        const {lang} = this.$store.state.app;

        await this.axios.get(`${process.env.VUE_APP_API_URL}information/supplier-statuses?lang=${lang}`)
          .then(data => {
            if (data.data.success) {
              this.sellerStatusList = [{id: 'all', name: 'Все статусы', checked: false},
                ...data.data.data.map(supplier => ({id: supplier.supplierstatus_id, name: supplier.value, checked: false}))
              ]
            }
          });

        await this.axios.get(`${process.env.VUE_APP_API_URL}information/buyer-statuses?lang=${lang}`)
          .then(data => {
            if (data.data.success) {
              this.buyerStatusList = [{id: 'all', name: 'Все статусы', checked: false},
                ...data.data.data.map(buyer => ({id: buyer.buyerstatus_id, name: buyer.value, checked: false}))
              ]
            }
          });
        this.$store.dispatch('user/fetchAvailableRoles')
          .then(data => {
            this.rolesList = data;
            this.rolesStatusList = [
              {id: 'all', name: 'Все роли', checked: false},
              ...data.map(data => ({id: data.id, name: data.name, slug: data.slug, checked: false}))
            ]
          });
      },
      async fetchUsers() {
        this.isloading = true;
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        const statusSupplier = this.sellerStatusList.filter(d => d.checked === true && d.id !== "all").map(c => c.id);
        const statusBuyer = this.buyerStatusList.filter(d => d.checked === true && d.id !== "all").map(c => c.id);
        const roles = this.rolesStatusList.filter(d => d.checked === true && d.id !== "all").map(c => c.id);

        await this.axios.get(`${endpoint('users')}`, {
          headers: { Authorization: `Bearer ${credentials.access_token}` },
          params: {
            limit: this.limit,
            page: this.activePageNum,
            lang: this.$store.state.app.lang,
            filter: 3,
            'sort-relation-suppliers-name': this.usersSort === '' ? this.companiesSort === 'desc' ? 'desc' : 'asc' : null,
            'sort-entity-users-name': this.companiesSort === '' ? this.usersSort === 'desc' ? 'desc' : 'asc' : null,
            'search-all': this.searchValue ? this.searchValue : null,
            'sts_ids': statusSupplier.length ? statusSupplier : null,
            'stb_ids': statusBuyer.length ? statusBuyer : null,
            'r_ids': roles.length ? roles : null,
            'fentity-name': this.searchValue === '' && this.userValue !== '' ? this.userValue : null,
            'frelation-name': this.searchValue === '' && this.companyValue !== '' ? this.companyValue : null,
            'fentity-contacts': this.searchValue === '' && this.contactsValue !== '' ? this.contactsValue : null
          }
        })
          .then(data => {
            if (data.data.success) {
              if (data.data.data.data.length === 0) {
                this.users = [];
                this.pagesNum = 0;
                this.currentPage = 1;
              } else {
                this.users = data.data.data.data;
                this.pagesNum = data.data.data.last_page;
                this.currentPage = data.data.data.current_page;
              }
            } else {
              this.$toast.open({
                message: `Не удалось загрузить пользователей`,
                type: 'error'
              });
            }
            this.isloading = false
          })
          .catch(e => {
            alert(e);
            this.isloading = false
          });
      },
    },
    computed: {
      ...mapGetters({
        lang: 'app/lang',
        translations: 'app/translations',
        accessToken: 'user/accessToken',
        permissions: 'user/permissions'
      }),
      searchValueLowerCase () {
        return this.userValue.toLowerCase()
      },
      pagination () {
        const { activePageNum, pagesNum } = this
        const paginationStructure = {
          paginationPages: []
        }

        // Previous page button
        paginationStructure.previous = activePageNum > 1

        // Initial page
        paginationStructure.initial = activePageNum > 4

        // Last page
        paginationStructure.last = pagesNum - activePageNum > 3

        // Next page button
        paginationStructure.next = activePageNum < pagesNum

        // Show the first page button in case that the active page is the 4th one
        if (activePageNum === 4) {
          paginationStructure.paginationPages.push(1)
        }

        // Previous 2 page buttons
        for (let i = activePageNum - 2; i < activePageNum; i++) {
          if (i > 0) {
            paginationStructure.paginationPages.push(i)
            paginationStructure.previous = true
          } else {
            paginationStructure.previous = false
          }
        }

        // Push current page
        paginationStructure.paginationPages.push(activePageNum)

        // Next 2 page buttons
        for (let i = activePageNum + 1; i < activePageNum + 3; i++) {
          if (i <= pagesNum) {
            paginationStructure.paginationPages.push(i)
          } else {
            if (activePageNum !== 4) {
              paginationStructure.next = false
            }
            break
          }
        }

        // Show the last page button in case that the active page is the (lastPage - 3) one
        if (activePageNum + 3 === pagesNum) {
          paginationStructure.paginationPages.push(pagesNum)
        }

        return paginationStructure
      }
    },
    watch: {
      userValue(value) {
        if (value.length > 2 && this.searchValue === '') {
          this.fetchUsers()
        }
      },
      companyValue(value) {
        if (value.length > 2 && this.searchValue === '') {
            this.fetchUsers()
        }
      },
      contactsValue(value) {
        if (value.length > 2 && this.searchValue === '') {
           this.fetchUsers()
        }
      },
      searchValue(value) {
        if (value.length > 2) {
          this.contactsValue = value;
          this.companyValue = value;
          this.userValue = value;

          this.fetchUsers();
        } else if (value === '') {
          this.contactsValue = '';
          this.companyValue = '';
          this.userValue = '';
          this.fetchUsers()
        }
      }
    }
  }
</script>

<style lang="scss">
  .search-dropdown__link--bold {
    color: $color--blue;
  }
  .checkboxes-container {
    position: absolute;
    top: 8px;
    left: 60px;
    width: 100px;
    height: 30px;
  }
  .list-users {
    position: relative;
  }
  .page__numbers {
    display: flex;
    margin-top: 15px;
    margin-left: 30px;
  }
  .page__number {
    background-color: #ffffff;
    border: 1px solid $color--light-gray;
    border-radius: 5px;
    color: #3B4B68;
    cursor: pointer;
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    height: 30px;
    margin-right: 5px;
    outline: none;
    padding: 0;
    transition: background-color 150ms, border 150ms, color 150ms;
    width: 30px;
  }
  .page__number:not(:disabled):hover {
    background-color: #E0E4ED;
    border: 1px solid #E0E4ED;
    color: #3B4B68;
  }
  .page__number:disabled:hover {
    cursor: auto;
  }
  .page__number--active,
  .page__number--active:hover {
    background-color: $color--light-gray;
    border: 1px solid $color--light-gray;
    color: #ffffff;
  }
  .users_containers {
    height: 72.5vh;
    overflow-y: scroll;

    .user {
      display: flex;
      height: 70px;
      padding: 0 30px;
      align-items: center;
      border-bottom: 1px solid #E0E4ED;
      position: relative;

      .icon-more {
        position: absolute;
        right: 15px !important;
        cursor: pointer;
        color: $color--dark--blue;
      }

      .showModal {
        position: absolute;
        right: 35px !important;
        top: 15px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 10px 0;
        box-shadow: 0 3px 25px rgba(59, 75, 104, 0.3);
        z-index: 13;
        border-radius: 5px;

        .item {
          color: $color--dark--blue;
          padding: 10px 15px;
          font-size: 12px;

          &:hover {
            background-color: $color-solitude;
          }
        }
      }

      &:hover {
        background-color :#F5F6FA;
      }

      & > div {
        justify-content: space-between;

         & > i {
           margin-right: 15px;
         }
      }

      & > div:nth-child(1) {
        flex: 0.2
      }

      & > div:nth-child(2) {
        flex: 0.2
      }

      & > div:nth-child(3) {
        flex: 0.18
      }

      & > div:nth-child(4) {
        flex: 0.14;
        cursor: pointer;
        &:hover {
          .top-text {
            color: $color--blue;
          }
        }
      }
      & > div:nth-child(5) {
        flex: 0.14;
        cursor: pointer;
        &:hover {
          .top-text {
            color: $color--blue;
          }
        }
      }
      & > div:nth-child(6) {
        cursor: pointer;
        flex: 0.16;
        overflow: hidden;
        width: 100px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        padding: 0 !important;
        &:hover {
          .top-text {
            color: $color--blue;
          }
        }
      }

      .status {
        font-size: 12px;
        color: $color--dark--blue;
        font-weight: 500;
      }

      .type {
        font-size: 12px;
        color: #3B4B68;
        font-weight: 500;
      }
      .image {
        margin-right: 10px;

        & > img {
          width: 70px;
          height: 70px;
        }
      }
      .name_user {
        display: flex;

        & > label {
          margin-right: 20px;
        }
        .role {
          color: $color--light-gray;
          font-size: 12px;
        }

        .name {
          font-size: 12px;
          color: $color--dark--blue;
          font-weight: 500;
          padding: 33px 0;
          width: 100%;
          cursor: pointer;

          &:hover {
            color: $color--blue !important;
          }
        }
      }
      .email_tel {
        font-size: 12px;
        color: $color--dark--blue;
        cursor: pointer;

        .telephone {
          margin-top: 5px;
          font-weight: 400;
          font-size: 12px;
        }
      }
    }
  }

  .list__head_users {
    background-color: #F5F6FA;
    height: 50px;
    overflow-y: visible !important;

    .list__head_user-child {
      height: 50px;
      padding-right: 43px !important;
    }

    .select {
      z-index: 99;
      margin-top: 9px;
      overflow: inherit !important;
    }
    .contacts-search {
      cursor: pointer;

      &:hover {
        .users-icon-search {
          color: $color--blue
        }
      }
    }
    .list__head-column_users {
      align-items: center;
      display: flex !important;
      justify-content: flex-start;
      padding: 0 !important;
      position: relative;

      &:hover {
        .users-icon-down {
          color: $color--blue;
        }
      }
      .input--search--container {
        position: relative;

        .input--search {
          cursor: pointer;
          width: 250px !important;
          padding: 9px 12px;
          z-index: 20;
          margin: 0 !important;
          border: 1px solid #3B4B68;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(59,75,104,0.3) !important;
        }

        & > i {
          font-size: 13px;
          position: absolute;
          right: 10px;
          top: 11px;
          z-index: 13;

          &:hover {
            cursor: pointer;
            color: #3B4B68;
          }
        }

      }

      .users-icon-down {
        font-size: 12px;
        cursor: pointer;
        padding: 15px 0;

      }
      .users-icon-search {
        font-size: 16px;
        cursor: pointer;
        padding: 15px 0;
        margin-right: 15px;

        &:hover {
          color: $color--blue;
        }
      }
      .title-users-left {
        display: flex;
        line-height: 46px;
        width: 100%;

        .search-area {
          width: 100%;
          cursor: pointer;
          display: flex;
          justify-content: space-between;

          &:hover {
            .users-icon-search {
              color: $color--blue;
            }
          }
        }
      }
      .list__head-title_users {

        p {
          color: #8E9BAD;
        }

        .filter-arrows {
          display: inline-flex;
          flex-direction: column;
          margin-right: 10px;
          text-align: center;
          padding: 15px 0;
          cursor: pointer;

          &:hover {
            i {
              color: $color--blue;
            }
          }

          i {
            font-size: 8px;
          }
        }
        .color-blue-top-text {
          color: $color--blue;
        }
        .users-icon {
          font-size: 14px;
          margin-right: 10px;
          cursor: pointer;
          padding: 15px 0;

          &:hover {
            color: $color--blue;
          }
        }
        & > label {
          margin-right: 18px;
        }

        & > .name {
          padding: 33px 0;
        }

        color: #3B4B68;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
  .pagination--control {
    font-size: 12px;
    color: #3B4B68;
    display: flex;

    .text {
      padding-right: 20px;
    }


    .number {
      cursor: pointer;
      padding: 0 5px;

      &:hover {
        color: $color--blue;
      }
    }
  }
  .blue-color {
    color: $color--blue;
  }
  #close {
    font-size: 10px;
  }
</style>
