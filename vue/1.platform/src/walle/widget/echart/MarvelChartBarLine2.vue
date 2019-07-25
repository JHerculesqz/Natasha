<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/dataZoom');

  /**
   *  MarvelChartBarLine2 widget description
   *  @vuedoc
   *  @exports MarvelChartBarLine2
   */
  export default {
    name: 'MarvelChartBarLine2',
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
        chartData: undefined,
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
        var self = this;

        this.chartObj = echarts.init(document.getElementById(this.id));
        this.chartObj.on("click", function (params) {
          self.callback4OnItemClick(params);
        });
      },
      _destroy: function () {
        this.chartObj.clear();
      },

      //#endregion

      generateZoom: function (bIsZoom) {
        if (bIsZoom) {
          return [{
            type: 'slider',
            fillerColor: '#687178',
            height: 10,//设置滑动条高度
            handleSize: 20,
            start: 0,
            end: 50,
            bottom: 10,
            showDetail: false,
            zoomLock: true,
          }];
        } else {
          return [];
        }
      },
      generateYaxis: function (arrYAxis, arrSeries, isReCalc) {
        var arrYaxis = [];
        if (isReCalc != undefined && isReCalc == true) {
          var maxValue = 0;
          for (var j = 0; j < arrSeries.length; j++) {
            for (var k = 0; k < arrSeries[j].data.length; k++) {
              if (maxValue < parseFloat(arrSeries[j].data[k])) {
                maxValue = parseFloat(arrSeries[j].data[k]);
              }
            }
          }

          maxValue = maxValue + 1;
          var n = 0;
          var m = Math.floor(maxValue);
          while (m != 0) {
            m = Math.floor(m / 10);
            n++;
          }
          if (n == 1 || n == 0) {
            if (Math.floor(maxValue) < 5) {
              maxValue = 5;
            } else {
              maxValue = 10;
            }
          } else if (maxValue > Math.floor(Math.floor(maxValue) / Math.pow(10, n - 1)) * Math.pow(10, n - 1) && maxValue <= Math.floor(Math.floor(maxValue) / Math.pow(10, n - 1)) * Math.pow(10, n - 1) + 5 * Math.pow(10, n - 2)) {
            maxValue = Math.floor(Math.floor(maxValue) / Math.pow(10, n - 1)) * Math.pow(10, n - 1) + 5 * Math.pow(10, n - 2);
          } else if (maxValue > Math.floor(Math.floor(maxValue) / Math.pow(10, n - 1)) * Math.pow(10, n - 1) + 5 * Math.pow(10, n - 2)) {
            maxValue = Math.floor(Math.floor(maxValue) / Math.pow(10, n - 1)) * Math.pow(10, n - 1) + Math.pow(10, n - 1);
          }

          for (var i = 0; i < arrYAxis.length; i++) {
            var oYaxis = {
              type: 'value',
              name: arrYAxis[i].title,
              show: arrYAxis[i].isShow,
              splitLine: {
                lineStyle: {
                  type: 'dashed',//控制横向的虚线分割线
                }
              },
              min: 0,
              max: maxValue,
              interval: maxValue / 5,
            };
            arrYaxis.push(oYaxis);
          }
          return arrYaxis;
        } else {
          for (var i = 0; i < arrYAxis.length; i++) {
            var oYaxis = {
              type: 'value',
              name: arrYAxis[i].title,
              show: arrYAxis[i].isShow,
              splitLine: {
                lineStyle: {
                  type: 'dashed',//控制横向的虚线分割线
                }
              },
            };
            arrYaxis.push(oYaxis);
          }
          return arrYaxis;
        }
      },

      //#endregion
      //#region callback

      callback4OnItemClick: function (params) {
        this.$emit("onItemClick", params);
      },

      //#endregion
      //#region 3rd

      setData: function (oData) {
        this.chartData = oData;
        var option = {
          color: this.chartData.colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: this.generateZoom(this.chartData.isSlide),
          grid: {
            left: '10%',
            bottom: '45%'
          },
          legend: {
            data: this.chartData.category,//图标的标题分类
            selectedMode: this.chartData.canSelect == undefined ? true : this.chartData.canSelect,
          },
          xAxis: [
            {
              type: 'category',
              name: this.chartData.xAxisName,
              data: this.chartData.xAxisValue,//横坐标的值
              axisLabel: {
                rotate: 60,
                interval: 0
              },
              axisPointer: {
                type: 'shadow'
              },
            }
          ],
          yAxis: this.generateYaxis(this.chartData.yAxis, this.chartData.series, this.chartData.isReCalc),
          series: this.chartData.series
        };
        if (this.chartData.top != undefined) {
          option['grid'] = {
            top: this.chartData.top
          };
        }
        this.chartObj.setOption(option, true);
      },
      resize: function () {
        this.chartObj.resize();
      },

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
