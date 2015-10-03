import Ember from 'ember';
import {ModelEditableRoute} from 'bdtracages/mixins/model-editable';
import Utilisateur from 'bdtracages/models/utilisateur';

export default Ember.Route.extend(ModelEditableRoute, {

    endpoint: "broker/utilisateur/save",

    buildNewModel: function() {
        return Utilisateur.create({lexProfils: Em.A()});
    },
    
    fetchModelFromParent: function(parentModel, identifier) {
        return parentModel.find(x => x.get('id') === parseInt(identifier));
    }

});