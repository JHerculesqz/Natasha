<template>
  <div class="workFlowWrapper">
    <div class="topStepArea">
      <marvel-wizard ref="refWorkFlowWizard" :items="stepItemsInner" :isClickable="isClickable" @onWizardClick="onWizardClick"></marvel-wizard>
    </div>
    <div class="bottomContArea">
      <component v-bind:is="currentStep.uiCompName"></component>
    </div>
  </div>
</template>

<script>
  import MarvelWizard from "../wizard/MarvelWizard";
  /**
   *  MarvelWorkFlow widget description
   *  @vuedoc
   *  @exports MarvelWorkFlow
   */
  export default {
    name: 'MarvelWorkFlow',
    components: {MarvelWizard},
    props: {
      stepItems:{
        type: Array,
        default:undefined,
        required: true,
      },
      isClickable:{
        type: Boolean,
        default:true,
        required: false,
      }
    },
    data: function () {
      return {
        //#region wizard
        stepItemsInner: [],
        currentStep: {
          label: "",
          index: 0,
          uiCompName: ""
        },
        //#endregion
      }
    },
    methods: {
      //#region inner

      onWizardClick: function (oItem) {
        this.currentStep = {
          label: oItem.label,
          index: oItem.index,
          uiCompName: oItem.uiCompName
        };

        this.callback4OnWizardClick();
      },

      //#endregion
      //#region callback

      callback4OnWizardClick: function (oItem) {
        this.$emit("onWizardClick", oItem);
      },

      //#endregion
      //#region 3rd

      setProgress: function (oItem) {
        var oTargetItem = oItem;
        if(oTargetItem){
          this.$refs.refWorkFlowWizard.setProgress(oItem.index);
          this.currentStep = {
            label: oTargetItem.label,
            index: oTargetItem.index,
            uiCompName: oTargetItem.uiCompName
          };
        }
      },

      //#endregion
    },
    watch: {
      stepItems: {
        handler: function () {
          if (this.stepItems.length > 0) {
            this.stepItemsInner = JSON.parse(JSON.stringify(this.stepItems));
            this.$nextTick(function () {
              this.setProgress(this.stepItems[0]);
            });
          } else {
            this.currentStep = {
              label: "",
              index: 0,
              uiCompName: ""
            }
          }
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
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
    background-color: #aaa;
  }

  /*endregion*/
  .workFlowWrapper{
    width: 100%;
    height: 100%;
  }

  .topStepArea{
    height: 80px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .bottomContArea{
    height: calc(100% - 80px);
    background-color: #f6f6f6;
    overflow: auto;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
