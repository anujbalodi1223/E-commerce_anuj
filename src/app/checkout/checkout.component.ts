import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cartservice.service';
import { carts, orderdata } from '../datatype';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalprice: number | undefined;
  cardata:carts[]|undefined;
  ordermsg:string | undefined;
  constructor(private service: CartService,private router : Router) {}
  ngOnInit(): void {
    this.service.currentcart().subscribe((result) => {
      let price = 0;
      this.cardata=result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalprice = price + price / 10 + 100 - price / 20;
      console.warn(this.totalprice);
    });
  }

  ordernow(data: { Email: string; Address: string; Contactdetails: number }) {
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;
    if (this.totalprice) {
      let orderdata: orderdata = {
        ...data,
        totalprice: this.totalprice,
        userid,
        id:undefined


      }
      this.cardata?.forEach((item)=>{
        setTimeout(() => {
         item.id &&  this.service.deleetcart(item.id)
        }, 600);
      })
      this.service.ordernow(orderdata).subscribe((result)=>{
        if(result){
this.ordermsg='your order has been Placed';
setTimeout(() => {
  this.router.navigate(['/myorders'])
  this.ordermsg=undefined;
}, 4000);
        }
      })
    }
  }

}
