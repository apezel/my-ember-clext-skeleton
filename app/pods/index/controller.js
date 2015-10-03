import Ember from 'ember';

var C = Ember.Controller.extend({
    
    pageInfoEnCours: null,
    pageInfoRejetes: null,
    
    setup: function(model, pageInfoEnCours, pageInfoRejets) {
        
        this.set('model', model);
        
        this.set('pageInfoEnCours', pageInfoEnCours);
        this.set('pageInfoRejetes', pageInfoRejets);
        
    },
    
    actions: {
        
        refresh: function() {
            
            this.send("refreshModel");
            
        }
        
    }
    
});

export default C;