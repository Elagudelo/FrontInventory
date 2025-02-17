import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8084/apis/prueba'; // URL del backend en Spring Boot

  constructor(private http: HttpClient) { }

  // Método para obtener los datos desde el backend
  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
