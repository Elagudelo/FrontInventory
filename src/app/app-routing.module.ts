import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ApisPokemonComponent } from './components/apis-pokemon/apis-pokemon.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';  // IMPORTANTE: Importar AuthGuard
import { ProductosComponent } from './components/productos-list/productos.component';
import { CategoriaListarComponent } from './components/categoria-listar/categoria-listar.component';
import { ProductoCrearComponent } from './components/productos/producto-crear.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuard] },
  { path: 'endpoint', component: ApisPokemonComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriaListarComponent, canActivate: [AuthGuard] },

  {
    path: 'productos',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductosComponent }, // Lista de productos
      { path: 'crearproducto', component: ProductoCrearComponent }, // Formulario de creación
      { path: 'crearproducto/:id', component: ProductoCrearComponent },  // Ruta para editar producto
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

