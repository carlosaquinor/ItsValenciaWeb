import { Component, OnInit, HostBinding } from '@angular/core';
import { LugarService } from '../../services/lugar.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lugarlistar',
  templateUrl: './lugarlistar.component.html',
  styleUrls: ['./lugarlistar.component.css']
})
export class LugarlistarComponent implements OnInit {

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

 // ELiminar un Lugar
 delete(id: string) {
  this.lugarService.delete(id)
    .subscribe(
      res => {
        console.log(res);
        this.getLugares(this.categoria);
      },
      err => console.error(err)
    );
 }

}
