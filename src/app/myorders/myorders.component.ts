import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { CartService } from '../cartservice.service';
import { orderdata } from '../datatype';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent implements OnInit{
  constructor(private roues: Router, private service:CartService){}
orderdata:orderdata[]| undefined
 ngOnInit(): void {
   this.getorderlist();
 }
  cancelorder(orderid:number| undefined){
   orderid && this.service.orderdelete(orderid).subscribe((result)=>{
     this.getorderlist()
   })  }

  getorderlist(){
    this.service.orderlist().subscribe((result)=>{
      this.orderdata=result;
      })
  }
  }
