document.write(`<div id="app">
<!-- sidebar -->
<div class="sidebar app-aside" id="sidebar">
    <div class="sidebar-container perfect-scrollbar">
        <div>
            <!-- start: SEARCH FORM -->
            <div class="search-form hidden-md hidden-lg">
                <a class="s-open" href="#"> <i class="ti-search"></i> </a>
                <form class="navbar-form" role="search">
                    <a class="s-remove" href="#" target=".navbar-form"> <i class="ti-close"></i> </a>
                    
                </form>
            </div>
            <!-- end: SEARCH FORM -->
            <!-- start: USER OPTIONS -->
            <div class="nav-user-wrapper">
                <div class="media">
                    <div class="media-left">
                        <a class="profile-card-photo" href="#"><img alt="" src="assets/images/avatar-1.jpg"></a>
                    </div>
                    <div class="media-body">
                        <span class="media-heading text-white">Ricardo Allende</span>
                        <div class="text-small text-white-transparent">
                            Programmer at Subitus
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
                <ul class="main-navigation-menu">
                    <li>
                        <a href="index.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 01 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="02.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 02 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="03.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 03 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="04.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 04 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="05.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 05 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="06.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 06 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="07.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 07 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="08.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 08 </span>
                            </div>
                        </div> </a>
                    </li>
                    <li>
                        <a href="09.html">
                        <div class="item-content">
                            <div class="item-media">
                                <div class="lettericon" data-text="Layouts" data-size="sm" data-char-count="2"></div>
                            </div>
                            <div class="item-inner">
                                <span class="title"> Página 09 </span>
                            </div>
                        </div> </a>
                    </li>
                </ul>
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
                <li class="dropdown">
                    <!--<a href class="dropdown-toggle" data-toggle="dropdown"> <span class="badge"> 3 </span> <i class="fa fa-envelope"></i> </a>-->
                    <ul class="dropdown-menu dropdown-light dropdown-messages dropdown-large animated fadeInUpShort">
                    </ul>
                </li>
                <!-- end: MESSAGES DROPDOWN -->
                <!-- start: ACTIVITIES DROPDOWN -->
                <li class="dropdown">
                    <a><button type="button" data-toggle="modal" data-target="#myModal"><i class="fa fa-bell"></i></button></a>
                    <ul class="dropdown-menu dropdown-light dropdown-messages dropdown-large animated fadeInUpShort">
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
                    </ul>
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
            <center><h1>Primera Página</h1></center>
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


</div>

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
//$("#contenido").hide();
jQuery(document).ready(function() {
    Main.init();
    Index.init();
});
</script>
<script src="scripts/config.js"></script>
<script type="text/javascript" src="scripts/script_subitus.js"></script>
<script src="scripts/ver_avance.js"></script>
<!-- end: JavaScript Event Handlers for this page -->`);