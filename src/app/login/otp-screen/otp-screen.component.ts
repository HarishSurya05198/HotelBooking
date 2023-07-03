import {Component,OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HotelServiceService } from 'src/app/hotel-service.service';

@Component({
  selector: 'app-otp-screen',
  templateUrl: './otp-screen.component.html',
  styleUrls: ['./otp-screen.component.scss']
})
export class OtpScreenComponent implements OnInit {
  disableBooking:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  private hotelService:HotelServiceService) { }

  phone_number = this.data.phone_number;

  ngOnInit(): void {
    
  }

  onOtpChange(e:any){
    var otp;
    if(e.length == 4){
      otp = e;
      this.verifyOtp(this.phone_number,otp);
    }
    console.log("value in otp :",otp);
  }

  verifyOtp(phone_number:String,otp:String){
    var payload = {
      "phone_number":phone_number,
      "otp":otp
    }
    this.hotelService.verifyOtp("verify-phone",payload).subscribe(resp=>{
      this.hotelService.OtpVerFlag = true;
      if(resp == "OTP Verified Successfully"){
        console.log("getting inside condition");
      }
      this.onNoClick();
    })
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
}
