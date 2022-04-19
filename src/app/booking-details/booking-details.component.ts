import { Component, OnInit } from '@angular/core';
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
  constructor(private hotelService:HotelServiceService) { }

  ngOnInit(): void {
    this.loggedUser = this.hotelService.loginDetail;
    console.log("logged user - ",this.loggedUser);
    this.roomDetail = this.hotelService.roomDetail[0];
    this.rangeDetail = this.hotelService.roomDetail[1].range;
    console.log("room booking detail ",this.roomDetail);
  }

}
