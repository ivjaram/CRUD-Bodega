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
  Usuario: Usuario;
  UsuarioForm: FormGroup;
  message: string = "";
  error: boolean = false;
  guardado: boolean = false;
  actualizar:boolean = false;
  UsuarioActualizar:Usuario;
  constructor(private fb: FormBuilder, private UsuarioServiceService:UsuarioServiceService) {
    this.Usuario = new Usuario();
    this.UsuarioActualizar = new Usuario();
    this.UsuarioForm = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', Validators.required],
      Contrasena: ['', Validators.required],
      Rango: ['', Validators.required]
    }
    )
    this.cargarInfoTabla();
   }

  ngOnInit(): void {
  }
  guardar() {
    let Usuario: Usuario = {
      id: 0,
      Correo: this.UsuarioForm.get("Correo")?.value,
      Nombre: this.UsuarioForm.get("Nombre")?.value,
      Apellido: this.UsuarioForm.get("Apellido")?.value,
      Contrasena: this.UsuarioForm.get("Contrasena")?.value,
      Rango: this.UsuarioForm.get("Rango")?.value
    }
    this.UsuarioServiceService.crearUsuario(Usuario)
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
    this.UsuarioServiceService.obtenerUsuarios().subscribe(
      respuesta => {this.usuarios = respuesta;
                  console.log(this.usuarios);}
    )
  }
  editar(Usuario:Usuario){
    this.UsuarioForm.get("Correo")?.setValue(Usuario.Correo)
    this.UsuarioForm.get("Nombre")?.setValue(Usuario.Nombre)
    this.UsuarioForm.get("Apellido")?.setValue(Usuario.Apellido)
    this.UsuarioForm.get("Contrasena")?.setValue(Usuario.Contrasena)
    this.UsuarioForm.get("Rango")?.setValue(Usuario.Rango)
    this.UsuarioActualizar = Usuario;
    this.actualizar = true;
  }
  actualizarUsuario(){
    this.UsuarioActualizar.Correo = this.UsuarioForm.get("Correo")?.value,
    this.UsuarioActualizar.Nombre = this.UsuarioForm.get("Nombre")?.value,
    this.UsuarioActualizar.Apellido = this.UsuarioForm.get("Apellido")?.value,
    this.UsuarioActualizar.Contrasena = this.UsuarioForm.get("Contrasena")?.value,
    this.UsuarioActualizar.Rango = this.UsuarioForm.get("Rango")?.value,
    this.UsuarioServiceService.actualizarUsuario(this.UsuarioActualizar).subscribe(
      respuesta => {
        this.cargarInfoTabla();
        this.actualizar = false;
        this.UsuarioActualizar = new Usuario();
      }

    )
  }
  eliminarUsuario(id:number){
    console.log("HOLa")
    this.UsuarioServiceService.eliminarUsuario(id).subscribe(
      
      respuesta => this.cargarInfoTabla()
    )
  }


}
