import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  standalone:true,
  imports:[FormsModule,CommonModule,HttpClientModule],
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private router: Router, private http:HttpClient) {}
  showlogin=false;

  usersignup(data:any){
    return this.http.post('http://localhost:3000/seller',data)
  }
  signup(data: any): void {

    this.usersignup(data).subscribe((result)=>{
      console.warn(result)
      localStorage.setItem("manoj", JSON.stringify(data));
      // console.log('LocalStorage:', localStorage.getItem("manoj"));
      // this.router.navigate(['Home']);
    })
    // console.warn('Signup Data:', data);
  
  }  
  login(){
    this.showlogin=true
  }

  login2(){
    this.showlogin=false
  }
  loginportal(data:any){
 console.warn(data)
 this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
 data,).subscribe((result)=>{
  console.warn(result)
  localStorage.setItem("manoj", JSON.stringify(data));
this.router.navigate(['Home'])
 })
  }
}
