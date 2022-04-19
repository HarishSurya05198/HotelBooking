import { Component ,OnInit} from '@angular/core';
import {HotelServiceService} from './hotel-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private hotelService:HotelServiceService){}

  user:any = 'null';
  ngOnInit(): void {
    this.hotelService.getRefresh().subscribe(userVal =>{
      this.user = userVal;
    })
  }

  logout(){
    var val = 'null';
    this.hotelService.sendRefresh(val);
    window.location.href = '/login';
  }
}
