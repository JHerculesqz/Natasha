<template>
  <div class="treeMapWrapper" v-bind:style="{height: height + 'px'}" v-bind:id="id"></div>
</template>

<script>
  import "core-fw-vue-widget-d3js/d3.v3.min"

  /**
   *  MarvelD3Tree widget description
   *  @vuedoc
   *  @exports MarvelD3Tree
   */
  export default {
    name: 'MarvelD3Tree',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      height: {
        type: Number,
        default: undefined,
        required: false,
      },
    },
    data: function () {
      return {
        // Calculate total nodes, max label length
        totalNodes: 0,
        maxLabelLength: 0,
        // variables for drag/drop
        selectedNode: null,
        draggingNode: null,
        duration: 750,
        root: undefined,
        // size of the diagram
        viewerWidth: null,
        viewerHeight: null,
        //tree
        tree: undefined,
        diagonal: undefined,
        //zoomListener
        zoomListener: undefined,
        //svg
        svg: {},
      }
    },
    mounted: function () {

    },
    methods: {
      //#region inner

      visit: function (parent, visitFn, childrenFn) {
        // A recursive helper function for performing some setup by walking through all nodes
        if (!parent) return;

        visitFn(parent);

        var children = childrenFn(parent);
        if (children) {
          var count = children.length;
          for (var i = 0; i < count; i++) {
            this.visit(children[i], visitFn, childrenFn);
          }
        }
      },
      sortTree: function () {
        // sort the tree according to the node names
        this.tree.sort(function (a, b) {
          return b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1;
        });
      },
      zoom: function () {
        // Define the zoom function for the zoomable tree
        this.svg.svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      },
      overCircle: function (d) {
        this.selectedNode = d;
        this.updateTempConnector();
      },
      outCircle: function (d) {
        this.selectedNode = null;
        this.updateTempConnector();
      },
      updateTempConnector: function () {
        // Function to update the temporary connector indicating dragging affiliation
        var data = [];
        if (this.draggingNode !== null && this.selectedNode !== null) {
          // have to flip the source coordinates since we did this for the existing connectors on the original tree
          data = [{
            source: {
              x: this.selectedNode.y0,
              y: this.selectedNode.x0
            },
            target: {
              x: this.draggingNode.y0,
              y: this.draggingNode.x0
            }
          }];
        }
        var link = this.svg.svgGroup.selectAll(".templink").data(data);

        link.enter().append("path")
          .attr("class", "templink")
          .attr("d", d3.svg.diagonal())
          .attr('pointer-events', 'none');

        link.attr("d", d3.svg.diagonal());

        link.exit().remove();
      },
      centerNode: function (source) {
        // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.
        var scale = this.zoomListener.scale();
        var x = -source.y0;
        var y = -source.x0;
        x = x * scale + 200;
        y = y * scale + this.viewerHeight / 2;
        d3.select('g').transition()
          .duration(this.duration)
          .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
        this.zoomListener.scale(scale);
        this.zoomListener.translate([x, y]);
      },
      _click: function (d, funOnClick) {
        if (d.children) {
          return;
        }
        funOnClick(d);
        let nodeObjs = d3.selectAll("circle");
        for (const iterator of nodeObjs[0]) {
          if (d.nodeId === iterator.__data__.nodeId && !d.children) {
            iterator.style.fill = "#3399ff";
          } else if (!d.children) {
            iterator.style.fill = "#fff";
          }
        }
      },
      update: function (source, funOnClick) {
        // Compute the new height, function counts total children of root node and sets tree height accordingly.
        // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
        // This makes the layout more consistent.
        var self = this;
        var levelWidth = [1];
        var childCount = function (level, n) {

          if (n.children && n.children.length > 0) {
            if (levelWidth.length <= level + 1) levelWidth.push(0);

            levelWidth[level + 1] += n.children.length;
            n.children.forEach(function (d) {
              childCount(level + 1, d);
            });
          }
        };
        childCount(0, this.root);
        var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line
        this.tree = this.tree.size([newHeight, this.viewerWidth]);

        // Compute the new tree layout.
        var nodes = this.tree.nodes(this.root).reverse(),
          links = this.tree.links(nodes);

        // Set widths between levels based on maxLabelLength.
        nodes.forEach(function (d) {
          d.y = (d.depth * (self.maxLabelLength * 10)); //maxLabelLength * 9px
        });

        // Update the nodes…
        var nodeId = 0;
        var node = this.svg.svgGroup.selectAll("g.node")
          .data(nodes, function (d) {
            return d.id || (d.id = ++nodeId);
          });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
          }).on('click', function (d) {
            self._click(d, funOnClick);
          });

        nodeEnter.append("circle")
          .attr('class', 'nodeCircle')
          .attr("r", 0)
          .style("fill", function (d) {
            return !d.children ? "lightsteelblue" : "#fff";
          });

        nodeEnter.append("text")
          .attr("x", function (d) {
            return d.children || d._children ? -10 : 10;
          })
          .attr("dy", ".35em")
          .attr('class', 'nodeText')
          .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
          })
          .text(function (d) {
            return d.name;
          })
          .style("fill-opacity", 0);

        // phantom node to give us mouseover in a radius around it
        nodeEnter.append("circle")
          .attr('class', 'ghostCircle')
          .attr("r", 30)
          .attr("opacity", 0.2) // change this to zero to hide the target area
          .attr('pointer-events', 'mouseover')
          .on("mouseover", function (node) {
            this.overCircle(node);
          })
          .on("mouseout", function (node) {
            this.outCircle(node);
          });

        // Update the text to reflect whether node has children or not.
        node.select('text')
          .attr("x", function (d) {
            return d.children || d._children ? -10 : 10;
          })
          .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
          })
          .text(function (d) {
            let strText = d.label || d.name;
            if (strText && strText.length > 12) {
              return d.name.substr(0, 12) + ".."
            }
            return strText;
          })
          .append("svg:title").text(function (d) {
          return d.name;
        });

        // Change the circle fill depending on whether it has children and is collapsed
        node.select("circle.nodeCircle")
          .attr("r", function (d) {
            return !d.children ? 7 : 5;
          })
          .style("fill", "#fff")
          .style("stroke", function (d) {
            return !d.children ? "#3399ff" : "#888";
          })
          .append("svg:title")
          .text(function (d) {
            return d.name;
          });

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
          .duration(this.duration)
          .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
          });

        // Fade the text in
        nodeUpdate.select("text")
          .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
          .duration(this.duration)
          .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();

        nodeExit.select("circle")
          .attr("r", 0);

        nodeExit.select("text")
          .style("fill-opacity", 0);

        // Update the links…
        var link = this.svg.svgGroup.selectAll("path.link")
          .data(links, function (d) {
            return d.target.id;
          });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function (d) {
            var o = {
              x: source.x0,
              y: source.y0
            };
            return self.diagonal({
              source: o,
              target: o
            });
          });

        // Transition links to their new position.
        link.transition()
          .duration(this.duration)
          .attr("d", this.diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
          .duration(this.duration)
          .attr("d", function (d) {
            var o = {
              x: source.x,
              y: source.y
            };
            return diagonal({
              source: o,
              target: o
            });
          })
          .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      },
      clearCache: function () {
        this.totalNodes = 0;
        this.maxLabelLength = 0;
        this.selectedNode = null;
        this.draggingNode = null;
        this.duration = 750;
        this.root = undefined;
        this.viewerWidth = null;
        this.viewerHeight = null;
        this.tree = undefined;
        this.diagonal = undefined;
        this.zoomListener = undefined;
        this.svg.svgGroup = undefined
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setData: function (treeData, funOnClick) {
        var self = this;
        //clear container
        window.$("#" + this.id).empty();
        // clearCache
        this.clearCache();

        // size of the diagram
        this.viewerWidth = $("#" + this.id).width();
        this.viewerHeight = $("#" + this.id).height();

        this.tree = d3.layout.tree().size([this.viewerHeight, this.viewerWidth]);

        // define a d3 diagonal projection for use by the node paths later on.
        this.diagonal = d3.svg.diagonal().projection(function (d) {
          return [d.y, d.x];
        });


        // Call visit function to establish maxLabelLength
        this.visit(treeData, function (d) {
          self.totalNodes++;
          self.maxLabelLength = Math.max(d.name.length, self.maxLabelLength);

        }, function (d) {
          return d.children && d.children.length > 0 ? d.children : null;
        });

        // Sort the tree initially incase the JSON isn't in a sorted order.
        this.sortTree();

        // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        this.zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", this.zoom);

        // define the baseSvg, attaching a class for styling and the zoomListener
        var baseSvg = d3.select("#" + this.id).append("svg")
          .attr("width", this.viewerWidth)
          .attr("height", this.viewerHeight)
          .attr("class", "overlay")
          .call(this.zoomListener);

        // Append a group which holds all nodes and which the zoom Listener can act upon.
        this.svg.svgGroup = baseSvg.append("g");

        // Define the root
        this.root = treeData;
        this.root.x0 = this.viewerHeight / 2;
        this.root.y0 = 0;

        // Layout the tree initially and center on the root node.
        this.update(this.root, funOnClick);
        this.centerNode(this.root);
      },

      //#endregion
    }
  }
</script>

<style>

  .treeMapWrapper {
    height: 100%;
  }

  .node {
    cursor: pointer;
  }

  .overlay {
    background-color: #fff;
    border: 1px solid #ccc;
  }

  .node circle {
    stroke: #3399ff;
    stroke-width: 2px;
  }

  .node:hover {
    stroke-width: 3px;
    font-size: 15px;
  }

  .node text {
    font-size: 14px;
    color: #666;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }

  .templink {
    fill: none;
    stroke: red;
    stroke-width: 3px;
  }

  .ghostCircle .show {
    display: block;
  }

  .ghostCircle, .activeDrag .shortCircle {
    display: none;
  }

  /*region dark theme*/

  .dark .overlay {
    background-color: #5a6069;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .dark .node circle {
    fill: #ffffff;
    stroke: #3399ff;
  }

  .dark .node text {
    color: #ffffff !important;
  }

  .dark .link {
    stroke: #555;
  }

  .dark .templink {
    stroke: red;
  }

  /*endregion*/

  /*blackBg theme*/

  .blackBg .overlay {
    background-color: #5a6069;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .blackBg .node circle {
    fill: #ffffff;
    stroke: #3399ff;
  }

  .blackBg .node text {
    color: #ffffff !important;
  }

  .blackBg .link {
    stroke: #555;
  }

  .blackBg .templink {
    stroke: red;
  }

  /*endregion*/
</style>
