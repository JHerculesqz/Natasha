<template>
  <div class="objListPageWrapper">
    <marvel-work-flow-obj-lst ref="ObjLst"
                              :title4objLst="title4objLst"
                              :row4objLst="row4objLst"
                              :totalNum="totalNum"
                              :totalPage="totalPage"
                              :limit="limit"
                              :title4objLstFinished="title4objLst"
                              :row4objLstFinished="row4objLstFinished"
                              :totalNumFinished="totalNumFinished"
                              :totalPageFinished="totalPageFinished"
                              :limitFinished="limitFinished"
                              @onClickToCreate="_onClickToCreate"
                              @onClickToBatchCreate="_onClickToBatchCreate"
                              @onPageChange="_onPageChange"
                              @onPageChange4Finished="_onPageChange4Finished"
                              @onIconClick4Delete="_onIconClick4Delete"
                              @onIconClick4DeleteFinished="_onIconClick4DeleteFinished"
                              @onIconClick4View="_onIconClick4View"
                              @onIconClick4ViewFinished="_onIconClick4ViewFinished">
      <div slot="btnArea" class="slotBtnArea">
        <marvel-button v-show="tabItems[0].isActive" ref="objLstPageCreateBtn4" label="XXX"
                       classCustom="classCustom4Btn"
                       v-on:onClick="_onClickToXXX"></marvel-button>
        <marvel-button v-show="tabItems[0].isActive" ref="objLstPageCreateBtn3" label="分析"
                       classCustom="classCustom4Btn"
                       v-on:onClick="_onClickToAnalysis"></marvel-button>
      </div>
    </marvel-work-flow-obj-lst>
    <obj-lst-create-dialog ref="objLstCreateDialog" @onCreate="_onCreate"></obj-lst-create-dialog>
    <obj-lst-batch-create-dialog ref="objLstBatchCreateDialog"
                                 @onCreate="_onBatchCreate"></obj-lst-batch-create-dialog>
  </div>
</template>

<script>
  import MarvelButton from '~~/widget/button/MarvelButton';
  import MarvelTab from '~~/widget/tab/MarvelTab';
  import MarvelTabItem from '~~/widget/tab/MarvelTabItem';
  import MarvelGridEx from '~~/widget/grid/MarvelGridEx';
  import HttpUtils from "./0.common/httpUtil/httpUtils";
  import MockUtils from "./0.common/mock";
  import ObjLstCreateDialog from "./ObjLstCreateDialog";
  import ObjLstBatchCreateDialog from "./ObjLstCreateBatchDialog";
  import MarvelWorkFlowObjLst from "~~/widget/workFlow/MarvelWorkFlowObjLst";
  import Bus from "~~/core/bus";

  /**
   * ObjLstPage component description
   * @vuedoc
   * @exports ObjLstPage
   */
  export default {
    name: 'ObjLstPage',
    components: {
      MarvelWorkFlowObjLst,
      ObjLstBatchCreateDialog,
      ObjLstCreateDialog,
      MarvelButton,
      MarvelGridEx,
      MarvelTab,
      MarvelTabItem
    },
    data() {
      return {
        //#region const
        debug: false,
        //#endregion
        //#region tab
        tabItems: [{
          label: "执行中",
          isActive: true
        }, {
          label: "执行完毕",
          isActive: false
        }],
        //#endregion
        //#region grid
        title4objLst: [{
          label: "序号",
          key: "id",
          type: "text",
          visible: true,
          width: "8%"
        }, {
          label: "curTaskId",
          key: "curTaskId",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "起始时间",
          key: "startTime",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "结束时间",
          key: "endTime",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "是否已结束",
          key: "finish",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "创建人",
          key: "userId",
          type: "text",
          visible: true,
          width: "20%"
        }],
        row4objLst: [],
        totalNum: 0,
        totalPage: 1,
        limit: 26,
        currentPage: 1,

        row4objLstFinished: [],
        totalNumFinished: 0,
        totalPageFinished: 1,
        limitFinished: 26,
        currentPageFinished: 1
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

        //get wf
        this._getWfModelGrid(function (oRes) {
          self._setWfModelGrid(oRes);
        });

        this._getWfModelFinishedGrid(function (oRes) {
          self._setWfModelFinishedGrid(oRes);
        });
      },

      //#endregion

      //#region Button operate

      _onClickToCreate: function () {
        this.$refs.objLstCreateDialog.toShowDialog();
      },
      _onClickToBatchCreate: function () {
        this.$refs.objLstBatchCreateDialog.toShowDialog();
      },
      _onClickToAnalysis: function () {
        console.log("onclick Analysis")
      },
      _onClickToXXX: function () {
        console.log("onclick XXX")
      },
      _onCreate: function (oOption) {
        var self = this;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            wfModelKey:"NavToolsPTNLSRID",
            userId:"jj",
          })
        };
        if (this.debug) {
          console.log(oOption)
        } else {
          HttpUtils.post("createWFIns4UIWF", reqBody).then(res => {
            self._getWfModelGrid(function (oRes) {
              self._setWfModelGrid(oRes);
            });
          });
        }
      },
      _onBatchCreate: function (oOption) {
        //todo
      },

      //#endregion

      //#region grid data

      _getWfModelGrid: function (oAfterCallback) {
        var oRes = undefined;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            skip: (this.currentPage - 1) * this.limit,
            limit: this.limit,
          })
        };
        if (this.debug) {
          console.log(reqBody);
          oRes = MockUtils.mock4GetObjLst(this.currentPage, this.limit).body.resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getWFInsLst4UIWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setWfModelGrid: function (oRes) {
        var arrRows = [];
        for (var i = 0; i < oRes.length; i++) {
          let oRow = [];
          oRow.push({
            key: "id",
            value: oRes[i].id
          });
          oRow.push({
            key: "curTaskId",
            value: oRes[i].curTaskId
          });
          oRow.push({
            key: "startTime",
            value: oRes[i].startTime
          });
          oRow.push({
            key: "endTime",
            value: oRes[i].endTime
          });
          oRow.push({
            key: "finish",
            value: oRes[i].finish
          });
          oRow.push({
            key: "userId",
            value: oRes[i].userId
          });

          arrRows.push(oRow);
        }

        this.row4objLst = JSON.parse(JSON.stringify(arrRows));
        this.totalNum = 300;//todo
        this.totalPage = Math.ceil(this.totalNum / this.limit);
      },

      _getWfModelFinishedGrid: function (oAfterCallback) {
        var oRes = undefined;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            skip: (this.currentPageFinished - 1) * this.limitFinished,
            limit: this.limitFinished,
          })
        };
        if (this.debug) {
          console.log(reqBody);
          oRes = MockUtils.mock4GetObjLst(this.currentPageFinished, this.limitFinished).body.resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getHistoryWFInsLst4UIWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setWfModelFinishedGrid: function (oRes) {
        var arrRows = [];
        for (var i = 0; i < oRes.length; i++) {
          let oRow = [];
          oRow.push({
            key: "id",
            value: oRes[i].id
          });
          oRow.push({
            key: "curTaskId",
            value: oRes[i].curTaskId
          });
          oRow.push({
            key: "startTime",
            value: oRes[i].startTime
          });
          oRow.push({
            key: "endTime",
            value: oRes[i].endTime
          });
          oRow.push({
            key: "finish",
            value: oRes[i].finish
          });
          oRow.push({
            key: "userId",
            value: oRes[i].userId
          });

          arrRows.push(oRow);
        }

        this.row4objLstFinished = JSON.parse(JSON.stringify(arrRows));
        this.totalNumFinished = 300;//todo
        this.totalPageFinished = Math.ceil(this.totalNumFinished / this.limitFinished);
      },

      //#endregion

      //#region grid action

      _onPageChange: function (iPageIndex, perPageNum) {
        var self = this;
        this.currentPage = iPageIndex;
        //get wf
        this._getWfModelGrid(function (oRes) {
          self._setWfModelGrid(oRes);
        });
      },
      _onPageChange4Finished: function (iPageIndex, perPageNum) {
        var self = this;
        this.currentPageFinished = iPageIndex;
        //get wf
        this._getWfModelFinishedGrid(function (oRes) {
          self._setWfModelFinishedGrid(oRes);
        });
      },
      _onIconClick4Delete: function (oRow) {
        var self = this;
        var oOption = {
          showOkButton: true,
          showCancelBtn: true,
          confirmCont: "是否进行删除操作",
          confirmType: "warning",
          oAfterOk: function () {
            self._toDeleteObj(oRow);
          },
          oAfterCancel: function () {
          }
        };
        Bus.$emit('msg', 'show-confirm', oOption);
      },
      _toDeleteObj: function(oRow){
        var self = this;
        var wfInsId = this._getRowCellByKey(oRow, "id").value;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            wfInsId: wfInsId
          })
        };
        if (this.debug) {
          console.log("delete:");
          console.log(wfInsId);
        } else {
          HttpUtils.post("delWFIns4UIWF", reqBody).then(res => {
            self._getWfModelGrid(function (oRes) {
              self._setWfModelGrid(oRes);
            });
          });
        }
      },
      _onIconClick4DeleteFinished: function (oRow) {
        var self = this;
        var wfInsId = this._getRowCellByKey(oRow, "id").value;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            wfInsId: wfInsId
          })
        };
        if (this.debug) {
          console.log("delete:");
          console.log(wfInsId);
        } else {
          HttpUtils.post("delWFIns4UIWF", reqBody).then(res => {
            self._getWfModelFinishedGrid(function (oRes) {
              self._setWfModelFinishedGrid(oRes);
            });
          });
        }
      },
      _onIconClick4View: function (oRow) {
        var storage=window.localStorage;
        storage.setItem("wfInsId",this._getRowCellByKey(oRow, "id").value);
        storage.setItem("finish",this._getRowCellByKey(oRow, "finish").value);
        window.location.href = "http://localhost:8080/page1.html#/";
      },
      _onIconClick4ViewFinished: function (oRow) {
        var storage=window.localStorage;
        storage.setItem("wfInsId",this._getRowCellByKey(oRow, "id").value);
        storage.setItem("finish",this._getRowCellByKey(oRow, "finish").value);
        window.location.href = "http://localhost:8080/page1.html#/";
      },
      _getRowCellByKey: function (oRow, strKey) {
        var targetCell = undefined;
        for(var i = 0; i< oRow.length; i++){
          var oCell = oRow[i];
          if(strKey == oCell.key){
            targetCell = oCell;
            break;
          }else{
            continue;
          }
        }
        return targetCell;
      },

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

  .objListPageWrapper {
    width: 100%;
    height: 100%;
  }

  .classCustom4Btn {
    float: right;
    margin-left: 20px;
  }

</style>
