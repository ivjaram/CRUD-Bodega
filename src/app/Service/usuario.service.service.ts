import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private HttpClient: HttpClient) { }
  //GET
  obtenerUsuarios(){
    return this.HttpClient.get<Usuario[]>("http://localhost:8080/api/v1/usuario/")
  }
  //POST
  crearUsuario(usuario:Usuario){
    return this.HttpClient.post("http://localhost:8080/api/v1/usuario/",usuario);
  }
  //DELETE
  eliminarUsuario(id:number){
return this.HttpClient.delete(`http://localhost:8080/api/v1/usuario/{id}?id=${id}`);
  }
  //PUT
  actualizarUsuario(Usuario:Usuario){
    return this.HttpClient.put("http://localhost:8080/api/v1/usuario/",Usuario);
  }
}
