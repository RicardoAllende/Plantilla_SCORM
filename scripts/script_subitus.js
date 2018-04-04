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
        // PARTE DE LOS INTENTOS, QUITÁNDOLA SÓLO EXISTE INTENTO ACTUAL
        var code = lzw_decode(localStorage.getItem("intento_actual"));
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
        localStorage.setItem("intento_actual", lzw_encode(code));
        code = "";
    }else{ //En este caso crean las variables de intento_actual
    	console.log("No hay intento actual, se crea la variable intento_actual");
        code = "";
        code += obtener_informacion_pagina();
        localStorage.setItem("intento_actual", lzw_encode(code));
        code = "";
    }
}
verificarMarcador();
//marcarPagina();
function dameIndice(nombre){
    nombre = nombre.substring(nombre.lastIndexOf('/') + 1);
    if(nombre==""){//Index
        nombre = "index.html";
    }
    for (let i = 0; i < pages.length; i++) {
        if(pages[i].url == nombre){
            return i;
        }
    }
    return -1;
}
function verificarMarcador(){
	if (localStorage.getItem("lesson_location") != null) {
        let indice = dameIndice(window.location.pathname);
        //console.log("En función verificarmarcador" + dameIndice(window.location.pathname));
        let lesson_location = lzw_decode(localStorage.getItem("lesson_location"));
        let marcador = lesson_location.substring((indice * 3)+2, (indice*3) + 3);
        //alert("El marcador de esta página es: " + marcador + ", lesson_location es: " + lesson_location);
        if(marcador == "1"){
            $(".btnBookmark").addClass("paginaMarcada");
            $(".btnBookmark").html(`<i class="glyphicon glyphicon-check">`);
        }
    }
}
function marcarPagina(){
    $(".btnBookmark").addClass("paginaMarcada");
    $(".btnBookmark").html(`<i class="glyphicon glyphicon-check">`);
    if (localStorage.getItem("lesson_location") != null) {
        
        let ind;
        let nombre = window.location.pathname
        nombre = nombre.substring(nombre.lastIndexOf('/') + 1);
        if(nombre==""){//Index
            nombre = "index.html";
        }
        for (let i = 0; i < pages.length; i++) {
            if(pages[i].url == nombre){
                ind =  i;
            }
        }
        $('#enlace'+ind).prepend('<i class="glyphicon glyphicon-bookmark"></i>');
        console.log("El índice es " + ind);
        var lesson_location = lzw_decode(localStorage.getItem("lesson_location"));
        var marcadorPagina = lesson_location.substring((ind * 3)+2, (ind*3) + 3);
        console.log("Recuperado de localStorage " + lesson_location);
        //alert(marcadorPagina);
        //console.log("El marcador de esta página era: " + marcadorPagina + ", lesson_location es: " + lesson_location);
        var principio = lesson_location.substring(0, (ind*3) + 2);
        //console.log("Principio " + principio);
        var final = lesson_location.substring((ind*3)+3);
        //console.log("Final " + final);
        marcadorPagina = "1";
        //console.log("El marcador de esta página ahora es: " + marcadorPagina);
        lesson_location = principio + marcadorPagina + final;
        console.log("Después de guardar el marcador lesson_location = " + lesson_location );
        localStorage.setItem("lesson_location", lzw_encode(lesson_location));
    }
    alert("Página guardada en sus marcadores");
}
function desmarcarPagina(){
    $(".btnBookmark").removeClass("paginaMarcada");
    $(".btnBookmark").html(`<i class="glyphicon glyphicon-bookmark">`);
    if (localStorage.getItem("lesson_location") != null) {
        let ind;
        let nombre = window.location.pathname
        nombre = nombre.substring(nombre.lastIndexOf('/') + 1);
        if(nombre==""){//Index
            nombre = "index.html";
        }
        for (let i = 0; i < pages.length; i++) {
            if(pages[i].url == nombre){
                ind =  i;
            }
        }
        $('#enlace'+ind).html('<span class="title">' + pages[ind].title + ' </span>');
        
        console.log("El índice es " + ind);
        var lesson_location = lzw_decode(localStorage.getItem("lesson_location"));
        var marcadorPagina = lesson_location.substring((ind * 3)+2, (ind*3) + 3);
        console.log("Recuperado de localStorage" + lesson_location);
        console.log("El marcador de esta página era: " + marcadorPagina + ", lesson_location es: " + lesson_location);
        var principio = lesson_location.substring(0, (ind*3) + 2);
        console.log("Principio " + principio);
        var final = lesson_location.substring((ind*3)+3);
        console.log("Final " + final);
        marcadorPagina = "0";
        console.log("El marcador de esta página ahora es: " + marcadorPagina);
        lesson_location = principio + marcadorPagina + final;
        console.log("Lesson_location = " + lesson_location );
        localStorage.setItem("lesson_location", lzw_encode(lesson_location));
    }
    alert("Página desmarcada");
}
$(".btnBookmark").click(function(){
    if($(this).hasClass("paginaMarcada")){
        desmarcarPagina();
    }else{
        marcarPagina();
    }
});

function darEnlaceABotones(){
    /**
    * Se insertan los enlaces siguiente y anterior;
    * si no existen, desaparece el enlace
    */
    var actual = window.location.pathname;
    if (!existeAnterior(actual)) {
        $("#btnPrev").hide();
    }else{
        $("#btnPrev").attr("href", dameAnterior(actual));
        $("#btnPrev").show();
    }

    $("#btnFin").click(function(){
        finalizar();
        localStorage.setItem("finalizado", "1");
        alert("Finalizando");
        var api = getAPIHandle();
        if (api == null){
            alert("ERROR en función end()");
            return false;
        }
        
        var endResult = api.LMSFinish("");
        finalizado = true;
    });

    if (!existeSiguiente(actual)) {
        $("#btnNext").hide();
    }else{
        $("#btnNext").attr("href", dameSiguiente(actual));
        $("#btnNext").html("Siguiente");
    }
}

function agregaTiempoSesion(){
    var code = lzw_decode(localStorage.getItem("intento_actual"));
    var entrada = code.substring(8,12);
	var salida = code.substring(code.length - 4);
    var resultado = convierteAHoras(calcularDiferencia(entrada, salida));
    localStorage.setItem("session_time", lzw_encode(formatearHora(resultado)));
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
        var code = lzw_decode(localStorage.getItem("intento_actual"));
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
        localStorage.setItem("intento_actual", lzw_encode(code));
    }
}

function verificarEstaPagina(){
    if (localStorage.getItem("lesson_location") != null) {
        var indice = dameIndice(window.location.pathname);
        var lesson_location = lzw_decode(localStorage.getItem("lesson_location"));
        var estadoPagina = lesson_location.substring(indice * 3, (indice*3) + 2);
        var principio = lesson_location.substring(0, (indice*3));
        var final = lesson_location.substring((indice*3) + 2);
        estadoPagina = parseInt(estadoPagina);
        console.log("Esta página ha sido visitada: " + estadoPagina + " veces");
        if(estadoPagina == 0){
            alert("Avance de esta página guardado");
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
        var lesson_location = localStorage.setItem("lesson_location", lzw_encode(principio + estadoPagina + final));
    }else{
        alert("Hubo un error y aún no se ha creado lesson_location");
    }
    
}

function verificarAvance(){
    if(localStorage.getItem("status") != null){
        var status = lzw_decode(localStorage.getItem("lesson_location"));
        var completados = 0;
        //console.log(status);
        var temp, marcador;
        for (var i = 0; i < pages.length; i++) {
            temp = status.substring(i * 3, (i*3) + 2);
            marcador = status.substring((i * 3)+2, (i*3) + 3);
            temp = parseInt(temp);
            if(temp>0){
               completados++;
               //console.log("Lá página en el índice " + i + " fue completada");
            }else{
                //console.log("Incompleta Lá página en el índice " + i);
            }
            if (marcador == "1") {
                $('#enlace'+i).prepend('<i class="glyphicon glyphicon-bookmark"></i>');
            }
        }
        console.log(completados + " completados, de " + pages.length);
        let nuevo = parseInt(completados / pages.length * 100);
        console.log("Se está estableciendo el valor de la barra de progreso en: " + nuevo);
        $('#progress-bar').attr("aria-valuenow",nuevo); 
        $('#progress-bar').attr("style","width:" + nuevo + "%"); 
        $('#progress-bar').html("avance: " + nuevo + "%");

        if(completados == pages.length){
            localStorage.setItem("status", lzw_encode("passed"));
        }else{
            localStorage.setItem("status", lzw_encode("incomplete"));
        }
    }else{
        console.log("No existía la variable status");
        localStorage.setItem("status", lzw_encode("incomplete"));
    }
}

function verificarLessonLocation(){ // Crea la variable
	if(localStorage.getItem("lesson_location") == null){
        var paginas = "";
        for (let i = 0; i < pages.length; i++) {
            paginas += "000";
        }
        console.log("Lesson_location creado "+paginas);
		localStorage.setItem("lesson_location", lzw_encode(paginas));
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
                localStorage.setItem("info_usuario", lzw_encode(informacion));
            };

            function error() {
                console.log("No se permitió el acceso a la localización");
                informacion += "-";
                informacion += obtener_resolucion();
                console.log('');
                console.log("Información generada: "+informacion);
                console.log("Se almacena en local storage: "+informacion);
                localStorage.setItem("info_usuario", lzw_encode(informacion));
            };
            navigator.geolocation.getCurrentPosition(success, error);
            
        } else { //No soporta geolocalización
            informacion += "-";
            informacion += obtener_resolucion();
            console.log('');
            console.log("Información generada: "+informacion);
            console.log("Se almacena en local storage: "+informacion);
            localStorage.setItem("info_usuario", lzw_encode(informacion));
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

function terminar_intento(){
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
		localStorage.setItem("total_time", lzw_encode("000000"));
	}
	if(localStorage.getItem("status") == null){
		localStorage.setItem("status", lzw_encode("0"));
    }
    verificarLessonLocation(); // Crea la variable en caso de no existir
}

function sumaHoras(hora1, hora2){
    //Se convierten las horas a minutos
    var hora1 = (parseInt(hora1.substring(0, 2)) * 60) + parseInt(hora1.substring(2, 4));
    var hora2 = (parseInt(hora2.substring(0, 2)) * 60) + parseInt(hora2.substring(2, 4));
    return convierteAHoras(hora1 + hora2);
}

function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
        phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

function sumarIntentos(){//Suma el tiempo de todos los intentos, después guarda el resultado en total_time
    var nombre = "intento1";
    console.log("Comienza el registro del tiempo total");
    while(localStorage.getItem(nombre) != null){ // Se recorren todos los intentos: intento1, intento2 ...
        console.log(nombre + " utilizado");
        console.log("Se está abriendo el elemento " + nombre);
        code = lzw_decode(localStorage.getItem(nombre));
        entrada = code.substring(8,12);
        console.log("La hora de entrada fue: " + entrada);
        var salida = code.substring(code.length - 4);
        console.log("La hora de salida fue: " + salida);
        var resultado = convierteAHoras(calcularDiferencia(entrada, salida));
        var anterior = lzw_decode(localStorage.getItem("total_time"));
        var sumatoria = sumaHoras(anterior, resultado);
        console.log("Sumatoria: " + sumatoria);
        localStorage.setItem("total_time", lzw_encode(sumatoria));
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
    verificarUltimaPaginaVisitada();
    //diferencia_lesson_location();   
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
    guardaUltimaPaginaVisitada();
    var api = getAPIHandle();
    if (api == null){
        alert("ERROR en función end()");
        return false;
    }
    set("cmi.core.lesson_status",lzw_decode( localStorage.getItem("status") ));
    set("cmi.suspend_data", localStorage.getItem("intento_actual"));
    set("cmi.core.session_time", lzw_decode(localStorage.getItem("session_time")));
    //set("cmi.core.session_time", "02:21:00");
    set("cmi.core.lesson_location", localStorage.getItem("lesson_location"));
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

 function diferencia_suspend_data(){
     //La diferencia la hará 
 }

function guardaUltimaPaginaVisitada(){
    let nombre=window.location.pathname;
    nombre = nombre.substring(nombre.lastIndexOf('/') + 1);
    if(nombre==""){//Index
        nombre = "index.html";
    }
    localStorage.setItem("ultimaVisitada", nombre);
}

function verificarUltimaPaginaVisitada(){
    let ultimaVisitada = localStorage.getItem("ultimaVisitada");
    if(ultimaVisitada != null){
        if (localStorage.getItem("finalizado") != null) {
            localStorage.removeItem("finalizado");
            if(confirm("¿Desea ir a la última página visitada?")){
                window.location.href = ultimaVisitada;
            }
        }
    }
}

function diferencia_lesson_location(){ // Comprueba todas las páginas y guarda el número mayor de visitas en cada uno
    if(localStorage.getItem("status") != null){
        var status = lzw_decode(localStorage.getItem("lesson_location"));
        var statusSCO = lzw_decode(get("cmi.core.lesson_location"));
        var completados = 0;
        //console.log(status);
        var temp, tempSCO, mayor, marcador, marcador2, resultado="", cambio=false;
        for (var i = 0; i < pages.length; i++) {
            temp = status.substring(i * 3, (i*3) + 2);
            marcador = status.substring((i * 3)+2, (i*3) + 3);
            temp = parseInt(temp);
            
            tempSCO = statusSCO.substring(i * 3, (i*3) + 2);
            marcador2 = statusSCO.substring((i * 3) + 2, (i*3) + 3);
            tempSCO = parseInt(tempSCO);
            if(temp >= tempSCO){
                cambio = true;
                mayor = temp;
            }else{
                mayor = tempSCO;
            }
            if (mayor>99) {
                mayor=99;
                
            }
            if (mayor<10) {
                mayor = "0" + mayor.toString();
            }
            mayor = mayor.toString();
            if((marcador == "1") || (marcador2 == "1") ){
                marcador = "1";
            }
            resultado += (mayor + marcador);
        }
        if (cambio) {
            console.log("Se encontró un mejor avance en lesson_location revisando localStorage y la variable en SCO, resultado= " + resultado);
        }
    }
}