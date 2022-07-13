import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';

import { CrudCrearComponent } from './view/crud-crear/crud-crear.component';
import { CrudEliminarComponent } from './view/crud-eliminar/crud-eliminar.component';
import { CrudActualizarComponent } from './view/crud-actualizar/crud-actualizar.component';
import { CrudListarComponent } from './view/crud-listar/crud-listar.component';

const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: 'crear', component: CrudCrearComponent},
  {path: 'Eliminar', component: CrudEliminarComponent},
  {path: 'Actualizar', component: CrudActualizarComponent},
  {path: 'Listar', component: CrudListarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
