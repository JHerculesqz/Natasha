<template>
  <div class="componentWrapper">
    <marvel-work-flow-mop ref="RenovationMOPView"
                          :title4MopLst="title4MopLst"
                          :row4MopLst="row4MopLst"
                          :rowOriginData="rowOriginData"
                          :arrLogs="logInfo"></marvel-work-flow-mop>
  </div>
</template>

<script>
  import MarvelWorkFlowMop from "~~/widget/workflow/MarvelWorkFlowMop";
  import HttpUtils from "./../0.common/httpUtil/httpUtils";
  import MockUtils from "./../0.common/mock";
  /**
   * RenovationMOP component description
   * @vuedoc
   * @exports RenovationMOP
   */
  export default {
    name: 'RenovationMOP',
    components: {
      MarvelWorkFlowMop
    },
    data() {
      return {
        //#region const
        debug: true,
        modelKey:"MOPPTNLSRID",
        //#endregion
        //#region workFlow
        title4MopLst:[{
          key:"business1",
          label:"业务列1",
          width:"200px",
          type:"text",
          visible: false,
        }],
        row4MopLst:[],
        rowOriginData:undefined,
        logInfo:[{
          name:"Process Output",
          logInfo:"aaaaa",
        }],
        //#endregion
        //#region mop
        mopId:undefined
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

        this._creatMop(function (strId) {
          self.mopId = strId;
          self._getStepCont(function (oRes) {
            self._setStepCont(oRes);
          });
        });
      },

      //#endregion

      _creatMop: function(oAfterCallback){
        var storage=window.localStorage;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            insId: storage["insId"],
            modelKey: this.modelKey,
            mapParams: {
              a:1,
              b:2
            },
          })
        };
        if (this.debug) {
          console.log(reqBody);
          oAfterCallback("resId");
        } else {
          HttpUtils.post("createIns4MopWF", reqBody).then(res => {
            oAfterCallback(res.body.resultObj.id);
          });
        }
      },
      _getStepCont: function (oAfterCallback) {
        var oRes = undefined;
        var storage=window.localStorage;
        var oParams = {
          insId: storage["insId"],
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetComponentInfo("RenovationMOP").resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getHistoryTaskList4MopWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setStepCont: function (oRes) {
        var oTree=[];
        for(var i= 0; i< oRes.length; i++){
          var oData = oRes[i];
          var oTreeCell = {
            business1: "business1" + oData.id,
          };
          oTree.push(oTreeCell);
        }

        this.rowOriginData = oRes;
        this.row4MopLst = oTree;
      },

      _onIconClick: function (oRow, oCell) {
        var self = this;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            insId: this.mopId,
            mapParams: {
              a:1,
              b:2
            },
          })
        };
        if (this.debug) {
          this.logInfo = oRow;
        } else {
          HttpUtils.post("submitTask4MopWF", reqBody).then(res => {
            self._getStepCont(function (oRes) {
              self._setStepCont(oRes);
            });
          });
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

  .componentWrapper{
    width: 100%;
    height: 100%;
  }

</style>
