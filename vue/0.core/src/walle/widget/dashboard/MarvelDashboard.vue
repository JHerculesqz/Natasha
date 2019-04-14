<template>
  <div class="dashboardWrapper">
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
  export default {
    name: 'MarvelDashboard',
    props: ["title"],
    data: function() {
        return {

        }
    }
  }
</script>

<style scoped>
  .dashboardWrapper{
    background-color: #fff;
    border-radius: 2px;
    height: 100%;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.05);
    position:relative;
  }
  .dashboardWrapper .title{
    height:48px;
    padding: 0 20px;
    top:0;
    left:0;
    position:absolute;
    width:100%;
    box-sizing:border-box;
  }
  .dashboardWrapper .title .titleArea{
    color: #999;
    line-height: 48px;
    font-size: 20px;
    font-family: arial, "微软雅黑", sans-serif;
    float: left;
  }
  .dashboardWrapper .title .titleCustomArea{
    float: right;
  }
  .dashboardWrapper .cont{
    height: calc(100% - 48px);
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    position:absolute;
    width:100%;
    top:48px;
    left:0;
  }
  .dashboardWrapper .cont .contArea{
    height: 100%;
    background: url("/static/walle/emptyTip3.png") no-repeat center;
    background-size: 18%;
  }
</style>
