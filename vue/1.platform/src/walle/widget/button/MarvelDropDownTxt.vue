<template>
  <div class="dropdownTxtWrapper" v-bind:style="{width:width}">
    <select class="MarvelDropDownTxtSelect"
            :disabled="disable"
            @click.stop
            @change.stop="onOptionChange($event)">
      <option class="customerSelectOption" v-bind:style="{'max-height':maxHeight}"
              v-for="item in items"
              :selected="item.selected == true"
              :value="item.label"
              :title="item.label">{{item.label}}
      </option>
    </select>
  </div>
</template>

<script>
  /**
   *  MarvelDropDownTxt widget description
   *  @vuedoc
   *  @exports MarvelDropDownTxt
   */
  export default {
    name: 'MarvelDropDownTxt',
    props: {
      disable: {
        type: Boolean,
        default: false,
        required: false,
      },
      width: {
        type: String,
        default: "",
        required: false,
      },
      maxHeight: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        items: [],
        selectItem: {label: ""},
        show: false
      }
    },
    computed: {},
    methods: {
      //#region inner

      onOptionChange: function (oEvent) {
        for (var i = 0; i < this.items, length; i++) {
          var oItem = this.items[i];
          if (oItem.label == oEvent.target.value) {
            oItem.selected = true;
            this.selectItem = oItem;
          } else {
            oItem.selected = false;
          }
        }
        this.callback4OnOptionSelect(this.selectItem)
      },

      //#endregion
      //#region callback

      callback4OnOptionSelect: function (oItem) {
        this.$emit('onOptionSelect', oItem);
      },

      //#endregion
      //#region 3rd

      init: function (lstItem, strSelectItemLabel) {
        this.items = lstItem;
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.label == strSelectItemLabel) {
            this.selectItem = oItem;
          }
        }
      },
      getSelectItem: function () {
        return this.selectItem.label;
      },
      getSelectItemObj: function () {
        return this.selectItem;
      },
      setSelectItem: function (strLabel) {
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.label == strLabel) {
            oItem.selected = true;
            this.selectItem = oItem;
          } else {
            oItem.selected = false;
          }
        }
      },

      //#endregion
    },
  }
</script>

<style scoped>
  .dropdownTxtWrapper {
    width: 100%;
    height: 32px;
  }

  .MarvelDropDownTxtSelect {
    height: 100%;
    width: 100%;
    padding-left: 10px;
  }
</style>
