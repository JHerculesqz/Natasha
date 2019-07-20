<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/line');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/dataZoom');

  /**
   *  MarvelChartStackLine widget description
   *  @vuedoc
   *  @exports MarvelChartStackLine
   */
  export default {
    name: 'MarvelChartStackLine',
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              },
              label: {
                backgroundColor: '#666'
              }
            }
          },
          dataZoom: [{
            type: 'slider',
            start: 0,
            end: 100
          }],
          legend: {
            data: this.chartData.category
          },
          xAxis: [
            {
              type: 'category',
              data: this.getXData(),
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: this.chartData.y1Title,
              min: 0,
              max: this.getY1Max()
            },
            {
              type: 'value',
              name: this.chartData.y2Title,
              min: 0,
              max: this.getY2Max()
            }
          ],
          series: this.getSeries()
        };
        this.chartObj.setOption(option, true);
      },
      getXData: function () {
        var arrRes = [];

        for (var i = 0; i < this.chartData.data.length; i++) {
          arrRes.push(this.chartData.data[i].label);
        }

        return arrRes;
      },
      getY1Max: function () {
        var iRes = 0;

        for (var i = 0; i < this.chartData.data.length; i++) {
          var arrItemValue = this.chartData.data[i].value;
          var iSum = 0;
          for (var j = 0; j < arrItemValue.length - 1; j++) {
            iSum += arrItemValue[j];
          }
          if (iSum >= iRes) {
            iRes = iSum;
          }
        }

        return iRes + 10;
      },
      getY2Max: function () {
        var iRes = 0;

        for (var i = 0; i < this.chartData.data.length; i++) {
          var arrItemValue = this.chartData.data[i].value;
          var iY2Value = arrItemValue[arrItemValue.length - 1];
          if (iY2Value >= iRes) {
            iRes = iY2Value;
          }
        }

        return iRes + 10;
      },
      getSeries: function () {
        var arrRes = [];

        for (var i = 0; i < this.chartData.category.length; i++) {
          var strCategory = this.chartData.category[i];

          var arrValue4Category = [];
          for (var j = 0; j < this.chartData.data.length; j++) {
            var arrItemValue = this.chartData.data[j].value;
            var iValue4Category = arrItemValue[i];
            arrValue4Category.push(iValue4Category);
          }

          var jsonCategory = {};
          if (i != this.chartData.category.length - 1) {
            jsonCategory = {
              name: strCategory,
              type: 'bar',
              stack: '1',
              data: arrValue4Category
            };
          } else {
            jsonCategory = {
              name: strCategory,
              type: 'line',
              yAxisIndex: 1,
              data: arrValue4Category
            };
          }
          arrRes.push(jsonCategory);
        }

        return arrRes;
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
