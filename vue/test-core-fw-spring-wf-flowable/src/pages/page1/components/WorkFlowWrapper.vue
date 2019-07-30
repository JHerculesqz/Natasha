<template>
  <div class="workFlowContainer">
    <marvel-work-flow ref="refWorkFlow" :stepItems="stepItems" :isClickable="true" @onWizardClick="onWizardClick"></marvel-work-flow>
  </div>
</template>

<script>
  import Vue from 'vue';
  import MarvelWorkFlow from '~~/widget/workflow/MarvelWorkFlow';
  import HttpUtils from "./0.common/httpUtil/httpUtils";
  import MockUtils from "./0.common/mock";
  import RenovationMOP from "./1.stepcomponents/RenovationMOP";
  import RenovationNEInfo from "./1.stepcomponents/RenovationNEInfo";
  import RenovationReport from "./1.stepcomponents/RenovationReport";
  import RenovationSetup from "./1.stepcomponents/RenovationSetup";

  /**
   * WorkFlowWrapper component description
   * @vuedoc
   * @exports WorkFlowWrapper
   */
  export default {
    name: 'WorkFlowWrapper',
    components: {
      MarvelWorkFlow,
      RenovationMOP,
      RenovationNEInfo,
      RenovationReport,
      RenovationSetup,
    },
    data() {
      return {
        //#region const
        debug: true,
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
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        var self = this;
        Vue.component(RenovationNEInfo.name, RenovationNEInfo);
        Vue.component(RenovationSetup.name, RenovationSetup);
        Vue.component(RenovationReport.name, RenovationReport);
        Vue.component(RenovationMOP.name, RenovationMOP);

        //get wf
        this._getWfModel(function (oRes) {
          self._setWfModel(oRes);
        });
      },

      //#endregion

      _getWfModel: function (oAfterCallback) {
        var oRes = undefined;
        var storage=window.localStorage;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            insId: storage["insId"]
          })
        };
        if (this.debug) {
          oRes = MockUtils.mock4TestWfModel().resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getIns4UIWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setWfModel: function (oRes) {
        var stepItemArr = [];
        var WfModelItems = JSON.parse(JSON.stringify(oRes.lstUIWFInsTaskVo));
        var defaultActiveStep = {};
        for (var i = 0; i < WfModelItems.length; i++) {
          var oItem = {
            id: WfModelItems[i].id,
            label: WfModelItems[i].name,
            index: i + 1,
            uiCompName: WfModelItems[i].uiComponentName
          };
          stepItemArr.push(oItem);

          if(oRes.curTaskId == WfModelItems[i].id){
            defaultActiveStep = oItem;
          }
        }

        this.stepItems = JSON.parse(JSON.stringify(stepItemArr));
        this.$nextTick(function () {
          this.$refs.refWorkFlow.setProgress(defaultActiveStep);
        });

        //get current step

      },
      onWizardClick: function (targetItem, sourceItem) {
        //if can switch
        console.log(sourceItem);
        console.log(targetItem);
        this.$refs.refWorkFlow.setProgress(targetItem);

        //updateWorkflow
        var oRes = undefined;
        var storage=window.localStorage;
        if(storage["finish"] == "false"){
          var reqBody = {
            reqBuVoStr: JSON.stringify({
              insId: storage["insId"],
              taskId: targetItem.id
            })
          };
          if (this.debug) {
            console.log(reqBody);
          } else {
            HttpUtils.post("updateCurTaskId4UIWF", reqBody).then(res => {
            });
          }
        }

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

  .workFlowContainer{
    width: 100%;
    height: 100%;
  }

</style>
