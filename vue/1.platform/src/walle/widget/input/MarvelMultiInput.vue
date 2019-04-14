<template>
  <div class="inputWrapper" v-bind:class="[status, size]"
       v-bind:style="{height: height + 'px'}">
    <textarea :placeholder="placeHolder"
              :title="placeHolder"
              v-model="inputMsg"
              v-on:blur="onBlur"
              @input="onInput"></textarea>
    <div class="errorTip icon-notification">{{ errMsg }}</div>
  </div>
</template>

<script>
  import _ from "lodash"

  export default {
    name: 'MarvelMultiInput',
    props: ["status", "placeHolder", "errMsg", "size", "height"],
    data: function () {
      return {
        inputMsg: ""
      }
    },
    methods: {
      setInputMsg: function (strInputMsg) {
        this.inputMsg = strInputMsg;
      },
      getInputMsg: function () {
        return this.inputMsg;
      },
      onInput: _.debounce(function (event) {
        this.$emit("onInput", this.inputMsg);
      }, 1000),
      onBlur: function () {
        this.$emit("onBlur", this.inputMsg);
      },
    }
  }
</script>

<style scoped>
  .inputWrapper {
    width: 100%;
    height: 100%;
  }

  .inputWrapper textarea {
    padding: 0 10px;
    height: 100%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    background-color: transparent;
  }

  .inputWrapper textarea:hover, .inputWrapper textarea:focus {
    border: 1px solid #3399ff;
  }

  .inputWrapper .errorTip {
    color: #ff4c4c;
    line-height: 36px;
    font-size: 14px;
    display: none;
  }

  .inputWrapper .errorTip:before {
    margin-right: 10px;
  }

  .error textarea {
    border: 1px solid #ff4c4c !important;
  }

  .error .errorTip {
    display: block;
  }

  .disable textarea {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .mini textarea {
    height: 32px;
    line-height: 22px;
    font-size: 12px;
  }

  /*region dark theme*/
  .dark textarea {
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #8b90b3;
  }

  .dark textarea:hover, .dark textarea:focus {
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  .dark .disable textarea{
    background-color: rgba(0,0,0,0.4);
  }

  /*endregion*/

  /*blackBg theme*/

  .blackBg .inputWrapper textarea {
    border: 1px solid #ccc;
    color: #eee;
  }

  .blackBg .inputWrapper textarea:hover, .inputWrapper textarea:focus {
    border: 1px solid #3399ff;
  }

  .blackBg .inputWrapper .errorTip {
    color: #ff4c4c;
  }

  .blackBg .error textarea {
    border: 1px solid #ff4c4c !important;
  }

  /*endregion*/

</style>
