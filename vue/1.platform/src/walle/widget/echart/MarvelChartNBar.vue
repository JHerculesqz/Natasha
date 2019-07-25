<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<i18n>
  {
  "zh": {
  "noData": "无数据"
  },
  "en": {
  "noData": "no data"
  }
  }
</i18n>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/dataZoom');

  /**
   *  MarvelChartNBar widget description
   *  @vuedoc
   *  @exports MarvelChartNBar
   */
  export default {
    name: 'MarvelChartNBar',
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

      generateZoom: function (slideConfig) {
        if (slideConfig != undefined && slideConfig.show) {
          return [{
            type: 'slider',
            fillerColor: '#687178',
            height: 15,//设置滑动条高度
            handleSize: 20,
            start: 0,
            end: slideConfig.view,
            bottom: 0,
            showDetail: false,
            zoomLock: true,
          }];
        } else {
          return [];
        }
      },
      generateXaixs: function (arrAxis) {
        var arrAxisData = [];
        for (var i = 0; i < arrAxis.length; i++) {
          arrAxisData = arrAxisData.concat(arrAxis[i]);
          if (i != arrAxis.length - 1) {
            arrAxisData.push('');
          }
        }
        return arrAxisData;
      },
      generateYaxis: function (arrYAxis) {
        var arrYaxis = [];
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
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: '#999'
            },
            axisTick: {
              show: false,
            }
          };
          arrYaxis.push(oYaxis);
        }
        return arrYaxis;
      },
      generateSeries: function (arrSeries) {
        var arrSeriesData = [];
        var oMap = {};
        var arrSeriesData1 = arrSeries[0].data.slice(0);
        var arrSeriesData2 = arrSeries[1].data.slice(0);
        var oSeries1 = this.genreteSingleSeries(arrSeries[0], arrSeriesData2, true);
        var oSeries2 = this.genreteSingleSeries(arrSeries[1], arrSeriesData1, false);

        arrSeriesData.push(oSeries1);
        arrSeriesData.push(oSeries2);

        return arrSeriesData;
      },
      genreteSingleSeries: function (oSeries1, arrOtherData, bIsFirst) {
        var oSeries = {
          name: oSeries1.name,
          barWidth: oSeries1.barWidth,
          data: oSeries1.data,
          type: "bar",
          stack: '1',
          label: {
            normal: {
              show: true,//显示数据
              position: 'top'//显示数据位置'top/right/left/insideLeft/insideRight/insideTop/insideBottom'
            }
          },
        };
        for (var i = 0; i <= arrOtherData.length; i++) {
          if (bIsFirst) {
            oSeries.data.push('');
          } else {
            oSeries.data.unshift('');
          }
        }
        return oSeries;
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setData: function (oData) {
        this.chartData = oData;
        var self = this;
        var option = {
          backgroundColor: '#FCFCFC',
          color: this.chartData.colors,
          title: {
            show: true,
            text: this.chartData.title,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            },
            formatter: function (params) {
              if (params[0].value == "" && params[1].value == "") {
                return self.$t("noData");
              } else if (params[0].value == "" && params[1].value != "") {
                if (params[1].seriesName == params[1].name) {
                  return params[1].name + ": " + params[1].value;
                }
                return params[1].seriesName + ":<br/>" + params[1].name + ": " + params[1].value;
              } else if (params[0].value != "" && params[1].value == "") {
                if (params[0].seriesName == params[0].name) {
                  return params[0].name + ": " + params[0].value;
                }
                return params[0].seriesName + ":<br/>" + params[0].name + ": " + params[0].value;
              }
            }
          },
          legend: {
            data: this.chartData.category//图标的标题分类
          },
          dataZoom: this.generateZoom(this.chartData.slideConfig),
          xAxis: [
            {
              type: 'category',
              name: this.chartData.xAxisName,
              data: this.generateXaixs(this.chartData.arrAxis),//横坐标的值
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                interval: 0,
                rotate: this.chartData.rotate,
                color: '#999'
              },
              nameTextStyle: {
                rich: {
                  align: 'left',
                }
              }
            }
          ],
          yAxis: this.generateYaxis(this.chartData.yAxis),
          series: this.generateSeries(this.chartData.series)
        };
        if (this.chartData.right != undefined) {
          option['grid'] = {
            right: this.chartData.right
          };
        }
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
