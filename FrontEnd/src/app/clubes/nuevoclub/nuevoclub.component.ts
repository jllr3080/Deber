import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClubes } from 'src/app/Interfaces/iclubes';
import { ClubesService } from '../../Services/clubes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoclub',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevoclub.component.html',
  styleUrl: './nuevoclub.component.scss'
})
export class NuevoClubComponent implements OnInit {
  titulo = 'Nuevo Club';
  frm_Club: FormGroup;
  club_id = 0;
  Detalle: any;
  Tipo;

  constructor(
    private clubService: ClubesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void
   {
    this.frm_Club = new FormGroup(
    {

      nombre: new FormControl('', [Validators.required]),
      deporte: new FormControl('', [Validators.required]),
      fecha_fundacion:new FormControl('', [Validators.required]),
      ubicacion:new FormControl('', [Validators.required])
      
    });
    this.club_id = parseInt(this.ruta.snapshot.paramMap.get('club_id'));
};



//     if (this.idUnidadMedida > 0) {
//       this.unidadService.uno(this.idUnidadMedida).subscribe((unidadmedida) => {
       
//         this.idUnidadMedida = unidadmedida.idUnidad_Medida;
//         this.frm_UnidadMedida.controls['Tipo'].setValue(unidadmedida.Tipo);
//         this.frm_UnidadMedida.controls['Detalle'].setValue(unidadmedida.Detalle);
//         this.titulo = 'Actualizar Proveedor';
//       });
//     }

  
//   }

//   cambio(objetoSleect: any) {
//     this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
//   }
grabar() {
     let club: IClubes = 
     {
        nombre:this.frm_Club.get('deporte')?.value,
        deporte:this.frm_Club.get('deporte')?.value,
        fecha_fundacion:this.frm_Club.get('fecha_fundacion')?.value,
        ubicacion:this.frm_Club.get('ubicacion')?.value      
       
      };
   
      //if (this.club_id == 0 || isNaN(this.club_id) ){
       this.clubService.insertar(club).subscribe((x) => {
          Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
          this.navegacion.navigate(['/clubes']);
        });
      //} 
    //else {
    //    unidadmedida.idUnidad_Medida = this.idUnidadMedida;
    //    this.unidadService.actualizar(unidadmedida).subscribe((x) => {
    //     Swal.fire('Exito', 'La unidad de medida se modifico con exito', 'success');
    //      this.navegacion.navigate(['/unidadmedida']);
    //    });
    //  }
  }

   
}

