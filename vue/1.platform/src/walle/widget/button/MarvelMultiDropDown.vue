<template>
  <div class="dropdownBtnWrapper" v-bind:class="{error:isWarn}">
    <div class="dropdownBtn"
         v-bind:class="{ disable:isDisable, dropdownBtnShowBorder: show }"
         :style="{ width: width }">
      <div class="label" v-on:click.stop="showOrHide">
        <div class="left">
          <div class="name" v-for="item in selectItems" :title="item.label">
            {{ item.label }}
            <div class="icon icon-cross" @click.stop="onClickRemove(item)"></div>
          </div>
        </div>
        <div class="expandAndFolderIcon"
             v-bind:class="[{ 'icon-marvelIcon-03': !show , 'icon-marvelIcon-01': show}]"></div>
      </div>
      <div class="options" v-show="show" :style="{'max-height': maxHeight}" v-bind:class="[{ showBorder: show}]">
        <div v-if="needCheckAll" class="optionItem"
             @click.stop>
          <input type="checkbox" :checked="itemAllChecked" @change.stop="onAllCheckBoxChange" :id="id4SelectAllOption">
          <label class="name" :for="id4SelectAllOption">{{$t('marvelMultiDropdown_selectAll')}}</label>
        </div>
        <div v-for="item in items"
             class="optionItem"
             :class="optionItemChecked(item)"
             @click.stop
             :title="item.label">
          <input type="checkbox" :checked="itemChecked(item)" :id="item.label + id4SelectAllOption"
                 @change.stop="onItemCheckBoxChange(item, $event)">
          <label class="name" :for="item.label + id4SelectAllOption">{{item.label}}</label>
        </div>
      </div>
    </div>
    <div class="errorTip icon-notification" :title="errMsg">{{ errMsg }}</div>
  </div>
</template>

<i18n>
  {
  "en": {
  "marvelMultiDropdown_selectAll": "Select All"
  },
  "zh": {
  "marvelMultiDropdown_selectAll": "全选"
  }
  }
</i18n>

<script>
  import StringUtilsEx from '../../component/str'

  /**
   *  MarvelMultiDropDown widget description
   *  @vuedoc
   *  @exports MarvelMultiDropDown
   */
  export default {
    name: 'MarvelMultiDropDown',
    props: {
      isDisable: {
        type: Boolean,
        default: false,
        required: false,
      },
      width: {
        type: String,
        default: "100%",
        required: false,
      },
      maxHeight: {
        type: String,
        default: undefined,
        required: false,
      },
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      needCheckAll: {
        type: Boolean,
        default: true,
        required: false,
      },
      isWarn: {
        type: Boolean,
        default: false,
        required: false,
      },
      errMsg: {
        type: String,
        default: "error",
        required: false,
      }
    },
    data() {
      return {
        show: false,
        selectItems: [],
        id4SelectAllOption: ""
      };
    },
    computed: {
      itemAllChecked() {
        return this.selectItems.length > 0;
      }
    },
    mounted() {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy() {
      //#region destroy

      this._destroy();

      //#endregion
    },
    methods: {

      //#region inner

      //#region lifeCycle

      _initEx: function () {
        //gen id
        this.id4SelectAllOption = StringUtilsEx.uuid();
        //_initSelectItems
        this._initSelectItems();
        //event
        document.body.addEventListener("click", this.hideDropDownPanel);
      },
      _destroy: function () {
        document.body.removeEventListener("click", this.hideDropDownPanel);
      },

      //#endregion

      _initSelectItems() {
        this.selectItems = this.items.filter((oItem) => {
          return oItem.checked == true;
        });
      },
      hideDropDownPanel() {
        this.show = false;
      },
      showOrHide() {
        this.show = !this.show;
      },
      onClickRemove(oItem) {
        //1.selectItems
        let index = this.selectItems.indexOf(oItem);
        if (index > -1) {
          this.selectItems.splice(index, 1);
        }
        //cache
        oItem.checked = false;
        //event
        this._emitItemCheckChangeEvent(oItem);
      },
      itemChecked(oItem) {
        let b = this.selectItems.some((oItemEx) => {
          return oItemEx.label == oItem.label;
        });

        return b;
      },
      optionItemChecked(oItem) {
        let b = this.selectItems.some((oItemEx) => {
          return oItemEx.label == oItem.label;
        });
        return b ? "optionItemChecked" : "";
      },
      onAllCheckBoxChange(oEvent) {
        let bCheck = oEvent.target.checked;

        this.items.forEach((oItem) => {
          oItem.checked = bCheck;
        });

        this._initSelectItems();

        this.callback4OnAllCheckChangeEvent(bCheck);
      },
      onItemCheckBoxChange(oItem, oEvent) {
        let bCheck = oEvent.target.checked;
        oItem.checked = bCheck;

        //update selectItems
        this._initSelectItems();

        //event
        this._emitItemCheckChangeEvent(oItem);
      },
      _emitItemCheckChangeEvent(oItem) {
        this.callback4OnItemCheckChangeEvent(oItem);
      },

      //#endregion
      //#region callback

      callback4OnAllCheckChangeEvent: function (bCheck) {
        this.$emit("onAllCheckChangeEvent", bCheck);
      },
      callback4OnItemCheckChangeEvent: function (oItem) {
        this.$emit("onItemCheckChangeEvent", oItem);
      },

      //#endregion
      //#region 3rd

      removeAllCheck: function () {
        this.selectItems = [];
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].checked = false;
        }
      },
      setAllCheck: function () {
        this.selectItems = JSON.parse(JSON.stringify(this.items));
      },
      getCheckedItems: function () {
        return this.selectItems;
      }

      //#endregion
    },
    watch: {
      items: {
        handler(oNewVal, oOldVal) {
          this._initSelectItems();
        }
      }
    },
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/

  .dropdownBtnWrapper {
    width: 100%;
    height: 32px;
    position: relative;
  }

  .dropdownBtn {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 14px;
    display: inline-block;
    border-radius: 2px;
    height: 32px;
  }

  .dropdownBtn:hover {
    border: 1px solid #3399ff;
  }

  .dropdownBtnShowBorder {
    border: 1px solid #3399ff;
  }

  .dropdownBtn .label {
    height: 30px;
    padding: 1px 10px 1px 1px;
    cursor: pointer;
    position: relative;
  }

  .dropdownBtn .label .left {
    height: 28px;
    width: calc(100% - 22px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dropdownBtn .label .name {
    height: 100%;
    color: #333;
    font-size: 12px;
    line-height: 30px;
    display: inline-block;
    margin-right: 2px;
    background-color: #EBF1F1;
    padding: 0 10px 0 10px;
  }

  .dropdownBtn .label .name:hover {
    color: #3399ff;
  }

  .dropdownBtn .label .name .icon {
    font-size: 12px;
    line-height: 30px;
    display: inline-block;
    margin-left: 20px;
    color: #b6b6b6;
  }

  .dropdownBtn .label .expandAndFolderIcon {
    color: #b6b6b6;
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 6px;
    line-height: 30px;
    display: inline-block;
  }

  .dropdownBtn .options {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #ffffff;
    overflow-y: auto;
    position: relative;
    left: -1px;
    bottom: -1px;
    z-index: 3;
  }

  .dropdownBtn .showBorder {
    border-left: 1px solid #3399ff;
    border-right: 1px solid #3399ff;
    border-bottom: 1px solid #3399ff;
  }

  .dropdownBtn .options .optionItem {
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 25px 0 10px;
    background-color: #fff;
    white-space: nowrap;
    margin-bottom: 2px;
  }

  .dropdownBtn .options .optionItem .name {
    color: #333;
    font-size: 12px;
    line-height: 32px;
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }

  .dropdownBtn .options .optionItemChecked {
    background-color: #eff2f5;
  }

  .dropdownBtn .options .optionItemChecked .name {
    color: #1b8adf;
  }

  .dropdownBtn .options .optionItem:hover {
    background-color: #eff2f5;
  }

  .dropdownBtn .options .optionItem:hover .name {
    color: #1b8adf;
  }

  .disable {
    pointer-events: none;
  }

  .disable .label {
    background-color: #f0f0f0;
  }

  .disable .label .icon, .disable .label .expandAndFolderIcon {
    color: #aaa;
  }

  .disable .label .name {
    color: #999;
  }

  .disable .options {
    /*display: none !important;*/
    border-top: none;
    border-top: none;
    height: 0;
    overflow: hidden;
  }

  .dropdownBtnWrapper .errorTip {
    color: #ff4c4c;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    display: none;
    position: absolute;
    top: 36px;
  }

  .dropdownBtnWrapper .errorTip:before {
    margin-right: 10px;
  }

  .error .dropdownBtn {
    border: 1px solid #ff4c4c !important;
  }

  .error .dropdownBtn .showBorder {
    border-left: 1px solid #ff4c4c !important;
    border-right: 1px solid #ff4c4c !important;
    border-bottom: 1px solid #ff4c4c !important;
  }

  .error .errorTip {
    display: block;
  }

  .errorNoTip .dropdownBtn {
    border: 1px solid #ff4c4c !important;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    width: 3px;
    border-radius: 0px;
    background-color: rgba(0, 0, 0, 0);
    border-left: 3px solid rgba(0, 0, 0, 0.22);
  }


  /*region dark theme*/

  .dark .dropdownBtnWrapper {
  }

  .dark .dropdownBtn {
    border: 1px solid #8b90b3;
  }

  .dark .dropdownBtn:hover {
    border: 1px solid #3dcca6;
  }

  .dark .dropdownBtnShowBorder {
    border: 1px solid #3dcca6;
  }

  .dark .dropdownBtn .label {
  }

  .dark .dropdownBtn .label .left {
  }

  .dark .dropdownBtn .label .name {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .dark .dropdownBtn .label .name:hover {
    color: #3dcca6;
  }

  .dark .dropdownBtn .label .name .icon {
  }

  .dark .dropdownBtn .label .expandAndFolderIcon {
    color: #8b90b3;
  }

  .dark .dropdownBtn .options {
    border: 1px solid #8b90b3;
    background-color: #1e1f36;
  }

  .dark .dropdownBtn .showBorder {
    border-left: 1px solid #3dcca6;
    border-right: 1px solid #3dcca6;
    border-bottom: 1px solid #3dcca6;
  }

  .dark .dropdownBtn .options .optionItem {
    background-color: #1e1f36;
  }

  .dark .dropdownBtn .options .optionItem .name {
    color: #ffffff;
  }

  .dark .dropdownBtn .options .optionItemChecked {
    background-color: #393b70;
  }

  .dark .dropdownBtn .options .optionItemChecked .name {
    color: #3dcca6;
  }

  .dark .dropdownBtn .options .optionItem:hover {
    background-color: #393b70;
  }

  .dark .dropdownBtn .options .optionItem:hover .name {
    color: #3dcca6;
  }

  .dark .disable {
  }

  .dark .disable .label {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .dark .disable .label .icon, .dark .disable .label .expandAndFolderIcon {
    color: rgba(255, 255, 255, 0.4);
  }

  .dark .disable .label .name {
    color: #8d8d8d;
  }

  .dark .disable .options {
  }

  /*endregion*/

</style>
