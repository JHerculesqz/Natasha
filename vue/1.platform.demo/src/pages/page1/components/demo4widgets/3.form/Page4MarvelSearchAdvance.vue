<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelSearchAdvance</div>
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
            <marvel-search-advance labelHand="高级搜索"
                                   :width=800
                                   :height=200
                                   position="right"
                                   :searchItems="searchItems4Advance"
                                   labelFoot="搜索"
                                   @onClickSearch="search"></marvel-search-advance>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            marvel-search-advance labelHand="高级搜索"
                                   :width=800
                                   :height=200
                                   position="right"
                                   :searchItems="searchItems4Advance"
                                   labelFoot="搜索"
                                   @onClickSearch="search"></marvel-search-advance>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelSearchAdvanceIFrame" id="page4MarvelSearchAdvanceIFrame" src="static/jsdoc/module-MarvelSearchAdvance.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelSearchAdvance from "~~/widget/search/MarvelSearchAdvance";

  export default {
    name: 'page4MarvelSearchAdvance',
    components: {
      MarvelSearchAdvance,
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
        searchItems4Advance:[{
          label:'分区',
          type:'input',
        },{
          label:'选项1',
          type:'dropdown',
          value:[{
            label:"选项1",
            active: true,
          },{
            label:"选项2",
            active: false,
          },{
            label:"选项3",
            active: false,
          }]
        },{
          label:'选项2',
          type:'dropdown',
          value:[{
            label:"选项1",
            active: false,
          },{
            label:"选项2",
            active: true,
          },{
            label:"选项3",
            active: false,
          }]
        }]
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
        this.$refs.page4MarvelSearchAdvanceIFrame.setIframe4DemoPage();
      },

      //#endregion
      
      search: function (searchObj, callback) {
        console.log(searchObj);
        callback(false);
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
