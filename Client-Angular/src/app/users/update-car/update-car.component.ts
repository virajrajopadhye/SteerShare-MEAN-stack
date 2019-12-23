import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { User } from '../../models/user.model';
import { Car } from '../../models/car.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {
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
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      plate: ['', [Validators.required, Validators.pattern('[A-Z0-9]{5,7}')]]
    });

    //Check for current user and their car information
    if((this.currentUser = this.userService.currentUserValue)){
      this.carService.get(this.currentUser._id)
      .subscribe((car)=>{

        this.userCar = car;
      })
    }
    else{
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    }
    
  }

  get formControls(){
    return this.carForm.controls;
  }

  //Update form submit functionality
  onSubmit(){
    this.submitted = true;
    if(this.carForm.invalid) return;
    this.carService.update(this.carForm.value, this.currentUser._id)
      .subscribe(
        data => {
          this.router.navigate(['/personal_home']);
        },
        error => {
          window.alert(error.message);
        }
      )
    console.log(this.carForm.value);
  }

}
