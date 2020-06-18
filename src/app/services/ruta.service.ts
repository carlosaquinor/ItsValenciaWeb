import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RutaService {

 readonly URL = 'https://itsvalencia.herokuapp.com/api/rutas';

  constructor(private http: HttpClient) { }

  // Obtiene todas las rutas //
  getRutas() {
    return this.http.get<any>(this.URL + '/');
  }
  // obtiene rutas pero para los que se han logeo.
  getRutaPrivate() {
    return this.http.get<any>(this.URL + '/ruta');
  }
  // Guardar ruta
  saveRuta(ruta) {
  return this.http.post<any>(this.URL + '/crear', ruta);
 }
 // Actualizar ruta
  updateRuta(_id: string, ruta) {
  return this.http.put(this.URL + '/update' + `/${_id}`, ruta);
  }
 // Eliminar ruta
  deleteRuta(_id: string) {
  return this.http.delete(this.URL + '/delete' + `/${_id}`);
  }
 // obtiene un ruta //
  getRuta(id: string) {
    return this.http.get(this.URL + `/${id}`);
  }
  // Obtiene una ruta para los que se han logeado //
  getOneRuta(_id: string) {
    return this.http.get(this.URL + '/ruta'  + `/${_id}`);
  }
  // elimina rutas por fecha
  deleteFecha() {
    const fecha = new Date();
    return this.http.delete<any>(`${this.URL}/fecha/${fecha}`);
}
}
