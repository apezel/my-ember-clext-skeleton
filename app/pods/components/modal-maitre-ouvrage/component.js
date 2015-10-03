import Ember from 'ember';
import MaitreOuvrage from 'bdtracages/models/maitre-ouvrage';


const Modes = {
    CREATE: 'CREATE',
    SELECT: 'SELECT'
}

export default  Ember.Component.extend({
    
    tagName: "",
    Modes,
    mode: Modes.SELECT,
    
    exclude: Em.A([]),

    maitreOuvrage: null,

    modeIsSelection: function () {
        return this.get('mode') === Modes.SELECT;
    }.property('mode'),

    modeIsCreation: function () {
        return this.get('mode') === Modes.CREATE;
    }.property('mode'),
    
    resetValue: function() {
        
        if (this.get('mode') === Modes.CREATE) {
            
            this.set('maitreOuvrage', MaitreOuvrage.create());
            
        } else {
            
            this.set('maitreOuvrage', null);
            
        }
        
    }.observes('mode'),

    actions: {
        
        onShowModal: function() {

            this.resetValue();
            this.set('mode', Modes.SELECT);
            
        },

        validateSelection() {
            
            if (this.get('maitreOuvrage.nom')) {
            
                this.sendAction('action', this.get('maitreOuvrage'));
                this.get('ModalManager').hide('maitreOuvrage-modal');
                
            }
            
        },

        cancelSelection() {
            this.resetValue()
            this.get('ModalManager').hide('maitreOuvrage-modal');
        }
    }
});