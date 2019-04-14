<template>
  <div class="marvelGridMWrapper">
    <div class="marvelGridItem" v-for="row in rows">
      <div class="decorationIcon icon-marvelIcon-75" v-bind:style="[{color:row.item0}]"></div>
      <div class="titleArea">
        <div class="taskName">{{row.item1}}</div>
        <div class="taskId">{{row.item2}}</div>
      </div>
      <div class="contArea">
        <div class="contDetails">
          <div class="contDetailsTitle">{{titles[0]}}:</div>
          <div class="details">{{row.item3}}</div>
        </div>
        <div class="contDetails">
          <div class="contDetailsTitle">{{titles[1]}}:</div>
          <div class="details">{{row.item4}}</div>
        </div>
      </div>
      <div class="footArea">
        <div class="time">{{row.item5}}</div>
        <div class="more"
             v-on:click="onClickMore(row)">more>>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'MarvelGridM',
    props: ["titles", "rows"],
    data: function () {
      return {}
    },
    methods: {
      //#region inner

      //#endregion
      //#region callback
      onClickMore: function (oRow) {
        this.$emit("onClickMore", oRow);
      },
      //#endregion
      //#region 3rd

      //#endregion
    },
  }
</script>

<style scoped>
  .marvelGridMWrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .marvelGridItem {
    margin-bottom: 20px;
    background-color: #ffffff;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
    padding: 16px;
    box-sizing: border-box;
    position: relative;
  }

  .decorationIcon {
    position: absolute;
    width: 38px;
    height: 38px;
    top: 0;
    left: 0;
    font-size: 38px;
    line-height: 38px;
  }

  .titleArea {
    height: 22px;
  }

  .titleArea .taskName {
    padding: 0px 0 0 30px;
    color: #333333;
    line-height: 22px;
    font-size: 16px;
    float: left;
  }

  .titleArea .taskId {
    padding: 6px 0 0 10px;
    color: #666;
    line-height: 16px;
    font-size: 12px;
    float: right;
  }

  .contArea {
    padding: 20px 0;
    border-bottom: 2px dashed #cccccc;
  }

  .contArea .contDetails {
    overflow: hidden;
  }

  .contDetailsTitle {
    float: left;
    width: 80px;
    margin-right: 10px;
    line-height: 20px;
    font-size: 14px;
    color: #666666;
  }

  .details {
    float: left;
    width: calc(100% - 90px);
    line-height: 20px;
    font-size: 14px;
    color: #666666;
  }

  .contArea .contDetails:first-child {
    margin-bottom: 10px;
  }

  .footArea {
    padding-top: 10px;
    height: 16px;
  }

  .footArea .time {
    float: left;
    line-height: 16px;
    font-size: 12px;
    color: #666666;
  }

  .footArea .more {
    float: right;
    line-height: 16px;
    font-size: 12px;
    color: #3dcca6;
    cursor: pointer;
  }

  /*region dark theme*/

  .dark .marvelGridItem {
    background-color: #161C36;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  }

  .dark .titleArea .taskName {
    color: #ffffff;
  }

  .dark .titleArea .taskId {
    color: #8b90b3;
  }

  .dark .contArea {
    border-bottom: 2px dashed #8b90b3;
  }

  .dark .contDetailsTitle {
    color: #8b90b3;
  }

  .dark .details {
    color: #8b90b3;
  }

  .dark .footArea .time {
    color: #8b90b3;
  }

  .dark .footArea .more {
    color: #3dcca6;
  }

  /*endregion*/
</style>
