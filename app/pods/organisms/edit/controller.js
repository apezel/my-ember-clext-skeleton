import Ember from 'ember';
import {ModelEditableController} from 'bdtracages/mixins/model-editable';

export default Ember.Controller.extend(ModelEditableController, {
    
    validate: function() {
        
        var pbs = [],
            isBlank = (s) => (!s || !s.length),
            o = this.get('model');
        
        switch (true) {
            case isBlank(o.get('nom')): pbs.push( this.get('dico').t('field:required', {field: 'nom'}))
        }
        
        return new Ember.RSVP.Promise((res, rej) => {
            
            if (pbs.length) {
                
                rej(pbs);
            
            } else {

                res();

            }
            
        });
        
    },
    
    actions: {
        
        saveSuccess: function() {
            
            this.get('GrowlService').notify("L'organisme a été enregistré", "success");
            this._super();
            
        }
        
    }
    
});