<template>
  <li>
    <div class="treeItemCont" v-bind:class="theme">
      <div class="treeItemIcon" v-bind:class="openEx"
           v-on:click="toggle"></div>
      <div class="treeItemCustomIcon"
           v-if="hasIcon"
           v-bind:class="model.icon"
           v-on:click="onTreeNodeClick(model)"></div>
      <div class="treeItemName"
           v-bind:title="model.name"
           v-on:click="onTreeNodeClick(model)">
        {{model.name}}
      </div>
    </div>
    <ul class="treeItemSubItems" v-show="open" v-if="isFolder">
      <marvel-z-tree-item
        class="item"
        v-for="(model, index) in model.children"
        v-bind:key="index"
        :model="model"
        v-on:onTreeNodeClick="onTreeNodeClick">
      </marvel-z-tree-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'MarvelZTreeItem',
    props: ["model", "theme"],
    data: function () {
      return {
        open: false
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length;
      },
      openEx: function(){
          if(this.model.children && this.model.children.length){
              return this.open ? ['icon-marvelIcon-64'] : ['icon-marvelIcon-65'];
          }
          else{
              return [""];
          }
      },
      hasIcon: function(){
          return this.model.icon != undefined;
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      onTreeNodeClick: function (oTreeNode) {
        this.$emit("onTreeNodeClick", oTreeNode);
      }
    }
  }
</script>

<style scoped>
  ul,li{
    list-style: none;
  }
  .item {
    cursor: pointer;
    height:30px;
  }
  .treeItemCont{
    height:30px;
    padding-top: 7px;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .treeItemCont .treeItemIcon{
    width: 16px;
    height:16px;
    font-size: 10px;
    line-height: 16px;
    cursor: pointer;
    float: left;
  }
  .treeItemCont .treeItemCustomIcon{
    width: 16px;
    height:16px;
    font-size: 14px;
    line-height: 16px;
    display: inline-block;
    color: #3399ff;
    float: left;
  }
  .treeItemCont .icon-minus{
    color: #3399ff;
  }
  .treeItemCont .icon-plus{
    color: #777777;
  }
  .treeItemCont .treeItemName{
    width: calc(100% - 36px);
    line-height: 16px;
    height:16px;
    color: #333333;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    float: left;
  }
  .treeItemCont .treeItemName:hover{
    color: #3399ff;
  }
  .treeItemSubItems{
    padding-left: 16px;
  }

  .dark{}
  .dark .treeItemIcon{}
  .dark .treeItemCustomIcon{
    color: #3dcca6;
  }
  .dark .icon-minus{
    color: #3dcca6;
  }
  .dark .icon-plus{
    color: #afbeda;
  }
  .dark .treeItemName{
    color: #afbeda;
  }
  .dark .treeItemName:hover{
    color: #3dcca6;
  }

</style>
