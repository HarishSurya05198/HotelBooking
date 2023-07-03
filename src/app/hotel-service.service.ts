import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {
  baseUrl = 'http://localhost:4000/';
  baseRoomSlot = 'api/rooms/';
  baseUserSlot = 'api/user/';
  baseBookSlot = 'api/v1/';
  otpSlot = 'api/otp/';
  roomDetail:any;
  loginDetail:any;
  OtpVerFlag:Boolean = false;
  private reloadLogin = new Subject<any>();

  constructor(private httpService:HttpClient) { }

  getRoomDetails(val: string){
    return this.httpService.get(this.baseRoomSlot+val);
  }

  getAvailRooms(val:string){
    return this.httpService.get(this.baseRoomSlot+val);
  }

  sendOtp(val: string, obj:any){
    return this.httpService.post(this.otpSlot+val,obj);
  }
  verifyOtp(val: string, obj:any){
    return this.httpService.post(this.otpSlot+val,obj);
  }

  registerUser(val: string, obj:any){
    return this.httpService.post(this.baseUserSlot+val,obj);
  }
  bookRoom(val: string, obj:any){
    return this.httpService.post(this.baseBookSlot+val,obj);
  }
  loginUser(val: string, obj:any){
    return this.httpService.post(this.baseUserSlot+val,obj);
  }
  sendRefresh(message:any){
    this.loginDetail = message;
    this.reloadLogin.next(message);
  }
  getRefresh(){
    return this.reloadLogin.asObservable();
  }
}
