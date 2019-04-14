/**
 * Created by destina on 2017/10/12.
 */
(function ($) {
    $.MarvelGisApi = function () {
        //region Const
        const NODE_TYPE="ne";
        const SITE_TYPE="site";
        const LINK_TYPE="link";
        //endregion

        //region Fields
        var self = this;
        //endregion

        //region imsg

        //region stage

        this.setCenter = function (iX, iY, iZoom4Init, oGis) {
            oGis.Stage.setCenter(iX, iY, iZoom4Init);
        };

        //endregion

        //region layer

        this.findById = function (strId, oGis) {
            var oRes = oGis.Layer.findById(strId);
            return oRes;
        };

        this.getDiffLst = function (lstItemId, arrItemUiType, oGis) {
            var oRes = oGis.Layer.getDiffLst(lstItemId,
                arrItemUiType, oGis);
            return oRes;
        };

        //endregion

        //region topo

        this.init = function (strId, iX, iY, iZoom4Init, oOptions, oEventOptions, oGis) {
            oGis.Stage.init(strId, iX, iY, iZoom4Init, oOptions, oEventOptions);
        };

        this.draw = function (oTopoData, oGis) {
            //drawNode
            oTopoData.nodes.forEach(function (oNode, index) {
                oGis.Sprite.Node.addMarker(oNode.id, oNode.x, oNode.y, oNode.uiImgUrl, oNode.uiImgWidth, oNode,
                    oGis);
            });
            //drawNodeGroup
            oTopoData.nodeGroups.forEach(function (oNodeGroup, index) {
                oGis.Sprite.NodeGroup.addGroup(oNodeGroup, oGis);
            });
            //drawLink
            oGis.Sprite.LinkGroup.drawLines(oTopoData.links, oGis);
        };

        this.getTopoData = function(oGis){
            var oTopoData = {
                nodes: [],
                nodeGroups: [],
                links: []
            };

            oGis.Stage.mapObj.eachLayer(function(oLayer, index){
                var oBuObj = oLayer.buObj;
                if(oBuObj){
                    if(oBuObj.uiType == NODE_TYPE){
                        oTopoData.nodes.push(oBuObj);
                    }
                    else if(oBuObj.uiType == SITE_TYPE){
                        oTopoData.nodeGroups.push(oBuObj);
                    }
                    else if(oBuObj.uiType == LINK_TYPE){
                        oTopoData.links.push(oBuObj);
                    }
                }
            });

            return oTopoData;
        };

        //endregion

        //region node

        //region marker
        this.addMarker = function (strId, iX, iY, strImgUrl, iImgWidth, oBuObj, oGis) {
            oGis.Sprite.Node.addMarker(strId, iX, iY, strImgUrl, iImgWidth, oBuObj, oGis);
        };

        this.delMarker = function (strId, oGis) {
            oGis.Sprite.Node.delMarker(strId, oGis);
        };

        this.setImgUrl = function (strId, strImgClass, iImgWidth, oGis) {
            oGis.Sprite.Node.setImgUrl(strId, strImgClass, iImgWidth, oGis);
        };

        this.setOpacity4Marker = function (strId, iOpacity, oGis) {
            oGis.Sprite.Node.setOpacity4Marker(strId, iOpacity, oGis);
        };

        this.setPos4Marker = function (strId, iX, iY, oGis) {
            oGis.Sprite.Node.setPos4Marker(strId, iX, iY, oGis);
        };

        this.setTips4Marker = function (strId, strTips, oGis) {
            oGis.Sprite.Node.setTips4Marker(strId, strTips, oGis);
        };

        this.setBuObj4Marker = function (strId, oBuObj, oGis) {
            oGis.Sprite.Node.setBuObj4Marker(strId, oBuObj, oGis);
        };

        this.setHide4Marker = function (strId, bIsHide, oGis) {
            oGis.Sprite.Node.setHide4Marker(strId, bIsHide, oGis);
        };

        this.addAttachedIcon4Marker = function(strId, strImgUrl, oGis){
            oGis.Sprite.Node.addAttachedIcon4Marker(strId, strImgUrl, oGis);
        };

        this.delAttachedIcon4Marker = function(strId, oGis){
            oGis.Sprite.Node.delAttachedIcon4Marker(strId, oGis);
        };
        //endregion

        //region circle
        this.addCircle = function (strId, iX, iY, iR, oBuObj, oGis) {
            oGis.Sprite.Node.addCircle(strId, iX, iY, iR, oBuObj, oGis);
        };

        this.delCircle = function (strId, oGis) {
            oGis.Sprite.Node.delCircle(strId, oGis);
        };
        //endregion

        //region polygon
        this.addPolygon = function (strId, arrPoints, oBuObj, oGis) {
            oGis.Sprite.Node.addPolygon(strId, arrPoints, oBuObj, oGis);
        };
        //endregion

        //endregion

        //region nodeGroup

        this.expandAllGroup = function(strUiType, oGis){
            oGis.Sprite.NodeGroup.expandAllGroup(strUiType, oGis);
        };

        this.collapseAllGroup = function(strUiType, oGis){
            oGis.Sprite.NodeGroup.collapseAllGroup(strUiType, oGis);
        };

        this.delGroup = function(strId, oGis){
            oGis.Sprite.NodeGroup.delGroup(strId, oGis);
        };

        this.setOpacity4Group = function(strId, iOpacity, oGis){
            oGis.Sprite.NodeGroup.setOpacity4Group(strId, iOpacity, oGis);
        };

        //endregion

        //region linkGroup

        this.delPolyline = function(strId, oGis){
            oGis.Sprite.LinkGroup.delPolyline(strId, oGis);
        };

        //endregion

        //endregion
    };
})(jQuery);