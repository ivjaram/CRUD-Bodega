import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './shared/banner/banner.component';
import { CrudProductoComponent } from './view/crud-producto/crud-producto.component';
import { CrudUsuarioComponent } from './view/crud-usuario/crud-usuario.component';
import { HomeComponent } from './view/home/home.component';
import { BodegaComponent } from './view/bodega/bodega.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    CrudProductoComponent,
    CrudUsuarioComponent,
    HomeComponent,
    BodegaComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
