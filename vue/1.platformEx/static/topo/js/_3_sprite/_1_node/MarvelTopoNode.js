(function($){
    $.MarvelTopoNode = function() {
        var self = this;

        //#region Const

        var ICON_WIDTH = 32;
        var ICON_HEIGHT = 32;

        //#endregion

        //#region draw

        this.draw = function(oBuObj, oTopo){
            //#region 1.getPos

            var oPos = _getPos(oBuObj);

            //#endregion

            //#region 2.node

            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oPos.x,
                y: oPos.y,
                draggable: true
            });
            oGroup.tag = oBuObj;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey],
                width: ICON_WIDTH,
                height: ICON_HEIGHT
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            oTopo.Sprite.NodeGroup._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //#endregion

            //#region 3.parent

            oTopo.ins.layerNode.add(oGroup);

            //#endregion

            //#region 4.event

            oGroup.on('mouseover', function(evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function(evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('click', function(evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeClick(oGroup, oTopo);
            });
            oGroup.on('dragmove', function(evt){
                oTopo.Sprite.NodeGroup.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            return oGroup;
        };

        this.drawInGroup = function(oBuObj, oExpandGroupExists, oTopo){
            //region 1.getPos

            var oPos = _getPos(oBuObj);

            //#endregion

            //#region 2.node

            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oPos.x,
                y: oPos.y,
                draggable: true,
                dragBoundFunc: function(pos) {
                    var x = oExpandGroupExists.getChildren()[0].x();
                    var y = oExpandGroupExists.getChildren()[0].y();
                    var radius = oExpandGroupExists.tag.uiRadius;
                    var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
                    if(scale < 1){
                        return {
                            y: Math.round((pos.y - y) * scale + y),
                            x: Math.round((pos.x - x) * scale + x)
                        };
                    }
                    else{
                        return pos;
                    }
                }
            });
            oGroup.tag = oBuObj;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey],
                width: ICON_WIDTH,
                height: ICON_HEIGHT
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            oTopo.Sprite.NodeGroup._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //#endregion

            //#region 3.parent

            oExpandGroupExists.add(oGroup);

            //#endregion

            //#region 4.event

            oGroup.on('mouseover', function(evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function(evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('click', function(evt) {
                evt.cancelBubble = true;
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeClick(oGroup, oTopo);
            });
            oGroup.on('dragmove', function(evt){
                oTopo.Sprite.NodeGroup.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //#endregion

            return oGroup;
        };

        var _getPos = function(oBuObj){
            return {
                x: oBuObj.x,
                y: oBuObj.y
            };
        };

        //#endregion

        //#region event

        //#endregion

        //#region style

        //#endregion

        //#region imsg

        this.getCenterPos = function(oGroup){
            var width = oGroup.children[0].width();
            var height = oGroup.children[0].height();
            var x = width / 2 + oGroup.x();
            var y = height / 2 + oGroup.y();
            for(;;){
                var oGroup = oGroup.getParent();
                if(oGroup && oGroup.nodeType === "Group"){
                    x = x + oGroup.x();
                    y = y + oGroup.y();
                }
                else{
                    break;
                }
            }
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        };

        //#endregion
    }
})(jQuery);