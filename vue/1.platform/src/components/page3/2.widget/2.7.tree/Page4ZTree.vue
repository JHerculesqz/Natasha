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
              <button @click="getCheckNodes">getCheckNodes</button>
              <button @click="getCheckLeafNodes">getCheckLeafNodes</button>
              <button @click="foldOrUnfoldNode">foldOrUnfoldNode</button>
              <button @click="getActiveNodes">getActiveNodes</button>
              <button @click="setIconColor">setIconColor</button>
              <div class="treeArea">
                <marvel-z-tree ref="tree"
                               :treeData="treeData"
                               :options="options"
                               @onCheckboxClick="onCheckboxClick"
                               @onTreeNodeClick="onTreeNodeClick">
                </marvel-z-tree>
              </div>
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
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelButton from "@/walle/widget/button/MarvelButton";
  import MarvelPrimaryButton from "@/walle/widget/button/MarvelPrimaryButton";
  import MarvelIconTxtButton from "@/walle/widget/button/MarvelIconTxtButton";
  import MarvelIconButton from "@/walle/widget/button/MarvelIconButton";
  import MarvelTxtButton from "@/walle/widget/button/MarvelTxtButton";
  import MarvelDropDownButton from "@/walle/widget/button/MarvelDropDownButton";
  import MarvelZTree from "@/walle/widget/tree/MarvelZTree";
  import MarvelZTreeItem from "@/walle/widget/tree/MarvelZTreeItem";

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
        options: {
          hasCheckbox: true,
          hasActiveStyle: true
        },
        treeData: [{
          name: 'Root1',
          subName:"'Root1SubName'",
          icon: "icon-address-book",
          open: true,
          show: true,
          check: true,
          children: [{
            name: 'ne5001',
            subName: 'ne5001',
            icon: "icon-address-book",
            check: true
          }, {
            name: 'ne5002',
            subName: 'ne5002',
            icon: "icon-address-book",
            open: true,
            check: false,
            children: [{
              name: 'ne50021',
              subName: 'ne50021',
              icon: "icon-address-book",
              iconColor: "#000000"
            }, {
              name: 'ne50022',
              subName: 'ne50022',
              icon: "icon-address-book"
            }]
          }, {
            name: 'ne5003',
            subName: 'ne5003',
            icon: "icon-address-book",
            open: false,
            children: [{
              name: 'ne50031',
              subName: 'ne50031',
              icon: "icon-address-book"
            }, {
              name: 'ne50032',
              subName: 'ne50032',
              icon: "icon-address-book"
            }, {
              name: 'ne50033',
              subName: 'ne50033',
              icon: "icon-address-book"
            }]
          }]
        }, {
          name: 'Root2',
          subName: 'Root2',
          icon: "icon-address-book",
          show: true,
          children: [{
            name: "ne6001",
            subName: "ne6001",
            icon: "icon-address-book"
          }, {
            name: "ne6002",
            subName: "ne6002",
            icon: "icon-address-book",
            show: false,
          }]
        }, {
          name: 'Root3',
          subName: 'Root3',
          icon: "icon-address-book",
          show: false,
          children: [{
            name: "ne7001",
            subName: "ne7001",
            icon: "icon-address-book"
          }]
        }],
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner
      onCheckboxClick: function (oTreeNode) {
        console.log(oTreeNode.name);
      },
      onTreeNodeClick: function (oTreeNode) {
        console.log(oTreeNode.name);
      },
      getCheckNodes: function () {
        var arrRes = this.$refs.tree.getCheckNodes();
        console.log(arrRes);
      },
      getCheckLeafNodes: function () {
        var arrRes = this.$refs.tree.getCheckLeafNodes();
        console.log(arrRes);
      },
      foldOrUnfoldNode: function () {
        this.treeData[0].open = !this.treeData[0].open;
      },
      getActiveNodes: function () {
        var arrRes = this.$refs.tree.getActiveNodes();
        console.log(arrRes);
      },
      setIconColor: function () {
        var arrCheckNodes = this.$refs.tree.getCheckLeafNodes();
        arrCheckNodes.forEach(function(oNode){
          oNode.iconColor = "#F7921E";
        });
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
    height: 500px;
  }

  .treeArea {
    height: calc(100% - 25px);
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
