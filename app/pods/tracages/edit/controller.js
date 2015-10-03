import Ember from 'ember';
import Tracage from 'bdtracages/models/tracage';
import modelFactory from 'bdtracages/lib/model-factory';
import {ModelEditableController} from 'bdtracages/mixins/model-editable';

const views = {
    GENERAL: 'general',
    POINT: 'point',
    MONITORING: 'monitoring',
    BIBLIO: 'biblio'
};

// TODO : supprimer car les ids doivent rester à 0 même pour les tests
const generateIDAndPush = (array, obj) => {
    obj.set('id', array.length)
    array.pushObject(obj)
}

export default Ember.Controller.extend(ModelEditableController, {

    // Model,
    //tracage: modelFactory.Tracage,
    Visibilites: modelFactory.Visibilites,
    OuiNon: modelFactory.OuiNon,

    ////////////////////////////////////////////
    //  Views
    ////////////////////////////////////////////
    views,
    currentView: views.GENERAL,

    viewIsGeneral: function () {
        return this.get('currentView') === views.GENERAL
    }.property('currentView'),

    viewIsPoint: function () {
        return this.get('currentView') === views.POINT
    }.property('currentView'),

    viewIsMonitoring: function () {
        return this.get('currentView') === views.MONITORING
    }.property('currentView'),

    viewIsBiblio: function () {
        return this.get('currentView') === views.BIBLIO
    }.property('currentView'),

    // SEEE
    currentViewDidChange:function(){
        if(this.get('currentView') === views.BIBLIO){
            this.transitionToRoute('tracages.edit.bibliographies')
        } else {
            this.transitionToRoute('tracages.edit')
        }
    }.observes('currentView'),

    validate: function () {
        var pbs = [];
        // TODO : validations checks
        return new Ember.RSVP.Promise((res, rej) => {
            pbs.length ? rej(pbs) : res()
        })
    },

    actions: {

        toView(view) {
            this.set('currentView', view)
        },

        ////////////////////////////////////////////
        //  Multi tracages handling
        ////////////////////////////////////////////
        addMultiTracage(data) {
            // TODO : tracage.multiTracage is an object
            generateIDAndPush(modelFactory.MultiTracages, data)
            this.set('tracage.multiTracageId', data);
        },

        // Called wen we click on a delete button
        deleteMultiTracage() {
            this.set('tracage.multiTracageId', null)
        },

        ////////////////////////////////////////////
        //  Maitres ouvrage handling
        ////////////////////////////////////////////
        addMaitresOuvrage(data) {
            generateIDAndPush(modelFactory.MaitresOuvrage, data)
            this.get('tracage.maitresOuvrageIds').pushObject(data);
        },

        addAmenagementInjection(data) {
            this.get('tracage.pointInjectionId.amenagementInjections')
                .pushObject(data);
        },

        deleteMaitreOuvrage(data) {
            let maitres = this.get('tracage.maitresOuvrageIds'),
                subject = maitres.findBy('id', data.id);

            if (subject) {
                maitres.removeObject(subject)
            }
        },

        openModal(modalName) {
            this.get('ModalManager').show(modalName)
        },


        // TODO : Remove to get ModelEditable funcs
        save() {
            let tracage = this.get('model')
            console.dir(tracage.getJson());
        },
        // TODO : Remove to get ModelEditable funcs
        cancel() {
            this.send('goBack')
        },

        toBiblioSearch(){
            this.transitionToRoute('tracages.new.search-biblio')
        }
    }
});