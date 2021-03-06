<template>
  <div v-bind:id="id" class="marvelTopo"></div>
</template>

<script>
  import 'natasha-topo/css/MarvelTopo.css';

  window.keyboardJS = require('natasha-topo/lib/keyboard.min.js');
  require('natasha-topo/lib/konva.min.js');
  require('natasha-topo/lib/jquery-3.2.1.min.js');
  require('natasha-topo/js/_1_stage/MarvelTopoResource.js');
  require('natasha-topo/js/_1_stage/MarvelTopoStage.js');
  require('natasha-topo/js/_2_layer/MarvelTopoLayer.js');
  require('natasha-topo/js/_3_sprite/_1_node/MarvelTopoNodeGroup.js');
  require('natasha-topo/js/_3_sprite/_1_node/MarvelTopoNode.js');
  require('natasha-topo/js/_3_sprite/_2_link/MarvelTopoLinkGroup.js');
  require('natasha-topo/js/_3_sprite/_2_link/MarvelTopoLink.js');
  require('natasha-topo/js/_3_sprite/_3_box/MarvelTopoBoxGroup.js');
  require('natasha-topo/js/_3_sprite/_3_box/MarvelTopoBox.js');
  require('natasha-topo/js/_3_sprite/MarvelTopoSprite.js');
  require('natasha-topo/js/MarvelTopoApi.js');
  require('natasha-topo/js/MarvelTopoUtils.js');
  require('natasha-topo/js/MarvelTopo.js');

  /**
   *  MarvelTopo widget description
   *  @vuedoc
   *  @exports MarvelTopo
   */
  export default {
    name: 'MarvelTopo',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      theme: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        oTopo: undefined,
      };
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

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

      //#endregion
      //#region 3rd

      hadInit: function () {
        return this.oTopo ? true : false;
      },
      init: function (oAfterCallBack, oConfig) {
        //#region resources
        var bgImg = require("../../../../static/images/topo/image/dark/bg.png");
        var nodeGroupImgDark = require("../../../../static/images/topo/image/dark/nodeGroup1.svg");
        var nodeGroupImgDefault = require("../../../../static/images/topo/image/default/nodeGroup1.svg");
        var nodeGroupExpandImgDark = require("../../../../static/images/topo/image/dark/nodeGroupExpand.svg");
        var nodeGroupExpandImgDefault = require("../../../../static/images/topo/image/default/nodeGroupExpand.svg");
        var nodeImgDark = require("../../../../static/images/topo/image/dark/node1.svg");
        var nodeImgDefault = require("../../../../static/images/topo/image/default/node1.svg");

        var IMG_MAP = {
          nodeGroup: this.theme == "dark" ? nodeGroupImgDark : nodeGroupImgDefault,
          nodeGroupExpand: this.theme == "dark" ? nodeGroupExpandImgDark : nodeGroupExpandImgDefault,
          node: this.theme == "dark" ? nodeImgDark : nodeImgDefault
        };
        var THEME_DARK = {
          dark: {
            stage: {
              bgColor: "#272743",
              bgImg: "url(" + bgImg + ")"
            },
            node: {
              labelColor: "#fff",
              selectColor: "#FFFFFF"
            },
            link: {
              labelColor: "#fff",
              selectColor: '#ffff00',
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
        if (oConfig) {
          IMG_MAP = oConfig.imgConfig || IMG_MAP;
          THEME_DARK = oConfig.themeConfig || THEME_DARK;
        }
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
        var oTopo = new $.MarvelTopo();
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
      selectNodesById: function (arrNodeId, bCenter) {
        this.oTopo.Api.selectNodesById(this.oTopo, arrNodeId, bCenter);
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
      },
      exportPicture: function (strPicName) {
        this.oTopo.Api.exportPicture(this.oTopo, strPicName);
      },
      resize: function () {
        this.oTopo.Api.resize(this.oTopo);
      },
      getPointerPos4DrawInStage: function () {
        return this.oTopo.Api.getPointerPos4DrawInStage(this.oTopo);
      },
      existCreateNodeModel: function () {
        this.oTopo.Api.existCreateNodeModel(this.oTopo);
      },
      existCreateLinkModel: function () {
        this.oTopo.Api.existCreateLinkModel(this.oTopo);
      }

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .marvelTopo {
    width: 100%;
    height: 100%;
  }
</style>
