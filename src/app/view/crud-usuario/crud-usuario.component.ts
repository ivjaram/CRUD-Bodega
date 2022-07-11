import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../interface/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioServiceService } from '../../Service/usuario.service.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent implements OnInit {

  
  usuarios:Usuario[] = [];
  usuario: Usuario;
  UsuarioForm: FormGroup;
  message: string = "";
  error: boolean = false;
  guardado: boolean = false;
  actualizar:boolean = false;
  UsuarioActualizar:Usuario;
  constructor(private fb: FormBuilder, private UsuarioService:UsuarioServiceService) {
    this.usuario = new Usuario();
    this.UsuarioActualizar = new Usuario();
    this.UsuarioForm = this.fb.group({
      Apellido: ['', Validators.required],
      Contrasena: ['', Validators.required],
      Correo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Rango: ['', Validators.required]
    }
    )
    this.cargarInfoTabla();
   }

  ngOnInit(): void {
  }
  guardar() {
    let usuario: Usuario = {
      id: 0,
      Apellido: this.UsuarioForm.get("Apellido")?.value,
      Contrasena: this.UsuarioForm.get("Contrasena")?.value,
      Correo: this.UsuarioForm.get("Correo")?.value,
      Nombre: this.UsuarioForm.get("Nombre")?.value,
      Rango: this.UsuarioForm.get("Rango")?.value
    }
    this.UsuarioService.crearUsuario(usuario)
      .subscribe(
        //RESPUESTA CORRECTA
        (respuesta) => {
        this.message = "Usuario guardado con exito.";
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
    this.UsuarioService.obtenerUsuarios().subscribe(
      respuesta => {this.usuarios = respuesta;
                  console.log(this.usuarios);}
    )
  }
  editar(usuario:Usuario){
    this.UsuarioForm.get("Apellido")?.setValue(usuario.Apellido)
    this.UsuarioForm.get("Contrasena")?.setValue(usuario.Contrasena)
    this.UsuarioForm.get("Correo")?.setValue(usuario.Correo)
    this.UsuarioForm.get("Nombre")?.setValue(usuario.Nombre)
    this.UsuarioForm.get("Rango")?.setValue(usuario.Rango)
    this.UsuarioActualizar = usuario;
    this.actualizar = true;
  }
  actualizarUsuario(){
    this.UsuarioActualizar.Apellido = this.UsuarioForm.get("Apellido")?.value,
    this.UsuarioActualizar.Contrasena = this.UsuarioForm.get("Contrasena")?.value,
    this.UsuarioActualizar.Correo = this.UsuarioForm.get("Correo")?.value,
    this.UsuarioActualizar.Nombre = this.UsuarioForm.get("Nombre")?.value,
    this.UsuarioActualizar.Rango = this.UsuarioForm.get("Rango")?.value,
    this.UsuarioService.actualizarUsuario(this.UsuarioActualizar).subscribe(
      respuesta => {
        this.cargarInfoTabla();
        this.actualizar = false;
        this.UsuarioActualizar = new Usuario();
      }

    )
  }
  eliminarUsuario(id:number){
    console.log("HOLa")
    this.UsuarioService.eliminarUsuario(id).subscribe(
      
      respuesta => this.cargarInfoTabla()
    )
  }
  mostrarData(){
    this.UsuarioService.mensaje = "Esta data se encuentra en el servicio"
  }

}
