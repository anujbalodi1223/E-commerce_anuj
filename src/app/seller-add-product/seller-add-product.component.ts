import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddProductServiceService } from '../service/add-product-service.service';
import { products } from '../datatype';
import { timeStamp } from 'node:console';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  constructor(private http:HttpClient){}
  addproductmessagge:string|undefined;
  submit(data:products){
    console.warn(data)
    return this.http.post('http://localhost:3000/Products',data).subscribe((result)=>{
      console.warn(result)
      if(result){
        this.addproductmessagge='Product created successfully';
      }
      setTimeout(()=>(this.addproductmessagge=undefined),3000);
    })
  }
}
