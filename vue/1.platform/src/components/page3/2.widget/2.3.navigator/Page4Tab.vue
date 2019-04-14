<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Tab</div>
    <div class="describe">
      页签，用于平行内容的展示
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Tab</div>
    <div class="describe">
      页签，用于平行内容的展示
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px;height: 400px;">
              <button @click="setActiveTabItem">setActiveTabItem</button>
              <button @click="setTabItemHide">hideItem Profile</button>
              <button @click="setTabItemShow">showItem Profile</button>
              <marvel-tab ref="ref4Tab" :tabItems="tabItems">
                <marvel-tab-item :isActive="tabItems[0].isActive">
                  1
                </marvel-tab-item>
                <marvel-tab-item :isActive="tabItems[1].isActive">
                  2
                </marvel-tab-item>
                <marvel-tab-item :isActive="tabItems[2].isActive">
                  3
                </marvel-tab-item>
                <marvel-tab-item :isActive="tabItems[3].isActive">
                  4
                </marvel-tab-item>
              </marvel-tab>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;div style="width: 500px;height: 400px;"&gt;
  &lt;marvel-tab :tabItems="tabItems"&gt;
    &lt;marvel-tab-item :isActive="tabItems[0].isActive"&gt;
      1
    &lt;/marvel-tab-item&gt;
    &lt;marvel-tab-item :isActive="tabItems[1].isActive"&gt;
      2
    &lt;/marvel-tab-item&gt;
    &lt;marvel-tab-item :isActive="tabItems[2].isActive"&gt;
      3
    &lt;/marvel-tab-item&gt;
    &lt;marvel-tab-item :isActive="tabItems[3].isActive"&gt;
      4
    &lt;/marvel-tab-item&gt;
  &lt;/marvel-tab&gt;
&lt;/div&gt;
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

  export default {
    name: 'page4Tab',
    components: {
      MarvelTabItem,
      MarvelTab
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
        tabItems: [{
          label: "Home",
          isActive: false
        }, {
          label: "Profile",
          isActive: true
        }, {
          label: "Messages",
          isActive: false
        }, {
          label: "Settings",
          isActive: false
        }]
        //#endregion
      }
    },
    methods: {
      //#region inner
      setActiveTabItem() {
        this.$refs.ref4Tab.setActiveTabItem("Messages");
      },
      setTabItemHide() {
        this.$refs.ref4Tab.setTabItemHide("Profile");
      },
      setTabItemShow() {
        this.$refs.ref4Tab.setTabItemShow("Profile");
      }
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    }
  }
</script>

<style>
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
    height: 500px;
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
