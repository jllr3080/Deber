<?php
// TODO: Clase de Factura Tienda Cel@g
require_once('../config/config.php');

class Factura
{
    public function todos() // select * from factura
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT factura.idFactura, clientes.Nombres, (factura.Sub_total + factura.Sub_total_iva) as total FROM `factura` INNER JOIN clientes on factura.Clientes_idClientes = clientes.idClientes";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idFactura) // select * from factura where id = $idFactura
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `factura` INNER JOIN clientes on factura.Clientes_idClientes = clientes.idClientes WHERE `idFactura` = $idFactura";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Fecha, $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes) // insert into factura (Fecha, Sub_total, Sub_total_iva, Valor_IVA, Clientes_idClientes) values (...)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `factura`(`Fecha`, `Sub_total`, `Sub_total_iva`, `Valor_IVA`, `Clientes_idClientes`) 
                       VALUES ('$Fecha', '$Sub_total', '$Sub_total_iva', '$Valor_IVA', '$Clientes_idClientes')";
            //echo $cadena;
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Return the inserted ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idFactura, $Fecha, $Sub_total, $Sub_total_iva, $Valor_IVA, $Clientes_idClientes) // update factura set ... where id = $idFactura
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `factura` SET 
                       `Fecha`='$Fecha',
                       `Sub_total`='$Sub_total',
                       `Sub_total_iva`='$Sub_total_iva',
                       `Valor_IVA`='$Valor_IVA',
                       `Clientes_idClientes`='$Clientes_idClientes'
                       WHERE `idFactura` = $idFactura";
            if (mysqli_query($con, $cadena)) {
                return $idFactura; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idFactura) // delete from factura where id = $idFactura
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `factura` WHERE `idFactura`= $idFactura";
            if (mysqli_query($con, $cadena)) {
                return 1; // Success
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function obtenerDetallesFactura($idFactura)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "SELECT 
                f.idFactura,
                f.Fecha,
                f.Sub_total,
                f.Sub_total_iva,
                f.Valor_IVA,
                c.Nombres AS Nombre_Cliente,
                c.Direccion AS Direccion_Cliente,
                c.Telefono AS Telefono_Cliente,
                c.Cedula AS Cedula_Cliente,
                c.Correo AS Correo_Cliente,
                p.Nombre_Producto,
                p.Graba_IVA,
                k.Cantidad,
                k.Valor_Venta AS Precio_Unitario,
                (k.Cantidad * k.Valor_Venta) AS Sub_Total_item
            FROM 
                factura f
            INNER JOIN 
                clientes c ON f.Clientes_idClientes = c.idClientes
            INNER JOIN 
                kardex k ON k.idKardex = (
                    SELECT MAX(k2.idKardex)
                    FROM kardex k2
                    WHERE k2.Productos_idProductos = k.Productos_idProductos
                    AND k2.Fecha_Transaccion <= f.Fecha
                )
            INNER JOIN 
                productos p ON k.Productos_idProductos = p.idProductos
            WHERE 
                f.idFactura = $idFactura";
            $datos = mysqli_query($con, $cadena);
            if (!$datos) {
                throw new Exception("Error en la consulta: " . mysqli_error($con));
            }
            return $datos;
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
