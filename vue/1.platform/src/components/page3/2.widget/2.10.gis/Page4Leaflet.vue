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
            <button v-on:click="oTest4SetConfig">test4SetConfig</button>
            <button v-on:click="oTestData">test4Data(draw)</button>
            <button v-on:click="oTest4Map">test4Map(setCenter)</button>
            <button v-on:click="oTest4Map2">test4Map(showOrHide)</button>
            <button v-on:click="oTest4Layer1">test4Layer(getDiffLst)</button>
            <button v-on:click="oTest4Layer2">test4Layer(toGeoJSON)</button>
            <button v-on:click="oTest4Marker">test4Marker</button>
            <button v-on:click="oTest4AttachedIcon">test4AttachedIcon</button>
            <button v-on:click="oTest4Circle">test4Circle</button>
            <button v-on:click="oTest4Group">test4Group(expandAllGroup)</button>
            <button v-on:click="oTest4Group2">test4Group(collapseAllGroup)</button>
            <button v-on:click="oTest4Group3">oTest4Group(delGroup)</button>
            <button v-on:click="oTest4Group4">test4Group(setOpacity4Group)</button>
            <button v-on:click="oTest4Line">test4Line(delPolyline)</button>
            <button v-on:click="oTest4Line2">test4Line(setOpacity4Link)</button>
            <button v-on:click="oTest4Line3">test4Line(setColor4Link)</button>
            <button v-on:click="oTest4Polygon">test4Polygon(addPolygon)</button>
            <button v-on:click="oTest4Polygon2">test4Polygon(delPolygon)</button>
            <button v-on:click="oTest4Topo">test4Topo</button>
            <button v-on:click="oTest4CreateMarker">test4CreateMarker</button>
            <button v-on:click="oTest4ShowAllLabel">test4ShowAllLabel</button>
            <button v-on:click="oTest4HideAllLabel">test4HideAllLabel</button>
            <button v-on:click="oTest4ShowLabelByIds">oTest4ShowLabelByIds</button>
            <button v-on:click="oTest4HideLabelByIds">oTest4HideLabelByIds</button>
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
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelLeaflet from "@/walle/widget/leaflet/MarvelLeaflet"

  export default {
    name: 'page4Leaflet',
    components: {
      MarvelTabItem,
      MarvelTab, MarvelLeaflet
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
        show: true,
        createMarkerId: "createMarkerId"
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //init
      this.$refs.ref0.init(51.505, -0.09, 13, {
        mapUrl: "https://api.mapbox.com/styles/v1/jherculesqz/cj99csbwi2bzy2qp3mhtqcrkx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamhlcmN1bGVzcXoiLCJhIjoiY2o4anNybjZqMDZnczMybXZxaHNhMDRlMyJ9.fR2DM7aypSp8q4AxE6uL5w",
        //mapUrl: "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}",
        hasZoomCtrl: true,
        export: true,
        mess: true,
        messTmpLine: "#fff",
        messResLine: "#fff",
        pm: true,
      });
      //#endregion
    },
    methods: {
      //#region inner
      onZoom: function (e) {
        console.log(e);
      },
      onClick: function (oPoint) {
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
      onNodeClick: function (e) {
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
      oTest4SetConfig: function () {
        this.$refs.ref0.setConfig({
          showLabel: false
        });
      },
      oTestData: function () {
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
          children: [{
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
          children: [{
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
        this.$refs.ref0.addCircle("circle1", 51.5, -0.06, 30, {
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
          uiFillColor: "#FAE09B",
          uiColor: "#FFFFFF",
          uiTips: "polygon1"
        });
      },
      oTest4Map: function () {
        this.$refs.ref0.setCenter(51.505, -0.09, 10);
      },
      oTest4Map2: function () {
        this.show = !this.show;
        this.$refs.ref0.showOrHide(this.show);
      },
      oTest4Layer1: function () {
        var oResDiff = this.$refs.ref0.getDiffLst(
          ["marker2", "marker3", "marker4"],
          ["site", "ne"]);
        console.log(oResDiff);
      },
      oTest4Layer2: function () {
        var arrGeoJSON = this.$refs.ref0.toGeoJSON();
        console.log(arrGeoJSON);
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
      oTest4AttachedIcon: function () {
        var self = this;
        this.$refs.ref0.addAttachedIcon4Marker("marker1", "/static/gis/lib/images/location-01.svg");
        setTimeout(function () {
          self.$refs.ref0.delAttachedIcon4Marker("marker1");
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
      oTest4Group3: function (e) {
        this.$refs.ref0.delGroup("site1");
      },
      oTest4Group4: function () {
        this.$refs.ref0.setOpacity4Group("site2", 0.5);
      },
      oTest4Line: function (e) {
        this.$refs.ref0.delPolyline("link1");
      },
      oTest4Line2: function (e) {
        this.$refs.ref0.setOpacity4Link("link1", 0.5);
      },
      oTest4Line3: function (e) {
        this.$refs.ref0.setColor4Link("link1", "green");
      },
      oTest4Polygon: function (e) {
        this.$refs.ref0.addPolygon("polygon2", [
          [51.50286581276557, -0.10449886322021486],
          [51.49931274551157, -0.10814666748046876],
          [51.49803036749742, -0.10563611984252931],
          [51.4983509653836, -0.09994983673095705],
          [51.49992720552339, -0.0982332229614258],
          [51.50473573689897, -0.09630203247070312]
        ], {
          id: "polygon2",
          points: [
            [51.50286581276557, -0.10449886322021486],
            [51.49931274551157, -0.10814666748046876],
            [51.49803036749742, -0.10563611984252931],
            [51.4983509653836, -0.09994983673095705],
            [51.49992720552339, -0.0982332229614258],
            [51.50473573689897, -0.09630203247070312]
          ],
          uiFillColor: "#ffa600",
          uiColor: "#ffffff",
          uiTips: "polygon2"
        });
      },
      oTest4Polygon2: function (e) {
        this.$refs.ref0.delPolygon("polygon2");
      },
      oTest4Topo: function () {
        var oTopoData = this.$refs.ref0.getTopoData();
        console.log("TopoCache is ");
        console.log(oTopoData);
      },
      oTest4CreateMarker: function () {
        this.$refs.ref0.createMarker({
          id: this.createMarkerId,
          x: 0,
          y: 0,
          uiType: "ne",
          uiImgUrl: "/static/gis/lib/images/node1.svg",
          uiImgWidth: 32,
          uiLabel: this.createMarkerId,
          uiTips: "<b>marker3</b><br>22",
          uiDraggable: true,
          uiOpacity: 1
        }, function (bSuccessful, oBuObj) {
          console.log("createMarker: " + bSuccessful);
        }, true);

        this.createMarkerId += 1;
      },
      oTest4ShowAllLabel: function () {
        this.$refs.ref0.showAllLabel();
      },
      oTest4HideAllLabel: function () {
        this.$refs.ref0.hideAllLabel();
      },
      oTest4ShowLabelByIds: function(){
        this.$refs.ref0.showLabelByIds(["marker1", "marker2"]);
      },
      oTest4HideLabelByIds: function(){
        this.$refs.ref0.hideLabelByIds(["marker1", "marker2"]);
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
    height: 640px;
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
