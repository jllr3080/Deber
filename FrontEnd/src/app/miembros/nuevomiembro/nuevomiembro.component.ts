import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMiembros } from 'src/app/Interfaces/imiembro';
import { MiembroService } from '../../Services/miembros.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevomiembro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevomiembro.component.html',
  styleUrl: './nuevomiembro.component.scss'
})
export class NuevoMiembroComponent implements OnInit {
  titulo = 'Nuevo Miembro';
  frm_Miembro: FormGroup;
  miembro_id = 0;
   constructor(
    private miembroService: MiembroService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void
   {
    this.frm_Miembro = new FormGroup(
    {
        nombre:new FormControl('', [Validators.required]),
        apellido:new FormControl('', [Validators.required]),
        email:new FormControl('', [Validators.required]),
        telefono:new FormControl('', [Validators.required])
      
    });
    this.miembro_id = parseInt(this.ruta.snapshot.paramMap.get('miembro_id'));

    if (this.miembro_id > 0) {
        this.miembroService.uno(this.miembro_id).subscribe((miembros) => {
         
          this.miembro_id = miembros.miembro_id;
          this.frm_Miembro.controls['nombre'].setValue(miembros.nombre);
          this.frm_Miembro.controls['apellido'].setValue(miembros.apellido);
          this.frm_Miembro.controls['email'].setValue(miembros.email);
          this.frm_Miembro.controls['telefono'].setValue(miembros.telefono);
          this.frm_Miembro.controls['Clubes_club_id'].setValue(miembros.Clubes_club_id);

          
          this.titulo = 'Actualizar Miembro';
        });
      }
};




grabar() {
     let miembro: IMiembros = 
     {
        nombre:this.frm_Miembro.get('nombre')?.value,
        apellido:this.frm_Miembro.get('apellido')?.value,
        email:this.frm_Miembro.get('email')?.value,
        telefono:this.frm_Miembro.get('telefono')?.value,
        Clubes_club_id:this.frm_Miembro.get('Clubes_club_id')?.value,    
       
      };
   
      if (this.miembro_id == 0 || isNaN(this.miembro_id) ){
       this.miembroService.insertar(miembro).subscribe((x) => {
          Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
          this.navegacion.navigate(['/clubes']);
        });
      } 
    else {
        miembro.miembro_id = this.miembro_id;
        this.miembroService.actualizar(miembro).subscribe((x) => {
         Swal.fire('Exito', 'El club se modifico con exito', 'success');
          this.navegacion.navigate(['/clubes']);
        });
      }
  }

   
}

