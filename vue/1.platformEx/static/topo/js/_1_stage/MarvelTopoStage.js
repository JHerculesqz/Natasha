(function($){
    $.MarvelTopoStage = function() {
        var self = this;

        //#region Const

        var ZOOM_SCALE = 2;

        //#endregion

        //#region Fields

        //#endregion

        //#region init

        this.init = function(strId, iWidth, iHeight, oTopo){
            //#region 1._initContainer

            _initContainer(strId, oTopo);

            //#endregion

            //#region 2.init oStage

            var oStage = new Konva.Stage({
                id: $.MarvelTopoStage.id++,
                container: strId,
                width: iWidth,
                height: iHeight,
                draggable: true
            });

            //init oStageRect
            var oStageLayer = new Konva.Layer();
            oStage.add(oStageLayer);
            var oStageRect = new Konva.Rect({
                id: "oStageRect",
                x: 0,
                y: 0,
                width: oStage.getWidth(),
                height: oStage.getHeight()
            });
            oStageLayer.add(oStageRect);
            oTopo.Layer.reDraw(oStageLayer);
            oTopo.ins.layerBg = oStageLayer;

            //#endregion

            //#region 3.event

            _initEventWheel(strId, oStage);
            _initEventAddMinus(oTopo);
            _initEventClick(oStageRect, oTopo);
            _initEventCtrlPress(oTopo);

            //#endregion

            return oStage;
        };

        var _initContainer = function (strId, oTopo) {
            $("#" + strId).css("background-color", oTopo.Resource.getTheme().stage["bgColor"]);
            $("#" + strId).css("background-image", oTopo.Resource.getTheme().stage["bgImg"]);
        };

        //#endregion

        //#region event

        var _initEventWheel = function(strId, oStage){
            //TODO:需要缩小绑定事件的范围
            document.getElementById(strId).addEventListener('wheel', function(e){
                e.preventDefault();
                var oldScale = oStage.scaleX();
                var mousePointTo = {
                    x: oStage.getPointerPosition().x / oldScale - oStage.x() / oldScale,
                    y: oStage.getPointerPosition().y / oldScale - oStage.y() / oldScale
                };
                var newScale = e.deltaY > 0 ? oldScale * ZOOM_SCALE : oldScale / ZOOM_SCALE;
                oStage.scale({ x: newScale, y: newScale });
                var newPos = {
                    x: -(mousePointTo.x - oStage.getPointerPosition().x / newScale) * newScale,
                    y: -(mousePointTo.y - oStage.getPointerPosition().y / newScale) * newScale
                };
                oStage.position(newPos);
                oStage.batchDraw();
            });
        };
        var _initEventAddMinus = function(oTopo){
            keyboardJS.bind('=', function(e) {
                oTopo.Sprite.NodeGroup.zoomInSelectNodeGroupAndNodes();
            });
            keyboardJS.bind('-', function(e) {
                oTopo.Sprite.NodeGroup.zoomOutSelectNodeGroupAndNodes();
            });
        };
        var _initEventClick = function(oStageRect, oTopo){
            oStageRect.on("click", function(evt){
                oTopo.Sprite.NodeGroup.unSelectNodeGroupAndNodes(oTopo);
                oTopo.Sprite.LinkGroup.unSelectLinks(oTopo);
            });
        };
        var _initEventCtrlPress = function(oTopo){
            keyboardJS.bind('ctrl', function(e) {
                keyboardJS.isCtrlPress = true;
            }, function(e){
                keyboardJS.isCtrlPress = false;
            });
        };

        //#endregion

        //#region imsg

        this.clearAllGroups = function(oTopo){
            var arrGroup = oTopo.ins.stage.find("Group");
            arrGroup.forEach(function(oGroup, index){
                oGroup.destroy();
            });
        };

        this.findOne = function (strId, oTopo) {
            var strWrapperId = self.getIdentityValue(strId, oTopo);
            var oEle = oTopo.ins.stage.findOne("#" + strWrapperId);
            return oEle;
        };

        this.findGroupByTagAttr = function(strAttrKey, oAttrValue, oTopo){
            var arrRes = [];

            var arrGroup = oTopo.ins.stage.find("Group");
            for(var i=0;i<arrGroup.length;i++){
                var oGroup = arrGroup[i];
                if(undefined != oGroup.tag[strAttrKey]){
                    if(oGroup.tag[strAttrKey] == oAttrValue){
                        arrRes.push(oGroup);
                    }
                }
            }

            return arrRes;
        };

        this.getIdentityValue = function(value, oTopo){
            return oTopo.ins.stage.id() + "_" + value;
        };

        //#endregion
    };
    $.MarvelTopoStage.id = 1;
})(jQuery);