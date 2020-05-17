<template>
  <div>
    <div class="management-tile">
    <div class="management-tile__container">
      <div class="management-tile__column management-tile__column--naming"
      >
        <div class="management-tile__tile-checkbox">
          <CheckBox
            :id="id"
            :isDisabled="true"
          />
        </div>
        <div class="management-tile__list-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10"><path d="M0,108H2v-2H0Zm0,4H2v-2H0Zm0-8H2v-2H0Zm4,4H18v-2H4Zm0,4H18v-2H4Zm0-10v2H18v-2Z" transform="translate(0 -102)" fill="#8e9bad"/></svg>
        </div>
        <button
          class="management-tile__name"
        >
          <div class="management-tile__name-load"></div>
          <span class="management-tile__name-drop-down-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="6.486" viewBox="0 0 4 6.486"><path d="M.757,0,0,.757,2.486,3.243,0,5.73l.757.757L4,3.243Z" fill="#3b4b68" /></svg>
          </span>
        </button>
      </div>
      <div class="management-tile__column management-tile__column--display">
        <CheckBox
          :id="`${id}-active`"
          :isDisabled="true"
          class="management-tile__checkbox"
          text="активна"
        />
        <CheckBox
          :id="`${id}-in-menu`"
          :isDisabled="true"
          class="management-tile__checkbox"
          text="в меню"
        />
        <CheckBox
          :id="`${id}-in-favorite-menu`"
          :isDisabled="true"
          class="management-tile__checkbox"
          text="в избранном меню"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue';

export default {
  name: 'ManagementTileSkeleton',
  components: {
    CheckBox,
  },
  props: {
    id: {
      required: true,
      type: String,
    }
  },
  methods: {
    handleTileCheckBox(isChecked) {
      this.$emit('tile-checked', isChecked);
    },
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
  opacity: 0.6;
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
  width: 470px;
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

@keyframes loading {
  0% {
    transform: translateX(calc(0% - 50px));
  }
  100% {
    transform: translateX(100%);
  }
}

.management-tile__name {
  align-items: center;
  background-color: $color-solitude;
  border-radius: 5px;
  color: #3B4B68;
  cursor: default;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  margin-left: 15px;
  overflow: hidden;
  padding: 9px 25%;
  position: relative;
  width: 50px;

  &-load {
    animation: loading 1250ms infinite;
    animation-timing-function: linear;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateX(0%);
    width: 100%;

    &::after {
      background-image: linear-gradient(90deg, rgba(211, 211, 211, 0) 0, rgba(255, 255, 255, 0.5) 50%, rgba(211, 211, 211, 0) 100%);
      background-position: 0 250%;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 75px;
    }
  }
}

.management-tile__name-drop-down-icon {
  display: inline-flex;
  left: -15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.management-tile__checkbox {
  margin-right: 30px;
}
</style>
