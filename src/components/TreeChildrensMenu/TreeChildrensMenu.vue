<template>
  <div class="container">
    <button
      @click.prevent="$emit('tile-title-click')"
      class="management-tile__name grandParent"
    >
      <div :class="{
            'right-ownlvl-two': ownlvl === 2,
            'right-ownlvl-three': ownlvl === 3
          }">
        <span
          v-if="hasChildren"
        >
        <svg  :class="{
            'rotate': isDropDownOpen,
          }"  class="arrow" xmlns="http://www.w3.org/2000/svg" width="4" height="6.486" viewBox="0 0 4 6.486">
          <path id="Path_6" data-name="Path 6" d="M.757,0,0,.757,2.486,3.243,0,5.73l.757.757L4,3.243Z" fill="#3b4b68"/>
        </svg>
      </span>
        <span v-if="searchValue === ''">{{title}}</span>
        <span v-else>{{`${title.slice(0, title.toLowerCase().indexOf(searchValueLowerCase))}`}}<span class="search-dropdown__link--bold">{{`${title.slice(title.toLowerCase().indexOf(searchValueLowerCase), indexOfEnd(title.toLowerCase()))}`}}</span>{{`${title.slice(indexOfEnd(title.toLowerCase()), title.length)}`}}</span>
      </div>
    </button>

    <span v-if="$route.name === 'AddProductCategories' ? !!data.children : (!!data.children && (firstLoadEdit ? setCategory && setCategory.parent_id.toString() !== id : setCategory && setCategory.id.toString() !== id))"
          @click="$emit('onSetCategory', data)" class="radio-button">
      <svg id="radio_button" data-name="radio button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <g id="circle-outline">
          <g id="check-circle-outline-blank">
            <path id="Path_1311" data-name="Path 1311" d="M7.5,0A7.5,7.5,0,1,1,0,7.5,7.5,7.5,0,0,1,7.5,0Z" transform="translate(0.5 0.5)" fill="#fff"/>
            <path id="Path_1254" data-name="Path 1254" d="M8,0a8,8,0,1,0,8,8A8.024,8.024,0,0,0,8,0ZM8,14.4A6.4,6.4,0,1,1,14.4,8,6.419,6.419,0,0,1,8,14.4Z" fill="#3b4b68"/>
          </g>
        </g>
        </svg>
    </span>

    <span v-if="(firstLoadEdit ? setCategory && setCategory.parent_id.toString() === id : setCategory && setCategory.id.toString() === id)"  class="radio-button">
       <svg v-bind:style="{ display: (firstLoadEdit ? setCategory && setCategory.parent_id.toString() === id : setCategory && setCategory.id.toString() === id) || !setCategory ? 'block' : 'none' }" id="radio-on-button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <g id="radio-button-on">
          <path id="Path_1256" data-name="Path 1256" d="M8,4a4,4,0,1,0,4,4A3.961,3.961,0,0,0,8,4ZM8,0a8,8,0,1,0,8,8A8.024,8.024,0,0,0,8,0ZM8,14.4A6.4,6.4,0,1,1,14.4,8,6.419,6.419,0,0,1,8,14.4Z" fill="#3b4b68"/>
        </g>
      </svg>
    </span>
  </div>
</template>

<script>

  export default {
    props: {
      firstLoadEdit: {
        type: Boolean
      },
      onSetCategory: {
        type: Function
      },
      ownlvl: {
        required: true,
        type: Number
      },
      hasChildren: {
        default: false,
        type: Boolean
      },
      id: {
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
      title: {
        type: String,
      },
      searchValue: {
        required: false,
        type: String
      },
      setCategory: {
        type: Object
      },
      data: {
        required: true,
        type: Object
      }
    },
    computed: {
      searchValueLowerCase () {
        return this.searchValue.toLowerCase()
      }
    },
    methods: {
      indexOfEnd (suggestion) {
        const searchValue = this.searchValue.toLowerCase();
        const formatedeSuggestion = suggestion.toLowerCase();
        const io = formatedeSuggestion.indexOf(searchValue);

        return io === -1 ? -1 : io + searchValue.length
      }
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .container {
    position: relative;
  }
  .radio-button {
    position: absolute;
    right: 25px;
    top: 10px;
    cursor: pointer;
     & > svg {
       display: none;
     }
  }

  .container:hover .radio-button {
     & svg {
       display: block !important;
     }
  }
  .right-ownlvl-three {
    display: inline-flex;
    margin-left: 30px;

    & > svg {
      transition: transform 200ms ease;
    }
  }
  .right-ownlvl-two {
    display: inline-flex;
    margin-left: 15px;

    & > svg {
      transition: transform 200ms ease;

    }
  }
  .arrow {
    transform: rotate(0);
    margin-right: 10px;
    margin-top: 6px;
  }
  .rotate {
    transform: rotate(90deg) !important;
  }
  .grandParent {
    cursor: pointer;
    padding: 10px 15px;
    width: 100%;

    &:hover {
      background-color: #E0E4ED;
    }
  }
  .management-tile__name {
    align-items: center;
    color: #3B4B68;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    height: 100%;
  }
  .search-dropdown__link--bold {
    color: $color--blue;
  }
</style>
