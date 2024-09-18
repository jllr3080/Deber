<?php
include_once('../config/config.php');

class ClubesModel
{
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM clubes";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function uno($club_id)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM clubes WHERE club_id = $club_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function insertar($nombre, $deporte, $fecha_fundacion, $ubicacion)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "INSERT INTO clubes (nombre, deporte, fecha_fundacion, ubicacion) VALUES ($nombre, $deporte, $fecha_fundacion, $ubicacion)";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function actualizar($club_id , $nombre,  $deporte, $fecha_fundacion, $ubicacion)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "UPDATE clubes SET nombre = '$nombre', deporte ='$deporte',fecha_fundacion='$fecha_fundacion', ubicacion='$ubicacion' WHERE club_id = $club_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function eliminar($club_id)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "DELETE FROM clubes WHERE club_id = $club_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    
}
