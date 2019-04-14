<template>
  <div class="inputDropDownBtnWrapper">
    <div class="dropdownBtn"  v-click-outside="hideSubMenu"
         v-bind:class="disable">
      <div class="label adaptToParent" v-on:click.stop="showSubMenu">
        <input type="text" class="name"
               v-model="inputMsg"
               @focus="onFocus"
               @input="onInput">
        <div class="expandAndFolderIcon icon-marvelIcon-24"></div>
      </div>
      <div class="options" v-bind:class="[{ hide: !show }]"
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
  export default {
    name: 'MarvelInputDropDown',
    props: ["disable", "maxHeight"],
    data: function () {
      return {
        items: [],
        filterOptionItems:[],
        lastSelectItem: {label: ""},
        selectItem: {label: ""},
        inputMsg:"",
        show: false,
        isFilter:false
      }
    },
    methods: {
      init: function (lstItems, strSelectItemLabel) {
        this.items = lstItems;
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.label == strSelectItemLabel) {
            this.selectItem = oItem;
            this.inputMsg = oItem.label;
          }
        }
        this.setOptionFilterStatus();
      },
      showSubMenu: function () {
        this.show = true;
      },
      hideSubMenu: function () {
        this.show = false;
        this.onBlur();
      },
      onFocus:function(){
        this.lastSelectItem = this.selectItem;
      },
      onBlur:function(){
        var bHasFixedInput = false;
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.label == this.inputMsg) {
            this.selectItem = oItem;
            this.inputMsg = oItem.label;
            bHasFixedInput = true;
          }
        }
        if(!bHasFixedInput){
          this.selectItem = this.lastSelectItem;
          this.inputMsg = this.selectItem.label;
        }

        this.isFilter = false;
        this.setOptionFilterStatus();
      },
      onInput:function(){
        this.isFilter = true;
        this.setOptionFilterStatus();
      },
      setOptionFilterStatus:function(){
        this.filterOptionItems = [];
        if(!this.isFilter){
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].filter = false;
            this.filterOptionItems.push(this.items[i]);
          }
        }else{
          for (var i = 0; i < this.items.length; i++) {
            var oItem = this.items[i];
            if (oItem.label.indexOf(this.inputMsg)== -1) {
              this.items[i].filter = true;
            }else{
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
        this.$emit('onOptionSelect', oItem);
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
            this.selectItem = oItem;
            this.inputMsg = oItem.label;
            break;
          }
        }
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
  .inputDropDownBtnWrapper {
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

  .dropdownBtn .adaptToParent .name{
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

  .dropdownBtn .options:hover {
    border-left: 1px solid #3399ff;
    border-right: 1px solid #3399ff;
    border-bottom: 1px solid #3399ff;
  }

  .dropdownBtn .options .filter{
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
    background-color: #f5f6f7;
  }

  .dropdownBtn .options .optionItem:hover .name, .dropdownBtn .options .focus .name {
    color: #3399ff;
  }

  .dropdownBtn .options .mouseDown {
    background-color: #3399ff !important;
  }

  .dropdownBtn .options .mouseDown .name{
    color: #ffffff !important;
  }

  .dropdownBtn .options .adaptToParent .name{
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

  /*region dark theme*/

  .dark .dropdownBtn {
    border: 1px solid #8b90b3;
  }

  .dark .dropdownBtn:hover {
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

  .dark .dropdownBtn .options .optionItem:hover, .dark .dropdownBtn .options .focus {
    background-color: #393b70;
  }

  .dark .dropdownBtn .options .optionItem:hover .name, .dark .dropdownBtn .options .focus .name {
    /*color: #fff;*/
  }

  .dark .dropdownBtn .options .mouseDown {
    background-color: #3dcca6 !important;
  }

  .dark .dropdownBtn .options .mouseDown .name{
    color: #fff !important;
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
