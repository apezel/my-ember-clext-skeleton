import HttpService from './http-service';
import Utilisateur from '../models/utilisateur';
import roles from 'bdtracages/constants/roles';

var UserSession = Ember.Service.extend(Ember.Evented, {
	
	user: null,
    
	isAuthenticated: function() {
		
		return this.get('user') != null && this.get('user.lexProfils.length');
		
	}.property('user'),
	
	isProducteur: function() {
        
		return this.get('isAuthenticated') && this.get('user.lexProfils').some( x => x.get('id') === roles.PRODUCTEUR );
		
	}.property('user.lexProfils.[]', 'isAuthenticated'),
	
	isValideur: function() {
		
		return this.get('isAuthenticated') && this.get('user.lexProfils').some( x => x.get('id') === roles.VALIDEUR );
		
	}.property('user.lexProfils.[]', 'isAuthenticated'),
    
    isSuperLecteur: function() {
		
		return this.get('isAuthenticated') && this.get('user.lexProfils').some( x => x.get('id') === roles.SUPER_LECTEUR );
		
	}.property('user.lexProfils.[]', 'isAuthenticated'),
    
    isAdmin: function() {
		
		return this.get('isAuthenticated') && this.get('user.lexProfils').some( x => x.get('id') === roles.ADMIN );
		
	}.property('user.lexProfils.[]', 'isAuthenticated'),
    
    loggedAsProfil: function() {
        //TODO : implement profil selection
        return this.get('user.lexProfils').objectAt(0);
        
    }.property('user.lexProfils.[]'),
	
	authenticate: function(user) {
        
		this.set('user', user);
		
	},
	
	unauthenticate: function() {
		
		this.set('user', null);
		
	},
	
	check: function() {
		
		var self = this;
		
		var o = {
			
			every: function(t) {
		
				setInterval(function() {
					
					//self._check();
			
				}, t);
		
				return self;
		
			},
	
			now: function() {
		
				return new Ember.RSVP.Promise(function(resolve, reject) {
					
					self._check(resolve, reject);

				});
			}
			
		}
		
		return o;
		
	},
	
	_check: function(resolve, reject) {
		
		var self = this;
		var httpService = this.container.lookup('service:http-service');
        
		return httpService.getJson("broker/logged").then(function(data) {
            
			self.trigger("authentication:success");
            
			if (data.coerceToType('Utilisateur')) {
                
				
                
                if (!self.get("isAuthenticated")) {
                    
				    self.trigger("authentication:connect");
                    
                }
                
                self.authenticate(data.getAsJsObject());
			}
            
            resolve();
			
		}, function(value) {
			
			if (self.get("isAuthenticated")) {
				self.trigger("authentication:disconnect");
				self.unauthenticate();
			}
			
			self.trigger("authentication:failure");
            
            reject();
			
		});
		
	}
	
});


var Initializer = {
	
    name: 'userSession',
    
	initialize: function(container, application) {
        
        application.inject('route', 'UserSession', 'service:user-session');
        application.inject('controller', 'UserSession', 'service:user-session');
        application.inject('component', 'UserSession', 'service:user-session');
        
    }
	
};

export default UserSession;
export {Initializer};