import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material/input';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LugarcrearComponent } from './lugar/lugarcrear/lugarcrear.component';
import { LugarlistarComponent } from './lugar/lugarlistar/lugarlistar.component';
import { LugarlistarinicioComponent } from './lugar/lugarlistarinicio/lugarlistarinicio.component';
import { LugarComponent } from './lugar/lugar/lugar.component';
import { NoticiaComponent } from './noticia/noticia/noticia.component';
import { NoticiacrearComponent } from './noticia/noticiacrear/noticiacrear.component';
import { NoticialistarComponent } from './noticia/noticialistar/noticialistar.component';
import { NoticialistarinicioComponent } from './noticia/noticialistarinicio/noticialistarinicio.component';
import { PublicacionComponent } from './publicacion/publicacion/publicacion.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    RutacrearComponent,
    RutalistarComponent,
    RutaComponent,
    RutalistarinicioComponent,
    EventocrearComponent,
    EventolistarComponent,
    EventoComponent,
    LugarcrearComponent,
    LugarlistarComponent,
    LugarlistarinicioComponent,
    LugarComponent,
    NoticiaComponent,
    NoticiacrearComponent,
    NoticialistarComponent,
    NoticialistarinicioComponent,
    PublicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    MatInputModule,
    CheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
