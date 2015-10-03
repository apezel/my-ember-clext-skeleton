import Ember from 'ember';
import {ModelEditableRoute} from 'bdtracages/mixins/model-editable';
import Organisme from 'bdtracages/models/organisme';

export default Ember.Route.extend(ModelEditableRoute, {
    
    endpoint: "broker/organisme/save",
    
    buildNewModel: function() {
        return Organisme.create({});
    },
    
    fetchModelFromParent: function(parentModel, identifier) {
        return parentModel.find(x => x.get('id') === parseInt(identifier));
    }
    
});