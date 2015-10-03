import Ember from 'ember';
import MultiValueInputAbstract from '../multi-value-input/abstract';

export default MultiValueInputAbstract.extend({
    
    async: true,
    
    reg: null,
    
    filterData: function() {
        
        var spec = {
            nom: null,
            code: null,
            reg: this.get('reg')
        };
        
        if (/^\d{2,}/.test(this.get('query'))) {
            
            spec.code = this.get('query');
            
        } else if (this.get('query').length >= 1) {
            
            spec.nom = this.get('query');
            
        }
            
        return new Ember.RSVP.Promise((res, rej) => {

            this.get('HttpService').postJson("broker/lexique/departement/list", spec)
                .then(data => { res(data.rootNode.departementsWwws)})
                .catch(err => rej(err));

        });
            
    }
    
    
});