import {Component,OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HotelServiceService } from 'src/app/hotel-service.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  disableBooking:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  private hotelService:HotelServiceService) { }

  images = this.data[0].images;

  ngOnInit(): void {
    if(this.data[1].range.start == null && this.data[1].range.end){
      this.disableBooking = true;
    }
    else{
      this.disableBooking = false;
    }
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
}
