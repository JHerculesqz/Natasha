<template>
  <div style="width: 100%;height: 100%;margin-top: 10px">
    <div class="itemsClass" v-for="item in items"
         v-bind:class="{active: item.active, disable: item.disable}"
         v-on:click="onClickItem(item)">
      <div class="labelName" :title="item.label">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelAccordion4 widget description
   *  @vuedoc
   *  @exports MarvelAccordion4
   */
  export default {
    name: 'MarvelAccordion4',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
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

      setActiveItem: function (label) {
        this.items.forEach(function (oItem, index) {
          if (oItem.label == label) {
            oItem.active = true;
          } else {
            oItem.active = false;
          }
        })
      }

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
  .itemsClass {
    height: 34px;
    padding-left: 30px;
    width: 196px;
    background-color: #666;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
  }

  .disable {
    background-color: #666;
    pointer-events: none;
  }

  .labelName {
    width: 100%;
    float: left;
    line-height: 34px;
    font-size: 14px;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .active {
    background-color: #3dcca6;
    width: 200px;
  }

  .active .labelName {
    color: #ffffff;
  }

  .active .mark {
    display: block;
  }

  /*region dark theme*/
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
