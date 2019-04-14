<template>
  <div class="btn" v-bind:class="[{ active: isActive }, {tip:isWarn}]"
       v-on:click="onClick">
    {{ label }}
  </div>
</template>

<script>
  export default {
    name: 'MarvelTabButton',
    props: ["label", "isWarn"],
    data: function() {
        return {
          isActive: false
        }
    },
    mounted: function(){

    },
    methods: {
      onClick: function(){
        this.$emit("onClick");
      },
      setActive: function(bIsActive){
        this.isActive = bIsActive;
      }
    }
  }
</script>

<style scoped>

  .btn {
    height: 22px;
    line-height: 22px;
    float: left;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    border: 0.4px dashed #cccccc;
    margin-right: 20px;
    padding: 0 10px;
    position: relative;
  }
  .btn:hover {
    color: #3399ff;
  }
  .btn:last-child{
    margin-right: 0;
  }
  .tip:after{
    content:"";
    position: absolute;
    top: 1px;
    left: 2px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }
  .active {
    border: 0.4px solid #3399ff;
    color: #333;
    background-color: rgba(51, 153, 255, 0.2);
  }

  /*region dark theme*/

  .dark .btn {
    color: #a7abbe;
    border: 0.4px dashed #a7abbe;
  }
  .dark .btn:hover {
    color: #3dcaa6;
  }
  .dark .active {
    border: 0.4px solid #3dcaa6;
    color: #fff;
    background-color: rgba(61, 202, 166, 0.2);
  }

  /*endregion*/
</style>
