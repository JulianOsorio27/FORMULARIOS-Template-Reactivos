import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup( {
  //   nombre: new FormControl('manzanas'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(4)
  // })

  miFormulario: FormGroup =  this._fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3) ] ],
    precio: [ , [ Validators.required, Validators.min(0)] ],
    existencias: [ , [ Validators.required, Validators.min(0)] ]
  })

  constructor( 
    private _fb: FormBuilder   ) { }

  ngOnInit(): void {

    this.miFormulario.reset ({
      nombre:'mango',
      precio: 2000
    });

  }

  esInvalid(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched
  }

  guardar() {
    if( this.miFormulario.invalid ){
      return this.miFormulario.markAllAsTouched();
    }

    this.miFormulario.reset();

  }



}
