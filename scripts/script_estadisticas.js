$(document).ready(function() {
    var tabla_suspend_data = $('#paginas').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
        },
        dom: 'Bfrtip',
        bFilter: false,
        responsive: true,
        buttons: [
            'csv', 'excelHtml5', 'pdf', 'print'
        ],
    });

    var tabla_variables_scorm = $('#variables_scorm').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
        },
        dom: 'Bfrtip',
        bFilter: false,
        responsive: true,
        buttons: [
            'csv', 'excelHtml5', 'pdf', 'print'
        ],
    });

    var informacion = '';

    if(typeof(Storage) != "undefined"){
        if(localStorage.getItem("suspend_data") != null){
            var suspend_data_encriptado = localStorage.getItem("suspend_data");
            var suspend_data = lzw_decode(suspend_data_encriptado);
            elementos = suspend_data.split(';'); // Primer elemento es la información de la máquina, segundo es información de las páginas
            // console.log(elementos);
            var info_usuario = elementos[0];
            var info_paginas = elementos[1];
            // alert(info_paginas);
            var paginas_visitadas = [];
            var caracteres_por_pagina = 16;
            for (var i = 0, charsLength = info_paginas.length; i < charsLength; i += caracteres_por_pagina) {
                paginas_visitadas.push(info_paginas.substring(i, i + caracteres_por_pagina));
            }
            var i = 1;
            paginas_visitadas.forEach(function(pagina){
                var id_pagina = pagina.substring(0, 2);
                var nombre_pagina = "<div class='cl-effect-1'><a href='" + obtenerUrl(id_pagina) + "' style='color: #8e8e93;' >" +obtenerNombre(id_pagina) + "</a></div>";
                var fecha = pagina.substring(2, 8);
                fecha = fecha.substring(0,2) + '/' + fecha.substring(2,4) + '/' + fecha.substring(4,6);
                var hora_inicio = pagina.substring(8, 12);
                var hora_fin = pagina.substring(12);
                var diferencia = calcularDiferencia(hora_inicio, hora_fin) + " minutos";
                hora_inicio = formatearHora(hora_inicio);
                hora_fin = formatearHora(hora_fin);
                tabla_suspend_data.row.add([
                    i, nombre_pagina, fecha, hora_inicio, hora_fin, pagina, diferencia
                ]);
                i++;
            });

            var status, session_time, lesson_location, ultima_visitada;
            if(localStorage.getItem("status") != null){
                status = lzw_decode(localStorage.getItem('status'));
            }
            if(localStorage.getItem("session_time") != null){
                session_time = lzw_decode(localStorage.getItem('session_time'));
            }
            if(localStorage.getItem("lesson_location") != null){
                lesson_location = lzw_decode(localStorage.getItem('lesson_location'));
            }
            if(localStorage.getItem("ultimaVisitada") != null){
                ultima_visitada = localStorage.getItem('ultimaVisitada');
            }

            if(info_usuario.length != 6){ // Localización activada
                var resolucion = info_usuario.substring(info_usuario.length - 2, info_usuario.length);
                resolucion = obtenerResolucion(resolucion);
                var so = obtenerSO(info_usuario.substring(0, 2));
                var navegador = info_usuario.substring(2, 3);
                navegador = obtenerNavegador(navegador);
                // alert(navegador);
                var localizacion = obtenerLocalizacion(info_usuario);

                tabla_variables_scorm.row.add([
                    "session_time", session_time, status, ultima_visitada, suspend_data, suspend_data_encriptado
                ]);
                tabla_variables_scorm.row.add([
                    "status", status
                ]);
                tabla_variables_scorm.row.add([
                    'última página visitada', ultima_visitada
                ]);
                tabla_variables_scorm.row.add([
                    'suspend_data', suspend_data
                ]);
                tabla_variables_scorm.row.add([
                    'suspend_data encriptado', suspend_data_encriptado
                ]);
                tabla_variables_scorm.row.add([
                    "Resolución", resolucion
                ]);
                tabla_variables_scorm.row.add([
                    "Navegador", navegador
                ]);
                tabla_variables_scorm.row.add([
                    "Localización", localizacion
                ]);
                tabla_variables_scorm.row.add([
                    "Sistema operativo", so
                ]);
                // tabla_variables_scorm.row.add([
                //     "Localización"
                // ]);
                // tabla_variables_scorm.row.add([
                //     "Resolución"
                // ]);
            }


        }

    }else{
        alert("Este navegador no es compatible con el almacenamiento del curso ERR_LOCAL_STORAGE");
    }
} );

function formatearHora(hora){
    return hora.substring(0,2) + ":" + hora.substring(2,4) + ":00";
}

function obtenerNombre(id){
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].id == id){
            return pages[i].title;
        }
    }
    return "No encontrado";
}

function obtenerUrl(id){
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].id == id){
            return pages[i].url;
        }
    }
    return "No encontrado";
}


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

function obtenerSO(codigo){
    var so = '-';
    clientStrings.forEach(function(client){
        if(client.s == codigo){
            so = client.r;
        }
    });
    return so;
}

function obtenerNavegador(codigo){
    var nav = '-';
    navegadores.forEach( function( navegador ){
        if(navegador.id == codigo){
            nav = navegador.nombre;
        }
    });
    return nav;
}

function obtenerLocalizacion(info_usuario){
    if(info_usuario.charAt(3) != '-' ){
        return info_usuario.substring(3, 14);
    }else{
        return "No se permitió acceso a la localización";
    }
}

function obtenerResolucion( codigo ){
    // alert(codigo);
    var resolucion = "";
    resoluciones.forEach( function(elemento){
        // console.log(elemento.id);
        if(elemento.id == codigo){
            resolucion =  elemento.resolucion;
        }else{
            // console.log("No coincide " + elemento.id + " con " + codigo);
        }
    });
    return resolucion;
}
