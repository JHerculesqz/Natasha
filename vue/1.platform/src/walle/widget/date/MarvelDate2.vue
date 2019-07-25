<template>
  <div class="datepickerWrapper icon-marvelIcon-21"
       :class="{'datepicker-range':range,'datepicker__clearable':clearable&&text&&!disabled}">
    <input readonly :value="text" :class="[show ? 'focus' : '', inputClass]" :disabled="disabled"
           :placeholder="placeholder" :name="name" v-if="type!=='inline'"/>
    <a class="datepicker-close" @click.stop="clearDates"></a>
    <transition name="datepicker-anim">
      <div class="datepicker-popup" :class="[popupClass,{'datepicker-inline':type==='inline'}]" tabindex="-1"
           v-if="show||type==='inline'">
        <template v-if="range">
          <marvel-date2-calendar v-model="dates[0]" :left="true"></marvel-date2-calendar>
          <marvel-date2-calendar v-model="dates[1]" :right="true"></marvel-date2-calendar>
        </template>
        <template v-else>
          <marvel-date2-calendar v-model="dates[0]"></marvel-date2-calendar>
        </template>
      </div>
    </transition>
  </div>
</template>

<i18n>
  {
  "zh": {
  "selectHour": "选择小时",
  "selectMinute": "选择分钟",
  "selectSecond": "选择秒数",
  "year": "年",
  "monthsHead": "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月",
  "months": "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月",
  "weeks": "一_二_三_四_五_六_日"
  },
  "en": {
  "selectHour": "Hour",
  "selectMinute": "Minute",
  "selectSecond": "Second",
  "year": " -",
  "monthsHead": "January_February_March_April_May_June_July_August_September_October_November_December",
  "months": "January_February_March_April_May_June_July_August_September_October_November_December",
  "weeks": "Mon_Tue_Wed_Thu_Fri_Sat_Sun"
  }
  }
</i18n>

<script>
  import MarvelDate2Calendar from "./MarvelDate2Calendar";

  /**
   *  MarvelDate2 widget description
   *  @vuedoc
   *  @exports MarvelDate2
   */
  export default {
    name: 'MarvelDate2',
    components: {MarvelDate2Calendar},
    props: {
      name: {
        type: String,
        default: "",
        required: false,
      },
      inputClass: {
        type: String,
        default: "",
        required: false,
      },
      popupClass: {
        type: String,
        default: "",
        required: false,
      },
      value: {
        type: [Date, Array, String],
        default: "",
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
        required: false,
      },
      type: {
        type: String,
        default: 'normal',
        required: false,
      },
      rangeSeparator: {
        type: String,
        default: '~',
        required: false,
      },
      clearable: {
        type: Boolean,
        default: false,
        required: false,
      },
      placeholder: {
        type: String,
        default: '',
        required: false,
      },
      disabledDate: {
        type: Function,
        default: function () {
          return false
        },
        required: false,
      },
      format: {
        type: String,
        default: 'YYYY-MM-DD',
        required: false,
      }
    },
    data: function () {
      return {
        show: false,
        dates: this._genDates(this.value)
      }
    },
    computed: {
      range: function () {
        return this.dates.length === 2
      },
      text: function () {
        const val = this.value;
        const txt = this.dates.map(date => this.timeFormat(date)).join(` ${this.rangeSeparator} `);
        if (Array.isArray(val)) {
          return val.length > 1 ? txt : ''
        } else {
          return val ? txt : ''
        }
      },
      local: function () {
        return {
          dow: 1, // Monday is the first day of the week
          hourTip: this.$t("selectHour"), // tip of select hour
          minuteTip: this.$t("selectMinute"), // tip of select minute
          secondTip: this.$t("selectSecond"), // tip of select second
          yearSuffix: this.$t("year"), // format of head
          monthsHead: this.$t("monthsHead").split('_'), // months of head
          months: this.$t("months").split('_'), // months of panel
          weeks: this.$t("weeks").split('_') // weeks
        }
      }
    },
    watch: {
      value: function (val) {
        this.dates = this._genDates(this.value);
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
        document.addEventListener('click', this._showOrHide);
      },
      _destroy: function () {
        document.removeEventListener('click', this._showOrHide)
      },

      //#endregion

      _genDates: function (val) {
        if (Array.isArray(val)) {
          return val.length > 1 ? val.map(item => new Date(item)) : [new Date(), new Date()]
        } else {
          return val ? new Array(new Date(val)) : [new Date()]
        }
      },
      _showOrHide: function (e) {
        this.show = this.$el.contains(e.target) && !this.disabled
      },

      //#endregion
      //#region callback

      callback4Input: function (oRange) {
        this.$emit('input', oRange)
      },

      //#endregion
      //#region 3rd

      getValue: function () {
        return this.text;
      },
      clearDates: function () {
        this.callback4Input(this.range ? [] : '')
      },
      afterSelect: function () {
        const $this = this;
        $this.callback4Input(Array.isArray($this.value) ? $this.dates : $this.dates[0]);
      },
      timeFormat: function (time, format) {
        const year = time.getFullYear();
        const month = time.getMonth();
        const day = time.getDate();
        const hours24 = time.getHours();
        const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const milliseconds = time.getMilliseconds();
        const dd = t => ('0' + t).slice(-2);
        const map = {
          YYYY: year,
          MM: dd(month + 1),
          MMM: this.local.months[month],
          MMMM: this.local.monthsHead[month],
          M: month + 1,
          DD: dd(day),
          D: day,
          HH: dd(hours24),
          H: hours24,
          hh: dd(hours),
          h: hours,
          mm: dd(minutes),
          m: minutes,
          ss: dd(seconds),
          s: seconds,
          S: milliseconds
        };
        return (format || this.format).replace(/Y+|M+|D+|H+|h+|m+|s+|S+/g, str => map[str])
      },

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
  .datepickerWrapper {
    display: inline-block;
    position: relative;
    width: 100%;
  }

  .datepickerWrapper:before {
    display: block;
    position: absolute;
    width: 34px;
    height: 100%;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 34px;
    color: #3399ff;
    font-size: 16px;
  }

  .datepicker-close {
    display: none;
    position: absolute;
    width: 34px;
    height: 100%;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .datepicker-close:before {
    display: block;
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    left: 50%;
    top: 50%;
    margin-left: -8px;
    margin-top: -8px;
    text-align: center;
    background: #ccc;
    color: #fff;
    border-radius: 50%;
    background: #ccc url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3IDciIHdpZHRoPSI3IiBoZWlnaHQ9IjciPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01LjU4LDVsMi44LTIuODFBLjQxLjQxLDAsMSwwLDcuOCwxLjZMNSw0LjQxLDIuMiwxLjZhLjQxLjQxLDAsMCwwLS41OC41OGgwTDQuNDIsNSwxLjYyLDcuOGEuNDEuNDEsMCwwLDAsLjU4LjU4TDUsNS41OCw3LjgsOC4zOWEuNDEuNDEsMCwwLDAsLjU4LS41OGgwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuNSAtMS40OCkiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4NCg==') no-repeat 50% 50%;
  }

  .datepicker__clearable:hover:before {
    display: none;
  }

  .datepicker__clearable:hover .datepicker-close {
    display: block;
  }

  .datepicker-close:hover:before {
    background-color: #afafaf;
  }

  .datepickerWrapper > input {
    color: #333;
    transition: all 200ms ease;
    border: 1px solid #ccc;
    height: 34px;
    box-sizing: border-box;
    outline: none;
    padding: 0 34px 0 12px;
    font-size: 14px;
    width: 100%;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  .datepickerWrapper > input.focus {
    border-color: #3399ff;
  }

  .datepickerWrapper > input:hover {
    border-color: #3399ff;
  }

  .datepickerWrapper > input:disabled {
    pointer-events: none;
    background-color: #f0f0f0;
    color: #999;
  }

  .datepicker-popup {
    position: absolute;
    transition: all 200ms ease;
    opacity: 1;
    transform: scaleY(1);
    transform-origin: center top;
    font-size: 12px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
    margin-top: 2px;
    outline: 0;
    padding: 5px;
    overflow: hidden;
    z-index: 1
  }

  .datepicker-inline {
    position: relative;
    margin-top: 0;
  }

  .datepicker-range {
    min-width: 325px
  }

  .datepicker-range .datepicker-popup {
    width: 403px;
  }

  .datepicker-bottom {
    float: left;
    width: 100%;
    text-align: right;
  }

  .datepicker-btn {
    padding: 5px 10px;
    background: #3399ff;
    color: #fff;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
  }

  .datepicker-anim-enter-active {
    transform-origin: 0 0;
    animation: datepicker-anim-in .2s cubic-bezier(.23, 1, .32, 1)
  }

  .datepicker-anim-leave-active {
    transform-origin: 0 0;
    animation: datepicker-anim-out .2s cubic-bezier(.755, .05, .855, .06)
  }

  @keyframes datepicker-anim-in {
    0% {
      opacity: 0;
      transform: scaleY(.8)
    }
    to {
      opacity: 1;
      transform: scaleY(1)
    }
  }

  @keyframes datepicker-anim-out {
    0% {
      opacity: 1;
      transform: scaleY(1)
    }
    to {
      opacity: 0;
      transform: scaleY(.8)
    }
  }

  /*region dark theme*/

  .dark .datepickerWrapper:before {
    color: #3dcca6;
  }

  .dark .datepicker-close:before {
    background-color: #ccc;
    color: #fff;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3IDciIHdpZHRoPSI3IiBoZWlnaHQ9IjciPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01LjU4LDVsMi44LTIuODFBLjQxLjQxLDAsMSwwLDcuOCwxLjZMNSw0LjQxLDIuMiwxLjZhLjQxLjQxLDAsMCwwLS41OC41OGgwTDQuNDIsNSwxLjYyLDcuOGEuNDEuNDEsMCwwLDAsLjU4LjU4TDUsNS41OCw3LjgsOC4zOWEuNDEuNDEsMCwwLDAsLjU4LS41OGgwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuNSAtMS40OCkiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4NCg==') no-repeat 50% 50%;
  }

  .dark .datepicker-close:hover:before {
    background-color: #afafaf;
  }

  .dark .datepickerWrapper > input {
    color: #fff;
    border: 1px solid #8b90b3;
    background-color: transparent;
  }

  .dark .datepickerWrapper > input.focus {
    border-color: #3dcca6;
  }

  .dark .datepickerWrapper > input:hover {
    border-color: #3dcca6;
  }

  .dark .datepickerWrapper > input:disabled {
    background-color: #f0f0f0;
    color: #999;
  }

  .dark .datepicker-popup {
    background: #1e1f36;
    border: 1px solid #8b90b3;
    box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
  }

  .dark .datepicker-btn {
    background: #3dcca6;
    color: #fff;
  }

  /*endregion*/
</style>
