<template>
  <div v-bind:class="theme" class="listMenuWrapper">
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
  export default {
    name: 'MarvelAccordion2',
    props: ["theme", "items"],
    data: function () {
      return {
        curSelectItemOrSubItem: undefined
      };
    },
    methods: {
      onClickItem: function (oItem) {
        if (oItem.children && oItem.children.length) {
          oItem.fold = !oItem.fold;
        }
        else {
          this.curSelectItemOrSubItem = oItem;
        }
        this.$emit("onClickItem", oItem);
      },
      onClickSubItem: function (oItem, oSubItem) {
        this.curSelectItemOrSubItem = oSubItem;
        this.$emit("onClickSubItem", oItem, oSubItem);
      },
      isItemOrSubItemSelect: function (oItemOrSubItem) {
        return (this.curSelectItemOrSubItem.label == oItemOrSubItem.label);
      }
    },
    beforeMount: function () {
      for (var i = 0, len = this.items.length; i < len; i++) {
        var oItem = this.items[i];
        if (oItem.active == true) {
          this.curSelectItemOrSubItem = oItem;
          break;
        }
        if (oItem.children && oItem.children.length) {
          for (var j = 0, jLen = oItem.children.length; j < jLen; j++) {
            var oSubItem = oItem.children[j];
            if (oSubItem.active == true) {
              this.curSelectItemOrSubItem = oSubItem;
              break;
            }
          }
        }
      }
    }
  }

</script>

<style scoped>
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
    font-size: 10px;
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

  .dark .listMenuItem {
    color: #ffffff;
  }

  .dark .listMenuItem:hover {
    color: #3dcca6;
  }

</style>
