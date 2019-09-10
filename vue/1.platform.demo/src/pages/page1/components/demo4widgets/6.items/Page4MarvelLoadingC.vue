<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelLoading</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->
    <div class="describe">loading</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="showArea">
              <button v-on:click="showGlobal">showGlobal</button>
              <button v-on:click="showLeft">showLeft</button>
              <button v-on:click="hideLeft">hideLeft</button>
              <button v-on:click="showRight">showRight</button>
              <button v-on:click="hideRight">hideRight</button><br>
              <marvel-loading ref="ref0" :isGlobal="true" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel"></marvel-loading>
              <div class="loadingArea1">
                <marvel-loading ref="ref1" :isGlobal="false" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel"></marvel-loading>
              </div>
              <div class="loadingArea2">
                <marvel-loading ref="ref2" :isGlobal="false" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel"></marvel-loading>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->

    <div class="describe">icon loading</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="showArea">
              <button v-on:click="showGlobal2">showGlobal</button>
              <button v-on:click="showLeft2">showLeft</button>
              <button v-on:click="hideLeft2">hideLeft</button>
              <button v-on:click="showRight2">showRight</button>
              <button v-on:click="hideRight2">hideRight</button><br>
              <marvel-loading ref="ref3" :isGlobal="true" :onlyIcon="true" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel"></marvel-loading>
              <div class="loadingArea1">
                <marvel-loading ref="ref4" :isGlobal="false" :onlyIcon="true" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel"></marvel-loading>
              </div>
              <div class="loadingArea2">
                <marvel-loading ref="ref5" :isGlobal="false" :onlyIcon="true" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel"></marvel-loading>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelLoadingIFrame" id="page4MarvelLoadingIFrame" src="static/jsdoc/module-MarvelLoading.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelLoading from "^/widget/load/MarvelLoading";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelLoadingC',
    components: {
      MarvelLoading,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
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
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$refs.page4MarvelLoadingIFrame.setIframe4DemoPage();
      },

      //#endregion

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
      },

      showGlobal2: function(){
        this.$refs.ref3.imsgMarvelLoadingShow("global loading...");
      },
      showLeft2: function(){
        this.$refs.ref4.imsgMarvelLoadingShow("loading");
      },
      hideLeft2: function(){
        this.$refs.ref4.imsgMarvelLoadingHide();
      },
      showRight2: function(){
        this.$refs.ref5.imsgMarvelLoadingShow("加载中");
      },
      hideRight2: function(){
        this.$refs.ref5.imsgMarvelLoadingHide();
      },
      loadingOnCancel:function(){
        console.log("loadingCancel");
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
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .title {
    color: #4d4d4d;
  }

  .level1 {
    font-size: 32px;
    line-height: 54px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 400px;
  }

  .loadingArea1{
    width: 50%;
    height: 300px;
    background-color: #ffccce;
    position: relative;
    float: left;
  }

  .loadingArea2{
    width: 50%;
    height: 300px;
    background-color: #c1d9ff;
    position: relative;
    float: left;
  }

  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
