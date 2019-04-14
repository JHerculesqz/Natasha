<template>
  <div class="gisMap" v-bind:id="id"
       v-bind:style="{ display: isShow }"></div>
</template>

<script>
//  import "leaflet/dist/leaflet.css"
//  import "leaflet"
//  import "leaflet.heat"
  export default {
    name: 'MarvelLeaflet',
    props: ["id"],
    data: function() {
      return {
        gisObj: undefined,
        isShow: "block"
      }
    },
    mounted: function(){
      this.gisObj = new window.$.MarvelGis();
    },
    methods: {
      //#region inner

      //#endregion

      //#region callback
      _onZoom: function(e){
        this.$emit("onZoom", e);
      },
      _onClick: function(e){
        this.$emit("onClick", e);
      },
      _onContextMenu: function (e) {
        this.$emit("onContextMenu", e);
      },
      _onNodeDblClick: function(e){
        this.$emit("onNodeDblClick", e);
      },
      _onNodeDrag: function(e){
        this.$emit("onNodeDrag", e);
      },
      _onNodeClick: function(e){
        this.$emit("onNodeClick", e);
      },
      _onNodeContextMenu: function (e) {
        this.$emit("onNodeContextMenu", e);
      },
      _onNodeGroupClick: function(e){
        this.$emit("onNodeGroupClick", e);
      },
      _onLinkClick: function(e){
        this.$emit("onLinkClick", e);
      },
      _onCircleDblclick: function(e){
        this.$emit("onCircleDblclick", e);
      },
      //#endregion

      //#region 3rd

      //#region Map
      init: function(iX, iY, iZoom4Init, oOptions){
        var self = this;
        var eventOptions = {
          //region Stage
          callbackOnZoom: function(e){
            console.log("callbackOnZoom");
            self._onZoom(e);
          },
          callbackOnClick: function(e){
            console.log("callbackOnClick");
            self._onClick(e);
          },
          callbackOnContextmenu: function(e){
            console.log("callbackOnContextmenu");
            self._onContextMenu(e);
          },
          //endregion
          //region node
          callbackOnNodeDblClick: function(e){
            console.log("callbackOnNodeDblClick");
            self._onNodeDblClick(e);
          },
          callbackOnNodeDrag: function(e){
            console.log("callbackOnNodeDrag");
            self._onNodeDrag(e);
          },
          callbackOnNodeClick: function(e){
            console.log("callbackOnNodeClick");
            self._onNodeClick(e);
          },
          callbackOnNodeContextMenu: function(e){
            console.log("callbackOnNodeContextMenu");
            self._onNodeContextMenu(e);
          },
          //endregion
          //region nodeGroup
          callbackOnNodeGroupClick: function(e){
            console.log("callbackOnNodeGroupClick");
            self._onNodeGroupClick(e);
          },
          //endregion
          //region link
          callbackOnLinkClick: function(e){
            console.log("callbackOnLinkClick");
            self._onLinkClick(e);
          },
          //endregion
          //region basicShape
          callbackOnCircleDblclick: function(e){
            console.log("callbackOnCircleDblclick");
            self._onCircleDblclick(e);
          }
          //endregion
        };
        this.gisObj.Api.init(this.id, iX, iY, iZoom4Init, oOptions, eventOptions, this.gisObj);
      },
      setCenter: function(iX, iY, iZoom4Init){
        this.gisObj.Api.setCenter(iX, iY, iZoom4Init, this.gisObj);
      },
      showOrHide: function(bIsShow){
        this.isShow = bIsShow ? "block":"none";
      },
      //#endregion

      //#region Layer
      findById: function(strId){
        var oRes = this.gisObj.Api.findById(strId);
        return oRes;
      },
      getDiffLst: function(lstItemId, arrItemUiType){
        var oRes = this.gisObj.Api.getDiffLst(lstItemId,
          arrItemUiType, this.gisObj);
        return oRes;
      },
      //#endregion

      //#region topo
      draw: function(oTopoData){
        this.gisObj.Api.draw(oTopoData, this.gisObj);
      },
      getTopoData: function(){
        return this.gisObj.Api.getTopoData(this.gisObj);
      },
      //#endegion

      //#region Marker/Icon/DivIcon
      addMarker: function(strId, iX, iY, strImgClass, iImgWidth,
                          oBuObj){
        this.gisObj.Api.addMarker(strId, iX, iY,
          strImgClass, iImgWidth, oBuObj, this.gisObj);
      },
      delMarker: function (strId) {
        this.gisObj.Api.delMarker(strId, this.gisObj);
      },
      setImgUrl: function (strId, strImgClass, iImgWidth) {
        this.gisObj.Api.setImgUrl(strId, strImgClass, iImgWidth, this.gisObj);
      },
      setOpacity4Marker: function (strId, iOpacity) {
        this.gisObj.Api.setOpacity4Marker(strId, iOpacity,
          this.gisObj);
      },
      setPos4Marker: function (strId, iX, iY) {
        this.gisObj.Api.setPos4Marker(strId, iX, iY,
          this.gisObj);
      },
      setTips4Marker: function (strId, strTips) {
        this.gisObj.Api.setTips4Marker(strId, strTips,
          this.gisObj);
      },
      setBuObj4Marker: function (strId, oBuObj) {
        this.gisObj.Api.setBuObj4Marker(strId, oBuObj, this.gisObj);
      },
      setHide4Marker: function (strId, bIsHide) {
        this.gisObj.Api.setHide4Marker(strId, bIsHide, this.gisObj);
      },
      addAttachedIcon4Marker: function(strId, strImgUrl){
        this.gisObj.Api.addAttachedIcon4Marker(strId, strImgUrl, this.gisObj);
      },
      delAttachedIcon4Marker: function(strId){
        this.gisObj.Api.delAttachedIcon4Marker(strId, this.gisObj);
      },
      //#endregion

      //#region Circle
      addCircle: function(strId, iX, iY, iR,
                          oBuObj){
        this.gisObj.Api.addCircle(strId, iX, iY, iR, oBuObj, this.gisObj);
      },
      delCircle: function (strId) {
        this.gisObj.Api.delCircle(strId, this.gisObj);
      },
      //#endregion

      //#region Polygon
      addPolygon: function(strId, arrPoints, oBuObj){
        this.gisObj.Api.addPolygon(strId, arrPoints, oBuObj,
          this.gisObj);
      },
      //#endregion

      //#region Group
      expandAllGroup: function (strUiType) {
        this.gisObj.Api.expandAllGroup(strUiType, this.gisObj);
      },
      collapseAllGroup: function (strUiType) {
        this.gisObj.Api.collapseAllGroup(strUiType, this.gisObj);
      },
      delGroup: function(strId){
        this.gisObj.Api.delGroup(strId, this.gisObj);
      },
      setOpacity4Group: function(strId, iOpacity){
        this.gisObj.Api.setOpacity4Group(strId, iOpacity, this.gisObj);
      },
      //#endregion

      //#region link
      delPolyline: function(strId){
        this.gisObj.Api.delPolyline(strId, this.gisObj);
      },
      //#endregion

      //#endregion

      //#endregion
//      addHeatMap: function(arrHeatData){
//        L.heatLayer(arrHeatData, {radius: 10}).addTo(this.mapObj);
//      },
    }
  }
</script>

<style scoped>
  .gisMap {
    width: 100%; height: 100%;
  }
  .dpn {
    display: none;
  }
</style>
