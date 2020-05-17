<template>
  <div class="parent-tile">
    <TreeChildrensMenu
      :hasChildren="!!tileData.children && !!tileData.children.length"
      :id="(tileData.id).toString()"
      :data="tileData"
      :isDropDownOpen="showChildrenDropDown"
      :isTileChecked="checkAllTileRelatives"
      :title="tileData.short === '' ? tileData.translation : tileData.short"
      @tile-checked="handleTileCheck"
      @tile-title-click="showChildrenDropDown = !showChildrenDropDown"
      :searchValue="searchValue"
      :ownlvl="tileData.own_level"
      :setCategory="setCategory"
      :firstLoadEdit="firstLoadEdit"
      @onSetCategory="category => $emit('onSetCategory', category)"
    />
    <template v-if="showChildrenDropDown && tileData.children && tileData.children.length">
          <div
            :key="tileChildrenData.id"
            v-for="tileChildrenData in tileData.children"
            class="parent-tile__drop-down"
          >
            <TreeChildrensMenu
              :hasChildren="!!tileChildrenData.children && !!tileChildrenData.children.length"
              :data="tileChildrenData"
              :id="(tileChildrenData.id).toString()"
              :isDropDownOpen="searchValue.length > 2 ? showNephewDropDown : selectedNephewDropDown === tileChildrenData.id "
              :isTileChecked="checkAllTileRelatives"
              :isChild="true"
              :menuState="[ tileChildrenData.is_active, tileChildrenData.is_in_menu, tileChildrenData.is_in_favorite ]"
              :title="tileChildrenData.short === '' ? tileChildrenData.translation : tileChildrenData.short"
              :searchValue="searchValue"
              :ownlvl="tileChildrenData.own_level"
              @onSetCategory="category => $emit('onSetCategory', category)"
              @tile-title-click="selectNephewDropDown(tileChildrenData.id)"
              :setCategory="setCategory"
              :firstLoadEdit="firstLoadEdit"
              v-if="tileChildrenData.children ? tileChildrenData.children.find(child => child.translation.toLowerCase().includes(searchValue.toLowerCase())) || tileChildrenData.translation.toLowerCase().includes(searchValue.toLowerCase()) :
                    tileChildrenData.translation.toLowerCase().includes(searchValue.toLowerCase())"
            />
            <div
              v-if="
                searchValue.length > 2 ? showNephewDropDown  :
                selectedNephewDropDown === tileChildrenData.id
                && tileChildrenData.children
                && tileChildrenData.children.length
              "
              class="child-tile__drop-down"
            >
                  <div
                    :key="tileNephewData.id"
                    v-for="tileNephewData in tileChildrenData.children"
                    class="nephew-tile"
                  >
                  <TreeChildrensMenu
                    :id="(tileNephewData.id).toString()"
                    :isNephew="true"
                    :data="tileNephewData"
                    :isTileChecked="checkAllTileRelatives"
                    :key="tileNephewData.id"
                    :menuState="[ tileNephewData.is_active, tileNephewData.is_in_menu, tileNephewData.is_in_favorite ]"
                    :title="tileNephewData.short === '' ? tileNephewData.translation : tileNephewData.short"
                    :searchValue="searchValue"
                    :ownlvl="tileNephewData.own_level"
                    v-if="tileNephewData.translation.toLowerCase().includes(searchValue.toLowerCase())"
                    @onSetCategory="category => $emit('onSetCategory', category)"
                    :setCategory="setCategory"
                    :firstLoadEdit="firstLoadEdit"
                  />
                  </div>
            </div>
          </div>
    </template>
  </div>
</template>

<script>

import TreeChildrensMenu from '@/components/TreeChildrensMenu/TreeChildrensMenu.vue';

export default {
  props: {
    firstLoadEdit: {
      type: Boolean,
    },
    onSetCategory: {
      type: Function
    },
    isEdit: {
      default: false,
      type: Boolean,
    },
    isChecked: {
      default: false,
      type: Boolean,
    },
    activeMenu: {
      required: true,
      type: Boolean,
    },
    menuState: {
      type: Array,
    },
    tileData: {
      type: Object,
      required: true,
    },
    searchValue: {
      required: true,
      type: String
    },
    setCategory: {
      required: false,
      type: Object
    }
  },
  components: {
    TreeChildrensMenu,
  },
  data() {
    return {
      checkAllTileRelatives: false,
      selectedNephewDropDown: '',
      showChildrenDropDown: false,
      showNephewDropDown: false,
      showGrandTitle: true,
    };
  },
  mounted() {
    if (this.setCategory) {
      this.openDropdown()
    }
  },
  watch: {
    activeMenu() {
      if (activeMenu) {
        this.openDropdown()
      }
    },
    searchValue() {
      if (this.searchValue.length > 2) {
        this.showChildrenDropDown = true;
        this.showNephewDropDown = true;
      } else {
        this.showChildrenDropDown = false;
        this.showNephewDropDown = false;
      }
    },
  },
  methods: {
    openDropdown() {
      if (this.tileData.hasOwnProperty('children')) {
        if (!!this.tileData.children.find(data => data.id === this.setCategory.id)) {
          this.showChildrenDropDown = true;
          this.showNephewDropDown = false;
        }

        let isFound;
        for (let child of this.tileData.children) {
          if (child.hasOwnProperty('children')) {
            const founded = child.children.find(data => data.id === this.setCategory.id);
            if (founded) {
              isFound = founded;
              break;
            }
          }
        }

        if (isFound) {
          this.showChildrenDropDown = true;
          this.showNephewDropDown = true;
          this.selectedNephewDropDown = isFound.parent_id;
        }
      }
    },
    handleTileCheck(isChecked) {
      this.checkAllTileRelatives = isChecked;
      console.log('Parent tile is checked?', isChecked);
    },
    selectNephewDropDown(id) {
      this.selectedNephewDropDown = this.selectedNephewDropDown === id ? '' : id;
    },
  }
};
</script>

<style lang="scss" scoped>
  /* Drag and drop styles */
  .flip-list-move {
    transition: transform 0.5s;
  }

  .ghost {
    opacity: 0.5;
    background: #f5f6fa;
  }
</style>
