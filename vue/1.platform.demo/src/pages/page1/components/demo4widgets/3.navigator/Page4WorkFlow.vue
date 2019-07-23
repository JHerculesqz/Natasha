<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">工作流向导</div>
    <div class="describe">
      工作流向导
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">工作流向导</div>
    <div class="describe">
      工作流向导
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="height: 100%;">
            <!--2级DemoView start-->
            <div style="width:100%; height: 100%;">
              <marvel-work-flow ref="refWorkFlow" :stepItems="stepItems" :isClickable="true" @onWizardClick="onWizardClick"></marvel-work-flow>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->

            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import MarvelWorkFlow from "~~/widget/workflow/MarvelWorkFlow";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import RenovationMOP from "./stepcomponents/RenovationMOP";
  import RenovationNEInfo from "./stepcomponents/RenovationNEInfo";
  import RenovationReport from "./stepcomponents/RenovationReport";
  import RenovationSetup from "./stepcomponents/RenovationSetup";

  export default {
    name: 'page4Crumb',
    components: {
      MarvelWorkFlow,
      MarvelTab,
      MarvelTabItem,
      RenovationMOP,
      RenovationNEInfo,
      RenovationReport,
      RenovationSetup,
    },
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
        //#region workFlow
        stepItems: [],
        currentStep: {
          label: "",
          index: 0,
          uiCompName: ""
        },
        //#endregion
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods:{
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        Vue.component(RenovationNEInfo.name, RenovationNEInfo);
        Vue.component(RenovationSetup.name, RenovationSetup);
        Vue.component(RenovationReport.name, RenovationReport);
        Vue.component(RenovationMOP.name, RenovationMOP);

        //set wf
        this._setWfModel();
      },

      //#endregion
      _setWfModel: function () {
        var oRes = {
          "wfModelVo4Chgs": [
            {
              "id": "NavToolsPTNLSRID:1:33a985bc-ac36-11e9-a9ad-aeb6d0d021b1",
              "key": "NavToolsPTNLSRID",
              "name": "1_导航类_PTNLSRID修改",
              "desc": null
            }
          ],
          "testWfModelOutItemVos": [
            {
              "modelKey": "NavToolsPTNLSRID",
              "wfModelStepVo4Chgs": [
                {
                  "id": "sid-FB5E2195-AA44-4CB7-B68B-DCE29124D0C7",
                  "name": "待改造网元信息",
                  "uiCompName": "RenovationNEInfo",
                  "lstWFModelStepVo4Chg": []
                },
                {
                  "id": "sid-C5D2B786-78D8-46F1-8C20-3856A018515C",
                  "name": "改造前准备",
                  "uiCompName": "RenovationSetup",
                  "lstWFModelStepVo4Chg": []
                },
                {
                  "id": "sid-7EDF9213-9B25-466D-BA04-BBFBDD64F316",
                  "name": "改造分析报告",
                  "uiCompName": "RenovationReport",
                  "lstWFModelStepVo4Chg": []
                },
                {
                  "id": "sid-6BD47116-F9F2-4163-A60A-63F7B9A36BAB",
                  "name": "MOP清单",
                  "uiCompName": "RenovationMOP",
                  "lstWFModelStepVo4Chg": []
                }
              ]
            }
          ]
        };
        var stepItemArr = [];
        var WfModelItems = JSON.parse(JSON.stringify(oRes.testWfModelOutItemVos[0].wfModelStepVo4Chgs));
        for (var i = 0; i < WfModelItems.length; i++) {
          stepItemArr.push({
            label: WfModelItems[i].name,
            index: i + 1,
            uiCompName: WfModelItems[i].uiCompName
          });
        }

        this.stepItems = JSON.parse(JSON.stringify(stepItemArr));
      },
      onWizardClick: function (oItem) {
        console.log("workFlow click")
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
  .codeArea pre, .codeArea code {
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner {
    padding-top: 36px;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
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
