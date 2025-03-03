/* @requires mapshaper-polygon-dissolve2_v1, mapshaper-arc-dissolve, mapshaper-filter */

api.cleanLayers = function(layers, dataset, opts) {
  var nodes;
  opts = opts || {};
  if (!opts.arcs) { // arcs option only removes unused arcs
    nodes = internal.addIntersectionCuts(dataset, opts);
    layers.forEach(function(lyr) {
      if (lyr.geometry_type == 'polygon') {
        lyr.shapes = internal.dissolvePolygons2_v1(lyr.shapes, dataset, opts);
      }
      if (!opts.allow_empty) {
        api.filterFeatures(lyr, dataset.arcs, {remove_empty: true});
      }
    });
  }

  if (!opts.no_arc_dissolve && dataset.arcs) {
    internal.dissolveArcs(dataset); // remove leftover endpoints within contiguous lines
  }
};
