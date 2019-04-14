<template>
  <div v-bind:id="id" class="marvelTopo"></div>
</template>

<script>
  export default {
    name: 'MarvelTopo',
    props: ["theme", "id"],
    data: function () {
      return {
        oTopo: undefined,
      };
    },
    methods: {
      //region event
      _onNodeClick: function (oNode, oEvent) {
        this.$emit("onNodeClick", oNode, oEvent);
      },
      _onGenerateNodeProp: function (oNode) {
        this.$emit("onGenerateNodeProp", oNode);
      },
      _onGenerateNodeTip: function (oNode) {
        this.$emit("onGenerateNodeTip", oNode);
      },
      _onNodeGroupClick: function (oNodeGroup, oEvent) {
        this.$emit("onNodeGroupClick", oNodeGroup, oEvent);
      },
      _onLinkGroupClick: function (oLinkGroup, oEvent) {
        this.$emit("onLinkGroupClick", oLinkGroup, oEvent);
      },
      _onLinkClick: function (oLink, oEvent) {
        this.$emit("onLinkClick", oLink, oEvent);
      },
      _onRightClick: function (oBuObj, iX, iY, oEvent) {
        this.$emit("onRightClick", oBuObj, iX, iY, oEvent);
      },
      _onGenerateLinkProp: function (oLink) {
        this.$emit("onGenerateLinkProp", oLink);
      },
      _onGenerateLinkTip: function (oLink) {
        this.$emit("onGenerateLinkTip", oLink);
      },
      _onPositionUpdate: function (bUpdate) {
        this.$emit("onPositionUpdate", bUpdate);
      },
      _onClick: function (oEvent) {
        this.$emit("onClick", oEvent);
      },
      _onAreaSelect: function (oSelectTopoData) {
        this.$emit("onAreaSelect", oSelectTopoData);
      },
      //endregion
      hadInit: function () {
        return this.oTopo ? true : false;
      },
      init: function (oAfterCallBack) {
        //#region resources
        var IMG_MAP = {
          nodeGroup: "static/topo/image/" + this.theme + "/nodeGroup1.svg",
          nodeGroupExpand: "static/topo/image/" + this.theme + "/nodeGroupExpand.svg",
          node: "static/topo/image/" + this.theme + "/node1.svg"
        };
        var THEME_DARK = {
          dark: {
            stage: {
              bgColor: "#272743",
              bgImg: "url('static/topo/image/dark/bg.png')"
            },
            node: {
              labelColor: "#fff",
              selectColor: "rgba(255,255,255,0.25)"
            },
            link: {
              labelColor: "#fff",
              selectColor: 'rgba(255,255,255,0.75)',
              linkColor: {
                linkType1: "#ababb5",
                linkType2: "#FF4c4c",
                linkType3: "#ff8833",
                linkType_fiber: "#22fcff", //光纤
                linkType_lu_1: "#8b90b3", //链路利用率=0
                linkType_lu_2: "#3dcca6", //链路利用率大于0小于等于50
                linkType_lu_3: "#ff8833", //链路利用率大于50小于等于80
                linkType_lu_4: "#a30000", //链路利用率大于80
                linkType_wf: "#006ad4", //正向工作
                linkType_fp: "#f464ac", //正向保护
                linkType_rw: "#3399ff", //反向工作
                linkType_rp: "#94c94f", //反向保护
                linkType_gf: "#8b2fe3" //分组连纤
              }
            }
          }
        };
        //#endregion
        //region Topo
        var self = this;
        var oEventOptions = {
          //region node
          callbackOnNodeClick: function (oNode, oEvent) {
            self._onNodeClick(oNode, oEvent);
          },
          callbackGenerateNodeProp: function (oNode) {
            self._onGenerateNodeProp(oNode);
          },
          callbackGenerateNodeTip: function (oNode) {
            self._onGenerateNodeTip(oNode);
          },
          //endregion
          //region nodeGroup
          callbackOnNodeGroupClick: function (oNodeGroup, oEvent) {
            self._onNodeGroupClick(oNodeGroup, oEvent);
          },
          //endregion
          //region link
          callbackOnLinkGroupClick: function (oLinkGroup, oEvent) {
            self._onLinkGroupClick(oLinkGroup, oEvent);
          },
          callbackOnLinkClick: function (oLink, oEvent) {
            self._onLinkClick(oLink, oEvent);
          },
          callbackGenerateLinkProp: function (oLink) {
            self._onGenerateLinkProp(oLink);
          },
          callbackGenerateLinkTip: function (oLink) {
            self._onGenerateLinkTip(oLink);
          },
          //endregion
          //region stage
          callbackOnClick: function (oEvent) {
            self._onClick(oEvent);
          },
          callbackOnRightClick: function (oBuObj, iX, iY, oEvent) {
            self._onRightClick(oBuObj, iX, iY, oEvent); //oBuObj为"background"表示点击的是背景
          },
          callbackOnPositionUpdate: function (bUpdate) {
            self._onPositionUpdate(bUpdate);
          },
          callbackOnAreaSelect: function (oSelectTopoData) {
            self._onAreaSelect(oSelectTopoData);
          }
          //endregion
        };
        var oTopo = new window.$.MarvelTopo();
        this.oTopo = oTopo;
        //init
        oTopo.Api.init(oTopo, {
          id: this.id,
          themeKey: this.theme,
          imgMap: IMG_MAP,
          themeSetting: THEME_DARK,
          eventOptions: oEventOptions,
        }, function () {
          oAfterCallBack();
        });
      },
      draw: function (oTopoData) {
        this.oTopo.Api.draw(this.oTopo, oTopoData);
      },
      expandAllNodeGroup: function () {
        this.oTopo.Api.expandAllNodeGroup(this.oTopo);
      },
      collapseAllNodeGroup: function () {
        this.oTopo.Api.collapseAllNodeGroup(this.oTopo);
      },
      expandAllLinkGroup: function () {
        this.oTopo.Api.expandAllLinkGroup(this.oTopo);
      },
      collapseAllLinkGroup: function () {
        this.oTopo.Api.collapseAllLinkGroup(this.oTopo);
      },
      selectNodesById: function (arrNodeId) {
        this.oTopo.Api.selectNodesById(this.oTopo, arrNodeId);
      },
      selectLinksById: function (arrLinkId) {
        this.oTopo.Api.selectLinksById(this.oTopo, arrLinkId);
      },
      unSelectAll: function () {
        this.oTopo.Api.unSelectAll(this.oTopo);
      },
      getTopoData: function () {
        return this.oTopo.Api.getTopoData(this.oTopo);
      },
      updateTopo: function (oTopoData) {
        this.oTopo.Api.updateTopo(this.oTopo, oTopoData);
      },
      createNode: function (oBuObj, oAfterCallback, bAutoCreate) {
        this.oTopo.Api.createNode(oBuObj, oAfterCallback, bAutoCreate, this.oTopo);
      },
      createNodeContinue: function (oBuObj, oAfterCallback) {
        this.oTopo.Api.createNodeContinue(oBuObj, oAfterCallback, this.oTopo);
      },
      savePosition: function () {
        this.oTopo.Api.savePosition(this.oTopo);
      },
      resetPosition: function () {
        this.oTopo.Api.resetPosition(this.oTopo);
      },
      isPositionUpdate: function () {
        return this.oTopo.Api.isPositionUpdate(this.oTopo);
      },
      setBestView: function () {
        this.oTopo.Api.setBestView(this.oTopo);
      },
      getSelectedData: function () {
        return this.oTopo.Api.getSelectedData(this.oTopo);
      },
      createLink: function (oAfterCallback) {
        this.oTopo.Api.createLink(this.oTopo, oAfterCallback);
      },
      getPosChangeTopoCache: function () {
        return this.oTopo.Api.getPosChangeTopoCache(this.oTopo);
      },
      createLinkContinue: function (oAfterCallback) {
        this.oTopo.Api.createLinkContinue(this.oTopo, oAfterCallback);
      },
      setConfig: function (oConfig) {
        this.oTopo.Api.setConfig(this.oTopo, oConfig);
      }
    }
  }
</script>

<style scoped>
  .marvelTopo {
    width: 100%;
    height: 100%;
  }
</style>
