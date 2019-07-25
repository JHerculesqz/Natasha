<template>
  <li v-show="showNode" style="width: 100%;">
    <div class="treeItemCont">
      <div class="treeItemIcon" v-bind:class="openEx"
           v-on:click="toggle"></div>
      <div class="treeItemCheck" v-if="treeItemOptions.hasCheckbox">
        <input class="treeitemCheckbox" type="checkbox" v-model="model.check"
               v-on:change.stop="onCheckboxClick(model)">
      </div>
      <div class="treeItemCustomIcon"
           v-if="hasIcon"
           v-bind:class="model.icon"
           v-bind:style="treeIconStyle"
           v-on:click.stop="onTreeNodeClickInner"
           v-on:dblclick.stop="onTreeNodeDBClickInner">
      </div>
      <div class="treeItemCustomIcon"
           v-if="hasImgIcon"
           v-on:click.stop="onTreeNodeClickInner"
           v-on:dblclick.stop="onTreeNodeDBClickInner">
        <img class="imgIcon" :src="model.imgIcon">
      </div>
      <div class="treeItemName" v-bind:style="{'max-width':getWidth}"
           v-bind:class="activeClass"
           v-bind:title="model.name"
           v-on:click.stop="onTreeNodeClickInner"
           v-on:dblclick.stop="onTreeNodeDBClickInner">
        {{model.name}}
      </div>
    </div>
    <ul class="treeItemSubItems" v-show="open" v-if="isFolder && model.dc">
      <marvel-z-tree-item
        v-for="(child, index) in model.children"
        v-bind:key="child.key"
        v-bind:model="child"
        v-bind:treeItemOptions="treeItemOptions"
        v-on:onCheckboxClick="onCheckboxClick"
        v-on:onTreeNodeClick="onTreeNodeClick"
        v-on:onTreeNodeDBClick="onTreeNodeDBClick">
      </marvel-z-tree-item>
    </ul>
  </li>
</template>

<script>
  /**
   *  MarvelZTreeItem widget description
   *  @vuedoc
   *  @exports MarvelZTreeItem
   */
  export default {
    name: 'MarvelZTreeItem',
    props: {
      model: {
        type: Object,
        default: undefined,
        required: true,
      },
      treeItemOptions: {
        type: Object,
        default: undefined,
        required: true,
      },
    },
    data: function () {
      return {
        open: this.model.bOpen === true
      }
    },
    created: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length;
      },
      openEx: function () {
        if (this.model.children && this.model.children.length) {
          return this.open ? ['icon-marvelIcon-64'] : ['icon-marvelIcon-65'];
        } else {
          return [""];
        }
      },
      hasIcon: function () {
        return this.model.icon != undefined;
      },
      hasImgIcon: function () {
        return this.model.imgIcon != undefined;
      },
      treeIconStyle: function () {
        return {
          color: this.model.iconColor
        }
      },
      showNode: function () {
        return this.model.bShow !== false;
      },
      activeClass: function () {
        if (this.treeItemOptions.hasActiveStyle) {
          if (this.model.active) {
            return "active"
          }
        }
        return "";
      },
      getWidth: function () {
        if (this.model.icon != undefined && this.treeItemOptions.hasCheckbox) {
          return "calc(100% - 66px)";
        } else if (this.model.icon != undefined || this.treeItemOptions.hasCheckbox) {
          return "calc(100% - 50px)";
        } else {
          return "calc(100% - 34px)";
        }
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$set(this.model, "dc", this.model.bOpen);
      },

      //#endregion

      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open;
          this.$set(this.model, "dc", this.model.dc || this.open);
        }
      },

      //#endregion
      //#region callback

      onCheckboxClick: function (oTreeNode) {
        this.$emit("onCheckboxClick", oTreeNode);
      },
      onTreeNodeClickInner: function () {
        this.$emit("onTreeNodeClick", this.model);
      },
      onTreeNodeClick: function (oTreeNode) {
        this.$emit("onTreeNodeClick", oTreeNode);
      },
      onTreeNodeDBClickInner: function () {
        this.$emit("onTreeNodeDBClick", this.model);
      },
      onTreeNodeDBClick: function (oTreeNode) {
        this.$emit("onTreeNodeDBClick", oTreeNode);
      }

      //#endregion
      //#region 3rd
      //#endregion

    },
    watch: {
      "model.bOpen": function (oNewValue, oOldValue) {
        this.open = oNewValue;
        this.$set(this.model, "dc", this.model.dc || this.open);
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
  ul, li {
    list-style: none;
    float: none;
  }

  .treeItemCont {
    width: 100%;
    height: 30px;
    padding-top: 7px;
    box-sizing: border-box;
    white-space: nowrap;
  }

  .treeItemCont .treeItemIcon {
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #333333;
    line-height: 16px;
    cursor: pointer;
    float: left;
  }

  .treeItemCont .treeItemCheck {
    float: left;
    height: 12px;
    width: 12px;
    position: relative;
    margin-right: 4px;
  }

  .treeItemCont .treeItemCheck .treeitemCheckbox {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0;
    top: 2px;
    left: 0;
  }

  .treeItemCont .treeItemCustomIcon {
    width: 16px;
    height: 16px;
    cursor: pointer;
    font-size: 14px;
    line-height: 16px;
    display: inline-block;
    color: #3399ff;
    float: left;
  }

  .treeItemCont .icon-minus {
    color: #3399ff;
  }

  .treeItemCont .icon-plus {
    color: #777777;
  }

  .treeItemCont .treeItemName {
    line-height: 16px;
    height: 16px;
    color: #333333;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    float: left;
    padding: 0 4px;
  }

  .treeItemCont .treeItemName:hover {
    color: #3399ff;
  }

  .active {
    background-color: #FEEABF;
    border: 1px solid #FEC673;
  }

  .treeItemSubItems {
    padding-left: 16px;
  }

  .imgIcon {
    height: 16px;
    width: 16px;
  }

  .dark .treeItemIcon {
    color: #FFFFFF;
  }

  .dark .treeItemCustomIcon {
    color: #3dcca6;
  }

  .dark .icon-minus {
    color: #3dcca6;
  }

  .dark .icon-plus {
    color: #afbeda;
  }

  .dark .treeItemName {
    color: #afbeda;
  }

  .dark .treeItemName:hover {
    color: #3dcca6;
  }

  .dark .active {
    background-color: rgba(61, 202, 166, 0.4);
    border: 1px solid #3dcca6;
  }

</style>
