import Ember from 'ember';
import {PagineableRoute, PageInfo} from 'bdtracages/mixins/pagination-aware';
import Spec from 'bdtracages/models/specs/source-info-spec';

export default Ember.Route.extend(PagineableRoute, {
    
    endpoint: "broker/source-info/list",
    
    unwrapResponse: function(data) {
        
        return data.get('sourceInfoes');
        
    },
    
    beforeModel: function() {
        
        this.setProperties({
            pageInfo: PageInfo.create({size: 10}),
            spec: Spec.create()
        });

    }
    
});