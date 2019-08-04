<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelChartScatter2</div>
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
            <div style="width: 850px; height: 350px;">
              <marvel-chart-scatter2 ref="ref4" id="id4" theme="dark"
                                     v-on:onScatterItemClick="onScatterItemClick"></marvel-chart-scatter2>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width: 850px; height: 350px;">
              <marvel-chart-scatter2 ref="ref4" id="id4" theme="dark"
                                     v-on:onScatterItemClick="onScatterItemClick"></marvel-chart-scatter2>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelChartScatter2.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelChartScatter2 from "^/widget/echart/MarvelChartScatter2";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelChartScatter2',
    components: {
      MarvelChartScatter2,
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
        scatterData2: {
          title: "机床利用率",
          name: "usage",
          subtxt: "",
          sublink: "",
          geoType: "world",
          geoZoom: 0.9,
          topN: 5,
          topNEx: 10,
          data: [{
            name: "机床1",
            value: [121.15, 31.89, 100]
          }, {
            name: "机床2",
            value: [120.38, 37.35, 50]
          }, {
            name: "机床3",
            value: [122.207216, 29.985295, 20]
          }, {
            name: "机床4",
            value: [123.97, 47.33, 10]
          }, {
            name: "机床5",
            value: [120.33, 36.07, 1]
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

        this.$refs.ref4.setData(this.scatterData2);
      },

      //#endregion

      onScatterItemClick: function (oItem) {
        console.log(oItem);
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
