import Ember from 'ember';
import MultiValueInputAbstract from '../multi-value-input/abstract';

export default MultiValueInputAbstract.extend({
    
    async: true,
    
    endpoint: '',
    
    filterField: 'text',
    
    filterData: function() {
        
        var spec = {};
        
        spec[this.get('filterField')] = this.get('query');
            
        return new Ember.RSVP.Promise((res, rej) => {

            this.get('HttpService').postJson("broker/"+this.get('endpoint'), spec)
                .then(data => {
                
                    if (data.rootNode) {
                        
                        res(data.getAsJsObject()[Object.keys(data.rootNode)[0]]);
                        
                    } else {
                        
                        res(data.rootNode);
                        
                    }
                    
            
                })
                .catch(err => rej(err));

        });
            
    }
    
    
});