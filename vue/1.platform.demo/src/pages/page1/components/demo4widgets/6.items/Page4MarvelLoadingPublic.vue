<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelLoadingPublic</div>
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
              <button v-on:click="showLoading(`key1`)" class="loadingControlBtn">showLoading key1</button>
              <button v-on:click="showLoading(`key2`)" class="loadingControlBtn">showLoading key2</button>
              <button v-on:click="showLoading(`key3`)" class="loadingControlBtn">showLoading key3</button>
              <button v-on:click="hideLoading(`key1`)" class="loadingControlBtn">hideLoading key1</button>
              <button v-on:click="hideLoading(`key2`)" class="loadingControlBtn">hideLoading key2</button>
              <button v-on:click="hideLoading(`key3`)" class="loadingControlBtn">hideLoading key3</button>
              <marvel-loading-public ref="ref0" :showList="showList"></marvel-loading-public>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
             <div class="showArea">
              <button v-on:click="showLoading(`key1`)" class="loadingControlBtn">showLoading key1</button>
              <button v-on:click="showLoading(`key2`)" class="loadingControlBtn">showLoading key2</button>
              <button v-on:click="showLoading(`key3`)" class="loadingControlBtn">showLoading key3</button>
              <button v-on:click="hideLoading(`key1`)" class="loadingControlBtn">hideLoading key1</button>
              <button v-on:click="hideLoading(`key2`)" class="loadingControlBtn">hideLoading key2</button>
              <button v-on:click="hideLoading(`key3`)" class="loadingControlBtn">hideLoading key3</button>
              <marvel-loading-public ref="ref0" :showList="showList"></marvel-loading-public>
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
      <marvel-i-frame ref="page4MarvelLoadingPublicIFrame" id="page4MarvelLoadingPublicIFrame" src="static/jsdoc/module-MarvelLoadingPublic.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelLoadingPublic from "^/widget/loading/MarvelLoadingPublic";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelLoadingPublic',
    components: {
      MarvelLoadingPublic,
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
        showList:[],
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
        this.$refs.page4MarvelLoadingPublicIFrame.setIframe4DemoPage();
      },

      //#endregion

      showLoading: function (strKey) {
        if(this.getIndexInList(strKey) == -1){
          this.showList.push({
            key:strKey,
            strMsg:"public loading " + strKey
          })
        }
      },
      hideLoading: function (strKey) {
        var iIndexInList = this.getIndexInList(strKey);
        if(iIndexInList != -1){
          this.showList.splice(iIndexInList, 1);
        }
      },
      getIndexInList: function (strKey) {
        var iIndex = -1;
        for(var i = 0; i<this.showList.length; i++){
          if(this.showList[i].key == strKey){
            iIndex = i;
            break
          }
        }

        return iIndex;
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
    height: 250px;
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
