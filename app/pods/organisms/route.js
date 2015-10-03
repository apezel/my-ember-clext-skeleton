import Ember from 'ember';
import {PagineableRoute, PageInfo} from 'bdtracages/mixins/pagination-aware';
import Spec from 'bdtracages/models/specs/simple-string-spec';

export default Ember.Route.extend(PagineableRoute, {
    
    endpoint: "broker/organisme/list",
    
    pageInfo: PageInfo.create({size: 10}),
    
    unwrapResponse: function(data) {
        
        return data.get('organismes');
        
    },
    
    beforeModel: function () {

         if (this.get('UserSession.isAdmin')) {

             this.setProperties({
                 pageInfo: PageInfo.create({
                     size: 10
                 }),
                 spec: Spec.create()
             });

         } else {

             this.transitionTo('index');

         }

     }
    
});