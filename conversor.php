<?php
    $ruta = 'example.xlsx';
    if(isset($_POST['submit'])){
        // echo "Nombre: " . $_FILES['excel']['name'] . "<br>";
        // echo "Tipo: " . $_FILES['excel']['type'] . "<br>";
        // echo "Tamaño: " . ($_FILES["excel"]["size"] / 1024) . " kB<br>";
        // echo "Carpeta temporal: " . $_FILES['excel']['tmp_name'];
        // echo "Se subió el archivo en la ruta: ".$_FILES['excel']['tmp_name'];
        $ruta = 'excel/'.$_FILES['excel']['name'];
        if(file_exists($ruta)){
            unlink($ruta);
        }
        move_uploaded_file($_FILES['excel']['tmp_name'],$ruta);
    }else{
        // echo "No se ha subido el archivo";
    }
    require('Simplexlsx.php');
    define('SUSPEND_DATA', 'suspend_data');
    $xlsx = new SimpleXLSX( $ruta ); // Archivo a leer
    $filas = $xlsx->rows();
    $numRows = sizeof($filas);
    $columnas = $filas[0];
    unset($filas[0]);
    // for ($i=1; $i < $numRows; $i++) { 
    //   $fila = $columnas[$i];
    //   $vacio = true;
    //   for($j = 0; $j < sizeof($fila) ; $j++ ){
    //     $elemento = $fila[$j];
    //   // foreach($fila as $elemento){
    //     if($elemento != ''){
    //       $vacio = false;
    //     }
    //   }
    //   if(!$vacio){
    //     unset($filas[$i]);
    //   }
    // }
    $index_suspend_data = array_search(SUSPEND_DATA, $columnas);
    if($index_suspend_data == null){
        echo "No existe en el documento la columna suspend_data o no está en la primera fila, colóquela ahí<br>";
        return;
    }
    array_push($columnas, 'Resolución');
    array_push($columnas, 'Sistema Operativo');
    array_push($columnas, 'Navegador');
    array_push($columnas, 'suspend_data desencriptado');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- Archivos necesarios para dataTables -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.1.0/material.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.material.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css">
</head>
<body>
    <div>
        <form enctype="multipart/form-data" method="POST">
            <input type="file" name="excel" id="excel" required>
            <input type="submit" value="Subir archivo" name="submit">
        </form>
        <table id="tabla_informacion">
            <thead>
                <tr>
                    <?php
                    foreach ($columnas as $columna) {
                        echo "<th>{$columna}</th>";
                    } ?>
                </tr>
            </thead>

        </table>
    </div>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="scripts/config.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script>
    <script>
        <?php
            echo "var filas = " . json_encode($filas) . ";
            ";
            echo "var index_suspend_data = {$index_suspend_data};
            ";
        ?>
        var tabla_informacion = $('#tabla_informacion').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.11/i18n/Spanish.json"
            },
            dom: 'Bfrtip',
            bFilter: false,
            responsive: true,
            buttons: [
                'csv', 'excelHtml5', 'pdf', 'print'
            ],
        });
        for (var clave in filas){
            if (filas.hasOwnProperty(clave)) {
                var nuevo_elemento = [];
                var vacio = true;
                if(filas[clave][index_suspend_data] != ''){
                    for (let index = 0; index < filas[clave].length; index++) {
                        nuevo_elemento.push(filas[clave][index]);
                    }
                    var suspend_data_encriptado = filas[clave][index_suspend_data];
                    var suspend_data = lzw_decode(suspend_data_encriptado);
                    
                    elementos = suspend_data.split(';'); // Primer elemento es la información de la máquina, segundo es información de las páginas
                    // console.log(elementos);
                    var info_usuario = elementos[0];


                    var resolucion = info_usuario.substring(info_usuario.length - 2, info_usuario.length);
                    resolucion = obtenerResolucion(resolucion);
                    var so = obtenerSO(info_usuario.substring(0, 2));
                    var navegador = info_usuario.substring(2, 3);
                    navegador = obtenerNavegador(navegador);
                    // alert(navegador);
                    var localizacion = obtenerLocalizacion(info_usuario);

                    nuevo_elemento.push(resolucion);
                    nuevo_elemento.push(so);
                    nuevo_elemento.push(navegador);
                    nuevo_elemento.push(info_usuario);
                    // console.log(nuevo_elemento);
                    tabla_informacion.row.add(nuevo_elemento);
                }
            }
        }
        
        function formatearHora(hora){
            return hora.substring(0,2) + ":" + hora.substring(2,4) + ":00";
        }

        function obtenerNombre(id){
            for (var i = 0; i < pages.length; i++) {
                if(pages[i].id == id){
                    return pages[i].title;
                }
            }
            return "No encontrado";
        }

        function obtenerUrl(id){
            for (var i = 0; i < pages.length; i++) {
                if(pages[i].id == id){
                    return pages[i].url;
                }
            }
            return "No encontrado";
        }


        function calcularDiferencia(hora1, hora2){
            //Se convierten las horas a minutos
            var hora1 = (parseInt(hora1.substring(0, 2)) * 60) + parseInt(hora1.substring(2, 4));
            var hora2 = (parseInt(hora2.substring(0, 2)) * 60) + parseInt(hora2.substring(2, 4));
            return hora2 - hora1;
        }

        function convierteAHoras(minutos){
            while(minutos < 0){
                minutos = (12*60) - minutos;
            }
            if (minutos > 59) {
                var horas = parseInt(minutos/60);
                var minutos = minutos - (horas * 60);
                if(horas<10){	horas = "0" + horas.toString();	}
            }else{
                horas = "00";
            }
            if(minutos<10){
                minutos = "0" + minutos.toString();
            }
            return horas.toString() + minutos.toString();
        }

        function obtenerSO(codigo){
            var so = '-';
            clientStrings.forEach(function(client){
                if(client.s == codigo){
                    so = client.r;
                }
            });
            return so;
        }

        function obtenerNavegador(codigo){
            var nav = '-';
            navegadores.forEach( function( navegador ){
                if(navegador.id == codigo){
                    nav = navegador.nombre;
                }
            });
            return nav;
        }

        function obtenerLocalizacion(info_usuario){
            if(info_usuario.charAt(3) != '-' ){
                return info_usuario.substring(3, 14);
            }else{
                return "No se permitió acceso a la localización";
            }
        }

        function obtenerResolucion( codigo ){
            // alert(codigo);
            var resolucion = "";
            resoluciones.forEach( function(elemento){
                // console.log(elemento.id);
                if(elemento.id == codigo){
                    resolucion =  elemento.resolucion;
                }else{
                    // console.log("No coincide " + elemento.id + " con " + codigo);
                }
            });
            return resolucion;
        }


    </script>
</body>
</html>
