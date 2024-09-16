import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { IFactura } from 'src/app/Interfaces/factura';
import { ICliente } from 'src/app/Interfaces/icliente';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { ClientesService } from 'src/app/Services/clientes.service';
import { FacturaService } from 'src/app/Services/factura.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevafactura',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './nuevafactura.component.html',
  styleUrl: './nuevafactura.component.scss'
})
export class NuevafacturaComponent implements OnInit {
  //variables o constantes
  titulo = 'Nueva Factura';
  listaClientes: ICliente[] = [];
  listaClientesFiltrada: ICliente[] = [];
  listaProductos: IProducto[] = [];
  totalapagar: number = 0;
  productoelejido: any[] = [];
  clienteSeleccionado: ICliente | null = null;
  //formgroup
  frm_factura: FormGroup;
  idFactura:number=0;
  ///////
  constructor(
    private clietesServicios: ClientesService,
    private facturaService: FacturaService,
    private navegacion: Router,
    private ruta:ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.frm_factura = new FormGroup({
      Fecha: new FormControl('', Validators.required),
      Sub_total: new FormControl('', Validators.required),
      Sub_total_iva: new FormControl('', Validators.required),
      Valor_IVA: new FormControl('0.15', Validators.required),
      Clientes_idClientes: new FormControl('', Validators.required)
    });

    this.clietesServicios.todos().subscribe({
      next: (data) => {
        this.listaClientes = data;
        this.listaClientesFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.idFactura=parseInt(this.ruta.snapshot.paramMap.get('idFacturas'));
    if (isNaN(this.idFactura))
    {
      this.idFactura=0; 
    }
    if (this.idFactura>0) this.cargarUno();
  }

  cargarUno()
  {

    this.facturaService.uno(this.idFactura).subscribe({
      next: (data) => {
       this.frm_factura.controls['Fecha'].setValue(data.Fecha);
       this.frm_factura.controls['Sub_total'].setValue(data.Sub_total);
       this.frm_factura.controls['Sub_total_iva'].setValue(data.Sub_total_iva);
       this.frm_factura.controls['Clientes_idClientes'].setValue(data.Clientes_idClientes);
       console.log(data);
      },
      error: (e) => {
        console.log(e);
      }
    });

  }

  grabar() {
    let factura: IFactura = {
      Fecha: this.frm_factura.get('Fecha')?.value,
      Sub_total: this.frm_factura.get('Sub_total')?.value,
      Sub_total_iva: this.frm_factura.get('Sub_total_iva')?.value,
      Valor_IVA: this.frm_factura.get('Valor_IVA')?.value,
      Clientes_idClientes: this.frm_factura.get('Clientes_idClientes')?.value
    };
    console.log(this.idFactura);
      if (this.idFactura==0)
      {
          this.facturaService.insertar(factura).subscribe((respuesta) => {
            if (parseInt(respuesta) > 0) {
              alert('Factura grabada');
              this.navegacion.navigate(['/facturas']);
            }
          });
        }
        else
        {
          this.facturaService.actualizar(this.idFactura,factura).subscribe((respuesta) => {
            if (parseInt(respuesta) > 0) {
              alert('Factura Actualizada');
              this.navegacion.navigate(['/facturas']);
            }
          });

        }
  }
  calculos() {
    let sub_total = this.frm_factura.get('Sub_total')?.value;
    let iva = this.frm_factura.get('Valor_IVA')?.value;
    let sub_total_iva = sub_total * iva;
    this.frm_factura.get('Sub_total_iva')?.setValue(sub_total_iva);
    this.totalapagar = parseInt(sub_total) + sub_total_iva;
  }

  cambio(objetoSleect: any) {
    let idCliente = objetoSleect.target.value;
    this.frm_factura.get('Clientes_idClientes')?.setValue(idCliente);
  }

  imprimirFactura() {
    if (this.idFactura > 0) {
      window.open(`http://localhost/codigo/Deber/BackEnd/reports/facturas.report.php?id=${this.idFactura}`, '_blank');
    } else {
      alert('Por favor, guarde la factura antes de intentar imprimirla.');
    }
  }

  agregarProducto(producto: IProducto) {
    const productoExistente = this.productoelejido.find(p => p.idProductos === producto.idProductos);
    if (productoExistente) {
      productoExistente.Cantidad++;
    } else {
      this.productoelejido.push({
        ...producto,
        Cantidad: 0,
        Subtotal: producto.Valor_Venta,
        IVA: producto.Graba_IVA ? producto.Valor_Venta * 0.15 : 0,
        //Total: producto.Graba_IVA ? producto.Valor_Venta * 1.15 : producto.Valor_Venta
      });
    }
    this.calcularTotales();
  }

  calcularTotales() {
    let subtotal = 0;
    let iva = 0;
    let total = 0;

    this.productoelejido.forEach(producto => {
      subtotal += producto.Subtotal;
      iva += producto.IVA;
      total += producto.Total;
    });

    this.frm_factura.patchValue({
      Sub_total: subtotal,
      Sub_total_iva: iva,
      Valor_IVA: iva / subtotal
    });

    this.totalapagar = total;
    this.calculos();
  }
  
  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }
}
