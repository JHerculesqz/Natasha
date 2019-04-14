(function ($) {
    $.MarvelArbor = function (oParent) {
        //#region Const

        //#endregion

        //region Fields

        var self = this;
        var parent = oParent;

        this.sigmaObj;

        //#region abor保留
        // this.sys;
        // this.particleSystem;
        //#endregion

        //endregion

        //#region inner

        //#endregion

        //#region callback

        //#endregion

        //#region 3rd

        //#region init

        this.init = function (strDivId) {
            self.sigmaObj = new sigma({
                graph: {
                    nodes: [],
                    edges: []
                },
                container: strDivId
            });

            // s.bind('clickNode', function(e) {
            //     console.log(e.type, e.data.node.label, e.data.captor,e.data.node.name);
            // });

            //#region abor保留
            // self.sys = arbor.ParticleSystem(4000, 500, 0.5, 55);
            // var that = {
            //     init: function (system) {
            //         self.particleSystem = system;
            //         self.particleSystem.screen({
            //             padding: [100, 60, 60, 60], // leave some space at the bottom for the param sliders
            //             step: .02
            //         });// have the ‘camera’ zoom somewhat slowly as the graph unfolds
            //         $(window).resize(that.resize);
            //         that.resize();
            //         that.initMouseHandling();
            //     },
            //     redraw: function () {
            //         if (self.particleSystem === null) {
            //             return;
            //         }
            //
            //         parent.canvas.clear();
            //
            //         parent.canvas.startDraw();
            //         self.particleSystem.eachEdge(function (edge, pt1, pt2) {
            //             // edge: {source:Node, target:Node, length:#, data:{}}
            //             // pt1:  {x:#, y:#}  source position in screen coords
            //             // pt2:  {x:#, y:#}  target position in screen coords
            //
            //             var weight = null; // Math.max(1,edge.data.border/100)
            //             var color = null;// edge.data.color
            //             if (!color || ("" + color).match(/^[ \t]*$/)){
            //                 color = null;
            //             }
            //
            //             if (color !== undefined || weight !== undefined) {
            //                 parent.canvas.save();
            //                 parent.canvas.startDraw();
            //
            //                 if (!isNaN(weight)) {
            //                     parent.canvas.setLineWight(weight);
            //                 }
            //
            //                 // if (edge.source.data.region == edge.target.data.region) {
            //                 //     parent.canvas.setStrokeStyle(palette[edge.source.data.region]);
            //                 // }
            //
            //                 // if (color) ctx.strokeStyle = color
            //                 parent.canvas.setFillStyle(null);
            //
            //                 parent.canvas.drawLine(pt1, pt2);
            //                 parent.canvas.stroke();
            //                 parent.canvas.restore();
            //             } else {
            //                 // draw a line from pt1 to pt2
            //                 parent.canvas.drawLine(pt1, pt2);
            //             }
            //         });
            //         parent.canvas.stroke();
            //
            //         self.particleSystem.eachNode(function (node, pt) {
            //             parent.canvas.drawNodeLabel(node, pt);
            //         });
            //     },
            //     resize: function () {
            //         var oResWH = parent.canvas.resizeByWindows();
            //         self.particleSystem.screenSize(oResWH.width, oResWH.height); // inform the system so it can map coords for us
            //         that.redraw()
            //     },
            //     initMouseHandling: function () {
            //         // no-nonsense drag and drop (thanks springy.js)
            //         var selected = null;
            //         var nearest = null;
            //         var dragged = null;
            //         var oldmass = 1;
            //
            //         parent.canvas.onMouseDown(function (p) {
            //             selected = self.particleSystem.nearest(p);
            //             nearest = self.particleSystem.nearest(p);
            //             dragged = self.particleSystem.nearest(p);
            //             if (selected.node !== null) {
            //                 dragged.node.tempMass = 50;
            //                 dragged.node.fixed = true;
            //             }
            //         });
            //
            //         parent.canvas.onMouseMove(function (s) {
            //             var old_nearest = nearest && nearest.node._id;
            //             nearest = self.particleSystem.nearest(s);
            //             if (!nearest) {
            //                 return;
            //             }
            //
            //             if (dragged !== null && dragged.node !== null) {
            //                 var p = self.particleSystem.fromScreen(s);
            //                 dragged.node.p = {x: p.x, y: p.y}
            //                 // dragged.tempMass = 10000
            //             }
            //         });
            //
            //         parent.canvas.onMouseUp(function () {
            //             if (dragged === null || dragged.node === undefined) {
            //                 return;
            //             }
            //             dragged.node.fixed = false;
            //             dragged.node.tempMass = 100;
            //             dragged = null;
            //             selected = null;
            //         });
            //     },
            // };
            // self.sys.renderer = that;
            //#endregion
        };

        //#endregion

        //#region setData

        this.setData = function (arrNodes, arrLinks) {
            self.sigmaObj.graph = {
                nodes: arrNodes,
                edges: arrLinks
            };

            //#region abor保留

            // self.sys.merge({nodes: arrNodes, edges: arrLinks});
            // self.sys.parameters({stiffness: 600});

            //#endregion
        }

        //#endregion

        //#endregion
    }
})(jQuery);