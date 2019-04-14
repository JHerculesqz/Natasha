<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">List</div>
    <div class="describe">
      List
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">List</div>
    <div class="describe">
      List
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="height: 100%;">
            <!--2级DemoView start-->
            <marvel-list3 :listItems="listItems"
                          v-on:onBtnClick4List="onBtnClick4List"></marvel-list3>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
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
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelList3 from "@/walle/widget/list/MarvelList3";

  export default {
    name: 'page4List3',
    components: {
      MarvelList3,
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
        listItems: [{
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/walle/list3.png",
          btnName: "添加",
        }, {
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/walle/list3.png",
          btnName: "添加",
        }, {
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/walle/list3.png",
          btnName: "添加",
        }, {
          title: "Test",
          desc: "你想说啥就说啥你想说啥就说啥你想说啥就说啥你想说啥就说啥",
          img: "/static/walle/list3.png",
          btnName: "添加",
        }]
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner
      onBtnClick4List: function (oListItem) {
        console.log(oListItem);
      },
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
