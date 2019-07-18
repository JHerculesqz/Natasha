(function($){
    $.MarvelTopoLink = function() {
        //region Const

        var OFFSET = 10;

        //endregion

        //region fields

        var self = this;

        //endregion

        //region draw

        this.draw = function(oBuObj, iOffsetIndex, oTopo){
            //remove
            var oLinkExists = oTopo.Stage.findOne(oBuObj.id, oTopo);
            if(oLinkExists){
                oLinkExists.destroy();
                oTopo.Layer.reDraw(oTopo.ins.layerLink);
            }

            //oNodeSrc/oNodeDst
            var oNodeSrc = oTopo.Stage.findOne(oBuObj.srcNodeId, oTopo);
            var oNodeDst = oTopo.Stage.findOne(oBuObj.dstNodeId, oTopo);

            //oPosStart/oPosMid/oPosEnd
            var oPosStart = {
                x: oTopo.Sprite.Node.getCenterPos(oNodeSrc).x,
                y: oTopo.Sprite.Node.getCenterPos(oNodeSrc).y
            };
            var oPosEnd = {
                x: oTopo.Sprite.Node.getCenterPos(oNodeDst).x,
                y: oTopo.Sprite.Node.getCenterPos(oNodeDst).y
            };
            var iOffsetHeight = 0;
            if(0 == iOffsetIndex % 2){
                iOffsetHeight = iOffsetIndex/2 * OFFSET;
            }
            else{
                iOffsetHeight = -(iOffsetIndex+1)/2 * OFFSET;
            }
            var oPosMid = _getBezierPoint(oPosStart, oPosEnd, iOffsetHeight);

            var oLine = new Konva.Line({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                points: [oPosStart.x, oPosStart.y, oPosMid.x, oPosMid.y, oPosEnd.x, oPosEnd.y],
                stroke: oTopo.Resource.getTheme().link.linkColor[oBuObj.uiLinkColorKey],
                strokeWidth: oBuObj.uiLinkWidth,
                tension: 1
            });
            oLine.tag = oBuObj;
            oTopo.ins.layerLink.add(oLine);

            return oLine;
        };

        //endregion

        //region style

        var _getBezierPoint = function(oPointStart, oPointEnd, iHeight){
            //1.oPointMid
            var oPointMid = {
                x: (oPointEnd.x - oPointStart.x)/2 + oPointStart.x,
                y: (oPointEnd.y - oPointStart.y)/2 + oPointStart.y
            };

            //2.iSin/iCos
            var iDistance = Math.sqrt(
                Math.pow(oPointEnd.x - oPointStart.x, 2) +
                Math.pow(oPointEnd.y - oPointStart.y, 2), 2);
            var iSin = (oPointEnd.y - oPointStart.y)/iDistance;
            var iCos = (oPointEnd.x - oPointStart.x)/iDistance;

            //3.iOffsetX/iOffsetY
            var iOffsetX = iHeight * iSin;
            var iOffsetY = iHeight * iCos;

            //4.oBezierPoint
            return {
                x: oPointMid.x + iOffsetX,
                y: oPointMid.y + iOffsetY
            };
        };

        //endregion

        //region imsg

        //endregion
    }
})(jQuery);