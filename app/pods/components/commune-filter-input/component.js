import Ember from 'ember';
import MultiValueInputAbstract from '../multi-value-input/abstract';

export default MultiValueInputAbstract.extend({
    
    async: true,
    
    dept: null,
    reg: null,
    
    filterData: function() {
        
        var spec = {
            nom: null,
            numero: null,
            dept: this.get('dept'),
            reg: this.get('reg')
        };
        
        var restricted = false;
        
        if (/^\d{2,}/.test(this.get('query'))) {
            
            spec.numero = this.get('query');
            restricted = true;
            
        } else if (this.get('query').length > (spec.dept ? 0:2)) {
            
            spec.nom = this.get('query');
            restricted = true;
            
        }
        
        if (restricted) {
            
            return new Ember.RSVP.Promise((res, rej) => {
                
                this.get('HttpService').postJson("broker/lexique/commune/list", spec)
                    .then(data => { res(data.rootNode.communesWwws)})
                    .catch(err => rej(err));
                
            });
            
        } else {
            
            return new Ember.RSVP.Promise((resolve, reject) => resolve([]));
            
        }
    
    }
    
    
});