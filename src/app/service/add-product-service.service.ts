import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class AddProductServiceService {

  constructor(private http:HttpClient) { }

  addproducta(data:products){
    console.warn('service called')
    return this.http.post('http://localhost:3000/Products',data)
  }
}
