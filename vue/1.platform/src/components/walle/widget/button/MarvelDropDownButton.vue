<template>
  <div class="dropdownBtnWrapper">
    <div class="dropdownBtn"
         v-bind:class="{ disable, dropdownBtnShowBorder: show }"
         v-bind:style="{ width: width }"
         v-on:mouseleave="hideSubMenu">
      <div class="label" v-on:click.stop="showOrHide" :class="labelClass"
           :title="selectItem.title ? selectItem.title : selectItem.label">
        <div v-if="showSelectIcon" class="icon"
             v-bind:class="[selectItem.icon]"></div>
        <div class="name">{{ selectItem.label }}</div>
        <div class="expandAndFolderIcon"
             v-bind:class="[{ 'icon-marvelIcon-03': !show , 'icon-marvelIcon-01': show}]"></div>
      </div>
      <div class="options" v-bind:class="{ hide: !show, showBorder: show }" v-click-outside="hideSubMenu"
           v-bind:style="{'max-height': maxHeight}">
        <div class="optionItem"
             v-for="item in items"
             v-bind:class="[{'mouseDown': item.label == selectItem.label}, optionItemClass(item)]"
             :key="item.label"
             v-on:click.stop="selectClick(item)"
             :title="item.title ? item.title : item.label">
          <div class="icon" v-bind:class="[item.icon]"></div>
          <div class="name">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelDropDownButton widget description
   *  @vuedoc
   *  @exports MarvelDropDownButton
   */
  export default {
    name: 'MarvelDropDownButton',
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
      dropDownItems: {
        type: Array,
        default: undefined,
        required: true,
      },
      showSelectIcon: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    data: function () {
      return {
        items: [],
        selectItem: {label: "", icon: ""},
        show: false
      }
    },
    watch: {
      dropDownItems: {
        handler: function () {
          if (this.dropDownItems) {
            this.items = this.dropDownItems;
            for (var i = 0; i < this.dropDownItems.length; i++) {
              if (this.dropDownItems[i].active) {
                this.selectItem = this.dropDownItems[i];
                break;
              }
            }
          }
        },
        deep: true
      }
    },
    computed: {
      labelClass: function () {
        if (this.width !== undefined && this.width !== '') {
          if (this.selectItem.icon !== undefined && this.selectItem.icon !== '') {
            return 'adaptToParentWithIcon';
          } else {
            return 'adaptToParentWithOutIcon';
          }
        } else {
          return '';
        }
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
        for (var i = 0; i < this.dropDownItems.length; i++) {
          if (this.dropDownItems[i].active) {
            this.selectItem = this.dropDownItems[i];
            break;
          }
        }
      },

      //#endregion

      showOrHide: function () {
        this.show = !this.show;
      },
      hideSubMenu: function () {
        this.show = false;
      },
      selectClick: function (oItem) {
        this.selectItem = oItem;
        this.showOrHide();
        this.callback4OnOptionSelect(oItem);
      },
      optionItemClass: function (oItem) {
        var strClass = "";
        if (this.width !== undefined && this.width !== '') {
          if (oItem.icon !== undefined && oItem.icon !== '') {
            strClass = strClass + ' adaptToParentWithIcon';
          } else {
            strClass = strClass + ' adaptToParentWithOutIcon';
          }
        }

        return strClass;
      },

      //#endregion
      //#region callback

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
      getDropDownItemLst: function () {
        return this.items;
      },
      setSelectItem: function (strLabel) {
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.label == strLabel) {
            this.selectItem = oItem;
            break;
          }
        }
      },

      //#endregion
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
  .dropdownBtnWrapper {
    width: 100%;
    height: 32px;
  }

  .dropdownBtn {
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 14px;
    display: inline-block;
    border-radius: 2px;
    background: #fff;
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
    border: 1px solid #ccc;
  }

  .dropdownBtn .label .icon {
    color: #3399ff;
    font-size: 14px;
    line-height: 30px;
    display: inline-block;
    margin-right: 5px;
  }

  .dropdownBtn .label .name {
    color: #333;
    font-size: 14px;
    line-height: 30px;
    display: inline-block;
    margin-right: 10px;
  }

  .dropdownBtn .adaptToParentWithIcon .icon {
    display: block;
    float: left;
  }

  .dropdownBtn .adaptToParentWithIcon .name {
    display: block;
    float: left;
    width: calc(100% - 29px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdownBtn .adaptToParentWithOutIcon .icon {
    display: none;
    float: left;
  }

  .dropdownBtn .adaptToParentWithOutIcon .name {
    display: block;
    float: left;
    width: calc(100% - 10px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    border: 1px solid #ccc;
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

  .dropdownBtn .options:hover {
    border-left: 1px solid #3399ff;
    border-right: 1px solid #3399ff;
    border-bottom: 1px solid #3399ff;
  }

  .dropdownBtn .options .optionItem {
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 20px 0 15px;
    background-color: #fff;
    white-space: nowrap;
  }

  .dropdownBtn .options .optionItem .icon {
    color: #3399ff;
    font-size: 14px;
    line-height: 32px;
    margin-right: 5px;
    display: inline-block;
  }

  .dropdownBtn .options .optionItem .name {
    color: #333;
    font-size: 14px;
    line-height: 32px;
    margin-right: 10px;
    display: inline-block;
  }

  .dropdownBtn .options .optionItem:hover {
    background-color: #f5f6f7;
  }

  .dropdownBtn .options .optionItem:hover .name {
    color: #3399ff;
  }

  .dropdownBtn .options .mouseDown {
    background-color: #3399ff !important;
  }

  .dropdownBtn .options .mouseDown .name, .dropdownBtn .options .mouseDown .icon {
    color: #fff !important;
  }

  .dropdownBtn .options .adaptToParentWithIcon .icon {
    display: block;
    float: left;
  }

  .dropdownBtn .options .adaptToParentWithIcon .name {
    display: block;
    float: left;
    width: calc(100% - 35px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdownBtn .options .adaptToParentWithOutIcon .icon {
    display: none;
    float: left;
  }

  .dropdownBtn .options .adaptToParentWithOutIcon .name {
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
    background: transparent;
  }

  .dark .dropdownBtn:hover {
    border: 1px solid #3dcca6;
  }

  .dark .dropdownBtn .label {
  }

  .dark .dropdownBtn .label .icon {
    color: #3dcca6;
  }

  .dark .dropdownBtn .label .name {
    color: #fff;
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

  .dark .dropdownBtn .options .optionItem .icon {
    color: #3dcca6;
  }

  .dark .dropdownBtn .options .optionItem .name {
    color: #ffffff;
  }

  .dark .dropdownBtn .options .optionItem:hover {
    background-color: #393b70;
  }

  .dark .dropdownBtn .options .optionItem:hover .name {
    /*color: #fff;*/
  }

  .dark .dropdownBtn .options .optionItem:hover .icon {
    /*color: #fff;*/
  }

  .dark .dropdownBtn .options .mouseDown {
    background-color: #3dcca6 !important;
  }

  .dark .dropdownBtn .options .mouseDown .name, .dark .dropdownBtn .options .mouseDown .icon {
    color: #fff !important;
  }

  .dark .disable {
    pointer-events: none;
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

  /*endregion*/
</style>
