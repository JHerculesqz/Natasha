<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelLazyLoadTree</div>
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
            <button @click="expandNode4LazyNodeTree(lazyLoadTreeData[2])">expandNode9</button>
            <button @click="folderNode4LazyNodeTree(lazyLoadTreeData[2])">folderNode9</button>
            <div class="treeArea">
              <marvel-lazy-load-tree
                :treeData="lazyLoadTreeData"
                ref="lazyLoadTree"
                id="lazyLoadTree"
                @onTreeNodeClick="onLazyLoadTreeNodeClick"></marvel-lazy-load-tree>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelLazyLoadTree.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import StringUtilsEx from "^/component/str"
  import MarvelLazyLoadTree from "^/widget/tree/MarvelLazyLoadTree";

  export default {
    name: 'page4MarvelLazyLoadTree',
    components: {
      MarvelLazyLoadTree,
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
        //#region custom data\
        lazyLoadTreeData: [{
          icon:"icon-jar lazyTreeIconColor",
          id:StringUtilsEx.uuid(),
          name:"node1",
          subName:"node1",
          children:[{
            icon:"icon-jar lazyTreeIconColor",
            id:StringUtilsEx.uuid(),
            name:"node2",
            subName:"node2",
            children:[]
          },{
            icon:"icon-jar lazyTreeIconColor",
            id:StringUtilsEx.uuid(),
            name:"node3",
            subName:"node3",
            children:[]
          },{
            icon:"icon-jar lazyTreeIconColor",
            id:StringUtilsEx.uuid(),
            name:"node4",
            subName:"node4",
            children:[]
          },]
        },{
          icon:"icon-jar lazyTreeIconColor",
          id:StringUtilsEx.uuid(),
          name:"node5",
          subName:"node5",
          children:[{
            icon:"icon-jar lazyTreeIconColor",
            id:StringUtilsEx.uuid(),
            name:"node6",
            subName:"node6",
            children:[{
              icon:"icon-jar lazyTreeIconColor",
              id:StringUtilsEx.uuid(),
              name:"node7",
              subName:"node7",
              children:[]
            },{
              icon:"icon-jar lazyTreeIconColor",
              id:StringUtilsEx.uuid(),
              name:"node8",
              subName:"node8",
              children:[]
            },]
          }]
        },{
          icon:"icon-jar lazyTreeIconColor",
          id:StringUtilsEx.uuid(),
          name:"node9",
          subName:"node9",
          children:[{
            icon:"icon-jar lazyTreeIconColor",
            id:StringUtilsEx.uuid(),
            name:"node10",
            subName:"node10",
            children:[{
              icon:"icon-jar lazyTreeIconColor",
              id:StringUtilsEx.uuid(),
              name:"node11",
              subName:"node11",
              children:[{
                icon:"icon-jar lazyTreeIconColor",
                id:StringUtilsEx.uuid(),
                name:"node12",
                subName:"node12",
                children:[]
              }]
            }]
          }]
        },]
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

        this.$refs.lazyLoadTree.init();
      },

      //#endregion

      expandNode4LazyNodeTree: function(oNode){
        this.$refs.lazyLoadTree.expandAllNodes(oNode);
      },

      folderNode4LazyNodeTree: function(oNode){
        this.$refs.lazyLoadTree.folderAllNodes(oNode);
      },

      onLazyLoadTreeNodeClick: function (oNode) {
        console.log(oNode);
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

  .showAreaInner {
    height: 100%;
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
