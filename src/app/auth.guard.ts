import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('user')) {
      return true;  // Usuario autenticado
    } else {
      this.router.navigate(['/login']);  // Redirigir a login
      return false;
    }
  }
}
