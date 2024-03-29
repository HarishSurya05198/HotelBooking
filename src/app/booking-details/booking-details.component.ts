import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelServiceService } from '../hotel-service.service';
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  roomDetail:any;
  rangeDetail:any;
  loggedUser:any;
  name:string | undefined;
  totalAmount:number | undefined;
  disableButton:boolean = false;
  loaderEnable:boolean = false;
  val:string = 'add/booking';
  constructor(private hotelService:HotelServiceService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loggedUser = this.hotelService.loginDetail;
    if(this.loggedUser){
      this.name = this.loggedUser.name;
      this.disableButton = false;
    }
    else{
      this.name = '';
      this.disableButton = true;
    }
    this.roomDetail = this.hotelService.roomDetail[0];
    this.rangeDetail = this.hotelService.roomDetail[1].range;
    this.totalAmount = this.roomDetail.rent * this.rangeDetail.difference;
  }
  payNow(){
    this.loaderEnable = true;
    var obj = {
      hotel_id:this.roomDetail.id,
      user_id:this.loggedUser.id,
      start_date:this.rangeDetail.start,
      end_date:this.rangeDetail.end,
      total_amount:this.totalAmount,
    }
    this.hotelService.bookRoom(this.val,obj).subscribe((resp)=>{
      this.loaderEnable = false;
      this.openSnackBar();
    })
    console.log("payment to proceed")
  }

  openSnackBar() {
    this.snackBar.open('Room Booking Successfull !','', {
      duration: 3000,
    });
  }
}
