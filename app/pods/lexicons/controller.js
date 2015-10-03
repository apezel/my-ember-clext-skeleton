import Ember from 'ember';
import {PagineableController} from 'bdtracages/mixins/pagination-aware';
import ModelDeletable from 'bdtracages/mixins/model-deletable'

export default Ember.Controller.extend(ModelDeletable, PagineableController, {

    removeEndPoint : 'broker/lexique/remove',

    setup: function(model, pageInfo, collection) {
        
        this.setProperties({
            model: model,
            pageInfo: pageInfo,
            lexiconCollection: collection
        });
        
    },

    actions: {

        edit: function(o) {
            //this.transitionToRoute('bibliographies.edit', o.get('id'));
        }
    }

});