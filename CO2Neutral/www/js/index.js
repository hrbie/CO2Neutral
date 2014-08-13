var id_usuario=1;



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
	
	app.cargarPeriodicidad_aux(total_periodicidad);
	},
	
	cargarPeriodicidad_aux: function(total_periodicidad){
	var periodicidad ="";
	periodicidad += '<select name="list1">';
	
	for (var i = 0; i < total_periodicidad.length; i++) { 
			periodicidad += '<option>'+total_periodicidad[i].nombre + '</option>';
		}
	periodicidad += '</select>';
	
	document.getElementById('periodicidad_PieDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_BicicletaDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_TrenDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_AutobusDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_MotocicletaDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_AutomóvilDiv').innerHTML = periodicidad;
	document.getElementById('periodicidad_AviónDiv').innerHTML = periodicidad;	
	},
	calcularTransporte: function(){	
	//guardar los datos nuevos del usuario en la BD
	var km_trayectoTren = document.getElementById('km_trayectoTren').value;
	var n_vecesTren = document.getElementById('km_trayectoTren').value;
	var selectedValueArray = $('.alert select').map(function() {//-- obtener los campos del combobox -->
		return $(this).val();
	}).get();
	var total_medios = apiAccess.getMedios();
	for (var i = 0; i < total_medios.length; i++) { 
			if (total_medios[i].nombre == "Metro, tren, tranvia"){
			document.getElementById('total_Tren').value= (km_trayectoTren*n_vecesTren*int(total_medios[i].valor))//Verificar
			}				
		}
	//alert(total_medios);
	//alert(selectedValueArray);
	document.getElementById('total_Tren').value= (km_trayectoTren*n_vecesTren)
	 
	
	
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
