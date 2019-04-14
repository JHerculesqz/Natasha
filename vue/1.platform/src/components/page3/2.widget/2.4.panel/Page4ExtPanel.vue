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
              <button v-on:click="expandBottom">expand</button>
              <button v-on:click="foldBottom">fold</button>
              <marvel-bottom-ext-panel
                ref="ref0"
                height="100"
                show="false"
                canDrag="true"
                @onExpandBtnClick="onExpandBtnClick1">
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
  height="100"
  show="true"
  canDrag="true"&gt;
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
              <button v-on:click="expandLeft" style="float: right">expand</button>
              <button v-on:click="foldLeft" style="float: right">fold</button>
              <marvel-left-ext-panel
                ref="ref1"
                width="100"
                show="true"
                canDrag="true"
                @onExpandBtnClick="onExpandBtnClick2">
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
  width="100"
  show="true"
  canDrag="true"&gt;
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
              <button v-on:click="expandRight">expand</button>
              <button v-on:click="foldRight">fold</button>
              <marvel-right-ext-panel
                ref="ref2"
                width="100"
                show="true"
                canDrag="true"
                @onExpandBtnClick="onExpandBtnClick3">
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
                  &lt;marvel-right-ext-panel
                    width="100"
                    show="true"
                    canDrag="true"&gt;
                  &lt;div slot="content" style="color: #fff"&gt;hello world&lt;/div&gt;
          &lt;/marvel-right-ext-panel&gt;
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
  import MarvelBottomExtPanel from "@/walle/widget/extPanel/MarvelBottomExtPanel";
  import MarvelLeftExtPanel from "@/walle/widget/extPanel/MarvelLeftExtPanel";
  import MarvelRightExtPanel from "@/walle/widget/extPanel/MarvelRightExtPanel";

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
        }]
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
      expandBottom: function () {
        this.$refs.ref0.expand(true);
      },
      foldBottom: function () {
        this.$refs.ref0.expand(false);
      },
      expandLeft: function () {
        this.$refs.ref1.expand(true);
      },
      foldLeft: function () {
        this.$refs.ref1.expand(false);
      },
      expandRight: function () {
        this.$refs.ref2.expand(true);
      },
      foldRight: function () {
        this.$refs.ref2.expand(false);
      },
      onExpandBtnClick1: function (bShow) {
        console.log(bShow);
      },
      onExpandBtnClick2: function (bShow) {
        console.log(bShow);
      },
      onExpandBtnClick3: function (bShow) {
        console.log(bShow);
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
    height: 100%;
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
