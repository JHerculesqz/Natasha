<template>
  <div class="dropdownBtnWrapper">
    <div class="dropdownBtn"
         :class="disable"
         :style="{ width: width }">
      <div class="label" @click.stop="showOrHide">
        <div class="left">
          <div class="name" v-for="item in selectItems">
            {{ item.label }}
            <div class="icon icon-cross" @click.stop="onClickRemove(item)"></div>
          </div>
        </div>
        <div class="expandAndFolderIcon icon-marvelIcon-24"></div>
      </div>
      <div class="options" v-show="show" :style="{'max-height': maxHeight}">
        <div v-if="needCheckAll" class="optionItem"
             @click.stop>
          <input type="checkbox" :checked="itemAllChecked" @change.stop="onAllCheckBoxChange">
          <label class="name">{{$t('marvelMultiDropdown_selectAll')}}</label>
        </div>
        <div v-for="item in items"
             class="optionItem"
             :class="optionItemChecked(item)"
             @click.stop>
          <input type="checkbox" :checked="itemChecked(item)"
                 @change.stop="onItemCheckBoxChange(item, $event)">
          <label class="name">{{item.label}}</label>
        </div>
      </div>
    </div>
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
  export default {
    name: 'MarvelMultiDropDown',
    props: {
      disable: String,
      width: String,
      maxHeight: String,
      items: Array,
      needCheckAll: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        show: false,
        selectItems: []
      };
    },
    mounted() {
      //_initSelectItems
      this._initSelectItems();
      //event
      document.body.addEventListener("click", this.hideDropDownPanel);
    },
    computed: {
      itemAllChecked() {
        return this.selectItems.length > 0;
      }
    },
    methods: {
      //region inner
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

        this.$emit("onAllCheckChangeEvent", bCheck);
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
        this.$emit("onItemCheckChangeEvent", oItem);
      },
      //endregion
      //region callback

      //endregion
      //region 3rd
      getCheckedItems() {
        return this.selectItems;
      }
      //endregion
    },
    watch: {
      items: {
        handler(oNewVal, oOldVal) {
          this._initSelectItems();
        }
      }
    },
    beforeDestory() {
      document.body.removeEventListener("click", this.hideDropDownPanel);
    }
  }
</script>

<style scoped>

  .dropdownBtnWrapper {
    width: 100%;
    height: 32px;
  }

  .dropdownBtn {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 14px;
    display: inline-block;
    border-radius: 2px;
  }

  .dropdownBtn:hover {
    border: 1px solid #3399ff;
  }

  .dropdownBtn .label {
    height: 30px;
    padding: 2px 10px 2px 2px;
    cursor: pointer;
    position: relative;
  }

  .dropdownBtn .label .left {
    height: 100%;
    width: calc(100% - 22px);
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dropdownBtn .label .name {
    height: 100%;
    color: #333;
    font-size: 14px;
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
    margin-left: 20px
  }

  .dropdownBtn .label .expandAndFolderIcon {
    color: #777;
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 12px;
    line-height: 30px;
    display: inline-block;
  }

  .dropdownBtn .options {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #ffffff;
    overflow-y: auto;
    overflow: hidden;
    position: relative;
    left: -1px;
    bottom: -1px;
    width: 100%;
    z-index: 3;
  }

  .dropdownBtn .options:hover {
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
    font-size: 14px;
    line-height: 32px;
  }

  .dropdownBtn .options .optionItemChecked {
    background-color: #3399ff;
  }

  .dropdownBtn .options .optionItem:hover {
    background-color: #f5f6f7;
  }

  .dropdownBtn .options .optionItem:hover .name {
    color: #3399ff;
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

  /*region dark theme*/

  .dark .dropdownBtnWrapper {
  }

  .dark .dropdownBtn {
    border: 1px solid #8b90b3;
  }

  .dark .dropdownBtn:hover {
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

  .dark .dropdownBtn .options:hover {
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
    background-color: #3dcca6;
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

  .dark .disable .label .icon, .disable .label .expandAndFolderIcon {
    color: rgba(255, 255, 255, 0.4);
  }

  .dark .disable .label .name {
    color: #8d8d8d;
  }

  .dark .disable .options {
  }

  /*endregion*/


</style>
