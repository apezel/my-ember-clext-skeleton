import Ember from 'ember'
import {ModelEditableController} from 'bdtracages/mixins/model-editable'

export default Ember.Controller.extend(ModelEditableController, {

    endpoint: "broker/lexique/save",

    validate() {

        var pbs = [],
            dico = this.get('dico'),
            isBlank = (s) => (!s || !s.length),
            u = this.get('model')

        switch (true) {
            case isBlank(u.get('libelle')) :
                pbs.push(dico.t('field:required', {field: 'Libellé'}))
        }

        return new Ember.RSVP.Promise((resolve, reject) => {
            pbs.length ? reject(pbs) : resolve()
        });
    },

    actions: {

        saveSuccess: function() {
            
            this.get('GrowlService').notify("Le lexique a été enregistré", "success");
            this.get('LexiqueService').load(this.get('collection.atClass'));
            this._super();
            
        }
        
    }

});