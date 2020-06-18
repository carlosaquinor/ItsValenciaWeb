import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  readonly URL = 'https://itsvalencia.herokuapp.com/api/lugares';

  constructor(private http: HttpClient) { }

  // Obtiene todas los Lugares
  getLugares() {
    return this.http.get<any>(this.URL + '/');
  }

  // obtiene lugares pero para los que se han logeo.
  getLugarPrivate() {
    return this.http.get<any>(this.URL + '/lugar');
  }

  // Guardar lugar
  save(lugar) {
  return this.http.post<any>(this.URL + '/crear', lugar);
 }

 // Actualizar lugar
  update(_id: string, lugar) {
  return this.http.put(this.URL + '/update' + `/${_id}`, lugar);
  }

  // Eliminar lugar
  delete(_id: string) {
  return this.http.delete(this.URL + '/delete' + `/${_id}`);
  }

  // obtiene un Lugar
  getLugar(id: string) {
    return this.http.get(this.URL + `/${id}`);
  }

  // Obtiene un Lugar para los que se han logeado
  getOneLugar(_id: string) {
    return this.http.get(this.URL + '/lugar'  + `/${_id}`);
  }

  getbyCategoria(categoria: string) {
    return this.http.get(this.URL + '/categoria'  + `/${categoria}`);
  }

}
