<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">用户菜单控件</div>
    <div class="describe">
      xx
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">用户菜单</div>
    <div class="describe">
      用户菜单
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="chart">
              <div style="width: 500px; height: 350px;">
                <marvel-menu-drop-down :menus="menus"
                                       height="50px"
                                       v-on:clickSubMenu="clickSubMenu"></marvel-menu-drop-down>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
&lt;marvel-menu-drop-down :menus="menus"
                       height="50px"
                       v-on:clickSubMenu="clickSubMenu"&gt;&lt;/marvel-menu-drop-down&gt;
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
  import MarvelMenuDropDown from "@/walle/widget/menudropdown/MarvelMenuDropDown";
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";

  export default {
    components: {
      MarvelMenuDropDown,
      MarvelTab,
      MarvelTabItem
    },
    name: 'page4MenuDropDown',
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
        //#region Custom data
        menus: {
          mainMenu: {
            icon: "icon-user",
            label: "s00290253"
          },
          subMenu: [{
            icon: "icon-user",
            label: "我的工作台"
          }, {
            icon: "icon-user",
            label: "日志"
          }, {
            icon: "icon-user",
            label: "上次打开"
          }, {
            icon: "icon-user",
            label: "我的意见"
          }, {
            icon: "icon-user",
            label: "English"
          }, {
            icon: "icon-user",
            label: "注销"
          }]
        }
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    beforeDestroy: function () {
    },
    methods: {
      //#region inner
      clickSubMenu: function (strLabel) {
        alert(strLabel);
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
  .showArea {
    width: 100%;
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
    height: 250px;
  }
  /*document custom style end*/
  /*custom style start*/
  .chart {
    height: 100%;
    overflow-y: scroll;
  }
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
