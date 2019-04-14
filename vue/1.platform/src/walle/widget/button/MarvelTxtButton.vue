<template>
  <div class="textBtn"
       v-bind:class="[mouseDown, disable, classCustom, {tip:isWarn}]"
       v-on:click="onClick">{{ label }}</div>
</template>

<script>
  export default {
    name: 'MarvelTxtButton',
    props: ["classCustom", "label", "icon", "isWarn"],
    data: function() {
        return {
          mouseDown: "",
          disable: ""
        }
    },
    methods: {
      setBtnMouseDown: function(bIsEnable){
        this.mouseDown = bIsEnable ? "mouseDown" : "";
      },
      setBtnDisable: function(bIsEnable){
        this.disable = bIsEnable ? "disable" : "";
      },
      onClick: function(){
        this.$emit('onClick');
      }
    }
  }
</script>

<style scoped>
  .textBtn{
    color: #3399ff;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }
  .textBtn:hover{
    color: #006ad4;

  }
  .disable{
    color: #ccc;
    pointer-events: none;
  }
  .tip:after{
    content:"";
    position: absolute;
    top: -6px;
    left: -6px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }

  /*region dark theme*/

  .dark .textBtn{
    color: #3dcca6;
  }
  .dark .textBtn:hover{
    color: #45e0b7;
  }
  .dark .disable{
    color: #8d8d8d;
  }
  .dark .tip:after{
    background-color: #ff4400;
  }

  /*endregion*/
</style>
