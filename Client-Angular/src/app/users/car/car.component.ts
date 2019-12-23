import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { User } from '../../models/user.model';
import { Car } from '../../models/car.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  submitted = false;
  currentUser: User;
  userCar: Car;
  carForm: FormGroup;
  colors = ['BLACK', 'WHITE', 'GRAY', 'SILVER', 'BLUE', 'RED', 'BROWN', 'GOLD', 'GREEN', 'TAN', 'ORANGE'];


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit() {
    //Validation for the form
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      plate: ['', [Validators.required, Validators.pattern('[A-Z0-9]{5,7}')]]
    });

    //Check for the current user
    if((this.currentUser = this.userService.currentUserValue)){

    }
    else{
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    }
    
  }

  //Get form control
  get formControls(){
    return this.carForm.controls;
  }

  //Submit functionality
  onSubmit(){
    this.submitted = true;
    if(this.carForm.invalid) return;
    this.carService.add(this.carForm.value, this.currentUser._id)
      .subscribe(
        data => {
          this.router.navigate(['/personal_home']);
        },
        error => {
          window.alert(error.message);
        }
      )
  }

}
