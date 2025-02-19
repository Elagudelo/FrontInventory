import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/central.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router,private itemService: ItemService) {}

  onSubmit() {
    this.itemService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log("Inicio de sesión exitoso:", response);
        localStorage.setItem('token', response.token); // Guarda el token en el localStorage
        localStorage.setItem('role', response.role);  // Guarda el rol en el localStorage
  
        console.log("Esperando 500ms antes de redirigir...");
        setTimeout(() => {
          this.router.navigate(['/home']);  // Redirige al home después del login
        }, 500);
      },
      error: (error: any) => {
        console.error("Error en el login:", error);
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
  
}  