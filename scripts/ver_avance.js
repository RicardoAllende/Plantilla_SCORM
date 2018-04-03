$("#botonModal").click(function(e){
    e.preventDefault();
    if ($("#botonModal").hasClass("oculto")) {
        $("#contenido").show();
        $("#contenidoCurso").hide();
        $("#botonModal").removeClass("oculto");
        $("#botonModalMini").removeClass("oculto");
    }else{
        $("#botonModalMini").addClass("oculto");
        $("#botonModal").addClass("oculto");
        $("#contenido").hide();
        $("#contenidoCurso").show();
    }
    
});
$("#botonModalMini").click(function(e){
    e.preventDefault();
    if ($("#botonModalMini").hasClass("oculto")) {
        $("#contenido").show();
        $("#contenidoCurso").hide();
        $("#botonModal").removeClass("oculto");
        $("#botonModalMini").removeClass("oculto");
    }else{
        $("#botonModalMini").addClass("oculto");
        $("#botonModal").addClass("oculto");
        $("#contenido").hide();
        $("#contenidoCurso").show();
    }
});
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

function recorrerResultados(){
    if(localStorage.getItem("lesson_location") != null){
        var status = lzw_decode(localStorage.getItem("lesson_location"));
        var completados = 0;
        var temp;
        for (var i = 0; i < pages.length; i++) {
            temp = status.substring(i * 2, (i*2) + 2);
            temp = parseInt(temp);
            if(temp>0){
                completados++;
                $("#contenido").append("<a class='btn btn-primary' href='"+dameURL(pages[i].id)+"'>" + pages[i].url + "</a>" );
            }else{
                $("#contenido").append("<a class='btn'  style='background: #AAB7B8;' href='"+dameURL(pages[i].id)+"'>" + pages[i].url + "</a>" );
            }
        }
        //console.log(completados + " completados, de " + pages.length);
        return completados;
    }else{
        for (var i = 0; i < pages.length; i++) {
            $("#contenido").append(
                "<a class='btn'  style='background: #AAB7B8;' href='"+
                dameURL(pages[i].id)+"'>" + pages[i].url + "</a>"
            );
        }
        return 0;
    }
    
}

//$("#contenido").append(localStorage.getItem("info_usuario") + "<br>" );
//$("#contenido").append(localStorage.getItem("intento_actual") + "<br>" );
$("#contenido").append("Tiempo de la sesión " + lzw_decode(localStorage.getItem("session_time")) + " minutos<br>" );
// if ((localStorage.getItem("status") == null) || (lzw_decode(localStorage.getItem("status")) == "0")   ) {
//     $("#contenido").append("Curso no iniciado<br>");
// }
if (lzw_decode(localStorage.getItem("status")) == "passed") {
    $("#contenido").append("Curso iniciado<br>");
}
if (lzw_decode(localStorage.getItem("status")) == "incomplete") {
    $("#contenido").append("Curso terminado<br>");
}

$("#contenido").append("Tiempo total: " + lzw_decode(localStorage.getItem("total_time")) + "<br>" );

$("#contenido").append("Detalle de las lecciones <br>");
var resultados = [];
var status = lzw_decode(localStorage.getItem("lesson_location"));
var temp, porcentaje;
for(var i =0; i<lessons.length; i++){
    var completados = 0;
    var leccion = lessons[i];
    for (var j = 0; j < leccion.length; j++) {
        var indice = dameIndice(leccion[j]);
        temp = status.substring(indice * 2, (indice*2) + 2);
        console.log("Obteniendo " + temp + " del índice: " + indice);
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
$("#contenido").append('<section style="height: 200px; width: 400px;">'+
    '<canvas id="myChart" ></canvas>'+
'</section>');
$("#contenido").append('<section style="height: 200px; width: 400px;">'+
    '<canvas id="cursoCompleto" ></canvas>'+
'</section>');
//console.log("Ahora van los resultados");
//console.log(resultados);
console.log("Los resultados para la gráfica son :" + resultados);
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

//
$("#contenido").append("Detalle de las páginas<br><div style='background: #e9e9e9;'");
var terminadas = recorrerResultados();
$("#contenido").append("</div><hr>");

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
                ],
                label: 'Avance total'
            }],
            labels: [
                'Completado',
                'No completado'
                
            ]
        }
    });
//alert("Fin del documento");