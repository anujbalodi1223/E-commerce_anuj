import { Component, OnInit } from '@angular/core';
import { CartService } from '../cartservice.service';
import { amounts, carts, products } from '../datatype';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductlistComponent } from '../productlist/productlist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-ppage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-ppage.component.html',
  styleUrls: ['./cart-ppage.component.css'] // corrected property name
})
export class CartPpageComponent implements OnInit { // implement OnInit
  cartdata: carts[] | undefined;
producta: products[]|undefined;
// cartdate:products| undefined;

  pricesummary: amounts = {
    amount: 0,
    discount: 0,
    tax: 0,
    totalamount: 0,
    delivery: 0,
    quantityfiedamount:0
  };

  constructor(private service: CartService,private router : Router) {}

  ngOnInit(): void {
    this.pricecalculator()
  }
  

  checkout(){
    this.router.navigate(['/checkout'])
  }

  pricecalculator(){
    this.service.currentcart().subscribe(
      (result) => {
        console.warn('Fetched cart data:', result);
        this.cartdata = result;
        let price = 0;
        result.forEach((item) => {
          if(item.quantity){
    price = price+(+item.price *+ item.quantity)
            
          }
        });
    
        this.pricesummary.amount = price;
        this.pricesummary.delivery = 100; // Fixed delivery cost
        this.pricesummary.discount = price / 20; // 5% discount
        this.pricesummary.tax = price / 10; // 10% tax
        this.pricesummary.totalamount = price + this.pricesummary.tax + this.pricesummary.delivery - this.pricesummary.discount;
        if(!this.cartdata.length){
          this.router.navigate(['Home'])
        }
              },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  removetocart(cartid:number | undefined){
    if (cartid) {
      this.service.removecartlist(cartid).subscribe((result) => {
        if (result) {
          this.pricecalculator();
        }
      });
    }
  }
}
