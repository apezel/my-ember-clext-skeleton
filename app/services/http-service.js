import Ember from 'ember';
import registry from 'bdtracages/lib/type-registry';

var HttpService = Ember.Service.extend({
    
    getJson: function(segment, data) {
        
        var self = this;
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            
            jQuery.ajax({
                url: HttpService.endpoint+segment,
                type: "GET",
                data: data,
                success: function(resp) {
                    
                    resolve(Hypermedia.fromData(resp));
                    
                },
                error: function(resp) {
                    
                    reject(resp);
                    
                }
                
            });
            
        });
        
    },
    
    postJson: function(segment, data) {
        
        return this.post(segment, JSON.stringify(data), "application/json; charset=utf-8");

    },
    
    
    post: function(segment, data, contentType) {
        
        var self = this;
        
        contentType = contentType || "application/x-www-form-urlencoded; charset=utf-8";
        
        return new Ember.RSVP.Promise(function(resolve, reject) {
            
            jQuery.ajax({
                url: HttpService.endpoint+segment,
                type: "POST",
                contentType: contentType,
                dataType: "json",
                data: data,
                success: function(resp) {
                    
                    resolve(Hypermedia.fromData(resp));
                    
                },
                error: function(resp) {
                    
                    reject(resp);
                    
                }
                
            });
            
        });

    }
    
});

var Hypermedia = Ember.Object.extend({
    
    rawData: null,
    rootNode: null,
    pageInfo: null,
    
    coerceToType: function(type) {
        
        return this.get('rootNode')['@class'] === type; 
        
    },
    
    getAsJsObject: function(path) {
        
        var wrap = (o) => {
        
            if (o instanceof Array) {
                
                o.forEach((x, i, a) => a[i] = wrap(x));
                return Em.A(o);
                
            } else if (o != null && typeof(o) === "object" && !(o instanceof Ember.Object)) {
                
                let clazz = o['@class'] ? registry.dynRequireIdentifiable(o['@class']) : Ember.Object,
                    eo = clazz.create();
                
                for (var key in o) {

                    eo.set(key, wrap(o[key]));
                    
                }
                
                return eo;
                
            } else {
                
                return o;
                
            }
        
        };
        
        return wrap(path ? this.get('rootNode')[path] : this.get('rootNode'));
        
    }
    
});
            
Hypermedia.reopenClass({
    
    fromData: function(data) {
        
        var hm = new Hypermedia();
        
        var rootNode = data;
        
        switch (true) {

            case data.Resource !== undefined:
                rootNode = data.Resource;
                rootNode = rootNode.content ? rootNode.content : rootNode;
                break;
            case data.Resources !== undefined:
                rootNode = data.Resources._embedded;
                break;
            case data.PagedResources !== undefined:
                rootNode = data.PagedResources._embedded;
                hm.set('pageInfo', data.PagedResources.page);
                break;

        }

        hm.set('rawData', data);
        hm.set('rootNode', rootNode);
        
        return hm;
        
    }
    
});


var Initializer = {
	
  	name: 'http-service',
  
  	initialize: function(container, application) {
        
        HttpService.reopenClass({
           endpoint: application.endpoint
        });
        
		application.inject('route', 'HttpService', 'service:http-service');
		application.inject('controller', 'HttpService', 'service:http-service');
		application.inject('component', 'HttpService', 'service:http-service');
		application.inject('view', 'HttpService', 'service:http-service');
	
  	}
  
};

export default HttpService;
export {Initializer};
export {Hypermedia};