import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { products } from '../datatype';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresult: undefined | products[];

  constructor(private activvateroute: ActivatedRoute, private header: HeaderComponent) {}

  ngOnInit(): void {
    let query = this.activvateroute.snapshot.paramMap.get('query');
    console.log('Search query from route:', query); // Debugging
    if (query) {
      this.header.searchproduct(query).subscribe(
        (result) => {
          console.log('Search results for route query:', result); // Debugging
          this.searchresult = result;
        },
        (error) => {
          console.error('Error fetching search results for query:', error); // Error handling
        }
      );
    }
  }
}
