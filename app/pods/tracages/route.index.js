import Ember from 'ember';
import {PagineableRoute, PageInfo} from 'bdtracages/mixins/pagination-aware';
import Spec from 'bdtracages/models/specs/tracage-spec';

export default Ember.Route.extend(PagineableRoute, {
    
    endpoint: "broker/tracage/list",
    
    unwrapResponse: function(data) {
        
        return data.get('tracages');
        
    },
    
    beforeModel: function() {

        this.setProperties({
            pageInfo: PageInfo.create({size: 10}),
            spec: Spec.create()
        });

    }
    
});