import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interface/Producto';
import { ProductoServiceService } from '../../Service/producto.service.service';

@Component({
  selector: 'app-crud-eliminar',
  templateUrl: './crud-eliminar.component.html',
  styleUrls: ['./crud-eliminar.component.css']
})
export class CrudEliminarComponent implements OnInit {

  constructor( private ProductoService: ProductoServiceService) { }

  productos : Producto[] = [];

  ngOnInit(): void {
    this.ProductoService.obtenerProductos()
    .subscribe( productos => this.productos = productos);
  }
  cargarInfoTabla(){
    this.ProductoService.obtenerProductos().subscribe(
      respuesta => {this.productos = respuesta;
                  console.log(this.productos);}
    )
  }
  eliminarProducto(id:number){
    if(window.confirm("¿Desea Borrar este registro?")){
      this.ProductoService.eliminarProducto(id).subscribe(
      
        respuesta => this.cargarInfoTabla()
      )
    }
  }
  

}
