<template>
  <div class="listMenuWrapper">
    <div class="listMenu" v-for="item in items">
      <div class="listMenuItem"
           v-bind:class="[isItemOrSubItemSelect(item) ? 'active' : '', item.icon]"
           v-on:click="onClickItem(item)">
        {{item.label}}
        <span class="expandFolderIcon "
              v-if="item.children && item.children.length"
              v-bind:class="item.fold ? 'icon-marvelIcon-03' : 'icon-marvelIcon-01'"></span>
      </div>
      <div class="subListMenu" v-if="item.children && item.children.length"
           v-bind:class="{dpn: item.fold}">
        <div class="listMenuItem" v-for="subItem in item.children"
             v-on:click.stop="onClickSubItem(item, subItem)"
             v-bind:class="{active: isItemOrSubItemSelect(subItem)}">{{subItem.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelAccordion2 widget description
   *  @vuedoc
   *  @exports MarvelAccordion2
   */
  export default {
    name: 'MarvelAccordion2',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
    },
    data: function () {
      return {
        curSelectId: undefined
      };
    },
    beforeMount: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        for (var i = 0, len = this.items.length; i < len; i++) {
          var oItem = this.items[i];
          if (oItem.active == true) {
            this.curSelectId = oItem.id;
            break;
          }
          if (oItem.children && oItem.children.length) {
            for (var j = 0, jLen = oItem.children.length; j < jLen; j++) {
              var oSubItem = oItem.children[j];
              if (oSubItem.active == true) {
                this.curSelectId = oItem.id;
                break;
              }
            }
          }
        }
      },

      //#endregion

      onClickItem: function (oItem) {
        if (oItem.children && oItem.children.length) {
          oItem.fold = !oItem.fold;
        } else {
          this.curSelectId = oItem.id;
        }
        this.callback4OnClickItem(oItem);
      },
      onClickSubItem: function (oItem, oSubItem) {
        this.curSelectId = oSubItem.id;
        this.callback4OnClickSubItem(oItem, oSubItem);
      },
      isItemOrSubItemSelect: function (oItemOrSubItem) {
        return this.curSelectId === oItemOrSubItem.id;
      },
      setSelectItem: function (id) {
        this.curSelectId = id;
      },

      //#endregion
      //#region callback

      callback4OnClickItem: function (oItem) {
        this.$emit("onClickItem", oItem);
      },
      callback4OnClickSubItem: function (oItem, oSubItem) {
        this.$emit("onClickSubItem", oItem, oSubItem);
      },

      //#endregion
      //#region 3rd
      //#endregion
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
  .listMenuWrapper {
    width: 100%;
    height: 100%;
  }

  .listMenuItem {
    line-height: 24px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 4px;
    padding: 0 10px;
    position: relative;
  }

  .listMenuItem:before {
    font-size: 16px;
  }

  .listMenuItem:hover {
    color: #3dcca6;
  }

  .expandFolderIcon {
    float: right;
    height: 24px;
    line-height: 24px;
  }

  .subListMenu {
    box-sizing: border-box;
  }

  .subListMenu .listMenuItem {
    padding-left: 26px;
  }

  .active {
    color: #fff !important;
    background-color: #3dcca6;
  }

  .dpn {
    display: none;
  }

  /*region dark theme*/

  .dark .listMenuItem {
    color: #ffffff;
  }

  .dark .listMenuItem:hover {
    color: #3dcca6;
  }

  .dark .active {
    color: #fff !important;
    background-color: #3067a8;
  }

  /*endregion*/

</style>
