<template>
  <div class="page0" v-on:mousewheel="onMouseWheel">
    <section class="section-wrap">
      <transition name="fade">
        <div class="section section-1 page0_1" v-show="page0_1.show">
          <div class="title active">
            <div class="contArea">
              <p class="tit level1">{{ page0_1.title }}</p >
              <p class="tit" v-for="strContent in page0_1.contentLst">{{ strContent }}</p >
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="section section-2 page0_2" v-show="page0_2.show">
          <div class="title active">
            <div class="contArea">
              <p class="tit level2">{{ page0_2.subTitle }}</p >
              <p class="tit level1">{{ page0_2.title }}</p >
              <p class="tit" v-for="strContent in page0_2.contentLst">{{ strContent }}</p >
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="section section-3 page0_3" v-show="page0_3.show">
          <div class="title active">
            <div class="contArea">
              <p class="tit level2">{{ page0_3.subTitle }}</p >
              <p class="tit level1">{{ page0_3.title }}</p >
              <p class="tit" v-for="strContent in page0_3.contentLst">{{ strContent }}</p >
            </div>
          </div>
        </div>
      </transition>
    </section>
    <div class="arrow"></div>
  </div>
</template>

<script>
  export default {
    name: 'page0',
    data: function() {
      return {
        //#region mouseWheel
        mouseWheelCount: 0,
        MOUSE_WHEEL_0: 0,
        MOUSE_WHEEL_1: 3,
        MOUSE_WHEEL_2: 6,
        MOUSE_WHEEL_3: 9,
        //#endregion
        //#region page0_1
        page0_1: {
          title: "Fuck UI 2.0",
          contentLst: ["统一：UI设计标准化",
            "美观：轻松接入UCD最新设计",
            "高效：快速原型开发，快速设计反馈"],
          show: true
        },
        //#endregion
        //#region page0_2
        page0_2: {
          subTitle: "Question",
          title: "WEB开发痛点",
          contentLst: ["如何保证界面风格统一",
            "如何快速吸收UCD的设计成果",
            "如何最小成本、最快速度进行设计试错"],
          show: false
        },
        //#endregion
        //#region page0_3
        page0_3: {
          subTitle: "Solution",
          title: "标准/组件/控件",
          contentLst: ["基于AUI 2.0标准",
            "基于VUE 2.0组件框架",
            "丰富的大数据展示控件"],
          show: false
        }
        //#endregion
      }
    },
    methods:{
      //#region inner
      onMouseWheel: function(evt){
        //1.update mouseWheelCount
        if(evt.wheelDelta < 0){
          if(this.mouseWheelCount < this.MOUSE_WHEEL_3){
            this.mouseWheelCount++;
          }
          else{
            this.mouseWheelCount = this.MOUSE_WHEEL_3;
          }
        }
        else{
          if(this.mouseWheelCount > this.MOUSE_WHEEL_0 ){
            this.mouseWheelCount--;
          }
          else{
            this.mouseWheelCount = this.MOUSE_WHEEL_0;
          }
        }

        //2.get iPageIndex
        if(this.mouseWheelCount <= this.MOUSE_WHEEL_1){
          this.page0_1.show = true;
          this.page0_2.show = false;
          this.page0_3.show = false;
        }
        else if(this.mouseWheelCount <= this.MOUSE_WHEEL_2
          && this.mouseWheelCount > this.MOUSE_WHEEL_1){
          this.page0_1.show = false;
          this.page0_2.show = true;
          this.page0_3.show = false;
        }
        else if(this.mouseWheelCount <= this.MOUSE_WHEEL_3
          && this.mouseWheelCount > this.MOUSE_WHEEL_2){
          this.page0_1.show = false;
          this.page0_2.show = false;
          this.page0_3.show = true;
        }
      }
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    }
  }
</script>

<style scoped>
  .page0{
    height: 100%;
  }
  .section-wrap{
    width:100%;
    height:100%;
    overflow:visible;
    transition:transform 1s cubic-bezier(0.86,0,0.03,1);
    -webkit-transition:-webkit-transform 1s cubic-bezier(0.86,0,0.03,1);}

  .section-wrap .section{
    position:relative;
    width:100%;
    height:100%;
    background-position:center center;
    background-repeat:no-repeat;
  }

  .section-wrap .section .title{
    width:100%;
    position:absolute;
    top:10%;
    color:#666;
    font-size:1.2em;
    text-align:right;
  }

  .section-wrap .section .title p{
    padding:0 4%;
    opacity:0
  }

  .section-wrap .section .title.active .tit{
    padding: 0;
    opacity:1;
    transform:translateY(-25px);
    -webkit-transform:translateY(-25px);
    transition:all 2s cubic-bezier(0.86,0,0.8,1);
    -webkit-transition:all 2s cubic-bezier(0.86,0,0.8,1);
  }
  .section-wrap .section .title .level1{
    width:100%;
    color:#4d4d4d;
    font-size:3.4em;
    text-align: right;
    margin: 0 0 20px 0;
  }
  .section-wrap .section .title .level2{
    width:100%;
    color:#666;
    font-size:1.0em;
    text-align: right;
    font-weight: bold;
    margin: 0;
  }

  .section-wrap .section-1{
    background: url("/static/walle/page0_1.svg")no-repeat right;
    background-position: 100% 20px;
    background-size: 50%;
  }
  .section-wrap .section-2{
    background: url("/static/walle/page0_2.svg")no-repeat right;
    background-position: 100% 50px;
    background-size: 50%;
  }
  .section-wrap .section-3{
    background: url("/static/walle/page0_3.svg")no-repeat right;
    background-size: 50%;
  }

  .section-wrap .section .title .contArea{
    position: absolute;
    left: 40px;
    top: 100px;
    width: 40%;
  }

  .arrow{
    opacity:1;
    animation:arrow 1s cubic-bezier(0.5,0,0.1,1) infinite;
    -webkit-animation:arrow 1s cubic-bezier(0.5,0,0.1,1) infinite;
    position:absolute;
    bottom:10px;
    left:50%;
    margin-left:-14px;
    width:28px;
    height:46px;
    border-radius:10px;
    -webkit-border-radius:8px;
    text-align:center;
    font-size:20px;
    color:#fff;
    border:1px solid #999;
    cursor:pointer;
    overflow:hidden;
  }
  .arrow:after{
    content: "";
    width: 4px;
    height: 8px;
    display: inline-block;
    position: absolute;
    top: 3px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.4);
    left: 12px;
    box-shadow: 0px 0px 0px 300px rgba(255,255,255,1);
  }
  .arrow:hover{ animation-play-state:paused;-webkit-animation-play-state:paused;}

  @keyframes arrow{ %0,%100{bottom:10px; opacity:1;} 50%{bottom:20px;} }

  @-webkit-keyframes arrow{ %0,%100{bottom:10px; opacity:1;} 50%{bottom:20px;} }

  .fade-enter-active, .fade-leave-active{ transition: all 0.5s ease }
  .fade-enter, .fade-leave-active{ opacity: 0  }
</style>
