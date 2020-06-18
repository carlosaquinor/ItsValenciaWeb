import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  messageError: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }


  get correoNoValido() {
    return this.user.get('email').invalid && this.user.get('email').touched;
  }

  get pass1NoValido() {
    return this.user.get('password').invalid && this.user.get('password').touched;
  }

  crearFormulario() {

    this.user = this.fb.group({
        email  : ['', [ Validators.required,
           Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')] ],
        password : ['', [Validators.required, Validators.minLength(6) ]],
        tipo: 'web',
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
    this.authService.signIn(this.user.value)
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
