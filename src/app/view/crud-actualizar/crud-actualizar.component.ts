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
  productoForm: FormGroup;
  actualizar:boolean = false;

  constructor(public fb: FormBuilder, private productoService: ProductoServiceService,private Router:Router) {
    this.producto = new Producto();
    this.productoActualizar = new Producto();
    this.productoForm = this.fb.group({
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required]
     
      
    }
    )
    
    this.cargarInfoTabla();
    
  }

  ngOnInit(): void {
    this.productoService.obtenerProductos()
    .subscribe( productos => this.productos = productos);
    
  }
  actualizarProducto(){
    this.productoActualizar.descripcion = this.productoForm.get("descripcion")?.value,
    this.productoActualizar.precio = this.productoForm.get("precio")?.value,
    this.productoActualizar.cantidad = this.productoForm.get("cantidad")?.value
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
  editar(producto:Producto){
   
    this.productoForm.get("descripcion")?.setValue(producto.descripcion)
    this.productoForm.get("precio")?.setValue(producto.precio)
    this.productoForm.get("cantidad")?.setValue(producto.cantidad)
    this.productoActualizar = producto;
    this.actualizar = true;
    
  }
  Limpiar(){
    this.productoForm.get("descripcion")?.setValue("")
    this.productoForm.get("precio")?.setValue("")
    this.productoForm.get("cantidad")?.setValue("")
  }

}
