import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister!: FormGroup;
  passwordMatch:boolean = false;
  val:string = 'register';
  loaderEnable:boolean = false;
  constructor(
    private _formbuilder: FormBuilder,
    private router:Router,
    private hotelService:HotelServiceService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userRegister = this._formbuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      phone: ['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
      confirmPassword: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }

  onSubmit(){
    this.loaderEnable = true;
    let obj = this.userRegister.value;
    this.hotelService.registerUser(this.val,obj).subscribe((resp)=>{
      this.loaderEnable = false;
      this.openSnackBar();
    })
  }

  verifyPassword(){
    if(this.userRegister.controls['confirmPassword'].value == this.userRegister.controls['password'].value){
      this.passwordMatch = false;
      this.onSubmit();
    }
    else{
      this.passwordMatch = true;
    }
  }

  openSnackBar() {
    this.snackBar.open('Registeration Successfull !','', {
      duration: 3000,
    });
  }
}
