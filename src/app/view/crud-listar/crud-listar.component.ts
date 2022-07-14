import { Component, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../../interface/Producto';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductoServiceService } from '../../Service/producto.service.service';
import { Router, RouterLink } from '@angular/router'



@Component({
  selector: 'app-crud-listar',
  templateUrl: './crud-listar.component.html',
  styleUrls: ['./crud-listar.component.css']
})
export class CrudListarComponent implements OnInit {
 id:undefined;

  productos : Producto[] = [];
  producto: Producto;
  productoActualizar:Producto;
  productoForm: FormGroup;
  actualizar:boolean = false;
  
  constructor(private fb: FormBuilder, private productoService: ProductoServiceService,private Router:Router) {
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
  cargarInfoTabla(){
    this.productoService.obtenerProductos().subscribe(
      respuesta => {this.productos = respuesta;
                  console.log(this.productos);}
    )
  }

  ngOnInit(): void {
    this.productoService.obtenerProductos()
    .subscribe( productos => this.productos = productos);
 
   
  }
  editar(producto:Producto){
    this.Router.navigateByUrl("/Actualizar")
    this.productoForm.get("descripcion")?.setValue(producto.descripcion)
    this.productoForm.get("precio")?.setValue(producto.precio)
    this.productoForm.get("cantidad")?.setValue(producto.cantidad)
    this.productoActualizar = producto;
    this.actualizar = true;
    
  }
 
}
