import Ember from 'ember';
import RouteBiblio from 'bdtracages/pods/bibliographies/route';
import RouteStackAware from 'bdtracages/mixins/route-stack-aware';

export default RouteBiblio.extend(RouteStackAware, {
    
    renderTemplate: function() {
        this.render({ outlet: 'biblio' });
    },

    actions: {
        
        edit: function(o) {
            
            this.transitionRelativeToThis('edit', o.get('id'));
            
        },
        
        goBack: function() {
            
            this.transitionToParent();
            
        }
        
    }

});