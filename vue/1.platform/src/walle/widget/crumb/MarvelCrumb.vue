<template>
  <!--crumb Start-->
  <div class="crumbWrapper" :class="size">
    <div class="crumbItem" v-for="(item, index) in items">
      <div class="name" v-bind:class="item.className" v-on:click="onCrumbItemClick(item.label, item, index)">{{
        item.label }}
      </div>
      <div v-if="customSeparateSymbol == undefined" class="symbol icon-marvelIcon-02"></div>
      <div v-if="customSeparateSymbol != undefined" class="customSeparateSymbol">{{customSeparateSymbol}}</div>
    </div>
  </div>
  <!--crumb End-->
</template>

<script>
  /**
   *  MarvelCrumb widget description
   *  @vuedoc
   *  @exports MarvelCrumb
   */
  export default {
    name: 'MarvelCrumb',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      customSeparateSymbol: {
        type: String,
        default: undefined,
        required: false,
      },
      size: {
        type: String,
        default: "",
        required: false,
        validator: function (str) {
          if (str == "large" || str == "") {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    data: function () {
      return {}
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      onCrumbItemClick: function (strItemLabel, oItem, iItemIndex) {
        this.$emit("onCrumbItemClick", strItemLabel, oItem, iItemIndex);
      }

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
  .crumbWrapper {
    overflow: hidden;
    min-height: 14px;
  }

  .crumbWrapper .crumbItem {
    float: left;
  }

  .crumbWrapper .crumbItem .name, .crumbWrapper .crumbItem .symbol {
    float: left;
    font-size: 12px;
    color: #666;
    line-height: 14px;
    margin-right: 5px;
    cursor: pointer;
  }

  .customSeparateSymbol {
    float: left;
    font-size: 12px;
    color: #666;
    line-height: 14px;
    margin-right: 5px;
  }

  .crumbWrapper .crumbItem .name:hover {
    color: #3399ff;
  }

  .crumbWrapper .crumbItem:last-child .name {
    font-weight: 600;
    pointer-events: none;
  }

  .crumbWrapper .crumbItem:last-child .name:hover {
    color: #666;
  }

  .crumbWrapper .crumbItem:last-child .symbol {
    display: none;
  }

  .crumbWrapper .crumbItem:last-child .customSeparateSymbol {
    display: none;
  }

  /*region large*/

  .large {
    height: 28px;
  }

  .large .crumbItem .name, .large .crumbItem .symbol {
    font-size: 14px;
    line-height: 28px;
  }

  .large .customSeparateSymbol {
    font-size: 14px;
    line-height: 28px;
  }

  /*endregion*/

  /*region dark theme*/

  .dark .crumbItem .name, .dark .crumbItem .symbol {
    color: #fff;
  }

  .dark .crumbItem .name, .dark .crumbItem .customSeparateSymbol {
    color: #fff;
  }

  .dark .crumbItem .name:hover {
    color: #3dcca6;
  }

  .dark .crumbItem:last-child .name:hover {
    color: #fff;
  }

  /*endregion*/

  /*blackBg theme*/
  .blackBg .crumbWrapper .crumbItem .name, .crumbWrapper .crumbItem .symbol {
    color: #aaa;
  }

  .blackBg .crumbWrapper .crumbItem .name, .crumbWrapper .crumbItem .customSeparateSymbol {
    color: #aaa;
  }

  .blackBg .crumbWrapper .crumbItem .name:hover {
    color: #3399ff;
  }

  .blackBg .crumbWrapper .crumbItem:last-child .name:hover {
    color: #aaa;
  }

  /*endregion*/
</style>
