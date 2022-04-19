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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  private hotelService:HotelServiceService) { }

  images = this.data[0].imageUrls;

  ngOnInit(): void {
    console.log("what is in data ",this.data);
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
  bookingDetails(){
    this.hotelService.roomDetail = this.data;
    this.dialog.closeAll();
  }
}
