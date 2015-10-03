import Ember from 'ember';
/* gobal mOxie */

export default Ember.Component.extend({
	
	tagName: "div"
	
	,classNameBindings: ["class"]
	
	,multiple: true
	
	,accept: [
		{title: "Documents", extensions: "pdf,zip"}
		]
	
	,dataType: 'json'
	
	,compId: null
	
	,auto: false
	
	,uploader: null
	
	// ===========
	// = ACTIONS =
	// ===========
	
	,onFilesChange: "onFilesChange"
	
  	,didInsertElement: function() {
  		
		var self = this;
		
		this.set("compId", this);
		
		this.set('uploader', new mOxie.FileInput({
		      browse_button: this.$().get(0),
		      multiple: this.get('multiple'),
			  container: $('#upload-shims-container').get(0),
			  accept: this.get('accept'),
			  runtime_order: "html5,flash"//,
		    }));
			
		this.get('uploader').onchange = function(e) {
			
			Ember.run.later(function() {
			
				self.sendAction("onFilesChange", self.get('uploader.files'));

			});
			
		};
 
		this.get('uploader').init();
		
		$('#upload-shims-container').css({
			position: "fixed",
			top: "0px",
			left: "0px",
			'z-index': 9999
		});

		this.$().mouseenter(function() {
		    self.get('uploader').refresh();
		});
		
  	}
	
	,willDestroyElement: function() {
	
		$("#"+this.get('uploader.shimid')).css({
			width: '0px'
		});
		
	}

});