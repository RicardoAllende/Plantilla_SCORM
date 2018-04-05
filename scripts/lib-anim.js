/*Copyright Subitus 2016 @ MV*/
var widthV = window.innerWidth;
var device = navigator.userAgent;
var Animacion = function(objeto){
    this.objeto =$('#'+objeto);
    this.opacity = $('#'+objeto).css("opacity",0);
    
    this.width = $('#'+objeto).css("width");
    this.height = $('#'+objeto).css("height");
    this.visible = function(x){
       this.objeto.css("opacity",x);
    }
    //$("#"+objeto).css('display','none');
    
   //console.log(objeto);
 
        $('#'+objeto).css("top", ((parseInt($('#'+objeto).css("top")) * 100) / pageHeigth)+"%"); 
        $('#'+objeto).css("left", ((parseInt($('#'+objeto).css("left")) * 100) / pageWidth)+"%"); 
        
        var pos = $('#'+objeto).position();
        this.posX = pos.left;
        this.posY = pos.top;
    
    
    for(var i=0; i<= styleVersions.length-1; i++ ){
        $('#'+objeto).css(styleVersions[i]+"transform","scale("+scalePage+", "+scalePage+")");
        $('#'+objeto).css(styleVersions[i]+"transform-origin","0 0");
      
    }
 /***Funciones de entrada***/      
    this.entrada = function(tipo,retardo,fun){
        //console.log(this.objeto);
        
        
        
        var animaciones = new Array("default", "arriba_abajo", "abajo_arriba", "izquierda_derecha", "derecha_izquierda", "ampliar", "reducir");
        var tiempo_animacion = 1;
        if (fun == "none") {fun = nada;}
        if (tipo == undefined) {tipo = "default";}
        if (retardo == undefined) {retardo = 0;}
        if (tipo == "aleatorio"){tipo = animaciones[random(animaciones.length - 1)];}
        
        var Posder = this.posX + 100;
        var Posizq = this.posX - 100;
        var Posarr = this.posY - 100;
        var Posaba = this.posY + 100;
        //this.display = $('#'+objeto).css("display",'block');
     
        
            switch(tipo){
                case "default" :
                    
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{opacity:0},{ opacity:1,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                    break;
                case "aparecer":
                    
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{opacity:0},{ opacity:1,delay:retardo,onComplete:fun});
                    break;
                case "arriba_abajo" :
                    
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{opacity:0,top:Posarr},{top:this.posY,opacity:1,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                    break;
                case "abajo_arriba":
                    
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{opacity:0,top:Posaba},{top:this.posY,  opacity:1,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                    break;
                case "izquierda_derecha":
                  
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{opacity:0,left:Posizq},{left:this.posX,  opacity:1,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                   
                    break;
                  
                case "derecha_izquierda":
                   
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{opacity:0,left:Posder},{left:this.posX,  opacity:1,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                     //console.log(this.posX);
                    break;
                case "ampliar":
                    
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{left:parseInt(this.posX)+(parseInt(this.width)*.5), top:parseInt(this.posY)+(parseInt(this.height)*.5), width:parseInt(this.width)*.1, height:parseInt(this.height)*.1},{left:parseInt(this.posX), top:parseInt(this.posY), width:parseInt(this.width), height:parseInt(this.height), alpha:1, ease:Elastic.easeOut, delay:retardo,onComplete:fun});    
                    break;
                case "reducir":
                    
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{left:parseInt(this.posX), top:parseInt(this.posY), width:(parseInt(this.width))*2, height:(parseInt(this.height))*2},{left:parseInt(this.posX), top:parseInt(this.posY), width:parseInt(this.width), height:parseInt(this.height), alpha:1,  delay:retardo,onComplete:fun});
                    break;

            }
    }
    
    
/***Funciones de salida***/   
    
    this.salida = function(tipo,retardo,fun){
        //console.log("entra a funcion salida");
        //console.log(tipo +" "+ fun);
        
        var animaciones = new Array("default", "arriba_abajo", "abajo_arriba", "izquierda_derecha", "derecha_izquierda", "ampliar", "reducir");
        var tiempo_animacion = 1;
        if (fun == "none" || fun == "") {fun = "nada";}
        if (tipo == undefined) {tipo = "default";}
        if (retardo == undefined) {retardo = 0;}
        if (tipo == "aleatorio"){tipo = animaciones[random(animaciones.length - 1)];}
        
     
        
            switch(tipo){
                case "default" :
                    TweenMax.to($('#'+objeto),tiempo_animacion,{ opacity:0,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                    break;
                    case "desaparecer":
                       TweenMax.to($('#'+objeto),tiempo_animacion,{ opacity:0,delay:retardo,onComplete:fun} );     
                    //TweenMax.to(this.objeto,tiempo_animacion,{autoAlpha:0, delay:retardo,onComplete:fun});
                    break;
                case "arriba_abajo" :
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{top:this.posY},{top:this.posY-100,  opacity:0,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                   break;
                case "abajo_arriba":
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{top:this.posY},{top:this.posY+100,  opacity:0,ease:Back.easeOut,delay:retardo,onComplete:fun} );
                    

                    break;
                case "izquierda_derecha":
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{left:this.posX},{left:this.posX-100,  opacity:0,ease:Back.easeOut,delay:retardo,onComplete:fun} );
				
                    break;
                case "derecha_izquierda":
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{left:Posx},{left:this.posX+100,  opacity:0,ease:Back.easeOut,delay:retardo,onComplete:fun} );

                    break;
                case "ampliar":
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{left:parseInt(this.posX), top:parseInt(this.posY), width:parseInt(this.width), height:parseInt(this.height)},{left:parseInt(this.posX), top:parseInt(this.posY), width:parseInt(this.width)*1.5, height:parseInt(this.height)*1.5, alpha:0, delay:retardo,onComplete:fun});    
                    break;
                case "reducir":
                    TweenMax.fromTo($('#'+objeto),tiempo_animacion,{left:parseInt(this.posX), top:parseInt(this.posY), width:(parseInt(this.width)), height:(parseInt(this.height))},{left:parseInt(this.posX), top:parseInt(this.posY), width:parseInt(this.width)*.5, height:parseInt(this.height)*.5, alpha:0,  delay:retardo,onComplete:fun});
                    break;
              
            }
    }
    
    
}

$(window).resize(function(){
    
    if(widthV != window.innerWidth){
        widthV = window.innerWidth;
        if(!device.match(/iPhone|iPad|iPod/i)){
            location.reload();
        }
        
    }
    
});

function nada(){}
function exe(fun){
    console.log("busca funcion: "+ fun);
    window.fun;
}

var Boton = function (objeto,fun) {
    this.objeto = objeto; 
     
    var opciones = {
     click: function(e) {
         fun();
     },
    mouseover: function(e) {
        this.style.cursor="pointer";
     }   
    }; 
    
    this.objeto.on(opciones);
    
    this.visible = function (x){
        this.objeto.css("opacity",x);
    }
    
    this.activar= function(){
        TweenMax.to(this.objeto, .5, {alpha:1, delay: 0, ease:Circ.easeIn, repeat:-1, yoyo:true, repeatDelay:.5});
    }
    
}

    
    
    
    
