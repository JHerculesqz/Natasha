<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">日志控件</div>
    <div class="describe">
      日志控件
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">日志控件</div>
    <div class="describe">
      日志控件
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="height: 100%;">
            <!--2级DemoView start-->
            <div style="height: 100%; background-color: #f0f0f0;">
              <marvel-log-view ref="logRef"
                               :logItems="logs"
                               :filterOptions="logFilterOptions"
                               @onBtnClick="_callback4OnFilterBtnClick"
                               @onCheckBoxChange="_callback4OnFilterCheckBoxChange"></marvel-log-view>
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
  import MarvelLogView from "~~/widget/log/MarvelLogView";

  export default {
    name: 'page4LogView',
    components: {
      MarvelLogView,
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
        logs:[{
          content:"【创建工作流】业务数据保存成功..",
          createTime:"2019-07-29 08:36:54",
          id:"ab302dcd-82ac-42b3-a247-1bc44236bdb8",
          insId:"04fbe84d-b1dc-11e9-af47-000ec6c62bf6",
          level:1,
          logId:"sdadasd",
          status:"notice",
          taskId:"sdadasd",
          userId:"asdasdasdaa",
        }],
        logFilterOptions:[{
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

      },

      //#endregion
      _callback4OnFilterBtnClick: function (oCheckParams, oItem) {
        console.log(oCheckParams);
        console.log(oItem);
      },
      _callback4OnFilterCheckBoxChange: function (oCheckParams) {
        console.log(oCheckParams);
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
