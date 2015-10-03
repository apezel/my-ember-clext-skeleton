import Ember from 'ember';
export default Ember.Route.extend({
    model() {
        return [
            {id: 1, text: 'A'},
            {id: 2, text: 'B'}
        ]
    }
});