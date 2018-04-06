
function dameURL(id){
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].id == id){
            return pages[i].url;
        }
    }
    return "index.html";
}

function dameIndice(id){
    for (let k = 0; k < pages.length; k++) {
        if(pages[k].id == id){
            return k;
        }
    }
    return -1;
}

var lesson_location = lzw_decode(localStorage.getItem("lesson_location"));
var lesson_status = lzw_decode( localStorage.getItem("status") );
var background = [];
var borders = [];
var etiquetas = [];
var successColor = "rgba(036, 231, 017, 0.2)";
var successColorRGB = "rgba(036, 231, 017, 0.6)";
var redColor = "";


//$("#contenido").append("Temas: ");
for (let index = 0; index < lessons.length; index++) {
    //$("#contenido").append("<button class='btnCambiarAvance' data-leccion='" + index + "' >" + (index + 1) + "</button>&nbsp;");
    //background.push('rgba(0, 255, 0, 0.2)'); #5cb85c #ADFF2F
    background.push(successColorRGB);
    borders.push('rgba(54, 162, 235, 1)');
    etiquetas.push("Tema " + (index + 1));
}
/*
$("#contenido").append(`<button data-leccion='-' class='btnCambiarAvance'>Total del curso</button><br>`);*/
mostrarTotalCurso();
//mostrarTema(0);




$(".btnCambiarAvance").click(function(){
    let leccion = $(this).data("leccion");
    if($(this).data("leccion") == "-"){
        mostrarTotalCurso();
    }else{
        leccion = parseInt(leccion);
        mostrarTema(leccion);
    }
});

function porcentajeTemas(){
    var resultados = [];
    var temp, porcentaje;
    for(var i =0; i<lessons.length; i++){
        var completados = 0;
        var leccion = lessons[i];
        for (var j = 0; j < leccion.length; j++) {
            var indice = dameIndice(leccion[j]);
            // alert(indice);
            // alert("Variable lesso_location (función porcentaje temas): " + lesson_location);
            temp = lesson_location.substring(indice * 3, (indice*3) + 2);
            temp = parseInt(temp);
            if(temp>0){
                //alert("El elemento " + j + " fue completado");
                completados++;
            }else{
                //alert("Elemento " + j + temp);
            }
        }
        porcentaje = completados / leccion.length * 100;
        porcentaje = parseInt(porcentaje);
        if (porcentaje == 0) {
            porcentaje = 1;
        }
        resultados.push(porcentaje);
    }
    resultados.push(100);
    return resultados;
}

function recorrerTodosLosResultados(leccion){
    if(lesson_location != null){
        var completados = 0;
        var temp;
        for (var i = 0; i < pages.length; i++) {
            temp = lesson_location.substring(i * 3, (i*3) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                //$("#avancePaginas").append("<a class='btn btn-primary' href='"+dameURL(pages[i].id)+"'>" + (i + 1) + "</a>" );
            }
        }
        return completados;
    }else{
        for (var i = 0; i < pages.length; i++) {
            $("#avancePaginas").append(
                "<a class='btn'  style='background: #AAB7B8;' href='"+
                dameURL(pages[i].id)+"'>" + pages[i].url + "</a>"
            );
        }
        return 0;
    }
}



function recorrerResultados(numero_leccion){
    if(lesson_location != null){
        var completados = 0;
        var temp;
        let posicion;
        let leccion = lessons[numero_leccion];
        $("#avancePaginas").append("<br><br><br><br>");
        for (let index = 0; index < leccion.length; index++) {
            posicion = indiceDe(leccion[index]);
            temp = lesson_location.substring(posicion * 3, (posicion*3) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                $("#avancePaginas").append("<a style='background:" + successColorRGB + ";' class='btn btn-primary' href='"+dameURL(leccion[index])+"'>" + (index + 1) + "</a>" );
            }else{
                $("#avancePaginas").append("<a href='"+dameURL(leccion[index])+"'><button class='btn'>" + (index + 1) + "</button></a>" );
            }
        }
        return completados;
    }else{
        for (let index = 0; index < lessons[numero_leccion].length; index++) {
            posicion = indiceDe(lessons[j]);
            //$("#avancePaginas").append("<a href='"+dameURL(lessons[j])+"'><button class='btn'>" + (index + 1) + "</button></a>" )
        }
        return 0;
    }
}

function mostrarTotalCurso(){
    $("#contenido").html("Tiempo de la sesión " + lzw_decode(localStorage.getItem("session_time")).substring(3, 5) + " minutos" );
    $("#avance").html("");
    //$("#avance").append("Información del curso :<br>");
    //$("#avance").append("Estado del curso: " + lesson_status);
    $("#avance").append(`<div class='row' style='padding: 50px;'>
        <div class='col-md-12'>
        <canvas id='myChart'></canvas>
        </div>
    </div><center>`);

    resultados = porcentajeTemas();

    $("#avancePaginas").append("Detalle del curso<br><div style='background: #e9e9e9;'");
    var terminadas = recorrerTodosLosResultados();
    let porcentaje = parseInt(terminadas/pages.length * 100);

    var canvasP = document.getElementById("myChart");
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Progreso del curso (' + porcentaje + '%)',
                data: resultados,
                backgroundColor: background,
                borderColor: borders,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    canvasP.onclick = function(e) {
        var slice = myChart.getElementAtEvent(e);
        //alert(slice);
        if (!slice.length) return; // return if not clicked on slice
        var label = slice[0]._model.label;
        var leccion = parseInt(label.substring(label.length - 1)) - 1;
        mostrarTema(leccion);
    }
}

function mostrarTema(id){
    $("#avance").html("<br>");
    $("#contenido").html("Tema " + (id + 1) + "<button id='btnVerCurso' style='float: right;' class='btn'>Regresar</button>" );
    // $("#avance").append("Información del tema" + (id+1) + ":<br>");
    // $("#avance").append(`<div class='row' style='padding: 50px; height: 200px;'>
    //     <div class='col-md-8'>
    //         <canvas id='porcentajeLeccion'></canvas>
    //     </div>
    //     <div class='col-md-4' style="bottom:10%;">
    //         <div id='avancePaginas'></div>
    //     </div>
    // </div>`); style="max-height: 200px; max-width: 300px; padding 30px;"
    $("#avance").append(`<center><div class="row">
                            <div class='col-md-7'>
                                <canvas id='porcentajeLeccion'></canvas>
                            </div>
                            <div id="avancePaginas" class='col-md-5' >
                            </div>
                        </div></center>`);
    var terminadas = recorrerResultados(id);
    var ct = document.getElementById("porcentajeLeccion").getContext('2d');
    var myPieChart = new Chart(ct,{
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    terminadas,
                    lessons[id].length - terminadas
                ],
                backgroundColor: [
                    successColor,
                    "rgb(221, 221, 221)"
                ]
            }],
            labels: [
                'Completado',
                'No completado'
            ]
        }
    });
    $("#btnVerCurso").click(function(){
        mostrarTotalCurso();
    });
}