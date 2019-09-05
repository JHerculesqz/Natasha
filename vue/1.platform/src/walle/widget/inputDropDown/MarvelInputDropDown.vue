<template>
  <div class="inputDropDownBtnWrapper" v-bind:class="{error:isWarn}">
    <div class="dropdownBtn" v-click-outside="hideSubMenu"
         v-bind:class="{ disable:isDisable, dropdownBtnShowBorder: subMenuShow }">
      <div class="label adaptToParent">
        <input type="text" class="name" v-on:click="showSubMenu"
               v-model="inputMsg"
               @focus="onFocus"
               @input="onInput">
        <div class="expandAndFolderIcon" v-on:click="showOrHide"
             v-bind:class="[{ 'icon-marvelIcon-03': !subMenuShow , 'icon-marvelIcon-01': subMenuShow}]"></div>
      </div>
      <div class="options" v-bind:class="[{ hide: !subMenuShow , showBorder: subMenuShow}]"
           v-bind:style="{'max-height': maxHeight}">
        <div class="optionItem adaptToParent optionItemTip"
             v-for="tipItem in tips">
          <div class="name">{{ tipItem.tip }}</div>
        </div>
        <div class="optionItem adaptToParent"
             v-for="optionItem in items"
             v-bind:class="[{'mouseDown': optionItem.label == inputMsg}, {'filter':optionItem.filter}]"
             v-on:click.stop="selectClick(optionItem)">
          <div class="name">{{ optionItem.label }}</div>
        </div>
      </div>
    </div>
    <div class="errorTip icon-notification" :title="errMsg">{{ errMsg }}</div>
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
        type: Object,
        default: function () {
          return {
            tipItems: [],
            optionItems: []
          }
        },
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
      },
      isWarn: {
        type: Boolean,
        default: false,
        required: false,
      },
      errMsg: {
        type: String,
        default: "error input !!",
        required: false,
      }
    },
    data: function () {
      return {
        items: [],
        tips: [],
        filterOptionItems: [],
        inputMsg: "",
        subMenuShow: false,
        isFilter: false,
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
        if (this.dropDownItems.optionItems) {
          this.items = this.dropDownItems.optionItems;
        } else {
          this.items = [];
        }
        if (this.dropDownItems.tipItems) {
          this.tips = this.dropDownItems.tipItems;
        } else {
          this.tips = [];
        }

        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].active) {
            this.inputMsg = this.items[i].label;
            break;
          }
        }
        this.setOptionFilterStatus();
      },

      //#endregion

      showOrHide: function () {
        var currentShowStatus = this.subMenuShow;
        this.$nextTick(function () {
          this.subMenuShow = !currentShowStatus;
        });
      },
      hideSubMenu: function () {
        this.onBlur();
      },
      showSubMenu: function () {
        this.subMenuShow = true;
      },
      onFocus: function () {
        this.callback4OnFocus(this.items);
      },
      onBlur: function () {
        if (this.subMenuShow) {
          this.subMenuShow = false;
          this.isFilter = false;
          this.setOptionFilterStatus();
          this.callback4OnOptionSelect(this.inputMsg);
        }
      },
      onInput: function () {
        this.subMenuShow = true;
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
        this.inputMsg = oItem.label;
        this.subMenuShow = false;
        this.callback4OnOptionSelect(this.inputMsg);
      },

      //#endregion
      //#region callback

      callback4OnFocus: function (oItem) {
        this.$emit('onFocus', oItem);
      },
      callback4OnOptionSelect: function (strInputMsg) {
        this.$emit('onOptionSelect', strInputMsg);
      },

      //#endregion
      //#region 3rd

      getDropDownCurrentLabel: function () {
        return this.inputMsg;
      },
      getDropDownCurrentItem: function(){
        for(var i = 0; i<this.items.length; i++){
          if(this.inputMsg == this.items[i].label){
            return this.items[i];
          }
        }
      },
      setSelectItem: function (strLabel) {
        this.inputMsg = strLabel;
        this.callback4OnOptionSelect(this.inputMsg);
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

  .dropdownBtn .options .optionItemTip {
    pointer-events: none;
  }

  .dropdownBtn .options .optionItemTip .name {
    color: #999;
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

  .inputDropDownBtnWrapper .errorTip {
    color: #ff4c4c;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    position: absolute;
    top: 32px;
    display: none;
  }

  .inputDropDownBtnWrapper .errorTip:before {
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

  .dark .dropdownBtn .options .optionItemTip .name {
    color: #8b90b3;
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

  /*region blackBg*/

  .blackBg .dropdownBtn {
    border: 1px solid #ccc;
  }

  .blackBg .dropdownBtn:hover {
    border: 1px solid #3399ff;
  }

  .blackBg .dropdownBtnShowBorder {
    border: 1px solid #3399ff;
  }

  .blackBg .dropdownBtn .label .name {
    color: #aaa;
  }

  .blackBg .dropdownBtn .label .expandAndFolderIcon {
    color: #aaa;
  }

  .blackBg .dropdownBtn .label .expandAndFolderIcon:after {
    color: #aaa;
  }

  .blackBg .dropdownBtn .options {
    border: 1px solid #ccc;
    background-color: #000;
  }

  .blackBg .dropdownBtn .showBorder {
    border-left: 1px solid #3399ff;
    border-right: 1px solid #3399ff;
    border-bottom: 1px solid #3399ff;
  }

  .blackBg .dropdownBtn .options .optionItem {
    background-color: #000;
  }

  .blackBg .dropdownBtn .options .optionItem .name {
    color: #aaa;
  }

  .blackBg .dropdownBtn .options .optionItemTip .name {
    color: #666;
  }

  .blackBg .dropdownBtn .options .optionItem:hover, .dark .dropdownBtn .options .focus {
    background-color: rgba(0, 124, 247, 0.2);
  }

  .blackBg .dropdownBtn .options .optionItem:hover .name, .dark .dropdownBtn .options .focus .name {
    color: #3399ff;
  }

  .blackBg .dropdownBtn .options .mouseDown {
    background-color: #3399ff !important;
  }

  .blackBg .dropdownBtn .options .mouseDown .name {
    color: #fff !important;
  }

  .blackBg .disable .label {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .blackBg .disable .label .expandAndFolderIcon {
    color: #aaa;
  }

  .blackBg .disable .label .name {
    color: #999;
  }

  /*endregion*/
</style>
