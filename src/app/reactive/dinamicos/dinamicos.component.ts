import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this._fb.group ({
    nombre: [ '', [Validators.required, Validators.minLength(3)] ],
    favoritos: this._fb.array( [
      [ 'One piece', Validators.required ], [ 'Black clover', Validators.required ]
    ], Validators.required )
  });

  nuevoFavorito: FormControl =  this._fb.control( '', Validators.required );


  constructor( 
    private _fb: FormBuilder   ) { }

  ngOnInit(): void {
  }

  get favoritoArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  esInvalid(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched
  }

  guardar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
    }
  }

  agregar(){
    if (this.nuevoFavorito.invalid) {
      return;
    }

    // this.favoritoArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritoArr.push( this._fb.control(  this.nuevoFavorito.value, Validators.required  ) );

    this.nuevoFavorito.reset();

  }

  borrar( index:number ){

    this.favoritoArr.removeAt(index);
    
  }

}
