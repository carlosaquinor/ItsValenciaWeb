import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

user: FormGroup;

messageError: string;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.user.get('nombre').invalid && this.user.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.user.get('apellido').invalid && this.user.get('apellido').touched;
  }

  get correoNoValido() {
    return this.user.get('email').invalid && this.user.get('email').touched;
  }

  get usuarioNoValido() {
    return this.user.get('username').invalid && this.user.get('username').touched;
  }

  get pass1NoValido() {
    return this.user.get('password').invalid && this.user.get('password').touched;
  }

  get pass2NoValido() {
    const pass1 = this.user.get('password').value;
    const pass2 = this.user.get('pass2').value;
    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario() {
    this.user = this.fb.group({
        username : ['', Validators.required ],
        nombre  : ['', [ Validators.required ]  ],
        apellido: ['', [Validators.required] ],
        email  : ['', [ Validators.required,
           Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
        password : ['', [Validators.required, Validators.minLength(6) ]],
        pass2   : ['', Validators.required ],
        imagen: ['null'],
        tipo   : ['web'],
    }, {
      validators: this.authService.passwordsIguales('password', 'pass2')
    });
  }

  guardar() {
    if ( this.user.invalid ) {

      return Object.values( this.user.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( ctrl => ctrl.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    delete this.user.value.pass2;
    this.authService.signUp(this.user.value)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.user.reset({});
          this.router.navigate(['/inicio']);
        }, (err) => {
          this.messageError = err.error;
      });
  }

}
