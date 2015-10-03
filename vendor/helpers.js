jQuery["postJSON"] = function( url, data, callback ) {

    if ( jQuery.isFunction( data ) ) {
        callback = data;
        data = undefined;
    }

    return jQuery.ajax({
        url: url,
        type: "POST",
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: callback
    });
	
};

function parseWrappedJsonArray(data) {

	switch(true) {
	
		case data.hasOwnProperty("Vector"):
			return data.Vector;
		case data.hasOwnProperty("ArrayList"):
			return data.ArrayList;
		default:
			console.log(data);
			throw "Unknow json array type";
	
	}

}