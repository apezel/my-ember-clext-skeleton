import Ember from 'ember';
import MultiValueInputAbstract from '../multi-value-input/abstract';

export default MultiValueInputAbstract.extend({
    
    async: true,
    
    filterData: function() {
        
        var spec = {
            nom: null,
            code: null
        };
        
        if (/^\d{2,}/.test(this.get('query'))) {
            
            spec.code = this.get('query');
            
        } else if (this.get('query').length >= 1) {
            
            spec.nom = this.get('query');
            
        }
            
        return new Ember.RSVP.Promise((res, rej) => {

            this.get('HttpService').postJson("broker/lexique/region/list", spec)
                .then(data => { res(data.rootNode.regionsWwws)})
                .catch(err => rej(err));

        });
            
    }
    
    
});