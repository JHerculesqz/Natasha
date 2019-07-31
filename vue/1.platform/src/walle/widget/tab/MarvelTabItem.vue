<template>
  <div class="cont" v-bind:class="{ uiSink: !isActive }">
    <slot></slot>
  </div>
</template>

<script>
  /**
   *  MarvelTabItem widget description
   *  @vuedoc
   *  @exports MarvelTabItem
   */
  export default {
    name: 'MarvelTabItem',
    props: {
      isActive: {
        type: Boolean,
        default: false,
        required: false,
      }
    },
    data: function () {
      return {}
    },
    methods: {}
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
  .tabWrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
  }

  .tabWrapper .headArea {
    height: 30px;
    border-bottom: 1px solid #cccccc;
    clear: both;
  }

  .tabWrapper .headArea .headItem {
    height: 100%;
    line-height: 30px;
    float: left;
    font-family: arial, "Microsoft YaHei", sans-serif;
    color: #333;
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
  }

  .tabWrapper .headArea .headItem:hover {
    color: #3399ff;
  }

  .tabWrapper .contArea {
    width: 100%;
    height: calc(100% - 30px);
    clear: both;
    background-color: #ffffff;
    position: relative;
  }

  .tabWrapper .contArea .cont {
    width: 100%;
    height: 100%;
  }

  .uiSink {
    opacity: 0;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .theme1 .headArea .headItem {
    border-bottom: 3px solid rgba(0, 0, 0, 0);
    line-height: 27px;
  }

  .theme1 .headArea .active {
    border-bottom: 3px solid #3399ff;
    box-sizing: border-box;
    font-weight: bold;

  }

  .theme2 .headArea .headItem {
    /*margin-top: 1px;*/
  }

  .theme2 .headArea .active {
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    background-color: #ffffff;

  }
</style>
