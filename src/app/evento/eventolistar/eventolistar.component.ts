import { Component, OnInit, HostBinding } from '@angular/core';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventolistar',
  templateUrl: './eventolistar.component.html',
  styleUrls: ['./eventolistar.component.css']
})
export class EventolistarComponent implements OnInit {

  eventos: any = [];

  @HostBinding('class') classes = 'row';

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

// Obtener todos los eventos //
  getEventos() {
    this.eventoService.getEventos()
      .subscribe(
        res => {
          res.forEach( x => {   // recorre la respuesta
            if (x.publicado === true) {   // si encuentra un elemento con publicado a true
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

}
