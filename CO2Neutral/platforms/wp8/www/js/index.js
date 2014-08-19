var id_usuario=1;
var idCalculadora=1;



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	cargarPerfil: function(){
		jQuery.mobile.navigate("#profile");
	},
	login: function(){
		jQuery.mobile.navigate("#home");
	},
	fblogin: function() {
		jQuery.mobile.navigate("#home");
	},
	register: function() {
		jQuery.mobile.navigate("#register");
	},
	logout: function() {
		jQuery.mobile.navigate("#inicio");
	},
	//****************** Calculadora *****************************************************
	cargarCalculadora: function(){
	//cargar los datos del usuario en los campos
		var transporte = apiAccess.getUsuarioCalculadoraById(id_usuario).resultadoTransporte;
		//alert(transporte);
		var electricidad = apiAccess.getUsuarioCalculadoraById(id_usuario).resultadoElectricidad;
		var reciclaje = apiAccess.getUsuarioCalculadoraById(id_usuario).resultadoReciclaje;
		var gas = apiAccess.getUsuarioCalculadoraById(id_usuario).resultadoGas;
		
		//Se completan los inputs con la informacion obtenida del servidor
		document.getElementById('resultado_trasporte').value = transporte;
		document.getElementById('resultado_electricidad').value = electricidad;
		document.getElementById('resultado_reciclaje').value = reciclaje;
		document.getElementById('resultado_gas').value = gas;
	},
	
	cargarPeriodicidad: function (){
	var total_periodicidad = apiAccess.getPeriodicidad();	
	app.cargarPeriodicidad_aux(total_periodicidad);	},
	
	cargarPeriodicidad_aux: function(total_periodicidad){
	var periodicidad ="";
	periodicidad += '<select name="list1">';
	
	for (var i = 0; i < total_periodicidad.length; i++) { 
			periodicidad += '<option value='+total_periodicidad[i].valor+'>'+total_periodicidad[i].nombre + '</option>';
		}
	periodicidad += '</select>';
	
	document.getElementById('periodicidad_PieDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_BicicletaDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_TrenDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_AutobusDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_MotocicletaDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_AutomóvilDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_AviónDiv').innerHTML = periodicidad;	
	
	var datosCalculadora = apiAccess.getMedioTransporte(idCalculadora);
	
	for (var i = 0; i < datosCalculadora.length; i++) { 	
		
			if (apiAccess.getMediosById(datosCalculadora[i].idMedios).nombre == "Pie"){
				document.getElementById('km_trayectoPie').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesPie').value= datosCalculadora[i].cantidadVeces;				
			}
			else if (apiAccess.getMediosById(datosCalculadora[i].idMedios).nombre == "Bicicleta"){
				document.getElementById('km_trayectoBicicleta').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesBicicleta').value= datosCalculadora[i].cantidadVeces;				
			}
			else if (apiAccess.getMediosById(datosCalculadora[i].idMedios).nombre == "Tren, Tranvía, Metro"){
				document.getElementById('km_trayectoTren').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesTren').value= datosCalculadora[i].cantidadVeces;				
			}
			else if (apiAccess.getMediosById(datosCalculadora[i].idMedios).nombre == "Autobus"){
				document.getElementById('km_trayectoAutobus').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesAutobus').value= datosCalculadora[i].cantidadVeces;				
			}
			else if (apiAccess.getMediosById(datosCalculadora[i].idMedios).nombre == "Motocicleta"){
				document.getElementById('km_trayectoMotocicleta').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesMotocicleta').value= datosCalculadora[i].cantidadVeces;				
			}
			else if (apiAccess.getMediosById(datosCalculadora[i].idMedios).nombre == "Automóvil"){
				document.getElementById('km_trayectoAutomóvil').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesAutomóvil').value= datosCalculadora[i].cantidadVeces;				
			}else{
				document.getElementById('km_trayectoAvión').value= datosCalculadora[i].kilometraje;
				document.getElementById('n_vecesAvión').value= datosCalculadora[i].cantidadVeces;
			}
	}
	},
	calcularTransporte: function(){	
	//Obtener datos de los entry para calcular
	var km_trayectoPie = document.getElementById('km_trayectoPie').value;
	var n_vecesPie = document.getElementById('n_vecesPie').value;	
	
	var km_trayectoBicicleta = document.getElementById('km_trayectoBicicleta').value;
	var n_vecesBicicleta = document.getElementById('n_vecesBicicleta').value;
	
	var km_trayectoTren = document.getElementById('km_trayectoTren').value;
	var n_vecesTren = document.getElementById('n_vecesTren').value;
	
	var km_trayectoAutobus = document.getElementById('km_trayectoAutobus').value;
	var n_vecesAutobus = document.getElementById('n_vecesAutobus').value;
	
	var km_trayectoMotocicleta = document.getElementById('km_trayectoMotocicleta').value;
	var n_vecesMotocicleta = document.getElementById('n_vecesMotocicleta').value;
	
	var km_trayectoAutomóvil = document.getElementById('km_trayectoAutomóvil').value;
	var n_vecesAutomóvil = document.getElementById('n_vecesAutomóvil').value;
	
	var km_trayectoAvión = document.getElementById('km_trayectoAvión').value;
	var n_vecesAvión = document.getElementById('n_vecesAvión').value;

	var selectedValueArray = $('.alert select').map(function() {//-- obtener los campos del combobox -->
		return $(this).val();
	}).get();
	
	var total_medios = apiAccess.getMedios();	
	for (var i = 0; i < total_medios.length; i++) {		
			
			if (total_medios[i].nombre == "Pie"){				
				document.getElementById('total_Pie').value= (km_trayectoPie*n_vecesPie*(total_medios[i].valor))/(selectedValueArray[i]);
			}
			else if (total_medios[i].nombre == "Bicicleta"){							
				document.getElementById('total_Bicicleta').value= (km_trayectoBicicleta*n_vecesBicicleta*(total_medios[i].valor))/(selectedValueArray[i]);
			}
			else if (total_medios[i].nombre == "Tren, Tranvía, Metro"){					
				document.getElementById('total_Tren').value= (km_trayectoTren*n_vecesTren*(total_medios[i].valor))/(selectedValueArray[i]);
			}
			else if (total_medios[i].nombre == "Autobus"){					
				document.getElementById('total_Autobus').value= (km_trayectoAutobus*n_vecesAutobus*(total_medios[i].valor))/(selectedValueArray[i]);
			}
			else if (total_medios[i].nombre == "Motocicleta"){					
				document.getElementById('total_Motocicleta').value= (km_trayectoMotocicleta*n_vecesMotocicleta*(total_medios[i].valor))/(selectedValueArray[i]);
			}
			else if (total_medios[i].nombre == "Automóvil"){					
				document.getElementById('total_Automóvil').value= (km_trayectoAutomóvil*n_vecesAutomóvil*(total_medios[i].valor))/(selectedValueArray[i]);
			}
			else {					
				document.getElementById('total_Avión').value= (km_trayectoAvión*n_vecesAvión*(total_medios[i].valor))/(selectedValueArray[i]);
			}				
		}

	 
	
	
	},
	//****************** CargarConsejos *****************************************************
	cargarConsejos: function(){
		var consejos="";
		var total_consejos = apiAccess.getConsejos();;
	
		app.cargarConsejos_aux(total_consejos);
	},
	
	cargarConsejos_aux: function(total_consejos){
		var consejos="";			
		consejos += '<ul data-role="listview" data-inset="true" data-filter="true" data-divider-theme="b">';
		consejos += '<li data-role="list-divider"> Recomendaciones</li>';
				
		for (var i = 0; i < total_consejos.length; i++) { 

			consejos += '<li><h4>'+total_consejos[i].descripcion + '</li>';
		}

		consejos += '</ul>';
		
		document.getElementById('consejosDiv').innerHTML = consejos;
		
	},
	cargarProductos: function(){
		var productos="";
		var total_productos = apiAccess.getProductos(); //array - categorias
		productos += '<ul data-role="listview" data-inset="true" data-theme="a" data-dividertheme="d">';
		productos += '<li><a href="#pTransporte"> <img src="res/car.png" class="ui-li-thumb"/><h1> Transporte</h1></a></li>';
		productos += '<li><a href="#pAgua"> <img src="res/water.png" class="ui-li-thumb"/><h1>Uso del agua</h1></a></li>';
		productos += '</ul>';
		document.getElementById('ProductosDiv').innerHTML = productos;
		
		app.cargarProductos_aux(total_productos);

	},
	
	cargarProductos_aux: function(total_productos){
		var productosTra="";
		productosTra += '<a href="./" data-shadow="false" data-iconshadow="false" data-icon="carat-l" data-iconpos="notext" data-rel="back" data-ajax="false">Atrás</a>';			
		productosTra += '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		
		for (var i = 0; i < total_productos.length; i++) { 		
			
			productosTra += '<li>'+total_productos[i].nombre+'<br>';
			productosTra += ''+total_productos[i].descripcion+'</li>';
		}
		productosTra += '</ul>';
		document.getElementById('ProductosTra1').innerHTML = productosTra;
	},	
	cargarCentros: function(){
		//mostrar el mapa cuando la pagina esté cargada
		$(document).on("pageshow", "#centros", function () {
			//ubicar a la persona en el mapa
			app.posicionActual();
		});
	},
		posicionActual: function(){
		navigator.geolocation.getCurrentPosition(onSuccess, onError,{ enableHighAccuracy: true });
		function onSuccess(position) {
			lat =  position.coords.latitude;
		  	lng = position.coords.longitude;
			myLatlng = new google.maps.LatLng(lat,lng);
			
			montarMapa();
      	}
		function onError(error) {
          	alert('code: ' + error.code + ' message: ' + error.message);
			myLatlng = new google.maps.LatLng(9.854246, -83.9096050)
			montarMapa();
        }
		function montarMapa(){
			mapOptions = {
				center: myLatlng, 
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			//agregar el marcador con la posición actual
			marker = new google.maps.Marker({
      			position: myLatlng,
			    map: map,
		        title: 'Aquí estoy yo!'
  			});
			
			centrosAcopio = apiAccess.getCentros();
			console.log(centrosAcopio);
			//iterar en los centros de acopio agregando los markers
			for(i=0; i<centrosAcopio.length;i++){
				centro = centrosAcopio[i];
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(centro.latitud, centro.longuitud),
					map: map,
					title: centro.nombre
				});
			}
		 	google.maps.event.trigger(map,'resize');			
		}	
	}
};
