<template>
  <div class="promptContainer" :class="classObj">
    <div class="left" :class="leftIconClass"></div>
    <div class="center" v-html="content">
    </div>
    <div class="right icon-cross" @click="clickDel"></div>
  </div>
</template>

<script>
  import brower from '../../component/browser';

  /**
   *  MarvelPromptItem widget description
   *  @vuedoc
   *  @exports MarvelPromptItem
   */
  export default {
    name: "MarvelPromptItem",
    data: function () {
      return {
        timeId: undefined,
      };
    },
    props: {
      status: {//status: '0'表示info,'1'代表提示,'2'表示警告
        type: String,
        default: "2",
        required: false,
        validator: function (str) {
          if (str == "0" || str == "1" || str == "2") {
            return true;
          } else {
            return false;
          }
        }
      },
      content: {
        type: String,
        default: "",
        required: false,
      },
      prompt: {
        type: [String, Object, Array],
        default: undefined,
        required: false,
      },
      disposeTimeOut: {
        type: Number,
        default: 10000,
        required: false,
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy() {
      //#region destroy

      this._destroy();

      //#endregion
    },
    computed: {
      classObj: function () {
        if (this.status == '0') {
          return 'promptInfo';
        }
        if (this.status == '1') {
          return 'promptTip';
        } else {
          return 'promptError';
        }
      },
      leftIconClass: function () {
        if (this.status == '0') {
          return ["icon-checkmark", "leftInfo"];
        } else if (this.status == '1') {
          return ["icon-info", "leftTip"];
        } else {
          return ["icon-info", "leftError"];
        }
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.timeId = setTimeout(function () {
          this.clickDel();
        }.bind(this), this.disposeTimeOut);
      },
      _destroy: function () {
        if (this.timeId) {
          clearTimeout(this.timeId);
        }
        this.callback4Destroy(this.prompt);
      },

      //#endregion

      //#endregion
      //#region callback

      callback4Destroy: function (oPrompt) {
        this.$emit("destroy", oPrompt);
      },

      //#endregion
      //#region 3rd

      clickDel: function () {
        var oBrowser = brower.getBrowserInfo();
        if (oBrowser.name == 'msie') {
          //iE 浏览器下
          this.$el.removeNode(true);
        } else {
          //非IE
          this.$el.remove();
        }
        this.$destroy();
      }

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
  .promptContainer {
    width: 400px;
    min-height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 14px;
    border: 1px solid;
    border-radius: 6px;
    overflow: hidden;
    text-shadow: 1px 1px 1px rgba(255,255,255,0.6);
  }

  .promptInfo {
    background-color: rgba(61, 204, 166, 0.4);
    border-color: #4d9e88;
    color: #4d9e88;
    font-size: 16px;
  }

  .promptTip {
    background-color: rgba(51, 153, 255, 0.4);
    border-color: #1b8adb;
    color: #1b8adb;
    font-size: 16px;
  }

  .promptError {
    background-color: rgba(255, 76, 76, 0.4);
    border-color: #e54545;
    color: #e54545;
    font-size: 16px;
  }

  .promptContainer .left {
    float: left;
    margin-top: 12px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: #FFFFFF;
    line-height: 16px;
    font-size: 8px;
    text-align: center;
  }

  .leftInfo {
    background-color: #3dcca6;
  }

  .leftTip {
    background-color: #3399ff;
  }

  .leftError {
    background-color: #ff4c4c;
  }

  .promptContainer .center {
    float: left;
    padding: 10px 15px 10px 10px;
    box-sizing: border-box;
    max-width: calc(100% - 36px);
  }

  .promptContainer .right {
    float: right;
    margin-top: 12px;
    line-height: 16px;
    font-size: 8px;
    text-align: center;
    width: 12px;
  }

  .dark .promptContainer{
    text-shadow: 1px 1px 1px rgba(0,0,0,0.6);
  }
</style>
