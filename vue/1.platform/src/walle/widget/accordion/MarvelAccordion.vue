<template>
  <!-- accordion start-->
  <div class="accordionWrapper" v-bind:class="[{accordionShadow: showAccordionShadow}, {folder: folderAccordion}]">
    <div class="expandAndFoldBtn icon-marvelIcon-08" v-if="showFolderBtn" v-on:click="showAndHide"></div>
    <div class="titleArea" v-if="showTitle">
      <div class="titleIcon" v-bind:class="[titleIcon]"></div>
      <div class="titleName">{{ title }}</div>
    </div>
    <div class="accordionItem" v-for="item in items"
         v-bind:class="{ select: isItemOrSubItemSelect(item) }">
      <div class="accordionItemCont">
        <div class="icon" v-bind:class="[item.icon]" :title="item.label"></div>
        <!--if has subItems-->
        <div class="name" v-if="hasSubItems(item)" :title="item.label"
             v-on:click="expandOrCollapseSubItems(item)">{{ item.label }}
        </div>
        <!--if not has subItems-->
        <div class="name" v-else :title="item.label"
             v-on:click="accordionItemClick(item)">{{ item.label }}
        </div>
        <!--if expand-->
        <div class="showAndHideSubMenu icon-marvelIcon-01"
             v-if="isExpandSubItems(item)"
             v-on:click="expandOrCollapseSubItems(item)"></div>
        <!--if collapse-->
        <div class="showAndHideSubMenu icon-marvelIcon-03"
             v-if="isCollapseSubItems(item)"
             v-on:click="expandOrCollapseSubItems(item)"></div>
      </div>
      <div class="selectMark"></div>
      <!--if expand-->
      <div class="accordionItemSubMenu"
           v-bind:class="{ dpn: isCollapseSubItems(item) }"
           v-if="isExpandSubItems(item)">
        <div class="accordionItemSubMenuItem"
             v-for="subItem in item.subItems"
             :title="subItem.label"
             v-bind:class="{ select: isItemOrSubItemSelect(subItem) }"
             v-on:click="accordionSubItemClick(subItem)">
          {{ subItem.label }}
          <div class="selectMark"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- accordion end-->
</template>

<script>
  /**
   *  MarvelAccordion widget description
   *  @vuedoc
   *  @exports MarvelAccordion
   */
  export default {
    name: 'MarvelAccordion',
    props: {
      showFolderBtn: {
        type: Boolean,
        default: true,
        required: false,
      },
      isFolder: {
        type: Boolean,
        default: false,
        required: false,
      },
      hasShadow: {
        type: Boolean,
        default: true,
        required: false,
      },
      title: {
        type: String,
        default: "",
        required: false,
      },
      titleIcon: {
        type: String,
        default: "",
        required: false,
      },
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      defaultSelectLabel: {
        type: String,
        default: "",
        required: false,
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    data: function () {
      return {
        lastSelectItemOrSubItemLabel: "",
        showAccordionShadow: this.hasShadow,
        folderAccordion: this.isFolder
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.lastSelectItemOrSubItemLabel = this.defaultSelectLabel;
      },

      //#endregion

      showAndHide: function () {
        this.folderAccordion = !this.folderAccordion;
        this.callback4AfterShowOrHide();
      },
      hasSubItems: function (oItem) {
        return oItem.subItems != undefined;
      },
      expandOrCollapseSubItems: function (oItem) {
        oItem.expand = !oItem.expand;
      },
      accordionItemClick: function (oItem) {
        this.lastSelectItemOrSubItemLabel = oItem.label;
        this.callback4AccordionItemClick(oItem);
      },
      isItemOrSubItemSelect: function (oItem) {
        return oItem.label == this.lastSelectItemOrSubItemLabel;
      },
      isExpandSubItems: function (oItem) {
        return oItem.subItems != undefined && oItem.expand;
      },
      isCollapseSubItems: function (oItem) {
        return oItem.subItems != undefined && !oItem.expand;
      },
      accordionSubItemClick: function (oSubItem) {
        this.lastSelectItemOrSubItemLabel = oSubItem.label;
        this.callback4AccordionSubItemClick(oSubItem);
      },

      //#endregion
      //#region callback

      callback4AfterShowOrHide: function () {
        this.$emit("afterShowOrHide", this.folderAccordion ? "folder" : "");
      },
      callback4AccordionItemClick: function (oItem) {
        this.$emit("accordionItemClick", oItem);
      },
      callback4AccordionSubItemClick: function (oSubItem) {
        this.$emit("accordionSubItemClick", oSubItem);
      }

      //#endregion
      //#region 3rd
      //#endregion

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
  .dpn {
    display: none;
  }

  .accordionWrapper {
    padding: 20px 30px;
    background-color: #f4f5f6;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .accordionShadow {
    -moz-box-shadow: 0px 0px 5px #999 inset; /* For Firefox3.6+ */
    -webkit-box-shadow: 0px 0px 5px #999 inset; /* For Chrome5+, Safari5+ */
    box-shadow: 0px 0px 10px #999 inset; /* For Latest Opera */
  }

  .accordionWrapper .expandAndFoldBtn {
    height: 16px;
    margin-bottom: 20px;
    text-align: right;
    font-size: 16px;
    line-height: 16px;
    color: #666;
    cursor: pointer;
  }

  .accordionWrapper .titleArea {
    height: 64px;
    margin-bottom: 20px;
  }

  .accordionWrapper .titleArea .titleIcon {
    height: 50px;
    font-size: 50px;
    float: left;
    margin-right: 20px;
    color: #666;
    line-height: 50px;
  }

  .accordionWrapper .titleArea .titleName {
    height: 64px;
    font-size: 20px;
    float: left;
    color: #666;
    width: calc(100% - 70px);
  }

  .accordionWrapper .accordionItem {
    border-top: 1px solid #ccc;
    position: relative;
  }

  .accordionWrapper .accordionItem:last-child {
    border-bottom: 1px solid #ccc;
  }

  .accordionItem .accordionItemCont {
    height: 40px;
  }

  .accordionItem .accordionItemCont .icon {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #666;
    float: left;
    cursor: pointer;
  }

  .accordionItem .accordionItemCont .name {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #666;
    float: left;
    margin-left: 10px;
    cursor: pointer;
  }

  .accordionItem .accordionItemCont .showAndHideSubMenu {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #999;
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }

  .accordionItem .accordionItemSubMenu .accordionItemSubMenuItem {
    height: 40px;
    border-top: 1px solid #ccc;
    padding-left: 30px;
    font-size: 14px;
    color: #666;
    line-height: 40px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .accordionItemSubMenuItem {
    position: relative;
  }

  .accordionItem .selectMark {
    position: absolute;
    height: calc(100% - 20px);
    width: 3px;
    right: -33px;
    top: 10px;
  }

  .folder {
    display: inline-block;
  }

  .folder .titleArea {
    display: none
  }

  .folder .accordionItem .accordionItemCont .name {
    display: none
  }

  .folder .accordionItem .accordionItemCont .showAndHideSubMenu {
    display: none
  }

  .folder .accordionItem .accordionItemSubMenu {
    position: absolute;
    left: 46px;
    top: 10px;
    background-color: #f4f5f6;
    padding: 0 30px;
    border: 2px solid #fff;
    display: none;
  }

  .folder .accordionItem .accordionItemSubMenu .accordionItemSubMenuItem {
    padding: 0px;
  }

  .folder .accordionItem .accordionItemSubMenu .accordionItemSubMenuItem:first-child {
    border-top: 0px solid #ccc;
  }

  .select {
    color: #3399ff !important;
  }

  .select .selectMark {
    background-color: #3399ff;
  }

  .select .accordionItemCont .icon {
    color: #3399ff
  }

  .select .accordionItemCont .name {
    color: #3399ff
  }


  /*region dark theme*/

  .dark .accordionWrapper {
    background-color: #1e1f37;
  }

  .dark .accordionWrapper .expandAndFoldBtn {
    color: #adb3dd;
  }

  .dark .accordionWrapper .titleArea .titleIcon {
    color: #adb3dd;
  }

  .dark .accordionWrapper .titleArea .titleName {
    color: #8b90b3;
  }

  .dark .accordionWrapper .accordionItem {
    border-top: 1px solid #a7abbe;
  }

  .dark .accordionWrapper .accordionItem:last-child {
    border-bottom: 1px solid #a7abbe;
  }

  .dark .accordionItem .accordionItemCont .icon {
    color: #adb3dd;
  }

  .dark .accordionItem .accordionItemCont .name {
    color: #8b90b3;
  }

  .dark .accordionItem .accordionItemCont .showAndHideSubMenu {
    color: #adb3dd;
  }

  .dark .accordionItem .accordionItemSubMenu .accordionItemSubMenuItem {
    border-top: 1px solid #a7abbe;
    color: #8b90b3;
  }

  .dark .select {
    color: #3dcca6 !important;
  }

  .dark .select .accordionItemCont .icon {
    color: #3dcca6;
  }

  .dark .select .accordionItemCont .name {
    color: #3dcca6;
  }

  /*endregion*/
</style>
