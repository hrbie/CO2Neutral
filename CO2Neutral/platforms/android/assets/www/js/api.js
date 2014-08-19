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
	getPeriodicidad: function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/listaFrecuencias',
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
	getMedioTransporte: function(idCalculadora){
	jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/MedioTransporte',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {   
				//console.log( data );
				for(i=0;i<data.length;i++){					
					if(data[i].idCalculadora == idCalculadora){							
						item.push(data[i]);
					}
				}
				items = data;
            },
			error: function (responseData, textStatus, errorThrown)  {
                alert(responseData + '\n' + textStatus + '\n' + errorThrown);
            }
        });
		return items;		
	},
	crearMedioTransporte: function( idCalculadora, idFrecuencia, km, n, idMedios){
		jQuery.support.cors = true;
		result = false;
        var user = {
			idCalculadora: idCalculadora,
            idFrecuencia: idFrecuencia,
			km:km,
			n:n,
			idMedios: idMedios
        };             
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/MedioTransporte',
            type: 'POST',
			async: false,
            data:JSON.stringify(user),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert('success');
				result = true;
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
	},
	getPeriodicidadValor: function(nombre) {
		jQuery.support.cors = true;
		var item = null;
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/listaFrecuencias',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {  
				//alert(data)
				//console.log( data );				
				for(i=0;i<data.length;i++){					
					if(data[i].nombre == nombre){						
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
	getMedios: function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/listaMedios',
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
	getMediosById : function(id) {
		jQuery.support.cors = true;
		var item = null;
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/listaMedios',
            type: 'GET',
			async: false,
            dataType: 'json',
            success: function (data)  {  
				//alert(data)
				//console.log( data );
				for(i=0;i<data.length;i++){
					if(data[i].idMedios == id){
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
	},
	getProductos : function() {
		jQuery.support.cors = true;
		var items = [];
        $.ajax({
            url: 'http://co2neutral.azurewebsites.net/api/Productos',
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
	},
}
