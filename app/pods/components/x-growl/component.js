import Ember from 'ember';


var Growl = Ember.Component.extend({
    
    classNames: ["growl"],
    
    lifeTime: 3000,
    
    messages: Em.A(),
    
    didInsertElement: function() {
        
        this.get('GrowlService').connect(this);
        
    },
    
    addMessage: function(message, level) {
        
        var msgO = Ember.Object.create({
            
            message: message,
            level: level
            
        });
        
        this.get('messages').unshiftObject(msgO);
        
    },
    
    actions: {
        
        removeMessage: function(msgO) {
            console.log(msgO);
            this.get('messages').removeObject(msgO);

        }
        
    }
    
    
});


export default Growl;