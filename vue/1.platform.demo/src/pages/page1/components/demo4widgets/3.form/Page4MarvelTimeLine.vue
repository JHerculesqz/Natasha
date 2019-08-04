<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelTimeLine</div>
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
            <div style="width:100%; height: 100%;">
              <MarvelTimeLine :title="title" :items="items"></MarvelTimeLine>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelTimeLine.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelTimeLine from '^/widget/timeline/MarvelTimeLine'
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelTimeLine',
    components: {
      MarvelTimeLine,
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
        title: 'Fast UI大事记',
        items: [
          {
            left: {
              title: 'Success',
              content: '2012-5-1'
            },
            status: '0',
            right: {
              title: '横空出世',
              content: 'Fast UI开源项目启动'
            }
          },
          {
            left: {
              title: 'Fail',
              content: '2013-5-1'
            },
            status: '1',
            right: {
              title: '项目解体',
              content: '由于遇到全球经济危机，项目组由于资金链断裂，项目组创始人落魄宣布项目组解散'
            }
          },
          {
            left: {
              title: 'Success',
              content: '2014-5-1'
            },
            status: '0',
            right: {
              title: '出任CEO',
              content: '项目创始人出任Google大中华区总裁'
            }
          },
          {
            left: {
              title: 'Fail',
              content: '2015-5-1'
            },
            status: '1',
            right: {
              title: '牢狱之灾',
              content: '出任Google大中华区总裁项目组创始人，最近被媒体爆料出与xxx女明星的绯闻。Google发表声明称此行为严重影响了Google的全球形象，解除项目创始人的总裁职务，同时由于' +
                '触犯了公司的法规，Google将起诉该项目创始人'
            }
          }
        ]
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
        this.$refs.IFrame.setIframe4DemoPage();
      },

      //#endregion

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
