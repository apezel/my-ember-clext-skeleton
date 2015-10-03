import Ember from 'ember';
/* global d3 */

export default Ember.Component.extend({
	
  	tagName: 'svg'
    ,attributeBindings: ['height', 'width', 'xmlns', 'version']
    ,height: "100%"
    ,width: "100%"
    ,xmlns: 'http://www.w3.org/2000/svg'
    ,version: '1.1'
	
	,initialized: false
	
	,didInsertElement: function() {
		    
		this.set('initialized', true);
		
	}
	
	,getD3Svg: function() {
		
		return d3.select(this.$()[0]);
		
	}
	
	,importSymbolsFromFile: function(file) {
		
		this.importFromFile(file, "//*/svg:symbol", this.$()[0]);
		
	}
	
	,importPatternsFromFile: function(file, defs) {
		
		this.importFromFile(file, "//svg:defs/svg:pattern", defs);
		
	}
	
	,importFiltersFromFile: function(file, defs) {
		
		this.importFromFile(file, "//svg:defs/svg:filter", defs);
		
	}

	,importFromFile: function(file, xpath, insertInto) {

		var self = this;
		
		function nsResolver(prefix) {
			
			var ns = {
		    	'svg' : 'http://www.w3.org/2000/svg'
		  	};
			
			return ns[prefix] || null;
			
		}
		
		$.ajax({url: file}).done(function(xml) {
			
			window.importCache = window.importCache || {};
			
			if (!window.importCache[btoa(file)]) {
				
				var doc = xml.documentElement;
				var res = xml.evaluate(xpath, doc, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				
				window.importCache[btoa(file)] = [];
				
				for ( var i=0 ; i < res.snapshotLength; i++ ) {
					window.importCache[btoa(file)].push(res.snapshotItem(i));
				}
				
			}
			
			window.importCache[btoa(file)].forEach(function(node) {
				console.log(node);
				insertInto.appendChild(node);
			});
		  
		});
		
	}
	
});