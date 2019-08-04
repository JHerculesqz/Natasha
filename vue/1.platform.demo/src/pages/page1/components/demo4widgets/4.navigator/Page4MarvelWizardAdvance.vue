<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelWizardAdvance</div>
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
            <div style="height: 40px; width: 630px; background-color: rgba(65, 71, 90, 1)">
              <marvel-wizard-advance :wizardsItems="wizardsItems" @onClickSubMenu = "onClickSubMenu"></marvel-wizard-advance>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="height: 40px; width: 630px; background-color: rgba(65, 71, 90, 1)">
              <marvel-wizard-advance :wizardsItems="wizardsItems" @onClickSubMenu = "onClickSubMenu"></marvel-wizard-advance>
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
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelWizardAdvance.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelWizardAdvance from "~~/widget/wizard/MarvelWizardAdvance";

  export default {
    name: 'page4MarvelWizardAdvance',
    components: {
      MarvelWizardAdvance,
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
        wizardsItems:[{
          label:"Step1",
          isActive:true,
          isFinish: false,
          isShowSubItem: false,
          isShowSubIcon: false,
          subItems:[{
            label:'abc',
          }],
          id:"123"
        },{
          label:"Step2",
          isActive:true,
          isFinish: true,
          id:"234"
        },{
          label:"Step3",
          isActive:false,
          isFinish: false,
          isShowSubItem: false,
          isShowSubIcon: true,
          subItems:[{
            label:'abc',
          },{
            label:'abcabcabcabc',
          }],
          id:"345"
        },{
          label:"Step4",
          isActive:false,
          isFinish: false,
          isShowSubItem: false,
          id:"567"
        },{
          label:"Step5",
          isActive:false,
          isFinish: false,
          isShowSubItem: false,
          id:"578"
        },{
          label:"Step6",
          isActive:false,
          isFinish: false,
          isShowSubItem: false,
          id:"789"
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
        this.$refs.IFrame.setIframe4DemoPage();
      },

      //#endregion
      
      onClickSubMenu: function (oWizardItem, strLabel) {
        console.log(oWizardItem);
        console.log(strLabel);
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
