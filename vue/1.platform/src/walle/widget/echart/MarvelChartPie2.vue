<template>
  <div class="chart" v-bind:id="id"
       v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/pie');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartPie2 widget description
   *  @vuedoc
   *  @exports MarvelChartPie2
   */
  export default {
    name: 'MarvelChartPie2',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      theme: {
        type: String,
        default: "dark",
        required: false,
      },
      width: {
        type: String,
        default: "500",
        required: true,
      },
      height: {
        type: String,
        default: "500",
        required: true,
      }
    },
    data: function () {
      return {
        chartObj: undefined,
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
        var option = {
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c}({d}%)"
          },
          color: oData.color,
          legend: {
            selectedMode: false,
            formatter: function (name) {
              var tip = oData.tip;
              var total = oData.totalNum;
              return tip + total;
            },
            data: [oData.data[0]],
            top: "center",
            left: 'center',
            icon: "none",
            align: "center",
          },
          series: [
            {
              name: "pieData",
              type: "pie",
              radius: oData.radius,
              label: this.getLabel(oData.hasOwnProperty("label"), oData),
              labelLine: this.getLabelLine(oData.hasOwnProperty("labelLine"), oData),
              data: oData.data,
            }
          ],
        };
        if (!oData.hasOwnProperty("color")) {
          delete option["color"];
        }
        this.chartObj.setOption(option, true);
      },
      getLabel: function (flag, oData) {
        if (flag) {
          return oData.label;
        } else {
          return {
            formatter: "{b|{b}}\r\n{c|{c}} | {d|{d}}%",
            rich: {
              b: {
                align: 'center',
              }
            }
          };
        }
      },
      getLabelLine: function (flag, oData) {
        if (flag) {
          return oData.labelLine;
        } else {
          return {
            length: 5,
            length2: 10
          };
        }
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
