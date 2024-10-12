import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { carts, products } from '../datatype';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cartservice.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productdata: undefined | products;
  productquantity: number = 1;
  removecart = false;
  cartdate:products| undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private product: CartService
  ) {}

  ngOnInit(): void {
    let odbc = this.route.snapshot.paramMap.get('productid');
    console.warn(odbc);
    odbc &&
      this.getproduct(odbc).subscribe((result) => {
        console.warn(result);
        this.productdata = result;
      });

    let Cardata = localStorage.getItem('localcart');
    if (odbc && Cardata) {
      let items = JSON.parse(Cardata);
      items = items.filter((item: products) => odbc == item.id.toString());
      if (items.length) {
        this.removecart = true;
      } else {
        this.removecart = false;
      }
    }

    //when we refresh the page so that cart should be came from dtaabae auto atically of that particular
    // logged in user this code is basically for that 
    var user= localStorage.getItem('user');
    if(user){

      var userid = user && JSON.parse(user).id;
this.product.getcartlist(userid);
this.product.cartdata.subscribe((result)=>{
  let item = result.filter((item:products)=>odbc?.toString()===item.productid)
  if(item.length){
    this.cartdate=item[0];
this.removecart=true;
  }
})

    }
  }

  getproduct(id: string) {
    return this.http.get<products>(`http://localhost:3000/Products/${id}`);
  }

  handlequantity(val: string) {
    if (this.productquantity < 20 && val === 'plus') {
      this.productquantity += 1;
    } else if (this.productquantity > 1 && val === 'min') {
      this.productquantity -= 1;
    }
  }

  addtocart() {
    if (this.productdata) {
      this.productdata.quantity = this.productquantity;
      if (localStorage.getItem('user')) {
        // console.warn(this.productdata);
        this.product.localaddtocart(this.productdata);
        this.removecart = true;
        var user= localStorage.getItem('user');
        var userid = user && JSON.parse(user).id;
        console.warn(userid);
        let caradata:carts ={
          ...this.productdata,
          userid,
          productid:this.productdata.id
        }
        delete caradata.id
        console.warn(caradata)
        this.addtocartaaa(caradata).subscribe((result)=>{
          if(result){
            this.product.getcartlist(userid);
            this.removecart=true;
          }
        })
      }
    

      } else {
        console.warn('user is logged in')
      }}

  removecarta(productid: number) {
    if(!localStorage.getItem('user')){
      this.product.removeitemfromcart(productid);
    }
    else{
      console.warn(this.cartdate)
      var user= localStorage.getItem('user');
        var userid = user && JSON.parse(user).id;
        this.cartdate && this.product.removecartlist(this.cartdate?.id).subscribe((result)=>{
            if(result){
              this.product.getcartlist(userid)
            }
        })
        this.removecart = false;

    }
    
  }

  addtocartaaa(cartdata:carts){
    return this.http.post(`http://localhost:3000/cart`,cartdata);
  }
}
