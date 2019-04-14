<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">扩展面板</div>
    <div class="describe">
      扩展面板
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">下侧扩展面板</div>
    <div class="describe">
      下侧扩展面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <marvel-bottom-ext-panel
                theme="dark"
                height="100"
                show="false"
                canDrag="false">
                <div slot="content" style="color: #fff">hello world</div>
              </marvel-bottom-ext-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-bottom-ext-panel
  theme="dark"
  height="100"
  show="true"
  canDrag="false"&gt;
                  &lt;div slot="content" style="color: #fff"&gt;hello world&lt;/div&gt;
                &lt;/marvel-bottom-ext-panel&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">左侧扩展面板</div>
    <div class="describe">
      左侧扩展面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <marvel-left-ext-panel
                theme="dark"
                width="100"
                show="true"
                canDrag="false">
                <div slot="content" style="color: #fff">hello world</div>
              </marvel-left-ext-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-left-ext-panel
  theme="dark"
  width="100"
  show="true"
  canDrag="false"&gt;
                  &lt;div slot="content" style="color: #fff"&gt;hello world&lt;/div&gt;
                &lt;/marvel-left-ext-panel&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">右侧扩展面板</div>
    <div class="describe">
      右侧扩展面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <marvel-right-ext-panel
                theme="dark"
                width="100"
                show="true"
                canDrag="false">
                <div slot="content" style="color: #fff">hello world</div>
              </marvel-right-ext-panel>
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
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelBottomExtPanel, MarvelRightExtPanel, MarvelLeftExtPanel} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4ExtPanel',
    components: {
      MarvelRightExtPanel,
      MarvelLeftExtPanel,
      MarvelBottomExtPanel,
      MarvelTabItem,
      MarvelTab,
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

        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner

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
</style>
