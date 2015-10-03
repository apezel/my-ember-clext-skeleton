import Ember from 'ember';
import config from 'bdtracages-config';
import Resolver from 'x-resolver/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
	rootElement: "#ember-app",
	LOG_ACTIVE_GENERATION: config.LOG_ACTIVE_GENERATION,
  	LOG_MODULE_RESOLVER: config.LOG_MODULE_RESOLVER,
	LOG_RESOLVER: config.LOG_RESOLVER,
 	LOG_TRANSITIONS: config.LOG_TRANSITIONS,
 	LOG_TRANSITIONS_INTERNAL: config.LOG_TRANSITIONS_INTERNAL,
 	LOG_VIEW_LOOKUPS: config.LOG_VIEW_LOOKUPS,
 	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
    EmberENV: config.EmberENV,
	Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;