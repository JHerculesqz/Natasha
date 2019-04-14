<template>
  <div class="timeLineContainer">
    <div class="title">
      {{ title }}
    </div>
    <div class="timeLineContent">
      <div :class="circleClassObj"></div>
      <div v-for="item in items">
        <div class="left">
          <div class="leftTitle">
            {{item.left.title}}
          </div>
          <div class="leftContent">
            {{item.left.content}}
          </div>
        </div>
        <div class="right">
          <div class="icon" :class="classObj(item.status)"></div>
          <div class="triangle"></div>
          <div class="rightContainer">
            <div class="rightTitle">
              {{item.right.title}}
            </div>
            <div class="rightContent">
              {{item.right.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "MarvelTimeLine",
    props: ['title', 'items'],
    data: function(){
      return {

      }
    },
    methods: {
      classObj: function(status){
        if(status == '0'){
          return 'icon-checkmark';
        }
        else{
          return ['icon-cross', 'fail'];
        }
      }
    },
    computed: {
      circleClassObj: function(){
        return this.items.length > 0 ? 'circle' : '';
      }
    }
  }

</script>

<style scoped>

  .timeLineContainer{
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow: scroll;
  }
  .timeLineContainer .title{
    font: 20px bold;
    color: #333333;
    margin-bottom: 20px;
  }
  .timeLineContainer .timeLineContent{

  }
  .timeLineContent .circle{
    width: 10px;
    height: 10px;
    margin-left: 95px;
    background-color: transparent;
    border: 1px solid #d5d5d5;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .timeLineContent .left{
    box-sizing: border-box;
    width: 100px;
    float: left;
    padding: 0 18px 0 0;
  }
  .left .leftTitle{
    text-align: right;
    font: 16px bold;
    color: #333333;
  }
  .left .leftContent{
    text-align: right;
    font-size: 14px;
    color: #666666;
  }
  .timeLineContent .right{
    width: calc(100% - 100px);
    min-height: 80px;
    float: left;
    position: relative;
    border-left: 1px solid #d5d5d5;
    box-sizing: border-box;
  }
  .right .icon{
    position: absolute;
    border-right: 1px solid #d5d5d5;
    top: 11px;
    left: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #3fcca7;
    line-height: 16px;
    text-align: center;
    font-size: 8px;
    color: #FFFFFF;
  }
  .timeLineContent .fail{
    background-color: red;
  }
  .right .triangle{
    border: 10px solid transparent;
    border-right-color: #f6f7f7;
    width: 0;
    height: 0;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .right .rightContainer{
    box-sizing: border-box;
    background-color: #f6f7f7;
    padding: 0 0 0 25px;
    margin-left: 28px;
  }
  .right .rightContainer .rightTitle{
    font-size: 20px;
    color: #333333;
  }
  .right .rightContainer .rightContent{
    font-size: 14px;
    color: #666666;
  }

</style>
