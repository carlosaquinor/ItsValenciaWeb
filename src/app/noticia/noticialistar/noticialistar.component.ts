import { Component, OnInit, HostBinding } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noticialistar',
  templateUrl: './noticialistar.component.html',
  styleUrls: ['./noticialistar.component.css']
})
export class NoticialistarComponent implements OnInit {

  noticias: any = [];

  categoria: string;

  @HostBinding('class') classes = 'row';

  constructor(private noticiaService: NoticiaService, private router: Router) { }

  ngOnInit() {
    this.get();
  }

  // Obtener noticia //
  get() {
    this.noticiaService.getNoticias()
      .subscribe(
        res => {
          this.noticias = res;
        },
        err => console.error(err)
      );
  }

  // ELiminar una noticia
  delete(id: string) {
  this.noticiaService.delete(id)
    .subscribe(
      res => {
        console.log(res);
        this.get();
      },
      err => console.error(err)
    );
 }

}
