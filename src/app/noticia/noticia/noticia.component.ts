import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  id: string;


  noticias: any = {
    _id: '',
    imagen: [],
    titulo: '',
    subtitulo: '',
    contenido: '',
    autor: '',
    fecha: '',
    idusuario: '',
};

  constructor( private noticiaService: NoticiaService, private activatedRoute: ActivatedRoute ) {}


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // se obtiene el parametro
    this.getLugar(this.id); // se obtiene una noticia
  }

  // obtiene una noticia
  getLugar(id: string) {
    this.noticiaService.getNoticia(id).
    subscribe(res => {
      this.noticias = res;
    },
    err => console.error(err)
  );
  }


}
