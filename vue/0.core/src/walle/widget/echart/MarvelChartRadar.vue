<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  export default {
    name: 'MarvelChartRadar',
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
        // Schema:date,AQIindex,PM2.5,PM10,CO,NO2,SO2
        this.chartData = oData;

        var option = {
          backgroundColor: '#161627',
          title: {
            text: this.chartData.title,
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
//          legend: {
//            bottom: 5,
//            data: ['北京'],
//            itemGap: 20,
//            textStyle: {
//              color: '#fff',
//              fontSize: 14
//            },
//            selectedMode: 'single'
//          },
          radar: {
            indicator: this.chartData.seriesTitle,
            shape: 'circle',
            splitNumber: 5,
            name: {
              textStyle: {
                color: 'rgb(238, 197, 102)'
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                  'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                  'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(238, 197, 102, 0.5)'
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
                  color: '#F9713C'
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
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%; height: 100%;
  }
</style>
