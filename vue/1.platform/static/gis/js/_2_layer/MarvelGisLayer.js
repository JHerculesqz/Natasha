(function($){
    $.MarvelGisLayer = function() {
        var self = this;

        //region Fields

        //endregion

        //region init

        //endregion

        //region event

        //endregion

        //region imsg

        this.findById = function(strId, oGis){
            var oRes = undefined;

            oGis.Stage.mapObj.eachLayer(function (oLayer) {
                if(strId == oLayer.id){
                    oRes = oLayer;
                }
            });

            return oRes;
        };

        this.getDiffLst = function(lstItemId, arrItemUiType, oGis){
            var oRes = {
                delItemIdLst: [],
                addItemIdLst: [],
                updateItemIdLst: []
            };

            //0.get lstItemByLeafLet
            var lstItemByLeafLet = [];
            oGis.Stage.mapObj.eachLayer(function (oLayer) {
                for(var i=0;i<arrItemUiType.length;i++){
                    if(oLayer.buObj){
                        if(oLayer.buObj.uiType == arrItemUiType[i]){
                            lstItemByLeafLet.push(oLayer);
                            break;
                        }
                    }
                }
            });

            //1.get delItemIdLst/updateItemIdLst
            for(var i=0;i<lstItemByLeafLet.length;i++){
                var oItemByLeaflet = lstItemByLeafLet[i];

                var bIsExists = false;
                for(var j=0;j<lstItemId.length;j++){
                    var strId = lstItemId[j];
                    if(oItemByLeaflet.id == strId) {
                        bIsExists = true;
                        break;
                    }
                }

                if(!bIsExists){
                    oRes.delItemIdLst.push(oItemByLeaflet.id);
                }
                else{
                    oRes.updateItemIdLst.push(strId);
                }
            }

            //2.get addItemIdLst
            for(var j=0;j<lstItemId.length;j++){
                var strId = lstItemId[j];

                var bIsExists = false;
                for(var i=0;i<lstItemByLeafLet.length;i++){
                    var oItemByLeaflet = lstItemByLeafLet[i];

                    if(oItemByLeaflet.id == strId) {
                        bIsExists = true;
                        break;
                    }
                }

                if(!bIsExists){
                    oRes.addItemIdLst.push(strId);
                }
            }

            return oRes;
        };

        this.toGeoJSON = function (oGis) {
            var arrRes = [];

            oGis.Stage.mapObj.eachLayer(function (oLayer) {
                if(typeof oLayer.toGeoJSON == "function"){
                    arrRes.push(oLayer.toGeoJSON());
                }
            });

            return arrRes;
        };

        //endregion
    }
})(jQuery);