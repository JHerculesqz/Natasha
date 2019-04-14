<template>
  <!--微观loading start-->
  <div style="margin-top: 10px;margin-left: 10px;">
    <div class="microLoading" v-show="show">
      <div class="loadingBoard">
        <div class="loadingIcon">
          <div class="icon">
            <div class="dot white"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="loadingTip">{{ progressMsg }}</div>
        <div class="loadingBar">
          <div class="currentRate" v-bind:style="{ width: progress + 'px' }"></div>
        </div>
        <div class="loadingTip">{{ progress }}%</div>
        <div class="loadingCancel" v-on:click="cancelEx">{{ cancelLabel }}</div>
      </div>
    </div>
  </div>
  <!--微观loading end-->
</template>

<script>
  export default {
    name: 'MarvelLoadingMini',
    props: [],
    data: function() {
        return {
          show: false,
          cancelLabel: "",
          progress: 0,
          progressMsg: ""
        }
    },
    methods: {
      showEx: function(strCancelLabel){
        this.cancelLabel = strCancelLabel;
        this.show = true;
        this.progress = 0;
        this.progressMsg = "";
      },
      setProgress : function(iProgress, strProgressMsg){
          this.progress = iProgress;
          this.progressMsg = strProgressMsg;
      },
      hideEx: function(){
        this.show = false;
        this.progress = 0;
        this.progressMsg = "";
      },
      cancelEx: function(){
        this.hideEx();
        this.$emit("onCancel");
      }
    }
  }
</script>

<style scoped>
  .dpn { display: none; }
  /*loadingAnimate*/
  .icon {
    position: absolute;
    width: 24px;
    height: 24px;
    animation: rotate 2.4s  infinite;
  }
  .white {
    top: 0; bottom: 0; left: 0; right: 0;
    background: white;
    animation: flash 2.4s linear infinite;
    opacity: 0;
  }
  .dot {
    position: absolute;
    margin: auto;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    transition: all 1s ease;
  }
  .dot:nth-child(2) { top: 0; bottom: 0; left: 0; background: #FF4444; animation: dotsY 2.4s linear infinite; }
  .dot:nth-child(3) { left: 0; right: 0; top: 0; background: #FFBB33; animation: dotsX 2.4s linear infinite; }
  .dot:nth-child(4) { top: 0; bottom: 0; right: 0; background: #99CC00; animation: dotsY 2.4s linear infinite; }
  .dot:nth-child(5) { left: 0; right: 0; bottom: 0; background: #33B5E5; animation: dotsX 2.4s linear infinite; }

  @keyframes rotate {
    0% { transform: rotate( 0 ); }
    10% { width: 24px; height: 24px;top:0;left: 0; }
    66% { width: 6px; height: 6px;top:9px;left:9px; }
    100%{ transform: rotate(360deg); width: 24px; height: 24px;top:0;left: 0; }
  }

  @keyframes dotsY {
    66% { opacity: .1; width: 6px; }
    77%{ opacity: 1; width: 0; }
  }
  @keyframes dotsX {
    66% { opacity: .1; height: 6px;}
    77%{ opacity: 1; height: 0; }
  }

  @keyframes flash {
    33% { opacity: 0; border-radius: 0%; }
    55%{ opacity: .6; border-radius: 100%; }
    66%{ opacity: 0; }
  }
  /*loadingAnimate end*/

  .microLoading{
    width: 100%;
    height: 24px;
  }
  .microLoading .loadingBoard{
    overflow: hidden;
  }
  .microLoading .loadingBoard .loadingIcon{
    width: 24px;
    height: 24px;
    float: left;
    margin-right: 10px;
    position: relative;
  }
  .microLoading .loadingBoard .loadingIcon .container1 > div,
  .microLoading .loadingBoard .loadingIcon .container2 > div,
  .microLoading .loadingBoard .loadingIcon .container3 > div{
    background-color: #3dcca6;
  }
  .microLoading .loadingBoard .loadingTip{
    font-size: 14px;
    line-height: 24px;
    color: #666;
    margin-right: 10px;
    float: left;
  }
  .microLoading .loadingBoard .loadingBar{
    height: 6px;
    width: 100px;
    margin-top: 9px;
    background-color: #d6d7e6;
    margin-right: 10px;
    float: left;
  }
  .microLoading .loadingBoard .loadingBar .currentRate{
    background-color: #3dcca6;
    height: 100%;
  }
  .microLoading .loadingBoard .loadingCancel{
    font-size: 14px;
    line-height: 24px;
    color: #3399ff;
    float: left;
    cursor: pointer;
  }

  /*region dark theme*/

  .dark .loadingBoard .loadingTip{
    color: #8b90b3;
  }
  .dark .loadingBoard .loadingBar{
    background-color: #1a1827;
  }
  .dark .loadingBoard .loadingBar .currentRate{
    background-color: #3dcca6;
  }
  .dark .loadingBoard .loadingCancel{
    color: #3dcca6;
  }

  /*endregion*/
</style>
