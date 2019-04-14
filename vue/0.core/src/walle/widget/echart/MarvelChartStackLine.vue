<template>
  <div class="chart" v-bind:id="id"></div>
</template>

<script>
  export default {
    name: 'MarvelChartStackLine',
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
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
      getXData: function(){
        var arrRes = [];

        for(var i=0;i<this.chartData.data.length;i++){
          arrRes.push(this.chartData.data[i].label);
        }

        return arrRes;
      },
      getY1Max: function(){
        var iRes = 0;

        for(var i=0;i<this.chartData.data.length;i++){
          var arrItemValue = this.chartData.data[i].value;
          var iSum = 0;
          for(var j=0;j<arrItemValue.length - 1;j++){
            iSum += arrItemValue[j];
          }
          if(iSum >= iRes){
              iRes = iSum;
          }
        }

        return iRes + 10;
      },
      getY2Max: function(){
        var iRes = 0;

        for(var i=0;i<this.chartData.data.length;i++) {
          var arrItemValue = this.chartData.data[i].value;
          var iY2Value = arrItemValue[arrItemValue.length - 1];
          if (iY2Value >= iRes) {
            iRes = iY2Value;
          }
        }

        return iRes + 10;
      },
      getSeries: function(){
        var arrRes = [];

        for(var i=0;i<this.chartData.category.length;i++){
          var strCategory = this.chartData.category[i];

          var arrValue4Category = [];
          for(var j=0;j<this.chartData.data.length;j++) {
            var arrItemValue = this.chartData.data[j].value;
            var iValue4Category = arrItemValue[i];
            arrValue4Category.push(iValue4Category);
          }

          var jsonCategory = {};
          if(i != this.chartData.category.length - 1){
            jsonCategory = {
              name: strCategory,
              type: 'bar',
              stack: '1',
              data: arrValue4Category
            };
          }
          else{
            jsonCategory = {
              name: strCategory,
              type:'line',
              yAxisIndex: 1,
              data: arrValue4Category
            };
          }
          arrRes.push(jsonCategory);
        }

        return arrRes;
      }
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%; height: 100%;
  }
</style>
