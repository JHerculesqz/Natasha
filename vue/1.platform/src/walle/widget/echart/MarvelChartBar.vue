<template>
  <div class="chart" v-bind:id="id"
       v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/dataZoom');

  /**
   *  MarvelChartBar widget description
   *  @vuedoc
   *  @exports MarvelChartBar
   */
  export default {
    name: 'MarvelChartBar',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      theme: {
        type: String,
        default: "",
        required: false,
      },
      width: {
        type: Number,
        default: undefined,
        required: false,
      },
      height: {
        type: Number,
        default: undefined,
        required: false,
      }
    },
    data: function () {
      return {
        chartObj: undefined,
        chartData: undefined
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy: function () {
      //#region destroy

      this._destroy();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        var self = this;

        this.chartObj = echarts.init(document.getElementById(this.id), this.theme);
        this.chartObj.on("click", function (params) {
          if (params.componentType == "series" &&
            params.componentSubType == "bar") {

            var oBuObj = undefined;
            if (self.chartData.lstBuObj != undefined) {
              if (params.dataIndex <= self.chartData.lstBuObj.length - 1) {
                oBuObj = self.chartData.lstBuObj[params.dataIndex];
              }
            }

            self.callback4OnBarItemClick(params, oBuObj);
          }
        });
      },
      _destroy: function () {
        this.chartObj.clear();
      },

      //#endregion

      //#endregion
      //#region callback

      callback4OnBarItemClick: function (params, oBuObj) {
        this.$emit("onBarItemClick", params, oBuObj);
      },

      //#endregion
      //#region 3rd

      setData: function (oData) {
        this.chartData = oData;
        var option = {
          title: {
            text: oData.title
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}"
          },
          dataZoom: [{
            type: 'slider',
            start: 0,
            end: 100
          }],
          xAxis: {
            type: 'category',
            data: oData.xData,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: oData.yData,
            type: 'bar'
          }]
        };
        this.chartObj.setOption(option, true);
      }

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
