import Ember from 'ember';
import {default as PaginationAware, PageInfo} from 'bdtracages/mixins/pagination-aware';
import Spec from 'bdtracages/models/specs/tracage-spec';


export default Ember.Route.extend(PaginationAware, {
    
    pageInfoEnCours: PageInfo.create({size: 100}),
    pageInfoRejetes: PageInfo.create({size: 100}),
    
    specEnCours: Spec.create({statusId: 1}),
    specRejetes: Spec.create({statusId: 4}),
    
    enCoursPromise: function() {
        
        return this.get('HttpService').postJson(this.paginatedUrl("broker/tracage/list", this.get('pageInfoEnCours')), this.get('specEnCours'))
            .then(data => {

                var wrapped = data.getAsJsObject(),
                    model = Em.A([]);

                if (wrapped) {

                    model = data.getAsJsObject().get('tracages');

                }

                this.get('pageInfoEnCours').setProperties(data.get('pageInfo'));
            
                return model;

            })
            .catch(err => console.log(err));
        
    },
    
    rejetesPromise: function() {
        
        return this.get('HttpService').postJson(this.paginatedUrl("broker/tracage/list", this.get('pageInfoRejetes')), this.get('specRejetes'))
            .then(data => {

                var wrapped = data.getAsJsObject(),
                    model = Em.A([]);

                if (wrapped) {

                    model = data.getAsJsObject().get('tracages');

                }

                this.get('pageInfoRejetes').setProperties(data.get('pageInfo'));
            
                return model;

            })
            .catch(err => console.log(err))
        
    },
    
    beforeModel: function() {
        
        this.set('specEnCours.ownerId', this.get('UserSession.user.id'));
        this.set('specRejetes.ownerId', this.get('UserSession.user.id'));
        
    },
    
    model: function() {
        
        return Ember.RSVP.Promise.all([
            
            this.enCoursPromise(),
            this.rejetesPromise()
            
        ]).then(
            (data) => Em.Object.create({enCours: data[0], rejetes: data[1]})
        );
        
    },
    
    setupController: function(controller, model) {
		
		controller.setup(model, this.get('pageInfoEnCours'), this.get('pageInfoRejetes'));
        
	},
    
    actions: {
        
        refreshModel: function() {
            
            this.model().then(model => this.controller.set('model', model));
            
        }
        
    }
    
    
});