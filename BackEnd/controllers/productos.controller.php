<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: Controlador de productos con Kardex

require_once('../models/productos.model.php');
error_reporting(0);
$producto = new Producto;

switch ($_GET["op"]) {
        // TODO: Operaciones de productos

    case 'todos': // Procedimiento para cargar todos los productos
        $datos = array();
        $datos = $producto->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un producto por ID
        if (!isset($_POST["idProductos"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idProductos = intval($_POST["idProductos"]);
        $datos = array();
        $datos = $producto->uno($idProductos);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo producto y actualizar el kardex
        if (!isset($_POST["Codigo_Barras"]) || !isset($_POST["Nombre_Producto"]) || !isset($_POST["Graba_IVA"]) || !isset($_POST["Unidad_Medida_idUnidad_Medida"]) || !isset($_POST["IVA_idIVA"]) || !isset($_POST["Cantidad"]) || !isset($_POST["Valor_Compra"]) || !isset($_POST["Valor_Venta"]) || !isset($_POST["Proveedores_idProveedores"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $Codigo_Barras = $_POST["Codigo_Barras"];
        $Nombre_Producto = $_POST["Nombre_Producto"];
        $Graba_IVA = intval($_POST["Graba_IVA"]);
        $Unidad_Medida_idUnidad_Medida = intval($_POST["Unidad_Medida_idUnidad_Medida"]);
        $IVA_idIVA = intval($_POST["IVA_idIVA"]);
        $Cantidad = $_POST["Cantidad"];
        $Valor_Compra = $_POST["Valor_Compra"];
        $Valor_Venta = $_POST["Valor_Venta"];
        $Proveedores_idProveedores = intval($_POST["Proveedores_idProveedores"]);

        $datos = array();
        $datos = $producto->insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA, $Unidad_Medida_idUnidad_Medida, $IVA_idIVA, $Cantidad, $Valor_Compra, $Valor_Venta, $Proveedores_idProveedores);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un producto existente
       
        if (!isset($_POST["Codigo_Barras"]) || !isset($_POST["Nombre_Producto"]) || !isset($_POST["Graba_IVA"]) || !isset($_POST["Unidad_Medida_idUnidad_Medida"]) || !isset($_POST["IVA_idIVA"]) || !isset($_POST["Cantidad"]) || !isset($_POST["Valor_Compra"]) || !isset($_POST["Valor_Venta"]) || !isset($_POST["Proveedores_idProveedores"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idKardex = $_POST["idKardex"];
        $idProductos = $_POST["idProductos"];
        $Codigo_Barras  = $_POST["Codigo_Barras"];
        $Nombre_Producto = $_POST["Nombre_Producto"];
        $Graba_IVA = $_POST["Graba_IVA"];
        $idUnidad_Medida = $_POST["Unidad_Medida_idUnidad_Medida"];
        $idIVA = $_POST["IVA_idIVA"];
        $Cantidad = $_POST["Cantidad"];
        $Valor_Compra = $_POST["Valor_Compra"];
        $Valor_Venta = $_POST["Valor_Venta"];
        $idProveedores = $_POST["Proveedores_idProveedores"];
        
/*

    "idProductos": 3,
    "Codigo_Barras": "prueba2",
    "Nombre_Producto": "sda",
    "Graba_IVA": "1",
    "Unidad_Medida_idUnidad_Medida": "3",
    "IVA_idIVA": "1",
    "Cantidad": "1",
    "Valor_Compra": "1",
    "Valor_Venta": "1",
    "Proveedores_idProveedores": "1",
    "idKardex": "2"
 */
        $datos = array();
        $datos = $producto->actualizar($idKardex, $idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA, $idUnidad_Medida, 
        $idIVA, $Cantidad, $Valor_Compra, $Valor_Venta, $idProveedores);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un producto
        if (!isset($_POST["idProductos"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idProductos = intval($_POST["idProductos"]);
        $datos = array();
        $datos = $producto->eliminar($idProductos);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
