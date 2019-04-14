<template>
  <div class="foldPanelWrapper" v-bind:class="{fold: !item.bIsExpand}"
       :style="{height: item.height}">
    <div class="foldPanelTitle" v-on:click="expandOrFold">
      <div class="title">{{item.name}}</div>
      <div class="btn" v-bind:class="[{'icon-marvelIcon-01':item.bIsExpand},{'icon-marvelIcon-03': !item.bIsExpand}]"></div>
    </div>
    <div class="contArea"  v-show="item.bIsExpand">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'MarvelFoldPanel',
    props: ["item"],
    data: function() {
      return {
      }
    },
    computed: {

    },
    methods: {
      expandOrFold:function(){
        this.item.bIsExpand = !this.item.bIsExpand;
        this.$emit('onTitleClick', this.item, this.item.bIsExpand);
      }
    }
  }
</script>

<style scoped>
  .foldPanelWrapper{
    width: 100%;
  }
  .fold{
    height: 32px !important;
  }
  .foldPanelTitle{
    height: 32px;
    border-radius: 2px;
    background-color: #f3f4f5;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .title{
    font-size: 16px;
    line-height: 32px;
    color: #666;
    float: left;
  }
  .btn{
    color: #666;
    height: 32px;
    line-height: 32px;
    float: right;
  }
  .contArea{
    padding: 10px;
    height: calc(100% - 32px);
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.04);
  }


  /*region dark theme*/

  .dark .foldPanelTitle{
    background-color: #e1e4e5;
  }
  .dark .title{
    color: #ffffff;
  }
  .dark .btn{
    color: #3dcca6;
  }

  /*endregion*/
</style>
