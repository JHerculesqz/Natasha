<template>
  <div class="inputWrapper" v-bind:class="[status, theme, size]">
    <input class="inputDefault" type="text" :placeholder="placeHolder" v-model="inputMsg">
    <div class="errorTip icon-notification">{{ errMsg }}</div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelInput',
    props: ["status", "placeHolder", "errMsg", "theme", "size"],
    data: function() {
        return {
          inputMsg: ""
        }
    },
    methods: {
      setInputMsg: function(strInputMsg){
        this.inputMsg = strInputMsg;
      },
      getInputMsg: function(){
        return this.inputMsg;
      }
    }
  }
</script>

<style scoped>
  .inputWrapper{
    width: 100%;
  }
  .inputWrapper .inputDefault{
    padding: 0 10px;
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    outline: none;
  }
  .inputWrapper .inputDefault:hover, .inputWrapper .inputDefault:focus{
    border: 1px solid #3399ff;
  }
  .inputWrapper .errorTip{
    color: #ff4c4c;
    line-height: 36px;
    font-size: 14px;
    display: none;
  }
  .inputWrapper .errorTip:before{
    margin-right: 10px;
  }

  .error .inputDefault{
    border: 1px solid #ff4c4c !important;
  }
  .error .errorTip{
    display: block;
  }

  .disable .inputDefault{
    background-color: #f0f0f0;
    pointer-events: none;
  }
  .dark{
    background-color: transparent;
  }
  .dark .inputDefault{
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #ffffff;
    background-color: transparent;
  }

  .mini .inputDefault{
    height: 22px;
    line-height: 22px;
    font-size: 12px;
  }
</style>
