(function($){
    $.MarvelTopoNodeGroup = function() {
        var self = this;

        //#region Const

        var ICON_WIDTH = 32;
        var ICON_HEIGHT = 32;

        //#endregion

        //#region draw

        this.draw = function(oBuObj, oTopo){
            if(!oBuObj.uiExpandNode){
                return _drawCollapse(oBuObj, undefined, oTopo);
            }
            else{
                return _drawExpand(oBuObj, undefined, oTopo);
            }
        };

        var _drawCollapse = function(oBuObj, oExpandGroupExists, oTopo){
            //#region 1.remove

            if(oExpandGroupExists){
                _removeGroupExists(oExpandGroupExists, oTopo);
            }

            //#endregion

            //#region 2.oGroupExistsPos

            var oGroupExistsPos = _getGroupExistsPos(oBuObj, oExpandGroupExists);

            //#endregion

            //#region 3.collapse Group

            //0.oGroup
            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oGroupExistsPos.x,
                y: oGroupExistsPos.y,
                draggable: true
            });
            oGroup.tag = oBuObj;
            oGroup.tag.uiExpandNode = false;

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
            self._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //#endregion

            //#region 4.parent

            oTopo.ins.layerNode.add(oGroup);

            //#endregion

            //#region 5.event

            oGroup.on('mouseover', function(evt) {
                self._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function(evt) {
                self._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('dblclick', function(evt) {
                _onCollpaseGroupDBClick(oBuObj, oGroup, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
            });
            oGroup.on("click", function(evt){
                self._onNodeGroupOrNodeClick(oGroup, oTopo);
            });
            oGroup.on('dragmove', function(evt){
                //var arrSelectNode = _getSelectNodeGroupAndNodes(oTopo);
                //for(var i=0;i<arrSelectNode.length;i++){
                //    var oSelectNode = arrSelectNode[i];
                //    oSelectNode.x(oSelectNode.x() + evt.evt.offsetX);
                //    oSelectNode.y(oSelectNode.y() + evt.evt.offsetY);
                //}

                self.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //#endregion

            return oGroup;
        };
        var _drawExpand = function(oBuObj, oCollapseGroupExists, oTopo){
            //#region 1.remove

            if(oCollapseGroupExists){
                _removeGroupExists(oCollapseGroupExists, oTopo);
            }

            //#endregion

            //#region 2.oGroupExistsPos

            var oGroupExistsPos = _getGroupExistsPos(oBuObj, oCollapseGroupExists);

            //#endregion

            //#region 3.expand Group

            //0.oGroup
            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oGroupExistsPos.x,
                y: oGroupExistsPos.y,
                opacity: oBuObj.opacity ? oBuObj.opacity : 1.0,
                draggable: true
            });
            oGroup.tag = oBuObj;
            oGroup.tag.uiExpandNode = true;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey4Expand],
                width: oBuObj.uiExpandNodeWidth,
                height: oBuObj.uiExpandNodeHeight
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            self._setLabelCenter(oBuObj.uiExpandNodeWidth, oBuObj.uiExpandNodeHeight, oLabel);
            oGroup.add(oLabel);

            //#endregion

            //#region 4.parent

            oTopo.ins.layerNode.add(oGroup);

            //#endregion

            //#region 5.nodes in Group

            for(var i=0;i<oBuObj.children.length;i++){
                var oBuObjItem = oBuObj.children[i];
                oTopo.Sprite.Node.drawInGroup(oBuObjItem, oGroup, oTopo);
            }

            //#endregion

            //#region 6.event

            oGroup.on('mouseover', function(evt) {
                self._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function(evt) {
                self._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('dblclick', function(evt) {
                _onExpandGroupDBClick(oBuObj, oGroup, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
            });
            oGroup.on("click", function(evt){
                self._onNodeGroupOrNodeClick(oGroup, oTopo);
            });
            oGroup.on('dragmove', function(evt){
                self.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //#endregion

            return oGroup;
        };
        var _removeGroupExists = function(oExpandOrCollapseGroupExists, oTopo){
            oExpandOrCollapseGroupExists.destroy();
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };
        var _getGroupExistsPos = function(oBuObj, oExpandOrCollapseGroupExists){
            var iX = oExpandOrCollapseGroupExists == undefined ?
                oBuObj.x : oExpandOrCollapseGroupExists.getPosition().x;
            var iY = oExpandOrCollapseGroupExists == undefined ?
                oBuObj.y : oExpandOrCollapseGroupExists.getPosition().y;

            return {
                x: iX,
                y: iY
            };
        };

        //#endregion

        //#region event

        this._onNodeGroupOrNodeMouseOver = function(oGroup, oTopo){
            _setMouseHoverStyle(oGroup.children[0], oTopo);
        };
        this._onNodeGroupOrNodeMouseOut = function(oGroup, oTopo){
            _setMouseHoverOutStyle(oGroup.children[0], oTopo);
        };
        var _onCollpaseGroupDBClick = function(oBuObj, oGroup, oTopo){
            _drawExpand(oBuObj, oGroup, oTopo);
        };
        var _onExpandGroupDBClick = function(oBuObj, oGroup, oTopo){
            _drawCollapse(oBuObj, oGroup, oTopo);
        };
        this._onNodeGroupOrNodeClick = function(oGroup, oTopo){
            //1.ctrl press
            if(keyboardJS.isCtrlPress){
                if(oGroup.tag.uiSelectNode == undefined || false == oGroup.tag.uiSelectNode){
                    //1.1.select current oGroup
                    oGroup.tag.uiSelectNode = true;
                    _setSelectNodeStyle(oGroup.children[0], oTopo);
                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
                else {
                    //1.2.unSelect current oGroup
                    oGroup.tag.uiSelectNode = false;
                    _setUnSelectNodeStyle(oGroup.children[0], oTopo);
                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
            }
            //2.ctrl not press
            else{
                //2.1.unSelectAll
                self.unSelectNodeGroupAndNodes(oTopo);
                oTopo.Sprite.LinkGroup.unSelectLinks(oTopo);

                //2.2.select current oGroup
                oGroup.tag.uiSelectNode = true;
                _setSelectNodeStyle(oGroup.children[0], oTopo);
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
        };

        this.onNodeOrNodeGroupMove = function(oGroup, oTopo){
            //1.联动关联的链路
            oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
            //2.更新node的坐标
            _updatePosition(oGroup.tag, oGroup);
        };
        var _updatePosition = function(oBuObj, oGroup){
            oBuObj.x = oGroup.x();
            oBuObj.y = oGroup.y();
        };
        //#endregion

        //#region style

        this._setLabelCenter = function(iIconWidth, iIconHeight, oLabel){
            oLabel.setOffset({
                x: -iIconWidth / 2 + oLabel.getWidth() / 2,
                y: -iIconHeight
            });
        };

        var _setSelectNodeStyle = function(oImage, oTopo){
            //oImage.fillEnabled(true);
            //oImage.fill(oTopo.Resource.getTheme().node.selectColor);
            oImage.strokeEnabled(true);
            oImage.stroke(oTopo.Resource.getTheme().node.selectColor);
            oImage.strokeWidth(4);
            oImage.lineJoin("round");
            oImage.lineCap("round");
            //oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        var _setUnSelectNodeStyle = function(oImage){
            // oImage.fillEnabled(false);
            oImage.strokeEnabled(false);
        };

        var _setMouseHoverStyle = function(oImage, oTopo){
            document.body.style.cursor = 'pointer';

            oImage.shadowEnabled(true);
            oImage.shadowColor("rgba(255,255,255,0.75)");
            oImage.shadowBlur(5);
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        var _setMouseHoverOutStyle = function(oImage, oTopo){
            document.body.style.cursor = 'default';

            oImage.shadowEnabled(false);
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        var _groupDragMoveEvent = function(oGroup, oTopo){
            oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
        };

        //#endregion

        //#region imsg

        this.expandAllNodeGroup = function(oTopo){
            //1.findAll
            var arrCollapseGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiExpandNode", false, oTopo);

            //2.expand
            for(var i=0;i<arrCollapseGroupExists.length;i++){
                var oCollapseGroupExists = arrCollapseGroupExists[i];
                _drawExpand(oCollapseGroupExists.tag, oCollapseGroupExists, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oCollapseGroupExists.tag, oTopo);
            }
        };

        this.collapseAllNodeGroup = function(oTopo){
            //1.findAll
            var arrExpandGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiExpandNode", true, oTopo);

            //2.expand
            for(var i=0;i<arrExpandGroupExists.length;i++){
                var oExpandGroupExists = arrExpandGroupExists[i];
                _drawCollapse(oExpandGroupExists.tag, oExpandGroupExists, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oExpandGroupExists.tag, oTopo);
            }
        };

        this.unSelectNodeGroupAndNodes = function(oTopo){
            //1.get arrSelectNode
            var arrSelectNode = _getSelectNodeGroupAndNodes(oTopo);

            //2.遍历，unSelect
            for(var i=0;i<arrSelectNode.length;i++) {
                var oSelectNode = arrSelectNode[i];
                oSelectNode.tag.uiSelectNode = false;
                _setUnSelectNodeStyle(oSelectNode.children[0]);
            }

            oTopo.Layer.reDraw(oTopo.ins.layerNode);
            //oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        this.zoomInSelectNodeGroupAndNodes = function(oTopo){
            //1.get arrSelectNode
            var arrSelectNode = _getSelectNodeGroupAndNodes(oTopo);

            //2.遍历，放大
            for(var i=0;i<arrSelectNode.length;i++){
                var oSelectNode = arrSelectNode[i];
                var oScaleOld = oSelectNode.scale();
                oSelectNode.scale({
                    x: oScaleOld.x + 0.2 <= 5 ? oScaleOld.x + 0.2 : 5,
                    y: oScaleOld.y + 0.2 <= 5 ? oScaleOld.y + 0.2 : 5
                });
            }
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.zoomOutSelectNodeGroupAndNodes = function(oTopo){
            //1.get arrSelectNode
            var arrSelectNode = _getSelectNodeGroupAndNodes(oTopo);

            //2.遍历，放大
            for(var i=0;i<arrSelectNode.length;i++){
                var oSelectNode = arrSelectNode[i];
                var oScaleOld = oSelectNode.scale();
                oSelectNode.scale({
                    x: oScaleOld.x - 0.2 >= 0.2 ? oScaleOld.x - 0.2 : 0.2,
                    y: oScaleOld.y - 0.2 >= 0.2 ? oScaleOld.y - 0.2 : 0.2
                });
            }
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        var _getSelectNodeGroupAndNodes = function(oTopo){
            //1.findAll
            var arrSelectGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiSelectNode", true, oTopo);

            return arrSelectGroupExists;
        };

        //获取绘制的节点，如果该节点绘制过，直接返回该节点；如果没有绘制过，返回它的父节点
        this.getDrawnNodeById = function(strId, oTopo){
            var oGroup =  this.getDrawnGroupById(strId, oTopo);
            if(oGroup){
                return oGroup.tag;
            }
        };

        this.getDrawnGroupById = function(strId, oTopo){
            var oGroup =  oTopo.Stage.findOne(strId, oTopo);
            //如果绘制过，直接返回
            if(oGroup){
                return oGroup;
            }
            //如果没有绘制过，返回父节点
            else{
                var oCollapseGroups = oTopo.Stage.findGroupByTagAttr("uiExpandNode", false, oTopo);
                for(var i = 0, len = oCollapseGroups.length; i < len; i++){
                    var oCollapseGroup = oCollapseGroups[i];
                    var b = oCollapseGroup.tag.children.some(function(oChild, index){
                        return oChild.id === strId;
                    });
                    if(b){
                        return oCollapseGroup;
                    }
                }
            }
            return undefined;
        };

        this.selectNodesById = function(arrNodeIds, oTopo){
            arrNodeIds.forEach(function(nodeId, index){
                var oNodeGroup = oTopo.Stage.findOne(nodeId, oTopo);
                oNodeGroup.tag.uiSelectNode = true;
                _setSelectNodeStyle(oNodeGroup.children[0], oTopo);
            });
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };


        //#endregion
    }
})(jQuery);