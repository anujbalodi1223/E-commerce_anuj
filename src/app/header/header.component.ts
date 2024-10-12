import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { products } from '../datatype';
import { CartService } from '../cartservice.service';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menutype: string = 'default';
  sellername: string = '';
  username: string = '';
  searchresult: undefined | products[];
  Cartitems = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: CartService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('manoj')) {
          this.menutype = 'seller';
          const sellerstore = localStorage.getItem('manoj');
          const sellerdata = sellerstore && JSON.parse(sellerstore);
          this.sellername = sellerdata?.name || '';
        } else if (localStorage.getItem('user')) {
          const userstore = localStorage.getItem('user');
          const userdata = userstore && JSON.parse(userstore);
          this.username = userdata?.name || '';
          this.menutype = 'user';
          this.service.getcartlist(userdata.id);
        } else {
          this.menutype = 'default';
        }
      }
    });

    let cartdata = localStorage.getItem('localcart');
    if (cartdata) {
      this.Cartitems = JSON.parse(cartdata).length;
    }
    this.service.cartdata.subscribe((items) => {
      this.Cartitems = items.length;
    });
  }

  login() {
    localStorage.removeItem('manoj');
    this.router.navigate(['home']);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('localcart');
    localStorage.removeItem('manoj');

    this.router.navigate(['/Home']);
    this.service.cartdata.emit([]);
  }

  searchproduct(query: string) {
    console.log('Searching for:', query); // Debugging
    return this.http.get<products[]>(`http://localhost:3000/Products`).pipe(
      map((products) => {
        // Filter products based on the query
        return products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      }),
      tap(result => console.log('Filtered Search results:', result)), // Log filtered results
      catchError(error => {
        console.error('Error fetching search results:', error);
        return of([]); // Return empty array on error
      })
    );
  }
  
  

  search(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    if (element.value) {
      console.log('Searching for:', element.value); // Debugging
      this.searchproduct(element.value).subscribe(
        (result) => {
          console.log('Search results:', result); // Debugging
          this.searchresult = result.length > 5 ? result.slice(0, 5) : result; // Limit to 5 results
        },
        (error) => {
          console.error('Error fetching search results:', error); // Error handling
        }
      );
    }
  }
  

  hidesearch() {
    this.searchresult = undefined;
  }

  redirecttodetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }

  submitsearch(val: string) {
    console.log('Submitting search for:', val); // Debugging
    this.router.navigate([`search/${val}`]);
  }
}
