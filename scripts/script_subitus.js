var apiHandle = null;
var _Debug = false;
var finalizado = false;

darEnlaceABotones();
if(typeof(Storage)!= "undefined"){
	verificar_info_usuario();
    verificarVariables();
    verificarEstaPagina();
    verificarAvance();
	if(localStorage.getItem("intento_actual")){ //Se verifica si es la primera vez que se accesa al intento
        /**
        * Se obtiene la última hora del intento, en caso de ser mayor a 2 minutos,
        * o que no se estuviera viendo el avance, se da el intento como terminado
        * y se inicia uno nuevo.
        */
        // var code = localStorage.getItem("intento_actual");
        // var hora_ultimo_intento = code.substring(code.length - 4);
        // var hoy = new Date();
        // var t1 = new Date();//Será la hora actual
        // var t2 = new Date();
        // t2.setHours(hora_ultimo_intento.substring(0,2), hora_ultimo_intento.substring(2, 4), "00");
        // t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
        // var minutos = (t1.getHours() * 60) + t1.getMinutes();
        // var entrada = code.substring(8,12);
        // var salida = code.substring(code.length - 4);
        // var minutos = calcularDiferencia(entrada, salida);
        // console.log("Direfencia de minutos" + minutos);
        
        // PARTE DE LOS INTENTOS, QUITÁNDOLA SÓLO EXISTE INTENTO ACTUAL
        // if(minutos>2){
        //     var paginaAnterior = document.referrer;
        //     paginaAnterior = paginaAnterior.substring(paginaAnterior.lastIndexOf('/') + 1);
        //     if (paginaAnterior != "ver_avance.html") {
        //         console.log("Tardó " + minutos);
        //         terminar_intento();
        //         code = "";
        //         console.log("Se está eliminando el intento actual, e iniciando uno nuevo");
        //     }else{
        //         console.log("Viene de ver_avance.html, continúa el intento");
        //     }
            
        // }else{
        //     console.log("Se continúa en el intento actual");
        // }
        // FIN PARTE INTENTOS
        
        code += obtener_informacion_pagina();
        localStorage.setItem("intento_actual", code);
        code = "";
    }else{ //En este caso crean las variables de intento_actual
    	console.log("No hay intento actual, se crea la variable intento_actual");
        code = "";
        code += obtener_informacion_pagina();
        localStorage.setItem("intento_actual", code);
        code = "";
    }
}

function ocultar_botones(){
    $("#btnPrev").attr("disabled", true);
    $("#btnNext").attr("disabled", true);
    $("#btnFin").attr("disabled", true);
}

function darEnlaceABotones(){
    var actual = window.location.pathname;
    if (!existeAnterior(actual)) {
        //$("#btnPrev").attr("disabled", true);
        $("#btnPrev").hide();
    }else{
        $("#btnPrev").attr("href", dameAnterior(actual));
        $("#btnPrev").show();
    }
    $("#btnNext").html("Cerrar");
    $("#btnFin").click(function(){
        finalizar();
        alert("Finalizando");
        var api = getAPIHandle();
        if (api == null){
            alert("ERROR en función end()");
            return false;
        }
        var endResult = api.LMSFinish("");
        finalizado = true;
        //localStorage.setItem("session_time", "000000");
        //window.location.href = "ver_avance.html";
    });

    /**
    * Se crean los botones, en ellos se insertan los enlaces siguiente
    * y anterior en caso de existir; si no existe, desaparece el enlace
    */
    if (!existeSiguiente(actual)) {
        $("#btnNext").html("Ver avance");
        $("#btnNext").attr("href", "avance.html");
    }else{
        $("#btnNext").attr("href", dameSiguiente(actual));
        $("#btnNext").html("Siguiente");
    }
}

function agregaTiempoSesion(){
    var code = localStorage.getItem("intento_actual");
    var entrada = code.substring(8,12);
	var salida = code.substring(code.length - 4);
    var resultado = convierteAHoras(calcularDiferencia(entrada, salida));
    localStorage.setItem("session_time", formatearHora(resultado));
}

/**
 * @param hora1, hora2 con formato: hh:mm
 * @returns tiempo en minutos
 */

function calcularDiferencia(hora1, hora2){
    //Se convierten las horas a minutos
    var hora1 = (parseInt(hora1.substring(0, 2)) * 60) + parseInt(hora1.substring(2, 4));
    var hora2 = (parseInt(hora2.substring(0, 2)) * 60) + parseInt(hora2.substring(2, 4));
    return hora2 - hora1;
}

function convierteAHoras(minutos){
    while(minutos < 0){
        minutos = (12*60) - minutos;
    }
    if (minutos > 59) {
        var horas = parseInt(minutos/60);
        var minutos = minutos - (horas * 60);
        if(horas<10){	horas = "0" + horas.toString();	}
    }else{
        horas = "00";
    }
    if(minutos<10){
        minutos = "0" + minutos.toString();
    }
    return horas.toString() + minutos.toString();
}

function dameID(path){
    var nombre = path.substring(path.lastIndexOf('/') + 1);
    if(nombre==""){//Index
        nombre = "index.html";
    }
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].url == nombre) {
            return pages[i].id;
        }
    }
    return "--";
}

function dameAnterior(nombre){
    var indice = dameIndice(nombre) - 1;
    if(indice != -1){
        return pages[indice].url;
    }else{
        return "";
    }
}

function existeAnterior(nombre){
    var indice = dameIndice(nombre) - 1;
    //console.log("Anterior El índice es: " + indice + ", "+pages.length);
    if(indice < 0){
        return false;
    }else{
        return true;
    }
}

function existeSiguiente(nombre){
    var indice = dameIndice(nombre) + 1;
    //console.log("Función El índice es: " + indice + ", "+pages.length);
    if(indice>=pages.length){
        return false;
    }else{
        return true;
    }
}

function dameSiguiente(nombre){
    var indice = dameIndice(nombre) + 1;
    if(indice < pages.length){
        return pages[indice].url;
    }else{
        return "";
    }
}

function dameIndice(nombre){
    nombre = nombre.substring(nombre.lastIndexOf('/') + 1);
    if(nombre==""){//Index
        nombre = "index.html";
    }
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].url == nombre){
            return i;
        }
    }
    return -1;
}

function dameNombre(id){
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].url == id){
            return pages[i].url;
        }
    }
    return "No encontrado";
}

function guardaTiempo() {
    if (localStorage.intento_actual) {
        var code = localStorage.getItem("intento_actual");
        var t = new Date();
        var m = t.getMinutes();
        var h = t.getHours();
        if (m < 10) {
            m = '0' + m;
        }
        if (h < 10) {
            h = '0' + h;
        }
        code += '' + h + '' + m;
        localStorage.setItem("intento_actual", code);
    }
}

function verificarEstaPagina(){
    if (localStorage.getItem("lesson_location") != null) {
        var indice = dameIndice(window.location.pathname);
        var lesson_location = localStorage.getItem("lesson_location");
        var estadoPagina = lesson_location.substring(indice * 2, (indice*2) + 2);
        var principio = lesson_location.substring(0, (indice*2));
        var final = lesson_location.substring((indice*2) + 2);
        estadoPagina = parseInt(estadoPagina);
        console.log("Esta página ha sido visitada: " + estadoPagina + " veces");
        if(estadoPagina == 0){
            alert("Página visitada por primera vez");
        }
        estadoPagina++;
        if (estadoPagina>99) {
            estadoPagina=99;
            
        }
        if (estadoPagina<10) {
            estadoPagina = "0" + estadoPagina.toString();
        }
        estadoPagina = estadoPagina.toString();
        console.log("Ahora el contador de esta página indica " + estadoPagina + " visitas");
        var lesson_location = localStorage.setItem("lesson_location", principio + estadoPagina + final);
    }else{
        alert("Aún no se ha creado lesson_location");
    }
    
}

function verificarAvance(){
    if(localStorage.getItem("status") != null){
        var status = localStorage.getItem("lesson_location");
        var completados = 0;
        //console.log(status);
        var temp;
        for (var i = 0; i < pages.length; i++) {
            temp = status.substring(i * 2, (i*2) + 2);
            //console.log(temp + " mayor que 0");
            temp = parseInt(temp);
            if(temp>0){
               completados++;
               //console.log("Lá página en el índice " + i + " fue completada");
            }else{
                //console.log("Incompleta Lá página en el índice " + i);
            }
        }
        console.log(completados + " completados, de " + pages.length);
        if(completados == pages.length){
            localStorage.setItem("status", "passed");
        }else{
            localStorage.setItem("status", "incomplete");
        }
    }else{
        console.log("No existía la variable status");
        localStorage.setItem("status", "incomplete");
    }
    
}

function verificarLessonLocation(){ // Crea la variable
	if(localStorage.getItem("lesson_location") == null){
        var paginas = "";
        for (let i = 0; i < pages.length; i++) {
            paginas += "00";
        }
        console.log("Lesson_location creado");
		localStorage.setItem("lesson_location", paginas);
	}
}

function verificar_info_usuario(){
    if(localStorage.getItem("info_usuario") == null){ //Se crea info_usuario pues no existe, o está vacío
        console.log("Creando info_usuario");
        informacion = "";
        var nAgt = navigator.userAgent;
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                console.log("Sistema operativo: " + cs.r + " -> " + cs.s);
                break;
            }
        }
        informacion += os;
        if (navigator.userAgent.search("MSIE") >= 0) {
            //pag_actual.navegador = "IE";
            informacion += "0";
            console.log("Navegador: MSIE, -> " + 0);
        } else if (navigator.userAgent.search("Chrome") >= 0) {
            //pag_actual.navegador = "Chrome";
            informacion += "1";
            console.log("Navegador: , Chrome -> " + 1);
        } else if (navigator.userAgent.search("Firefox") >= 0) {
            //pag_actual.navegador = "Firefox";
            informacion += "2";
            console.log("Navegador: Mozilla Firefox, -> " + 2);
        } else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            //pag_actual.navegador = "Safari";
            informacion += "3";
            console.log("Navegador: Safari, -> " + 3);
        } else if (navigator.userAgent.search("Opera") >= 0) {
            //pag_actual.navegador = "Opera";
            informacion += "4";
            console.log("Navegador: Opera, -> " + 4);
        } else {
            informacion += "5";
            console.log("Navegador: Desconocido, -> " + 5);
            //pag_actual.navegador = "Desconocido";
        }

        if ("geolocation" in navigator) {
            function success(position) {
                console.log("Se brindó acceso a la localización");
                p1 = String(position.coords.latitude);
                p1 = p1.substring(0, 6);
                p2 = String(position.coords.longitude);
                p2 = p2.substring(0, 6);
                informacion += p1;
                informacion += p2;
                console.log("Coordenadas: " + p1 + " | " + p2);
                informacion += obtener_resolucion();
                console.log('');
                console.log("Información generada: "+informacion);
                console.log("Se almacena en local storage: "+informacion);
                localStorage.setItem("info_usuario", informacion);
            };

            function error() {
                console.log("No se permitió el acceso a la localización");
                informacion += "-";
                informacion += obtener_resolucion();
                console.log('');
                console.log("Información generada: "+informacion);
                console.log("Se almacena en local storage: "+informacion);
                localStorage.setItem("info_usuario", informacion);
            };
            navigator.geolocation.getCurrentPosition(success, error);
            
        } else { //No soporta geolocalización
            informacion += "-";
            informacion += obtener_resolucion();
            console.log('');
            console.log("Información generada: "+informacion);
            console.log("Se almacena en local storage: "+informacion);
            localStorage.setItem("info_usuario", informacion);
        }

    }
}

function formatearHora(hora){
    return hora.substring(0,2) + ":" + hora.substring(2,4) + ":00";
}

function obtener_resolucion(){
    let resolucion = screen.width + "x" + screen.height;
    if(screen.width < screen.height){
        resolucion = screen.height + "x" + screen.width;
    }
    for (let index = 0; index < resoluciones.length; index++) {
        if(resolucion == resoluciones[index].resolucion){
            console.log("Resolución: " + resolucion + " -> " + resoluciones[index].id);
            return resoluciones[index].id;
        }
    }
    console.log("No hubo match en la resolución: "+ resolucion);
    return "00";
}

function terminar_intento(nombre_intento){
    if(localStorage.getItem("intento_actual") != null){
        let nuevo = obtener_nombre_nuevo_intento();
        localStorage.setItem(nuevo, localStorage.getItem("intento_actual"));
        console.log("Nuevo intento registrado " + nuevo);
        localStorage.removeItem("intento_actual");
    }
    sumarIntentos();
}

function obtener_nombre_nuevo_intento(){
    var nuevoNombre = "intento1";
    while(localStorage.getItem(nuevoNombre) != null){
        console.log(nuevoNombre + " utilizado");
        nuevoNombre = nuevoNombre.substring(0, 7) + (parseInt( nuevoNombre.substring(7)) + 1);
    }
    return nuevoNombre;
}

function obtener_informacion_pagina(){
    id_pag = dameID(window.location.pathname);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = String(today.getFullYear());
    yyyy = yyyy.substring(2)
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var minutes = today.getMinutes();
    var hour = today.getHours();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    console.log("Página: " + window.location.pathname + " -> " + id_pag);
    console.log("Hora: " + hour + ":" + minutes);
    console.log("Fecha: " + dd + "/" + mm + "/" + yyyy );
    return '' + id_pag + dd + '' + mm + '' + yyyy + '' + hour + '' + minutes;
}

function verificarVariables(){
	if(localStorage.getItem("session_time") == null){
		localStorage.setItem("session_time", "00:00:00");
	}
	if(localStorage.getItem("total_time") == null){
		localStorage.setItem("total_time", "000000");
	}
	if(localStorage.getItem("status") == null){
		localStorage.setItem("status", "0");
    }
    verificarLessonLocation(); // Crea la variable en caso de no existir
}

function sumaHoras(hora1, hora2){
    //Se convierten las horas a minutos
    var hora1 = (parseInt(hora1.substring(0, 2)) * 60) + parseInt(hora1.substring(2, 4));
    var hora2 = (parseInt(hora2.substring(0, 2)) * 60) + parseInt(hora2.substring(2, 4));
    return convierteAHoras(hora1 + hora2);
}

function sumarIntentos(){//Suma el tiempo de todos los intentos, después guarda el resultado en total_time
    var nombre = "intento1";
    console.log("Comienza el registro del tiempo total");
    while(localStorage.getItem(nombre) != null){ // Se recorren todos los intentos: intento1, intento2 ...
        console.log(nombre + " utilizado");
        console.log("Se está abriendo el elemento " + nombre);
        code = localStorage.getItem(nombre);
        entrada = code.substring(8,12);
        console.log("La hora de entrada fue: " + entrada);
        var salida = code.substring(code.length - 4);
        console.log("La hora de salida fue: " + salida);
        var resultado = convierteAHoras(calcularDiferencia(entrada, salida));
        var anterior = localStorage.getItem("total_time");
        var sumatoria = sumaHoras(anterior, resultado);
        console.log("Sumatoria: " + sumatoria);
        localStorage.setItem("total_time", sumatoria);
        console.log("Total_time = " + resultado);

        nombre = nombre.substring(0, 7) + (parseInt( nombre.substring(7)) + 1);
    }
    console.log("Fin de la suma de intentos");
}



/******************************************************************************************
******************************************************************************************/
function findAPI(win) {
    if (_Debug){
       alert("win is: "+win.location.href);
    }
 
 
    if (win.API != null){
       if (_Debug){
          alert("found api in this window");
       }
       return win.API;
    }
 
    if (win.length > 0) {
       if (_Debug){
          alert("looking for api in windows frames");
       }
 
       for (var i=0;i<win.length;i++){
 
          if (_Debug){
             alert("looking for api in frames["+i+"]");
          }
          var theAPI = findAPI(win.frames[i]);
          if (theAPI != null){
             return theAPI;
          }
       }
    }
 
    if (_Debug){
       alert("didn't find api in this window (or its children)");
    }
    return null;
 
 }
 
 
 /******************************************************************************************
 ******************************************************************************************/
 
 function getAPI(){
    var theAPI = findAPI(this.top);
    if (theAPI == null){
       if (_Debug){
          alert("checking to see if this window has an opener");
          alert("window.opener typeof is> "+typeof(window.opener));
       }
 
       if (typeof(this.opener) != "undefined"){
          if (_Debug){
             alert("checking this windows opener");
          }
          if (this.opener != null){
             if (_Debug){
                alert("this windows opener is NOT null - looking there");
             }
             theAPI = findAPI(this.opener.top);
          }
          else{
             if (_Debug){
                alert("this windows opener is null");
             }
          }
       }
    }
 
    return theAPI;
 }
 
 /******************************************************************************************
 ******************************************************************************************/
 function getAPIHandle() {
    if (apiHandle == null){
       apiHandle = getAPI();
    }
 
    return apiHandle;
 }
 
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
 function init(){
       var api = getAPIHandle();
        if (api == null){
            alert("ERROR en init()");
            return false;
        }
        var initResult = api.LMSInitialize("");
 }
 
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
 function end(){
    guardaTiempo();
    agregaTiempoSesion();
    if(!finalizado){
        finalizar();
    }
    // var endResult = api.LMSFinish("");
 }
 
function finalizar(){
	var api = getAPIHandle();
    if (api == null){
        alert("ERROR en función end()");
        return false;
    }
    set("cmi.core.lesson_status", localStorage.getItem("status"));
    set("cmi.suspend_data", Base64.encode(localStorage.getItem("intento_actual")));
    set("cmi.core.session_time", localStorage.getItem("session_time"));
    //set("cmi.core.session_time", "02:21:00");
    set("cmi.core.lesson_location", Base64.encode(localStorage.getItem("lesson_location")));
    save();
}
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
 function save(){ //Crear commit
       var api = getAPIHandle();
        if (api == null){
               alert("ERROR");
               return false;
            }
        var commitResult = api.LMSCommit("");
 }
 
 
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
 function set(data,value){
       var api = getAPIHandle();
        if (api == null){
               alert("ERROR");
               return false;
            }
        var setResult= api.LMSSetValue(data, value);
      
 }
 
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
 function get(data){
       var api = getAPIHandle();
        if (api == null){
               alert("ERROR");
               return false;
            }
         var getResult= api.LMSGetValue(data); 
     return getResult;
 }