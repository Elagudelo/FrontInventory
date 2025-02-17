import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8084'; // Ruta base común

  constructor(private http: HttpClient) { }

  // Método para obtener datos desde el endpoint '/apis/prueba'
  DatosDB(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/apis/prueba`)
      .pipe(
        tap(data => {
          console.log("Datos recibidos de /apis/prueba:", data);
        })
      );
  }

  ListarProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos/listar`)
      .pipe(
        tap(data => {
          console.log("Datos recibidos de /productos/listar:", data);
        })
      );
  }

  // Método para guardar un producto
  guardarProducto(producto: any): Observable<any> {
    console.log("📤 Datos enviados al servicio:", JSON.stringify(producto, null, 2));

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/productos/crear`, producto, { headers })
      .pipe(
        tap(response => console.log("✅ Producto guardado en el backend:", response)),
        catchError(error => {
          console.error("❌ Error al guardar producto en el backend:", error);
          if (error.error) {
            console.error("🔍 Respuesta del servidor:", JSON.stringify(error.error, null, 2));
          }
          return throwError(() => new Error(error?.error?.message || "Error desconocido al guardar el producto"));
        })
      );
  }


  eliminarProducto(id: number): Observable<void> {
    console.log("📤 Eliminar producto con ID:", id);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete<void>(`${this.apiUrl}/productos/eliminar/${id}`, { headers })
      .pipe(
        tap(() => console.log(`✅ Producto con ID ${id} eliminado`)),
        catchError(error => {
          console.error("❌ Error al eliminar producto:", error);
          return throwError(() => new Error(error?.error?.message || "Error desconocido al eliminar el producto"));
        })
      );
  }
  // Método para editar un producto
  editarProducto(id: number, producto: any): Observable<any> {
    console.log("📤 Editar producto con ID:", id);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(`${this.apiUrl}/productos/editar/${id}`, producto, { headers })
      .pipe(
        tap(response => console.log(`✅ Producto con ID ${id} actualizado`, response)),
        catchError(error => {
          console.error("❌ Error al editar producto:", error);
          return throwError(() => new Error(error?.error?.message || "Error desconocido al editar el producto"));
        })
      );
  }

  // Método para obtener datos desde el endpoint '/api/pokemon/ditto'
  PokemonApi(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/pokemon/ditto`)
      .pipe(
        tap(data => {
          console.log("Datos recibidos de /api/pokemon/ditto:", data);
        })
      );
  }

  ApiDos(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/personaje/${id}`)
      .pipe(
        tap(data => {
          console.log("Datos recibidos de APIDOS:", data);
        })
      );
  }

  eliminarPersonaje(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/apis/personaje/${id}`)
      .pipe(
        tap(response => {
          console.log("Respuesta del endpoint eliminarPersonaje:", response);
        })
      );
  }

  ApiPorNombre(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/personaje/nombre/${name}`)
      .pipe(
        tap(data => {
          console.log("Datos recibidos de ApiPorNombre:", data);
        })
      );
  }

  guardarPersonaje(personaje: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/guardar`, personaje);
  }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/api/usuarios/login`, loginData)
      .pipe(
        tap(response => {
          console.log("Respuesta del login:", response);
          localStorage.setItem('token', response.token); // Guardamos el token
        })
      );
  }



}