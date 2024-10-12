import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home/home.component';
// h
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { SellerUpdateComponent } from './seller-update/seller-update.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
// import { UserAuthComponent } from './user-auth/user-auth.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { HttpClientModule } from '@angular/common/http';
import { CartPpageComponent } from './cart-ppage/cart-ppage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyordersComponent } from './myorders/myorders.component';
// import { authGuard } from './auth.guard';

export const routes: Routes = [
  
{
    path:'Home',
    component:HomeComponent,
    // canActivate:[authGuard]
},
{
    path:'Seller-auth',
    component:SellerAuthComponent
},
{
    path:'add-product',
    component:SellerAddProductComponent
},
{
    path:'productlist',
    component:ProductlistComponent
},
{
    path:'search/:query',
    component:SearchComponent
},
{
    path:'update/:id',
    component:SellerUpdateComponent
},
{
    path:'details/:productid',
    component:DetailsComponent

},
{
    path:'user-auth',
    component:UserAuthComponent
},
{
    path:'cart-page',
    component:CartPpageComponent
},
{
    path:'checkout',
    component:CheckoutComponent
},
{
    path:'myorders',
    component:MyordersComponent
}
];
