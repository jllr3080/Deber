<?php
require('fpdf/fpdf.php');
require_once("../models/factura.model.php");
require_once("../models/productos.model.php");

class FacturaPDF extends FPDF
{
    function Header()
    {
        $this->SetFont('Arial', 'B', 15);
        $this->Cell(0, 10, 'HUGO HERRERA - 6TO SOFTWARE', 0, 1, 'C');
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 5, 'RUC: 1234567890', 0, 1, 'C');
        $this->Cell(0, 5, utf8_decode('Dirección: Calle Falsa 123, Quito, Ecuador'), 0, 1, 'C');
        $this->Cell(0, 5, utf8_decode('Teléfono: +593 999 999 999'), 0, 1, 'C');
        $this->Cell(0, 5, 'Email: info@empresa.com', 0, 1, 'C');
        $this->Ln(10);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$pdf = new FacturaPDF();
$pdf->AliasNbPages();
$pdf->AddPage();

$factura = new Factura();
$idFactura = isset($_GET['id']) ? $_GET['id'] : 1;
$detallesFactura = $factura->obtenerDetallesFactura($idFactura);

if (!$detallesFactura || mysqli_num_rows($detallesFactura) == 0) {
    die("No se encontraron detalles para la factura especificada.");
}

$infoFactura = mysqli_fetch_assoc($detallesFactura);
mysqli_data_seek($detallesFactura, 0);  

// Información de la factura
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'Factura', 0, 1, 'R');
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(0, 5, 'No. 001-001-' . str_pad($infoFactura['idFactura'], 9, '0', STR_PAD_LEFT), 0, 1, 'R');
$pdf->Cell(0, 5, 'Fecha: ' . $infoFactura['Fecha'], 0, 1, 'R');

$pdf->Ln(10);

// Información del cliente
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'Datos del Cliente', 0, 1);
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(40, 5, utf8_decode('Cédula:'), 0);
$pdf->Cell(0, 5, $infoFactura['Cedula_Cliente'], 0, 1);
$pdf->Cell(40, 5, 'Nombres:', 0);
$pdf->Cell(0, 5, utf8_decode($infoFactura['Nombre_Cliente']), 0, 1);
$pdf->Cell(40, 5, utf8_decode('Teléfono:'), 0);
$pdf->Cell(0, 5, $infoFactura['Telefono_Cliente'], 0, 1);
$pdf->Cell(40, 5, utf8_decode('Dirección:'), 0);
$pdf->Cell(0, 5, utf8_decode($infoFactura['Direccion_Cliente']), 0, 1);
$pdf->Cell(40, 5, 'Correo:', 0);
$pdf->Cell(0, 5, $infoFactura['Correo_Cliente'], 0, 1);

$pdf->Ln(10);

// Detalle de la factura
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(60, 7, utf8_decode('Descripción'), 1);
$pdf->Cell(20, 7, 'Cantidad', 1);
$pdf->Cell(30, 7, 'Precio Unit.', 1);
$pdf->Cell(30, 7, 'Subtotal', 1);
$pdf->Cell(25, 7, 'IVA', 1);
$pdf->Cell(25, 7, 'Total', 1);
$pdf->Ln();

$pdf->SetFont('Arial', '', 9);

$subtotal = 0;
$totalIVA = 0;
$total = 0;

while ($producto = mysqli_fetch_assoc($detallesFactura)) {
    $cantidad = $producto['Cantidad'];
    $precioUnitario = $producto['Precio_Unitario'];
    $subtotalProducto = $producto['Sub_Total_item'];
    $ivaProducto = $producto['Graba_IVA'] ? $subtotalProducto * 0.15 : 0;  // Assuming 15% IVA
    $totalProducto = $subtotalProducto + $ivaProducto;

    $pdf->Cell(60, 6, utf8_decode($producto['Nombre_Producto']), 1);
    $pdf->Cell(20, 6, $cantidad, 1, 0, 'R');
    $pdf->Cell(30, 6, number_format($precioUnitario, 2), 1, 0, 'R');
    $pdf->Cell(30, 6, number_format($subtotalProducto, 2), 1, 0, 'R');
    $pdf->Cell(25, 6, number_format($ivaProducto, 2), 1, 0, 'R');
    $pdf->Cell(25, 6, number_format($totalProducto, 2), 1, 0, 'R');
    $pdf->Ln();

    $subtotal += $subtotalProducto;
    $totalIVA += $ivaProducto;
    $total += $totalProducto;
}

$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(140, 7, 'Subtotal', 1, 0, 'R');
$pdf->Cell(50, 7, number_format($subtotal, 2), 1, 0, 'R');
$pdf->Ln();
$pdf->Cell(140, 7, 'IVA', 1, 0, 'R');
$pdf->Cell(50, 7, number_format($totalIVA, 2), 1, 0, 'R');
$pdf->Ln();
$pdf->Cell(140, 7, 'Total a Pagar', 1, 0, 'R');
$pdf->Cell(50, 7, number_format($total, 2), 1, 0, 'R');

$pdf->Ln(20);

// Información adicional
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(0, 5, 'Forma de pago: Transferencia Bancaria', 0, 1);
$pdf->Cell(0, 5, 'Cuenta Bancaria: Banco Pichincha, Cta: 123456789', 0, 1);
$pdf->Cell(0, 5, 'Nota: Gracias por su compra.', 0, 1);

$pdf->Output();