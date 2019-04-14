(function ($) {
    $.MarvelSigma = function (oParent) {
        //#region Const

        //#endregion

        //region Fields

        var self = this;
        var parent = oParent;

        this.sigmaObj;

        //endregion

        //#region inner

        //#endregion

        //#region callback

        //#endregion

        //#region 3rd

        //#region init

        this.init = function (strDivId, oCallback) {
            //init
            self.sigmaObj = new sigma({
                container: strDivId,
                type: 'canvas'
            });
            self.sigmaObj.settings({
                defaultEdgeColor: '#ccc',
                defaultNodeColor: '#333',
                edgeColor: 'default',
                doubleClickEnabled: false,
                labelThreshold: 8
            });
            //event
            var oDragListener = sigma.plugins.dragNodes(self.sigmaObj,
                self.sigmaObj.renderers[0]);
            oDragListener.bind('startdrag', function (event) {
                console.log(event);
            });
            oDragListener.bind('drag', function (event) {
                console.log(event);
            });
            oDragListener.bind('drop', function (event) {
                console.log(event);
            });
            oDragListener.bind('dragend', function (event) {
                console.log(event);
            });
            self.sigmaObj.bind('clickNode', function (e) {
                if (oCallback) {
                    oCallback(e);
                }
            });
        };

        //#endregion

        //#region setData

        this.setData = function (arrNodes, arrLinks, oOptions) {
            //init options
            if (undefined == oOptions) {
                oOptions = {
                    clear: true,
                    layout: true
                };
            }
            //clear
            if (oOptions.clear) {
                self.clearData();
            }
            //nodes/links
            self.sigmaObj.graph.read({
                nodes: arrNodes,
                edges: arrLinks
            });
            self.sigmaObj.refresh();
            //layout
            if (oOptions.layout) {
                self.startLayout(arrNodes.length);
            }
        };

        //#endregion

        //#region updateData

        this.updateData = function (oFindCallback) {
            self.sigmaObj.graph.nodes().forEach(function (oNode) {
                if (oFindCallback) {
                    oFindCallback(oNode);
                }
            });
            self.sigmaObj.refresh();
        };

        //#endregion

        //#region refresh

        this.refresh = function () {
            self.sigmaObj.refresh();
        };

        //#endregion


        //#region private

        this.clearData = function () {
            self.sigmaObj.graph.clear();
            self.sigmaObj.refresh();
        };

        this.startLayout = function (iNodeCount) {
            var iSlowDown = 10;
            var iTimeout = 5000;
            if (iNodeCount < 20) {
                iSlowDown = 15;
                iTimeout = 500;
            }
            else if (iNodeCount < 50) {
                iSlowDown = 5;
                iTimeout = 1000;
            }
            else if (iNodeCount < 100) {
                iSlowDown = 2;
                iTimeout = 5000;
            }
            else if (iNodeCount < 250) {
                iSlowDown = 1;
                iTimeout = 5000;
            }
            else if (iNodeCount < 500) {
                iSlowDown = 0.8;
                iTimeout = 5000;
            }
            else if (iNodeCount < 1000) {
                iSlowDown = 0.4;
                iTimeout = 5000;
            }
            else if (iNodeCount < 2000) {
                iSlowDown = 0.3;
                iTimeout = 5000;
            }
            else if (iNodeCount < 5000) {
                iSlowDown = 0.1;
                iTimeout = 5000;
            }

            self.sigmaObj.startForceAtlas2({
                adjustSizes: false,
                gravity: 1,
                slowDown: iSlowDown
            });
            setTimeout(function () {
                self.stopLayout();
            }, iTimeout);
        };

        this.stopLayout = function () {
            if (self.sigmaObj.isForceAtlas2Running()) {
                self.sigmaObj.stopForceAtlas2();
            }
        };

        //#endregion

        //#endregion
    }
})(jQuery);