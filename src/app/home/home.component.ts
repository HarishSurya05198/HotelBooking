import { Component, OnInit, Inject } from '@angular/core';
import { HotelServiceService } from '../hotel-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RoomDetailsComponent} from '../home/room-details/room-details.component';
import {FormGroup, FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

export interface DialogData {
  details:any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Hotel-Booking';
  val = 'get/hotels';
  avail = 'get/hotelsForDates?start_date=';
  dateRange = {};
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  loaderEnable:boolean = true;
  dateError:boolean = false;
  roomDetails:any;
  constructor(
    private hotelService:HotelServiceService,
    private datePipe:DatePipe,
    private router: Router,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    this.checkAvail();
  }

  openDialog(e:any){
    this.dateError = false;
    var obj= [];
    obj.push(e);

    let dialogRef = this.dialog.open(RoomDetailsComponent, {
      data: obj,
      width:'60%',
      panelClass: 'details-container-class'
    });
  }

  checkAvail(){
    var start = this.datePipe.transform(this.range.value.start , 'YYYY-MM-dd')
    var end = this.datePipe.transform(this.range.value.end , 'YYYY-MM-dd')
    if(start != null && end != null){
      console.log("it is working in",this.avail+start+'&end_date='+end);
      this.hotelService.getAvailRooms(this.avail+start+'&end_date='+end).subscribe((resp)=>{
        this.loaderEnable = false;
        this.roomDetails = resp;
      })
    }
    else{
      this.hotelService.getRoomDetails(this.val).subscribe((resp)=>{
      this.loaderEnable = false;
      this.roomDetails = resp;
      console.log("Room Details from DB ", this.roomDetails);
    })
    }
  }

  addDateRange(){
    var start = this.datePipe.transform(this.range.value.start , 'YYYY-MM-dd')
    var end = this.datePipe.transform(this.range.value.end , 'YYYY-MM-dd')
    var diff = Math.floor((Date.UTC(this.range.value.end.getFullYear(), this.range.value.end.getMonth(), this.range.value.end.getDate()) - Date.UTC(this.range.value.start.getFullYear(), this.range.value.start.getMonth(), this.range.value.start.getDate()) ) /(1000 * 60 * 60 * 24));
    this.dateRange = {
      start: start,
      end: end,
      difference: diff,
    }
    return this.dateRange;
  }

  setObject(e:any){
    var obj = [];
    obj.push(e);
    var range = this.addDateRange();
    obj.push({"range":range});
    return obj;
  }

  bookingDetails(e:any){
    this.dateError = false;
    if(this.range.value.start != null && this.range.value.end != null){
      var obj = this.setObject(e);
      this.hotelService.roomDetail = obj;
      this.router.navigate(['/details'])
      this.dialog.closeAll();
    }
    else{
      this.dateError = true;
    }

  }

  pickerValue(){

  }
}
