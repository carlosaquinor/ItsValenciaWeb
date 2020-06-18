import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit, AfterViewInit {

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
  id: string;
  origen: string;
  paradas = [];
  destino: string;

  rutas: any = {
    titulo: '',
    descripcion: '',
    fecha: '',
    contacto: '',
    imagen: '',
    publicado: ''
};

  constructor( private rutaService: RutaService, private activatedRoute: ActivatedRoute ) {}


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // se obtiene el parametro
    this.getRuta(this.id); // se obtiene una ruta
  }
// crea un mapa
  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapNativeElement.nativeElement, this.mapOptions);
    this.directionsDisplay.setMap(this.map);
  }
// crea waypoints para el mapa
  createWayoints() {
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < this.paradas.length; i++ ) {
      this.waypts.push({
        location: this.paradas[i],
        stopover: true
      });
    }
  }
// calcula ruta con el origen, destino y si tiene paradas
  calculateAndDisplayRoute() {
    const that = this;
    if (this.paradas.length > 0) {
      this.directionsService.route({
        origin: this.origen,
        destination: this.destino,
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
        origin: this.rutas.origen,
        destination: this.rutas.destino,
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
// obtiene una ruta
  getRuta(id: string) {
    this.rutaService.getRuta(id).
    subscribe(res => {
      this.rutas = res;
      this.origen = this.rutas.origen;
      this.destino = this.rutas.destino;
      this.paradas = this.rutas.paradas;
      this.createWayoints();
      this.calculateAndDisplayRoute();
    },
    err => console.error(err)
  );
  }
}
