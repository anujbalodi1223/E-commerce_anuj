import { Component, OnInit } from '@angular/core';
import bootstrap from '../../main.server';
import { NgbCarouselModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { products } from '../datatype';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularproducts:undefined | products[]
	// images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  listofproducts:undefined | products[]
 constructor(private http:HttpClient){}
 popular(){
  return this.http.get<products[]>('http://localhost:3000/Products?_limit=10')
} 
 ngOnInit(): void {
   
  this.popular().subscribe((data)=>{
    console.warn(data)
    this.popularproducts=data;
  })

  this.getproduct().subscribe((result)=>{
    this.listofproducts=result
  })
 }
 getproduct(){
  return this.http.get<products[]>('http://localhost:3000/Products')
} 

}
