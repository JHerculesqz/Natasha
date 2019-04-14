<template>
  <div class="iconBtn"
       v-bind:class="[mouseDown, disable, classCustom, icon, {tip:isWarn}]"
       v-bind:title="label"
       v-on:click="onClick"></div>
</template>

<script>
  export default {
    name: 'MarvelIconButton',
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
  .iconBtn{
    color: #777;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }
  .iconBtn:hover{
    color: #3399ff;

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
  .disable{
    color: #aaa;
    pointer-events: none;
  }

  /*region dark theme*/

  .dark .iconBtn{
    color: #ffffff;
  }

  .dark .iconBtn:hover{
    color: #3dcca6;
  }

  .dark .disable{
    color: #36365b;
  }

  /*endregion*/
</style>
