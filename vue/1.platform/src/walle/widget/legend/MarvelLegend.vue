<template>
  <div class="legendWrapper">
    <div class="legendCont">
      <div class="LegendItem" v-for="item in legendItems" v-on:click="onLegendItemClick(item)">
        <div class="icon" v-bind:class="[item.level]"></div>
        <div class="text">{{ item.label }}</div>
        <div class="visibleIcon icon-eye" v-bind:class="{ inVisibleIcon: item.isHide }"></div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelLegend widget description
   *  @vuedoc
   *  @exports MarvelLegend
   */
  export default {
    name: 'MarvelLegend',
    props: {
      legendItems: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {}
    },
    methods: {
      //#region inner

      onLegendItemClick: function (item) {
        for (var i = 0; i < this.legendItems.length; i++) {
          if (item.label == this.legendItems[i].label) {
            this.legendItems[i].isHide = !this.legendItems[i].isHide;
            break;
          }
        }
        this.callback4OnLegendItemClick();
      },

      //#endregion
      //#region callback

      callback4OnLegendItemClick: function () {
        this.$emit("onLegendItemClick");
      },

      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/

  .legendWrapper {
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: none;
  }

  .legendWrapper .legendCont {
    pointer-events: auto;
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: inline-block;
    padding: 10px 16px;
    border-radius: 2px;
    background-color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  }

  .legendWrapper .LegendItem {
    height: 26px;
    overflow: hidden;
    white-space: nowrap;
  }

  .legendWrapper .LegendItem .icon {
    display: inline-block;
    margin-right: 10px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
  }

  .legendWrapper .LegendItem .level1 {
    background-color: #ff4c4c;
  }

  .legendWrapper .LegendItem .level2 {
    background-color: #ff8833;
  }

  .legendWrapper .LegendItem .level3 {
    background-color: #f5df28;
  }

  .legendWrapper .LegendItem .level4 {
    background-color: #3399ff;
  }

  .legendWrapper .LegendItem .level5 {
    background-color: #3dcca6;
  }

  .legendWrapper .LegendItem .level6 {
    background-color: #808080;
  }

  .legendWrapper .LegendItem .text {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: #666;
    line-height: 26px;
  }

  .legendWrapper .LegendItem .visibleIcon {
    display: inline-block;
    font-size: 14px;
    color: #3399ff;
    line-height: 26px;
  }

  .legendWrapper .LegendItem .inVisibleIcon {
    color: #818495;
  }

  /*region dark theme*/

  .dark .legendWrapper .legendCont {
    background-color: #181b21;
  }

  .dark .legendWrapper .LegendItem .text {
    color: #FFFFFF;
  }

  .dark .legendWrapper .LegendItem .visibleIcon {
    color: #3399ff;
  }

  .dark .legendWrapper .LegendItem .inVisibleIcon {
    color: #818495;
  }

  /*endregion*/
</style>
