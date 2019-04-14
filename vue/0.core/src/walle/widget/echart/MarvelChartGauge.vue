<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  export default {
    name: 'MarvelChartGauge',
    props: ["id", "theme"],
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
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
//          toolbox: {
//            feature: {
//              restore: {},
//              saveAsImage: {}
//            }
//          },
          series: [
            {
              name: this.chartData.title,
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: this.chartData.value, name: this.chartData.key}]
            }
          ]
        };
        this.chartObj.setOption(option, true);
      }
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%; height: 100%;
  }
</style>
