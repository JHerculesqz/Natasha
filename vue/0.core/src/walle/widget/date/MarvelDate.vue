<template>
  <!--data_selector start-->
  <div class="dateSelectWrapper icon-marvelIcon-21">
    <div class="LabelArea" v-on:click="onInputClick">
      {{ this.ySelect }}-{{ this.mSelect }}-{{ this.dSelect }}
    </div>
    <div class="dateArea" v-bind:class="{ dpn:!show }">
      <div class="dateOptions">
        <div class="option" v-for="year in yearLst"
             v-bind:class="{ select: year==ySelect }"
             v-on:click="onYearClick(year)">{{ year }}</div>
      </div>
      <div class="dateOptions">
        <div class="option" v-for="month in monthLst"
             v-bind:class="{ select: month==mSelect }"
             v-on:click="onMonthClick(month)">{{ month }}</div>
      </div>
      <div class="dateOptions">
        <div class="option" v-for="day in dayLst"
             v-bind:class="{ select: day==dSelect }"
             v-on:click="onDayClick(day)">{{ day }}</div>
      </div>
    </div>
  </div>
  <!--data_selector end-->
</template>

<script>
  import MarvelDateUtils from "../../component/date";

  export default {
    name: 'MarvelDate',
    props: ["yearStart", "yearEnd", "yearSelect",
      "monthSelect", "daySelect"],
    data: function() {
        return {
          yearLst: [],
          ySelect: this.yearSelect,
          monthLst: [],
          mSelect: this.monthSelect,
          dayLst: [],
          dSelect: this.daySelect,
          show: false
        }
    },
    mounted: function(){
      //1.init yearLst
      this.yearLst = [];
      for(var i=this.yearStart;i<this.yearEnd;i++){
        this.yearLst.push(i);
      }

      //2.init monthLst
      this.monthLst = [];
      for(var i=1;i<=12;i++){
        this.monthLst.push(i);
      }

      //3.init dayLst
      this._updateDayLst();
    },
    methods: {
      onInputClick: function(){
        this.show = !this.show;
        console.log(this.show);
      },
      onYearClick: function(strYear){
        this.ySelect = strYear;
        this._updateDayLst();
      },
      onMonthClick: function(strMonth){
        this.mSelect = strMonth;
        this._updateDayLst();
      },
      onDayClick: function(strDay){
        this.dSelect = strDay;
        this.show = false;
      },
      _updateDayLst: function(){
        this.dayLst = [];
        var iDayCount = MarvelDateUtils.getDaysInOneMonth(this.ySelect, this.mSelect);
        for(var i=1;i<=iDayCount;i++){
          this.dayLst.push(i);
        }
      },
      getTime:function(){
        return this.ySelect + "-" + this.mSelect + "-" + this.dSelect;
      }
    }
  }
</script>

<style scoped>
  .dpn{
    display: none;
  }
  .dateSelectWrapper{
    height: 32px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 2px;
    position: relative;
    line-height: 32px;
    color: #3399ff;
    font-size: 16px;
    text-align: right;
    padding: 0 10px;
  }
  .dateSelectWrapper:hover{
    border: 1px solid #3399ff;
  }
  .dateSelectWrapper .LabelArea{
    height: 100%;
    width: calc(100% - 46px);
    position: absolute;
    top: 0;
    left: 10px;
    color: #333;
    text-align: left;
    font-size: 14px;
  }
  .dateSelectWrapper .dateArea{
    position: absolute;
    top: 36px;
    left: 0;
    width: 100%;
    min-width: 200px;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 2px;
    box-sizing: border-box;
    z-index: 1;
  }
  .dateSelectWrapper .dateArea .dateOptions{
    float: left;
    width: 33%;
    text-align: center;
    color: #999;
    border-right: 1px solid #cccccc;
    box-sizing: border-box;
    max-height: 320px;
    overflow-y: auto;
  }
  .dateSelectWrapper .dateArea .dateOptions:last-child{
    border-right: none;
    width: 34%;
  }
  .dateSelectWrapper .dateArea .dateOptions .select{
    background-color: #3dcca6;
    color: #ffffff;
  }
  .dateSelectWrapper .dateArea .dateOptions .option{
    cursor: pointer;
  }
  .dateSelectWrapper .dateArea .dateOptions .option:hover{
    background-color: #d8f5ed;
  }
</style>
