import { Component, OnInit, HostBinding } from '@angular/core';
import { RutaService } from '../../services/ruta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutalistarinicio',
  templateUrl: './rutalistarinicio.component.html',
  styleUrls: ['./rutalistarinicio.component.css']
})
export class RutalistarinicioComponent implements OnInit {
  rutas: any = [];

  @HostBinding('class') classes = 'row';

  constructor(private rutaService: RutaService, private router: Router) { }

  ngOnInit() {
    this.getRutas();
  }

// Obtener todas las noticias //
  getRutas() {
    this.rutaService.getRutas()
      .subscribe(
        res => {
          res.forEach( x => {   // recorre la respuesta
            if (x.publicado === true) {   // si encuentra un elemento con publicado a true
              this.rutas.push(x);    // lo carga en el array ese elemento
            }
          });
        },
        err => console.error(err)
      );
  }

// Envia el ID de la ruta para ver la RUTA //
  getDetails(idRuta: string) {
    this.router.navigate(['/ruta', { id: idRuta }]);
}

}
