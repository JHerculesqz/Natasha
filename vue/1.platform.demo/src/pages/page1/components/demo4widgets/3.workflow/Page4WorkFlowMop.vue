<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">工作流向导MOP</div>
    <div class="describe">
      工作流向导MOP
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">工作流向导MOP</div>
    <div class="describe">
      工作流向导MOP
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="height: 100%;overflow:auto;">
            <!--2级DemoView start-->
            <div style="width:1800px; height: 100%;">
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
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelWorkFlowMop from "~~/widget/workflow/MarvelWorkFlowMop";

  export default {
    name: 'page4WorkFlowMop',
    components: {
      MarvelWorkFlowMop,
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
        title4MopLst: [{
          key: "business1",
          label: "业务列1",
          width: "200px",
          type: "text",
          visible: false,
        }],
        row4MopLst: [],
        arrLogs: [],
        logFilterOptions: [{
          id: "logFilterId4Notice",
          type: "checkbox",
          name: "通知"
        }, {
          id: "logFilterId4Warning",
          type: "checkbox",
          name: "警告"
        }, {
          id: "logFilterId4Error",
          type: "checkbox",
          name: "错误"
        }, {
          id: "logFilterId4Export",
          type: "button",
          name: "Export Output",
          icon: "icon-download2"
        },],
        customMopOptionIcons: [{
          title: "自定义按钮",
          value: "icon-cloud",
          color: "#3dcca6"
        }],
        customTabs: [{
          label: "Custom Tab",
          slotId: "customTabSlot"
        }],
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
        //获取mop数据
        this._getMopStepCont(function (oRes) {
          self._setMopStepCont(oRes);
        });

        //获取log数据
        this._getLogCont(function (oRes) {
          self._setLogCont(oRes);
        });
      },

      //#endregion

      _getMopStepCont: function (oAfterCallback) {
        var oRes = [{
          "id": "be0e27cb-b1e0-11e9-a6ea-000ec6c62bf6",
          "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6",
          "name": "STEP1.起床",
          "startTime": "2019-07-210 05:10:43",
          "endTime": "2019-07-210 05:11:05",
          "children": [{
            "id": "be0e27cb-b1e0-11e9-a6ea-000ec6c62bf6aaa",
            "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6aaa",
            "name": "STEP1.1 起床",
            "startTime": "2019-07-210 05:10:43",
            "endTime": "2019-07-210 05:11:05",
            "children": [{
              "id": "be0e27cb-b1e0-11e9-a6ea-000ec6c62bf6aaabbb",
              "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6aaabbb",
              "name": "STEP1.1.1 起床",
              "startTime": "2019-07-210 05:10:43",
              "endTime": "2019-07-210 05:11:05",
              "children": []
            }]
          }]
        }, {
          "id": "cb5f1f1e-b1e0-11e9-a6ea-000ec6c62bf6",
          "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6",
          "name": "STEP2.吃饭",
          "startTime": "2019-07-210 05:11:05",
          "endTime": "2019-07-210 05:21:34",
          "children": []
        }, {
          "id": "427cc8e1-b1e2-11e9-a6ea-000ec6c62bf6",
          "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6",
          "name": "STEP3.出发",
          "startTime": "2019-07-210 05:21:34",
          "endTime": "",
          "children": []
        }];
        oAfterCallback(oRes);
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
          if (arrRows[i].children.length > 0) {
            this._genRows(arrRows[i].children);
          }
        }
      },
      _getLogCont: function (oAfterCallback) {
        var oRes = {
          "count": 1,
          "lstWFLogVo4Chg": [{
            "id": "ab302dcd-82ac-42b3-a247-1bc44236bdb8",
            "insId": "04fbe84d-b1dc-11e9-af47-000ec6c62bf6",
            "taskId": "",
            "userId": "",
            "level": 1,
            "content": "【创建工作流】业务数据保存成功..",
            "createTime": "2019-07-29 08:36:54"
          }]
        };
        oAfterCallback(oRes);
      },
      _setLogCont: function (oRes) {
        var oResLogs = JSON.parse(JSON.stringify(oRes.lstWFLogVo4Chg));
        for (var i = 0; i < oResLogs.length; i++) {
          var oData = oResLogs[i];
          oData.logId = oData.taskId;
          if (oData.level == 0) {
            oData.status = "all";
          } else if (oData.level == 1) {
            oData.status = "notice";
          } else if (oData.level == 2) {
            oData.status = "warning";
          } else if (oData.level == 3) {
            oData.status = "error";
          }
        }
        this.arrLogs = JSON.parse(JSON.stringify(oResLogs))
      },

      _onFilterBtnClick: function (oCheckParams, oItem) {
        console.log(oItem);
        console.log(oCheckParams);
      },
      _onFilterCheckBoxChange: function (oCheckParams) {
        console.log(oCheckParams);
      },
      _onIconClickInMop: function (oRow, oCell) {
        console.log(oRow);
      },
      _onIconClickInMop4Custom: function (oRow, oCell) {
        console.log(oRow);
      },

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
    height: 400px;
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
