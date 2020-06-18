import { Component, OnInit, HostBinding } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  eventos: any = [];

  @HostBinding('class') classes = 'row';

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit() {
    this.getEventos();
  }

// Obtener todos los eventos //
  getEventos() {
    this.eventoService.getEventos()
      .subscribe( res  => {
          res.forEach( x => {   // recorre la respuesta
            if (x.publicado === true) {   // si encuentra un elemento con publicado a true
              this.eventos.push(x);    // lo carga en el array ese elemento
            }
          });
        },
        err => console.error(err)
      );
  }

// Envia el ID del evento para ver el EVENTO //
  getDetails(idEvento: string) {
    this.router.navigate(['/evento', { id: idEvento }]);
}

}
