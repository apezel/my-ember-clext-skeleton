import Ember from 'ember';
import Parent from './component';

export default Parent.extend({
    
    layoutName: "components/page-filter/tracage",
    
    filterByUserOrganismeSelected: Ember.computed('spec.organismeId', {
        
        get() {
            
            return this.get('spec.organismeId') != null;
            
        },
        
        set(key, value) {
            
            this.set('spec.organismeId', value ? this.get('UserSession.user.organismeId.id') : null);
            return value;
        }
        
    })
    
});

