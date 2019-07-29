<template>
  <div class="componentWrapper">
    <marvel-work-flow-mop ref="RenovationMOPView"
                          :title4MopLst="title4MopLst"
                          :row4MopLst="row4MopLst"
                          :logs="arrLogs"
                          :logFilterOptions="logFilterOptions"
                          :customMopOptionIcons="customMopOptionIcons"
                          :customTabs="customTabs"
                          @onIconClickInMop4Skip="_onIconClickInMop"
                          @onIconClickInMop4Pause="_onIconClickInMop"
                          @onIconClickInMop4Custom="_onIconClickInMop4Custom"
                          @onFilterBtnClick="_onFilterBtnClick"
                          @onFilterCheckBoxChange="_onFilterCheckBoxChange">
      <div slot="customTabSlot">customTabSlot</div>
    </marvel-work-flow-mop>
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
        arrLogs:[],
        logFilterOptions:[{
          id:"logFilterId4Notice",
          type:"checkbox",
          name:"通知"
        },{
          id:"logFilterId4Warning",
          type:"checkbox",
          name:"警告"
        },{
          id:"logFilterId4Error",
          type:"checkbox",
          name:"错误"
        },{
          id:"logFilterId4Export",
          type:"button",
          name:"Export Output",
          icon:"icon-download2"
        },],
        //#endregion
        //#region mop
        mopId:undefined,
        customMopOptionIcons:[{
          title: "自定义按钮",
          value: "icon-cloud",
          color: "#3dcca6"
        }],
        customTabs:[{
          label:"Custom Tab",
          slotId:"customTabSlot"
        }],
        logLevels:0,//0：全部；1：通知；2：告警；3：错误
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

          //获取mop数据
          self._getMopStepCont(function (oRes) {
            self._setMopStepCont(oRes);
          });

          //获取log数据
          self._getLogCont(function (oRes) {
            self._setLogCont(oRes);
          });
        });
      },

      //#endregion

      //#region mop data

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
      _getMopStepCont: function (oAfterCallback) {
        var oRes = undefined;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            insId: this.mopId
          })
        };
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
      _setMopStepCont: function (oRes) {
        var oRows4MopLst = JSON.parse(JSON.stringify(oRes));
        this._genRows(oRows4MopLst);
        this.row4MopLst = oRows4MopLst;
      },

      _genRows: function (arrRows) {
        for (var i = 0; i < arrRows.length; i++) {
          //数据组装
          arrRows[i].business1 = "business1";
          if(arrRows[i].children.length > 0){
            this._genRows(arrRows[i].children);
          }
        }
      },

      //#endregion

      //#region mop action

      _onIconClickInMop: function (oRow, oCell) {
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
            //获取mop数据
            self._getMopStepCont(function (oRes) {
              self._setMopStepCont(oRes);
            });

            //获取log数据
            self._getLogCont(function (oRes) {
              self._setLogCont(oRes);
            });
          });
        }
      },
      _onIconClickInMop4Custom: function(oRow, oCell){
        console.log(oRow);
      },


      //#endregion

      //#region log data

      _getLogCont: function (oAfterCallback) {
        var oRes = undefined;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            insId: this.mopId,
            level: this.logLevels
          })
        };
        if (this.debug) {
          oRes = MockUtils.mock4GetLog().resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getLogList4MopWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setLogCont: function (oRes) {
        var oResLogs = JSON.parse(JSON.stringify(oRes.lstWFLogVo4Chg));
        for(var i= 0; i< oResLogs.length; i++){
          var oData = oResLogs[i];
          oData.logId = oData.taskId;
          if(oData.level == 0){
            oData.status = "all";
          }else if(oData.level == 1){
            oData.status = "notice";
          }else if(oData.level == 2){
            oData.status = "warning";
          }else if(oData.level == 3){
            oData.status = "error";
          }
        }
        this.arrLogs = JSON.parse(JSON.stringify(oResLogs))
      },

      //#endregion

      //#region log action

      _onFilterBtnClick: function (oCheckParams, oItem) {
        console.log(oItem);
        this.logLevels = this._genFilterParams(oCheckParams);
        console.log(this.logLevels);
        //to export
      },
      _onFilterCheckBoxChange: function (oCheckParams) {
        this.logLevels = this._genFilterParams(oCheckParams);
        console.log(this.logLevels);
        //to up date log
      },
      _genFilterParams: function (oCheckParams) {
        var arrLogLevels = [];
        for(var i = 0; i< oCheckParams.length;i++){
          var oCheck = oCheckParams[i];
          if(oCheck.bIsChecked){
            if(oCheck.oItem.name == "通知"){
              arrLogLevels.push(1);
            }else if(oCheck.oItem.name == "警告"){
              arrLogLevels.push(2);
            }else if(oCheck.oItem.name == "错误"){
              arrLogLevels.push(3);
            }
          }
        }
        if(arrLogLevels.length>0){
          return arrLogLevels;
        }else{
          return [0];
        }
      }

      //#endregion



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
