<?php
require('fpdf/fpdf.php');
require_once("../models/miembros.model.php");


class MiembroPDF extends FPDF
{
    function Header()
    {
        $this->SetFont('Arial', 'B', 15);
        $this->Cell(0, 10, 'REPORTE DE MIEMBROS POR CLUB', 0, 1, 'C');
        $this->SetFont('Arial', '', 10);
        $this->Ln(10);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$pdf = new MiembroPDF();
$pdf->AliasNbPages();
$pdf->AddPage();

$miembro = new MiembrosModel();
$miembros = $miembro->reporteMiembro();


 $pdf->SetFont('Arial', 'B', 10);
 $pdf->Cell(60, 7, utf8_decode('Nombre Miembro'), 1);
 $pdf->Cell(40, 7, 'Apellido Miembro', 1);
 $pdf->Cell(30, 7, 'E Mail.', 1);
 $pdf->Cell(30, 7, 'Telefono', 1);
 $pdf->Cell(25, 7, 'Club', 1);
 $pdf->Ln();



while ($miembro = mysqli_fetch_assoc($miembros)) 
{
     
    

      $pdf->Cell(60, 6, utf8_decode($miembro['nombre']), 1);
      $pdf->Cell(40, 6, $miembro['apellido'], 1, 0, 'L');
      $pdf->Cell(30, 6, $miembro['email'], 1, 0, 'L');
      $pdf->Cell(30, 6, $miembro['telefono'], 1, 0, 'L');
      $pdf->Cell(25, 6, 'LDU', 1, 0, 'R');
     
    
      $pdf->Ln();


}

$pdf->Ln();
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(0, 5, 'Privacidad del reporte no se debe copiar o enviar', 0, 1);

$pdf->Output();