(function ($) {
    /**
     * TODO:待简化
     *
     * @param oParent
     * @constructor
     */
    $.MarvelTopo2dEngineEvent = function (oParent) {
        var self = this;

        //region Const

        this.WIDGET_NAME = "MarvelTopo2dEngineEvent";

        //endregion

        //region Fields

        var m_oParent = oParent;

        /**
         * mapEvent innerEvent/outerEvent
         * 潜规则：
         * m_oMapEvent={
         *  "zoom" : function(){},
         *  ....
         * }
         * @type {{}}
         */
        var m_oMapEvent = {

        };

        //endregion

        //region regEvent

        /**
         * regEvent
         * @param oMapEvent
         */
        this.regEvent = function (oMapEvent) {
            m_oMapEvent = oMapEvent;
        };

        //endregion

        //region mouseWheel

        /**
         * mouseWheel
         * @param oMouseWheelPoint
         * @param iStep
         */
        this.mouseWheel = function (oMouseWheelPoint, iStep) {
            m_oMapEvent.zoom(oMouseWheelPoint, iStep, "mousewheel");
        };

        //endregion

        //region zoomTopoByKeyboard

        this.zoomTopoByKeyboard = function (oMouseWheelPoint, iStep) {
            m_oMapEvent.zoom(oMouseWheelPoint, iStep, "keyboard");
        };

        //endregion

        //region nodeDown

        this.nodeDown = function (oNode, strEventType, strEventCode, oStartPoint) {
            m_oMapEvent.nodeDown(oNode, strEventType, strEventCode, oStartPoint);
        };

        //endregion

        //region nodeCtrlDown

        this.nodeCtrlDown = function (oNode, strEventType, strEventCode, oStartPoint) {
            m_oMapEvent.nodeCtrlDown(oNode, strEventType, strEventCode, oStartPoint);
        };

        //endregion

        //region linkDown

        this.linkDown = function (oLink, strEventType, strEventCode, oStartPoint) {
            m_oMapEvent.linkDown(oLink, strEventType, strEventCode, oStartPoint);
        };

        //endregion

        //region linkCtrlDown

        this.linkDown = function (oLink, strEventType, strEventCode, oStartPoint) {
            m_oMapEvent.linkCtrlDown(oLink, strEventType, strEventCode, oStartPoint);
        };

        //endregion

        //region bgDown

        this.bgDown = function (strEventType, strEventCode, oStartPoint) {
            m_oMapEvent.bgDown(strEventType, strEventCode, oStartPoint);
        };

        //endregion

        //region regionDragStart

        this.regionDragStart = function (oStartPoint, oFirstMovePoint) {
            m_oMapEvent.regionDragStart(oStartPoint, oFirstMovePoint);
        };

        //endregion

        //region regionDragEnd

        this.regionDragEnd = function (oStartPoint, oEndPoint) {
            m_oMapEvent.regionDragEnd(oStartPoint, oEndPoint);
        };

        //endregion

        //region nodeMove

        this.nodeMove = function (oNode, strEventType, strEventCode, oStartPoint, oFirstMovePoint, oSecondMovePoint) {
            m_oMapEvent.nodeMove(oNode, strEventType, strEventCode, oStartPoint, oFirstMovePoint, oSecondMovePoint);
        };

        //endregion

        //region nodeCtrlMove

        this.nodeCtrlMove = function (oNode, strEventType, strEventCode, oStartPoint, oFirstMovePoint, oSecondMovePoint) {
            m_oMapEvent.nodeCtrlMove(oNode, strEventType, strEventCode, oStartPoint, oFirstMovePoint, oSecondMovePoint);
        };

        //endregion

        //region bgMove

        this.bgMove = function (strEventType, strEventCode, oStartPoint, oFirstMovePoint, oSecondMovePoint) {
            m_oMapEvent.bgMove(strEventType, strEventCode, oStartPoint, oFirstMovePoint, oSecondMovePoint);
        };

        //endregion

        //region mouseMove

        this.mouseMove = function (oCurMousePoint) {
            m_oMapEvent.mouseMove(oCurMousePoint);
        };

        //endregion

        //region linkDBClick

        this.linkDBClick = function (oLink, strEventType, strEventCode, oStartPoint, oEndPoint) {
            m_oMapEvent.linkDBClick(oLink, strEventType, strEventCode, oStartPoint, oEndPoint);
        };

        //endregion

        //region linkCtrlDBClick

        this.linkCtrlDBClick = function (oLink, strEventType, strEventCode, oStartPoint, oEndPoint) {
            m_oMapEvent.linkCtrlDBClick(oLink, strEventType, strEventCode, oStartPoint, oEndPoint);
        };

        //endregion

        //region bgDBClick

        this.bgDBClick = function (strEventType, strEventCode, oStartPoint, oEndPoint) {
            m_oMapEvent.bgDBClick(oLink, strEventType, strEventCode, oStartPoint, oEndPoint);
        };

        //endregion

        //region nodeDBClick

        this.nodeDBClick = function (oNode, strEventType, strEventCode, oStartPoint, oEndPoint) {
            m_oMapEvent.nodeDBClick(oNode, strEventType, strEventCode, oStartPoint, oEndPoint);
        };

        //endregion

        //region nodeCtrlDBClick

        this.nodeCtrlDBClick = function (oNode, strEventType, strEventCode, oStartPoint, oEndPoint) {
            m_oMapEvent.nodeCtrlDBClick(oNode, strEventType, strEventCode, oStartPoint, oEndPoint);
        };

        //endregion
    }
})(jQuery);