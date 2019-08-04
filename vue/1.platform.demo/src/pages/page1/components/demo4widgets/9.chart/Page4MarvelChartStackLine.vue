<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelChartStackLine</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px; height: 350px">
              <marvel-chart-stack-line ref="ref5" id="id5" theme="dark"></marvel-chart-stack-line>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelChartStackLine.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelChartStackLine from "^/widget/echart/MarvelChartStackLine";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelChartStackLine',
    components: {
      MarvelChartStackLine,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
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
        //#region custom data
        stackLineData: {
          y1Title: "机床状态用时(小时)",
          y2Title: "机床在线率(%)",
          category: ["加工", "待机", "离线", "机床在线率"],
          data: [{
            label: "2017-7-1",
            value: [12, 3, 9, 50]
          }, {
            label: "2017-7-2",
            value: [8, 4, 12, 33]
          }, {
            label: "2017-7-3",
            value: [6, 10, 8, 25]
          }, {
            label: "2017-7-4",
            value: [4, 10, 10, 17]
          }, {
            label: "2017-7-5",
            value: [18, 3, 3, 75]
          }, {
            label: "2017-7-6",
            value: [20, 3, 1, 83]
          }, {
            label: "2017-7-7",
            value: [16, 3, 5, 66]
          }, {
            label: "2017-7-8",
            value: [12, 6, 6, 50]
          }]
        },
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
        this.$refs.IFrame.setIframe4DemoPage();

        this.$refs.ref5.setData(this.stackLineData);
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

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
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
