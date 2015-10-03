import Ember from 'ember';
import {ModelEditableController} from 'bdtracages/mixins/model-editable';
import roles from 'bdtracages/constants/roles';

export default Ember.Controller.extend(ModelEditableController, {

    validate: function() {
        
        var pbs = [],
            isBlank = (s) => (!s || !s.length),
            u = this.get('model');
        
        switch (true) {
                
            case isBlank(u.get('nom')): pbs.push( this.get('dico').t('field:required', {field: 'nom'}) )
            case isBlank(u.get('prenom')): pbs.push( this.get('dico').t('field:required', {field: 'prenom'}) )
            case isBlank(u.get('email')): pbs.push( this.get('dico').t('field:required', {field: 'email'}) )
            case u.get('organismeId') == null: pbs.push( this.get('dico').t('field:required', {field: 'organisme'}) )
            case !u.get('lexProfils.length'): pbs.push( this.get('dico').t('field:minimum:required', {field: 'profil', size: 1}) )
                
        }
        
        if (this.get('UserSession.user').equals(u) && !u.get('lexProfils').find( x => x.id === roles.ADMIN)) {
            
            pbs.push( this.get('dico').t('forbidden', {reason: 'Impossible de supprimer le profil administrateur.'}) )
            
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
            
            this.get('GrowlService').notify("Le compte a été enregistré", "success");
            this.get('UserSession').check().now().then( () => this.send('goBack') );
            this.send('triggerRefresh');
            
        }
        
    }
    
});