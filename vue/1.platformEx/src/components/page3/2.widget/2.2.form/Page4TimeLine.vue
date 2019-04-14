<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">时间线</div>
    <div class="describe">
      从时间的维度串起一个完整的故事
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">时间线</div>
    <div class="describe">
      时间线
    </div>
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
            <!--2级CodeView start-->
              <pre>
                <code class="html">
                  &lt;MarvelTimeLine :title="title" :items="items"&gt;&lt;/MarvelTimeLine&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelTimeLine} from "marvel-fui2";
  //#endregion

  export default {
    components: {
      MarvelTimeLine,
      MarvelTab,
      MarvelTabItem
    },
    name:"Page4TimeLine",
    data: function () {
      return {
        //#region document data
        tabItems1: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
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
      };
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
  .level2 {
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
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
  .codeArea pre, .codeArea code {
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner {
    padding-top: 36px;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  /*document fix style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
    height: 500px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/
</style>
