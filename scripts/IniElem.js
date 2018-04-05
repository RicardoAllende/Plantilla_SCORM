/*Copyright Subitus 2014 @ MV*/
var styleVersions = new Array("-ms-","-webkit-", "-moz-", "-o-", "");
var scalePage =1;
var pageHeigth = 560;
var pageWidth = 1024;
var device = navigator.userAgent;

$( document ).ready(function(){
    var id=1;
  
    $("[id*=anim]").each(function (){
     
        
        window['anim'+id]  = new Animacion($(this).attr("id"));
       
        var animacion = $(this).data("anim");
        var time = $(this).data("time");
        var fun = $(this).data("funnext");
        var animSalida = $(this).data("salida");
        var timeSalida = $(this).data("timesalida");
        var funSalida = $(this).data("funsalida");
        
        if(fun != "none"){
            window['anim'+id].entrada(animacion,time,eval(fun));
        } else {
            window['anim'+id].entrada(animacion,time);
        }
        
        
        if(animSalida != "none"){
            if(funSalida == "none"){
                window['anim'+id].salida(animSalida,timeSalida);
            } else {
                window['anim'+id].salida(animSalida,timeSalida,eval(funSalida));
            }
            
        }
        
        id++;

    });
    
    calcularEscala();
    $(".resize").each(function (){

        for(var i=0; i<= styleVersions.length-1; i++ ){
            console.log($(this).attr('id'));
            $(this).css(styleVersions[i]+"transform","scale("+scalePage+", "+scalePage+")");
            $(this).css(styleVersions[i]+"transform-origin","15% -90%");
      
        }
    });
  
    ajustarEscenario();
      
   
}); 



function calcularEscala(){
    
    var contentHeigth = $(document).height();
    var contentWidth = $(document).width();
    //console.log("alto "+contentHeigth+" ancho "+contentWidth);
    var _scaleX = contentWidth/pageWidth;
    var _scaleY = contentHeigth/pageHeigth;
    //console.log(_scaleX+" "+_scaleY);
    
    if(_scaleX <= _scaleY){
        scalePage = _scaleX;
        
    }else{
        scalePage = _scaleY;
     
    }
    if(scalePage>=1){
        
        scalePage = 1;
        
    }
//    if(device.match(/Iphone/i)){
//        scalePage = .5;
//    }
    
    console.log("Escala: " + scalePage);
}

function ajustarEscenario(){
    $('#contenido').height(pageHeigth*scalePage);
    $('#contenido').css("width",(pageWidth*scalePage)+"px");
    for(var i=0; i<= styleVersions.length-1; i++ ){
        $('#contenido').css(styleVersions[i]+"transform-origin","0 0");
    }
    //console.log("ajusta escenario");
}


