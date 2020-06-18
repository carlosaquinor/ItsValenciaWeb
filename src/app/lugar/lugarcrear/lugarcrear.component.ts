import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../services/lugar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as  dato from '../../../assets/data/lugar.json';

@Component({
  selector: 'app-lugarcrear',
  templateUrl: './lugarcrear.component.html',
  styleUrls: ['./lugarcrear.component.css']
})
export class LugarcrearComponent implements OnInit {

  minDate: string;

  messageError: string;
  edit: boolean;
  lugar: FormGroup;

  user: any =  {_id: '' };
  categorias: any = [];

  lugares: any = {
    _id: '',
    categoria: '',
    imagen: '',
    nombre: '',
    descripcion: '',
    direccion: '',
    fecha: '',
    idusuario: '',
    publicado: false,
};
  constructor(private fb: FormBuilder, private lugarService: LugarService,
              private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.createlugarForm();
  }


  ngOnInit() {
    this.categorias = (dato as any).default;
    const params = this.activatedRoute.snapshot.params; // Se toma el parametro se guarda en la variable.
    this.fecha();
    this.getUser();
    if (params.id) {                                    // Si existe parametro id entra en el metodo encontrar una lugar
      this.getlugar(params.id);
    }
  }
// Se crea formularios
  createlugarForm() {
      this.lugar = this.fb.group({
        categoria: ['', Validators.required],
        imagen: this.fb.array([['']]),
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        direccion: ['', Validators.required],
        fecha: ['', Validators.required],
        idusuario: [''],
        publicado: [true]
      });
  }
  // metodo que retorna un true o false si el control del formulario es invalido o si fue tocado
  get direccionNoValido() {
    return this.lugar.get('direccion').invalid && this.lugar.get('direccion').touched;
  }
  get tituloNoValido() {
    return this.lugar.get('nombre').invalid && this.lugar.get('nombre').touched;
  }
  get descripcionNoValido() {
    return this.lugar.get('descripcion').invalid && this.lugar.get('descripcion').touched;
  }
  get contactoNoValido() {
    return this.lugar.get('organizador').invalid && this.lugar.get('organizador').touched;
  }

  // se le asigna al control de imagen como un formArray
  get imagen() {
    return this.lugar.get('imagen') as FormArray;
  }

  // agregar imagen
  addClick() {
      this.imagen.push( this.fb.control('') );
  }

  // eliminar imagen
  deleteClick(index: number) {
     if (index >= 1) {
      this.imagen.removeAt(index);
     }
  }

  // guardar lugar
  guardar() {
    if ( this.lugar.invalid ) {
      return Object.values( this.lugar.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.lugar.value.idusuario = this.user._id;
    this.lugarService.save(this.lugar.value)
      .subscribe( res => {
          this.lugar.reset();
          this.router.navigate(['/inicio']);
        }, (err) => {
          this.messageError = err.error;
      });
  }

  // actualizar lugar
  update() {
    if ( this.lugar.invalid ) {
      return Object.values( this.lugar.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.lugarService.update(this.lugares._id, this.lugar.value)
      .subscribe( res => {
          this.lugar.reset();
          this.router.navigate(['/inicio']);
        }, (err) => {
          this.messageError = err.error;
      });
  }
  // Se obtiene una lugar
  getlugar(id: string) {
    this.lugarService.getOneLugar(id)
        .subscribe(
          res => {
            this.lugares = res;
            this.edit = true;
            delete this.lugares.publicado;
            this.lugares.fecha =  this.lugares.fecha.slice(0, 16);
            this.cargarFormulario(this.lugares);
          },
          err => console.log(err)
        );
  }

  // Carga los datos recibidos en mi formulario en cada formControl
  cargarFormulario(data: any) {
    this.lugar = this.fb.group({
      categoria: [data.categoria, Validators.required],
      imagen: this.fb.array(data.imagen),
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      direccion: [data.direccion, Validators.required],
      fecha: [data.fecha, Validators.required],
      idusuario: [data.idusuario],
      publicado: [true]
   });
  }

  // convertir fecha a string
  fecha() {
  this.minDate = new Date().toISOString().slice(0, 16);
  }

  // obtener datos de usuario
  getUser() {
  this.authService.getProfile().subscribe(r => {
    this.user = r;
  });
  }

}
