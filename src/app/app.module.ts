import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './shared/banner/banner.component';
import { CrudProductoComponent } from './view/crud-producto/crud-producto.component';
import { HomeComponent } from './view/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudCrearComponent } from './view/crud-crear/crud-crear.component';
import { CrudEliminarComponent } from './view/crud-eliminar/crud-eliminar.component';
import { CrudActualizarComponent } from './view/crud-actualizar/crud-actualizar.component';
import { CrudListarComponent } from './view/crud-listar/crud-listar.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    CrudProductoComponent,
    HomeComponent,
    CrudCrearComponent,
    CrudEliminarComponent,
    CrudActualizarComponent,
    CrudListarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
