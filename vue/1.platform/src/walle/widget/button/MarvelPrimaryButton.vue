<template>
  <div class="primaryBtn"
       v-bind:class="[size, mouseDown, focus, disable, classCustom, {tip:isWarn}]"
       v-on:click="onClick">{{ label }}</div>
</template>

<script>
  export default {
    name: 'MarvelPrimaryButton',
    props: ["size", "classCustom", "label", "isWarn"],
    data: function() {
        return {
          large: "",
          mouseDown: "",
          focus: "",
          disable: ""
        }
    },
    mounted: function(){

    },
    methods: {
      setBtnMouseDown: function(bIsEnable){
        this.mouseDown = bIsEnable ? "mouseDown" : "";
      },
      setBtnFocus: function(bIsEnable){
        this.focus = bIsEnable ? "focus" : "";
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
  .primaryBtn{
    color: #fff;
    background-color: #3399ff;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
  }
  .primaryBtn:hover{
    background-color: #60b0ff;
  }
  .tip:after{
    content:"";
    position: absolute;
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }
  .large{
    height: 40px;
    padding: 0 30px;
    font-size: 16px;
    line-height: 40px;
  }

  .small{
    height: 26px;
    padding: 0 16px;
    font-size: 14px;
    line-height: 26px;
  }

  .mini{
    height: 22px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 22px;
  }
  .mouseDown{
    background-color: #006ad4 !important;
  }
  .focus{
    background-color: #3399ff;
  }
  .disable{
    background-color: #aaa;
    pointer-events: none;
  }

  /*region dark theme*/

  .dark .primaryBtn{
    color: #fff;
    background-color: #3dcca6;
    border-radius: 32px;
  }
  .dark .primaryBtn:hover{
    background-color: #45e0b7;
  }
  .dark .mouseDown{
    background-color: #2eb08d !important;
  }
  .dark .focus{
    background-color: #2eb08d;
  }
  .dark .disable{
    background-color: #075641;
    pointer-events: none;
  }

  /*endregion*/
</style>
