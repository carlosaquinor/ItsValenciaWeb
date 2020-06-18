import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  readonly URL = 'https://itsvalencia.herokuapp.com/api/news';

  constructor(private http: HttpClient) { }

  // Obtiene todas las noticias
  getNoticias() {
    return this.http.get<any>(this.URL + '/');
  }

  // obtiene noticias pero para los que se han logeo.
  getNoticiasPrivate() {
    return this.http.get<any>(this.URL + '/news');
  }

  // Guardar noticia
  save(noticia) {
  return this.http.post<any>(this.URL + '/crear', noticia);
 }

 // Actualizar noticia
  update(_id: string, noticia) {
  return this.http.put(this.URL + '/update' + `/${_id}`, noticia);
  }

  // Eliminar noticia
  delete(_id: string) {
  return this.http.delete(this.URL + '/delete' + `/${_id}`);
  }

  // obtiene una noticia
  getNoticia(id: string) {
    return this.http.get(this.URL + `/${id}`);
  }

  // Obtiene una noticia para los que se han logeado
  getOneNoticia(_id: string) {
    return this.http.get(this.URL + '/news'  + `/${_id}`);
  }

  getbyCategoria(categoria: string) {
    return this.http.get(this.URL + '/categoria'  + `/${categoria}`);
  }
}
