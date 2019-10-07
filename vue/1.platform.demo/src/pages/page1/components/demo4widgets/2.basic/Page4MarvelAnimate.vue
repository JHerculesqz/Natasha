<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">动画效果</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->
    <div class="describe">
      MarvelAnimate 控件动画，内置三种动画效果，通过api进行调用
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div>
              <button v-on:click="onClick4SlideInLeft">slideInLeft</button>
              <button v-on:click="onClick4SlideInRight">slideInRight</button>
              <button v-on:click="onClick4FadeInAndFadeOut">fadeInAndFadeOut</button>
              <br>
              <br>
              <br>
              <marvel-animate ref="animate"><div>animate</div></marvel-animate>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div>
              <button v-on:click="onClick4SlideInLeft">slideInLeft</button>
              <button v-on:click="onClick4SlideInRight">slideInRight</button>
              <button v-on:click="onClick4FadeInAndFadeOut">fadeInAndFadeOut</button>
              <br>
              <br>
              <br>
              <marvel-animate ref="animate"><div>animate</div></marvel-animate>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="describe">
      vue 内置动画组件 transition，需要根据传入的name，以及vue提供的生命周期钩子，自行实现css来定义动画效果。
      <a href="https://cn.vuejs.org/v2/guide/transitions.html" target="_blank">view more</a>
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div>
              <button v-on:click="fade">fade</button>
              <br>
              <br>
              <br>
              <transition :name="vueAnimate" mode="out-in"><div v-show="showVueAnimateEle">animate</div></transition>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div>
              <button v-on:click="fade">fade</button>
              <br>
              <br>
              <br>
              <transition :name="vueAnimate" mode="out-in"><div v-show="showVueAnimateEle">animate</div></transition>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelAnimateIFrame" id="page4MarvelAnimateIFrame" src="static/jsdoc/module-MarvelAnimate.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelAnimate from "~~/widget/animate/MarvelAnimate";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelAnimate',
    components: {
      MarvelAnimate,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        vueAnimate:"",
        showVueAnimateEle: true
        //#endregion
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$refs.page4MarvelAnimateIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClick4SlideInLeft: function () {
        this.$refs.animate.doAnimate("slideInLeft");
      },
      onClick4SlideInRight: function () {
        this.$refs.animate.doAnimate("slideInRight");
      },
      onClick4FadeInAndFadeOut: function () {
        this.$refs.animate.doAnimate("fadeInAndFadeOut");
      },

      fade: function () {
        this.vueAnimate = "fade";
        this.showVueAnimateEle = false;
        var self = this;
        setTimeout(function () {
          self.showVueAnimateEle = true;
        },1000);
      },
      zoomInCenter: function () {
        this.vueAnimate = "el-zoom-in-center";
        this.showVueAnimateEle = false;
        var self = this;
        setTimeout(function () {
          self.showVueAnimateEle = true;
        },1000);
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
  /*document fix style start*/
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .title {
    color: #4d4d4d;
  }

  .level1 {
    font-size: 32px;
    line-height: 54px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 400px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
