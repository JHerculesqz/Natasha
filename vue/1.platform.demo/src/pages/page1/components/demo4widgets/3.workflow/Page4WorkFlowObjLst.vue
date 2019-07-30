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
    methods:{
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        var self = this;

        //get wf
        this._getWfModelGrid(function (oRes) {
          self._setWfModelGrid(oRes);
        });
      },

      //#endregion

      //#region grid

      _getWfModelGrid: function (oAfterCallback) {
        var oRes = {
          "count": 4,
          "lstUIWFInsVo": [{
            "id": "7c71a4e5-6b1f-49ff-adb2-a43930f95405",
            "curTaskId": "c6cb52f6-0acd-439b-ab4c-5c8cbcc48243",
            "lstUIWFInsTaskVo": [{
              "id": "c6cb52f6-0acd-439b-ab4c-5c8cbcc48243",
              "name": "Step1",
              "uiComponentName": "RenovationNEInfo"
            }, {
              "id": "aa18bb85-134a-4ea5-b837-0fa6ed0696cf",
              "name": "Step2",
              "uiComponentName": "RenovationSetup"
            }, {
              "id": "51759d71-035e-4386-a4b8-b139903653af",
              "name": "Step3",
              "uiComponentName": "RenovationReport"
            }, {"id": "3dcbaaf5-5bf3-44a0-a6f4-cf5d65c89805", "name": "Step4", "uiComponentName": "RenovationMOP"}],
            "startTime": "2019-07-27 10:30:38",
            "endTime": null,
            "userId": "jdl",
            "finish": false
          }, {
            "id": "a0362706-ab66-4185-8b9d-4fb73c3750bb",
            "curTaskId": "5ae98821-354a-4752-9a3b-52059036acd1",
            "lstUIWFInsTaskVo": [{
              "id": "5ae98821-354a-4752-9a3b-52059036acd1",
              "name": "Step1",
              "uiComponentName": "RenovationNEInfo"
            }, {
              "id": "b18e94e5-9346-40b9-b251-135c06686290",
              "name": "Step2",
              "uiComponentName": "RenovationSetup"
            }, {
              "id": "44d1397a-8b86-4f7e-9d6f-2003a1f8feac",
              "name": "Step3",
              "uiComponentName": "RenovationReport"
            }, {"id": "cd77a173-3368-4494-94ec-f5b76e8fcded", "name": "Step4", "uiComponentName": "RenovationMOP"}],
            "startTime": "2019-07-27 10:30:39",
            "endTime": null,
            "userId": "jdl",
            "finish": false
          }, {
            "id": "9c29ceda-5316-45e3-a07e-3437f1083042",
            "curTaskId": "833fbd7f-921f-41fb-93aa-2d2d2ed6cc4d",
            "lstUIWFInsTaskVo": [{
              "id": "833fbd7f-921f-41fb-93aa-2d2d2ed6cc4d",
              "name": "Step1",
              "uiComponentName": "RenovationNEInfo"
            }, {
              "id": "28538fa3-c485-4e9a-a1c8-c8861ba1eee4",
              "name": "Step2",
              "uiComponentName": "RenovationSetup"
            }, {
              "id": "8402da15-6265-48e4-a160-ba384e2d344c",
              "name": "Step3",
              "uiComponentName": "RenovationReport"
            }, {"id": "906d4556-845f-43d8-a1fc-43c069f44c68", "name": "Step4", "uiComponentName": "RenovationMOP"}],
            "startTime": "2019-07-27 10:30:40",
            "endTime": null,
            "userId": "jdl",
            "finish": false
          }, {
            "id": "c5785c22-b888-49be-a008-e9906994f522",
            "curTaskId": "b337f52f-65a3-40e3-8ba6-5d5e78e8397a",
            "lstUIWFInsTaskVo": [{
              "id": "b337f52f-65a3-40e3-8ba6-5d5e78e8397a",
              "name": "Step1",
              "uiComponentName": "RenovationNEInfo"
            }, {
              "id": "ad95b397-9e3f-4197-80ec-ad0c049fdf98",
              "name": "Step2",
              "uiComponentName": "RenovationSetup"
            }, {
              "id": "f9c245aa-fbe8-432d-9abf-206dd4486e2a",
              "name": "Step3",
              "uiComponentName": "RenovationReport"
            }, {"id": "5caa97c7-1440-4ae1-94f5-6666a9834d04", "name": "Step4", "uiComponentName": "RenovationMOP"}],
            "startTime": "2019-07-27 10:30:41",
            "endTime": null,
            "userId": "jdl",
            "finish": false
          }]
        };

        oAfterCallback(oRes);
      },
      _setWfModelGrid: function (oData) {
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
      _onCustomIconClick: function () {
        console.log("onclick custom btn")
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
