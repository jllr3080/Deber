<?php
include_once('../config/config.php');

class MiembrosModel
{
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM miembros";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function uno($miembro_id)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM miembros WHERE miembro_id = $miembro_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function insertar($nombre, $apellido, $email, $telefono,$Clubes_club_id)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();

        $cadena = "INSERT INTO `miembros` ( `nombre`, `apellido`, `email`, `telefono`,`Clubes_club_id`) VALUES ('$nombre','$apellido','$email','$telefono','$Clubes_club_id')";
        if (mysqli_query($con, $cadena)) {
            return $con->insert_id;
        } else {
            return $con->error;
        }
        
        $con->close();
    }
    public function actualizar($miembro_id , $nombre, $apellido, $email, $telefono,$Clubes_club_id)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "UPDATE `miembros` SET `nombre`='$nombre',`apellido`='$apellido',`email`='$email',`telefono`='$telefono',`Clubes_club_id`='$Clubes_club_id' WHERE `miembro_id` = $miembro_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function eliminar($miembro_id)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "DELETE FROM miembros WHERE miembro_id = $miembro_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }

    public function reporteMiembro()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "select m.nombre,m.apellido,m.email,m.telefono,c.nombre as nombreClub,c.deporte,c.ubicacion from sexto.miembros m
                    inner join   sexto.clubes c on  c.club_id=m.Clubes_club_id";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    
}
