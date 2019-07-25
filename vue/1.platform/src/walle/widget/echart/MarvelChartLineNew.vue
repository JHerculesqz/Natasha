<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartLineNew widget description
   *  @vuedoc
   *  @exports MarvelChartLineNew
   */
  export default {
    name: 'MarvelChartLineNew',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      }
    },
    data: function () {
      return {
        chartObj: undefined,
        chartData: undefined
      }
    },
    beforeDestroy: function () {
      //#region destroy

      this._destroy();

      //#endregion
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
        this.chartObj = echarts.init(document.getElementById(this.id));
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
          color: this.chartData.colors,
          title: {
            text: this.chartData.title,
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: this.chartData.category//图标的标题分类
          },
          xAxis: [
            {
              type: 'category',
              name: this.chartData.xAxisName,
              data: this.chartData.xAxisValue,//横坐标的值
              axisPointer: {
                type: 'shadow'
              },
            }
          ],
          yAxis: {
            type: 'value',
            name: this.chartData.yName,
            minInterval: this.chartData.hasOwnProperty("minInterval") ? this.chartData.minInterval : 0,
            splitLine: {
              lineStyle: {
                type: 'dashed',//控制横向的虚线分割线
              }
            },
          },
          series: this.chartData.series
        };
        this.chartObj.setOption(option, true);
      },

      //#endregion
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
