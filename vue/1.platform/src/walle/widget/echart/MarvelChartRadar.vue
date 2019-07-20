<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/radar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartRadar widget description
   *  @vuedoc
   *  @exports MarvelChartRadar
   */
  export default {
    name: 'MarvelChartRadar',
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
        // Schema:date,AQIindex,PM2.5,PM10,CO,NO2,SO2
        this.chartData = oData;

        var option = {
          title: {
            text: this.chartData.title,
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          radar: {
            indicator: this.chartData.seriesTitle,
            // shape: 'circle',
            splitNumber: 5,
            name: {
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  'rgba(84, 119, 255, 0.6)', 'rgba(84, 119, 255, 1)'
                ].reverse()
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(84, 119, 255, 0.8)'
              }
            }
          },
          series: [
            {
              name: this.chartData.seriesName,
              type: 'radar',
              lineStyle: {
                normal: {
                  width: 1,
                  opacity: 0.5
                }
              },
              data: this.chartData.data,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#64ff95'
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.1
                }
              }
            }
          ]
        };
        this.chartObj.setOption(option, true);
      }

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
