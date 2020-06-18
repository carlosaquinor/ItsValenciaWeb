import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-eventocrear',
  templateUrl: './eventocrear.component.html',
  styleUrls: ['./eventocrear.component.css']
})
export class EventocrearComponent implements OnInit {

  minDate: any;

  messageError: string;
  edit: boolean;
  evento: FormGroup;

  user: any =  {_id: '' };

  eventos: any = {
    _id: '',
    imagen: '',
    nombre: '',
    descripcion: '',
    direccion: '',
    inicio: '',
    final: '',
    coste: '',
    organizador: '',
    idusuario: '',
    publicado: false,
};
  constructor(private fb: FormBuilder, private eventoService: EventoService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.createEventoForm();
  }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params; // Se toma el parametro se guarda en la variable.
    this.fecha();
    this.getUser();
    if (params.id) {                                    // Si existe parametro id entra en el metodo encontrar una evento
      this.getEvento(params.id);
    }
  }

  createEventoForm() {
      this.evento = this.fb.group({
        imagen: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        direccion: ['', Validators.required],
        inicio: ['', Validators.required],
        final: [''],
        showEnd: [''],
        coste: ['', Validators.required],
        organizador: ['', Validators.required],
        publicado: [true]
      });
  }
// metodo que retorna un true o false si el control del formulario es invalido o si fue tocado
  get direccionNoValido() {
    return this.evento.get('direccion').invalid && this.evento.get('direccion').touched;
  }
  get NoValido() {
    return this.evento.get('coste').invalid && this.evento.get('coste').touched;
  }
  get imagenNoValido() {
    return this.evento.get('imagen').invalid && this.evento.get('imagen').touched;
  }
  get tituloNoValido() {
    return this.evento.get('nombre').invalid && this.evento.get('nombre').touched;
  }
  get descripcionNoValido() {
    return this.evento.get('descripcion').invalid && this.evento.get('descripcion').touched;
  }
  get contactoNoValido() {
    return this.evento.get('organizador').invalid && this.evento.get('organizador').touched;
  }

// guardar evento
  guardar() {
    if ( this.evento.invalid ) {

      return Object.values( this.evento.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.evento.value.idusuario = this.user._id;
    this.eventoService.saveEvento(this.evento.value)
      .subscribe( res => {
          console.log(res);
          this.evento.reset();
          this.router.navigate(['/eventolistar']);
        }, (err) => {
          this.messageError = err.error;
      });


    /*  */

  }
// actualizar evento
  update() {
    if ( this.evento.invalid ) {

      return Object.values( this.evento.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.eventoService.updateEvento(this.eventos._id, this.evento.value)
      .subscribe( res => {
          this.evento.reset();
          this.router.navigate(['/eventolistar']);
        }, (err) => {
          this.messageError = err.error;
      });
  }
// Se obtiene una evento
  getEvento(id: string) {
    this.eventoService.getOneEvento(id)
        .subscribe(
          res => {
            this.eventos = res;
            this.edit = true;
            delete this.eventos.publicado;
            this.eventos.inicio =  this.eventos.inicio.slice(0, 16);
            if (this.eventos.final != null) {
              this.eventos.final = this.eventos.final.slice(0, 16);
            }
            this.cargarFormulario(this.eventos);
          },
          err => console.log(err)
        );
  }
  // Carga los datos recibidos en mi formulario en cada formControl
  cargarFormulario(data: any) {
    this.evento = this.fb.group({
      imagen: [data.imagen, Validators.required],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      direccion: [data.direccion, Validators.required],
      inicio: [data.inicio, Validators.required],
      final: [data.final],
      showEnd: [''],
      coste: [data.coste, Validators.required],
      organizador: [data.organizador, Validators.required],
      idusuario: [data.idusuario],
      publicado: [true]
   });
  }

// convertir fecha a string
fecha() {
  this.minDate = new Date().toISOString().slice(0, 16);
  console.log(this.minDate);
}

// obtener datos de usuario
getUser() {
  this.authService.getProfile().subscribe(r => {
    this.user = r;
  });
}

}
