/* global L */

export default L.Class.extend({
	
    data: null,

    _render: null,

    /* options */
    margin: 40,

    initialize: function (options) {

        options = options || {};
        this.margin = options.margin || this.margin;
        this._render = options.render || this._render;

    },

    onAdd : function(map) {

        this._map = map;
        this._zoom = map.getZoom();

        var d3Selector, g, overlayPane, svg, mask;
        overlayPane = map.getPanes().overlayPane;
        d3Selector = d3.select(overlayPane);

        this._svg = svg = d3Selector.append("svg");
        svg.attr("class", "leaflet-d3-layer")
            .attr("width", 0)
            .attr("height", 0);
        
        var defs = svg.append("defs");
        this.insertDefs(defs);

        this._g = g = svg.append("g");
        g.attr("class", "leaflet-d3-group leaflet-zoom-hide");

        map.on('viewreset', this._reset, this);
        this._reset();
        
    },


    onRemove: function (map) {
        map.getPanes().overlayPane.removeChild(this._el);
        map.off('viewreset', this._reset, this);
    },

    refresh: function() {

        this._reset();

    },

    _reset: function () {

        if (this.data) {

            var margin = this.margin;

            var bounds = this.getPath().bounds(this.data instanceof Array ? {features: this.data}:this.data),
                topLeft = [bounds[0][0] - margin, bounds[0][1] - margin],
                bottomRight = [bounds[1][0] + margin, bounds[1][1] + margin];

            this._svg.attr("width", bottomRight[0] - topLeft[0])
                .attr("height", bottomRight[1] - topLeft[1])
                .style("left", topLeft[0] + "px")
                .style("top", topLeft[1] + "px");

            this._g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

            this.drawFunction(this._g, this.data, this.projectOnLayer.bind(this), bounds, this._map.getZoom());
            
        }

    },

    addTo: function(map) {

        map.addLayer(this);
        return this;

    },
    
    insertDefs: function(defs) {
        
        
    },
    
    drawFunction: function(d3g, data, project, bounds, zoom) {
        
        throw new Error("draw function not implemented");
        
    },
    
    setData: function(data) {

        this.data = data;
        this._reset();

        return this;

    },

    getPath: function() {

        return d3.geo.path().projection(this.projectOnLayer.bind(this));

    }

    ,projectOnLayer: function(p) {

        if (p.coordinates) {
            p = p.coordinates;
        } else if (p.x && p.y) {
            console.log(p);
            p = [p.y, p.x];
        }

        var ret = this._map.project(new L.LatLng(p[1], p[0]), this._map.getZoom())
            ._subtract(this._map.getPixelOrigin());

        return [ret.x, ret.y];

    }

});