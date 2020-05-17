<template>
  <div class="parent-tile">
    <ManagementTile
      :hasChildren="!!tileData.children && !!tileData.children.length"
      :id="(tileData.id).toString()"
      :isDropDownOpen="showChildrenDropDown"
      :isTileChecked="checkAllTileRelatives"
      :menuState="menuState"
      :title="tileData.short === '' ? tileData.translation : tileData.short"
      @tile-checked="handleTileCheck"
      @tile-title-click="showChildrenDropDown = !showChildrenDropDown"
      :searchValue="searchValue"
      :dataCategory="tileData"
    />
    <template v-if="showChildrenDropDown && tileData.children && tileData.children.length">
      <draggable
        v-bind="dragOptions"
        v-model="tileData.children"
        @change="updateLvl2ListPosition($event, tileData.children)"
        @end="drag=false"
        @start="drag=true"
        :group="(tileData.id).toString()"
        handle=".management-tile__list-icon"
      >
        <transition-group
          :name="!drag ? 'flip-list' : null"
          type="transition"
        >
          <div
            :key="tileChildrenData.id"
            v-for="tileChildrenData in tileData.children"
            class="parent-tile__drop-down"
          >
            <ManagementTile
              :hasChildren="!!tileChildrenData.children && !!tileChildrenData.children.length"
              :id="(tileChildrenData.id).toString()"
              :isDropDownOpen="searchValue.length > 2 ? showNephewDropDown : selectedNephewDropDown === tileChildrenData.id "
              :isTileChecked="checkAllTileRelatives"
              :isChild="true"
              :menuState="[ tileChildrenData.is_active, tileChildrenData.is_in_menu, tileChildrenData.is_in_favorite ]"
              :title="tileChildrenData.short === '' ? tileChildrenData.translation : tileChildrenData.short"
              :searchValue="searchValue"
              :dataCategory="tileChildrenData"
              @tile-title-click="selectNephewDropDown(tileChildrenData.id)"
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
              <draggable
                v-bind="dragOptions1"
                v-model="tileChildrenData.children"
                @change="updateLvl2ListPosition($event, tileChildrenData.children)"
                @end="drag=false"
                @start="drag=true"
                :group="(tileChildrenData.id).toString()"
                handle=".management-tile__list-icon"
              >
                <transition-group
                  :name="!drag ? 'flip-list' : null"
                  type="transition"
                >
                  <div
                    :key="tileNephewData.id"
                    v-for="tileNephewData in tileChildrenData.children"
                    class="nephew-tile"
                  >
                  <ManagementTile
                    :id="(tileNephewData.id).toString()"
                    :isNephew="true"
                    :isTileChecked="checkAllTileRelatives"
                    :key="tileNephewData.id"
                    :menuState="[ tileNephewData.is_active, tileNephewData.is_in_menu, tileNephewData.is_in_favorite ]"
                    :title="tileNephewData.short === '' ? tileNephewData.translation : tileNephewData.short"
                    :searchValue="searchValue"
                    v-if="tileNephewData.translation.toLowerCase().includes(searchValue.toLowerCase())"
                    :dataCategory="tileNephewData"
                  />
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </transition-group>
      </draggable>
    </template>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  import ManagementTile from '@/components/ManagementTile/ManagementTile.vue';

  export default {
    props: {
      isChecked: {
        default: false,
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
    },
    components: {
      draggable,
      ManagementTile,
    },
    data() {
      return {
        checkAllTileRelatives: false,
        drag: false,
        selectedNephewDropDown: '',
        showChildrenDropDown: false,
        showNephewDropDown: false,
        showGrandTitle: true,
      };
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: 'lvl2',
          disabled: false,
          ghostClass: 'ghost'
        };
      },
      dragOptions1() {
        return {
          animation: 200,
          group: 'lvl3',
          disabled: false,
          ghostClass: 'ghost'
        }
      }
    },
    watch: {
      searchValue() {
          if (this.searchValue.length > 2 ) {
            this.showChildrenDropDown = true;
            this.showNephewDropDown = true;
          } else {
            this.showChildrenDropDown = false;
            this.showNephewDropDown = false;
          }
      },
      isChecked(isChecked) {
        this.handleTileCheck(isChecked);
      },
    },
    methods: {
      selectNephewDropDown(id) {
        this.selectedNephewDropDown = this.selectedNephewDropDown === id ? '' : id;
      },
      handleTileCheck(isChecked) {
        this.checkAllTileRelatives = isChecked;
      },
      async updateLvl2ListPosition({ moved: { element: { id, sort_order }, newIndex, oldIndex } }, array) {
        // Swapping the sort_order between the elements
        // const request = await this.axios.post(`https://backend-dev.palermo.md/api/admin/category/update/sort-order?id=${id}&sort_order=${this.tileData.children[ newIndex > oldIndex ? newIndex - 1 :  oldIndex + 1 ].sort_order + (newIndex > oldIndex ? 1 : -1) }`);

        const generatedArray = [];

        if (newIndex > oldIndex) {
          const tempSortOrder = array[newIndex].sort_order;

          for (let i = newIndex; i > oldIndex; i--) {
            // console.log(`[${i}] Sort order: `, this.tileData.children[i].sort_order, ' -> ', this.tileData.children[i - 1].sort_order)
            array[i].sort_order = array[i - 1].sort_order;
          }

          array[oldIndex].sort_order = tempSortOrder;

          for (let i = oldIndex; i < newIndex + 1; i++) {
            generatedArray.push([array[i].id, array[i].sort_order]);
          }
        }
        else {
          const tempSortOrder = array[newIndex].sort_order;

          for (let i = newIndex; i < oldIndex; i++) {
            // console.log(`[${i}] Sort order: `, this.tileData.children[i].sort_order, ' -> ', this.tileData.children[i - 1].sort_order)
            array[i].sort_order = array[i + 1].sort_order;
          }

          array[oldIndex].sort_order = tempSortOrder;

          for (let i = oldIndex; i >= newIndex; i--) {
            generatedArray.push([array[i].id, array[i].sort_order]);
          }
        }

        console.log('New items');
        console.dir(generatedArray);
        console.log(`http://backend-dev.palermo.md/api/admin/category/update/sort-order?sort_order_array=${ JSON.stringify(generatedArray) }`);
        await this.axios.post(`${process.env.VUE_APP_API_URL}admin/category/update/sort-order?sort_order_array=${ JSON.stringify(generatedArray) }`)
      }
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
