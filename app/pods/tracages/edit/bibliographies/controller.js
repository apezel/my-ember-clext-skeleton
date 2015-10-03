import Ember from 'ember';
import {PagineableController} from 'bdtracages/mixins/pagination-aware';

export default Ember.Controller.extend(PagineableController, {

    selectedRow: null,
    
    modelChanged: function() {
        
        this.set('selectedRow', null);
        
    }.observes('model.[]'),
    
    actions: {
        
        edit: function(o) {
            
            return true;
            
        },
        
        updateSelectedRow: function(row, e) {
            
            this.set('selectedRow', e.target.checked ? row:null);
            
        },
        
        selectBiblio: function() {
            
            this.send('goBack');
            
        }
        
    }

});