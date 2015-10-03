import Ember from 'ember';
import AmenagementInjection from 'bdtracages/models/amenagement-injection';

export default  Ember.Component.extend({
    
    tagName: "",
    
    exclude: Em.A([]),

    amenagementInjection: null,

    resetValue: function() {
            
        this.set('amenagementInjection', AmenagementInjection.create());
        
    },

    actions: {
        
        onShowModal() {

            this.resetValue();
            
        },

        validateSelection() {
            
            if (this.get('amenagementInjection.typeAmenagementId')) {
            
                this.sendAction('action', this.get('amenagementInjection'));
                this.get('ModalManager').hide('amenagementInjection-modal');
                
            }
            
        },

        cancelSelection() {
            this.resetValue()
            this.get('ModalManager').hide('amenagementInjection-modal');
        }
    }
});