import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ApisPokemonComponent } from './components/apis-pokemon/apis-pokemon.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard'; 
import { ProductosComponent } from './components/productos-list/productos.component';
import { CategoriaListarComponent } from './components/categoria-listar/categoria-listar.component';
import { ProductoCrearComponent } from './components/productos-crear/producto-crear.component';
import { CategoriasComponent } from './components/categorias-crear/categorias-crear.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, // Elimina el AuthGuard de aquí
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuard] },
  { path: 'endpoint', component: ApisPokemonComponent, canActivate: [AuthGuard] },
  {
    path: 'categorias',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CategoriaListarComponent },
      { path: 'crear', component: CategoriasComponent },
      { path: 'editar/:id', component: CategoriasComponent },
    ],
  },
  {
    path: 'productos',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductosComponent },
      { path: 'crear', component: ProductoCrearComponent },
      { path: 'editar/:id', component: ProductoCrearComponent },
    ],
  },
  { path: '**', redirectTo: '/login' }, // Redirige a login si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Se usa hash para evitar problemas con rutas en producción
  exports: [RouterModule],
})
export class AppRoutingModule {}
