<template>
  <div class="inputWrapper" v-bind:class="[status, theme, size]"
       v-bind:style="{height: height + 'px'}">
    <textarea :placeholder="placeHolder" v-model="inputMsg"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'MarvelMultiInput',
    props: ["status", "placeHolder", "theme", "size", "height"],
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
    height: 100%;
  }
  .inputWrapper textarea{
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
  .inputWrapper textarea:hover, .inputWrapper textarea:focus{
    border: 1px solid #3399ff;
  }


  .error textarea{
    border: 1px solid #ff4c4c !important;
  }

  .disable textarea{
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .dark{

  }
  .dark textarea{
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #8b90b3;
  }
  .dark textarea:hover, .dark textarea:focus{
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  .mini textarea{
    height: 32px;
    line-height: 22px;
    font-size: 12px;
  }
</style>
