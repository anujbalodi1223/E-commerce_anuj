import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { products } from '../datatype';
import { CommonModule } from '@angular/common';
import { retry } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FontAwesomeModule,RouterLink,RouterModule],
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  ngOnInit(): void {
    this.online()
  }
  constructor(public http: HttpClient) {}
  productlist: undefined | products[];
  deleteMessage: undefined | string;
  icon=faTrash;
  editicon=faEdit;

  online(){
     this.http
      .get<products[]>('http://localhost:3000/Products')
      .subscribe((result) => {
        console.warn(result);
        this.productlist = result;
      });

      
  }

  deleteProduct(id: number) {
    console.warn('test id ', id);
    this.delete(id).subscribe((result) => {
      if (result) {
          confirm('are you sure')
        this.deleteMessage = 'Product deleted';
      }
      this.online()
    });
  }
// editProduct(id:number){
// this.edit(id).subscribe((result)=>{
//   if(result){
//     console.warn('test edit',result)
//   }
// })
// }
  delete(id: number) {
    return this.http.delete(`http://localhost:3000/Products/${id}`);
  }
  // edit(id:number){
  //  return this.http.put(`http://localhost:3000/Products/${id}`,id)
  // }
}
