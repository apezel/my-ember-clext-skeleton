var Env = function(environment) {
	
	var ENV = {
	 	modulePrefix: 'skeleton',
	 	podModulePrefix: 'skeleton/pods',
        EmberENV: {
            FEATURES: {
                'ember-htmlbars-component-generation': true
            }
        }
	}
    
    if (environment == "development") {
        
        ENV.LOG_VIEW_LOOKUPS = false;
        ENV.LOG_MODULE_RESOLVER = false;
        ENV.LOG_RESOLVER = false;
        
    }
    
	return ENV;
	
};

module.exports = Env;