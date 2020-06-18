import { Component, OnInit, HostBinding } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noticialistarinicio',
  templateUrl: './noticialistarinicio.component.html',
  styleUrls: ['./noticialistarinicio.component.css']
})
export class NoticialistarinicioComponent implements OnInit {


  noticias: any = [];

  @HostBinding('class') classes = 'row';

  constructor(private noticiaService: NoticiaService, private router: Router) { }

  ngOnInit() {// recibe parametro
      this.get(); // obtiene noticia por categoria
  }

  // Obtener noticias por categoria//
  get() {
    this.noticiaService.getNoticias()
      .subscribe(
        res => {
          this.noticias = res;
        },
        err => console.error(err)
      );
  }

// Envia el ID de la noticia para ver La Noticia//
  getDetails(idNoticia: string) {
    this.router.navigate(['/noticia', { id: idNoticia }]);
}

}
