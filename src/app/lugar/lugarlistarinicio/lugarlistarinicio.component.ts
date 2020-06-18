import { Component, OnInit, HostBinding } from '@angular/core';
import { LugarService } from '../../services/lugar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lugarlistarinicio',
  templateUrl: './lugarlistarinicio.component.html',
  styleUrls: ['./lugarlistarinicio.component.css']
})
export class LugarlistarinicioComponent implements OnInit {

  lugares: any = [];

  categoria: string;

  @HostBinding('class') classes = 'row';

  constructor(private lugarService: LugarService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.categoria = params.get('categoria');
      this.getLugares(this.categoria);
    });
  }

  // Obtener lugar por categoria//
  getLugares(cat: string) {
    this.lugarService.getbyCategoria(cat)
      .subscribe(
        res => {
          this.lugares = res;
        },
        err => console.error(err)
      );
  }

// Envia el ID del lugar para ver el LUGAR //
  getDetails(idLugar: string) {
    this.router.navigate(['/lugar', { id: idLugar }]);
}

}
