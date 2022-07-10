import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interface/Producto';
import { ProductoServiceService } from '../../Service/producto.service.service';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  productos:Producto[] = [];
  producto: Producto;
  productoForm: FormGroup;
  message: string = "";
  error: boolean = false;
  guardado: boolean = false;
  actualizar:boolean = false;
  productoActualizar:Producto;

  constructor(private fb: FormBuilder, private productoService: ProductoServiceService) {
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

  eliminarProducto(id:number){
    console.log("HOLa")
    this.productoService.eliminarProducto(id).subscribe(
      
      respuesta => this.cargarInfoTabla()
    )
  }

  mostrarData(){
    this.productoService.mensaje = "Esta data se encuentra en el servicio"
  }
}
