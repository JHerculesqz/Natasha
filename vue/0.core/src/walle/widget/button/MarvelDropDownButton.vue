<template>
  <div class="dropdownBtnWrapper" v-bind:class="theme">
    <div class="dropdownBtn"
         v-bind:class="disable"
         v-bind:style="{ width: width }">
      <div class="label" v-on:click="showOrHide">
        <div class="icon"
             v-bind:class="[selectItem.icon]"></div>
        <div class="name">{{ selectItem.label }}</div>
        <div class="expandAndFolderIcon icon-marvelIcon-24"></div>
      </div>
      <div class="options" v-bind:class="{ hide: !show }">
        <div class="optionItem"
             v-for="item in items"
             v-bind:class="{ mouseDown: item.label == selectItem.label }"
             v-on:click="selectClick(item)">
          <div class="icon" v-bind:class="[item.icon]"></div>
          <div class="name">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelDropDownButton',
    props: ["disable", "theme", "width"],
    data: function() {
        return {
          items: [],
          selectItem: {label: "Item1", icon:"icon-pencil"},
          show: false
        }
    },
    methods: {
      init: function(lstItems, strSelectItemLabel){
        this.items = lstItems;
        for(var i=0;i<this.items.length;i++){
          var oItem = this.items[i];
          if(oItem.label == strSelectItemLabel){
            this.selectItem = oItem;
          }
        }
      },
      showOrHide: function(){
        this.show = !this.show;
      },
      selectClick: function(oItem){
        this.selectItem = oItem;
        this.showOrHide();
      },
      getSelectItem: function(){
        return this.selectItem.label;
      }
    }
  }
</script>

<style scoped>
  .dropdownBtnWrapper{
    width: 100%;
    height:100%;
  }
  .dropdownBtn{
    border: 1px solid #ccc;
    white-space: nowrap;
    font-size: 14px;
    display: inline-block;
    border-radius: 2px;
  }
  .dropdownBtn:hover{
    border: 1px solid #3399ff;
  }
  .dropdownBtn .label{
    height: 32px;
    padding: 0 25px 0 15px;
    cursor: pointer;
    position: relative;
  }
  .dropdownBtn .label .icon{
    color: #3399ff;
    font-size: 14px;
    line-height: 32px;
    float: left;
    margin-right: 5px;
  }
  .dropdownBtn .label .name{
    color: #333;
    font-size: 14px;
    line-height: 32px;
    float: left;
    margin-right: 10px;
  }
  .dropdownBtn .label .expandAndFolderIcon{
    color: #777;
    position: absolute;
    right: 10px;
    font-size: 12px;
    line-height: 32px;
    float: left;
  }

  .dropdownBtn .options{
    border-top: 1px solid #ccc;
  }
  .dropdownBtn .options .optionItem{
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 25px 0 15px;
    background-color: #fff;
  }

  .dropdownBtn .options .optionItem .icon{
    color: #3399ff;
    font-size: 14px;
    line-height: 32px;
    float: left;
    margin-right: 5px;
  }
  .dropdownBtn .options .optionItem .name{
    color: #333;
    font-size: 14px;
    line-height: 32px;
    float: left;
    margin-right: 10px;
  }
  .dropdownBtn .options .optionItem:hover{
    background-color: #f5f6f7;
  }
  .dropdownBtn .options .optionItem:hover .name{
    color: #3399ff;
  }
  .dropdownBtn .options .mouseDown{
    background-color: #3399ff !important;
  }
  .dropdownBtn .options .mouseDown .name,.dropdownBtn .options .mouseDown .icon{
    color:#fff !important;
  }
  .disable{
    pointer-events: none;
  }
  .disable .label{
    background-color: #f0f0f0;
  }
  .disable .label .icon,.disable .label .expandAndFolderIcon{
    color: #aaa;
  }
  .disable .label .name{
    color: #999;
  }
  .disable .options{
    /*display: none !important;*/
    border-top: none;
    border-top: none;
    height: 0;
    overflow: hidden;
  }
  .hide{
    border-top: none !important;
    height: 0;
    overflow: hidden;
  }

  .dark{}
  .dark .dropdownBtn{
    border: 1px solid #8b90b3;
  }
  .dark .dropdownBtn:hover{
    border: 1px solid #3399ff;
  }
  .dark .dropdownBtn .label{}
  .dark .dropdownBtn .label .icon{
    color: #3399ff;
  }
  .dark .dropdownBtn .label .name{
    color: #fff;
  }
  .dark .dropdownBtn .label .expandAndFolderIcon{
    color: #8b90b3;
  }

  .dark .dropdownBtn .options{
    border-top: 1px solid #8b90b3;
  }
  .dark .dropdownBtn .options .optionItem{
    background-color: #1e1f36;
  }

  .dark .dropdownBtn .options .optionItem .icon{
    color: #3399ff;
  }
  .dark .dropdownBtn .options .optionItem .name{
    color: #ffffff;
  }
  .dark .dropdownBtn .options .optionItem:hover{
    background-color: #66b3ff;
  }
  .dark .dropdownBtn .options .optionItem:hover .name{
    color: #fff;
  }
  .dark .dropdownBtn .options .optionItem:hover .icon{
    color: #fff;
  }
  .dark .dropdownBtn .options .mouseDown{
    background-color: #3399ff !important;
  }
  .dark .dropdownBtn .options .mouseDown .name,.dropdownBtn .options .mouseDown .icon{
    color:#fff !important;
  }
  .dark .disable{
    pointer-events: none;
  }
  .dark .disable .label{
    background-color: rgba(0,0,0,0.4);
  }
  .dark .disable .label .icon,.disable .label .expandAndFolderIcon{
    color: rgba(255,255,255,0.4);
  }
  .dark .disable .label .name{
    color: #8d8d8d;
  }
  .dark .disable .options{
  }
  .dark .hide{
  }
</style>
