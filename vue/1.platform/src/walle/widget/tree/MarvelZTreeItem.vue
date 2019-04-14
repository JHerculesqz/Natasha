<template>
  <li v-show="showNode">
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
           v-on:click.stop="onTreeNodeClickInner"></div>
      <div class="treeItemName" v-bind:style="{'max-width':getWidth}"
           v-bind:class="activeClass"
           v-bind:title="model.name"
           v-on:click.stop="onTreeNodeClickInner">
        {{model.name}}
        <span v-if="model.subName != undefined">{{model.subName}}</span>
      </div>
    </div>
    <ul class="treeItemSubItems" v-show="open" v-if="isFolder">
      <marvel-z-tree-item
        v-for="(child, index) in model.children"
        v-bind:key="child.key"
        v-bind:model="child"
        v-bind:treeItemOptions="treeItemOptions"
        v-on:onCheckboxClick="onCheckboxClick"
        v-on:onTreeNodeClick="onTreeNodeClick">
      </marvel-z-tree-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'MarvelZTreeItem',
    props: ["model", "treeItemOptions"],
    data: function () {
      return {
        open: this.model.open === true
      }
    },
    beforeMount: function () {
      //如果是父节点
      if (this.isFolder) {
        if (!this.model.hasOwnProperty("open")) {
          this.$set(this.model, "open", true);
        }
      }
      if (!this.model.hasOwnProperty("show")) {
        this.$set(this.model, "show", true);
      }
      if (!this.model.hasOwnProperty("check")) {
        this.$set(this.model, "check", false);
      }
      if (this.treeItemOptions.hasActiveStyle) {
        if (!this.model.hasOwnProperty("active")) {
          this.$set(this.model, "active", false);
        }
      }
      if (!this.model.hasOwnProperty("iconColor")) {
        this.$set(this.model, "iconColor", "");
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length;
      },
      openEx: function () {
        if (this.model.children && this.model.children.length) {
          return this.open ? ['icon-marvelIcon-64'] : ['icon-marvelIcon-65'];
        }
        else {
          return [""];
        }
      },
      hasIcon: function () {
        return this.model.icon != undefined;
      },
      treeIconStyle: function () {
        return {
          color: this.model.iconColor
        }
      },
      showNode: function () {
        return this.model.show !== false;
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
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      onCheckboxClick: function (oTreeNode) {
        this.$emit("onCheckboxClick", oTreeNode);
      },
      onTreeNodeClickInner: function () {
        if (this.treeItemOptions.hasActiveStyle) {
          this.$set(this.model, "active", true);
        }
        this.$emit("onTreeNodeClick", this.model);
      },
      onTreeNodeClick: function (oTreeNode) {
        this.$emit("onTreeNodeClick", oTreeNode);
      }
    },
    watch: {
      "model.open": function (oNewValue, oOldValue) {
        this.open = oNewValue;
      }
    }
  }
</script>

<style scoped>
  ul, li {
    list-style: none;
  }

  .treeItemCont {
    height: 30px;
    padding-top: 7px;
    box-sizing: border-box;
    white-space: nowrap;
  }

  .treeItemCont .treeItemIcon {
    width: 16px;
    height: 16px;
    font-size: 10px;
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
    font-size: 14px;
    float: left;
    padding: 0 4px;
  }

  .treeItemCont .treeItemName:hover {
    color: #417de2;
  }

  .treeItemCont .treeItemName span{
    color: #999999;
    padding-left: 6px;
    font-style: italic;
  }

  .active {
    color: #3399ff !important;
  }

  .treeItemSubItems {
    padding-left: 16px;
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
    color: #3eb593;
  }

  .dark .treeItemName span{
    color: #45559a;
    padding-left: 6px;
    font-style: italic;
  }

  .dark .active {
    color:#3dcca6 !important;
  }

  /*darkBg theme*/

  .blackBg .treeItemCont .treeItemCustomIcon {
    color: #3399ff;
  }

  .blackBg .treeItemIcon {
    color: #FFFFFF;
  }

  .blackBg .treeItemCont .icon-minus {
    color: #3399ff;
  }

  .blackBg .treeItemCont .icon-plus {
    color: #aaa;
  }

  .blackBg .treeItemCont .treeItemName {
    color: #eeeeee;
  }

  .blackBg .treeItemCont .treeItemName:hover {
    color: #417de2;
  }

  .blackBg .treeItemCont .treeItemName span{
    color: #888;
  }

  .blackBg .active {
    color: #3399ff !important;
  }

  /*endregion*/

</style>
