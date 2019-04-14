(function ($) {
    $.MarvelGisNodeGroup = function () {
        var self = this;

        //region Const

        //endregion

        //region init

        //endregion

        //region event

        var _dblClickCircle = function (oBuObj, e, oGis) {
            //1.将站点折叠
            _collapseGroup(oBuObj, oGis);
            //2.重绘站点以及站点中的设备相连的链路
            oGis.Sprite.LinkGroup.response2NodeEvent4ReDraw(oBuObj, oGis);
        };

        var _clickCircle = function (e, oGis) {
            oGis.Stage.eventHandler.callbackOnNodeGroupClick(e);
        };

        var _dblClickMarker = function (oBuObj, e, oGis) {
            //1.将站点展开
            _expandGroup(oBuObj, oGis);
            //2.重绘站点以及站点中的设备相连的链路
            oGis.Sprite.LinkGroup.response2NodeEvent4ReDraw(oBuObj, oGis);
        };

        var _clickMarker = function (e, oGis) {
            oGis.Stage.eventHandler.callbackOnNodeGroupClick(e);
        };

        //endregion

        //region imsg

        //region Group

        this.addGroup = function (oBuObj4Group, oGis) {
            if (oBuObj4Group.uiExpand) {
                //1.init oCircle
                oGis.Sprite.Node.addCircle4Group(oBuObj4Group.id,
                    oBuObj4Group.x, oBuObj4Group.y, oBuObj4Group.r,
                    oBuObj4Group, oGis, function (e) {
                        _dblClickCircle(oBuObj4Group, e, oGis);
                    }, function (e) {
                        _clickCircle(e, oGis);
                    });

                //2.iter oBuObj4Group.children, init marker
                for (var i = 0; i < oBuObj4Group.children.length; i++) {
                    var oBuObj4Child = oBuObj4Group.children[i];
                    oGis.Sprite.Node.addMarker(oBuObj4Child.id,
                        oBuObj4Child.x,
                        oBuObj4Child.y,
                        oBuObj4Child.uiImgUrl,
                        oBuObj4Child.uiImgWidth,
                        oBuObj4Child, oGis);
                }
            }
            else {
                oGis.Sprite.Node.addMarker4Group(oBuObj4Group.id,
                    oBuObj4Group.x,
                    oBuObj4Group.y,
                    oBuObj4Group.uiImgUrl,
                    oBuObj4Group.uiImgWidth,
                    oBuObj4Group, oGis, function (e) {
                        _dblClickMarker(oBuObj4Group, e, oGis);
                    }, function (e) {
                        _clickMarker(e, oGis)
                    });
            }
        };

        this.expandAllGroup = function (strUiType, oGis) {
            oGis.Stage.mapObj.eachLayer(function (oLayer) {
                if (oLayer.buObj) {
                    if (oLayer.buObj.uiType == strUiType) {
                        if (!oLayer.buObj.uiExpand) {
                            _expandGroup(oLayer.buObj, oGis);
                            //联动链路
                            oGis.Sprite.LinkGroup.response2NodeEvent4ReDraw(oLayer.buObj, oGis);
                        }
                    }
                }
            });
        };

        var _expandGroup = function (oBuObj, oGis) {
            //1.remove
            self.delGroup(oBuObj.id, oGis);

            //2.update uiExpand
            oBuObj.uiExpand = true;

            //3.draw
            self.addGroup(oBuObj, oGis);
        };

        this.collapseAllGroup = function (strUiType, oGis) {
            oGis.Stage.mapObj.eachLayer(function (oLayer) {
                if (oLayer.buObj) {
                    if (oLayer.buObj.uiType == strUiType) {
                        if (oLayer.buObj.uiExpand) {
                            _collapseGroup(oLayer.buObj, oGis);
                            //联动链路
                            oGis.Sprite.LinkGroup.response2NodeEvent4ReDraw(oLayer.buObj, oGis);
                        }
                    }
                }
            });
        };

        var _collapseGroup = function (oBuObj, oGis) {
            //1.remove
            self.delGroup(oBuObj.id, oGis);

            //2.update uiExpand
            oBuObj.uiExpand = false;

            //3.draw
            self.addGroup(oBuObj, oGis);
        };

        this.delGroup = function (strId, oGis) {
            var oGroup = oGis.Layer.findById(strId, oGis);
            if (oGroup) {
                var oBuObj = oGroup.buObj;
                if (oBuObj.uiExpand) {
                    oGis.Sprite.Node.delCircle(oBuObj.id, oGis);
                    for (var i = 0; i < oBuObj.children.length; i++) {
                        var oBuObjChild = oBuObj.children[i];
                        oGis.Sprite.Node.delMarker(oBuObjChild.id, oGis);
                    }
                }
                else {
                    oGis.Sprite.Node.delMarker(oBuObj.id, oGis);
                }
            }
        };

        this.getDrawnNodeById = function (srId, oGis) {
            var oTargetBuObj;
            //先找已经绘制的节点
            oGis.Stage.mapObj.eachLayer(function (oLayer, index) {
                var oBuObj = oLayer.buObj;
                if (oBuObj) {
                    if (oBuObj.id == srId) {
                        oTargetBuObj = oLayer.buObj;
                    }
                }
            });
            //如果没有找到，找绘制的父节点
            if (!oTargetBuObj) {
                oGis.Stage.mapObj.eachLayer(function (oLayer, index) {
                    var oBuObj = oLayer.buObj;
                    if (oBuObj && oBuObj.children && oBuObj.children.length) {
                        oBuObj.children.forEach(function (oChild, index) {
                            if (oChild.id == srId) {
                                oTargetBuObj = oBuObj;
                            }
                        });
                    }
                });
            }
            return oTargetBuObj;
        };

        this.setOpacity4Group = function(strId, iOpacity, oGis){
            var oNodeGroup = oGis.Layer.findById(strId, oGis);
            if(oNodeGroup){
                var oBuObj = oNodeGroup.buObj;
                //如果是展开
                if(oBuObj.uiExpand === true){
                    oGis.Sprite.Node.setOpacity4Circle(strId, iOpacity, oGis);
                }
                //如果是折叠
                else if(oBuObj.uiExpand === false){
                    oGis.Sprite.Node.setOpacity4Marker(strId, iOpacity, oGis);
                }
            }
        };

        //endregion

        //endregion
    }
})(jQuery);