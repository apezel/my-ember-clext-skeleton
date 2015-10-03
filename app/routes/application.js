import Ember from 'ember';

export default Ember.Route.extend({
    
    beforeModel: function() {
        
        this.get('UserSession').on("authentication:success", () => console.log("auth success"));
        this.get('UserSession').on("authentication:failure", () => console.log("auth failure"));
        this.get('UserSession').on("authentication:disconnect", () => console.log("auth disconnect"));
        
        //TODO : REMOVE auto login
        this.get('UserSession').check().now().catch(() => {
            this.get('HttpService').post("broker/login", {login: "arnaud-test-admin@apyx.fr"}).then(
                () => this.get('UserSession').check().now()
            );

        });
        
        return Ember.RSVP.all([
            
            this.get('LexiqueService').load(),
            
            new Ember.RSVP.Promise((res, rej) => {
                this.get('UserSession').on("authentication:connect", () => res());
            
            })
            
        ]);
        
    }
    
});