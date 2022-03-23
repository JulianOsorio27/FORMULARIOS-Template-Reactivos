import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this._fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this._validatorService.nombreApellidoPatter ) ]],
    email: ['', [ Validators.required, Validators.pattern(this._validatorService.emailPattern)], [ this._ev ]  ],
    username: ['', [ Validators.required, this._validatorService.noPuedeSerStrider ]  ],
    password: ['', [ Validators.required, Validators.minLength(6)  ]  ],
    password2: ['', [ Validators.required ]  ]

  },
  {
    validators: [ this._validatorService.camposIguales( 'password', 'password2' ) ]
  });  

  get emailErrorMSG():string {
    
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email es oblogatorio'
    }else if (errors?.['pattern']) {
      return 'Esto no tiene formato de un correo '
    } else if( errors?.['emailTomado'] ) {
      return 'Este correo ya esta registrado'
    }

    return '';

  } 

  constructor(
    private _fb:FormBuilder,
    private _validatorService: ValidatorService,
    private _ev:EmailValidatorService  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Julian Osorio',
      email:'test1@test.com',
      username:'alisterblack',
      password: '123456',
      password2: '123456'
    })
  }
  
  campoNoValido = ( campo:string ) => {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched ; 
  }

  submitFormulario = () => {

    this.miFormulario.markAllAsTouched();
  }



  // emailRequired = () => {
  //   return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato = () => {
  //   return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado = () => {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched;
  // }



}
