<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Accordion</div>
    <div class="describe">
      According控件
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Accordion</div>
    <div class="describe">
      According控件是可以在一个页面中显示多个panel面板，支持2层菜单结构，子菜单可折叠或展开，面板可折叠最小化。
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 180px;height:100%">
              <marvel-accordion isFolder="false" hasShadow="true"
                                title="abc" titleIcon="icon-calculator"
                                defaultSelectLabel="item1"
                                :items="items"></marvel-accordion>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-accordion isFolder="false" hasShadow="true"
                  title="abc" titleIcon="icon-calculator"
                  defaultSelectLabel="item1"
                  :items="items"&gt;&lt;/marvel-accordion&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">Accordion2</div>
    <div class="describe">
      According2
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 120px;height:100%;">
              <marvel-accordion2 v-bind:items="items2"
              v-on:onClickItem="onClickItem"
              v-on:onClickSubItem="onClickSubItem"></marvel-accordion2>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-accordion2 v-bind:items="items2" theme="dark"&gt;&lt;/marvel-accordion2&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">Accordion3</div>
    <div class="describe">
      According3
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 200px;height:100%;">
              <marvel-accordion3 :items="items3" title="fuck"
                                 v-on:onClickItem="onClickItem"></marvel-accordion3>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">

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
  import MarvelAccordion from "@/walle/widget/accordion/MarvelAccordion";
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelAccordion2 from "@/walle/widget/accordion/MarvelAccordion2";
  import MarvelAccordion3 from "@/walle/widget/accordion/MarvelAccordion3";

  export default {
    name: 'page4Accordion',
    components: {
      MarvelAccordion3,
      MarvelAccordion2,
      MarvelAccordion,
      MarvelTab,
      MarvelTabItem
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
        tabItems3: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        items: [{
          label: "item1",
          icon: "icon-office",
          expand: false,
          subItems: [{
            label: "subItem1"
          }, {
            label: "subItem2"
          }]
        }, {
          label: "item2",
          icon: "icon-office"
        }],
        items2: [{
          label: "完整路径",
          icon: "icon-podcast",
          fold: true,
          children: [{
            label: "路由信息",
            active: true
          }, {
            label: "业务局向"
          }]
        }, {
          label: "不完整路径",
          icon: "icon-feed"
        }, {
          label: "离散交叉",
          icon: "icon-mic"
        }],
        items3:[{
          active: true,
          label: "方案1"
        }, {
          active: false,
          label: "方案2"
        }, {
          active: false,
          label: "方案3"
        }]
        //#endregion
      }
    },
    methods: {
      //#region inner
      onClickItem: function(oItem){
        alert(oItem.label);
      },
      onClickSubItem: function(oItem, oSubItem){
        alert(oItem.label + " " + oSubItem.label);
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
  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
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
