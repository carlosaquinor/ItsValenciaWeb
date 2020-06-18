import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-noticiacrear',
  templateUrl: './noticiacrear.component.html',
  styleUrls: ['./noticiacrear.component.css']
})
export class NoticiacrearComponent implements OnInit {

  minDate: string;

  messageError: string;
  edit: boolean;
  noticia: FormGroup;

  user: any =  {_id: '' };

  noticias: any = {
    _id: '',
    imagen: '',
    titulo: '',
    subtitulo: '',
    contenido: '',
    autor: '',
    fecha: '',
    idusuario: '',
    publicado: false,
};
  constructor(private fb: FormBuilder, private noticiaService: NoticiaService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.createnoticiaForm();
  }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params; // Se toma el parametro se guarda en la variable.
    if (params.id) {                                    // Si existe parametro id entra en el metodo encontrar una noticia
      this.getnoticia(params.id);
    }
    this.fecha();
    this.getUser();
  }

  createnoticiaForm() {
      this.noticia = this.fb.group({
        imagen: this.fb.array([['']]),
        titulo: ['', Validators.required],
        subtitulo: ['', Validators.required],
        contenido: ['', Validators.required],
        autor: ['', Validators.required],
        fecha: [new Date(), Validators.required],
        idusuario: [''],
        publicado: [true]
      });
  }
  // metodo que retorna un true o false si el control del formulario es invalido o si fue tocado
  get tituloNoValido() {
    return this.noticia.get('titulo').invalid && this.noticia.get('titulo').touched;
  }
  get subtituloNoValido() {
    return this.noticia.get('subtitulo').invalid && this.noticia.get('subtitulo').touched;
  }
  get contenidoNoValido() {
    return this.noticia.get('contenido').invalid && this.noticia.get('contenido').touched;
  }
  get autorNoValido() {
    return this.noticia.get('autor').invalid && this.noticia.get('autor').touched;
  }

  // se le asigna al control de imagen como un formArray
  get imagen() {
    return this.noticia.get('imagen') as FormArray;
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

  // guardar noticia
  guardar() {
    if ( this.noticia.invalid ) {
      return Object.values( this.noticia.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.noticia.value.idusuario = this.user._id;
    this.noticiaService.save(this.noticia.value)
      .subscribe( res => {
         this.noticia.reset();
         this.router.navigate(['/noticialistar']);
        }, (err) => {
          this.messageError = err.error;
      });
  }

  // actualizar noticia
  update() {
    if ( this.noticia.invalid ) {
      return Object.values( this.noticia.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.noticiaService.update(this.noticias._id, this.noticia.value)
      .subscribe( res => {
         this.noticia.reset();
         this.router.navigate(['/noticialistar']);
        }, (err) => {
          this.messageError = err.error;
      });
  }
  // Se obtiene una noticia
  getnoticia(id: string) {
    this.noticiaService.getOneNoticia(id)
        .subscribe(
          res => {
            this.noticias = res;
            this.edit = true;
            delete this.noticias.publicado;
            this.cargarFormulario(this.noticias);
          },
          err => console.log(err)
        );
  }

  // Carga los datos recibidos en mi formulario en cada formControl
  cargarFormulario(data: any) {
    this.noticia = this.fb.group({
      imagen: this.fb.array(data.imagen),
      titulo: [data.titulo, Validators.required],
      subtitulo: [data.subtitulo, Validators.required],
      contenido: [data.contenido, Validators.required],
      autor: [data.autor, Validators.required],
      fecha: [data.fecha, Validators.required],
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
