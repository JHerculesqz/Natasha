<template>
  <div class="iconBtn"
       v-bind:class="[mouseDown, disable, classCustom, icon]"
       v-bind:title="label"
       v-on:click="onClick"></div>
</template>

<script>
  export default {
    name: 'MarvelIconButton',
    props: ["classCustom", "label", "icon"],
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
  }
  .iconBtn:hover{
    color: #3399ff;

  }
  .disable{
    color: #aaa;
    pointer-events: none;
  }
</style>
