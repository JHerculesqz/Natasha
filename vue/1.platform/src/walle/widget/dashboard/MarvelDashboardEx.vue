<template>
  <div class="dashboardWrapper"  :class="{adaptToContentH: bIsAdaptToContent}">
    <div class="cont">
      <div class="contArea">
        <slot name="contArea"></slot>
      </div>
    </div>
    <div class="title">
      <div class="titleArea">{{ title }}</div>
      <div class="titleCustomArea">
        <slot name="customArea"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelDashboard widget description
   *  @vuedoc
   *  @exports MarvelDashboard
   */
  export default {
    name: 'MarvelDashboardEx',
    props: {
      title: {
        type: String,
        default: "",
        required: false,
      },
      bIsAdaptToContent:{
        type: Boolean,
        default: false,
        required: false,
      }
    },
    data: function () {
      return {}
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
  .dashboardWrapper {
    background-color: #fff;
    border-radius: 2px;
    height: 100%;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    position: relative;
  }

  .adaptToContentH{
    height: auto;
  }

  .dashboardWrapper .title {
    height: 48px;
    padding: 0 20px;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
  }

  .dashboardWrapper .title .titleArea {
    color: #999;
    line-height: 48px;
    font-size: 20px;
    font-family: arial, "Microsoft YaHei", sans-serif;
    float: left;
  }

  .dashboardWrapper .title .titleCustomArea {
    float: right;
  }

  .dashboardWrapper .cont {
    height: 100%;
    padding: 48px 20px 20px 20px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    left: 0;
  }

  .adaptToContentH .cont {
    height: auto;
  }

  .dashboardWrapper .cont .contArea {
    height: 100%;
    background: url("../../../../static/images/common/emptyTip3.png") no-repeat center;
    background-size: 18%;
  }

  .adaptToContentH .cont .contArea{
    height: auto;
  }

  /*region dark theme*/

  .dark .dashboardWrapper {
    background-color: #282746;
  }

  .dark .dashboardWrapper .title .titleArea {
    color: #ffffff;
  }

  /*endregion region*/
</style>
