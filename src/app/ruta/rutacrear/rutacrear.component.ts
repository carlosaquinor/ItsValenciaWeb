import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RutaService } from '../../services/ruta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-rutacrear',
  templateUrl: './rutacrear.component.html',
  styleUrls: ['./rutacrear.component.css']
})
export class RutacrearComponent implements OnInit, AfterViewInit {

  @ViewChild('mapElement', {static: true}) mapNativeElement: ElementRef;

  map: google.maps.Map;
  lat = 39.469;
  lng = -0.377;
  coordinates = new google.maps.LatLng(this.lat, this.lng); // pasar las coordenas al mapa
  mapOptions: google.maps.MapOptions = { center: this.coordinates, zoom: 11 }; // opciones de vista del mapa

  // tslint:disable-next-line: new-parens
  directionsService = new google.maps.DirectionsService; // servicio de google maps para obtener direcciones
  // tslint:disable-next-line: new-parens
  directionsDisplay = new google.maps.DirectionsRenderer; // servicio de google maps para mostrar la ruta con las direcciones en el mapa

  waypts = [];
  ruta: FormGroup;
  messageError: string;
  edit: boolean;

  user: any = { _id: '' };

  rutas: any = {
    _id: '',
    origen: '',
    paradas: [],
    destino: '',
    titulo: '',
    descripcion: '',
    fecha: '',
    contacto: '',
    imagen: '',
    idusuario: '',
    publicado: false
};
  constructor(private fb: FormBuilder, private rutaService: RutaService, private router: Router,
              private authService: AuthService , private activatedRoute: ActivatedRoute) {
    this.createRutaForm();
  }


  ngOnInit() {
    const params = this.activatedRoute.snapshot.params; // Se toma el parametro se guarda en la variable.
    this.getUser();
    if (params.id) {                                    // Si existe parametro id entra en el metodo encontrar una ruta
      this.getRuta(params.id);
    }
  }

  createRutaForm() {
      this.ruta = this.fb.group({
        origen: ['', Validators.required],
        destino: ['', Validators.required],
        paradas: this.fb.array([]),
        imagen: ['', Validators.required],
        titulo: ['', Validators.required],
        descripcion: ['', Validators.required],
        fecha: ['', Validators.required],
        contacto: ['', Validators.required],
        idusuario: [''],
        publicado: [true]
      });
  }

// crea un mapa con las coordenas definidas
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapNativeElement.nativeElement, this.mapOptions);
    this.directionsDisplay.setMap(this.map);
  }

// metodo que retorna un true o false si el control del formulario es invalido o si fue tocado
  get nombreNoValido() {
    return this.ruta.get('origen').invalid && this.ruta.get('origen').touched;
  }
  get NoValido() {
    return this.ruta.get('destino').invalid && this.ruta.get('destino').touched;
  }
  get imagenNoValido() {
    return this.ruta.get('imagen').invalid && this.ruta.get('imagen').touched;
  }
  get tituloNoValido() {
    return this.ruta.get('titulo').invalid && this.ruta.get('titulo').touched;
  }
  get descripcionNoValido() {
    return this.ruta.get('descripcion').invalid && this.ruta.get('descripcion').touched;
  }
  get contactoNoValido() {
    return this.ruta.get('contacto').invalid && this.ruta.get('contacto').touched;
  }

// Se recorre las paradas generadas y se le carga en waypts esto genera waypoints que se utiliza en calculateAndDisplayRoute
  createWayoints() {
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < this.ruta.value.paradas.length; i++ ) {
      this.waypts.push({
        location: this.ruta.value.paradas[i],
        stopover: true
      });
    }
  }

// calcula la ruta, para mostrar en el mapa
  calculateAndDisplayRoute() {
    const that = this;
    this.createWayoints();
    if (this.paradas.length > 0) {
      this.directionsService.route({
        origin: this.ruta.value.origen,
        destination: this.ruta.value.destino,
        waypoints: this.waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);
        } else {
          window.alert('Solicitud de direcciones fallida debido a ' + status);
        }
      });
    } else {
      this.directionsService.route({
        origin: this.ruta.value.origen,
        destination: this.ruta.value.destino,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);
        } else {
          window.alert('Solicitud de direcciones fallida debido a ' + status);
        }
      });
    }
  }

// se le asigna al control de paradas como un formArray
  get paradas() {
    return this.ruta.get('paradas') as FormArray;
  }

// agregar paradas
  addClick() {
      this.paradas.push( this.fb.control('') );
  }

// eliminar parada
  deleteClick(index: number) {
        this.paradas.removeAt(index);
  }

// guardar ruta
  guardar() {
    if ( this.ruta.invalid ) {
      return Object.values( this.ruta.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.ruta.value.idusuario = this.user._id;
    this.rutaService.saveRuta(this.ruta.value)
      .subscribe( res => {
          this.ruta.reset();
          this.router.navigate(['/rutalistar']);
        }, (err) => {
          this.messageError = err.error;
      });
  }

// actualizar ruta
  updateRuta() {
    if ( this.ruta.invalid ) {

      return Object.values( this.ruta.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.rutaService.updateRuta(this.rutas._id, this.ruta.value)
      .subscribe( res => {
          this.ruta.reset();
          this.router.navigate(['/rutalistar']);
        }, (err) => {
          this.messageError = err.error;
      });
  }

  // Se obtiene una ruta
  getRuta(id: string) {
    this.rutaService.getOneRuta(id)
        .subscribe(
          res => {
            this.rutas = res;
            this.edit = true;
            delete this.rutas.publicado;
            this.cargarFormulario(this.rutas);
            this.calculateAndDisplayRoute();
          },
          err => console.log(err)
        );
  }

// Carga los datos recibidos en mi formulario en cada formControl esto es para Update
  cargarFormulario(data: any) {
    this.ruta = this.fb.group({
      origen: [data.origen, Validators.required],
      destino: [data.destino, Validators.required],
      paradas: this.fb.array(data.paradas),
      imagen: [data.imagen, Validators.required],
      titulo: [data.titulo, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      fecha: [data.fecha, Validators.required],
      contacto: [data.contacto, Validators.required],
      idusuario: [data.idusuario],
      publicado: [true]
   });
  }

// Obtener Usuario Logeado
  getUser() {
    this.authService.getProfile().subscribe(r => {
      this.user = r;
    });
  }
}
