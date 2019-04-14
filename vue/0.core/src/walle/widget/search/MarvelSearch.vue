<template>

  <div class="searchWrapper" :class="{searchInputEx : mixin=='true'}">
    <input type="text" class="searchInput" v-bind:placeholder="placeholder" v-model="inputVal">
    <div class="searchBtn icon-marvelIcon-19" v-on:click="search"></div>
    <div class="deleBtn icon-marvelIcon-20" v-bind:class="{dpn: inputVal == ''}" @click="clear"></div>
  </div>

</template>

<script>

  export default {
    name: "MarvelSearch",
    props: ['placeholder', 'mixin'],
    data: function(){
      return {
        inputVal: ''
      }
    },
    methods: {
      search: function(){
        this.$emit("search", this.inputVal);
      },
      clear: function(){
        this.inputVal = "";
      }
    }
  }

</script>

<style scoped>
  .searchWrapper{
    height: 32px;
    padding-left: 10px;
    width: 100%;
    position: relative;
    background-color: #ffffff;
  }
  .searchWrapper .searchInput{
    height: 100%;
    border: 1px solid #cccccc;
    width: 100%;
    float: left;
    padding: 0 70px 0 10px;
    outline: none;
    line-height: 30px;
    color: #333;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .searchWrapper .searchInput:hover{
    border: 1px solid #3399ff;
  }

  .searchWrapper .searchBtn{
    position: absolute;
    height: 30px;
    width: 40px;
    top: 0px;
    right: 0px;
    color: #777;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    cursor: pointer;
  }
  .searchWrapper .searchBtn:hover{
    color: #3399ff !important;
  }
  .searchWrapper .deleBtn{
    position: absolute;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #999;
    top: 3px;
    right: 40px;
    border-right: 1px solid #ccc;
    cursor: pointer;
  }
  .searchWrapper .deleBtn:hover{
    color: #3399ff;
  }

  .searchInputEx{
    height:30px;
    box-sizing: border-box;
  }
  .searchInputEx .searchInput{
    border: none;
  }
  .searchInputEx .searchInput:hover{
    border: none;
  }
  .dpn{display: none}
</style>
