<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">主菜单</div>
    <div class="describe">
      主菜单
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">主菜单</div>
    <div class="describe">
      主菜单
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <marvel-menu :items="items"
                         v-on:menuItemClick="menuItemClick"
                         v-on:subMenuItemClick="subMenuItemClick"></marvel-menu>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-menu :items="items"&gt;&lt;/marvel-menu&gt;
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
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelMenu from "@/walle/widget/menu/MarvelMenu"

  export default {
    name: 'page4Menu',
    components: {
      MarvelTabItem,
      MarvelTab, MarvelMenu
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
        items: [{
          label: "menu1",
          groups:[{
            name: "group1",
            sessions: [{
              label: "拓扑",
              items: [{
                label: "拓扑管理",
                onClick: function(){
                  alert("拓扑管理");
                }
              }, {
                label: "IP拓扑管理",
                onClick: function(){
                  alert("IP拓扑管理");
                }
              }]
            }, {
              label: "性能管理",
              items: [{
                label: "模板管理",
                onClick: function(){
                  alert("模板管理");
                }
              }, {
                label: "任务管理",
                onClick: function(){
                  alert("任务管理");
                }
              }]
            }]
          }, {
            name: "group2",
            sessions: [{
              label: "监视",
              items: [{
                label : "KPI监视",
                onClick: function(){
                  alert("IP拓扑管理");
                }
              }, {
                label : "GDP监视",
                onClick: function(){
                  alert("GDP监视");
                }
              }]
            }, {
              label: "设置",
              items: [{
                label: "用户设置",
                onClick: function(){
                  alert("用户设置");
                }
              }, {
                label: "系统设置",
                onClick: function(){
                  alert("系统设置");
                }
              }]
            }]
          }]
        }, {
          label: "menu2",
          groups: [{
            name: "group1",
            sessions: [{
              label: "拓扑",
              items: [{
                label: "拓扑管理",
                onClick: function () {
                  alert("拓扑管理");
                }
              }, {
                label: "IP拓扑管理",
                onClick: function () {
                  alert("IP拓扑管理");
                }
              }]
            }, {
              label: "性能管理",
              items: [{
                label: "模板管理",
                onClick: function () {
                  alert("模板管理");
                }
              }, {
                label: "任务管理",
                onClick: function () {
                  alert("任务管理");
                }
              }]
            }]
          }, {
            name: "group2",
            sessions: [{
              label: "监视",
              items: [{
                label: "KPI监视",
                onClick: function () {
                  alert("IP拓扑管理");
                }
              }, {
                label: "GDP监视",
                onClick: function () {
                  alert("GDP监视");
                }
              }]
            }, {
              label: "设置",
              items: [{
                label: "用户设置",
                onClick: function () {
                  alert("用户设置");
                }
              }, {
                label: "系统设置2",
                onClick: function () {
                  alert("系统设置2");
                }
              }]
            }]
          }]
        }]
        //#endregion
      }
    },
    methods: {
      //#region inner
      menuItemClick: function (oMenuItem) {
        alert(oMenuItem.label);
      },
      subMenuItemClick: function (oMenuItem, oGroup, oSession, oSubItem) {
        alert("oMenuItem: " + oMenuItem.label + ",oGroup:" + oGroup.label +
          ",oSession:" + oSession.label + ",oSubItem:" + oSubItem.label);
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
  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 250px;
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
