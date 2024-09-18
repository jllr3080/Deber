import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClubes } from '../Interfaces/iclubes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubesService {
  apiurl = 'http://localhost/codigo/Deber/BackEnd/controllers/clubes.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IClubes[]> {
    return this.lector.get<IClubes[]>(this.apiurl + 'todos');
  }

  uno(club_id: number): Observable<IClubes> {
    const formData = new FormData();
    formData.append('club_id', club_id.toString());
    return this.lector.post<IClubes>(this.apiurl + 'uno', formData);
  }

  eliminar(club_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('club_id', club_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(miembro: IClubes): Observable<string> {
    const formData = new FormData();
    
    formData.append('nombre', miembro.nombre.toString());
    formData.append('deporte', miembro.deporte.toString());
    formData.append('ubicacion', miembro.ubicacion.toString());
    formData.append('fecha_fundacion', miembro.fecha_fundacion.toString());

    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(miembro: IClubes): Observable<string> {
    const formData = new FormData();
    formData.append('club_id', miembro.club_id.toString());
    formData.append('nombre', miembro.nombre.toString());
    formData.append('deporte', miembro.deporte.toString());
    formData.append('ubicacion', miembro.ubicacion.toString());
    formData.append('fecha_fundacion', miembro.fecha_fundacion.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
