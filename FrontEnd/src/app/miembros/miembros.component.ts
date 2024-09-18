import { Component, OnInit } from '@angular/core';
import { IMiembros } from '../Interfaces/imiembro';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { MiembroService } from '../Services/miembros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miembros',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent implements OnInit {
  listamiembros: IMiembros[] = [];

  constructor(private miembroServicio: MiembroService) {}
  ngOnInit(): void {
    this.cargatabla();
  }
  
  cargatabla() {
    this.miembroServicio.todos().subscribe((data) => {
      this.listamiembros = data;
    });
  }

  eliminar(miembro_id:number)
  {
    Swal.fire({
        title: 'Clubes',
        text: 'Esta seguro que desea eliminar el club!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Emliminar Club'
      }).then((result) => {
        if (result.isConfirmed) {
          this.miembroServicio.eliminar(miembro_id).subscribe((data) => {
            Swal.fire('Club', 'Club eliminado satisfactoriamente.', 'success');
            this.cargatabla();
          });
        }
      });
  
  }

  imprimirMiembro() 
  {
    
      window.open(`http://localhost/codigo/Deber/BackEnd/reports/miembros.report.php`, '_parent');
    
  }
}
