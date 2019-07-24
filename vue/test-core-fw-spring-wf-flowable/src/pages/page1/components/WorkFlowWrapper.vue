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
        if (this.debug) {
          oRes = MockUtils.mock4TestWfModel().resultObj;
        } else {
          HttpUtils.post("testWfModel", {}).then(res => {
            oRes = res.data.resultObj;
          });
        }

        oAfterCallback(oRes);
      },
      _setWfModel: function (oRes) {
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

  .workFlowContainer{
    width: 100%;
    height: 100%;
  }

</style>
