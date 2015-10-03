import Ember from 'ember';
import Tracage from 'bdtracages/models/tracage';
import {ModelEditableRoute} from 'bdtracages/mixins/model-editable';

export default Ember.Route.extend(ModelEditableRoute, {

    endpoint: 'broker/tracage/save',
    
    buildNewModel: function() {
        return Tracage.create({sourceInfos: Em.A()});
    },
    
    fetchModelFromParent: function(parentModel, identifier) {
        return parentModel.find(x => x.get('id') === parseInt(identifier));
    }
    
});