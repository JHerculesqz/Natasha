<template>
  <div class="selectCard" v-bind:class="[size]">
    <div class="selectCardItem" v-for="item in items"
         v-on:click="onClick(item)"
         v-bind:class="{ selected: selectItem==item }">{{ item }}
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelSelectCard widget description
   *  @vuedoc
   *  @exports MarvelSelectCard
   */
  export default {
    name: 'MarvelSelectCard',
    props: {
      size: {
        type: String,
        default: "mini",
        required: false,
        validator: function (str) {
          if (str == "large" || str == "mini") {
            return true;
          } else {
            return false;
          }
        }
      },
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
    },
    data: function () {
      return {
        selectItem: this.items[0]
      }
    },
    methods: {
      //#region inner

      onClick: function (oItem) {
        this.selectItem = oItem;
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      getSelectItem: function () {
        return this.selectItem;
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
  .selectCard {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
  }

  .selectCard .selectCardItem {
    float: left;
    border-right: 1px solid #ccc;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  .selectCard .selected {
    background-color: #3399ff !important;
    color: #fff !important;
  }

  .selectCard .selectCardItem:last-child {
    border-right: none;
  }

  .selectCard .selectCardItem:hover {
    background-color: #f5f6f7;
    color: #3399ff;
  }

  .large {
    height: 34px;
  }

  .large .selectCardItem {
    line-height: 34px;
    padding: 0 30px;
  }

  .mini {
    height: 24px;
  }

  .mini .selectCardItem {
    line-height: 24px;
    padding: 0 20px;
  }

  /*region dark theme*/

  .dark .selectCard {
    border: 1px solid #8b90b3;
    background-color: #17191f;
  }

  .dark .selectCard .selectCardItem {
    border-right: 1px solid #8b90b3;
    color: #8b90b3;
  }

  .dark .selectCard .selected {
    background-color: #3dcca6 !important;
    color: #fff !important;
  }

  .dark .selectCard .selectCardItem:last-child {
    border-right: none;
  }

  .dark .selectCard .selectCardItem:hover {
    background-color: #393b70;
    color: #8b90b3;
  }

  /*endregion*/
</style>
