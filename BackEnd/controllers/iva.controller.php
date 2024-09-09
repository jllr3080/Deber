<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// Controlador de Unidad de Medida Tienda Cel@g

require_once('../models/iva.model.php');
error_reporting(0);
$iva = new IVA;

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todas las unidades de medida
        $datos = array();
        $datos = $iva->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'uno': // Procedimiento para obtener una unidad de medida por ID
        if (!isset($_POST["idIVA"])) {
            echo json_encode(["error" => "Unidad de Medida ID not specified."]);
            exit();
        }
        $idIVA = intval($_POST["idIVA"]);
        $datos = array();
        $datos = $iva->uno($idIVA);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    
    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
