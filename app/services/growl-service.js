import Ember from 'ember';

var GrowlService = Ember.Service.extend({

	target: null,

	connect: function(target) {
	
		this.set('target', target);
	
	},
	
	disconnect: function(modal) {
	
		this.set('target', null);
		
	},
	
	notify: function(message, level) {
	
		this.get('target').addMessage(message, level);
        
	}

});

var Initializer = {
	
  	name: 'growl-service',
  
  	initialize: function(container, application) {
        
		application.inject('route', 'GrowlService', 'service:growl-service');
		application.inject('controller', 'GrowlService', 'service:growl-service');
		application.inject('component', 'GrowlService', 'service:growl-service');
		application.inject('view', 'GrowlService', 'service:growl-service');
	
  	}
  
};

export default GrowlService;
export {Initializer};