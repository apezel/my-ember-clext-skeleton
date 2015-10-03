import Ember from 'ember';
import D3Layer from './d3-layer';
/* global d3 */
/* global L */
/* global proj4 */


export default Ember.Component.extend({
    
    classNames: ["leaflet-map"],
	
	map: null,
    
	svgLayer: null,
	
	initialized: false,
    
    maxZoom: 16,
    
    features: Em.A(),
    
    communeWww: null,

	didInsertElement: function() {

		var self = this,
            maxZoom = this.get('maxZoom');
		
		// =======
		// = MAP =
		// =======
		
		var map = L.map(this.$().attr('id'), { minZoom: 6, maxZoom: maxZoom, continuousWorld: true } );
		this.set('map', map);
        
		this.$().addClass("map");

        //var wms = "http://mapsref.brgm.fr/WMS/mapserv?map=/carto/RefCom/mapFiles/FXX_RefIGN-NTF_HQ.map";
        var wms = "http://mapsref.brgm.fr/wxs/refcom-brgm/refign";
        
		var baselayer = L.tileLayer.wms(wms, {
		        attribution: '',
		        maxZoom: maxZoom,
				opacity: 1,
                layers: ['FONDS_SCAN', 'PARIMG', 'ORTHO', 'PARVEC_BATIMENT'],
                crs: L.CRS.EPSG4326
		});
		baselayer.addTo(map);
	
		map.setView(new L.LatLng(43.92, 3.90), 7);
        
        map.setViewPadded = function(coords, z) {
			
			var shift = $(".map-tools-overlay").width() / 2;

			var targetPoint = map.project(coords, z).add([shift, 0]),
			    targetLatLng = map.unproject(targetPoint, z);

			map.setView(targetLatLng, z);
			
		};
        
        L.easyButton( '<span class="icon icon-my_location"></span>', () => {
            this.centerOnGeometry(this.get('features').objectAt(0).geometry);
        }).addTo(map);
		
		var d3Layer = new D3Layer();
		
        d3Layer.insertDefs = function(defs) {
            
            var filter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("x", "-30%")
                .attr("y", "-30%")
                .attr("width", "200%")
                .attr("height", "200%");

            filter.append("feOffset")
                .attr("in", "SourceAlpha")
                .attr("dx", 4)
                .attr("dy", 4)
                .attr("result", "offOut");

            filter.append("feGaussianBlur")
                .attr("in", "offOut")
                .attr("stdDeviation", 5)
                .attr("result", "blurOut");

            filter.append("feBlend")
                .attr("in", "SourceGraphic")
                .attr("in2", "blurOut")
                .attr("mode", "normal");
            
        };
        
        d3Layer.drawFunction = function(d3g, data, project, bounds, zoom) {
				
				var r = function(val, zoom) {
			
					var f = zoom < 9 ? (zoom-1):9;
			
					return val*f + 5;
				}
						
			  	var g = d3g.selectAll("g.feature")
			  		.attr("transform", function(d) {
				 
					 	d = project(d.geometry);
				
					 	return "translate(" + d[0] + "," + d[1] + ")";
				 
					});
					
					
			  	var sel = g.data(data.features)
				  	.enter()
				  	.append("g")
				  	.attr("class", "feature")
                    .attr("filter", "url(#drop-shadow)")
				  	.attr("transform", function(d) {
					 
						 d = project(d.geometry);
					
						 return "translate(" + d[0] + "," + d[1] + ")";
					 
					 })
					
					.on("mouseover", function(d) {
						
						d3.select(this)
							.classed("highlighted", true)
							.transition().duration(200)
							.attr("r", d => 8);
					})
					.on("mouseleave", function(d) {
						d3.select(this)
							.classed("highlighted", false)
							.transition().duration(100)
							.attr("r", d => 5);
					})
					.on("click", function(d) {
					
						self.sendAction("featureSelected", d);
					
					});
            
                    var c = sel.append("circle")
                        .classed("outer", true)
				 	    .attr("r", d => 18)
                        .style("opacity", 0);
                    
                    var animate = () => {
                        
                        c.transition()
                            .delay(700)
                            .duration(400)
                            .style("opacity" ,1);
                        
                        c.transition()
                            .delay(1100)
                            .duration(450)
                            .ease("bounce")
                            .attr("r", d => 11);
                        
                    }
                    
                    animate();
            
                    sel.append("circle")
                        .classed("inner", true)
                        .attr("r", d => 2);
			
		};
        
        this.set('svgLayer', d3Layer.addTo(map));
		
		this.set("initialized", true);

	},
    
    afterInit: function() {
        
        this.updateFeatures();
        
        if (this.get('communeWww')) {
        
            this.get('HttpService').getJson('broker/lexique/commune/bounding', {numero: this.get('communeWww')})
                .then((data) => {
                
                    this.centerOnGeometry(data.rootNode);
                
                });
            
        } else {
        
            if (this.get('features.length') > 0) {

                this.centerOnGeometry(this.get('features').objectAt(0).geometry);

            } else {

                this.get('map').setViewPadded(new L.LatLng(43.92, 3.90), 7);

            }
            
        }
        
    }.observes('initialized', 'features.[]', 'emprise'),
	
	willClearRender: function() {
		/* remove observers */
	},
	
//	circleColor: d3.scale.linear()
//		.domain([0, 0.05, 8])
//		.range(["#017002", "#26C4EC", "#21177D"]),
    
	
	centerOnGeometry: function(geom) {
        
        geom = this.srsTransform(geom);
        
		if (geom.type === "Polygon") {
            
            this.zoomToBounds(geom);
            
        } else {
            
            this.get('map').setViewPadded(new L.LatLng(geom.coordinates[1], geom.coordinates[0]), 15);
            
        }
		
	},
	
	updateFeatures: function() {
		
        var features = this.get('features').map( x => {
            
            return {
                type: x.type,
                properties: x.properties,
                geometry: this.srsTransform(x.geometry)
            };
            
        });
        this.get('svgLayer').setData({type: "FeatureCollection", features: features});
		
	}.observes("features.[]", "initialized"),
	
	refresh: function() {
		
		this.get('svgLayer').refresh();
		
	}.observes("features.[]"),
    
    srsTransform: function(geom) {
        
        var tGeom = {type: geom.type, coordinates: geom.coordinates};
        
        if (geom.srs) {
            
            tGeom.coordinates = proj4(geom.srs, "EPSG:4326").forward(geom.coordinates);
            tGeom.srs = "EPSG:4326";
            
        }
        
        return tGeom;
    },
    
    zoomToBounds: function(geom) {
        
        var bounds = d3.geo.bounds({type: 'Feature', geometry: geom});
        
        var southWest = L.latLng(bounds[0][1], bounds[0][0]),
        northEast = L.latLng(bounds[1][1], bounds[1][0]),
        bounds = L.latLngBounds(southWest, northEast);

        this.get('map').fitBounds(bounds, {padding: [20, 20]});

    }


});