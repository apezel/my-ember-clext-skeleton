import Ember from 'ember';
import {PagineableRoute, PageInfo} from 'bdtracages/mixins/pagination-aware';
import Spec from 'bdtracages/models/specs/utilisateur-spec';

export default Ember.Route.extend(PagineableRoute, {
    
    endpoint: "broker/utilisateur/list",
    
    unwrapResponse: function(data) {
        
        return data.get('utilisateurs');
        
    },
    
    beforeModel: function(transition) {
        
        if (this.get('UserSession.isAdmin')) {

            this.setProperties({
                pageInfo: PageInfo.create({size: 10}),
                spec: Spec.create()
            });
            
        } else {
            
            this.transitionTo('index');
            
        }

    }
    
});