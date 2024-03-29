import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HotelServiceService } from '../hotel-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OtpScreenComponent } from './otp-screen/otp-screen.component';

export interface DialogData {
  details:any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userLogin!: FormGroup;
  val = 'login';
  loaderEnable:boolean = false;
  errorLogin:boolean = false;
  /*userLogin =  new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]),
    password: new FormControl()
  })*/
  constructor(
    private _formbuilder: FormBuilder,
    private router:Router,
    private hotelService:HotelServiceService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userLogin = this._formbuilder.group({
      email: ['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      password: ['',[Validators.required]],
    })
  }

  onSubmit(){
    this.errorLogin = false;
    this.loaderEnable = true;
    let obj = this.userLogin.value;
    this.hotelService.loginUser(this.val,obj).subscribe((resp)=>{
      var object:any = resp;
      var payload = {
        "phone_number":object.phone_number
      }
      this.hotelService.sendOtp("send-phone",payload).subscribe((response)=>{
        var data:any = response;
        if(data.message == "OTP Sent Successfully"){
          let otpflag = this.dialog.open(OtpScreenComponent, {
            data: object,
            width:'60%',
            panelClass: 'details-container-class'
          })
  
          otpflag.afterClosed().subscribe(result =>{
            if(result == true){
              this.loaderEnable = false;
              this.hotelService.sendRefresh(resp);
              this.openSnackBar();
            }
          })
        }
      })
    },
    (error)=>{
      this.errorLogin = true;
      this.loaderEnable = false;
    })
  }

  openSnackBar() {
    this.snackBar.open('Login Success !','', {
      duration: 3000,
    });
    this.router.navigate(['/home']);
  }
}
