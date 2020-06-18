import { Component, OnInit, HostBinding } from '@angular/core';
import { RutaService } from '../../services/ruta.service';


@Component({
  selector: 'app-rutalistar',
  templateUrl: './rutalistar.component.html',
  styleUrls: ['./rutalistar.component.css']
})
export class RutalistarComponent implements OnInit {

  rutas: any = [];

  @HostBinding('class') classes = 'row';

  constructor(private rutaService: RutaService) { }

  ngOnInit() {
    this.getRutas();
  }

// Obtener todas las rutas //
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

// ELiminar una  ruta
deleteRuta(id: string) {
  this.rutaService.deleteRuta(id)
    .subscribe(
      res => {
        console.log(res);
        this.getRutas();
      },
      err => console.error(err)
    );
}

}
