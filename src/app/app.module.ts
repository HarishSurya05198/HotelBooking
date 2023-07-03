import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgOtpInputModule } from  'ng-otp-input';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SpinnersAngularModule } from 'spinners-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoomDetailsComponent } from './home/room-details/room-details.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {OtpScreenComponent} from './login/otp-screen/otp-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomDetailsComponent,
    BookingDetailsComponent,
    LoginComponent,
    RegisterComponent,
    OtpScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatInputModule,
    NgOtpInputModule,
    MatFormFieldModule,
    MatIconModule,
    SpinnersAngularModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
