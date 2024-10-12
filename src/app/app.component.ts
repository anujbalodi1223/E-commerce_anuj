import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import bootstrap from '../main.server';
import { HeaderComponent } from './header/header.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateComponent } from './seller-update/seller-update.component';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,RouterModule,HttpClientModule,CommonModule,SellerAddProductComponent,FontAwesomeModule,SellerUpdateComponent,DetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers:[HttpClientModule]
})
export class AppComponent {
  title = 'E-commerce';
}
