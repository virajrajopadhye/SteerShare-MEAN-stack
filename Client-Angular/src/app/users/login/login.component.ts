import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    //login form validation
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get formControls(){
    return this.loginForm.controls;
  }

  //login submit functionality
  onSubmit(){
    this.userService.login(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          window.alert('Welcome '+ data.username);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          window.alert('Username and Password are not matching,\nif you are a new user please Register');
        }
      );
  }

}
