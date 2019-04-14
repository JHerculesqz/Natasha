<template>
  <div class="chart" v-bind:id="id" v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  export default {
    name: 'MarvelChartLine',
    props: ["id", "theme", "width", "height"],
    data: function() {
        return {
          chartObj: undefined,
          chartData: undefined
        }
    },
    mounted: function(){
      this.chartObj = echarts.init(document.getElementById(this.id), this.theme);
    },
    methods: {
      setData: function(oData){
        this.chartData = oData;
        var option = {
          title: {
            text: oData.title
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var param = params[0];
              return param.name + ' : ' + param.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [{
            name: 'lineData',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.chartData.data
          }]
        };
        this.chartObj.setOption(option, true);
      }
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
