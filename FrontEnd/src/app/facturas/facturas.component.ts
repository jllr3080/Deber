import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IFactura } from '../Interfaces/factura';
import { Router, RouterLink } from '@angular/router';
import { FacturaService } from '../Services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit {
  listafacturas: IFactura[] = [];
  constructor(private facturaService: FacturaService) {}
  ngOnInit(): void {
    this.cargarTodos();
  }


  eliminar(idFactura) 
  {


    Swal.fire({
      title: 'Facturas',
      text: 'Esta seguro que desea eliminar la factura!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Factura'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaService.eliminar(idFactura).subscribe((data) => {
          Swal.fire('Facturas', 'La factura ha sido eliminado.', 'success');
          this.cargarTodos();
        });
      }
    });


    
  
  }

  cargarTodos()
  {

    this.facturaService.todos().subscribe((data: IFactura[]) => {
      this.listafacturas = data;
    });
  }

  imprimirFactura(idFactura: number) {
    
    if (idFactura > 0) {
      Swal.fire('Facturas', 'Usted va a Imprimir la factura($idfactura).', 'success');
      window.open(`http://localhost/codigo/Deber/BackEnd/reports/facturas.report.php?id=${idFactura}`, '_blank');
      
    } else {
      alert('Por favor, guarde la factura antes de intentar imprimirla.');
    }
  }
}
