import Ember from 'ember';
import {ModelEditableControllerWithFileUpload} from 'bdtracages/mixins/model-editable';

export default Ember.Controller.extend(ModelEditableControllerWithFileUpload, {
    
    uploadEndpoint: 'broker/source-info/upload-file',
    
    buildUploadParams: function() {
      
        return {};
        
    },
    
    processUploadResponse: function(response) {
        
        this.set('model.uploadToken', response);
        
    },
    
    validate: function() {
        
        var pbs = [],
            isBlank = (s) => (!s || !s.length),
            o = this.get('model');
        
        switch (true) {
            case isBlank(o.get('titre')): pbs.push( this.get('dico').t('field:required', {field: 'titre'}))
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
            
            this.get('GrowlService').notify("La bibliographie a été enregistrée", "success");
            this._super();
            
        }
        
    }
    
});