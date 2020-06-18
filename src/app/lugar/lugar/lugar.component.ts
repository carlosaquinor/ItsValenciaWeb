import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugarService } from '../../services/lugar.service';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.css']
})
export class LugarComponent implements OnInit {

  id: string;


  lugares: any = {
    _id: '',
    imagen: [],
    categoria: '',
    nombre: '',
    descripcion: '',
    direccion: '',
    fecha: '',
    idusuario: '',
};

comentarios: any = {
  name: '',
  email: '',
  comentario: '',
  idNoticia: '',
  idUser: '',
  imgUser: '',
  valoracionUser: '',
  fecha: '',
};

  constructor( private lugarService: LugarService, private activatedRoute: ActivatedRoute, private comentarioService: ComentarioService ) {}


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // se obtiene el parametro
    this.getLugar(this.id); // se obtiene un lugar
    this.getComentario(this.id);
  }

  // obtiene un lugar
  getLugar(id: string) {
    this.lugarService.getLugar(id).
    subscribe(res => {
      this.lugares = res;
    },
    err => console.error(err)
  );
  }
 // obtiene comentarios
 getComentario(id: string) {
  this.lugarService.getLugar(id).
  subscribe(res => {
    this.lugares = res;
  },
  err => console.error(err)
);
}

}
