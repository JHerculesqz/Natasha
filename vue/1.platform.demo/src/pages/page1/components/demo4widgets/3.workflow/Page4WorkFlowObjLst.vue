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
                <marvel-button ref="objLstPageCreateBtn4" label="XXX"
                               classCustom="classCustom4Btn"
                               v-on:onClick="_onClickToXXX"></marvel-button>
                <marvel-button ref="objLstPageCreateBtn3" label="分析"
                               classCustom="classCustom4Btn"
                               v-on:onClick="_onClickToAnalysis"></marvel-button>
              </div>
            </marvel-work-flow-obj-lst>
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
  import MarvelButton from '~~/widget/button/MarvelButton';
  import MarvelWorkFlowObjLst from "~~/widget/workFlow/MarvelWorkFlowObjLst";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";

  export default {
    name: 'page4WorkFlowUI',
    components: {
      MarvelButton,
      MarvelWorkFlowObjLst,
      MarvelTab,
      MarvelTabItem,
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
    methods:{
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

      //#region grid

      _getWfModelGrid: function (oAfterCallback) {
        var oRes = this.mock4GetObjLst(this.currentPage, this.limit).resultObj;

        oAfterCallback(oRes);
      },
      _setWfModelGrid: function (oRes) {
        this.row4objLst = oRes.arrRows;
        this.totalNum = oRes.totalNum;
        this.totalPage = oRes.totalPage
      },

      _getWfModelFinishedGrid: function (oAfterCallback) {
        var oRes = this.mock4GetObjLst(this.currentPageFinished, this.limitFinished).resultObj;

        oAfterCallback(oRes);
      },
      _setWfModelFinishedGrid: function (oRes) {
        this.row4objLstFinished = oRes.arrRows;
        this.totalNumFinished = oRes.totalNum;
        this.totalPageFinished = oRes.totalPage
      },
      mock4GetObjLst: function (iCurentPage, iLimit) {
        var oRes = {
          "resultObj": {
            arrRows: [],
            totalNum: 1000,
            totalPage: 20,
          },
          "errorObj": null,
          "ok": true
        };

        for (var i = iCurentPage; i < iCurentPage + iLimit; i++) {
          let oRow = [];
          oRow.push({
            key:"id",
            value:i
          });
          oRow.push({
            key:"nodeName",
            value:"nodeName" + i
          });
          oRow.push({
            key:"LSRIDBefore",
            value:"LSRIDBefore" + i
          });
          oRow.push({
            key:"tergetLSRID",
            value:"tergetLSRID" + i
          });
          oRow.push({
            key:"nodeType",
            value:"nodeType" + i
          });
          oRow.push({
            key:"createTime",
            value:"createTime" + i
          });
          oRow.push({
            key:"executionTime",
            value:"executionTime" + i
          });
          oRow.push({
            key:"executionStatus",
            value:"executionStatus" + i
          });
          oRow.push({
            key:"userName",
            value:"userName" + i
          });

          oRes.resultObj.arrRows.push(oRow);
        }

        return oRes;
      },

      //#endregion

      //#region action

      _onClickToCreate: function () {
        console.log("to create");
      },
      _onClickToBatchCreate: function () {
        console.log("to batch create");
      },
      _onClickToAnalysis: function () {
        console.log("onclick Analysis")
      },
      _onClickToXXX: function () {
        console.log("onclick XXX")
      },
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
      _onIconClick4Delete: function () {
        console.log("onclick Delete")
      },
      _onIconClick4View: function () {
        console.log("onclick View")
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
    height: 800px;
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
