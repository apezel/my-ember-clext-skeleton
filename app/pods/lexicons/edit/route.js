import Ember from 'ember';
import lexiconsCollections from 'bdtracages/models/lexicons-collections'
import {ModelEditableRoute} from 'bdtracages/mixins/model-editable';

export default Ember.Route.extend(ModelEditableRoute, {

    endpoint: "broker/lexique/save",
    
    collection: null,

    buildNewModel: function() {
        return this.get('collection').createModel({id: null});
    },
    
    fetchModelFromParent: function(parentModel, identifier) {
        return parentModel.find(x => x.get('id') === parseInt(identifier));
    },
    
    beforeModel: function (transition) {
    
        let param = transition.params['lexicons.edit'].id
        this.set('collection', lexiconsCollections[transition.params.lexicons.type]);
        
        this._super(transition);
        
    },

    setupController(controller, model) {

        this._super(controller, model);
        
        let collection = this.get('collection')

        controller.set('collection', collection);

        if (collection.get('hasFamille')) {
            controller.set('assoc', this.get('LexiqueService.data').get(collection.assoc))
        }
        
    }

});