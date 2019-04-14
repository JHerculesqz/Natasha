<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Loading</div>
    <div class="describe">
      Loading
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Loading</div>
    <div class="describe">
      Loading
    </div>
    <div class="showArea">
      <marvel-frame hasMargin="false" media="24,24,24,24" classCustom="classCustom1">
        <button v-on:click="showGlobal">showGlobal</button>
        <button v-on:click="showLeft">showLeft</button>
        <button v-on:click="hideLeft">hideLeft</button>
        <button v-on:click="showRight">showRight</button>
        <button v-on:click="hideRight">hideRight</button>
        <marvel-loading ref="ref0" :isGlobal="true"></marvel-loading>
        <marvel-frame hasMargin="false" media="12,12,12,12" classCustom="classCustom2">
          <marvel-loading ref="ref1" :isGlobal="false"></marvel-loading>
        </marvel-frame>
        <marvel-frame hasMargin="false" media="12,12,12,12" classCustom="classCustom3">
          <marvel-loading ref="ref2" :isGlobal="false"></marvel-loading>
        </marvel-frame>
      </marvel-frame>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelFrame, MarvelLoading} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Loading',
    components: {MarvelTabItem,
      MarvelTab,
      MarvelFrame, MarvelLoading},
    data: function() {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data

        //#endregion
      }
    },
    methods: {
      //#region inner
      showGlobal: function(){
        this.$refs.ref0.imsgMarvelLoadingShow("global loading...");
      },
      showLeft: function(){
        this.$refs.ref1.imsgMarvelLoadingShow("loading");
      },
      hideLeft: function(){
        this.$refs.ref1.imsgMarvelLoadingHide();
      },
      showRight: function(){
        this.$refs.ref2.imsgMarvelLoadingShow("加载中");
      },
      hideRight: function(){
        this.$refs.ref2.imsgMarvelLoadingHide();
      }
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    }
  }
</script>

<style scoped>
  /*document fix style start*/
  .widgetShowSession{
    padding: 20px 100px;
    width:100%;
    box-sizing: border-box;
  }
  .title{
    color: #4d4d4d;
  }
  .level1{
    font-size: 32px;
    line-height: 54px;
  }
  .level2{
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
  }
  .describe{
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }
  .showArea{
    width:100%;
  }
  .codeArea{
    width: 100%;
    height:100%;
    background-color: #f0f0f0;
    overflow: auto;
  }
  .codeArea pre,.codeArea code{
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner{
    padding-top: 36px;
    box-sizing: border-box;
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
    background-color: rgba(0,0,0,0.4);
  }
  /*document fix  style end*/
  /*document custom style start*/
  .showArea{
    height:250px;
  }
  /*document custom style end*/
  /*custom style start*/
  .classCustom1{
    height: 300px;margin-bottom: 10px;
  }
  .classCustom2{
    height: 300px;margin-bottom: 10px;background-color: #fff;border: dashed;
  }
  .classCustom3{
    height: 300px;margin-bottom: 10px;background-color: #fff;border: dashed;
  }
  /*custom style end*/
</style>
