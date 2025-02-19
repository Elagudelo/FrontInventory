import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay un token
  }

  // Verifica si la ruta actual es /login
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  // Cierra la sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token
    localStorage.removeItem('role'); // Elimina el rol
    this.router.navigate(['/login']); // Redirige al login
  }
}