import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as  data from './../assets/data/lugar.json';
import * as  datum from './../assets/data/lugares.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ItsValenciaWeb';

  listadoLugar: any = [];
  listadoLugares: any = [];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.listadoLugar = (data as any).default;
    this.listadoLugares = (datum as any).default;
  }

}
