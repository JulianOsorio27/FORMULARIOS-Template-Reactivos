import { Component, OnInit } from '@angular/core';

interface Persona {
  nombre:string;
  favoritos: Favorito [];
}

interface Favorito{
  id:number;
  nombre:string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  juegoNuevo:string = '';

  persona:Persona = {
    nombre:'Julián',
    favoritos:[
      { id:1, nombre:'Team Five Tactics' },
      { id:2, nombre:'Pokemon' }
    ]
  }


  constructor() { }

  ngOnInit(): void {
  }


  guardar = ( ) => {
    console.log('formulario posteado');
  }

  eliminar = (index:number) =>{ 
    this.persona.favoritos.splice(index, 1)  ;
  }

  agregarJuego() {
    const nuevoFav: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.juegoNuevo
    };

    this.persona.favoritos.push({...nuevoFav});
    this.juegoNuevo = '';

  }


}
