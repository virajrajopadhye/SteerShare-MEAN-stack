import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PostComponent } from './rides/post/post.component';
import { SearchComponent } from './rides/search/search.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './users/register/register.component';
import { ConfirmbookingComponent } from './confirmbooking/confirmbooking.component';
import { HttpModule } from '@angular/http';
import { PersonalHomeComponent } from './users/personal-home/personal-home.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService   } from './services/chat.service';
import { AutocompleteComponent } from './rides/search/google-places.component';
import { CarComponent } from './users/car/car.component';
import { FooterComponent } from './footer/footer.component';
import { UpdateCarComponent } from './users/update-car/update-car.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PostComponent,
    SearchComponent,
    LoginComponent,
    HomeComponent,
    ResultComponent,
    RegisterComponent,
    ConfirmbookingComponent,
    PersonalHomeComponent,
    ChatComponent,
    AutocompleteComponent,
    CarComponent,
    UpdateCarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
