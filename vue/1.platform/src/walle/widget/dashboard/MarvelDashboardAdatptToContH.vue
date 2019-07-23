<template>
  <div class="dashboardAdaptToContWrapper">
    <div class="title">
      <div class="titleArea">{{ title }}</div>
      <div class="titleCustomArea">
        <slot name="customArea"></slot>
      </div>
    </div>
    <div class="cont">
      <div class="contArea">
        <slot name="contArea"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelDashboardAdaptToContH widget description
   *  @vuedoc
   *  @exports MarvelDashboardAdaptToContH
   */
  export default {
    name: 'MarvelDashboardAdaptToContH',
    props: {
      title: {
        type: String,
        default: "",
        required: false,
      }
    },
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
  .dashboardAdaptToContWrapper {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    position: relative;
  }

  .dashboardAdaptToContWrapper .title {
    height: 48px;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .dashboardAdaptToContWrapper .title .titleArea {
    color: #999;
    line-height: 48px;
    font-size: 20px;
    font-family: arial, "Microsoft YaHei", sans-serif;
    float: left;
  }

  .dashboardAdaptToContWrapper .title .titleCustomArea {
    float: right;
  }

  .dashboardAdaptToContWrapper .cont {
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    width: 100%;
  }

  .dashboardAdaptToContWrapper .cont .contArea {
    background: url("../../../../static/images/common/emptyTip3.png") no-repeat center;
    background-size: 18%;
  }

  /*region dark theme*/

  .dark .dashboardAdaptToContWrapper {
    background-color: #282746;
  }

  .dark .dashboardAdaptToContWrapper .title .titleArea {
    color: #ffffff;
  }

  /*endregion region*/
</style>
