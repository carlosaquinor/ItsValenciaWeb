import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

import { RutacrearComponent } from './ruta/rutacrear/rutacrear.component';
import { RutalistarComponent } from './ruta/rutalistar/rutalistar.component';
import { RutaComponent } from './ruta/ruta/ruta.component';
import { RutalistarinicioComponent } from './ruta/rutalistarinicio/rutalistarinicio.component';

import { EventocrearComponent } from './evento/eventocrear/eventocrear.component';
import { EventolistarComponent } from './evento/eventolistar/eventolistar.component';
import { EventoComponent } from './evento/evento/evento.component';

import { LugarlistarinicioComponent } from './lugar/lugarlistarinicio/lugarlistarinicio.component';
import { LugarlistarComponent } from './lugar/lugarlistar/lugarlistar.component';
import { LugarcrearComponent } from './lugar/lugarcrear/lugarcrear.component';
import { LugarComponent } from './lugar/lugar/lugar.component';

import { NoticiaComponent } from './noticia/noticia/noticia.component';
import { NoticiacrearComponent } from './noticia/noticiacrear/noticiacrear.component';
import { NoticialistarComponent } from './noticia/noticialistar/noticialistar.component';
import { NoticialistarinicioComponent } from './noticia/noticialistarinicio/noticialistarinicio.component';
import { AuthGuard } from './auth.guard';
import { PublicacionComponent } from './publicacion/publicacion/publicacion.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/inicio',
  pathMatch: 'full'
},
{
  path: 'inicio',
  component: InicioComponent

},
{
  path: 'login',
  component: LoginComponent

},
{
  path: 'registrar',
  component: RegistroComponent

},
{
  path: 'ruta',
  component: RutaComponent,
},
{
  path: 'rutacrear',
  component: RutacrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'rutalistar',
  component: RutalistarComponent,
  canActivate: [AuthGuard],
},
{
  path: 'rutalistarinicio',
  component: RutalistarinicioComponent,
},
{
  path: 'rutacrear/edit/:id',
  component: RutacrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'evento',
  component: EventoComponent,
},
{
  path: 'eventocrear',
  component: EventocrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'eventocrear/edit/:id',
  component: EventocrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'eventolistar',
  component: EventolistarComponent,
  canActivate: [AuthGuard],
},
{
  path: 'lugar',
  component: LugarComponent,
},
{
  path: 'lugarcrear',
  component: LugarcrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'lugarcrear/edit/:id',
  component: LugarcrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'lugarlistar/:categoria',
  component: LugarlistarComponent,
  canActivate: [AuthGuard],
},
{
  path: 'lugarlistarinicio/:categoria',
  component: LugarlistarinicioComponent,
},
{
  path: 'noticia',
  component: NoticiaComponent,
},
{
  path: 'noticiacrear',
  component: NoticiacrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'noticiacrear/edit/:id',
  component:  NoticiacrearComponent,
  canActivate: [AuthGuard],
},
{
  path: 'noticialistar',
  component: NoticialistarComponent,
  canActivate: [AuthGuard],
},
{
  path: 'noticialistarinicio',
  component: NoticialistarinicioComponent,
},
{
  path: 'publicacion',
  component: PublicacionComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
