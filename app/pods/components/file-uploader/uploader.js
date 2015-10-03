import Ember from 'ember';
import HttpService from 'bdtracages/services/http-service';
/* global mOxie */

export default Ember.Object.extend(Ember.Evented, {
	
	dataType: 'json'
	
	// ===========
	// = ACTIONS =
	// ===========
	
	,onFilesChange: "onFilesChange"
	,onStartUpload: "onStartUpload"
	,onProgress: "onProgress"
	,onComplete: "onComplete"
	,onError: "onError"
	
	,loading: false
	
	,xhr: null
	
	,onUploadProgess: function(e) {
		
	    var pct = e.loaded / e.total * 100;
	    this.trigger('onProgress', pct);
		
	}
	
	,loadAttachment: function(file) {
		
	  	return new Ember.RSVP.Promise(function(resolve, reject) {
		  
	    	var reader = new mOxie.FileReader();
        	
	    	reader.onloadend = function(e) {
	           resolve(e.target.result);
	    	};
        	
	    	reader.onerror = function(e) {
	    	  reject(e.target.error);
	    	};
        	
	    	reader.readAsDataURL(file);
		
	  	});
	  
	}
	
	,upload: function(segment, files, params) {
		
		var self = this;
		
		var promises = files.map((file) => {
			
	        return this.loadAttachment(file)
	          .then(function(data) {
				  
				  return moxie.core.utils.Encode.btoa(file.name)+";"+data.replace(/^data:.*?,/g, "");
				  
	          });
	  
	    });
        
        this.set('loading', true);

	    return Ember.RSVP.all(promises).then(function(datas) {
			
			return self._upload(segment, datas, params);
			
	    })
        .catch((err) => {
            
            this.set('loading', false);
            throw err;
               
        })
        .then((data) => {
            
            this.setProperties({
                'loading': false,
                'xhr': null
            });
            
            return data;
            
        });
	
	}
	
	,abort: function() {
		
		if (this.get('xhr') != null) {
			
			this.get('xhr').abort();
		
		}
	
	}
	
	,_upload: function(segment, datas, params) {
		
		params = params || {};
		
		var self = this;
		
		var data = new mOxie.FormData();
		
	    datas.forEach(function(value) {
			
	        data.append("file", value);
	    
		});
		
		Object.keys(params).forEach(function(k) {
			
			data.append(k, params[k]);
			
		});

		var xhr = new mOxie.XMLHttpRequest();
        this.set('xhr', xhr);
        
        return new Ember.RSVP.Promise((res, rej) => {
        
            xhr.open('POST', HttpService.endpoint + segment, true);
            xhr.bind('progress', self.onUploadProgess);
            xhr.bind('load', function(e) {
                if(this.status === 200) {
                    self.trigger('onComplete', e.target.response);
                    res(e.target.response);
                } else {
                    rej(this);
                    console.log("UPLOAD FAILED WITH STATUS "+this.status);
                }

            });

            xhr.send(data);
        
        });
		
	}


});