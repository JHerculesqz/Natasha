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
                              @onIconClick4View="_onIconClick4View">
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
        debug: true,
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
          label: "Lst1",
          key: "nodeName",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "Lst2",
          key: "LSRIDBefore",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "Lst3",
          key: "tergetLSRID",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "Lst4",
          key: "nodeType",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "创建时间",
          key: "createTime",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "执行时间",
          key: "executionTime",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "执行状态",
          key: "executionStatus",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "创建人",
          key: "userName",
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
        var oParams = oOption;
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          console.log(oOption)
        } else {
          HttpUtils.post("addNode", reqBody).then(res => {
            oRes = res.data.resultObj;
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
        var oParams = {
          skip: (this.currentPage - 1) * this.limit,
          rowsNum: this.limit,
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetObjLst(this.currentPage, this.limit).resultObj;
        } else {
          HttpUtils.post("getNodeLst", reqBody).then(res => {
            oRes = res.data.resultObj;
          });
        }

        oAfterCallback(oRes);
      },
      _setWfModelGrid: function (oRes) {
        this.row4objLst = oRes.arrRows;
        this.totalNum = oRes.totalNum;
        this.totalPage = oRes.totalPage
      },

      _getWfModelFinishedGrid: function (oAfterCallback) {
        var oRes = undefined;
        var oParams = {
          skip: (this.currentPageFinished - 1) * this.limitFinished,
          rowsNum: this.limitFinished,
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetObjLst(this.currentPageFinished, this.limitFinished).resultObj;
        } else {
          HttpUtils.post("getNodeLstFinished", reqBody).then(res => {
            oRes = res.data.resultObj;
          });
        }

        oAfterCallback(oRes);
      },
      _setWfModelFinishedGrid: function (oRes) {
        this.row4objLstFinished = oRes.arrRows;
        this.totalNumFinished = oRes.totalNum;
        this.totalPageFinished = oRes.totalPage
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
      _onIconClick4Delete: function (oRow, oNode) {
        var oParams = {
          nodeName: oNode.value
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          console.log("delete:");
          console.log(oNode.value);
        } else {
          HttpUtils.post("deleteNode", reqBody).then(res => {
            //todo update
          });
        }
      },
      _onIconClick4View: function (oRow, oNode) {
        var oParams = {
          nodeName: oNode.value
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          console.log(oNode.value);
          window.location.href = "http://localhost:8080/page1.html#/";
        } else {
          HttpUtils.post("checkDetails4Node", reqBody).then(res => {

          });
        }
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
