import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        delete(tracage) {
            alert(`Deleting ${tracage.text}`)
        }
    }

});