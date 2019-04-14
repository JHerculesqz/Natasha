<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">GIS</div>
    <div class="describe">
      基于Leaflet实现的WebGIS
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Leaflet</div>
    <div class="describe">
      Leaflet
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="oTest4Map">test4Map(setCenter)</button>
            <button v-on:click="oTest4Map2">test4Map(showOrHide)</button>
            <button v-on:click="oTest4Map3">test4Map3(getDiffLst)</button>
            <button v-on:click="oTest4Marker">test4Marker</button>
            <button v-on:click="oTest4Circle">test4Circle</button>
            <button v-on:click="oTest4Group">test4Group(expandAllGroup)</button>
            <button v-on:click="oTest4Group2">test4Group(collapseAllGroup)</button>
            <button v-on:click="oTest4Group3">oTest4Group(delGroup)</button>
            <button v-on:click="oTest4Line">test4Line(delPolyline)</button>
            <div style="width: 100%;height: 500px;">
              <marvel-leaflet ref="ref0" id="gisMapId1"
                              v-on:onZoom="onZoom"
                              v-on:onClick="onClick"
                              v-on:onContextMenu="onContextMenu"
                              v-on:onNodeDblClick="onNodeDblClick"
                              v-on:onNodeDrag="onNodeDrag"
                              v-on:onNodeClick="onNodeClick"
                              v-on:onNodeGroupClick="onNodeGroupClick"
                              v-on:onLinkClick="onLinkClick"
                              v-on:onCircleDblclick="onCircleDblclick"></marvel-leaflet>
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
  import {MarvelLeaflet} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Leaflet',
    components: {MarvelTabItem,
      MarvelTab,MarvelLeaflet},
    data: function() {
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
        show: true,
        //#endregion
      }
    },
    mounted: function(){
      //#region custom

      //#region mock

      var arrNodes = [];
      var arrNodeGroups = [];
      var arrLinks = [];
      var oTopoData = {
        nodes: arrNodes,
        nodeGroups: arrNodeGroups,
        links: arrLinks
      };
      //#region node
      arrNodes.push({
        id: "marker1",
        x: 51.5,
        y: -0.09,
        uiType: "ne",
        uiImgUrl: "/static/gis/lib/images/node1.svg",
        uiImgWidth: 32,
        uiLabel: "marker1",
        uiTips: "<b>marker1</b><br>11111",
        uiDraggable: true,
        uiOpacity: 1
      });
      arrNodes.push({
        id: "marker2",
        x: 51.50344816877402,
        y: -0.09883403778076173,
        uiType: "ne",
        uiImgUrl: "/static/gis/lib/images/node1.svg",
        uiImgWidth: 32,
        uiLabel: "marker2",
        uiTips: "<b>marker2</b><br>11111",
        uiDraggable: true,
        uiOpacity: 1
      });
      //#endregion

      //#region nodeGroup
      arrNodeGroups.push({
        uiExpand: false,
        id: "site1",
        x: 51.49994457056707,
        y: -0.10597944259643556,
        uiType: "site",
        uiImgUrl: "/static/gis/lib/images/nodeGroup1.svg",
        uiImgWidth: 32,
        uiLabel: "site1",
        uiTips: "<b>site1</b><br>11111",
        uiOpacity: 1,
        r: 30,
        uiColor: "red",
        uiFillColor: "#f03",
        uiFillOpacity: 0.5,
        children:[{
          id: "site1_ne1",
          x: 51.49992987708078,
          y: -0.10618329048156738,
          uiType: "neInSite",
          uiImgUrl: "/static/gis/lib/images/node1.svg",
          uiImgWidth: 32,
          uiLabel: "site1_ne1",
          uiTips: "<b>site1_ne1</b><br>11111",
          uiDraggable: false,
          uiOpacity: 1
        }, {
          id: "site1_ne2",
          x: 51.49999332628028,
          y: -0.10580241680145265,
          uiType: "neInSite",
          uiImgUrl: "/static/gis/lib/images/node1.svg",
          uiImgWidth: 32,
          uiLabel: "site1_ne2",
          uiTips: "<b>site1_ne2</b><br>11111",
          uiDraggable: false,
          uiOpacity: 1
        }]
      });
      arrNodeGroups.push({
        uiExpand: false,
        id: "site2",
        x: 51.49894457056707,
        y: -0.10597944259643556,
        uiType: "site",
        uiImgUrl: "/static/gis/lib/images/nodeGroup1.svg",
        uiImgWidth: 32,
        uiLabel: "site2",
        uiTips: "<b>site2</b><br>11111",
        uiOpacity: 1,
        r: 30,
        uiColor: "red",
        uiFillColor: "#f03",
        uiFillOpacity: 0.5,
        children:[{
          id: "site2_ne1",
          x: 51.49892987708078,
          y: -0.10618329048156738,
          uiType: "neInSite",
          uiImgUrl: "/static/gis/lib/images/node1.svg",
          uiImgWidth: 32,
          uiLabel: "site2_ne1",
          uiTips: "<b>site2_ne1</b><br>11111",
          uiDraggable: false,
          uiOpacity: 1
        }, {
          id: "site2_ne2",
          x: 51.49899332628028,
          y: -0.10580241680145265,
          uiType: "neInSite",
          uiImgUrl: "/static/gis/lib/images/node1.svg",
          uiImgWidth: 32,
          uiLabel: "site2_ne2",
          uiTips: "<b>site2_ne2</b><br>11111",
          uiDraggable: false,
          uiOpacity: 1
        }]
      });
      //#endregion

      //#region link

      //#region 网元与网元

      arrLinks.push({
        id: "link1",
        srcNodeId: "marker1",
        dstNodeId: "marker2",
        uiType: "link",
        uiColor: "red",
        uiWeight: 3,
        uiOpacity: 1,
        uiDashArray: "5, 10",
        uiTips: "link1",
        uiDirection: 2
      });

      //#endregion

      //#region 网元与站点之间

      arrLinks.push({
        id: "link2",
        srcNodeId: "marker2",
        dstNodeId: "site1_ne1",
        uiType: "link",
        uiColor: "red",
        uiWeight: 3,
        uiOpacity: 1,
        uiDashArray: "5, 10",
        uiTips: "link2",
        uiDirection: 2
      });
      arrLinks.push({
        id: "link3",
        srcNodeId: "marker2",
        dstNodeId: "site1_ne2",
        uiType: "link",
        uiColor: "red",
        uiWeight: 3,
        uiOpacity: 1,
        uiDashArray: "5, 10",
        uiTips: "link2",
        uiDirection: 2
      });

      //#endregion

      //region 站点与站点之间

      arrLinks.push({
        id: "link4",
        srcNodeId: "site2_ne1",
        dstNodeId: "site1_ne1",
        uiType: "link",
        uiColor: "red",
        uiWeight: 3,
        uiOpacity: 1,
        uiDashArray: "5, 10",
        uiTips: "link2",
        uiDirection: 2
      });
      arrLinks.push({
        id: "link5",
        srcNodeId: "site2_ne2",
        dstNodeId: "site1_ne2",
        uiType: "link",
        uiColor: "red",
        uiWeight: 3,
        uiOpacity: 1,
        uiDashArray: "5, 10",
        uiTips: "link2",
        uiDirection: 2
      });

      //#endregion

      //#endregion

      //#endregion

      //init
      this.$refs.ref0.init(51.505, -0.09, 13, {
        hasZoomCtrl: true
      });
      //draw
      this.$refs.ref0.draw(oTopoData);
      //basicShape marker/circle/ploygon
      this.$refs.ref0.addMarker("marker3", 51.5, -0.08, "/static/gis/lib/images/node1.svg", 32, {
        id: "marker3",
        x: 51.5,
        y: -0.08,
        uiType: "ne",
        uiImgUrl: "/static/gis/lib/images/node1.svg",
        uiImgWidth: 32,
        uiLabel: "marker3",
        uiTips: "<b>marker3</b><br>11111",
        uiDraggable: true,
        uiOpacity: 1
      });
      this.$refs.ref0.addCircle("circle1", 51.5, -0.06, 30,{
        id: "circle1",
        x: 51.5,
        y: -0.08,
        r: 30,
        uiType: "circle",
        uiColor: "red",
        uiFillColor: "#f03",
        uiTips: "<b>circle1</b><br>11111",
        uiFillOpacity: 0.5
      });
      this.$refs.ref0.addPolygon("polygon1", [
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
      ], {
        id: "polygon1",
        points: [
          [51.509, -0.08],
          [51.503, -0.06],
          [51.51, -0.047]
        ],
        uiTips: "polygon1"
      });

      //#endregion
    },
    methods: {
      //#region inner
      onZoom: function (e) {
        console.log(e);
      },
      onClick: function(oPoint){
        console.log(oPoint);
      },
      onContextMenu: function (e) {
        console.log(e);
      },
      onNodeDblClick: function (e) {
        console.log(e);
      },
      onNodeDrag: function (e) {
        console.log(e);
      },
      onNodeClick: function(e){
        console.log(e);
      },
      onNodeGroupClick: function (e) {
        console.log(e);
      },
      onLinkClick: function (e) {
        console.log(e);
      },
      onCircleDblclick: function (e) {
        console.log(e);
      },
      oTest4Map: function () {
        this.$refs.ref0.setCenter(51.505, -0.09, 10);
      },
      oTest4Map2: function () {
        this.show = !this.show;
        this.$refs.ref0.showOrHide(this.show);
      },
      oTest4Map3: function () {
        var oResDiff = this.$refs.ref0.getDiffLst(
          ["marker2", "marker3", "marker4"],
          ["site", "ne"]);
        console.log(oResDiff);
      },
      oTest4Marker: function () {
        var self = this;

        this.$refs.ref0.delMarker("marker3");
        this.$refs.ref0.setImgUrl("marker1", "/static/gis/lib/images/nodeGroup1.svg", 32);
        this.$refs.ref0.setOpacity4Marker("marker1", 0.5);
        this.$refs.ref0.setPos4Marker("marker1", 51.502, -0.09);
        this.$refs.ref0.setTips4Marker("marker1", "fuck world!!");
        this.$refs.ref0.setBuObj4Marker("marker1", {a: 11});
        this.$refs.ref0.setHide4Marker("marker2", true);
        setTimeout(function () {
          self.$refs.ref0.setHide4Marker("marker2", false);
        }, 2000);
      },
      oTest4Circle: function () {
        this.$refs.ref0.delCircle("circle1");
      },
      oTest4Group: function (e) {
        this.$refs.ref0.expandAllGroup("site");
      },
      oTest4Group2: function (e) {
        this.$refs.ref0.collapseAllGroup("site");
      },
      oTest4Group3: function(e){
        this.$refs.ref0.delGroup("site1");
      },
      oTest4Line: function (e) {
        this.$refs.ref0.delPolyline("link1");
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
  .widgetShowSession{
    padding: 20px 100px;
    width:100%;
    box-sizing: border-box;
  }
  .title{
    color: #4d4d4d;
  }
  .level1{
    font-size: 32px;
    line-height: 54px;
  }
  .level2{
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
  }
  .describe{
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }
  .showArea{
    width:100%;
  }
  .codeArea{
    width: 100%;
    height:100%;
    background-color: #f0f0f0;
    overflow: auto;
  }
  .codeArea pre,.codeArea code{
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner{
    padding-top: 36px;
    box-sizing: border-box;
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
    background-color: rgba(0,0,0,0.4);
  }
  /*document fix  style end*/
  /*document custom style start*/
  .showArea{
    height:400px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/
</style>
