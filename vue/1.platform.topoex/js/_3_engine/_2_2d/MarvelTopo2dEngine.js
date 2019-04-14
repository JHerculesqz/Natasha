(function ($) {
    $.MarvelTopo2dEngine = function (oParent) {
        var self = this;

        //region Const

        this.WIDGET_NAME = "MarvelTopo2dEngine";

        this.EVENT_DOWN = "EVENT_DOWN";
        this.EVENT_MOVE = "EVENT_MOVE";
        this.EVENT_DRAG = "EVENT_DRAG";
        this.EVENT_CLICK = "EVENT_CLICK";
        this.Event_DBCLICK = "Event_DBCLICK";

        this.EVENT_LEFT = "EVENT_LEFT";
        this.EVENT_RIGHT = "EVENT_RIGHT";

        this.INPATH_NODE = "INPATH_NODE";
        this.INPATH_LINK = "INPATH_LINK";
        this.INPATH_BG = "INPATH_BG";

        //endregion

        //region Fields

        var m_oParent = oParent;
        this.m_oOptions = undefined;
        this.Event = new $.MarvelTopo2dEngineEvent(self);
        this.SlideWnd = new $.MarvelTopo2dEngineSlideWnd(self);
        this.Layer = new $.MarvelTopo2dEngineLayer(self);
        this.Node = new $.MarvelTopo2dEngineNode(self);
        this.Link = new $.MarvelTopo2dEngineLink(self);
        this.Tip = new $.MarvelTopo2dEngineTip(self);

        this.m_oCanvas = undefined;
        this.m_oCanvasContext = undefined;
        this.m_oVMCanvas = undefined;
        this.m_oVMCanvasContext = undefined;

        var DRAG_BG_MODE = false;
        this.CUR_MODE = "";

        //endregion

        //region init

        /**
         * 初始化2D引擎
         * @param oOptions
         */
        this.init = function(oOptions){
            self.m_oOptions = oOptions;

            //1.init canvas
            _initCanvas(oOptions);

            //2.init listener
            _initListener();

            //3.init slideWndWH
            self.SlideWnd.initSlideWndWH(oOptions);
        };

        //region _initCanvas

        var _initCanvas = function(oOptions){
            //init canvas
            var strCanvasId = CUIEncode.encode(self.m_oOptions.id, "canvas", self.WIDGET_NAME);
            var strVmCanvasId = CUIEncode.encode(self.m_oOptions.id, "vmcanvas", self.WIDGET_NAME);
            var strHtml =
                '<canvas id="{0}" width="{2}" height="{3} tabindex="1" style="z-index:0;position:absolute;outline: 0 none"></canvas>' +
                '<canvas id="{1}" width="{2}" height="{3} tabindex="1" style="z-index:1;position:absolute;outline: 0 none"></canvas>';
            var iWidth;
            var iHeight;
            if(self.m_oOptions.width && self.m_oOptions.height){
                iWidth = self.m_oOptions.width;
                iHeight = self.m_oOptions.height;
            }
            else{
                iWidth = $("#" + self.m_oOptions.parentId).width();
                iHeight = $("#" + self.m_oOptions.parentId).height();
            }
            strHtml = CString.format(strHtml, strCanvasId, strVmCanvasId, iWidth, iHeight);
            $("#" + self.m_oOptions.parentId).append(strHtml);

            //2.focus
            $("#" + strCanvasId).focus();

            //3.hover
            $("#" + strCanvasId).hover(function(){
                //1.
                _exitMoveEvent();

                //2.clearCanvas
                _clearCanvas(self.m_oVMCanvasContext, self.m_oVMCanvas.width, self.m_oVMCanvas.height);
            });

            //5.mouseleave
            $("#" + self.m_oOptions.parentId).mouseleave(function(){
                _exitMoveEvent();
            });

            //z.get canvas and canvas and canvasContext
            self.m_oCanvas = $("#" + strCanvasId)[0];
            self.m_oCanvasContext = $("#" + strCanvasId).getContext("2d");
            self.m_oVMCanvas = $("#" + strVmCanvasId)[0];
            self.m_oVMCanvasContext = $("#" + strVmCanvasId).getContext("2d");

            //z-1.init mouse cursor
            self.setMouseCur("none");
        };

        var _exitMoveEvent = function(){
            clearTimeout(m_oTimeFn4Click);
            clearTimeout(m_oTimeFn4Move);
            m_bIdDrag = 0;
            _bindMouseUMDListener({down: true});
        };
        var _clearCanvas = function(oCanvas, iWidth, iHeight){
            oCanvas.width = 0;
            oCanvas.height = 0;
            oCanvas.width = iWidth;
            oCanvas.height = iHeight;
            oCanvas.clearRect(0, 0, iWidth, iHeight);
        };

        var m_bIdDrag = false;
        var DBLCLICK_TIMER_INTERVER = 500; //DBLCLICK TIME
        var MOVE_TIMER_INTERVER = 100/30; //move time
        var MOVE_COUNT = 0;
        var MOVE_MAX_COUNT = 3;
        var m_oTimeFn4Click;
        var m_oTimeFn4Move;
        var m_bStopMoveTimer;
        var m_strEventType;
        var m_oStartPoint;
        var m_arrMovePoint = [];
        var m_oEndPoint;
        var m_oResWhoIdInPath;
        var HAND_CUR_WIDTH = 13;
        var HAND_CUR_HEIGHT = 13;
        var HAND_CROSS_CUR_WIDTH = 24;
        var HAND_CROSS_CUR_HEIGHT = 24;
        var m_strEventCode;
        var m_bIsBlackSpaceDown = false;
        var m_bIsRegionModeStart = false;
        var m_oCurMouseMovePoint = {};

        var _initListener = function(){
            //1.keyboard-ctrl/space/shift
            _addKeyboardListener();

            //2.keyboard other
            _addKeyboardOtherListener();

            //3.mouse
            //3.1mouse wheel
            self.m_oVMCanvas.addEventListener("mousewheel", function(event){
                var oMouseWheelPoint = _getPointOnCanvas(event);
                var iStep = event.wheelDelta / 120;
                if(iStep >= 1){
                    iStep = 1;
                }
                else if(Step <= 1){
                    iStep = -1
                }
                _precessMouseWheel(oMouseWheelPoint, iStep);
                return event.preventDefault();
            }, false);
            self.m_oVMCanvas.addEventListener("DOMMmouseScroll", function(event){
                var oMouseWheelPoint = _getPointOnCanvas(event);
                var iStep = -event.detail / 3;
                if(iStep >= 1){
                    iStep = 1;
                }
                else if(Step <= 1){
                    iStep = -1
                }
                _precessMouseWheel(oMouseWheelPoint, iStep);
                return event.preventDefault();
            }, false);

            //3.2.mouse move
            self.m_oVMCanvas.addEventListener("mousemove", function(event){
                m_oCurMouseMovePoint = _getPointOnCanvas(event);
                m_oParent.Event.mouseMove(m_oCurMouseMovePoint);
            });
            //3.3.nousedown
            _bindMouseUMDListener({down:true});
            //3.4.mouse dbclick
            self.m_oVMCanvas.addEventListener("dblclick", _afterDBClick, false);
        };

        var _addKeyboardListener = function(){
            $(document).keydown(function(event){
                if(32 === event.keyCode){
                    try{
                        //blackspace down
                        _processBlackSpaceDown();
                    }
                    catch(ex){
                        console.log("black space down exception");
                    }
                }
            });
            $(document).keyup(function(event){
                if(32 === event.keyCode){
                    try{
                        //blackspace down
                        _processBlackSpaceUp();
                    }
                    catch(ex){
                        console.log("black space up exception");
                    }
                }
            });
        };
        var _addKeyboardOtherListener = function(){
            self.m_oVMCanvas.addEventListener("keydown", function(event){
                if(38 === event.keyCode){
                    if(CHNBKeyBoard.isCtrlKeyDown()){
                        _zoomInTopoByKeyBoard(m_oCurMouseMovePoint);
                    }
                    return event.preventDefault();
                }
                else if(40 === event.keyCode){
                    if(CHNBKeyBoard.isCtrlKeyDown()){
                        _zoomOutTopoByKeyBoard(m_oCurMouseMovePoint);
                    }
                    return event.preventDefault();
                }
            });
        };
        var _zoomInTopoByKeyBoard = function(oMousePoint){
            _zooTopoByKeyBoard(oMousePoint, 1);
        };
        var _zoomOutTopoByKeyBoard = function(oMousePoint){
            _zooTopoByKeyBoard(oMousePoint, -1);
        };


        //endregion

        //region _bindMouseUMDListener

        var _bindMouseUMDListener = function(oBindOption){
            if(oBindOption.down){
                self.m_oVMCanvas.addEventListener("mousedown", _afterMouseDown, false);
            }
            else{
                self.m_oVMCanvas.removeEventListener("mousedown", _afterMouseDown, false);
            }

            if(oBindOption.move){
                self.m_oVMCanvas.addEventListener("mousemove", _afterMouseMove, false);
            }
            else{
                self.m_oVMCanvas.removeEventListener("mousemove", _afterMouseMove, false);
            }

            if(oBindOption.up){
                self.m_oVMCanvas.addEventListener("mouseup", _afterMouseUp, false);
            }
            else{
                self.m_oVMCanvas.removeEventListener("mouseup", _afterMouseUp, false);
            }
        };
        var _afterMouseDown = function(event){
            //0.init
            m_oTimeFn4Click = null;
            m_oTimeFn4Move = null;
            m_bStopMoveTimer = undefined;
            m_strEventType = undefined;
            m_oStartPoint = undefined;
            m_oEndPoint = undefined;
            m_oResWhoIdInPath = undefined;
            if(CHNBKeyboard.isSpacedown() || DRAG_BG_MODE){
                var strCavnasCursorClass = _getCAvansCursorClass();
                if(strCavnasCursorClass.contains("handopen")){
                    self.setMouseCur("handclose");
                }
            }
            m_bIdDrag = 0;
            m_strEventType = self.EVENT_DOWN;
            m_oStartPoint = _getPointOnCanvas(event);
            m_arrMovePoint = [];
            m_arrMovePoint.push(m_oStartPoint);
            m_strEventCode = _getEventCodeOnCanvas(event);

            //1.hitTest
            _hitTest(function(oResWhoIdInPath){
                m_oResWhoIdInPath = oResWhoIdInPath;

                //2.bingMouseUMDListerne
                _bingMouseUMDListerne({up: true, move: true});
                m_oTimeFn4Move = setInterval(_afterMouseMoveTimer, MOVE_TIMER_INTERVER);

                //3.process
                _processMouseDown(m_strEventCode, m_strEventType, m_oStartPoint, oResWhoIdInPath);
            });
        };

        var _afterMouseMove = function(event){
            MOVE_COUNT++;
            if(MOVE_COUNT >= MOVE_MAX_COUNT){
                //0.INIT
                MOVE_COUNT = 0;
                m_bIdDrag = 1;
                m_strEventType = self.EVENT_MOVE;
                var oCurMovePoint = _getPointOnCavnas(event);
                m_arrMovePoint.push(oCurMovePoint);

            }
        };
        var _afterMouseMoveTimer = function(){
            if(m_bStopMoveTimer){
                if(m_arrMovePoint.length > 1){
                    var oFirstMovePoint = m_arrMovePoint.shift();
                    var oSecondMovePoint = m_arrMovePoint[0];
                    _processMovePoint(m_strEventCode, m_strEventType, m_oStartPoint, oFirstMovePoint, oSecondMovePoint, m_oResWhoIdInPath);
                }
                else{
                    clearInterval(m_oTimeFn4Move);
                }
            }
            else{
                if(m_arrMovePoint.length > 1) {
                    var oFirstMovePoint = m_arrMovePoint.shift();
                    var oSecondMovePoint = m_arrMovePoint[0];
                    _processMovePoint(m_strEventCode, m_strEventType, m_oStartPoint, oFirstMovePoint, oSecondMovePoint, m_oResWhoIdInPath);
                }
            }
        };

        var _afterMouseUp = function(event){
            //0.init
            _bindMouseUMDListener({down: true});

            if(m_bIdDrag === 0){
                m_strEventType = self.EVENT_CLICK;
            }
            else if(m_bIdDrag ===  1){
                m_strEventType = self.EVENT_DRAG;
            }
            m_oEndPoint = _gtePointOnCanvas(event);
            m_bStopMoveTimer = true;
            if(m_bIdDrag == 0){
                //2.1.click
                clearTimeout(m_oTimeFn4Click);
                m_oTimeFn4Click = setTimeout(function(){
                    //2.2.CLICK
                    m_bIdDrag = 0;

                    //2.3
                    _processClickEvent(m_strEventCode, m_strEventType, m_oStartPoint, m_oEndPoint, m_oResWhoIdInPath)

                }, DBLCLICK_TIMER_INTERVER)
            }
            else if(m_bIdDrag === 1){
                //2.2.drag
                clearInterval(m_oTimeFn4Move);
                var oFirstMovePoint = m_arrMovePoint.shift();
                if(undefined == oFirstMovePoint){
                    oFirstMovePoint = m_oStartPoint;
                }
                m_arrMovePoint = [];
                if(CHNBKeyBoard.isSpaceKeydown() && m_oResWhoIdInPath.whoIsInPath == self.INPATH_BG || m_oResWhoIdInPath.whoIsInPath == slef.INPATH_NODE){
                    _processMoveEvent(m_strEventCode, m_strEventType, m_oStartPoint, oFirstMovePoint, m_oEndPoint, m_oResWhoIdInPath)
                }
                m_bIdDrag = 0;
            }

            if(CHNBKeyBoard.isSpaceKeydown() &&  !DRAG_BG_MODE && m_oResWhoIdInPath.whoIsInPath == self.INPATH_BG && m_bIsRegionModeStart){
                m_oParent.Event.regionDragEnd(m_oStartPoint, m_oEndPoint);
            }

            var strCanvascursorClass = _getCanvasCursorClass();
            if(CHNBKeyboard.isSpaceKeydown() || DRAG_BG_MODE){
                self.setMouseCur("handopen");
            }
            else{
                self.setMouseCur("none");
            }
            m_bIsRegionModeStart = false;
        };

        var _afterDBClick = function(event){
            clearTimeout(m_oTimeFn4Click);
            m_strEventType = self.EVENT_DBLCLICK;
            m_oEndPoint = _getPointOnCavnas(event);

            m_bIdDrag = 0;
            _bindMouseUMDListener({down:true});

            _processDBClickEvent(m_strEventCode, m_strEventType, m_oStartPoint, m_oEndPoint, m_oResWhoIdInPath)
        };

        var _processMouseWheel = function(oMousePoint, iStep){
            m_oParent.Event.mousewheel(oMousePoint, iStep);
        };
        var _zoomTopoByKeyboard = function(oMousePoint, iStep){
            m_oParent.Event.zoomTopoByKeyboard(oMousePoint, iStep);
        };
        var _processBlackSpaceDown = function(event){
            m_bIsBlackSpaceDown = true;
            if(DRAG_BG_MODE){
                return ;
            }
            var strCavnasCursorClass = _getCanvasCursorClass();
            if(strCavnasCursorClass.contains("none") || strCavnasCursorClass.contains("normal")){
                self.setMouseCur("handopen");
            }
        };
        var _processBlackSpaceUp = function(event){
            m_bIsBlackSpaceDown = false;
            if(DRAG_BG_MODE){
                return ;
            }
            var strCavnasCursorClass = _getCanvasCursorClass();
            if(strCavnasCursorClass.contains("close") || strCavnasCursorClass.contains("open")){
                self.setMouseCur("none");
            }
            m_oStartPoint = _getPointOnCavnas(event);
        };
        var _getCanvasCursorClass = function(){
            var strVmCanvasId = CUIEncode.encode(self.m_oOptions.id, "vmcanvas", self.WIDGET_NAME);
            var strCanvasClass = $("#" + strVmCanvasId).attr("class");
            return strCanvasClass;
        };
        var _processMouseDown = function(strEventCode, strEventType, oStartPoint, oResWhoIdInPath){
            if(CHNBKeyboard.isSpaceKeydown() || DRAG_BG_MODE){
                return;
            }
            if(self.INPATH_NODE == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    m_oParent.Event.nodeCtrlDown(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint);
                }
                else{
                    m_oParent.Event.nodeDown(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint);
                }
            }
            else if(self.INPATH_LINK == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    m_oParent.Event.linkCtrlDown(oResWhoIdInPath.linkGroup, strEventType, strEventCode, oStartPoint);
                }
                else{
                    m_oParent.Event.linkDown(oResWhoIdInPath.linkGroup, strEventType, strEventCode, oStartPoint);
                }
            }
            else{
                m_oParent.Event.bgDown(strEventType, strEventCode, oStartPoint);
            }
        };
        var _processMoveEvent = function(strEventCode, strEventType, oStartPoint, oFirstPoint, oSecondPoint, oResWhoIdInPath){
            if(CHNBKeyboard.isSpaceKeydown() || DRAG_BG_MODE){
                m_oParent.Event.bgMove(strEventType, strEventCode, oStartPoint, oFirstPoint, oSecondPoint);
            }
            if(self.INPATH_NODE == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    m_oParent.Event.nodeCtrlMove(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint, oFirstPoint, oSecondPoint);
                }
                else{
                    m_oParent.Event.nodeMove(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint, oFirstPoint, oSecondPoint);
                }
            }
            else if(self.INPATH_LINK == oResWhoIdInPath.whoIsInPath){
                //do nothing
            }
            else{
                m_bIdRegionDragStart = true;
                m_oParent.Event.regionDragStart(m_oStartPoint, oFirstPoint);
            }
        };

        var _processClickEvent = function(strEventCode, strEventType, oStartPoint, oEndPoint, oResWhoIdInPath){
            if(CHNBKeyboard.isSpaceKeydown() || DRAG_BG_MODE){
                return;
            }
            if(self.INPATH_NODE == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    //m_oParent.Event.nodeCtrlClick(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint);
                }
                else{
                    //m_oParent.Event.nodeClick(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint);
                }
            }
            else if(self.INPATH_LINK == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    //m_oParent.Event.linkCtrlClick(oResWhoIdInPath.linkGroup, strEventType, strEventCode, oStartPoint);
                }
                else{
                    //m_oParent.Event.linkClick(oResWhoIdInPath.linkGroup, strEventType, strEventCode, oStartPoint);
                }
            }
            else{
                //m_oParent.Event.bgClick(strEventType, strEventCode, oStartPoint);
            }
        };
        var _processDBClickEvent = function(strEventCode, strEventType, oStartPoint, oEndPoint, oResWhoIdInPath){
            if(CHNBKeyboard.isSpaceKeydown() || DRAG_BG_MODE){
                return;
            }
            if(self.INPATH_NODE == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    m_oParent.Event.nodeCtrlDBClick(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint);
                }
                else{
                    m_oParent.Event.nodeDBClick(oResWhoIdInPath.nodeGroup, strEventType, strEventCode, oStartPoint);
                }
            }
            else if(self.INPATH_LINK == oResWhoIdInPath.whoIsInPath){
                if(CHNBKeyboard.isCtrlKeyDown()){
                    m_oParent.Event.linkCtrlDBClick(oResWhoIdInPath.linkGroup, strEventType, strEventCode, oStartPoint);
                }
                else{
                    m_oParent.Event.linkDBClick(oResWhoIdInPath.linkGroup, strEventType, strEventCode, oStartPoint);
                }
            }
            else{
                m_oParent.Event.bgDBClick(strEventType, strEventCode, oStartPoint);
            }
        };

        var _hitTest = function(oAfterHitTest){
            if(CHNBKeyboard.isSpaceKeydown() || DRAG_BG_MODE){
                var oResWhoIsInPath = {
                    whoIsInPath: self.INPATH_BG,
                    nodeGroup: undefined,
                    linkGroup: undefined
                };
                oAfterHitTest(oResWhoIsInPath)
            }
            else{
                //1.getAreaData
                var oCurTopo = m_oParent.DB.Area.getAreaTopo4Draw(m_oParent.Engine.SlideWnd.config, m_oParent.DB.mergeTopo);

                //2.
                var oOrderTopoRes = _sortByGroupNode(oCurTopo);

                //3.v
                var oResWhoIsInPath = _drawPath(oOrderTopoRes.nodes, oOrderTopoRes.links, m_strEventType, m_oStartPoint, m_oEndPoint);

                //4.
                oAfterHitTest(oResWhoIsInPath);
            }
        };
        var _sortByGroupNode = function(oTopo){
            var oRes = {
                links: oTopo.links,
                nodes:[]
            };
            var arrGroupNode = [];
            for(var i = 0; i < oTopo.nodes.length; i++){
                if(oTopo.nodes[i].params.uiGroupParent){
                    arrGroupNode.push(oTopo.nodes[i]);
                }
                else{
                    oRes.nodes.push(oTopo.nodes[i]);
                }
            }
            for(var i = 0; i < arrGroupNode.length; i++){
                oRes.nodes.push(arrGroupNode[i]);
            }
            return oRes;
        };
        var _getPointOnCanvas = function(event){
            var bRect = self.m_oCanvas.getBoundingClientRect();
            var strCavnasCursorClass = _getCanvasCursorClass();
            if(strCavnasCursorClass.contains("AREASELECT") || strCavnasCursorClass.contains("addLink")){
                var x = event.clientX + HAND_CROSS_CUR_WIDTH / 2 - bRect.left * (self.m_oCanvas.width / bRect.width);
                var y = event.clientY + HAND_CROSS_CUR_HEIGHT / 2 - bRect.top * (self.m_oCanvas.height / bRect.height);
                return {
                    x: x,
                    y: y
                }
            }
            else if(strCavnasCursorClass.contains("open") || strCavnasCursorClass.contains("close")){
                var x = event.clientX + HAND_CUR_WIDTH / 2 - bRect.left * (self.m_oCanvas.width / bRect.width);
                var y = event.clientY + HAND_CUR_HEIGHT / 2 - bRect.top * (self.m_oCanvas.height / bRect.height);
                return {
                    x: x,
                    y: y
                }
            }
            else{
                var x = event.clientX - bRect.left * (self.m_oCanvas.width / bRect.width);
                var y = event.clientY - bRect.top * (self.m_oCanvas.height / bRect.height);
                return {
                    x: x,
                    y: y
                }
            }
        };
        var _getEventCodeOnCavnas = function(event){
            var strValue = event.button;
            if(strValue == 2 || strValue == 3){
                return self.EVENT_RIGHT;
            }
            else{
                return self.EVENT_LEFT;
            }
        };

        var _drawPath = function(arrNodeGroup, arrLinkGroup, strEventType, oStartPoint, oEndPoint){
            var oResWhoIsInPath = {
                whoISInPath: self.INPATH_BG,
                nodeGroup: undefined,
                linkGroup: undefined
            };

            var arrGroupNodes = [];
            var arrEditNodes = [];
            for(var i = 0; i < arrNodeGroup.length; i++){
                var oNodeGroup = arrNodeGroup[i];
                if(oNodeGroup.params.uiGroupParent){
                    arrGroupNodes.push(oNodeGroup);
                }
                else if(oNodeGroup.params.uiEditNode){
                    arrEditNodes.push(oNodeGroup);
                }
                else{
                    _drawNode4DrawPath(oNodeGroup, oStartPoint, oEndPoint, oResWhoIsInPath);
                    if(self.INPATH_NODE == oResWhoIsInPath.whoISInPath){
                        return oResWhoIsInPath;
                    }
                }
            }

            for(var i = 0; i < arrLinkGroup.length; i++){
                var oLinkGroup = arrLinkGroup[i];
                _drawLink4DrawPath(oLinkGroup, oStartPoint, oEndPoint, oResWhoIsInPath);
                if(self.INPATH_LINK == oResWhoIsInPath.whoISInPath){
                    return oResWhoIsInPath;
                }
            }

            for(var i = 0; i < arrGroupNodes.length; i++){
                var oNodeGroup = arrGroupNodes[i];
                _drawNode4DrawPath(oNodeGroup, oStartPoint, oEndPoint, oResWhoIsInPath);
                if(self.INPATH_NODE == oResWhoIsInPath.whoISInPath){
                    return oResWhoIsInPath;
                }
            }

            for(var i = 0; i < arrEditNodes.length; i++){
                var oNodeGroup = arrEditNodes[i];
                _drawNode4DrawPath(oNodeGroup, oStartPoint, oEndPoint, oResWhoIsInPath);
                if(self.INPATH_NODE == oResWhoIsInPath.whoISInPath){
                    return oResWhoIsInPath;
                }
            }

            return oResWhoIsInPath;
        };

        var _drawNode4DrawPath = function(oNodeGroup, oStartPoint, oEndPoint, oResWhoIsInPath){
            self.Node.drawNode4DrawPath(oNodeGroup, oStartPoint, oEndPoint, oResWhoIsInPath, self.m_oCanvasContext);
        };
        var _drawLink4DrawPath = function(oLinkGroup, oStartPoint, oEndPoint, oResWhoIsInPath){
            self.Link.drawLink4DrawPath(oLinkGroup, oStartPoint, oEndPoint, oResWhoIsInPath, self.m_oCanvasContext);
        };

        //endregion

        //endregion

        // region setMouseCur

        this.setMouseCur = function(strType){
            var strCanvasId = CUIEncode.encode(self.m_oOptions.id, "canvas", self.WIDGET_NAME);
            $("#" + strCanvasId).removeClass();
            var strClass = "marvelTopo_cursor_" + strType;
            $("#" + strCanvasId).addClass(strClass);
        };

        //endregion

        //region drawItem

        this.drawItem = function(arrNodes, arrLinks, arrAllNodes){
            //1.clear canvas
            _clearCanvas(self.m_oCanvasContext, self.m_oCanvas.width, self.m_oCanvas.height);
            _clearCanvas(self.m_oVMCanvasContext, self.m_oVMCanvas.width, self.m_oVMCanvas.height);

            //2.
            self.Layer.drawLayer(self.m_oCanvasContext, self.SlideWnd.conf, arrAllNodes, self.m_oCavnas.width);

            _drawLinks(arrLinks, arrNodes);
            _drawNodes(arrNodes);

            //3.tip
            var oUiSlideWH = self.SlideWnd.getUISlideWH();
            for(var i = 0; i < arrLinks.length; i++){
                var oLink = arrLinks[i];
                _drawLinkTip(oLink, oUiSlideWH);
            }
            for(var i = 0; i < arrNodes.length; i++){
                var oNode = arrNodes[i];
                _drawNodeTip(oNode, oUiSlideWH);
            }
        };

        var _drawNodes = function(arrNodes){
            self.Node.drawNodes(arrNodes, self.SlideWnd.conf.slideWndZ, self.m_dicImages, self.m_oCanvasContext);
        };
        var _drawLinks = function(arrLinks, arrNodes){
            self.Link.drawLinks(arrLinks, arrNodes, self.SlideWnd.conf.slideWndZ, self.m_dicImages, self.m_oCanvasContext);
        };
        var _drawNodeTip = function(oNode, oUiSlideWH){
            self.Node.drawNodeTip(oNode, oUiSlideWH, self.m_oVMCanvasContext);
        };
        var _drawLinkTip = function(oLink, oUiSlideWH){
            self.Link.drawLinkTip(oLink, oUiSlideWH, self.m_oVMCanvasContext);
        };

        //endregion

        //region drawRegionDragRectangle

        this.drawRegionDragRectangle = function(oFirstMovePoint, oSecondMovePoint){
            //1.clear canvas
            self.m_oVMCanvasContext.clearRect(0, 0, self.m_oVMCanvas.width, self.m_oVMCanvas.height);
            self.Node.drawRegionDragRectangle(oFirstMovePoint, oSecondMovePoint, self.m_oVMCanvasContext);
        };

        //endregion

        //region topoCanvasAutoFitBy3rd

        this.topoCanvasAutoFitBy3rd = function(){
            var iWidth = $("#" + self.m_oOptions.parentId).width();
            var iHeight = $("#" + self.m_oOptions.parentId).height();
            self.m_oVMCanvas.height = iHeight;
            self.m_oVMCanvas.width = iWidth;
            self.m_oCanvas.height = iHeight;
            self.m_oCanvas.width = iWidth;
        };

        //endregion

        //region isInitTopo

        this.isInitTopo = function(){
            if(self.m_oCavnas){
                return true;
            }
            else{
                return false;
            }
        };
        //endregion

        //region drawVirtualLinkBy3rd

        this.drawVirtualLinkBy3rd = function(oSrcNode, oDstNode, strColor){
            _clearCanvas(self.m_oVMCanvasContext, self.m_oVMCanvas.width, self.m_oVMCanvas.height);
            self.Link.drawVirtualLink(self.m_oVMCanvasContext, oSrcNode, oDstNode, strColor);
        };

        //endregion

        //region clearVirtualLink

        this.clearVirtualLink = function(){
            _clearCanvas(self.m_oVMCanvasContext, self.m_oVMCanvas.width, self.m_oVMCanvas.height);
        };

        //endregion

        //region dragBgBy3d

        this.dragBgBy3rd = function(){
            DRAG_BG_MODE = true;

            if(m_bIsBlackSpaceDown){
                return;
            }

            self.setMouseCur("handopen");
        };

        //endregion

        //region exitBgBy3rd


        this.exitBgBy3rd = function(){
            DRAG_BG_MODE = false;

            if(m_bIsBlackSpaceDown){
                return;
            }

            self.setMouseCur("none");
        };

        //endregion

        //region enterAdjustPathNode

        this.enterAdjustPathNode = function(arrSelectNodes, oDstPoint, bIsRealLine, strcolor, bNotDrawNodeToPointLine){
            _clearCanvas(self.m_oVMCanvasContext, self.m_oVMCanvas.width, self.m_oVMCanvas.height);
            self.Link.drawVirtualLink4AdjustPath(self.m_oVMCanvasContext, arrSelectNodes, oDstPoint, bIsRealLine, strcolor, bNotDrawNodeToPointLine);
        };

        //endregion

        //region exitMoveEvent

        this.exitMoveEvent = function(){
            _exitMoveEvent();
        };

        //endregion

        //region drawTopoLayer


        this.drawTopoLayer = function(arrLayerConf){
            _clearCanvas(self.m_oCanvasContext, self.m_oCanvas.width, self.m_oCanvas.height);
            self.Layer.drawTopoLayer(arrLayerConf, self.m_oCanvasContext);
        };

        //endregion

        //region clearTopoLayer4SwitchTopo

        this.clearTopoLayer4SwitchTopo = function(){
            _clearCanvas(self.m_oCanvasContext, self.m_oCanvas.width, self.m_oCanvas.height);
            self.Layer.clearTopoLayer4SwitchTopo();
        };

        //endregion

        //region setMode

        this.setMode = function(strMode){
            self.CUR_MODE = strMode;
        };

        //endregion
    }
})(jQuery);