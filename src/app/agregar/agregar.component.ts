import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre:string,
  correo:string,
  password:string
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  usuarios:Array<Usuario> = new Array<Usuario>();
  esNuevo:boolean = true;
  formularioCreado!: FormGroup;
  posicionEditar:number = -1;
  constructor(private formBuilder:FormBuilder) { 

  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group({
      nombre:['Carmen',Validators.required],
      correo:['',Validators.compose([
        Validators.required,Validators.email
      ])],
      password:['',Validators.compose([
        Validators.required,Validators.minLength(8)
      ])]
    })
  }

  agregar(){
    this.usuarios.push(this.formularioCreado.value as Usuario);
    this.formularioCreado.reset();
  }
  editar(){
    this.usuarios[this.posicionEditar].nombre = this.formularioCreado.value.nombre;
    this.usuarios[this.posicionEditar].correo = this.formularioCreado.value.correo;
    this.usuarios[this.posicionEditar].password = this.formularioCreado.value.password;
    this.esNuevo = true;
    this.formularioCreado.reset();
    this.posicionEditar = -1;
  }

  editarUsuario(poscion:number){
    this.formularioCreado.setValue({
      nombre:this.usuarios[poscion].nombre,
      correo:this.usuarios[poscion].correo,
      password:this.usuarios[poscion].password
    })
    this.esNuevo = false;
    this.posicionEditar = poscion;
  }

  eliminarUsuario(poscion:number){
    this.usuarios.splice(poscion,1);
  }

  

}
