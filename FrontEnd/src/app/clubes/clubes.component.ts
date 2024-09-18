import { Component, OnInit } from '@angular/core';
import { IClubes } from '../Interfaces/iclubes';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { ClubesService } from '../Services/clubes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clubes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './clubes.component.html',
  styleUrl: './clubes.component.scss'
})
export class ClubesComponent implements OnInit {
  listaclubes: IClubes[] = [];

  constructor(private clubServicio: ClubesService) {}
  ngOnInit(): void {
    this.cargatabla();
  }
  
  cargatabla() {
    this.clubServicio.todos().subscribe((data) => {
      this.listaclubes = data;
    });
  }

  eliminar(club_id:number)
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
          this.clubServicio.eliminar(club_id).subscribe((data) => {
            Swal.fire('Club', 'Club eliminado satisfactoriamente.', 'success');
            this.cargatabla();
          });
        }
      });
  
  }
}
