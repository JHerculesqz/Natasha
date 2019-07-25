<template>
  <div class="marvelNumberSelectWrapper">
    <div class="selectArea">
      <div class="minus" v-bind:class="{notAllowed: isMinusActive}" @click.stop.prevent="onMinus">
        <span class="icon icon-minus"></span>
      </div>
      <div class="input">
        <input class="inputText" v-model="currNum" @blur="onBlur">
      </div>
      <div class="plus" v-bind:class="{ notAllowed: isPlusActive }" @click.stop.prevent="onPlus">
        <span class="icon icon-plus"></span>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelNumberSelect widget description
   *  @vuedoc
   *  @exports MarvelNumberSelect
   */
  export default {
    name: 'MarvelNumberSelect',
    props: {
      limitMin: {
        type: Number,
        default: 0,
        required: false,
      },
      limitMax: {
        type: Number,
        default: 10000,
        required: false,
      },
      stepNum: {
        type: Number,
        default: 1,
        required: false,
      },
      initValue: {
        type: Number,
        default: 1,
        required: false,
      },
    },
    data: function () {
      return {
        currNum: this.initValue,
        isMinusActive: false,
        isPlusActive: false,
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
        this.currNum = this.initValue;
        this._checkMinusPlusActive();
      },

      //#endregion

      onBlur: function () {
        let iNumber = parseInt(this.currNum);
        if (iNumber != NaN) {
          if (iNumber > this.limitMax) {
            this.currNum = this.limitMax;
          }
          if (iNumber < this.limitMin) {
            this.currNum = this.limitMin;
          }
        } else {
          this.currNum = this.limitMin;
        }

        this._checkMinusPlusActive();
        this.callback4HandleChange(this.currNum);
      },
      onPlus: function () {
        this.currNum = this.currNum + this.stepNum;
        this._checkMinusPlusActive();
      },
      onMinus: function () {
        this.currNum = this.currNum - this.stepNum;
        this._checkMinusPlusActive();
      },
      _checkMinusPlusActive: function () {
        if (this.currNum <= this.limitMin) {
          this.currNum = this.limitMin;
          this.isMinusActive = true;
        } else {
          this.isMinusActive = false;
        }

        if (this.currNum >= this.limitMax) {
          this.currNum = this.limitMax;
          this.isPlusActive = true;
        } else {
          this.isPlusActive = false;
        }

      },

      //#endregion
      //#region callback

      callback4HandleChange: function (currNum) {
        this.$emit("handleChange", currNum);
      },

      //#endregion
      //#region 3rd

      updateInitValue: function (iInitValue) {
        this.currNum = iInitValue;
        this._checkMinusPlusActive()
      },
      getInputValue: function () {
        let iNumber = parseInt(this.currNum);
        return iNumber;
      }

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
  .marvelNumberSelectWrapper {
    height: 100%;
    width: 100%;
  }

  .selectArea {
    height: 36px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }

  .minus {
    width: 36px;
    height: 100%;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #dcdfe6;
    float: left;
    cursor: pointer;
    background: #f5f7fa;
    color: #606266;
    font-size: 13px;
  }

  .input {
    width: calc(100% - 75px);
    float: left;
    height: 36px;
  }

  .inputText {
    width: 100%;
    height: 36px;
    text-align: center;
    border: 0px;
    padding: 0px;
    margin: 0px;
  }

  .icon {
    margin-left: 12px;
    line-height: 36px;
  }

  .notAllowed {
    cursor: not-allowed !important;
  }

  .plus {
    width: 36px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    float: left;
    cursor: pointer;
    background: #f5f7fa;
    color: #606266;
    font-size: 13px;
  }

</style>
