<template>
  <div style="width: 100%;height: 100%;">
    <div class="titleArea">{{ title }}</div>
    <div class="itemsClass" v-for="item in items"
         v-bind:class="{active: item.active}"
         v-on:click="onClickItem(item)">
      <div class="labelName">{{item.label}}</div>
      <div class="mark"></div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelAccordion3 widget description
   *  @vuedoc
   *  @exports MarvelAccordion3
   */
  export default {
    name: 'MarvelAccordion3',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      title: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {};
    },
    methods: {
      //#region inner

      onClickItem: function (oItem) {
        this.items.forEach(function (oItem, index) {
          oItem.active = false;
        });
        oItem.active = true;
        this.callback4OnClickItem(oItem);
      },

      //#endregion
      //#region callback

      callback4OnClickItem: function (oItem) {
        this.$emit("onClickItem", oItem);
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
  .titleArea {
    height: 40px;
    line-height: 40px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .itemsClass {
    height: 34px;
    padding-left: 30px;
    width: 196px;
    background-color: #e8e8e8;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
  }

  .labelName {
    width: 100%;
    float: left;
    line-height: 34px;
    font-size: 14px;
    color: #666;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .mark {
    display: none;
    border-top: 17px solid transparent;
    border-bottom: 17px solid transparent;
    border-left: 14px solid #3399ff;
    position: absolute;
    right: -14px;
    top: 0;
    z-index: 2;
  }

  .active {
    background-color: #3399ff;
    width: 200px;
  }

  .active .labelName {
    color: #ffffff;
  }

  .active .mark {
    display: block;
  }

  /*region dark theme*/

  .dark .titleArea {
    color: #FFFFFF;
  }

  .dark .itemsClass {
    background-color: #36365b;
  }

  .dark .labelName {
    color: #fff;
  }

  .dark .mark {
    border-left: 14px solid #3dcca6;
  }

  .dark .active {
    background-color: #3dcca6;
  }

  .dark .active .labelName {
    color: #ffffff;
  }

  /*endregion*/
</style>
