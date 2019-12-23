import { Component, OnInit, ElementRef, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;


  constructor(
      private formBuilder: FormBuilder,
      private router: Router, 
      private userService: UserService,
      private el: ElementRef
  ) { 
    //If logged in, redirect to home page
    if(this.userService.currentUserValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // Build the form and validations
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profileImage: ['', Validators.required]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }


  //Register form submit functionality
  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid) return;

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#profileImg');
    let profileImgName = inputEl.files.item(0).name;
    let formData = new FormData();
    if(inputEl.files.length > 0){
      formData.append('profile_img', inputEl.files.item(0));
      console.log(formData);
    }

    this.userService.register(this.registerForm.value, profileImgName)
      .pipe(first())
      .subscribe(
        data => {
          this.userService.uploadImage(formData).subscribe();
          this.router.navigate(['/login']);
        },
        error => {
          window.alert(error);
        }
      )
  }

}
