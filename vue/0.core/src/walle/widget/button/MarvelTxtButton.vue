<template>
  <div class="textBtn"
       v-bind:class="[mouseDown, disable, classCustom]"
       v-on:click="onClick">{{ label }}</div>
</template>

<script>
  export default {
    name: 'MarvelTxtButton',
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
  .textBtn{
    color: #3399ff;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
  }
  .textBtn:hover{
    color: #006ad4;

  }
  .disable{
    color: #ccc;
    pointer-events: none;
  }
</style>
