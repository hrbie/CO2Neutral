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
	},
	getUsuarioCalculadoraById : function(id) {
		jQuery.support.cors = true;
		var item = null;
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/Calculadora',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {  
				//alert(data)
				//console.log( data );
				for(i=0;i<data.length;i++){
					if(data[i].idUsuario == id){
						item = data[i];
					}
				}
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return item;		
	},
	getConsejos : function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/recomendacion',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				items = data;				
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	}
}
