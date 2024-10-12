import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { carts, orderdata, products } from './datatype';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartdata = new EventEmitter<products[] | []>();

  constructor(private http: HttpClient) {}

  localaddtocart(data: products) {
    let cardata: products[] = [];
    let localcarta = localStorage.getItem('localcart');
    if (!localcarta) {
      localStorage.setItem('localcart', JSON.stringify([data]));
      this.cartdata.emit([data]);
    } else {
      cardata = JSON.parse(localcarta);
      cardata.push(data);
      localStorage.setItem('localcart', JSON.stringify(cardata));
    }
    this.cartdata.emit(cardata);
  }

  removeitemfromcart(productid: number) {
    let cardata = localStorage.getItem('localcart');
    if (cardata) {
      let items: products[] = JSON.parse(cardata);
      items = items.filter((item: products) => productid !== item.id);
      localStorage.setItem('localcart', JSON.stringify(items));
      this.cartdata.emit(items);
    }
  }

  getcartlist(userid: number) {
    return this.http
      .get<products[]>(`http://localhost:3000/cart?userid=${userid}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartdata.emit(result.body);
        }
      });
  }

  removecartlist(cartid: number) {
    return this.http.delete(`http://localhost:3000/cart/` + cartid);
  }

  currentcart() {
    let userstore = localStorage.getItem('user');
    let userdata = userstore && JSON.parse(userstore);
    return this.http.get<carts[]>(
      `http://localhost:3000/cart?userid=` + userdata.id
    );
  }

  ordernow(data: orderdata) {
    return this.http.post(`http://localhost:3000/orders`, data);
  }
  orderlist() {
    let userstore = localStorage.getItem('user');
    let userdata = userstore && JSON.parse(userstore);
    return this.http.get<orderdata[]>(
      `http://localhost:3000/orders?userid=` + userdata.id
    );
  }

  deleetcart(cartid: number) {
    return this.http
      .delete(`http://localhost:3000/cart/` + cartid, { observe: `response` })
      .subscribe((result) => {
        this.cartdata.emit([]);
      });
  }

  orderdelete(orderid:number){
    return this.http.delete(`http://localhost:3000/orders/`+ orderid)
  }
}
