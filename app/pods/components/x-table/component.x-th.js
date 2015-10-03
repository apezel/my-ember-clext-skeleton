import Ember from 'ember';


export default Ember.Component.extend({

    tagName: "",

    sortPath: null,

    sortBy: null,
    sortOrder: null,

    width: 'auto',

    computedStyle: function () {
        let width = this.get('width')
        return new Ember.Handlebars.SafeString("width: " + width !== 'auto' ? width + '%' : width);
    }.property('width'),

    active: function () {

        return this.get('sortPath') === this.get('sortBy');

    }.property('sortPath', 'sortBy'),

    actions: {

        sort: function () {

            this.sendAction("onSort", this.get('sortPath'));

        }

    }

});