import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  readonly URL = 'https://itsvalencia.herokuapp.com/api/comentarios';

  constructor(private http: HttpClient) {}

  GetComentarios(idLugar: string) {
      return this.http.get<any[]>(this.URL + `/${idLugar}`);
  }
  GetValoracion(idLugar: string) {
      return this.http.get<any>(this.URL + `/valoracion/${idLugar}`);
  }
  GetComentariosUser(idUser: string) {
      return this.http.get<any>(this.URL + `/user/${idUser}`);
  }
  PostComentario(comentario) {
      return this.http.post<any>(this.URL + '/' , comentario);
  }
}
