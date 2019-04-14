<template>
  <div class="iconTextBtn"
       v-bind:class="[size, mouseDown, focus, disable, classCustom, icon, theme]"
       v-on:click="onClick">{{ label }}</div>
</template>

<script>
  export default {
    name: 'MarvelIconTxtButton',
    props: ["size", "classCustom", "label", "icon", "theme"],
    data: function() {
        return {
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
  .iconTextBtn{
    border: 1px solid #ccc;
    color: #333;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 20px;
    display: inline-block;
    border-radius: 2px;
    cursor: pointer;
  }
  .iconTextBtn:before{
    margin-right: 10px;
    color: #3399ff;
  }
  .iconTextBtn:hover{
    border: 1px solid #60b0ff;
  }
  .dark{
    border: 1px solid #36365b;
    color: #ffffff;
    border-radius: 32px;
    cursor: pointer;
    background-color: #36365b;
  }
  .dark:before{
    margin-right: 10px;
    color: #ffffff;
  }
  .dark:hover{
    border:1px solid #6262a8;
  }
  .large{
    height: 40px;
    padding: 0 30px;
    font-size: 16px;
    line-height: 40px;
  }
  .mouseDown{
    background-color: #f1f8ff;
    color: #3399ff;
    border: 1px solid #3399ff;
  }
  .focus{
    color: #3399ff;
    border: 1px solid #3399ff;
  }
  .disable{
    background-color: #f0f0f0;
    color: #999;
    border: 1px solid #ccc;
    pointer-events: none;
  }
  .disable:before{
    color: #aaa;
  }
</style>
