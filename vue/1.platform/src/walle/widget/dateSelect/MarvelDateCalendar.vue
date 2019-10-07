<template>
  <div :class="`${pre}`">
    <div :class="`${pre}-head`">
      <a :class="`${pre}-prev-decade-btn`" v-show="showYears" @click="year-=10">«</a>
      <a :class="`${pre}-prev-year-btn`" v-show="!showYears" @click="year--">«</a>
      <a :class="`${pre}-prev-month-btn`" v-show="!showYears&&!showMonths" @click="pm">‹</a>
      <a :class="`${pre}-year-select`" v-show="showYears">{{ys+'-'+ye}}</a>
      <template v-if="local.yearSuffix">
        <a :class="`${pre}-year-select`" @click="showYears=!showYears"
           v-show="!showYears">{{year}}{{local.yearSuffix}}</a>
        <a :class="`${pre}-month-select`" @click="showMonths=!showMonths" v-show="!showYears&&!showMonths">{{local.monthsHead[month]}}</a>
      </template>
      <template v-else>
        <a :class="`${pre}-month-select`" @click="showMonths=!showMonths" v-show="!showYears&&!showMonths">{{local.monthsHead[month]}}</a>
        <a :class="`${pre}-year-select`" @click="showYears=!showYears" v-show="!showYears">{{year}}</a>
      </template>
      <a :class="`${pre}-next-month-btn`" v-show="!showYears&&!showMonths" @click="nm">›</a>
      <a :class="`${pre}-next-year-btn`" v-show="!showYears" @click="year++">»</a>
      <a :class="`${pre}-next-decade-btn`" v-show="showYears" @click="year+=10">»</a>
    </div>
    <div :class="`${pre}-body`">
      <div :class="`${pre}-days`">
        <a :class="`${pre}-week`" v-for="i in local.weeks">{{i}}</a>
        <a v-for="j in days" @click="is($event)&&(day=j.i,ok(j))"
           :class="[(j.p||j.n)?`${pre}-date-out`:'',status(j.y,j.m,j.i,hour,minute,second,'YYYYMMDD')]">{{j.i}}</a>
      </div>
      <div :class="`${pre}-months`" v-show="showMonths">
        <a v-for="(i,j) in local.months" @click="is($event)&&(showMonths=(m==='M'),month=j,(m==='M'&&ok()))"
           :class="[status(year,j,day,hour,minute,second,'YYYYMM')]">{{i}}</a>
      </div>
      <div :class="`${pre}-years`" v-show="showYears">
        <a v-for="(i,j) in years" @click="is($event)&&(showYears=(m==='Y'),year=i,(m==='Y'&&ok()))"
           :class="[(j===0||j===11)?`${pre}-date-out`:'',status(i,month,day,hour,minute,second,'YYYY')]">{{i}}</a>
      </div>
      <div :class="`${pre}-hours`" v-show="showHours">
        <div :class="`${pre}-title`">{{local.hourTip}}</div>
        <a v-for="(j,i) in 24" @click="is($event)&&(showHours=false,hour=i,ok('h'))"
           :class="[status(year,month,day,i,minute,second,'YYYYMMDDHH')]">{{i}}</a>
      </div>
      <div :class="`${pre}-minutes`" v-show="showMinutes">
        <div :class="`${pre}-title`">{{local.minuteTip}}</div>
        <a v-for="(j,i) in 60" @click="is($event)&&(showMinutes=false,minute=i,ok('h'))"
           :class="[status(year,month,day,hour,i,second,'YYYYMMDDHHmm')]">{{i}}</a>
      </div>
      <div :class="`${pre}-seconds`" v-show="showSeconds">
        <div :class="`${pre}-title`">{{local.secondTip}}</div>
        <a v-for="(j,i) in 60" @click="is($event)&&(showSeconds=false,second=i,ok('h'))"
           :class="[status(year,month,day,hour,minute,i,'YYYYMMDDHHmmss')]">{{i}}</a>
      </div>
    </div>
    <div :class="`${pre}-foot`" v-if="showHoursTitle||showMinutesTitle||showSecondsTitle">
      <div :class="`${pre}-hour`">
        <a v-show="showHoursTitle" :title="local.hourTip" @click="showHours=!showHours,showMinutes=showSeconds=false"
           :class="{on:showHours}">{{hour|dd}}</a>
        <span v-show="showMinutesTitle">:</span>
        <a v-show="showMinutesTitle" :title="local.minuteTip"
           @click="showMinutes=!showMinutes,showHours=showSeconds=false"
           :class="{on:showMinutes}">{{minute|dd}}</a>
        <span v-show="showSecondsTitle">:</span>
        <a v-show="showSecondsTitle" :title="local.secondTip"
           @click="showSeconds=!showSeconds,showHours=showMinutes=false"
           :class="{on:showSeconds}">{{second|dd}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelDateCalendar widget description
   *  @vuedoc
   *  @exports MarvelDateCalendar
   */
  export default {
    name: 'MarvelDateCalendar',
    props: {
      value: {
        type: [Date, Array, String],
        default: null,
        required: true,
      },
      left: {
        type: Boolean,
        default: false,
        required: false,
      },
      right: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      const time = this.get(this.value);
      return {
        pre: 'marvelDate2Calendar',
        m: 'D',
        showYears: false,
        showMonths: false,
        showHours: false,
        showMinutes: false,
        showSeconds: false,
        year: time.year,
        month: time.month,
        day: time.day,
        hour: time.hour,
        minute: time.minute,
        second: time.second,
        showHoursTitle: false,
        showMinutesTitle: false,
        showSecondsTitle: false,
      }
    },
    watch: {
      value: function (val) {
        const $this = this;
        const time = $this.get(val);
        $this.year = time.year;
        $this.month = time.month;
        $this.day = time.day;
        $this.hour = time.hour;
        $this.minute = time.minute;
        $this.second = time.second;
      }
    },
    computed: {
      local: function () {
        return this.$parent.local;
      },
      format: function () {
        return this.$parent.format;
      },
      start: function () {
        return this.parse(this.$parent.dates[0]);
      },
      end: function () {
        return this.parse(this.$parent.dates[1]);
      },
      ys: function () {
        return parseInt(this.year / 10) * 10;
      },
      ye: function () {
        return this.ys + 10;
      },
      years: function () {
        const arr = [];
        let start = this.ys - 1;
        while (arr.length < 12) {
          arr.push(start++);
        }
        return arr;
      },
      days: function () {
        const days = [];
        const $this = this;
        const year = $this.year;
        const month = $this.month;
        const time = new Date(year, month, 1);
        const dow = $this.local.dow || 7;
        time.setDate(0);// switch to the last day of last month
        let lastDay = time.getDate();
        const week = time.getDay() || 7;
        let count = dow <= week ? (week - dow + 1) : (week + (7 - dow + 1));
        while (count > 0) {
          days.push({
            i: lastDay - count + 1,
            y: month > 0 ? year : year - 1,
            m: month > 0 ? month - 1 : 11,
            p: true
          });
          count--
        }
        time.setMonth(time.getMonth() + 2, 0);// switch to the last day of the current month
        lastDay = time.getDate();
        let i = 1;
        for (i = 1; i <= lastDay; i++) {
          days.push({
            i: i,
            y: year,
            m: month
          })
        }
        for (i = 1; days.length < 42; i++) {
          days.push({
            i: i,
            y: month < 11 ? year : year + 1,
            m: month < 11 ? month + 1 : 0,
            n: true
          })
        }
        return days;
      }
    },
    filters: {
      dd: function (val) {
        return ('0' + val).slice(-2);
      }
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
        const $this = this;
        const is = function (c) {
          return $this.format.indexOf(c) !== -1
        };

        if (is('s') && is('m') && (is('h') || is('H'))) {
          $this.m = 'H';
        } else if (is('D')) {
          $this.m = 'D';
        } else if (is('M')) {
          $this.m = 'M';
          $this.showMonths = true;
        } else if (is('Y')) {
          $this.m = 'Y';
          $this.showYears = true;
        }
        if (is('h') || is('H')) {
          $this.showHoursTitle = true;
        }
        if (is('m') && (is('h') || is('H'))) {
          $this.showMinutesTitle = true;
        }
        if (is('s') && is('m') && (is('h') || is('H'))) {
          $this.showSecondsTitle = true;
        }
      },

      //#endregion

      get: function (time) {
        return {
          year: time.getFullYear(),
          month: time.getMonth(),
          day: time.getDate(),
          hour: time.getHours(),
          minute: time.getMinutes(),
          second: time.getSeconds()
        }
      },
      parse: function (num) {
        return parseInt(num / 1000);
      },
      status: function (year, month, day, hour, minute, second, format) {
        const $this = this;
        const maxDay = new Date(year, month + 1, 0).getDate();
        const time = new Date(year, month, day > maxDay ? maxDay : day, hour, minute, second);
        const t = $this.parse(time);
        const f = $this.$parent.timeFormat;
        const classObj = {};
        let flag = false;
        if (format === 'YYYY') {
          flag = year === $this.year
        } else if (format === 'YYYYMM') {
          flag = month === $this.month
        } else {
          flag = f($this.value, format) === f(time, format)
        }
        classObj[$this.pre + '-date'] = true;
        classObj[$this.pre + '-date-disabled'] = ($this.right && t < $this.start) || ($this.left && t > $this.end) || $this.$parent.disabledDate(time);
        classObj[$this.pre + '-date-on'] = ($this.left && t > $this.start) || ($this.right && t < $this.end);
        classObj[$this.pre + '-date-selected'] = flag;
        return classObj;
      },
      nm: function () {
        if (this.month < 11) {
          this.month++
        } else {
          this.month = 0;
          this.year++
        }
      },
      pm: function () {
        if (this.month > 0) {
          this.month--
        } else {
          this.month = 11;
          this.year--
        }
      },
      is: function (e) {
        return e.target.className.indexOf(this.pre + '-date-disabled') === -1;
      },
      ok: function (info) {
        const $this = this;
        let year = '';
        let month = '';
        info && info.n && $this.nm();
        info && info.p && $this.pm();
        if (info === 'h') {
          const time = $this.get(this.value);
          year = time.year;
          month = time.month;
        }
        $this.callback4Input(new Date(year || $this.year, month || $this.month, $this.day, $this.hour, $this.minute, $this.second));
        $this.$parent.afterSelect()
      },

      //#endregion
      //#region callback

      callback4Input: function (oDate) {
        this.$emit('input', oDate)
      },

      //#endregion
      //#region 3rd
      //#endregion
    },
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
  .marvelDate2Calendar {
    float: left;
    display: inline-block;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .marvelDate2Calendar + .marvelDate2Calendar {
    border-left: solid 1px #eaeaea;
    margin-left: 5px;
    padding-left: 5px;
  }

  .marvelDate2Calendar-head {
    line-height: 34px;
    height: 34px;
    text-align: center;
    position: relative;
  }

  .marvelDate2Calendar-head a {
    color: #666;
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    position: absolute;
    padding: 0 5px;
    font-size: 16px;
  }

  .marvelDate2Calendar-head a:hover {
    color: #3399ff;
  }

  .marvelDate2Calendar-head .marvelDate2Calendar-year-select,
  .marvelDate2Calendar-head .marvelDate2Calendar-month-select {
    font-size: 12px;
    padding: 0 2px;
    position: relative;
  }

  .marvelDate2Calendar-prev-decade-btn,
  .marvelDate2Calendar-prev-year-btn {
    left: 6px;
  }

  .marvelDate2Calendar-prev-month-btn {
    left: 24px;
  }

  .marvelDate2Calendar-next-decade-btn,
  .marvelDate2Calendar-next-year-btn {
    right: 6px;
  }

  .marvelDate2Calendar-next-month-btn {
    right: 24px;
  }

  .marvelDate2Calendar-body {
    position: relative;
    width: 196px;
    height: 196px;
  }

  .marvelDate2Calendar-days {
    width: 100%;
    height: 100%;
  }

  .marvelDate2Calendar-week,
  .marvelDate2Calendar-date {
    font-weight: normal;
    width: 14.28%;
    height: 14.28%;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
    float: left;
  }

  .marvelDate2Calendar-week:before,
  .marvelDate2Calendar-date:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .marvelDate2Calendar-date {
    cursor: pointer;
    color: #333;
  }

  .marvelDate2Calendar-date-out {
    color: #ccc;
  }

  .marvelDate2Calendar-date:hover,
  .marvelDate2Calendar-date-on {
    background: #d8f5ed;
  }

  .marvelDate2Calendar-date-selected,
  .marvelDate2Calendar-date-selected:hover {
    color: #fff;
    font-weight: bold;
    background: #3dcca6;
  }

  .marvelDate2Calendar-date-disabled {
    cursor: not-allowed !important;
    color: #bcbcbc !important;
    background: #f3f3f3 !important;
  }

  .marvelDate2Calendar-foot {
    margin-top: 5px;
  }

  .marvelDate2Calendar-hour {
    display: inline-block;
    border: 1px solid #ccc;
    color: #666;
  }

  .marvelDate2Calendar-hour a {
    display: inline-block;
    padding: 2px 4px;
    cursor: pointer;
  }

  .marvelDate2Calendar-hour a:hover,
  .marvelDate2Calendar-hour a.on {
    color: #3dcca6;
  }

  .marvelDate2Calendar-years,
  .marvelDate2Calendar-months,
  .marvelDate2Calendar-hours,
  .marvelDate2Calendar-minutes,
  .marvelDate2Calendar-seconds {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff;
    left: 0;
    top: 0;
  }

  .marvelDate2Calendar-months a {
    width: 33.33%;
    height: 25%;
  }

  .marvelDate2Calendar-years a {
    width: 33.33%;
    height: 25%;
  }

  .marvelDate2Calendar-hours a {
    width: 20%;
    height: 20%;
  }

  .marvelDate2Calendar-minutes a,
  .marvelDate2Calendar-seconds a {
    width: 16.66%;
    height: 10%;
  }

  .marvelDate2Calendar-title {
    margin-top: -30px;
    height: 30px;
    line-height: 30px;
    background: #fff;
    text-align: center;
    font-weight: bold;
  }

  /*region dark theme*/


  .dark .marvelDate2Calendar + .marvelDate2Calendar {
    border-left: solid 1px #8b90b3;
  }

  .dark .marvelDate2Calendar-head a {
    color: #ffffff;
  }

  .dark .marvelDate2Calendar-head a:hover {
    color: #3dcca6;
  }

  .dark .marvelDate2Calendar-week,
  .dark .marvelDate2Calendar-date {
    color: #ffffff;
  }

  .dark .marvelDate2Calendar-date-out {
    color: #8d8d8d;
  }

  .dark .marvelDate2Calendar-date:hover,
  .dark .marvelDate2Calendar-date-on {
    background: rgba(255, 255, 255, 0.1);
  }

  .marvelDate2Calendar-date-selected,
  .marvelDate2Calendar-date-selected:hover {
    color: #fff;
    background: #3dcca6;
  }

  .dark .marvelDate2Calendar-date-disabled {
    color: #444 !important;
    background: rgba(0, 0, 0, 0.2) !important;
  }

  .dark .marvelDate2Calendar-hour {
    border: 1px solid #8b90b3;
    color: #fff;
  }

  .dark .marvelDate2Calendar-hour a:hover,
  .dark .marvelDate2Calendar-hour a.on {
    color: #3dcca6;
  }

  .dark .marvelDate2Calendar-years,
  .dark .marvelDate2Calendar-months,
  .dark .marvelDate2Calendar-hours,
  .dark .marvelDate2Calendar-minutes,
  .dark .marvelDate2Calendar-seconds {
    background: #1e1f36;
  }

  .dark .marvelDate2Calendar-title {
    background: #1e1f36;
    color: #ffffff;
  }

  /*endregion*/
</style>
﻿
