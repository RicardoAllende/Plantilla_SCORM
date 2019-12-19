var pregunta_actual = 0;
var respuestasCorrectas = 0;
var respuestasIncorrectas = 0;
var respuesta_actual;
console.log(preguntas);
// var preguntas = [
//     {
//         texto: "Elija la segunda respuesta",
//         opciones: [
//             'Primera',
//             'Segunda',
//             'Tercera',
//             'Cuarta',
//         ],
//         respuesta: "Segunda",
//     },
//     {
//         texto: "Elija la primera respuesta",
//         opciones: [
//             'Primera',
//             'Segunda',
//             'Tercera',
//             'Cuarta',
//         ],
//         respuesta: "Primera",
//     },
//     {
//         texto: "Elija la tercera respuesta",
//         opciones: [
//             'Primera',
//             'Segunda',
//             'Tercera',
//             'Cuarta',
//         ],
//         respuesta: "Tercera",
//     },
//     {
//         texto: "Elija la cuarta respuesta",
//         opciones: [
//             'Primera',
//             'Segunda',
//             'Tercera',
//             'Cuarta',
//         ],
//         respuesta: "Cuarta",
//     },
// ];

var numero_preguntas = preguntas.length;

function imprimirSiguientePregunta() {
    if (pregunta_actual < numero_preguntas) { // Aún existen preguntas

        pregunta = preguntas[pregunta_actual];
        pregunta_actual++; // El índice estará en la siguiente pregunta para la próxima iteración

        $('#titulo_pregunta').html(`${pregunta_actual}. ${pregunta.texto}`);
        $("#opciones_pregunta").html('');
        var contenido_opciones = ``;
        $.each(pregunta.opciones, function (indice, pregunta) {
            retraso = 0.8 + (indice * 0.2);
            estilos_animacion = `animation: animationFrames ease ${retraso}s;
                    animation-iteration-count: 1;
                    transform-origin: 50% 50%;
                    -webkit-animation: animationFrames ease ${retraso}s;
                    -webkit-animation-iteration-count: 1;
                    -webkit-transform-origin: 50% 50%;
                    -ms-animation: animationFrames ease ${retraso}s;
                    -ms-animation-iteration-count: 1;
                    -ms-transform-origin: 50% 50%;`;

            contenido_opciones += `<label class=" btn btn-lg btn-primary btn-block txt_contenido_opciones" onclick="verificarPregunta('${pregunta}')" style="${estilos_animacion}">
            <input type="radio" class="radio_preguntas" name="q_answer" value="${pregunta}">${pregunta}</label>`;
        });
        $("#opciones_pregunta").html(contenido_opciones);
        $('#opciones_pregunta').fadeIn();

        respuesta_actual = pregunta.respuesta;
    } else { // Se terminaron las preguntas
        $('btnSiguiente').show(); // Continuar
        $('#resultado-cuestionario').html(`${respuestasCorrectas} Respuestas correctas de ${numero_preguntas}`);
    }
}

function verificarPregunta(respuesta) {
    console.log(respuesta, respuesta_actual);
    if (respuesta == respuesta_actual) {
        respuestasCorrectas++;
        console.log('Respuesta correcta')
    } else {
        console.log('Incorrecta')
        respuestasIncorrectas++;
    }

    $('#loadbar').show();
    $('#opciones_pregunta').fadeOut();
    setTimeout(function () {
        imprimirSiguientePregunta();
        $('#loadbar').fadeOut();
    }, 500);
}

var loading = $('#loadbar').hide();
imprimirSiguientePregunta();

$('btnSiguiente').hide();