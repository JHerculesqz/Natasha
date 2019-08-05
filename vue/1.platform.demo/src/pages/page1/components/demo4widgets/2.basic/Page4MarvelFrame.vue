<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelFrame</div>
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
            <div ref="parent" class="page4Frame hasMargin">
              <marvel-button size="small" label="setItemNum(20)"
                                     v-on:onClick="setItemNum(20)"></marvel-button>
              <marvel-button size="small" label="setItemNum(8)"
                                     v-on:onClick="setItemNum(8)"></marvel-button>
              <marvel-button size="small" label="setItemNum(3)"
                                     v-on:onClick="setItemNum(3)" style="clear:both;"></marvel-button>
              <marvel-frame ref="pageframe"></marvel-frame>
              <div v-for="(oBlock, index) in blockItems"
                   :class="itemStyle"
                   style="background-color: #d5d5d5; height: 32px;margin-bottom: 10px;" v-html="index"></div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div ref="parent" class="page4Frame hasMargin">
              <marvel-button size="small" label="setItemNum(20)"
                                     v-on:onClick="setItemNum(20)"></marvel-button>
              <marvel-button size="small" label="setItemNum(8)"
                                     v-on:onClick="setItemNum(8)"></marvel-button>
              <marvel-button size="small" label="setItemNum(3)"
                                     v-on:onClick="setItemNum(3)" style="clear:both;"></marvel-button>
              <marvel-frame ref="pageframe"></marvel-frame>
              <div v-for="(oBlock, index) in blockItems"
                   :class="itemStyle"
                   style="background-color: #d5d5d5; height: 32px;margin-bottom: 10px;" v-html="index"></div>
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
      <marvel-i-frame ref="page4MarvelFrameIFrame" id="page4MarvelFrameIFrame" src="static/jsdoc/module-MarvelFrame.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelFrame from '^/widget/frame/MarvelFrame';
  import MarvelButton from "^/widget/button/MarvelButton";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelFrame',
    components: {
      MarvelIFrame,
      MarvelFrame,
      MarvelButton,
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
        blockItems:[],
        itemStyle:"",
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
        this.$refs.page4MarvelFrameIFrame.setIframe4DemoPage();
      },

      //#endregion

      setItemNum: function (iNum) {
        this.blockItems = [];
        this.$nextTick(function () {
          for(var i = 0; i< iNum; i++){
            this.blockItems.push({
              item: i
            });
          }
        });

        var strParentW = parseInt(this.$refs.parent.offsetWidth);
        this.itemStyle = this.$refs.pageframe.getItemWAdaptToFixParent(iNum, 200, strParentW);
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

  .classCustom1{
    height:20px;
    background-color: #e8e8e8;
    margin-bottom: 10px;
  }
  .classCustom2{
    height:50px;
    background-color: #f7b57c;
    margin-bottom: 10px;
  }
  .classCustom3{
    height:20px;
    background-color: #5eff68;
    margin-bottom: 10px;
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
