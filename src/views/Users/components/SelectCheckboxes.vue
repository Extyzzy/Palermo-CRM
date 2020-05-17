<template>
  <div class="input-block">
    <div class="input-block__container-select"
         v-bind:style="{ width: width ? width : '364px' }">
      <div @click="$emit('onClose')"
        class="input-block__input borders"
        v-bind:style="{
            borderColor:'#A4B0BE',
            backgroundColor: 'white',
            color: '#8E9BAD',
         }"
      >
        {{selected.name}}
        <span v-bind:style="{
            transform: 'rotate(0deg)',
            top: '6px'
         }" class="arrow">
           <svg xmlns="http://www.w3.org/2000/svg" width="9.73" height="6" viewBox="0 0 9.73 6">
          <g id="keyboard-right-arrow-button" transform="translate(0 6) rotate(-90)">
            <g id="chevron-right">
              <path id="Path_6" data-name="Path 6" d="M1.135,0,0,1.135l3.73,3.73L0,8.595,1.135,9.73,6,4.865Z" fill="#3b4b68"/>
            </g>
          </g>
        </svg>
        </span>
      </div>
      <div class="dropdown-select">
      <span
        @click="updateValue(item.checked, index)"
        v-bind:key="index"
        v-for="(item, index) in list">
        <p class="name">{{item.name}}</p>
        <CheckBox
          :isChecked="item.checked"
          :id="index"
          @input="addItemCheckbox"
        />
      </span>
        <Button @click="() => $emit('apply')" text="Применить "/>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBox from '@/components/CheckBox.vue';
  import Button from './Button.vue';

  export default {
    components: {
      CheckBox,
      Button
    },
    name: 'Select',
    props: {
      selected: {
        type: Object,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
      width: {
        type: String,
        required: false
      },
      padding: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required: false
      },
      changedValue: {
        type: Function,
        required: false
      }
    },
    data () {
      return {
        isFocused: false,
        selectedCheckboxes: [],
      }
    },
    methods: {
      updateValue (checked, index) {
        this.addItemCheckbox({target: {checked, index} })
      },
      addItemCheckbox({target: {checked, index}}) {
        this.$emit('changedValue', this.list);

        if (this.list[index].id === 'all') {
          this.list[index].checked ? this.list.map(d => d.checked = false) : this.list.map(d => d.checked = true)
        } else {
          this.list.find(d => d.id === 'all').checked = false;

          this.list[index].checked ?
            this.list[index].checked = false : this.list[index].checked = true;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .borders {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .dropdown-select {
    box-shadow: 0 3px 5px rgba(59, 75, 104, .3);
    border: 1px solid #A4B0BE;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 33px;
    background-color: white;
    width: 100%;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-bottom: 5px;

    span {
       padding: 10px 13px;
       cursor: pointer;
       font-size: 12px;
       color: $color--dark--blue;
        display: flex;
        justify-content: space-between;

      .name {
        padding-right: 10px;
      }
        &:hover {
          background-color: #E0E4ED;
        }
     }
  }
  .input-block__container-select {
      position: relative;
  }

  .input-block {
    z-index: 90;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
    width: 100%;
    padding-right: 5px;
  }

  .input-block:not(:last-child) {
    margin-bottom: 1px;
  }

  .input-block__input::placeholder {
    color: #A4B0BE;
    opacity: 1;
    font-size: 12px !important;
  }

  .input-block__container {
    position: relative;
  }

  .input-block__input {
    box-shadow: 0 0 5px rgba(59, 75, 104, .3);
    height: 35px;
    align-items: center;
    display: flex;
    border: 1px solid #A4B0BE;
    border-radius: 5px;
    color: #3B4B68;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: 400;
    padding: 0 14px;
    width: 100%;
    border-color: rgb(59, 75, 104);
    font-size: 12px;

    .arrow {
      position: absolute;
      right: 15px;
      top: 13px;
      transform: rotate(180deg);
      transition: ease;
    }
  }

  .input-block__input:focus {
    border-color: #3B4B68;
  }

  .input-block__label {
    background-color: #FFFFFF;
    color: $color--light-gray;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    left: 14px;
    padding: 0 5px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: top left;
    transition: transform 150ms ease;
  }

  .input-block__label--transform {
    color: #3B4B68;
    transform: translateY(-29px) scale(0.8);
    border-radius: 25px;
  }

  .input-block__error-message {
    color: #F02C5A;
    font-family: 'Open Sans', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12px;
    font-weight: 400;
    left: 0;
    position: absolute;
  }
</style>
