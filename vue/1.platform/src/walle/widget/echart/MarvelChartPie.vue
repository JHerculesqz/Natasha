<template>
  <div class="chart" v-bind:id="id"
       v-bind:style="{width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
  export default {
    name: 'MarvelChartPie',
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
            text: oData.title,
            subtext: oData.subTitle,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {d}%"
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: oData.legendItems
          },
          series: [{
            name: 'pieData',
            type: 'pie',
            radius : oData.radius,
            center: ['50%', '50%'],
            data: this.chartData.data
          }],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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
