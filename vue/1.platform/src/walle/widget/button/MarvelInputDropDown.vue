<template>
  <div class="inputDropDownBtnWrapper">
    <div class="dropdownBtn" v-click-outside="hideSubMenu"
         v-bind:class="{ disable:isDisable, dropdownBtnShowBorder: show }">
      <div class="label adaptToParent">
        <input type="text" class="name"
               v-model="inputMsg"
               v-on:click="showSubMenu"
               @focus="onFocus"
               @input="onInput">
        <div class="expandAndFolderIcon" v-on:click="showOrHide"
             v-bind:class="[{ 'icon-marvelIcon-03': !show , 'icon-marvelIcon-01': show}]"></div>
      </div>
      <div class="options" v-bind:class="[{ hide: !show , showBorder: show}]"
           v-bind:style="{'max-height': maxHeight}">
        <div class="optionItem adaptToParent"
             v-for="item in items"
             v-bind:class="[{'mouseDown': item.label == selectItem.label}, {'filter':item.filter}]"
             v-on:click.stop="selectClick(item)">
          <div class="name">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelInputDropDown widget description
   *  @vuedoc
   *  @exports MarvelInputDropDown
   */
  export default {
    name: 'MarvelInputDropDown',
    props: {
      dropDownItems: {
        type: Array,
        default: undefined,
        required: true,
      },
      isDisable: {
        type: Boolean,
        default: false,
        required: false,
      },
      maxHeight: {
        type: String,
        default: undefined,
        required: false,
      }
    },
    data: function () {
      return {
        items: [],
        filterOptionItems: [],
        lastSelectItem: {label: ""},
        selectItem: {label: ""},
        inputMsg: "",
        show: false,
        isFilter: false
      }
    },
    mounted() {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.items = this.dropDownItems;
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.active) {
            this.selectItem = oItem;
            this.inputMsg = oItem.label;
          }
        }
        this.setOptionFilterStatus();
      },

      //#endregion

      showOrHide: function () {
        var currentShowStatus = this.show;
        this.$nextTick(function () {
          this.show = !currentShowStatus;
        });
      },
      hideSubMenu: function () {
        this.show = false;
        this.onBlur();
      },
      showSubMenu: function () {
        this.show = true;
      },
      onFocus: function () {
        this.lastSelectItem = this.selectItem;
        this.callback4OnFocus(this.items);
      },
      onBlur: function () {
        if (this.subMenuShow) {
          var bHasFixedInput = false;
          for (var i = 0; i < this.items.length; i++) {
            var oItem = this.items[i];
            if (oItem.label == this.inputMsg) {
              this.selectItem = oItem;
              this.inputMsg = oItem.label;
              bHasFixedInput = true;
              this.callback4OnOptionSelect(oItem);
            }
          }
          if (!bHasFixedInput) {
            this.selectItem = this.lastSelectItem;
            this.inputMsg = this.selectItem.label;
          }

          this.isFilter = false;
          this.setOptionFilterStatus();
        }
      },
      onInput: function () {
        this.show = true;
        this.isFilter = true;
        this.setOptionFilterStatus();
      },
      setOptionFilterStatus: function () {
        this.filterOptionItems = [];
        if (!this.isFilter) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].filter = false;
            this.filterOptionItems.push(this.items[i]);
          }
        } else {
          for (var i = 0; i < this.items.length; i++) {
            var oItem = this.items[i];
            if (oItem.label.indexOf(this.inputMsg) == -1) {
              this.items[i].filter = true;
            } else {
              this.items[i].filter = false;
              this.filterOptionItems.push(this.items[i]);
            }
          }
        }
      },
      selectClick: function (oItem) {
        this.selectItem = oItem;
        this.inputMsg = oItem.label;
        this.show = false;
        this.callback4OnOptionSelect(oItem);
      },

      //#endregion
      //#region callback

      callback4OnFocus: function (oItem) {
        this.$emit('onFocus', oItem);
      },
      callback4OnOptionSelect: function (oItem) {
        this.$emit('onOptionSelect', oItem);
      },

      //#endregion
      //#region 3rd

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
            this.selectItem = oItem;
            this.inputMsg = oItem.label;
            this.callback4OnOptionSelect(oItem);
            break;
          }
        }
      }

      //#endregion
    },
    watch: {
      dropDownItems: {
        handler: function () {
          this._initEx();
        },
        deep: true
      }
    },
    directives: {
      'click-outside': {
        bind: function (el, binding, vnode) {
          el.event = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.event);
        },
        unbind: function (el) {
          document.body.removeEventListener('click', el.event);
        }
      }
    }
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
  .inputDropDownBtnWrapper {
    width: 100%;
    height: 32px;
    position: relative;
  }

  .dropdownBtn {
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 14px;
    display: inline-block;
    border-radius: 2px;
  }

  .dropdownBtn:hover {
    border: 1px solid #3399ff;
  }

  .dropdownBtnShowBorder {
    border: 1px solid #3399ff;
  }

  .dropdownBtn .label {
    height: 30px;
    padding: 0 25px 0 15px;
    cursor: pointer;
    position: relative;
  }

  .dropdownBtn .label .name {
    color: #333;
    font-size: 14px;
    line-height: 30px;
    height: 30px;
    display: inline-block;
    padding: 0;
    margin: 0 10px 0 0;
    border: none;
    list-style: none;
    outline: none;
    background-color: transparent;
  }

  .dropdownBtn .adaptToParent .name {
    display: block;
    float: left;
    width: calc(100% - 10px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .dropdownBtn .label .expandAndFolderIcon:after {
    content: "";
    display: block;
    width: 1px;
    height: 20px;
    background-color: #ccc;
    position: absolute;
    top: 6px;
    left: -10px;
  }

  .dropdownBtn .options {
    border: 1px solid #e6e6e6;
    background-color: #ffffff;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    left: -1px;
    bottom: -1px;
    width: 100%;
    z-index: 3;
  }

  .dropdownBtn .showBorder {
    border-left: 1px solid #3399ff;
    border-right: 1px solid #3399ff;
    border-bottom: 1px solid #3399ff;
  }

  .dropdownBtn .options .filter {
    display: none;
  }

  .dropdownBtn .options .optionItem {
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 25px 0 15px;
    background-color: #fff;
    white-space: nowrap;
    outline: none;
  }

  .dropdownBtn .options .optionItem .name {
    color: #333;
    font-size: 14px;
    line-height: 32px;
    margin-right: 10px;
    display: inline-block;
  }

  .dropdownBtn .options .optionItem:hover, .dropdownBtn .options .focus {
    background-color: #eff2f5;
  }

  .dropdownBtn .options .optionItem:hover .name, .dropdownBtn .options .focus .name {
    color: #1b8adf;
  }

  .dropdownBtn .options .mouseDown {
    background-color: #eff2f5 !important;
  }

  .dropdownBtn .options .mouseDown .name {
    color: #1b8adf !important;
  }

  .dropdownBtn .options .adaptToParent .name {
    display: block;
    float: left;
    width: calc(100% - 10px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .disable {
    pointer-events: none;
  }

  .disable .label {
    background-color: #f0f0f0;
  }

  .disable .label .expandAndFolderIcon {
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

  .hide {
    border: none !important;
    height: 0;
    overflow: hidden !important;
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

  .dark .dropdownBtn .label .name {
    color: #fff;
  }

  .dark .dropdownBtn .label .expandAndFolderIcon {
    color: #8b90b3;
  }

  .dark .dropdownBtn .label .expandAndFolderIcon:after {
    background-color: #8b90b3;
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

  .dark .dropdownBtn .options .optionItem:hover, .dark .dropdownBtn .options .focus {
    background-color: #393b70;
  }

  .dark .dropdownBtn .options .optionItem:hover .name, .dark .dropdownBtn .options .focus .name {
    color: #3dcca6;
  }

  .dark .dropdownBtn .options .mouseDown {
    background-color: #393b70 !important;
  }

  .dark .dropdownBtn .options .mouseDown .name {
    color: #3dcca6 !important;
  }

  .dark .disable {
    pointer-events: none;
  }

  .dark .disable .label {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .disable .label .expandAndFolderIcon {
    color: rgba(255, 255, 255, 0.4);
  }

  .dark .disable .label .name {
    color: #8d8d8d;
  }

  /*endregion*/
</style>
