import { ConfirmbookingComponent } from './confirmbooking/confirmbooking.component';
import { ResultComponent } from './result/result.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import the generated components
import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from './users/register/register.component';
import { PersonalHomeComponent } from './users/personal-home/personal-home.component';
import { PostComponent } from "./rides/post/post.component";
import { SearchComponent } from "./rides/search/search.component";
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { CarComponent } from './users/car/car.component';
import { UpdateCarComponent } from './users/update-car/update-car.component';




const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'personal_home',
    component: PersonalHomeComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path:'confirmbooking/:id',
    component : ConfirmbookingComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'car',
    component: CarComponent
  },
  {
    path: 'update-car',
    component: UpdateCarComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
