import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { retry } from 'rxjs';
import { products } from '../datatype';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-seller-update',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './seller-update.component.html',
  styleUrl: './seller-update.component.css'
})
export class SellerUpdateComponent implements OnInit {
  productdata:undefined | products
  constructor(private route:ActivatedRoute,private http:HttpClient,private routes:Router){}
  ngOnInit(): void {
    let productid=this.route.snapshot.paramMap.get('id')
    productid && this.getproduct(productid).subscribe((result)=>{
      console.warn(result)
      this.productdata=result
    })
  }
 submit(data:any){
  console.warn(data);
  if(this.productdata){
    data.id=this.productdata.id
  }
  this.updateproduct(data).subscribe((result)=>{

  })
  this.routes.navigate(['productlist'])
 }
 
 getproduct(id:string){
  return this.http.get<products>(`http://localhost:3000/Products/${id}`)
 }
 updateproduct(product:products){
return this.http.put<products>(`http://localhost:3000/Products/${product.id}`,product)
 }
}
