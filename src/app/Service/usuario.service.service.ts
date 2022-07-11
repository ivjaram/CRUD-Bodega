import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  public mensaje = "";

  constructor(private httpClient: HttpClient) { }
  //GET
  obtenerUsuarios(){
    return this.httpClient.get<Usuario[]>("http://localhost:8080/api/v1/usuario/");
  }
  //POST
  crearUsuario(usuario:Usuario){
    return this.httpClient.post("http://localhost:8080/api/v1/usuario/",usuario);
  }
  //DELETE
  eliminarUsuario(id:number){
return this.httpClient.delete(`http://localhost:8080/api/v1/usuario/{id}?id=${id}`);
  }
  //PUT
  actualizarUsuario(usuario:Usuario){
    return this.httpClient.put("http://localhost:8080/api/v1/usuario/",usuario)
  }
}
