import HttpService from './http-service';

var LexiqueService = Ember.Service.extend(Ember.Evented, {
	
    data: Em.Object.create(),
	
	load: function(className) {
		
		var self = this;
		var httpService = this.container.lookup('service:http-service');
        
        var method, params = {};
        
        if (className) {
            
            method = `${className}/load`;
            params.className = className;
            
        } else {
            
            method = "load-everything";
            
        }
        
		return httpService.getJson(`broker/lexique/${method}`, params).then(function(data) {
            
            self.get('data').setProperties(data.getAsJsObject());
			
		}, function(err) {

            console.log(err);
			
		});
		
	}
	
});


var Initializer = {
	
    name: 'lexiqueService',
    
	initialize: function(container, application) {
		
        application.inject('route', 'LexiqueService', 'service:lexique-service');
        application.inject('controller', 'LexiqueService', 'service:lexique-service');
        application.inject('component', 'LexiqueService', 'service:lexique-service');
        
    }
	
};

export default LexiqueService;
export {Initializer};