import Ember from 'ember';
import RouteBiblioEdit from 'bdtracages/pods/bibliographies/edit/route';

const isCreateMode = (param) => {
    return param === 'new'
};

export default RouteBiblioEdit.extend({
    
    controllerName: "bibliographies.edit",
    
    renderTemplate: function() {
        this.render('bibliographies/edit', 
            {
                outlet: 'popups',
                into: 'tracages.edit'
            });
    }
    
});