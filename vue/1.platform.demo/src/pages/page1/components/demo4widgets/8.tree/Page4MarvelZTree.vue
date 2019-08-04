<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelZTree</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

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
            <button @click="expandTree">expandTree</button>
            <button @click="folderTree">folderTree</button>
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
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button @click="getCheckNodes">getCheckNodes</button>
            <button @click="getCheckLeafNodes">getCheckLeafNodes</button>
            <button @click="foldOrUnfoldNode">foldOrUnfoldNode</button>
            <button @click="getActiveNodes">getActiveNodes</button>
            <button @click="setIconColor">setIconColor</button>
            <button @click="expandTree">expandTree</button>
            <button @click="folderTree">folderTree</button>
            <div class="treeArea">
              <marvel-z-tree ref="tree"
                             :treeData="treeData"
                             :options="options"
                             @onCheckboxClick="onCheckboxClick"
                             @onTreeNodeClick="onTreeNodeClick">
              </marvel-z-tree>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelZTree.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelZTree from "^/widget/tree/MarvelZTree";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelZTree',
    components: {
      MarvelZTree,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
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
            check: true,
            canClick: false
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
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$refs.IFrame.setIframe4DemoPage();
      },

      //#endregion

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
      },
      expandTree: function () {
        this.$refs.tree.expandAllNodes();
      },
      folderTree: function () {
        this.$refs.tree.folderAllNodes();
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

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
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
