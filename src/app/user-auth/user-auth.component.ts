import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { products, signup } from '../datatype';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

import { carts } from '../datatype';
// import { EventEmitter } from 'stream';
// import { products } from '../datatype';
import { EventEmitter } from '@angular/core';
import { Console } from 'console';
import { CartService } from '../cartservice.service';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
  ],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showlogin: boolean = false;
  popupMessage: string = '';
  showPopup = false;
  popupType: 'success' | 'error' = 'success';
  cartdata = new EventEmitter<products[] | []>();

  // Font Awesome icons
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // Properties for password visibility toggle
  passwordFieldTypeSignup: string = 'password';
  passwordFieldTypeLogin: string = 'password';

  constructor(
    private http: HttpClient,
    private router: Router,
    private service : CartService

  ){}
  toggleLogin() {
    this.showlogin = !this.showlogin;
  }

  togglePasswordVisibilitySignup() {
    this.passwordFieldTypeSignup =
      this.passwordFieldTypeSignup === 'password' ? 'text' : 'password';
  }

  togglePasswordVisibilityLogin() {
    this.passwordFieldTypeLogin =
      this.passwordFieldTypeLogin === 'password' ? 'text' : 'password';
  }

  showPopupMessage(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

  usersignup(data: signup): void {
    this.http
      .post(`http://localhost:3000/users`, data, { observe: 'response' })
      .subscribe(
        (result) => {
          if (result) {
            localStorage.setItem('user', JSON.stringify(result.body));
            this.showPopupMessage('Signup successful!', 'success');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.showPopupMessage('Signup failed!', 'error');
        }
      );
  }

  loginportal(data: { email: string; password: string }): void {
    this.http
      .get<signup[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe(
        (result) => {
          if (result.body && result.body.length > 0) {
            localStorage.setItem('user', JSON.stringify(result.body[0]));
            this.showPopupMessage('Login successful!', 'success');
            this.router.navigate(['/']);
            this.localaddtoremotecart();
          } else {
            this.showPopupMessage(
              'The username or password do not match!',
              'error'
            );
          }
        },
        (error) => {
          this.showPopupMessage('Login failed!', 'error');
        }
      );
  }

  localaddtoremotecart() {
    let data = localStorage.getItem('localcart');
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;
    if (data) {
      let carddatelist = JSON.parse(data);

      carddatelist.forEach((product: products, index: any) => {
        let cardata: carts = {
          ...product,
          productid: product.id,
          userid,
        };

        delete cardata.id;
        setTimeout(() => {
          this.addtocartaaa(cardata).subscribe((result) => {
            if (result) {
              console.warn('item stored in db');
            }
          });
          if (carddatelist.length === index + 1) {
            localStorage.removeItem('localcart');
          }
        }, 500);
      });

      setTimeout(() => {
        this.service.getcartlist(userid);
      }, 2000);
    }
  }

  addtocartaaa(cartdata: carts) {
    return this.http.post(`http://localhost:3000/cart`, cartdata);
  }
  // getcartlist(userid: number) {
  //   return this.http.get<products[]>(`http://localhost:3000/cart?userid=` + userid, {
  //       observe: 'response'
  //     })
  //     .subscribe((result) => {
  //       console.warn("odbc ho gya gau");

  //       if (result && result.body) {
  //         this.cartdata.emit(result.body);
  //       }
  //     });
  // }
}
