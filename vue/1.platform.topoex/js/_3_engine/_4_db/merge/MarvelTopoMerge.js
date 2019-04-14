/**
 * Created by hou on 17/12/22.
 */
(function($){
    $.MarvelTopoMerge = function(){
        var self = this;

        this.Plugin = {};

        //region regTopoDBMergePlugin

        this.regTopoDBMergePlugin = function(oMergePlugin){
            self.Plugin = oMergePlugin;
        };

        //endregion

        //region merge

        this.merge = function(arrCapIds, oTopo){
            var strCapIds = self.transformArrCapIdsToStrCapIds(arrCapIds);

            var oTopoDBMergePlugin4Node = self.Plugin[strCapIds].uiProp4Node;
            var oTopoDBMergePlugin4NodeTip = self.Plugin[strCapIds].uiTip4Node;
            var oTopoDBMergePlugin4Link = self.Plugin[strCapIds].uiProp4Link;
            var oTopoDBMergePlugin4LinkTip = self.Plugin[strCapIds].uiTip4Link;

            if(undefined != oTopoDBMergePlugin4Node){
                for(var i = 0; i < oTopo.nodes.length ; i++){
                    oTopoDBMergePlugin4Node(oTopo.nodes[i]);
                    if(oTopo.nodes[i].params.isSelect){
                        oTopoDBMergePlugin4NodeTip(oTopo.nodes[i]);
                    }
                }
                for(var i = 0; i < oTopo.links.length ; i++){
                    oTopoDBMergePlugin4Link(oTopo.links[i]);
                    if(oTopo.links[i].params.isSelect){
                        oTopoDBMergePlugin4LinkTip(oTopo.links[i]);
                    }
                }
            }
        };

        //endregion

        //region transformArrCapIdsToStrCapIds

        this.transformArrCapIdsToStrCapIds = function(arrCapIds){
            var strCapIds = "";

            for(var i = 0; i < arrCapIds.length; i++){
                if(i == arrCapIds.length - 1){
                    strCapIds += arrCapIds[i];
                }
                else{
                    strCapIds += arrCapIds[i] + "_";
                }
            }
        };

        //endregion

        //region merge4NodeTip

        this.merge4NodeTip = function(arrCapIds, oNode){
            var strCapIds = self.transformArrCapIdsToStrCapIds(arrCapIds);
            var oTopoDBMergePlugin4NodeTip = self.Plugin[strCapIds].uiTip4Node;

            if(undefined != oTopoDBMergePlugin4NodeTip){
                oTopoDBMergePlugin4NodeTip(oNode);
            }
        };

        //endregion

        //region merge4LinkTip

        this.merge4LinkTip = function(arrCapIds, oLink){
            var strCapIds = self.transformArrCapIdsToStrCapIds(arrCapIds);
            var oTopoDBMergePlugin4LinkTip = self.Plugin[strCapIds].uiTip4Link;

            if(undefined != oTopoDBMergePlugin4LinkTip){
                oTopoDBMergePlugin4LinkTip(oLink);
            }
        };

        //endregion

        //region merge4NodeProp

        this.merge4NodeProp = function(arrCapIds, oNode){
            var strCapIds = self.transformArrCapIdsToStrCapIds(arrCapIds);
            var oTopoDBMergePlugin4Node = self.Plugin[strCapIds].uiProp4Node;

            if(undefined != oTopoDBMergePlugin4Node){
                oTopoDBMergePlugin4Node(oNode);
            }
        };

        //endregion

        //region merge4LinkProp

        this.merge4LinkProp = function(arrCapIds, oLink){
            var strCapIds = self.transformArrCapIdsToStrCapIds(arrCapIds);
            var oTopoDBMergePlugin4Link = self.Plugin[strCapIds].uiProp4Link;

            if(undefined != oTopoDBMergePlugin4Link){
                oTopoDBMergePlugin4Link(oLink);
            }
        };

        //endregion

    };
})(jQuery);
