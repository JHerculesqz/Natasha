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
            <button v-on:click="onClickGetTopoData">getTopoData</button>
            <button v-on:click="onClickUpdateTopo">updateTopo</button>
            <button v-on:click="onClickCreateNode">createNode</button>
            <button v-on:click="createNodeContinue">createNodeContinue</button>
            <button v-on:click="savePosition">savePosition</button>
            <button v-on:click="resetPosition">resetPosition</button>
            <button v-on:click="isPositionUpdate">isPositionUpdate</button>
            <button v-on:click="setBestView">setBestView</button>
            <button v-on:click="hideOrShowNode">hideOrShowNode</button>
            <button v-on:click="hideOrShowLink">hideOrShowLink</button>
            <button v-on:click="getSelectedData">getSelectedData</button>
            <button v-on:click="createLink">createLink</button>
            <button v-on:click="createLinkContinue">createLinkContinue</button>
            <button v-on:click="getPosChangeTopoCache">getPosChangeTopoCache</button>
            <button v-on:click="setAreaSelect1">设置框选网元</button>
            <button v-on:click="setAreaSelect2">设置框选链路</button>
            <button v-on:click="setAreaSelect3">设置框选网元和链路</button>
            <div style="width: 800px; height: 400px;">
              <marvel-topo ref="ref4Topo" id="topo" theme="dark"
                           v-on:onNodeClick="onNodeClick"
                           v-on:onGenerateNodeProp="onGenerateNodeProp"
                           v-on:onGenerateNodeTip="onGenerateNodeTip"
                           v-on:onNodeGroupClick="onNodeGroupClick"
                           v-on:onLinkGroupClick="onLinkGroupClick"
                           v-on:onLinkClick="onLinkClick"
                           v-on:onRightClick="onRightClick"
                           v-on:onGenerateLinkProp="onGenerateLinkProp"
                           v-on:onGenerateLinkTip="onGenerateLinkTip"
                           v-on:onPositionUpdate="onPositionUpdate"
                           v-on:onClick="onClick"
                           v-on:onAreaSelect="onAreaSelect"></marvel-topo>
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
    <!--2级 start-->
    <div class="title level2">TopoArbor</div>
    <div class="describe">
      TopoArbor
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 800px; height: 400px;">
              <marvel-topo-arbor ref="ref4TopoArbor"
                                 id="ref4TopoArbor"
                                 theme="dark">
              </marvel-topo-arbor>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
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
  import MarvelTopo from '@/walle/widget/topo/MarvelTopo';
  import MarvelTopoArbor from "../../../../walle/widget/topo/MarvelTopoArbor";

  export default {
    name: 'page4Topo',
    components: {
      MarvelTopoArbor,
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
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        createNodeId: "crateNodeId1",
        createLinkId: "createLinkId1"
        //#endregion
      }
    },
    mounted: function () {
      //#region custom
      this.initTopo();
      this.initTopoArbor();
      //#endregion
    },
    methods: {
      //#region inner

      //#region topo
      //#region init

      initTopo: function () {
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
            uiTip: "nodeGroup" + i,
            uiTitle: "nodeGroup" + i,
            uiExpandNode: false,
            uiExpandNodeWidth: 200,
            uiExpandNodeHeight: 200,
            uiNode: true,
            uiOpacity: 1,
            children: [{
              id: "node" + i + "_1",
              x: 50,
              y: 50,
              uiImgKey: "node",
              uiLabel: "node" + i + "_1",
              uiTip: "node" + i + "_1",
              uiTitle: "node" + i + "_1",
              uiChild: true,
              uiNode: true
            }, {
              id: "node" + i + "_2",
              x: 100,
              y: 100,
              uiImgKey: "node",
              uiLabel: "node" + i + "_2",
              uiTip: "node" + i + "_2",
              uiTitle: "node" + i + "_2",
              uiChild: true,
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
            uiTip: "node" + i + "\n" + "This is a tip demo",
            uiTitle: "node" + i,
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
            uiTip: "nodeBase" + i,
            uiTitle: "nodeBase" + i,
            uiNode: true
          };
          arrNode.push(oNode);
        }
        arrNode.push({
          id: "nodexxx",
          x: 0,
          y: 0,
          uiHide: false, //隐藏
          uiOpacity: 0.5,
          uiImgKey: "node",
          uiLabel: "nodexxx",
          uiTip: "nodexxx",
          uiTitle: "nodexxx",
          uiNode: true
        });
        oTopoData.nodes = arrNode;
        //#endregion

        //#endregion

        //#region link
        var arrLink = [];
        //region 网元之间的虚链路
        for (var i = 0; i < 3; i++) {
          var oLink = {
            id: "link" + i,
            srcNodeId: "nodeBase0",
            dstNodeId: "nodeBase1",
            uiLabelL: "nodeBase0",
            uiLabelM: "link" + i,
            uiTip: "link" + i,
            uiTitle: "link" + i,
            uiLabelR: "nodeBase1",
            uiLink: true,
            uiLinkColorKey: "linkType_fiber",
            uiLinkWidth: 3,
            uiDirection: 2,
            uiDash: [10, 5]
          };
          arrLink.push(oLink);
        }
        //endregion
        //region 网元之间的捆绑链路
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
            uiLabelM: "gLink" + i + "_" + i,
            uiTip: "gLink" + i + "_" + i,
            uiTitle: "gLink" + i + "_" + i,
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
            uiLabelM: "gLink" + i + "_" + (i + 1),
            uiTip: "gLink" + i + "_" + (i + 1),
            uiTitle: "gLink" + i + "_" + (i + 1),
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
            uiLabelM: "gLink" + i + "_" + (i + 2),
            uiTip: "gLink" + i + "_" + (i + 2),
            uiTitle: "gLink" + i + "_" + (i + 2),
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
            uiLabelM: "gLink" + i + "_" + (i + 3),
            uiTip: "gLink" + i + "_" + (i + 3),
            uiTitle: "gLink" + i + "_" + (i + 3),
            uiLabelR: "nodeBase" + (i + 1),
            uiLinkColorKey: "linkType3",
            uiLinkWidth: 3
          };

          arrLink.push(oLink1);
          arrLink.push(oLink2);
          arrLink.push(oLink3);
          arrLink.push(oLink4);
        }
        //endregion
        //region 站点内设备与站点外设备之间的链路
        for (var i = 100; i < 101; i++) {
          var oLink1 = {
            id: "gLink" + i + 0,
            srcNodeId: "nodeBase2",
            dstNodeId: "node1_1",
            uiLabelL: "nodeBase0",
            uiLabelM: "gLink" + i,
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
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
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
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
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
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
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
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
        //endregion
        //region 站点内设备与站点内的设备之间的链路
        for (var i = 200; i < 201; i++) {
          var oLink1 = {
            id: "gLink" + i + 0,
            srcNodeId: "node0_1",
            dstNodeId: "node1_1",
            uiLabelL: "nodeBase0",
            uiLabelM: "gLink" + i,
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
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
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
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
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
            uiLabelR: "nodeBase1",
            uiLinkExpand: false,
            uiLink: true,
            uiLinkGroupId: "groupLink" + i + 1,
            uiLinkColorKey: "linkType3",
            uiLinkWidth: 3,
            uiDirection: 2
          };
          var oLink4 = {
            id: "gLink" + i + 3,
            srcNodeId: "node0_2",
            dstNodeId: "node1_2",
            uiLabelL: "nodeBase0",
            uiLabelM: "gLink" + i,
            uiTip: "gLink" + i,
            uiTitle: "gLink" + i,
            uiLabelR: "nodeBase1",
            uiLinkExpand: false,
            uiLink: true,
            uiLinkGroupId: "groupLink" + i + 1,
            uiLinkColorKey: "linkType3",
            uiLinkWidth: 3,
            uiDirection: 1
          };
          arrLink.push(oLink1);
          arrLink.push(oLink2);
          arrLink.push(oLink3);
          arrLink.push(oLink4);
        }
        //endregion
        oTopoData.links = arrLink;
        //#endregion

        var self = this;
        this.$refs.ref4Topo.init(function () {
          self.$refs.ref4Topo.draw(oTopoData);
        });
      },

      //#endregion
      //region event
      onNodeClick: function (oNode, oEvent) {
        console.log(oNode);
      },
      onGenerateNodeProp: function (oNode) {
        if (oNode.children) {
          oNode.uiLabel = "Group:" + oNode.id;
        }
        else {
          oNode.uiLabel = oNode.id;
        }
      },
      onGenerateNodeTip: function (oNode) {
        oNode.uiTitle = oNode.id;
        if (oNode.children) {
          oNode.uiTip = "This is a nodeGroup";
        }
        else {
          oNode.uiTip = "This is a node";
        }
      },
      onNodeGroupClick: function (oNodeGroup, oEvent) {
        console.log("onNodeGroupClick");
        console.log(oNodeGroup);
      },
      onLinkGroupClick: function (oLinkGroup, oEvent) {
        console.log("onLinkGroupClick");
        console.log(oLinkGroup);
      },
      onLinkClick: function (oLink, oEvent) {
        console.log("onLinkClick");
        console.log(oLink);
      },
      onRightClick: function (oData, iX, iY, oEvent) {
        console.log("onRightClick");
        console.log(oData);
        console.log("x: " + iX + ",y: " + iY);
      },
      onGenerateLinkProp: function (oLink) {
        if (oLink.children) {
          oLink.uiLabelM = "Group: " + oLink.id;
          oLink.uiLinkColorKey = oLink.children[0].uiLinkColorKey;
        }
        else {
          oLink.uiLabelM = oLink.id;
        }
        oLink.uiLinkWidth = 3;
      },
      onGenerateLinkTip: function (oLink) {
        oLink.uiTitle = oLink.id;
        if (oLink.children) {
          oLink.uiTip = "This is a group link, has " + oLink.children.length + " links";
        }
        else {
          oLink.uiTip = "This is a link";
        }
      },
      onPositionUpdate: function (bUpdate) {
        console.log("onLinkClick");
        console.log("positionUpdate: " + bUpdate);
      },
      onClick: function (oEvent) {
        console.log("onClick");
      },
      onAreaSelect: function (oSelectTopoData) {
        console.log(oSelectTopoData);
      },
      //endregion
      //region test
      onClickExpandNodeGroup: function () {
        this.$refs.ref4Topo.expandAllNodeGroup();
      },
      onClickCollapseNodeGroup: function () {
        this.$refs.ref4Topo.collapseAllNodeGroup();
      },
      onClickExpandLinkGroup: function () {
        this.$refs.ref4Topo.expandAllLinkGroup();
      },
      onClickCollapseLinkGroup: function () {
        this.$refs.ref4Topo.collapseAllLinkGroup();
      },
      onClickSelectNodes: function () {
        this.$refs.ref4Topo.selectNodesById(["node0", "node1"]);
      },
      onClickSelectLinks: function () {
        this.$refs.ref4Topo.selectLinksById(["link0", "link1", "link2", "gLink1_2"]);
      },
      onClickGetTopoData: function () {
        var oTopoData = this.$refs.ref4Topo.getTopoData();
        console.log(oTopoData);
      },
      onClickUpdateTopo: function () {
        var oTopoData = this.$refs.ref4Topo.getTopoData();
        var oLink = {
          id: "link1000",
          srcNodeId: "nodeBase0",
          dstNodeId: "nodeBase1",
          uiLabelL: "nodeBase0",
          uiLabelM: "link1000",
          uiLabelR: "nodeBase1",
          uiLink: true,
          uiLinkColorKey: "linkType1",
          uiLinkWidth: 3
        };
        oTopoData.links.push(oLink);
        this.$refs.ref4Topo.updateTopo(oTopoData);
      },
      onClickCreateNode: function () {
        this.$refs.ref4Topo.createNode({
          id: this.createNodeId,
          uiImgKey: "node",
          uiLabel: this.createNodeId,
          uiNode: true
        }, function (oBuObj, bOk) {
          console.log("createNode: " + bOk);
        }, true);
        this.createNodeId += 1;
      },
      createNodeContinue: function () {
        let self = this;
        this.$refs.ref4Topo.createNodeContinue({
          id: this.createNodeId,
          uiImgKey: "node",
          uiLabel: this.createNodeId,
          uiNode: true
        }, function (oBuObj, bOk) {
          if (bOk) {
            var oTopoData = self.$refs.ref4Topo.getTopoData();
            var oNode = {
              id: self.createNodeId + "_" + Math.random() * 100,
              uiImgKey: "node",
              uiLabel: self.createNodeId,
              x: oBuObj.x,
              y: oBuObj.y,
              uiNode: true
            };
            oTopoData.nodes.push(oNode);
            self.$refs.ref4Topo.updateTopo(oTopoData);
          }
        });
        self.createNodeId += 1;
      },
      savePosition: function () {
        this.$refs.ref4Topo.savePosition();
      },
      resetPosition: function () {
        this.$refs.ref4Topo.resetPosition();
      },
      isPositionUpdate: function () {
        var bUpdate = this.$refs.ref4Topo.isPositionUpdate();
        console.log(bUpdate);
      },
      setBestView: function () {
        this.$refs.ref4Topo.setBestView();
      },
      hideOrShowNode: function () {
        var oTopoData = this.$refs.ref4Topo.getTopoData();
        oTopoData.nodes.forEach(function (oNode, index) {
          if (oNode.id == "nodeBase2") {
            if (oNode.uiHide == undefined) {
              oNode.uiHide = true;
            }
            else {
              oNode.uiHide = !oNode.uiHide;
            }
          }
        });
        this.$refs.ref4Topo.updateTopo(oTopoData);
      },
      hideOrShowLink: function () {
        var oTopoData = this.$refs.ref4Topo.getTopoData();
        oTopoData.links.forEach(function (oLink, index) {
          if (oLink.id == "link0") {
            if (oLink.uiHide == undefined) {
              oLink.uiHide = true;
            }
            else {
              oLink.uiHide = !oLink.uiHide;
            }
          }
        });
        this.$refs.ref4Topo.updateTopo(oTopoData);
      },
      getSelectedData: function () {
        var oData = this.$refs.ref4Topo.getSelectedData();
        console.log(oData);
      },
      createLink: function () {
        var self = this;
        this.$refs.ref4Topo.createLink(function (bSuccessful, oSrcNode, oDstNode) {
          if (bSuccessful) {
            var oTopoData = self.$refs.ref4Topo.getTopoData();
            var oLink = {
              id: self.createLinkId,
              srcNodeId: oSrcNode.id,
              dstNodeId: oDstNode.id,
              uiLabelL: "nodeBase0",
              uiLabelM: self.createLinkId,
              uiLabelR: "nodeBase1",
              uiLink: true,
              uiLinkColorKey: "linkType_lu_2",
              uiLinkWidth: 3
            };
            oTopoData.links.push(oLink);
            self.$refs.ref4Topo.updateTopo(oTopoData);
            self.createLinkId += 1;
          }
        });
      },
      createLinkContinue: function () {
        let self = this;
        this.$refs.ref4Topo.createLinkContinue(function (bSuccessful, oSrcNode, oDstNode) {
          if (bSuccessful) {
            var oTopoData = self.$refs.ref4Topo.getTopoData();
            var oLink = {
              id: self.createLinkId,
              srcNodeId: oSrcNode.id,
              dstNodeId: oDstNode.id,
              uiLabelL: "nodeBase0",
              uiLabelM: self.createLinkId,
              uiLabelR: "nodeBase1",
              uiLink: true,
              uiLinkColorKey: "linkType_lu_2",
              uiLinkWidth: 3
            };
            oTopoData.links.push(oLink);
            self.$refs.ref4Topo.updateTopo(oTopoData);
            self.createLinkId += 1;
          }
        });
      },
      getPosChangeTopoCache: function () {
        var oRes = this.$refs.ref4Topo.getPosChangeTopoCache();
        console.log(oRes);
      },
      setAreaSelect1: function () {
        this.$refs.ref4Topo.setConfig({areaSelect: "node"});
      },
      setAreaSelect2: function () {
        this.$refs.ref4Topo.setConfig({areaSelect: "link"});
      },
      setAreaSelect3: function () {
        this.$refs.ref4Topo.setConfig({areaSelect: "all"});
      },
      //endregion
      //#endregion

      //#region topoArbor

      initTopoArbor: function () {
        //init
        this.$refs.ref4TopoArbor.init(function (e) {
          console.log(e);
        });

        //setData
        var N = 100;
        var TYPES = ["container", "list", "key", "description", "leaf", "type", "leaf-list"];
        var arrNodes = [];
        for (var i = 0; i < N; i++) {
          arrNodes.push({
            id: 'n' + i,
            label: 'Node ' + i,
            x: Math.random(),
            y: Math.random(),
            size: 0 == i ? 3 : 1.2,
            type: TYPES[(Math.random() * 6 | 0)]
          });
        }
        var arrLinks = [];
        for (var i = 0; i < N; i++) {
          arrLinks.push({
            id: 'e' + i,
            source: 'n' + (Math.random() * N | 0),
            target: 'n' + (Math.random() * N | 0)
          });
        }
        this.$refs.ref4TopoArbor.setData(arrNodes, arrLinks);

        //updateData
        this.$refs.ref4TopoArbor.updateData(function (oNode) {
          if (oNode.type == "container") {
            oNode.color = "#243f6a";
          }
          else if (oNode.type == "list") {
            oNode.color = "#487ed4";
          }
          else if (oNode.type == "key") {
            oNode.color = "#6cbe3f";
          }
          else if (oNode.type == "description") {
            oNode.color = "#90fda9";
          }
          else if (oNode.type == "leaf") {
            oNode.color = "#b53d13";
          }
          else if (oNode.type == "type") {
            oNode.color = "#d97c7e";
          }
          else if (oNode.type == "leaf-list") {
            oNode.color = "#fdbbe8";
          }
        });
      },

      //#endregion

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
    height: 550px;
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
