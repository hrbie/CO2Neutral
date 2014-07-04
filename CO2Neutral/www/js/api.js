var apiAccess = {
	getCentros : function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/CentroAcopio',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				items = data;
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	}
}