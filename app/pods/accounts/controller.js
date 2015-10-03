import Ember from 'ember';
import {PagineableController} from 'bdtracages/mixins/pagination-aware';
import ModelDeletable from 'bdtracages/mixins/model-deletable'

export default Ember.Controller.extend(ModelDeletable, PagineableController, {

    removeEndPoint: 'broker/utilisateur/remove',

    actions: {
        edit: function (o) {
            this.transitionToRoute('accounts.edit', o.get('id'));
        }
    }

});