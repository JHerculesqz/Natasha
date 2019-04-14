<template>
  <div>
    <div class="widgetShowSession">
      <!--1级 start-->
      <div class="title level1">ZTree</div>
      <div class="describe">
        ZTree
      </div>
      <!--1级 end-->
      <!--2级 start-->
      <div class="title level2">ZTree</div>
      <div class="describe">
        ZTree
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems1">
          <marvel-tab-item :isActive="tabItems1[0].isActive">
            <div class="showAreaInner">
              <!--2级DemoView start-->
              <marvel-z-tree theme="dark">
                <marvel-z-tree-item :model="treeData" theme="dark"
                                    v-on:onTreeNodeClick="onTreeNodeClick"></marvel-z-tree-item>
              </marvel-z-tree>
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
  </div>
</template>

<script>
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelZTree, MarvelZTreeItem} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4ZTree',
    components: {
      MarvelTabItem,
      MarvelTab,
      MarvelZTree,
      MarvelZTreeItem,
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
        treeData: {
          name: 'Root',
          icon: "icon-address-book",
          children: [{
            name: '1',
            icon: "icon-address-book"
          }, {
            name: '2',
            icon: "icon-address-book"
          }, {
            name: '3',
            icon: "icon-address-book",
            children: [{
              name: '4',
              icon: "icon-address-book"
            }, {
              name: '5',
              icon: "icon-address-book"
            }, {
              name: '6',
              icon: "icon-address-book"
            }]
          }]
        },
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner
      onTreeNodeClick: function(oTreeNode){
        alert(oTreeNode.name);
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
    height: 100%;
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
    height: 400px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/
</style>
