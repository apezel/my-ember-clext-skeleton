import Ember from 'ember';
import lexiconsCollections from 'bdtracages/models/lexicons-collections'
import {PagineableRoute, PageInfo} from 'bdtracages/mixins/pagination-aware';

export default Ember.Route.extend(PagineableRoute, {

    fetchMethod: "get",
    
    collection: null,
    
    unwrapResponse: function(data) {

        return data.get(this.get('collection.atClass'));
        
    },
    
    beforeModel: function (transition) {

     var params = this.paramsFor('lexicons');

     if (this.get('UserSession.isAdmin')) {
         
         this.setProperties({

             collection: lexiconsCollections[params.type],
             endpoint: `broker/lexique/${params.type}/load`,
             pageInfo: PageInfo.create({
                 size: 1000
             }),
             spec: {}

         });
         
     } else {

         this.transitionTo('index');

     }
 },

    setupController(controller, model) {
        
        controller.setup(model, this.get('pageInfo'), this.get('collection'));
        
    }

});