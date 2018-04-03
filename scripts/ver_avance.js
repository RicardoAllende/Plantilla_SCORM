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

var lessons ={
    lecciones : [
    ["01", "02", "03"],
    ["04", "05", "06"],
    ["07", "08", "09"]
    ]
};
lessons = lessons.lecciones;
console.log(lessons);
var status = lzw_decode(localStorage.getItem("lesson_location"));

$("#contenido").append("Tiempo de la sesión " + lzw_decode(localStorage.getItem("session_time")) + " minutos<br>" );
    $("#contenido").append(`Lecciones: <button data-leccion='0' class='btnCambiarAvance'>1</button>&nbsp;
    <button data-leccion='1' class='btnCambiarAvance'>2</button>&nbsp;
    <button data-leccion='2' class='btnCambiarAvance'>3</button>&nbsp;
    <button data-leccion='-' class='btnCambiarAvance'>Total del curso</button>`);
mostrarTotalCurso();




$(".btnCambiarAvance").click(function(){
    alert("Clic en el botón de la clase btnCambiarAvance " + $(this).data("leccion"));
    $("#avance").html($(this).data("leccion"));
    if($(this).data("leccion") == "-"){
        mostrarTotalCurso();
    }
});

function porcentajeLecciones(){
    var resultados = [];
    var temp, porcentaje;
    for(var i =0; i<lessons.length; i++){
        var completados = 0;
        var leccion = lessons[i];
        for (var j = 0; j < leccion.length; j++) {
            var indice = dameIndice(leccion[j]);
            temp = status.substring(indice * 2, (indice*2) + 2);
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
//         temp = status.substring(indice * 2, (indice*2) + 2);
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
//             temp = status.substring(indice * 2, (indice*2) + 2);
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
    if(localStorage.getItem("lesson_location") != null){
        var completados = 0;
        var temp;
        for (var i = 0; i < pages.length; i++) {
            temp = status.substring(i * 2, (i*2) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                $("#avance").append("<a class='btn btn-primary' href='"+dameURL(pages[i].id)+"'>" + (i + 1) + "</a>" );
            }else{
                $("#avance").append("<a href='"+dameURL(pages[i].id)+"'><button class='btn'>" + (i + 1) + "</button></a>" );
            }
        }
        return completados;
    }else{
        for (var i = 0; i < pages.length; i++) {
            $("#avance").append(
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
    if(localStorage.getItem("lesson_location") != null){
        var completados = 0;
        var temp;
        for (let index = 0; index < lessons.length; index++) {
            let posicion = indiceDe(lessons[j])
            temp = status.substring(posicion * 2, (posicion*2) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                $("#avance").append("<a class='btn btn-primary' href='"+dameURL(lessons[j])+"'>" + (index + 1) + "</a>" );
            }else{
                $("#avance").append("<a href='"+dameURL(lessons[j])+"'><button class='btn'>" + (index + 1) + "</button></a>" );
            }
        }
        // for (var i = 0; i < pages.length; i++) {
        //     temp = status.substring(i * 2, (i*2) + 2);
        //     temp = parseInt(temp);
        //     if(temp>0){
        //         completados++;
        //         $("#avance").append("<a class='btn btn-primary' href='"+dameURL(pages[i].id)+"'>" + (i + 1) + "</a>" );
        //     }else{
        //         $("#avance").append("<a href='"+dameURL(pages[i].id)+"'><button class='btn'>" + (i + 1) + "</button></a>" );
        //     }
        // }
        return completados;
    }else{
        for (var i = 0; i < pages.length; i++) {
            $("#avance").append(
                "<a class='btn'  style='background: #AAB7B8;' href='"+
                dameURL(pages[i].id)+"'>" + pages[i].url + "</a>"
            );
        }
        return 0;
    }
}

function mostrarTotalCurso(){
    $("#avance").append(`<div class='row' style='padding: 50px; height: 250px;'>
        <div class='col-md-6'>
        <canvas id='myChart'></canvas>
        </div>
        <div class='col-md-6'>
        <canvas id='cursoCompleto'></canvas>
        </div>
    </div>`);

    resultados = porcentajeLecciones();

    $("#avance").append("Detalle total de las páginas<br><div style='background: #e9e9e9;'");
    var terminadas = recorrerTodosLosResultados();
    //$("#avance").append("</div><hr>");

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Lección 1", "Lección 2", "Lección 3"],
            datasets: [{
                label: 'Progreso del curso (%)',
                data: resultados,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
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