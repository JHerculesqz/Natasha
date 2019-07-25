<template>
  <div class="chart" v-bind:id="id" v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartLine2 widget description
   *  @vuedoc
   *  @exports MarvelChartLine2
   */
  export default {
    name: 'MarvelChartLine2',
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
        this.chartObj = echarts.init(document.getElementById(this.id), this.theme);
      },
      _destroy: function () {
        this.chartObj.clear();
      },

      //#endregion

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setData: function (oData) {
        this.chartData = oData;
        var option = {
          title: {
            text: this.chartData.title
          },
          tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            show: false,
            type: 'category',
            boundaryGap: false,
            data: this.chartData.xAxis.data,
          },
          yAxis: {
            show: false,
            type: 'value',
          },
          series: this.chartData.series
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
