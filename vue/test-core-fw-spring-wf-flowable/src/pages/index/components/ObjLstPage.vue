<template>
  <div class="objListPageWrapper">
    <marvel-work-flow-obj-lst ref="ObjLst"
                              :title4objLst="title4objLst"
                              :row4objLst="row4objLst"
                              :rowOriginData="rowOriginData"
                              :totalNum="totalNum"
                              :totalPage="totalPage"
                              :limit="limit"
                              @onClickToCreate="_onClickToCreate"
                              @onClickToBatchCreate="_onClickToBatchCreate"
                              @onPageChange="_onPageChange"
                              @onIconClick4Delete="_onIconClick4Delete"
                              @onIconClick4View="_onIconClick4View"
                              @onCustomIconClick="_onCustomIconClick">
      <div slot="btnArea" class="slotBtnArea">
        <marvel-button ref="objLstPageCreateBtn4" label="自定义按钮2"
                       classCustom="classCustom4Btn"
                       v-on:onClick="_onClickToXXX"></marvel-button>
        <marvel-button ref="objLstPageCreateBtn3" label="自定义按钮1"
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
    },
    data() {
      return {
        //#region const
        debug: true,
        //#endregion
        //#region grid
        title4objLst: [{
          label: "业务列1",
          key: "business1",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "业务列2",
          key: "business2",
          type: "text",
          visible: true,
          width: "20%"
        }, {
          label: "业务列N",
          key: "businessN",
          type: "text",
          visible: true,
          width: "20%"
        }],
        row4objLst: [],
        rowOriginData: {},
        totalNum: 0,
        totalPage: 1,
        limit: 26,
        currentPage: 1,
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

        //get insLst
        this._getInsModelGrid(function (oRes) {
          self._setInsModelGrid(oRes);
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
            modelKey: "NavToolsPTNLSRID",
            userId: "jj",
          })
        };
        if (this.debug) {
          console.log(oOption)
        } else {
          HttpUtils.post("createIns4UIWF", reqBody).then(res => {
            self._getInsModelGrid(function (oRes) {
              self._setInsModelGrid(oRes);
            });
          });
        }
      },
      _onBatchCreate: function (oOption) {
        //业务侧自行实现
      },

      //#endregion

      //#region grid data

      _getInsModelGrid: function (oAfterCallback) {
        var oRes = undefined;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            skip: (this.currentPage - 1) * this.limit,
            limit: this.limit,
          })
        };
        if (this.debug) {
          console.log(reqBody);
          oRes = MockUtils.mock4GetObjLst(this.currentPage, this.limit).resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getInsLst4UIWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setInsModelGrid: function (oData) {
        var oRes = oData.lstUIWFInsVo;
        var arrRows = [];
        for (var i = 0; i < oRes.length; i++) {
          let oRow = [];

          //#region 业务侧列数据
          oRow.push({
            key: "business1",
            value: '1' + i
          });
          oRow.push({
            key: "business2",
            value: '2' + i
          });
          oRow.push({
            key: "businessN",
            value: 'N' + i
          });
          //endregion

          //#region 自定义添加 操作按钮
          oRow.push({
            key: "operation",
            value: [{
              value: "icon-marvelIcon_2-13",
              color: "#3dcca6",
              title: "自定义操作1"
            }, {
              value: "icon-marvelIcon_2-14",
              color: "#3dcca6",
              title: "自定义操作2"
            }],
          });
          //#endrregion

          arrRows.push(oRow);
        }
        this.rowOriginData = oData;
        this.row4objLst = JSON.parse(JSON.stringify(arrRows));
        this.totalNum = oData.count;
        this.totalPage = Math.ceil(this.totalNum / this.limit);
      },

      //#endregion

      //#region grid action

      _onPageChange: function (iPageIndex, perPageNum) {
        var self = this;
        this.currentPage = iPageIndex;
        //get insLst
        this._getInsModelGrid(function (oRes) {
          self._setInsModelGrid(oRes);
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
      _toDeleteObj: function (oRow) {
        var self = this;
        var strInsId = this._getRowCellByKey(oRow, "id").value;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            insId: strInsId
          })
        };
        if (this.debug) {
          console.log("delete:");
          console.log(strInsId);
        } else {
          HttpUtils.post("delIns4UIWF", reqBody).then(res => {
            self._getInsModelGrid(function (oRes) {
              self._setInsModelGrid(oRes);
            });
          });
        }
      },
      _onIconClick4View: function (oRow) {
        var storage = window.localStorage;
        storage.setItem("insId", this._getRowCellByKey(oRow, "id").value);
        window.location.href = "http://localhost:8080/page1.html#/";
      },
      _onCustomIconClick: function (oRow, oIcon) {
        //自定义操作图标点击
        console.log(oIcon);
      },
      _getRowCellByKey: function (oRow, strKey) {
        var targetCell = undefined;
        for (var i = 0; i < oRow.length; i++) {
          var oCell = oRow[i];
          if (strKey == oCell.key) {
            targetCell = oCell;
            break;
          } else {
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
    background-color: #3dcca6 !important;
  }

</style>
