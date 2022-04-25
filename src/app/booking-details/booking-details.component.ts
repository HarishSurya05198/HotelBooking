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
  val:string = 'bookRoom';
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
    this.totalAmount = this.roomDetail.rentPerDay * this.rangeDetail.difference;
  }
  payNow(){
    this.loaderEnable = true;
    var obj = {
      room:this.roomDetail.name,
      roomId:this.roomDetail._id,
      userId:this.loggedUser.name,
      fromDate:this.rangeDetail.start,
      toDate:this.rangeDetail.end,
      totalAmount:this.totalAmount,
      totalDays:this.rangeDetail.difference,
      status:'Booked',
      transactionId:'1234',
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
