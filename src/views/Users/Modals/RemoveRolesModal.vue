<template>
  <div class="users-big-modal">
    <ButtonCloseModal />
    <p class="head-text">Отменить (исключить) роль</p>

    <div class="addRolesContainerHead">
      <CheckBox
        :id="`addRoles`"
        :isChecked="areTilesChecked"
        @input="handleAllTilesCheck"
      />

      <div @click="sortRoles()" class="filter-arrows">
          <i :class="{ 'blue-color': rolesSort === 'asc' }" class="icon-expand-arrow"></i>
          <i :class="{ 'blue-color': rolesSort === 'desc' }" class="icon-expand-button"></i>

        </div>
      <p class="text">Название роли</p>

      <p class="text">Описание</p>
    </div>

    <div v-bind:key="role.id" v-for="role in sortedRoles" class="sub-content">
      <CheckBox
        :isChecked="!!selectedCheckboxes.find(c => parseInt(c) === role.id)"
        :id="`${role.name}`"
        :item="role"
        @input="addItemCheckbox"
      />

      <p class="text">{{role.name}}</p>
      <p class="text">{{role.description}}</p>

    </div>

    <div class="buttons-roles">
      <span @click='submitAddRoles'>
        <Button :disabled="selectedCheckboxes.length === 0" text="Добавить "/>
        </span>

        <span @click="$emit('close')">
          <Button cancel text="Отмена "/>
        </span>
    </div>

  </div>
</template>

<script>
  import Button from '@/components/Form/Button'
  import ButtonCloseModal from '@/components/ButtonCloseModal.vue'
  import CheckBox from '@/components/CheckBox.vue';
  import { mapGetters } from 'vuex'

  export default {
    name: 'RemoveRolesModal',
    components: {
      Button,
      ButtonCloseModal,
      CheckBox
    },
    props: {
      roles: {
        type: Array,
        required: true,
      },
      userIds: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        selectedCheckboxes: [],
        selectedRoles: [],
        sortedRoles: this.roles.sort(this.asc),
        rolesSort: 'asc',
        areTilesChecked: false,
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      sortRoles() {
        if (this.rolesSort === 'asc') {
          this.rolesSort = 'desc';
          this.roles.sort(this.desc)
        } else {
          this.rolesSort = 'asc';
          this.roles.sort(this.asc)
        }
      },
      desc( a, b ) {
        if ( a.name > b.name ){
          return -1;
        }
        if ( a.name < b.name ){
          return 1;
        }
        return 0;
      },
      asc( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      },
      addItemCheckbox(input) {
        const {$event: {target: {checked, id}}, item} = input;

        if (checked) {
          this.selectedCheckboxes.push(id);
          this.selectedRoles.push(item);
        } else {
          this.selectedRoles = this.selectedRoles.filter(u => u.id !== item.id);
          this.selectedCheckboxes = this.selectedCheckboxes.filter(d => d !== id);
        }
      },
      handleAllTilesCheck({target: {checked}}) {
        this.areTilesChecked = checked;
        if ( checked ) {
          this.selectedCheckboxes = this.roles.map(d => d.id.toString());
          this.selectedRoles = this.roles.map(d => d)
        } else {
          this.selectedCheckboxes = [];
          this.selectedRoles = [];
        }
      },
      async submitAddRoles() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        const {slug} = this.$store.state.user.info.actual_role;

        await this.axios.delete(`${process.env.VUE_APP_API_URL}${slug}/roles`,
          {
            headers: { Authorization: `Bearer ${credentials.access_token}` },
            params: {
              u_ids: this.userIds.map(d => parseInt(d.id)),
              r_ids: this.selectedRoles.map(d => parseInt(d.id)),
              what: 'for-users'
            }
          })
          .then(data => {
            if (data.data.success) {
              this.$emit('close');
              this.$toast.open({
                message: `Вы успешно добавили роли !`,
                type: 'success',
                duration: 3000
              });
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .sub-content {
    display: flex;
    padding: 15px 0;
    margin: 0 45px;
    border-bottom: 1px solid $color-solitude;

    .text {
      margin-left: 20px;
    }
  }

  .users-big-modal {
    padding: 35px 0 65px;
    position: relative;

    .addRolesContainerHead {
      display: flex;
      align-items: center;
      background-color: #F5F6FA;
      padding: 0 45px;
    }

    .text {
      font-size: 12px;
      color: $color--dark--blue;
      flex: 1;
    }

    .filter-arrows {
      display: inline-flex;
      flex-direction: column;
      margin-right: 10px;
      text-align: center;
      padding: 15px 0;
      cursor: pointer;
      margin-left: 20px;

      &:hover {
        i {
          color: $color--blue;
        }
      }

      i {
        font-size: 8px;
      }
    }

    .head-text {
      color: $color--dark--blue;
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 30px;
      padding-left: 45px;
    }
    .sub-text {
      color: $color--dark--blue;
      font-size: 12px;
      padding-bottom: 5px;
    }
  }

    .buttons-roles {
      display: flex;
      margin-top: 30px;
      width: 100%;
      padding-left: 45px;

      span {
        margin-right: 25px;
      }
    }

    .text-entry-email {
      font-size: 12px;
      color: $color--dark--blue;
      margin-bottom: 10px;
    }
</style>
