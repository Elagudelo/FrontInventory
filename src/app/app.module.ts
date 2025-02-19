import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ApisPokemonComponent } from './components/apis-pokemon/apis-pokemon.component';
import { HomeComponent } from './components/home/home.component'; // Agregar HomeComponent aquí
import { LoginComponent } from './components/login/login.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CategoriasComponent } from './components/categorias-crear/categorias-crear.component';
import { ProductosComponent } from './components/productos-list/productos.component';
import { ProductoCrearComponent } from './components/productos-crear/producto-crear.component';
import { CategoriaListarComponent } from './components/categoria-listar/categoria-listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Importar ReactiveFormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ApisPokemonComponent,
    LoginComponent,
    ProveedoresComponent,
    CategoriasComponent,
    ProductosComponent,
    ProductoCrearComponent,
    CategoriaListarComponent,
    CategoriasComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,  
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
