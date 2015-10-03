import Ember from 'ember';
import {default as PaginationAware, Pageable} from 'bdtracages/mixins/pagination-aware';


export default Ember.Component.extend(PaginationAware, Pageable, {
   
    tagName: "div",
    layoutName: "components/x-table",
    classNames: ["table-component"],
    
    paginable: true,
    
    data: null,
    
    firstRow: Ember.computed('data.[]', function() {
        
        if (this.get('data.length') > 0) {
            
            return this.get('data').objectAt(0);
            
        }
        
        return null;
        
    })
    
});