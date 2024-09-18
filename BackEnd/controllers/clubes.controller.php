<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de proveedores

require_once('../models/clubes.model.php');
error_reporting(0);
$clubes = new ClubesModel;

switch ($_GET["op"]) {
        //TODO: operaciones de proveedores

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los proveedores
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase proveedores.model.php
        $datos = $clubes ->todos(); // Llamo al metodo todos de la clase proveedores.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $club_id = $_POST["club_id"];
        $datos = array();
        $datos = $clubes ->uno($club_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un proveedor en la base de datos
    case 'insertar':
        
        $nombre = $_POST["nombre"];
        $deporte = $_POST["deporte"];
        $fecha_fundacion = $_POST["fecha_fundacion"];
        $ubicacion = $_POST["ubicacion"];
       
        $datos = array();
        $datos = $clubes ->insertar($nombre, $deporte, $fecha_fundacion, $ubicacion);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualziar un proveedor en la base de datos
    case 'actualizar':
        $club_id = $_POST["club_id"];
        $nombre = $_POST["nombre"];
        $deporte = $_POST["deporte"];
        $fecha_fundacion = $_POST["fecha_fundacion"];
        $ubicacion = $_POST["ubicacion"];
        $datos = array();
        $datos = $clubes ->actualizar($club_id, $nombre, $deporte, $fecha_fundacion, $ubicacion);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un proveedor en la base de datos
    case 'eliminar':
        $club_id = $_POST["club_id"];
        $datos = array();
        $datos = $clubes ->eliminar($club_id);
        echo json_encode($datos);
        break;
}
