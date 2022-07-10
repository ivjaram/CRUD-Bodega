import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interface/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  public mensaje = "";

  constructor(private httpClient: HttpClient) { }
    //GET
    obtenerProductos() {
      return this.httpClient.get<Producto[]>("http://localhost:8080/api/v1/producto");
    }
  
    //POST
    crearProducto(producto:Producto) {
      return this.httpClient.post("http://localhost:8080/api/v1/producto/", producto);
    }
  
    //DELETE
    eliminarProducto(id:number) {
      return this.httpClient.delete(`http://localhost:8080/api/v1/producto/{id}?id=${id}`);
    }
  
    //PUT
    actualizarProducto(producto:Producto) {
      return this.httpClient.put("http://localhost:8080/api/v1/producto/", producto)
    }
}
