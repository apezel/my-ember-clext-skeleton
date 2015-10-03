import Ember from 'ember';
import MultiTracage from 'bdtracages/models/multi-tracage';

const Modes = {
    CREATE: 'CREATE',
    SELECT: 'SELECT'
}

export default  Ember.Component.extend({
    
    tagName: "",
    Modes,
    mode: Modes.SELECT,
    
    exclude: Em.A([]),

    multiTracage: null,

    modeIsSelection: function () {
        return this.get('mode') === Modes.SELECT
    }.property('mode'),

    modeIsCreation: function () {
        return this.get('mode') === Modes.CREATE
    }.property('mode'),

    resetValue: function() {
        
        if (this.get('mode') === Modes.CREATE) {
            
            this.set('multiTracage', MultiTracage.create());
            
        } else {
            
            this.set('multiTracage', null);
            
        }
        
    }.observes('mode'),

    actions: {
        
        onShowModal: function() {

            this.resetValue();
            this.set('mode', Modes.SELECT);
            
        },

        validateSelection() {
            
             if (this.get('multiTracage.objectif')) {
            
                this.sendAction('action', this.get('multiTracage'));
                this.get('ModalManager').hide('multiTracage-modal');
                 
             }
        },

        cancelSelection() {
            this.resetValue()
            this.get('ModalManager').hide('multiTracage-modal');
        }
    }
});