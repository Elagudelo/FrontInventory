import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');  // Obtener token
    const role = localStorage.getItem('role');    // Obtener rol

    console.log("Token en localStorage:", token);
    console.log("Rol en localStorage:", role);

    if (token && role) {
      console.log("Acceso permitido");
      return true;  // Permitir acceso
    } else {
      console.log("Acceso denegado. Redirigiendo a /login...");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
