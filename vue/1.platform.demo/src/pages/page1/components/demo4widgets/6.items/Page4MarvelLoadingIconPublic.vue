<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelLoadingIconPublic</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="showArea">
              <button v-on:click="showLoading2(`key1`)" class="loadingControlBtn">showLoading key1</button>
              <button v-on:click="showLoading2(`key2`)" class="loadingControlBtn">showLoading key2</button>
              <button v-on:click="showLoading2(`key3`)" class="loadingControlBtn">showLoading key3</button>
              <button v-on:click="hideLoading2(`key1`)" class="loadingControlBtn">hideLoading key1</button>
              <button v-on:click="hideLoading2(`key2`)" class="loadingControlBtn">hideLoading key2</button>
              <button v-on:click="hideLoading2(`key3`)" class="loadingControlBtn">hideLoading key3</button>
              <marvel-loading-icon-public ref="ref1"></marvel-loading-icon-public>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
           <div class="showArea">
              <button v-on:click="showLoading2(`key1`)" class="loadingControlBtn">showLoading key1</button>
              <button v-on:click="showLoading2(`key2`)" class="loadingControlBtn">showLoading key2</button>
              <button v-on:click="showLoading2(`key3`)" class="loadingControlBtn">showLoading key3</button>
              <button v-on:click="hideLoading2(`key1`)" class="loadingControlBtn">hideLoading key1</button>
              <button v-on:click="hideLoading2(`key2`)" class="loadingControlBtn">hideLoading key2</button>
              <button v-on:click="hideLoading2(`key3`)" class="loadingControlBtn">hideLoading key3</button>
              <marvel-loading-icon-public ref="ref1"></marvel-loading-icon-public>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelLoadingIconPublic.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelLoadingIconPublic from "~~/widget/loading/MarvelLoadingIconPublic";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelLoadingIconPublic',
    components: {
      MarvelLoadingIconPublic,
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
        this.$refs.IFrame.setIframe4DemoPage();
      },

      //#endregion

      showLoading2: function (strKey) {
        this.$refs.ref1.imsgMarvelLoadingPublicShow(strKey, "public loading " + strKey);
      },
      hideLoading2: function (strKey) {
        this.$refs.ref1.imsgMarvelLoadingPublicHide(strKey);
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

  /*document custom style end*/
  /*custom style start*/
  .showArea {
    height: 250px;
  }

  .loadingControlBtn {
    z-index: 999999;
    position: relative;
  }
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
