import Ember from 'ember';
import {default as PaginationAware, PageInfo} from 'bdtracages/mixins/pagination-aware';
import {PagineableController} from 'bdtracages/mixins/pagination-aware';

export default Ember.Controller.extend(PagineableController, {

    removeEndPoint: 'broker/tracage/remove',

    actions: {

        // TODO : implement ModelDeletable Mixin
        remove: function (o) {
            console.dir(o);
        },

        edit: function (o) {
            this.transitionToRoute('tracages.edit', o.get('id'));
        }

    }

});