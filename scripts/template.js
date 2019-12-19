var enlaces = "";
var leccion, posicion;

function obtenerURL(id) {
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].id == id) {
            return pages[i].url;
        }
    }
    return "index.html";
}

function obtenerNombre(id) {
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].id == id) {
            return pages[i].title;
        }
    }
    return "No encontrado";
}
//Se crean dinámicamente los enlaces para el menú
enlaces += `<li>
                <a href="javascript:void(0)">
                <div class="item-content">
                    <div class="item-media">
                        <div class="lettericon" data-text="Temas" data-size="sm" data-char-count="2"></div>
                    </div>
                    <div class="item-inner">
                        <span class="title titulo_menu"> Temas </span><i class="icon-arrow"></i>
                    </div>
                </div> </a>
                <ul class="sub-menu">`;
var contador = 0;
for (let index = 0; index < lessons.length; index++) {
    leccion = lessons[index];
    enlaces += `    <li>
                        <a href="javascript:void(0)">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="` + (index + 1) + `" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title titulo_menu">` + nombresDeLecciones[index] + ` </span><i class="icon-arrow"></i>
                            </div>
                        </div> </a>
                        <ul class="sub-menu">`;
    for (let j = 0; j < leccion.length; j++) {
        posicion = leccion[j];
        enlaces += `<li>
                                <a href="` + obtenerURL(leccion[j]) + `"> <span class="title titulo_menu" id="enlace` + contador + `"> ` + (j + 1) +
            ". " + obtenerNombre(leccion[j]) + ` </span> </a>
                        </li>`;
        contador++;
    }

    enlaces += `</ul>
                    </li>`;
}
enlaces += `    </ul>
            </li>
            <li>
                <a href="estadisticas.html">
                    <div class="item-content">
                        <div class="item-media">
                            <div class="lettericon" data-text="Estadisticas" data-size="sm" data-char-count="2"></div>
                        </div>
                        <div class="item-inner">
                            <span class="title titulo_menu"> Estadísticas </span>
                        </div>
                    </div>
                </a>
            </li>
            <li>
                <a class="btnFin" data-toggle="tooltip" title="Cerrar curso" data-placement="bottom" data-toggle="tooltip">
                <div class="item-content">
                    <div class="item-media">
                        <div class="lettericon" data-text="Salir" data-size="sm" data-char-count="2"></div>
                    </div>
                    <div class="item-inner">
                        <span class="title titulo_menu"> Salir </span>
                    </div>
                </div> </a>
            </li>`;

contenido = window.location.pathname;
contenido = contenido.substring(contenido.lastIndexOf('/') + 1);
if(contenido == ''){
    contenido = "Bienvenido al curso";
}

function imprimirProgressBar(){
    document.getElementById('progress').innerHTML = `
    <div class="progress" style="height: 15px;margin-bottom: 0px !important;">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="10"
                    aria-valuemin="0" aria-valuemax="100" style="width:10%" id="progress-bar">
                    </div>
                </div>
    `;
}

function imprimirCabecera(){
    document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-container perfect-scrollbar">
        <div>
            
            <!-- start: USER OPTIONS -->
            <div>
            <a href="#"> <img class="imagen_interior" src="assets/images/escudo.jpg"> </a><br>
            </div>
            <!-- end: USER OPTIONS -->
            <nav>
                <!-- start: MAIN NAVIGATION MENU -->
                
                <ul class="main-navigation-menu">`
                + enlaces +
                `</ul>
                <!-- end: MAIN NAVIGATION MENU -->
            </nav>
        </div>
    </div>
`;
}

function imprimirPieDePagina(){
    $('#app-content').html(`
    <!-- start: TOP NAVBAR -->
    <header class="navbar navbar-default navbar-static-top">
        <!-- start: NAVBAR HEADER -->
        <div class="navbar-header">
            <button href="#" class="sidebar-mobile-toggler pull-left btn no-radius hidden-md hidden-lg" class="btn btn-navbar sidebar-toggle" data-toggle-class="app-slide-off" data-toggle-target="#app" data-toggle-click-outside="#sidebar">
                <i class="fa fa-bars"></i>
            </button>
            
            
            <button class="pull-right menu-toggler visible-xs-block btnFin">
                <img class="imagen_interior" src="assets/images/salir.png" data-toggle="tooltip" title="Salir del curso" data-placement="bottom">
            </button>
            <button onclick="calcularEstadisticas()" type="button" data-toggle="modal" class="btn pull-right menu-toggler visible-xs-block" id="menu-toggler" data-target="#myModal">
                <i class="glyphicon glyphicon-stats" data-toggle="tooltip" title="Avance" data-placement="bottom"></i>
            </button>
            <button class="hidden-md hidden-lg btnBookmark" >
                <i class="glyphicon glyphicon-bookmark" data-toggle="tooltip" title="Marcar" data-placement="bottom"></i>
            </button>

        </div>
        <!-- end: NAVBAR HEADER -->
        <!-- start: NAVBAR COLLAPSE -->
        <div class="navbar-collapse collapse">
            
            <ul class="nav navbar-left hidden-sm hidden-xs">
                <li class="sidebar-toggler-wrapper">
                    <div>
                        <button href="javascript:void(0)" class="btn sidebar-toggler visible-md visible-lg" style="background-color: transparent !important;">
                            <i class="fa fa-bars"></i>
                        </button>
                    </div>
                </li>
                <li>
                    <a href="#" class="toggle-fullscreen"> <i class="fa fa-expand expand-off"></i><i class="fa fa-compress expand-on"></i></a>
                </li>
                
            </ul>
            
            <span style="position:absolute; z-index:15; padding-top: 1%; margin: 0 auto; color: white; font-size: x-large;">` + tituloDelCurso + `</span>
            
            <ul class="nav navbar-right">
                <!-- start: MESSAGES DROPDOWN -->
                <li >
                    <a><button type="button" class="btnBookmark hidden-md"><i class="glyphicon glyphicon-bookmark" data-toggle="tooltip" title="Marcar" data-placement="bottom"></i></button></a>
                </li>
                <!-- end: MESSAGES DROPDOWN -->
                <!-- start: ACTIVITIES DROPDOWN -->
                <li class="dropdown">
                    <a onclick="calcularEstadisticas()"><button type="button" data-toggle="modal" data-target="#myModal"><i data-toggle="tooltip" title="Avance" data-placement="bottom" class="glyphicon glyphicon-stats"></i></button></a>
                </li>
                <li class="dropdown">
                    <a><button class="btnFin"><img class="imagen_interior" src="assets/images/salir.png" data-toggle="tooltip" title="Salir" data-placement="bottom"></button></a>
                </li>
                <!-- end: ACTIVITIES DROPDOWN -->
                
            </ul>
            <!-- start: MENU TOGGLER FOR MOBILE DEVICES -->
            <div class="close-handle visible-xs-block menu-toggler" data-toggle="collapse" href=".navbar-collapse">
                <div class="arrow-left"></div>
                <div class="arrow-right"></div>
            </div>
            <!-- end: MENU TOGGLER FOR MOBILE DEVICES -->
        </div>

        <!-- end: NAVBAR COLLAPSE -->
    </header>
    <!-- end: TOP NAVBAR -->
    
    
    <div class="main-content">
    <div class="txt">
     <div class="txt_titulo">Título</div><br>
     <div style="font-weight: bold;margin-top: -1rem;">__________________</div><br>
     <div class="txt_contenido">
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Placerat orci nulla pellentesque dignissim. At imperdiet dui accumsan sit amet nulla facilisi morbi.     
     </div>
    </div>
        <div id="contenidoCurso" style="background: #efefef;" data-toggle="tooltip">
            <h1 style="text-align: center">` + contenido + `</h1>            
        </div>
        <!--<a href="index.html" id="btnNext" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:10%;right:0px;">
        Siguiente
        </a>
        <a href="index.html" id="btnPrev" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:20%;right: 0px; z-index: 10;">
        Anterior
        </a>-->
        <!--<div id="contenedor"><div id="contenido"></div></div>-->
    </div>`);
    pieDePagina = `
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Avance del curso</h4>
            </div>
            <div class="modal-body">
                <div id="contenedor"><div id="contenido"></div><div id="avance"></div></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
            </div>
            
        </div>
    </div>

    <!-- </div>
    start: MAIN JAVASCRIPTS -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/components-modernizr/modernizr.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    <script src="bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js"></script>
    <script src="bower_components/jquery-fullscreen/jquery.fullscreen-min.js"></script>
    <!--<script src="bower_components/switchery/dist/switchery.min.js"></script>-->
    <script src="bower_components/jquery.knobe/dist/jquery.knob.min.js"></script>
    <script src="bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"></script>
    <script src="bower_components/slick.js/slick/slick.min.js"></script>
    <script src="bower_components/jquery-numerator/jquery-numerator.js"></script>
    <script src="bower_components/ladda/dist/spin.min.js"></script>
    <script src="bower_components/ladda/dist/ladda.min.js"></script>
    <script src="bower_components/ladda/dist/ladda.jquery.min.js"></script>
    <!-- end: MAIN JAVASCRIPTS -->
    <!-- start: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
    <script src="bower_components/Chart-js/Chart.min.js"></script>

    <!-- end: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
    <!-- start: Packet JAVASCRIPTS -->
    <script src="assets/js/letter-icons.js"></script>
    <script src="assets/js/main.js"></script>
    <!-- end: Packet JAVASCRIPTS -->
    <!-- start: JavaScript Event Handlers for this page -->
    <script src="assets/js/index.js"></script>
    <script>
    jQuery(document).ready(function() {
        Main.init();
        Index.init();
    });
    </script>
    <script type="text/javascript" src="scripts/script_subitus.js"></script>
    <script src="scripts/ver_avance.js"></script>`;
    document.write(pieDePagina);
    if (!esVacio(diapositiva)) {
        renderizarContenido(diapositiva);
    }
}

function imprimirPieDePaginaDrag(){
    $('#app-content').html(`
    <!-- start: TOP NAVBAR -->
    <header class="navbar navbar-default navbar-static-top">
        <!-- start: NAVBAR HEADER -->
        <div class="navbar-header">
            <button href="#" class="sidebar-mobile-toggler pull-left btn no-radius hidden-md hidden-lg" class="btn btn-navbar sidebar-toggle" data-toggle-class="app-slide-off" data-toggle-target="#app" data-toggle-click-outside="#sidebar">
                <i class="fa fa-bars"></i>
            </button>
            
            
            <button class="pull-right menu-toggler visible-xs-block btnFin">
                <img class="imagen_interior" src="assets/images/salir.png" data-toggle="tooltip" title="Salir del curso" data-placement="bottom">
            </button>
            <button onclick="calcularEstadisticas()" type="button" data-toggle="modal" class="btn pull-right menu-toggler visible-xs-block" id="menu-toggler" data-target="#myModal">
                <i class="glyphicon glyphicon-stats" data-toggle="tooltip" title="Avance" data-placement="bottom"></i>
            </button>
            <button class="hidden-md hidden-lg btnBookmark" >
                <i class="glyphicon glyphicon-bookmark" data-toggle="tooltip" title="Marcar" data-placement="bottom"></i>
            </button>

        </div>
        <!-- end: NAVBAR HEADER -->
        <!-- start: NAVBAR COLLAPSE -->
        <div class="navbar-collapse collapse">
            
            <ul class="nav navbar-left hidden-sm hidden-xs">
                <li class="sidebar-toggler-wrapper">
                    <div>
                        <button href="javascript:void(0)" class="btn sidebar-toggler visible-md visible-lg" style="background-color: transparent !important;">
                            <i class="fa fa-bars"></i>
                        </button>
                    </div>
                </li>
                <li>
                    <a href="#" class="toggle-fullscreen"> <i class="fa fa-expand expand-off"></i><i class="fa fa-compress expand-on"></i></a>
                </li>
                
            </ul>
            
            <span style="position:absolute; z-index:15; padding-top: 1%; margin: 0 auto; color: white; font-size: x-large;">` + tituloDelCurso + `</span>
            
            <ul class="nav navbar-right">
                <!-- start: MESSAGES DROPDOWN -->
                <li >
                    <a><button type="button" class="btnBookmark hidden-md"><i class="glyphicon glyphicon-bookmark" data-toggle="tooltip" title="Marcar" data-placement="bottom"></i></button></a>
                </li>
                <!-- end: MESSAGES DROPDOWN -->
                <!-- start: ACTIVITIES DROPDOWN -->
                <li class="dropdown">
                    <a onclick="calcularEstadisticas()"><button type="button" data-toggle="modal" data-target="#myModal"><i data-toggle="tooltip" title="Avance" data-placement="bottom" class="glyphicon glyphicon-stats"></i></button></a>
                </li>
                <li class="dropdown">
                    <a><button class="btnFin"><img class="imagen_interior" src="assets/images/salir.png" data-toggle="tooltip" title="Salir" data-placement="bottom"></button></a>
                </li>
                <!-- end: ACTIVITIES DROPDOWN -->
                
            </ul>
            <!-- start: MENU TOGGLER FOR MOBILE DEVICES -->
            <div class="close-handle visible-xs-block menu-toggler" data-toggle="collapse" href=".navbar-collapse">
                <div class="arrow-left"></div>
                <div class="arrow-right"></div>
            </div>
            <!-- end: MENU TOGGLER FOR MOBILE DEVICES -->
        </div>

        <!-- end: NAVBAR COLLAPSE -->
    </header>
    <!-- end: TOP NAVBAR -->
    
    
    <div class="main-content">
    <div class="txt">
     <div class="txt_titulo">Instrucciones</div><br>
     <div style="font-weight: bold;margin-top: -1rem;">__________________</div><br>
     <div class="txt_contenido">
     Arrastre las opciones a los espacios en blanco.     
     </div>
    </div>
        <div id="contenidoCurso" style="background: #efefef;" data-toggle="tooltip">
            <h1 style="text-align: center">` + contenido + `</h1>            
        </div>
        <!--<a href="index.html" id="btnNext" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:10%;right:0px;">
        Siguiente
        </a>
        <a href="index.html" id="btnPrev" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:20%;right: 0px; z-index: 10;">
        Anterior
        </a>-->
        <!--<div id="contenedor"><div id="contenido"></div></div>-->
    </div>`);
    pieDePagina = `
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Avance del curso</h4>
            </div>
            <div class="modal-body">
                <div id="contenedor"><div id="contenido"></div><div id="avance"></div></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
            </div>
            
        </div>
    </div>

    <!-- </div>
    start: MAIN JAVASCRIPTS -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/components-modernizr/modernizr.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    <script src="bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js"></script>
    <script src="bower_components/jquery-fullscreen/jquery.fullscreen-min.js"></script>
    <!--<script src="bower_components/switchery/dist/switchery.min.js"></script>-->
    <script src="bower_components/jquery.knobe/dist/jquery.knob.min.js"></script>
    <script src="bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"></script>
    <script src="bower_components/slick.js/slick/slick.min.js"></script>
    <script src="bower_components/jquery-numerator/jquery-numerator.js"></script>
    <script src="bower_components/ladda/dist/spin.min.js"></script>
    <script src="bower_components/ladda/dist/ladda.min.js"></script>
    <script src="bower_components/ladda/dist/ladda.jquery.min.js"></script>
    <!-- end: MAIN JAVASCRIPTS -->
    <!-- start: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
    <script src="bower_components/Chart-js/Chart.min.js"></script>

    <!-- end: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
    <!-- start: Packet JAVASCRIPTS -->
    <script src="assets/js/letter-icons.js"></script>
    <script src="assets/js/main.js"></script>
    <!-- end: Packet JAVASCRIPTS -->
    <!-- start: JavaScript Event Handlers for this page -->
    <script src="assets/js/index.js"></script>
    <script>
    jQuery(document).ready(function() {
        Main.init();
        Index.init();
    });
    </script>
    <script type="text/javascript" src="scripts/script_subitus.js"></script>
    <script src="scripts/ver_avance.js"></script>`;
    document.write(pieDePagina);
    if (!esVacio(diapositiva)) {
        renderizarContenido(diapositiva);
    }
}

function renderizarContenido(informacionDiapositiva){
    // console.log(informacionDiapositiva);
    selector = '#' + informacionDiapositiva.div;
    console.log('Insertando en ', selector);
    $(selector).html('');
    // alert(informacionDiapositiva.tipo);
    switch (informacionDiapositiva.tipo) { // flip-card, accordion, horizontal-tabs, vertical-tabs
        case 'flip-card':
            break;

        case 'accordion':
            $.each(informacionDiapositiva.contenido, function(indice, elemento){
                interior = renderizarInteriorImagen(elemento);
                $(selector).append(`
                <button class="accordion pt-2">${elemento.titulo}</button>
                <div class="panel">
                    ${interior}
                </div>
                `);
            });
            document.write(`<link rel="stylesheet" href="assets/css/elementos/accordion.css">`);
            document.write(`
            <script>
                var acc = document.getElementsByClassName("accordion");
                var i;

                for (i = 0; i < acc.length; i++) {
                    acc[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;
                        if (panel.style.display === "block") {
                            panel.style.display = "none";
                        } else {
                            panel.style.display = "block";
                        }
                    });
                }
            </script>`);
            break;
        case 'horizontal-tabs':
            contentido = ``;
            contenido += `<ul class="nav nav-tabs pt-2">`;
            is_first = true;
            $.each(informacionDiapositiva.contenido, function(indice, elemento){
                id_de_elemento = indice + elemento.titulo.replace(/ /g, "");
                contenido += `<li ${is_first ? 'class="active"' : ''}><a data-toggle="tab" href="#${id_de_elemento}">${elemento.titulo}</a></li>`;
                if(is_first){
                    is_first = false;
                }
            });
            contenido += `</ul>`;

            contenido += `<div class="tab-content">`;
            is_first = true;
            $.each(informacionDiapositiva.contenido, function(indice, elemento){
                id_de_elemento = indice + elemento.titulo.replace(/ /g, "");
                interior = renderizarInteriorImagen(elemento);
                contenido += `
                <div id="${id_de_elemento}" class="tab-pane in ${is_first ? 'active' : ''}">
                    <h3>${elemento.titulo}</h3>
                    ${interior}
                </div>
                `;
                if(is_first){
                    is_first = false;
                }
            });
            contenido += `</div>`;
            $(selector).html(contenido);

            break;

        case 'completar-palabra':
            contenido_opciones = `<li class="title">Opciones</li>`;
            $.each(informacionDiapositiva.opciones, function(indice, opcion){
                contenido_opciones += `<li class="option txt_drag_opciones" data-target="${opcion}">${opcion}</li>`;
            });

            contenido_oraciones = ``;
            $.each(informacionDiapositiva.oraciones, function(indice, oracion){
                texto = oracion.texto.replace('[[]]', `<span class="target" data-accept="${oracion.respuesta}">&nbsp;</span>`)
                contenido_oraciones += `<li class="txt_drag_preguntas">${texto}</li>`;
            });
            contenido = `
            <div class="quiz-wrapper pt-2">
                <!--<p class="question-description txt_descripcion">Arrastre las opciones a los espacios en blanco.</p>-->
                <div class="row">
                    <div class="col-sm-4 txt_drag">
                        <ul class="options">
                            ${contenido_opciones}
                        </ul>
                    </div>
                    <div class="col-sm-8" style="padding-top: 4rem;">
                        <div class="answers">
                            <ol>
                                ${contenido_oraciones}
                            </ol>
                        </div>
                    </div>
                </div>
                <button class="btn btn-submit" id="completar-palabra-boton-siguiente">Siguiente</button>
            </div>
            `;
            $(selector).html(contenido);
            document.write(`<link rel="stylesheet" href="assets/css/elementos/completar-palabra.css">`);
            document.write(`
            <script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
            <script>
                //initialize the quiz options
                var answersLeft = [];
                $('.quiz-wrapper').find('li.option').each(function (i) {
                    var $this = $(this);
                    var answerValue = $this.data('target');
                    var $target = $('.answers .target[data-accept="' + answerValue + '"]');
                    var labelText = $this.html();
                    $this.draggable({
                        revert: "invalid",
                        containment: ".quiz-wrapper"
                    });

                    if ($target.length > 0) {
                        $target.droppable({
                            accept: 'li.option[data-target="' + answerValue + '"]',
                            drop: function (event, ui) {
                                $this.draggable('destroy');
                                $target.droppable('destroy');
                                $this.html('&nbsp;');
                                $target.html(labelText);
                                answersLeft.splice(answersLeft.indexOf(answerValue), 1);
                            }
                        });
                        answersLeft.push(answerValue);
                    } else { }
                });
                $('#completar-palabra-boton-siguiente').click(function () {
                    if (answersLeft.length > 0) {
                        alertify.error('Aún no han sido contestadas todas las preguntas');
                    } else {
                        alertify.success('Todo contestado correctamente');
                    }
                });
            </script>`);
            break;
        case 'cuestionario':
            $(selector).html(`
            <div class="" style="min-height: 500px;padding-left: 5rem;padding-right: 5rem;">
                <div class="">
                    <div class="">
                        <div id="titulo_pregunta" class="txt_titulo_pregunta"></div>
                    </div>
                    <div class="modal-body">
                        <div class="col-xs-3 col-xs-offset-5">
                            <div id="loadbar" style="display: none;">
                                Cargando ...
                            </div>
                        </div>

                        <div class="opciones_pregunta" id="opciones_pregunta" data-toggle="buttons"></div>
                        <div class="row" style="padding: 3%;">
                            <div class="col-sm-12"><a id="btnSiguiente"> <img class="sig_pregunta" src="assets/images/btn_sigpreg.png"> </a></div>
                            <!--<div class="col-sm-2">
                                <button id="btnSiguiente" class="btn btn-success">Siguiente</button>
                            </div>-->
                        </div>
                    </div>
                    <div class="text-muted">
                        <span id="resultado-cuestionario"></span>
                    </div>
                </div>
            </div>`);
            preguntas = informacionDiapositiva.preguntas;
            document.write(`<link rel="stylesheet" href="assets/css/elementos/cuestionario.css">`);
            document.write(`<script src="scripts/cuestionario.js"></script>`);
        break;
        case 'vertical-tabs':

            contenido = '';
            // $(selector).append();
            contenido += "<div style='height: 100%'>";
            contenido += `<div class="tab pt-2">`;
            is_first = true;
            $.each(informacionDiapositiva.contenido, function(indice, elemento){
                id_de_elemento = indice + elemento.titulo.replace(/ /g, "");
                contenido += `<button class="tablinks" onclick="open_vertical_tabs(event, '${id_de_elemento}')" ${is_first ? 'id="defaultOpen"' : ''}>${elemento.titulo}</button>`;
                // $(selector).append();
                if(is_first){
                    is_first = false;
                }
            });
            contenido += `</div>`;
            // $(selector).append();

            // $(selector).append(`<div class="tab">`);
            $.each(informacionDiapositiva.contenido, function(indice, elemento){
                id_de_elemento = indice + elemento.titulo.replace(/ /g, "");
                interior = renderizarInteriorImagen(elemento);
                contenido += `
                <div id="${id_de_elemento}" class="tabcontent">
                    <h3>${elemento.titulo}</h3>
                    ${interior}
                </div>
                `
                // $(selector).append();
            });
            contenido += `</div>`;
            $(selector).html(contenido);

            document.write(`<link rel="stylesheet" href="assets/css/elementos/vertical-tabs.css">`);
            if(typeof open_vertical_tabs !== 'function'){
                document.write(`
                <script>
                    function open_vertical_tabs(evt, cityName) {
                        var i, tabcontent, tablinks;
                        tabcontent = document.getElementsByClassName("tabcontent");
                        for (i = 0; i < tabcontent.length; i++) {
                            tabcontent[i].style.display = "none";
                        }
                        tablinks = document.getElementsByClassName("tablinks");
                        for (i = 0; i < tablinks.length; i++) {
                            tablinks[i].className = tablinks[i].className.replace(" active", "");
                        }
                        document.getElementById(cityName).style.display = "block";
                        evt.currentTarget.className += " active";
                    }
                    document.getElementById("defaultOpen").click();
                </script>`);
            }

            break; 
    }
}

function renderizarInteriorImagen(elemento){
    contenido_card = "";
    if(esVacio(elemento.imagen)){ // No existe imagen
        if(!esVacio(elemento.texto)){
            contenido_card = '<p>' + elemento.texto + '</p>';
        }
    }else{
        borderRadius = esVacio(elemento.bordeImagen) ? `` : `border-radius: ${elemento.bordeImagen};`;
        elemento.posicionImagen = esVacio(elemento.posicionImagen) ? 'izquierda' : elemento.posicionImagen;
        elemento.texto = esVacio(elemento.texto) ? 'izquierda' : elemento.texto;
        height = esVacio(elemento.alto) ? '' : `height: ${elemento.alto};`;
        width = esVacio(elemento.ancho) ? '' : `width: ${elemento.ancho};`;
        switch (elemento.posicionImagen) {
            case 'izquierda':
                contenido_card += `
                <div class="row pt-2">
                    <div class="col-sm-4"><img class="imagen_interior" src="${elemento.imagen}" alt="Smiley face" style="${height} ${width} ${borderRadius}"></div>
                    <div class="col-sm-8">${elemento.texto}</div>
                </div>
                `;
                break;
            case 'derecha':
                contenido_card += `
                <div class="row pt-2">
                    <div class="col-sm-8">${elemento.texto}</div>
                    <div class="col-sm-4"><img class="imagen_interior" src="${elemento.imagen}" alt="Smiley face" style="${height} ${width} ${borderRadius}"></div>
                </div>
                `;
                break;
            case 'arriba':
                contenido_card += `
                <div class="row pt-2">
                    <div class="col-sm-12 text-center"><img class="imagen_interior" src="${elemento.imagen}" alt="Smiley face" style="${height} ${width} ${borderRadius}"></div>
                    <div class="col-sm-12 text-center pt-2">${elemento.texto}</div>
                </div>
                `;
                break;
            case 'abajo':
                contenido_card += `
                <div class="row pt-2">
                    <div class="col-sm-12 text-center">${elemento.texto}</div>
                    <div class="col-sm-12 text-center pt-2"><img class="imagen_interior" src="${elemento.imagen}" alt="Smiley face" style="${height} ${width} ${borderRadius}"></div>
                </div>
                `;
                break;
            default:
                break;
        }
    }
    return contenido_card;
}

function esVacio(_elemento) {
    if (_elemento === undefined) {
        return true;
    }
    if (_elemento === null) {
        return true;
    }
    if (Array.isArray(_elemento)) {
        if (_elemento.length == 0) {
            return true;
        }
    }
    if (_elemento == "") {
        return true;
    }
    return false;
}
