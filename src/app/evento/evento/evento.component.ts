import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  id: string;

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
};



  constructor( private eventoService: EventoService,
               private activatedRoute: ActivatedRoute ) {}


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // se obtiene el parametro
    this.getEvento(this.id); // se obtiene un evento
  }

  // obtiene un evento
  getEvento(id: string) {
    this.eventoService.getEvento(id).
    subscribe(res => {
      this.eventos = res;
    },
    err => console.error(err)
  );
  }

}

