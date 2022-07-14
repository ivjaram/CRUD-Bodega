import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interface/Producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoServiceService } from '../../Service/producto.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-crear',
  templateUrl: './crud-crear.component.html',
  styleUrls: ['./crud-crear.component.css']
})
export class CrudCrearComponent implements OnInit {
  productos:Producto[] = [];
  producto: Producto;
  productoForm: FormGroup;
  message: string = "";
  error: boolean = false;
  guardado: boolean = false;
  actualizar:boolean = false;
  productoActualizar:Producto;

  constructor(public fb: FormBuilder, private productoService: ProductoServiceService,private router:Router) {
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

  }
  guardar() {
    let producto: Producto = {
      id: 0,
      descripcion: this.productoForm.get("descripcion")?.value,
      precio: this.productoForm.get("precio")?.value,
      cantidad: this.productoForm.get("cantidad")?.value
    }
    this.productoService.crearProducto(producto)
      .subscribe(
        //RESPUESTA CORRECTA
        (respuesta) => {
        this.message = "Producto guardado con exito.";
        this.router.navigate(['Listar']);
        this.guardado = !this.guardado;
        setTimeout(() => {
          this.guardado = !this.guardado
        }, 5000);
        this.cargarInfoTabla()
      }, //RESPUESTA INCORRECTA
        error => {
          this.message = error.error;
          this.error = !this.error
          setTimeout(() => {
            this.error = !this.error
          }, 5000);
        })                             
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

}
