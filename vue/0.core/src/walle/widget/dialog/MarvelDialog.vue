<template>
  <div class="tipDialogBg dark" v-show="showDialog">
    <div class="tipDialogWrapper"
         v-bind:style="{ width: width + 'px', height: height + 'px', 'margin-top':-height/2 + 'px', 'margin-left':-width/2 + 'px'}">
      <div class="tipDialogTitleArea">
        <div class="titleName">{{ title }}</div>
        <div class="closeBtn icon-marvelIcon-20"
             v-on:click="onClickDialogClose"></div>
      </div>
      <div class="tipDialogContArea">
        <slot name="dialogCont"></slot>
      </div>
      <div class="tipDialogBtnArea">
        <slot name="dialogFoot"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelDialog',
    props: ["showDialog", "theme", "title", "width", "height"],
    data: function() {
        return {

        }
    },
    methods: {
      onClickDialogClose: function(){
        this.$emit("onClickDialogClose");
      }
    }
  }
</script>

<style scoped>
  .tipDialogBg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 999;
  }
  .tipDialogBg .tipDialogWrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 2px;
    box-shadow: 0 0 30px 2px rgba(0,0,0,0.2);
    pointer-events: auto;
    background-color: #ffffff;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogTitleArea{
    height: 52px;
    width: 100%;
    clear: both;
  }
  .tipDialogTitleArea .titleName:before{
    width: 3px;
    display: inline-block;
    content: "";
    background-color: #3399ff;
    height: 22px;
    margin-right: 30px;
  }
  .tipDialogTitleArea .titleName{
    height: 100%;
    float: left;
    padding-top: 30px;
    font-size: 24px;
    line-height: 24px;
    color: #333333;
    box-sizing: border-box;
    font-family: arial, "微软雅黑", sans-serif;
  }
  .tipDialogTitleArea .closeBtn{
    height: 100%;
    padding-top: 10px;
    margin-right: 10px;
    font-size: 10px;
    color: #777777;
    cursor:pointer;
    float: right;
    box-sizing: border-box;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogContArea{
    padding: 20px 33px;
    width: 100%;
    height:calc(100% - 115px);
    box-sizing: border-box;
    clear: both;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogBtnArea{
    height: 63px;
    width: 100%;
    padding-top: 16px;
    box-sizing: border-box;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: #f5f5f5;
    position: relative;
    clear: both;
    text-align: center;
  }
  @media (max-width: 440px){
    .tipDialogBg .tipDialogWrapper{
      width: 90%;
      left: 5%;
      margin-left: 0px;
    }
  }

  .dark{
    background-color: rgba(0,0,0,0.7);
  }
  .dark .tipDialogWrapper{
    box-shadow: 0 0 30px 2px rgba(0,0,0,0);
    background-color: #282746;
  }
  .dark .tipDialogWrapper .tipDialogTitleArea{}
  .tipDialogTitleArea .titleName:before{
    background-color: #02a888;
  }
  .tipDialogTitleArea .titleName{
    color: #8b90b3;
  }
  .tipDialogTitleArea .closeBtn{
    color: #8b90b3;
  }
  .dark .tipDialogWrapper .tipDialogContArea{}
  .dark .tipDialogWrapper .tipDialogBtnArea{
    background-color: #1e1f36;
  }
  @media (max-width: 440px){
    .tipDialogBg .tipDialogWrapper{
      width: 90%;
      left: 5%;
      margin-left: 0px;
    }
  }
</style>
