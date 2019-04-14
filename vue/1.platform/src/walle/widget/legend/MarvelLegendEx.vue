<template>
  <div class="legendWrapper">
    <div class="legendCont">
      <div class="LegendItem" v-for="item in legendItems" v-on:click="onLegendItemClick(item)">
        <div class="icon" v-bind:style="{'background-color':item.color}"></div>
        <div class="text">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelLegendEx',
    props: ["legendItems"],
    data: function() {
      return {
      }
    },
    methods:{
      onLegendItemClick: function(item){

        this.$emit("onLegendItemClick", item);
      }
    }
  }
</script>

<style scoped>

  .legendWrapper{
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: none;
  }
  .legendWrapper .legendCont{
    pointer-events: auto;
    position: absolute;
    bottom: 16px;
    left: 16px;
    display: inline-block;
    padding: 10px 16px;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.15);
  }
  .legendWrapper .LegendItem{
    height: 26px;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  .legendWrapper .LegendItem .icon{
    display: inline-block;
    margin-right: 10px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
  }

  .legendWrapper .LegendItem .text{
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: #666;
    line-height: 26px;
  }

  /*region dark theme*/

  .dark .legendWrapper .legendCont{
    background-color: #181b21;
  }
  .dark .legendWrapper .LegendItem .text{
    color: #FFFFFF;
  }

  /*endregion*/

  /*blackBg theme*/

  .blackBg .legendWrapper .legendCont{
    background-color: #111;
    box-shadow: 1px 1px 2px rgba(255,255,255,0.15);
  }

  .blackBg .legendWrapper .LegendItem .text{
    color: #eee;
  }

  /*endregion*/
</style>
