import Ember from 'ember';

export default Ember.Component.extend({

    tagName: "div",
    layoutName: "components/x-popup",
    classNames : ['popup-overlay'],
    classNameBindings : ['open'],

    open:false,

    animate : function(){
        setTimeout( () => {
            this.set('open', true)
        }, 10)
    }.on('didInsertElement')

});