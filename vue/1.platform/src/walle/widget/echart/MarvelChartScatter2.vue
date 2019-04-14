<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  export default {
    name: 'MarvelChartScatter2',
    props: ["id", "theme"],
    data: function() {
        return {
          chartObj: undefined,
          chartData: undefined
        }
    },
    mounted: function(){
      var self = this;

      this.chartObj = echarts.init(document.getElementById(this.id), this.theme);
      this.chartObj.on("click", function(params){
        if(params.componentType == "series" &&
          params.componentSubType == "effectScatter"){
          self.$emit("onClick", params.data);
        }
      });
    },
    methods: {
      setData: function(oData){
        var self=this;
        this.chartData = oData;

        var option = {
          //region basic
          backgroundColor: '#404a59',
          animation: true,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          //endregion
          //region title
          title: [{
            text: this.chartData.title,
            subtext: this.chartData.subTitle,
            sublink: this.chartData.subLink,
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          }, {
            id: 'statistic',
            right: 120,
            top: 40,
            width: 100,
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
          }],
          //endregion
          //region toolbox
          toolbox: {
            iconStyle: {
              normal: {
                borderColor: '#fff'
              },
              emphasis: {
                borderColor: '#b1e4ff'
              }
            }
          },
          //endregion
          //region brush
          brush: {
            outOfBrush: {
              color: '#abc'
            },
            brushStyle: {
              borderWidth: 2,
              color: 'rgba(0,0,0,0.2)',
              borderColor: 'rgba(0,0,0,0.5)',
            },
            seriesIndex: [0, 1],
            throttleType: 'debounce',
            throttleDelay: 300,
            geoIndex: 0
          },
          //endregion
          //region geo
          geo: {
            map: this.chartData.geoType,
            left: '150',
            right: '10%',
            center: [117.98561551896913, 31.205000490896193],
            zoom: this.chartData.geoZoom,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          //endregion
          //region tooltip
          tooltip : {
            trigger: 'item'
          },
          //endregion
          //region grid
          grid: {
            right: 40,
            top: 100,
            bottom: 40,
            width: '30%'
          },
          //endregion
          //region X
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            boundaryGap: false,
            splitLine: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {margin: 2, textStyle: {color: '#aaa'}},
          },
          //endregion
          //region Y
          yAxis: {
            type: 'category',
            name: this.chartData.yTitle,
            nameGap: 16,
            axisLine: {show: false, lineStyle: {color: '#ddd'}},
            axisTick: {show: false, lineStyle: {color: '#ddd'}},
            axisLabel: {interval: 0, textStyle: {color: '#ddd'}},
            data: []
          },
          //endregion
          //region series
          series : [{
            name: "Top " + this.chartData.topN,
            type: 'effectScatter',
            coordinateSystem: 'geo',
//            data: this.chartData.data.sort(function (a, b) {
//              return b.value[2] - a.value[2];
//            }).slice(0, this.chartData.topN),
            data: this.chartData.data,
            symbolSize: function (val) {
              return Math.max(val[2] / 10, 8);
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }, {
            id: 'bar',
            zlevel: 2,
            type: 'bar',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            },
            data: []
          }]
          //endregion
        };

        this.chartObj.on('brushselected', function(params){
          var mainSeries = params.batch[0].selected[0];

          var selectedItems = [];
          var categoryData = [];
          var barData = [];
          var maxBar = self.chartData.topN;
          var sum = 0;
          var count = 0;

          for (var i = 0; i < mainSeries.dataIndex.length; i++) {
            var rawIndex = mainSeries.dataIndex[i];
            var dataItem = self.chartData.data[rawIndex];
            var pmValue = dataItem.value[2];

            sum += pmValue;
            count++;

            selectedItems.push(dataItem);
          }

          selectedItems.sort(function (a, b) {
            return b.value[2] - a.value[2];
          });

          for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
            categoryData.push(selectedItems[i].name);
            barData.push(selectedItems[i].value[2]);
          }

          this.setOption({
            yAxis: {
              data: categoryData
            },
            xAxis: {
              axisLabel: {show: !!count}
            },
            title: {
              id: 'statistic',
              text: count ? '平均: ' + (sum / count).toFixed(2) : ''
            },
            series: {
              id: 'bar',
              data: barData
            }
          });
        });
        setTimeout(function () {
          self.chartObj.dispatchAction({
            type: 'brush',
            areas: [
              {
                geoIndex: 0,
                brushType: 'polygon',
                coordRange: [[80,50],[130,50],[130,25],[80,25]]
              }
            ]
          });
        }, 0);
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
