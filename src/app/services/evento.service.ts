import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  readonly URL = 'https://itsvalencia.herokuapp.com/api/eventos';

  constructor(private http: HttpClient) { }

  // Obtiene todas los eventos //
  getEventos() {
    return this.http.get<any>(this.URL + '/');
  }

  // obtiene eventos pero para los que se han logeo.
  getEventoPrivate() {
    return this.http.get<any>(this.URL + '/evento');
  }

  // Guardar evento
  saveEvento(evento) {
  return this.http.post<any>(this.URL + '/crear', evento);
 }

  // Actualizar evento
  updateEvento(_id: string, evento) {
  return this.http.put(this.URL + '/update' + `/${_id}`, evento);
  }

  // Eliminar evento
  deleteEvento(_id: string) {
  return this.http.delete(this.URL + '/delete' + `/${_id}`);
  }

  // obtiene un evento //
  getEvento(id: string) {
    return this.http.get(this.URL + `/${id}`);
  }

  // Obtiene un evento para los que se han logeado //
  getOneEvento(_id: string) {
    return this.http.get(this.URL + '/evento'  + `/${_id}`);
  }

  // elimina lugares por fecha
  deleteFecha() {
    const inicio = new Date();
    return this.http.delete<any>( this.URL + '/fecha' + `/${inicio}` );
  }
}
