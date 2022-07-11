import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CrudProductoComponent } from './view/crud-producto/crud-producto.component';
import { CrudUsuarioComponent } from './view/crud-usuario/crud-usuario.component';
import { BodegaComponent } from './view/bodega/bodega.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'bodega', component: BodegaComponent},
  {path: 'productos', component: CrudProductoComponent},
  {path: 'usuarios', component: CrudUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
