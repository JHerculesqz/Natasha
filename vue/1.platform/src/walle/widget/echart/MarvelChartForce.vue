<template>
  <div class="chart4Force" v-bind:id="id"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

  require('echarts/lib/chart/graph');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  /**
   *  MarvelChartForce widget description
   *  @vuedoc
   *  @exports MarvelChartForce
   */
  export default {
    name: 'MarvelChartForce',
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
        window.addEventListener('resize', this._resizeEcharts);

        this.chartObj.on('click', function (params) {
          self.callback4OnItemClick(params);
        })
      },
      _destroy: function () {
        window.removeEventListener('resize', this._resizeEcharts);
        this.chartObj.clear();
      },

      //#endregion

      _resizeEcharts: function () {
        this._throttle(100, this.chartObj.resize());
      },

      _clearEcharts: function () {
        this.chartObj.clear();
      },

      _throttle: function (delay, action) {
        let last = 0;
        return function () {
          let curr = +new Date();
          if (curr - last > delay) {
            action.apply(this, arguments);
            last = curr;
          }
        }
      },

      //#endregion
      //#region callback

      callback4OnItemClick: function (params) {
        this.$emit("onItemClick", params);
      },

      //#endregion
      //#region 3rd

      setData: function (oGraph, oCategories, bShowLegend) {
        let repulsion = 30;
        if (oGraph.nodes.length < 50) {
          repulsion = 150;
        } else if (oGraph.nodes.length < 200) {
          repulsion = 50;
        }
        let option = {
          title: null,
          tooltip: null,
          legend: bShowLegend ? [{
            textStyle: {
              fontSize: 15,
              color: "#999"
            },
            data: oCategories.map(function (a) {
              return a.name;
            })
          }] : null,
          animation: false,
          series: [{
            name: null,
            type: 'graph',
            layout: 'force',
            data: oGraph.nodes,
            links: oGraph.links,
            categories: oCategories,
            roam: true,
            label: {
              normal: {
                position: "right",
                textStyle: {
                  fontSize: 18,
                  fontWight: 200
                }
              }
            },
            force: {
              repulsion: repulsion
            }
          }]
        };

        this.chartObj.setOption(option);
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
  .chart4Force {
    width: 100%;
    height: 100%;
  }
</style>
