import { Component, OnInit, HostBinding } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { EventoService } from '../../services/evento.service';
import { LugarService } from '../../services/lugar.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  rutas: any = [];
  eventos: any = [];
  lugares: any = [];

  @HostBinding('class') classes = 'row';

  constructor(private rutaService: RutaService, private eventoService: EventoService, private lugarService: LugarService) { }

  ngOnInit() {
    this.getRutas();
    this.getEventos();
    this.getLugares();
  }

// Obtener todas las noticias crea por usuario //
  getRutas() {
    this.rutaService.getRutas()
      .subscribe(
        res => {
          res.forEach( x => {   // recorre la respuesta
            if (x.publicado === false) {   // si encuentra un elemento con publicado a false
              this.rutas.push(x);    // lo carga en el array ese elemento
            }
          });
        },
        err => console.error(err)
      );
  }

// ELiminar una  ruta
deleteRuta(id: string) {
  this.rutaService.deleteRuta(id)
    .subscribe(
      res => {
        this.getRutas();
      },
      err => console.error(err)
    );
}

// Obtener todos los eventos //
getEventos() {
  this.eventoService.getEventos()
    .subscribe(
      res => {
        res.forEach( x => {   // recorre la respuesta
          if (x.publicado === false) {   // si encuentra un elemento con publicado a false
            this.eventos.push(x);    // lo carga en el array ese elemento
          }
        });
      },
      err => console.error(err)
    );
}

// ELiminar un evento
deleteEvento(id: string) {
this.eventoService.deleteEvento(id)
  .subscribe(
    res => {
      this.getEventos();
    },
    err => console.error(err)
  );
}
 // Obtener lugar
 getLugares() {
  this.lugarService.getLugares()
    .subscribe(
      res => {
        res.forEach( x => {   // recorre la respuesta
          if (x.publicado === false) {   // si encuentra un elemento con publicado a false
            this.lugares.push(x);    // lo carga en el array ese elemento
          }
        });
      },
      err => console.error(err)
    );
}

// ELiminar un Lugar
delete(id: string) {
this.lugarService.delete(id)
  .subscribe(
    res => {
      this.getLugares();
    },
    err => console.error(err)
  );
}

}
