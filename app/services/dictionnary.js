import HttpService from './http-service';

var Dictionnary = Ember.Service.extend({
	
	t: function(ns, props) {

        let _dict = {
    
            'email:exists': `Un ${props.entity} portant le même email existe déjà`,
            'some:required': `Un ou plusieurs champs sont requis`,
            'field:required': `Le champ ${props.field} est requis`,
            'field:minimum:required': `Au moins ${props.size} ${props.field} ${props.size > 1 ? 'sont':'est'} requis`,
            'forbidden': `Cette opération est interdite. ${props.reason}`
        }
        
        return _dict[ns];
    }
	
});


var Initializer = {
	
    name: 'Dictionnary',
    
	initialize: function(container, application) {
		
        application.inject('route', 'dico', 'service:dictionnary');
        application.inject('controller', 'dico', 'service:dictionnary');
        application.inject('component', 'dico', 'service:dictionnary');
        
    }
	
};

export default Dictionnary;
export {Initializer};