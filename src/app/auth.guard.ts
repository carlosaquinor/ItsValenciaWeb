import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

// Verifica que este logeado sino le envia a la pagina inicio, eso sirva para que no pueda acceder por el navegador //
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/inicio']);
    return false;
  }
}
