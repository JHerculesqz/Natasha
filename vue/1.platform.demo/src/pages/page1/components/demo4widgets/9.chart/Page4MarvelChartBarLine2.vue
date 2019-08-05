<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelChartBarLine2</div>
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
            <div style="width: 1200px; height: 350px">
              <marvel-chart-bar-line2 ref="ref4FirstHistogram"
                                     id="isFirstHistogram"
                                     v-on:onItemClick="onItemClick"></marvel-chart-bar-line2>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width: 1200px; height: 350px">
              <marvel-chart-bar-line2 ref="ref4FirstHistogram"
                                     id="isFirstHistogram"
                                     v-on:onItemClick="onItemClick"></marvel-chart-bar-line2>
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
      <marvel-i-frame ref="page4MarvelChartBarLine2IFrame" id="page4MarvelChartBarLine2IFrame" src="static/jsdoc/module-MarvelChartBarLine2.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelChartBarLine2 from "~~/widget/echart/MarvelChartBarLine2";

  export default {
    name: 'page4MarvelChartBarLine2',
    components: {
      MarvelChartBarLine2,
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
        this.$refs.page4MarvelChartBarLine2IFrame.setIframe4DemoPage();

        var oData = {
          colors: ['#66d3bb', '#0CAEFF'],
          yAxis: [{
            title: "业务量",
            isShow: true,
          }],
          canSelect:false,
          customerTip:true,
          tip:"aaa",
          isSlide:true,
          sliderConfig:{
            sliderConfig:35,
            end:35,
            bottom:0
          },
          xAxisName:"业务速率",
          category:["aaa", "bbb", "ccc"],
          xAxisValue:["x1x1x1x1", "x2x2x2x2x2", "x3x3x3x3x3"],
          axisLabel:{
            interval:0,
            formatter: function (value) {
              //横坐标文字拼接处理
              return value
            }
          },
          series:[{
            name:"aaa",
            type:"bar",
            stack: "firstHistogram",
            barWidth:20,
            data:[10,20,30]
          },{
            name:"bbb",
            type:"bar",
            stack: "firstHistogram",
            barWidth:20,
            data:[20,30,40]
          },{
            name:"ccc",
            type:"bar",
            stack: "firstHistogram",
            barWidth:20,
            data:[30,40,50]
          }]
        };
        this.$refs.ref4FirstHistogram.setData(oData);
      },

      //#endregion

      onItemClick: function (params) {
        console.log(params);
      }

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
    height: 450px;
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
