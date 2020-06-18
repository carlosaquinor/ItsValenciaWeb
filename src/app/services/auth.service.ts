import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL = 'https://itsvalencia.herokuapp.com/api';

  constructor( private http: HttpClient, private router: Router) { }
  // Se registra el usuario //
  signUp(user) {
   return this.http.post<any>(this.URL + '/registrar', user);
  }
// Login de usuario
  signIn(user) {
    return this.http.post<any>(this.URL + '/login', user);
   }
// Guardar el toquen //
   loggedIn() {
    return !!localStorage.getItem('token');
  }
// Eliminar el toquen //
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']);
  }
// traer el toquen //
  getToken() {
    return localStorage.getItem('token');
  }
    // Obtiene Datos del usuario
    getProfile() {
      const reqHeader = new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken()
      });
      return this.http.get<any>(this.URL + '/profile', {headers: reqHeader});
  }
 // Verificar las contraseñas sean iguales
  passwordsIguales( pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    };
  }

}
