<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Topo</div>
    <div class="describe">
      Topo
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Topo</div>
    <div class="describe">
      Topo
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClickExpandNodeGroup">expandNodeGroup</button>
            <button v-on:click="onClickCollapseNodeGroup">collapseNodeGroup</button>
            <button v-on:click="onClickExpandLinkGroup">expandLinkGroup</button>
            <button v-on:click="onClickCollapseLinkGroup">collapseLinkGroup</button>
            <button v-on:click="onClickSelectNodes">selectNodes</button>
            <button v-on:click="onClickSelectLinks">selectLinks</button>
            <div style="width: 800px; height: 340px;">
              <marvel-topo ref="ref4Topo" id="topo" theme="dark"></marvel-topo>
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
</template>

<script>
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelTopo} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Topo',
    components: {
      MarvelHight,
      MarvelTabItem,
      MarvelTab,
      MarvelTopo
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

        //#endregion
      }
    },
    mounted: function(){
      //#region custom
      var oTopoData = {
        nodes: [],
        nodeGroups: [],
        links: []
      };
      //#region node

      //#region 光站点
      var arrNodeGroup = [];
      for (var i = 0; i < 2; i++) {
        var iX = Math.random() * 400;
        var iY = Math.random() * 200;
        var oNodeGroup = {
          id: "nodeGroup" + i,
          x: iX,
          y: iY,
          uiImgKey: "nodeGroup",
          uiImgKey4Expand: "nodeGroupExpand",
          uiLabel: "nodeGroup" + i,
          uiExpandNode: false,
          uiExpandNodeWidth: 200,
          uiExpandNodeHeight: 200,
          uiNode: true,
          children: [{
            id: "node" + i + "_1",
            x: 50,
            y: 50,
            uiImgKey: "node",
            uiLabel: "node" + i + "_1",
            uiNode: true
          }, {
            id: "node" + i + "_2",
            x: 100,
            y: 100,
            uiImgKey: "node",
            uiLabel: "node" + i + "_2",
            uiNode: true
          }]
        };
        arrNodeGroup.push(oNodeGroup);
      }
      oTopoData.nodeGroups = arrNodeGroup;
      //#endregion

      //#region 网元
      var arrNode = [];
      for (var i = 0; i < 2; i++) {
        var iX = Math.random() * 400;
        var iY = Math.random() * 200;
        var oNode = {
          id: "node" + i,
          x: iX,
          y: iY,
          uiImgKey: "node",
          uiLabel: "node" + i,
          uiNode: true
        };
        arrNode.push(oNode);
      }
      for (var i = 0; i < 3; i++) {
        var iX = Math.random() * 400;
        var iY = Math.random() * 200;
        var oNode = {
          id: "nodeBase" + i,
          x: iX,
          y: iY,
          uiImgKey: "node",
          uiLabel: "nodeBase" + i,
          uiNode: true
        };
        arrNode.push(oNode);
      }
      oTopoData.nodes = arrNode;
      //#endregion

      //#endregion

      //#region link
      var arrLink = [];
      //#region 网元与网元之间的单条链路
      for (var i = 0; i < 3; i++) {
        var oLink = {
          id: "link" + i,
          srcNodeId: "nodeBase0",
          dstNodeId: "nodeBase1",
          uiLabelL: "nodeBase0",
          uiLabelM: "link" + i,
          uiLabelR: "nodeBase1",
          uiLink: true,
          uiLinkColorKey: "linkType1",
          uiLinkWidth: 3,
          uiDirection: 2,
          uiDash: [10, 5]
        };
        arrLink.push(oLink);
      }
      //#endregion

      //#region 网元与网元之间的捆绑链路
      for (var i = 0; i < 2; i++) {
        //oLink1和oLink2为一组
        var oLink1 = {
          id: "gLink" + i + "_" + i,
          srcNodeId: "nodeBase" + i,
          dstNodeId: "nodeBase" + (i + 1),
          uiLinkGroupId: "groupLink" + i + "_" + i,
          uiLink: true,
          uiLinkExpand: false,
          uiLabelL: "nodeBase" + i,
          uiLabelM: "link" + i,
          uiLabelR: "nodeBase" + (i + 1),
          uiLinkColorKey: "linkType2",
          uiLinkWidth: 3
        };
        var oLink2 = {
          id: "gLink" + i + "_" + (i + 1),
          srcNodeId: "nodeBase" + i,
          dstNodeId: "nodeBase" + (i + 1),
          uiLinkGroupId: "groupLink" + i + "_" + i,
          uiLink: true,
          uiLinkExpand: false,
          uiLabelL: "nodeBase" + i,
          uiLabelM: "link" + i,
          uiLabelR: "nodeBase" + (i + 1),
          uiLinkColorKey: "linkType2",
          uiLinkWidth: 3
        };
        //oLink3和oLink4为一组
        var oLink3 = {
          id: "gLink" + i + "_" + (i + 2),
          srcNodeId: "nodeBase" + i,
          dstNodeId: "nodeBase" + (i + 1),
          uiLinkGroupId: "groupLink" + i + "_" + (i + 1),
          uiLink: true,
          uiLinkExpand: false,
          uiLabelL: "nodeBase" + i,
          uiLabelM: "link" + i,
          uiLabelR: "nodeBase" + (i + 1),
          uiLinkColorKey: "linkType3",
          uiLinkWidth: 3
        };

        var oLink4 = {
          id: "gLink" + i + "_" + (i + 3),
          srcNodeId: "nodeBase" + i,
          dstNodeId: "nodeBase" + (i + 1),
          uiLinkGroupId: "groupLink" + i + "_" + (i + 1),
          uiLink: true,
          uiLinkExpand: false,
          uiLabelL: "nodeBase" + i,
          uiLabelM: "link" + i,
          uiLabelR: "nodeBase" + (i + 1),
          uiLinkColorKey: "linkType3",
          uiLinkWidth: 3
        };

        arrLink.push(oLink1);
        arrLink.push(oLink2);
        arrLink.push(oLink3);
        arrLink.push(oLink4);
      }
      //#endregion

      //#region 网元与光设备之间的捆绑链路
      for (var i = 100; i < 101; i++) {
        var oLink1 = {
          id: "gLink" + i + 0,
          srcNodeId: "nodeBase2",
          dstNodeId: "node1_1",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 0,
          uiLinkColorKey: "linkType2",
          uiLinkWidth: 3
        };
        var oLink2 = {
          id: "gLink" + i + 1,
          srcNodeId: "nodeBase2",
          dstNodeId: "node1_1",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 0,
          uiLinkColorKey: "linkType2",
          uiLinkWidth: 3
        };
        var oLink3 = {
          id: "gLink" + i + 2,
          srcNodeId: "nodeBase2",
          dstNodeId: "node1_2",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 1,
          uiLinkColorKey: "linkType3",
          uiLinkWidth: 3
        };
        var oLink4 = {
          id: "gLink" + i + 3,
          srcNodeId: "nodeBase2",
          dstNodeId: "node1_2",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 1,
          uiLinkColorKey: "linkType3",
          uiLinkWidth: 3
        };
        arrLink.push(oLink1);
        arrLink.push(oLink2);
        arrLink.push(oLink3);
        arrLink.push(oLink4);
      }
      //#endregion

      //#region 光设备与光设备之间的捆绑链路
      for (var i = 200; i < 201; i++) {
        var oLink1 = {
          id: "gLink" + i + 0,
          srcNodeId: "node0_1",
          dstNodeId: "node1_1",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 0,
          uiLinkColorKey: "linkType2",
          uiLinkWidth: 3
        };
        var oLink2 = {
          id: "gLink" + i + 1,
          srcNodeId: "node0_1",
          dstNodeId: "node1_1",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 0,
          uiLinkColorKey: "linkType2",
          uiLinkWidth: 3
        };
        var oLink3 = {
          id: "gLink" + i + 2,
          srcNodeId: "node0_2",
          dstNodeId: "node1_2",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 1,
          uiLinkColorKey: "linkType3",
          uiLinkWidth: 3
        };
        var oLink4 = {
          id: "gLink" + i + 3,
          srcNodeId: "node0_2",
          dstNodeId: "node1_2",
          uiLabelL: "nodeBase0",
          uiLabelM: "gLink" + i,
          uiLabelR: "nodeBase1",
          uiLinkExpand: false,
          uiLink: true,
          uiLinkGroupId: "groupLink" + i + 1,
          uiLinkColorKey: "linkType3",
          uiLinkWidth: 3
        };
        arrLink.push(oLink1);
        arrLink.push(oLink2);
        arrLink.push(oLink3);
        arrLink.push(oLink4);
      }
      //#endregion
      oTopoData.links = arrLink;
      //#endregion

      var self = this;
      this.$refs.ref4Topo.init(function(){
        self.$refs.ref4Topo.draw(oTopoData);
      });
      //#endregion
    },
    methods: {
      //#region inner
      onClickExpandNodeGroup: function(){
        this.$refs.ref4Topo.expandAllNodeGroup();
      },
      onClickCollapseNodeGroup: function(){
        this.$refs.ref4Topo.collapseAllNodeGroup();
      },
      onClickExpandLinkGroup: function(){
        this.$refs.ref4Topo.expandAllLinkGroup();
      },
      onClickCollapseLinkGroup: function(){
        this.$refs.ref4Topo.collapseAllLinkGroup();
      },
      onClickSelectNodes: function(){
        this.$refs.ref4Topo.selectNodesById(["node0", "node1"]);
      },
      onClickSelectLinks: function(){
        this.$refs.ref4Topo.selectLinksById(["link0", "link1", "link2"]);
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
    height: 450px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/
</style>
