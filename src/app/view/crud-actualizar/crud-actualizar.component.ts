import { Component, OnInit, Output, Input } from '@angular/core';
import { Producto } from '../../interface/Producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoServiceService } from '../../Service/producto.service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-crud-actualizar',
  templateUrl: './crud-actualizar.component.html',
  styleUrls: ['./crud-actualizar.component.css']
})
export class CrudActualizarComponent implements OnInit {

  productos : Producto[] = [];
  
  producto: Producto;
  productoActualizar:Producto;
  productoForm2: FormGroup;
  actualizar:boolean = false;

  constructor(public fb: FormBuilder, private productoService: ProductoServiceService,private Router:Router) {
    this.producto = new Producto();
    this.productoActualizar = new Producto();
    this.productoForm2 = this.fb.group({
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
     
      
    }
    )
    this.cargarInfoTabla();
    
  }

  ngOnInit(): void {
  }
  actualizarProducto(){
    this.productoActualizar.descripcion = this.productoForm2.get("descripcion")?.value,
    this.productoActualizar.precio = this.productoForm2.get("precio")?.value,
    this.productoActualizar.cantidad = this.productoForm2.get("cantidad")?.value
    this.productoService.actualizarProducto(this.productoActualizar).subscribe(
      respuesta => {
        this.cargarInfoTabla();
        this.actualizar = false;
        this.productoActualizar = new Producto();
      }
      

    )
  }
  cargarInfoTabla(){
    this.productoService.obtenerProductos().subscribe(
      respuesta => {this.productos = respuesta;
                  console.log(this.productos);}
    )
  }
  editar2(producto:Producto){
   
    this.productoForm2.get("descripcion")?.setValue(producto.descripcion)
    this.productoForm2.get("precio")?.setValue(producto.precio)
    this.productoForm2.get("cantidad")?.setValue(producto.cantidad)
    this.productoActualizar = producto;
    this.actualizar = true;
    
  }


}
