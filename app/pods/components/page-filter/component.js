import Ember from 'ember';

export default Ember.Component.extend({
    
    layoutName: null,
    
    spec: null,
    
    specChange: function() {
        
        this.get('spec').on('change', () => this.send('triggerFilter'));
        
    }.observes('spec').on("init"),
    
    actions: {
        
        triggerFilter: function() {
            
            this.sendAction('onTriggerFilter', this.get('spec'));
            
        }
        
    }
    
});

