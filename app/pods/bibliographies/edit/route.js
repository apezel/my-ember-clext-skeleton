import Ember from 'ember';
import {ModelEditableRoute} from 'bdtracages/mixins/model-editable';
import SourceInfo from 'bdtracages/models/source-info';

export default Ember.Route.extend(ModelEditableRoute, {

    endpoint: "broker/source-info/save",
    
    buildNewModel: function() {
        return SourceInfo.create();
    },
    
    fetchModelFromParent: function(parentModel, identifier) {
        return parentModel.find(x => x.get('id') === parseInt(identifier));
    }

});