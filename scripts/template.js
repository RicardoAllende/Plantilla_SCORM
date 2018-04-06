var enlaces = "";
var leccion, posicion;

function obtenerURL(id){
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].id == id){
            return pages[i].url;
        }
    }
    return "index.html";
}

function obtenerNombre(id){
    for (var i = 0; i < pages.length; i++) {
        if(pages[i].id == id){
            return pages[i].title;
        }
    }
    return "No encontrado";
}

enlaces += `<li>
                <a href="javascript:void(0)">
                <div class="item-content">
                    <div class="item-media">
                        <div class="lettericon" data-text="Temas" data-size="sm" data-char-count="2"></div>
                    </div>
                    <div class="item-inner">
                        <span class="title"> Temas </span><i class="icon-arrow"></i>
                    </div>
                </div> </a>
                <ul class="sub-menu">`;
for (let index = 0; index < lessons.length; index++) {
    leccion = lessons[index];
    enlaces += `    <li>
                        <a href="javascript:void(0)">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="` + (index + 1) + `" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Tema ` + (index + 1) +` </span><i class="icon-arrow"></i>
                            </div>
                        </div> </a>
                        <ul class="sub-menu">`;
            for (let j = 0; j < leccion.length; j++) {
                posicion = leccion[j];
                enlaces += `<li>
                                <a href="` + obtenerURL(leccion[j]) + `"> <span class="title" id="enlace0"> ` + (j + 1) +
                                ". "  + obtenerNombre(leccion[j]) + ` </span> </a>
                        </li>`;
            }
                            
            enlaces +=`</ul>
                    </li>`;
}
enlaces += `</ul>
            </li>
            <li>
                <a class="btnFin" data-toggle="tooltip" title="Cerrar curso" data-placement="bottom" data-toggle="tooltip" title="Cerrar curso" data-placement="bottom">
                <div class="item-content">
                    <div class="item-media">
                        <div class="lettericon" data-text="Salir" data-size="sm" data-char-count="2"></div>
                    </div>
                    <div class="item-inner">
                        <span class="title"> Salir </span>
                    </div>
                </div> </a>
            </li>`;
document.write(`<div id="app">
    <!-- sidebar -->
    <div class="sidebar app-aside" id="sidebar">
        <div class="sidebar-container perfect-scrollbar">
            <div>
                
                <!-- start: USER OPTIONS -->
                <div class="nav-user-wrapper">
                    <div class="media">
                        <div class="media-left">
                            <a class="profile-card-photo" href="#"><img alt="" src="assets/images/avatar-1.jpg"></a>
                        </div>
                        <div class="media-body">
                            <span class="media-heading text-white">Ricardo Allende</span>
                            <div class="text-small text-white-transparent">
                                Subitus
                            </div>
                        </div>
                        <div class="media-right media-middle">
                            <div class="dropdown">
                                <button href class="btn btn-transparent text-white dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-caret-down"></i>
                                </button>
                                <ul class="dropdown-menu animated fadeInRight pull-right">
                                    <li>
                                        <a href="#"> My Profile </a>
                                    </li>
                                    <li>
                                        <a href="#"> My Calendar </a>
                                    </li>
                                    <li>
                                        <a href="#"> My Messages (3) </a>
                                    </li>
                                    <li>
                                        <a href="#"> Lock Screen </a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a href="#"> Log Out </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end: USER OPTIONS -->
                <nav>
                    <!-- start: MAIN NAVIGATION MENU -->
                    <div class="navbar-title">
                        <span>Navegación dentro del curso</span>
                    </div>
                    <ul class="main-navigation-menu">`
                    + enlaces + 
                    `</ul>
                    <!-- end: MAIN NAVIGATION MENU -->
                </nav>
            </div>
        </div>
    </div>
    <!-- / sidebar -->
    <div class="app-content">
        <!-- start: TOP NAVBAR -->
        <header class="navbar navbar-default navbar-static-top">
            <!-- start: NAVBAR HEADER -->
            <div class="navbar-header">
                <button href="#" class="sidebar-mobile-toggler pull-left btn no-radius hidden-md hidden-lg" class="btn btn-navbar sidebar-toggle" data-toggle-class="app-slide-off" data-toggle-target="#app" data-toggle-click-outside="#sidebar">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html"> <img src="assets/images/logo.png" alt="Packet"/> </a>
                <a class="navbar-brand navbar-brand-collapsed" href="index.html"> <img src="assets/images/logo-collapsed.png" alt="" /> </a>
                <button type="button" data-toggle="modal" class="btn pull-right menu-toggler visible-xs-block" id="menu-toggler"  data-target="#myModal">
                        <i class="fa fa-bell closed-icon"></i><i class="fa fa-folder-open open-icon"></i><small><i class="fa fa-caret-down margin-left-5"></i></small>
                        <!--<i class="fa fa-bell"></i> </a>-->
                </button>
                <button class="hidden-md hidden-lg btnBookmark" >
                    <i class="glyphicon glyphicon-bookmark"></i>
                </button>
            </div>
            <!-- end: NAVBAR HEADER -->
            <!-- start: NAVBAR COLLAPSE -->
            <div class="navbar-collapse collapse">
                
                <ul class="nav navbar-left hidden-sm hidden-xs">
                    <li class="sidebar-toggler-wrapper">
                        <div>
                            <button href="javascript:void(0)" class="btn sidebar-toggler visible-md visible-lg">
                                <i class="fa fa-bars"></i>
                            </button>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="toggle-fullscreen"> <i class="fa fa-expand expand-off"></i><i class="fa fa-compress expand-on"></i></a>
                    </li>
                    
                </ul>
                
                    
                
                <ul class="nav navbar-right">
                    <!-- start: MESSAGES DROPDOWN -->
                    <li >
                        <a><button type="button" class="paginaNoMarcada btnBookmark"><i class="glyphicon glyphicon-bookmark"></i></button></a>
                    </li>
                    <!-- end: MESSAGES DROPDOWN -->
                    <!-- start: ACTIVITIES DROPDOWN -->
                    <li class="dropdown">
                        <a><button type="button" data-toggle="modal" data-target="#myModal"><i class="fa fa-bell"></i></button></a>
                        <!--<ul class="dropdown-menu dropdown-light dropdown-messages dropdown-large animated fadeInUpShort">
                            <li>
                                <span class="dropdown-header"> You have new notifications</span>
                            </li>
                            <li>
                                <div class="drop-down-wrapper ps-container">
                                    <div class="list-group no-margin">
                                        <a class="media list-group-item" href=""> <img class="img-circle" alt="..." src="assets/images/avatar-1.jpg"> <span class="media-body block no-margin"> Use awesome animate.css <small class="block text-grey">10 minutes ago</small> </span> </a>
                                        <a class="media list-group-item" href=""> <span class="media-body block no-margin"> 1.0 initial released <small class="block text-grey">1 hour ago</small> </span> </a>
                                    </div>
                                </div>
                            </li>
                            <li class="view-all">
                                <a href="#"> See All </a>
                            </li>
                        </ul>-->
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
            <div id="contenidoCurso">
                <center><h1>` + window.location.pathname + `</h1></center>
                
                <a href="index.html" id="btnNext" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:50%;right:0px;">
                Siguiente
                </a>
                <a href="index.html" id="btnPrev" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:60%;right: 0px;">
                Anterior
                </a>
                <button id="btnFin" class="btn btn-primary btn-lg" style="display:scroll;position:fixed;bottom:40%;right: 0px;">
                    Salir
                </button>
            </div>
            <!--<div id="contenedor"><div id="contenido"></div></div>-->
        </div>
    </div>
    
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
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>
            
        </div>
    </div>
    <footer>
        <div class="progress">
            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0"
            aria-valuemin="0" aria-valuemax="100" style="width:0%" id="progress-bar">
                Avance 0%
            </div>
        </div>
    </footer>
    
</div>

    
    
    <style>
        .paginaMarcada{
            color: red;
        }
    </style>
    <!-- start: MAIN JAVASCRIPTS -->
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/components-modernizr/modernizr.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    <script src="bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js"></script>
    <script src="bower_components/jquery-fullscreen/jquery.fullscreen-min.js"></script>
    <script src="bower_components/switchery/dist/switchery.min.js"></script>
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
    <script src="scripts/ver_avance.js"></script>`);