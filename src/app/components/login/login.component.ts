import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      localStorage.setItem('user', this.username);
      this.router.navigate(['/home']); // Redirigir después de iniciar sesión
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
