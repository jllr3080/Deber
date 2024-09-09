import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIva } from '../Interfaces/IIVA';

@Injectable({
  providedIn: 'root'
})
export class ivaService {
  apiurl = 'http://localhost/codigo/Deber/BackEnd/controllers/iva.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IIva[]> {
    return this.lector.get<IIva[]>(this.apiurl + 'todos');
  }

  uno(idUnidad: number): Observable<IIva> {
    const formData = new FormData();
    formData.append('idIVA', idUnidad.toString());
    return this.lector.post<IIva>(this.apiurl + 'uno', formData);
  }

  
}