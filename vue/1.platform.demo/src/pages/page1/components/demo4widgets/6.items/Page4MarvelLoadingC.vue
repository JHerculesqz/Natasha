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
              <button v-on:click="showGlobal" class="loadingControlBtn">showGlobal</button>
              <button v-on:click="showLeft" class="loadingControlBtn">showLeft</button>
              <button v-on:click="hideLeft" class="loadingControlBtn">hideLeft</button>
              <button v-on:click="showRight" class="loadingControlBtn">showRight</button>
              <button v-on:click="hideRight" class="loadingControlBtn">hideRight</button>
              <button v-on:click="showCancelBtn(true)" class="loadingControlBtn">showCancelBtn</button>
              <button v-on:click="showCancelBtn(false)" class="loadingControlBtn">hideCancelBtn</button><br>
              <marvel-loading ref="ref0" :isGlobal="true" :hasCancelBtn="isShowCancelBtn" v-on:onCancel="loadingOnCancel(arguments, 'ref0')"></marvel-loading>
              <div class="loadingArea1">
                <marvel-loading ref="ref1" :isGlobal="false" :hasCancelBtn="isShowCancelBtn" v-on:onCancel="loadingOnCancel(arguments, 'ref1')"></marvel-loading>
              </div>
              <div class="loadingArea2">
                <marvel-loading ref="ref2" :isGlobal="false" :hasCancelBtn="isShowCancelBtn" v-on:onCancel="loadingOnCancel(arguments, 'ref2')"></marvel-loading>
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
              <button v-on:click="showGlobal2" class="loadingControlBtn">showGlobal</button>
              <button v-on:click="showLeft2" class="loadingControlBtn">showLeft</button>
              <button v-on:click="hideLeft2" class="loadingControlBtn">hideLeft</button>
              <button v-on:click="showRight2" class="loadingControlBtn">showRight</button>
              <button v-on:click="hideRight2" class="loadingControlBtn">hideRight</button>
              <button v-on:click="showCancelBtn2(true)" class="loadingControlBtn">showCancelBtn</button>
              <button v-on:click="showCancelBtn2(false)" class="loadingControlBtn">hideCancelBtn</button><br>
              <marvel-loading ref="ref3" :isGlobal="true" :onlyIcon="true" :hasCancelBtn="isShowCancelBtn2" v-on:onCancel="loadingOnCancel(arguments, 'ref3')"></marvel-loading>
              <div class="loadingArea1">
                <marvel-loading ref="ref4" :isGlobal="false" :onlyIcon="true" :hasCancelBtn="isShowCancelBtn2" v-on:onCancel="loadingOnCancel(arguments, 'ref4')"></marvel-loading>
              </div>
              <div class="loadingArea2">
                <marvel-loading ref="ref5" :isGlobal="false" :onlyIcon="true" :hasCancelBtn="isShowCancelBtn2" v-on:onCancel="loadingOnCancel(arguments, 'ref5')"></marvel-loading>
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

    <div class="describe">loading 堆栈展示</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="showArea">
              <button v-on:click="showLoading(`key1`)" class="loadingControlBtn">showLoading key1</button>
              <button v-on:click="showLoading(`key2`)" class="loadingControlBtn">showLoading key2</button>
              <button v-on:click="showLoading(`key3`)" class="loadingControlBtn">showLoading key3</button>
              <button v-on:click="hideLoading(`key1`)" class="loadingControlBtn">hideLoading key1</button>
              <button v-on:click="hideLoading(`key2`)" class="loadingControlBtn">hideLoading key2</button>
              <button v-on:click="hideLoading(`key3`)" class="loadingControlBtn">hideLoading key3</button>
              <button v-on:click="hideAllLoading" class="loadingControlBtn">hideAllLoading</button><br>
              <marvel-loading ref="ref6" :isGlobal="true" :hasCancelBtn="true" v-on:onCancel="loadingOnCancel(arguments, 'ref6')"></marvel-loading>
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
        isShowCancelBtn: false,
        isShowCancelBtn2: false
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
        this.$refs.ref0.showLoading("ref0", "global loading...");
      },
      showLeft: function(){
        this.$refs.ref1.showLoading("ref1", "loading");
      },
      hideLeft: function(){
        this.$refs.ref1.hideLoading("ref1");
      },
      showRight: function(){
        this.$refs.ref2.showLoading("ref2", "加载中");
      },
      hideRight: function(){
        this.$refs.ref2.hideLoading("ref2");
      },
      showCancelBtn: function(bIsShow){
        this.isShowCancelBtn = bIsShow;
      },

      showGlobal2: function(){
        this.$refs.ref3.showLoading("ref3", "global loading...");
      },
      showLeft2: function(){
        this.$refs.ref4.showLoading("ref4", "loading");
      },
      hideLeft2: function(){
        this.$refs.ref4.hideLoading("ref4");
      },
      showRight2: function(){
        this.$refs.ref5.showLoading("ref5", "加载中");
      },
      hideRight2: function(){
        this.$refs.ref5.hideLoading("ref5");
      },
      showCancelBtn2: function(bIsShow){
        this.isShowCancelBtn2 = bIsShow;
      },

      loadingOnCancel:function(strKey, refKey){
        this.$refs[refKey].hideLoading(strKey[0]);
      },

      showLoading: function (strKey) {
        this.$refs.ref6.showLoading(strKey, "public loading " + strKey);
      },
      hideLoading: function (strKey) {
        this.$refs.ref6.hideLoading(strKey);
      },
      hideAllLoading: function () {
        this.$refs.ref6.hideAllLoading();
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
  .loadingControlBtn {
    z-index: 999999;
    position: relative;
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
