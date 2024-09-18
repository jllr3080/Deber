import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMiembros } from '../Interfaces/imiembro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {
  apiurl = 'http://localhost/codigo/Deber/BackEnd/controllers/miembros.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IMiembros[]> {
    return this.lector.get<IMiembros[]>(this.apiurl + 'todos');
  }

  uno(miembro_id: number): Observable<IMiembros> {
    const formData = new FormData();
    formData.append('miembro_id', miembro_id.toString());
    return this.lector.post<IMiembros>(this.apiurl + 'uno', formData);
  }

  eliminar(miembro_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('miembro_id', miembro_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(miembro: IMiembros): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', miembro.nombre.toString());
    formData.append('apellido', miembro.apellido.toString());
    formData.append('email', miembro.email.toString());
    formData.append('telefono', miembro.telefono.toString());
    formData.append('Clubes_club_id', miembro.Clubes_club_id.toString());
        return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(miembro: IMiembros): Observable<string> {
    const formData = new FormData();
    formData.append('miembro_id', miembro.miembro_id.toString());
    formData.append('nombre', miembro.nombre.toString());
    formData.append('apellido', miembro.apellido.toString());
    formData.append('email', miembro.email.toString());
    formData.append('telefono', miembro.telefono.toString());
    formData.append('Clubes_club_id', miembro.Clubes_club_id.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
