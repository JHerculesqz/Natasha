<template>
  <div class="selectCard" v-bind:class="[size]">
    <div class="selectCardItem" v-for="item in items"
         v-on:click="onClick(item)"
         v-bind:class="{ selected: selectItem==item }">{{ item }}</div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelSelectCard',
    props: ["size", "items"],
    data: function() {
        return {
          selectItem: this.items[0]
        }
    },
    methods: {
      onClick: function(oItem){
        this.selectItem = oItem;
      },
      getSelectItem: function(){
        return this.selectItem;
      }
    }
  }
</script>

<style scoped>
  .selectCard{
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
  }
  .selectCard .selectCardItem{
    float: left;
    border-right: 1px solid #ccc;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }
  .selectCard .selected{
    background-color: #3399ff !important;
    color: #fff !important;
  }
  .selectCard .selectCardItem:last-child{
    border-right: none;
  }
  .selectCard .selectCardItem:hover{
    background-color: #f5f6f7;
    color: #3399ff;
  }
  .large{
    height: 34px;
  }
  .large .selectCardItem{
    line-height:34px;
    padding: 0 30px;
  }
  .mini{
    height: 24px;
  }
  .mini .selectCardItem{
    line-height: 24px;
    padding: 0 20px;
  }

  /*region dark theme*/

  .dark .selectCard{
    border: 1px solid #8b90b3;
    background-color: #17191f;
  }
  .dark .selectCard .selectCardItem{
    border-right: 1px solid #8b90b3;
    color: #8b90b3;
  }
  .dark .selectCard .selected{
    background-color: #3dcca6 !important;
    color: #fff !important;
  }
  .dark .selectCard .selectCardItem:last-child{
    border-right: none;
  }
  .dark .selectCard .selectCardItem:hover{
    background-color: #393b70;
    color: #8b90b3;
  }
  /*endregion*/
</style>
