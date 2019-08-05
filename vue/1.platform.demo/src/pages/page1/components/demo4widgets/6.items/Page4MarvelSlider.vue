<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelSlider</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="padding-top: 30px; padding-left: 60px;box-sizing: border-box">
              <marvel-slider v-bind="sliderData"
                             ref="ref4slider"
                             @dragEnd="dragEnd"></marvel-slider>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="padding-top: 30px; padding-left: 60px;box-sizing: border-box">
              <marvel-slider v-bind="sliderData"
                             ref="ref4slider"
                             @dragEnd="dragEnd"></marvel-slider>
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
      <marvel-i-frame ref="page4MarvelSliderIFrame" id="page4MarvelSliderIFrame" src="static/jsdoc/module-MarvelSlider.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelSlider from "~~/widget/slider/MarvelSlider";

  export default {
    name: 'page4MarvelSlider',
    components: {
      MarvelSlider,
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
        //#endregion
        //#region custom data
        sliderData:{
          value:[1,55],
          width:8,
          height:200,
          dotSize:12,
          min:0,
          max:100,
          debug: true,
          reverse:false,
          tooltip:"always",
          formatter:"{value} M",
          enableCross: false,
          mergeFormatter: "{value1} M ~ {value2} M",
          direction:"vertical",
          clickable: false,
          bgStyle: {
            backgroundColor: "#00b050",
            boxShadow:"inset 0.5px, 0.5px 3px 1px rgba(0,0,0,0.36)",
            borderRadius:"5px"
          },
          tooltipStyle: [
            {
              backgroundColor:"#00b050",
              borderColor:"#00b050"
            },{
              backgroundColor:"#d78b3d",
              borderColor:"#d78b3d"
            }
          ],
          processEndStyle: {
            backgroundColor: "#c00000",
            borderRadius:"5px"
          },
          processStyle: {
            backgroundColor:"#d78b3d",
          }
        }
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
        this.$refs.page4MarvelSliderIFrame.setIframe4DemoPage();
      },

      //#endregion
      
      dragEnd: function (newValue) {
        console.log(newValue);
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
