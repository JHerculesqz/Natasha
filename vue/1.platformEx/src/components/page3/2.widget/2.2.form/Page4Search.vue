<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">搜索</div>
    <div class="describe">
      搜索控件
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">关键字搜索</div>
    <div class="describe">
      关键字搜索
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="panel">
              <MarvelSearch placeholder="请输入关键字..." v-on:search="search1"></MarvelSearch>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
                  &lt;MarvelSearch placeholder="请输入关键字..." v-on:search="search1"&gt;&lt;/MarvelSearch&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">分类搜索</div>
    <div class="describe">
      分类搜索
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="panel">
              <MarvelSearchWithDropDown placeholder="请输入关键字..." @search="search2"
                                        :selectItems="selectItems"></MarvelSearchWithDropDown>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
                  &lt;MarvelSearchWithDropDown placeholder="请输入关键字..." @search="search2"
                                            :selectItems="selectItems"&gt;&lt;/MarvelSearchWithDropDown&gt;
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
  import {MarvelSearch, MarvelSearchWithDropDown} from "marvel-fui2";
  //#endregion

  export default {
    components: {
      MarvelSearch,
      MarvelSearchWithDropDown,
      MarvelTab,
      MarvelTabItem
    },
    name:"Page4Search",
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
        tabItems2: [
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
        selectItems: [
          {
            label: "ip"
          },
          {
            label: "网元名称",
            selected: true
          },
          {
            label: "组名"
          }
        ]
        //#endregion
      }
    },
    methods: {
      //#region inner
      search1: function (strSearchValue) {
        console.log(strSearchValue);
      },
      search2: function (strSearchKey, strSearchValue) {
        console.log(strSearchKey);
        console.log(strSearchValue);
      }
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    }
  };
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
    height: 400px;
  }
  /*document custom style end*/
  /*custom style start*/
  .panel {
    padding: 10px;
    width: 400px;
    height: 50px;
  }
  /*custom style end*/
</style>
