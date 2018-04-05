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

$("#contenido").append("Tiempo de la sesión " + lzw_decode(localStorage.getItem("session_time")) + " minutos<br><br>" );
$("#contenido").append("Temas: ");
for (let index = 0; index < lessons.length; index++) {
    $("#contenido").append("<button class='btnCambiarAvance' data-leccion='" + index + "' >" + (index + 1) + "</button>&nbsp;");
    background.push('rgba(54, 162, 235, 0.2)');
    borders.push('rgba(54, 162, 235, 1)');
    etiquetas.push("Tema " + (index + 1));
}

$("#contenido").append(`<button data-leccion='-' class='btnCambiarAvance'>Total del curso</button><br>`);
mostrarTotalCurso();




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
            temp = lesson_location.substring(indice * 3, (indice*3) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
            }
        }
        porcentaje = completados / leccion.length * 100;
        porcentaje = parseInt(porcentaje);
        resultados.push(porcentaje);
    }
    resultados.push(100);
    return resultados;
}

// function porcentajeLeccion(numeroLeccion){
//     var resultados = [];
//     var temp, porcentaje;
//     numeroLeccion = parseInt(numeroLeccion);
//     var leccion = lessons[numeroLeccion];
//     var completados=0;
//     for (var j = 0; j < leccion.length; j++) {
//         var indice = dameIndice(leccion[j]);
//         temp = lesson_location.substring(indice * 3, (indice*3) + 2);
//         temp = parseInt(temp);
//         if(temp>0){
//             completados++;
//         }
//     }

//     for(var i =0; i<lessons.length; i++){
//         var completados = 0;
//         var leccion = lessons[i];
//         for (var j = 0; j < leccion.length; j++) {
//             var indice = dameIndice(leccion[j]);
//             temp = lesson_location.substring(indice * 3, (indice*3) + 2);
//             temp = parseInt(temp);
//             if(temp>0){
//                 completados++;
//             }
//         }
//         porcentaje = completados / leccion.length * 100;
//         porcentaje = parseInt(porcentaje);
//         resultados.push(porcentaje);
//     }
//     resultados.push(100);
//     return resultados;
// }

function recorrerTodosLosResultados(leccion){
    if(lesson_location != null){
        var completados = 0;
        var temp;
        for (var i = 0; i < pages.length; i++) {
            temp = lesson_location.substring(i * 3, (i*3) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                $("#avancePaginas").append("<a class='btn btn-primary' href='"+dameURL(pages[i].id)+"'>" + (i + 1) + "</a>" );
            }else{
                $("#avancePaginas").append("<a href='"+dameURL(pages[i].id)+"'><button class='btn'>" + (i + 1) + "</button></a>" );
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

function indiceDe(id){
    for (let index = 0; index < pages.length; index++) {
        if(pages[index].id == id){
            return index;
        }
    }
    return -1;
}

function recorrerResultados(numero_leccion){
    if(lesson_location != null){
        var completados = 0;
        var temp;
        let posicion;
        let leccion = lessons[numero_leccion];
        for (let index = 0; index < leccion.length; index++) {
            posicion = indiceDe(leccion[index]);
            temp = lesson_location.substring(posicion * 3, (posicion*3) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                $("#avancePaginas").append("<a class='btn btn-primary' href='"+dameURL(leccion[index])+"'>" + (index + 1) + "</a>" );
            }else{
                $("#avancePaginas").append("<a href='"+dameURL(leccion[index])+"'><button class='btn'>" + (index + 1) + "</button></a>" );
            }
        }
        return completados;
    }else{
        for (let index = 0; index < lessons[numero_leccion].length; index++) {
            posicion = indiceDe(lessons[j]);
            $("#avancePaginas").append("<a href='"+dameURL(lessons[j])+"'><button class='btn'>" + (index + 1) + "</button></a>" )
        }
        return 0;
    }
}

function mostrarTotalCurso(){
    $("#avance").html("<br>");
    $("#avance").append("Información del curso :<br>");
    $("#avance").append("Estado del curso: " + lesson_status);
    $("#avance").append(`<div class='row' style='padding: 50px;'>
        <div class='col-md-6'>
        <canvas id='myChart'></canvas>
        </div>
        <div class='col-md-6'>
        <canvas id='cursoCompleto'></canvas>
        </div>
    </div><center><div id="avancePaginas"></div><center>`);

    resultados = porcentajeTemas();

    $("#avancePaginas").append("Detalle total de las páginas<br><div style='background: #e9e9e9;'");
    var terminadas = recorrerTodosLosResultados();


    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Progreso del curso (%)',
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
    var ct = document.getElementById("cursoCompleto").getContext('2d');
    var myPieChart = new Chart(ct,{
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    terminadas,
                    pages.length - terminadas
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba( 247, 131, 106, 0.2)"
                ]
                
            }],
            labels: [
                'Completado',
                'No completado'
            ]
        }
    });
}

function mostrarTema(id){
    $("#avance").html("<br>");
    $("#avance").append("Información del tema" + (id+1) + ":<br>");
    // $("#avance").append(`<div class='row' style='padding: 50px; height: 200px;'>
    //     <div class='col-md-8'>
    //         <canvas id='porcentajeLeccion'></canvas>
    //     </div>
    //     <div class='col-md-4' style="bottom:10%;">
    //         <div id='avancePaginas'></div>
    //     </div>
    // </div>`);
    $("#avance").append(`
        <center><div style="width: 250px; height: 200px;">
            <canvas id='porcentajeLeccion'></canvas>
        </div><center>
        <center><div id="avancePaginas">Detalle de las páginas de la lección: <br></div></center>
        `);
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
                    "rgba(54, 162, 235, 0.2)",
                    "rgba( 247, 131, 106, 0.2)"
                ]
            }],
            labels: [
                'Completado',
                'No completado'
            ]
        }
    });
}