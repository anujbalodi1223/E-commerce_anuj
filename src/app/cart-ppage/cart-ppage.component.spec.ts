import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPpageComponent } from './cart-ppage.component';

describe('CartPpageComponent', () => {
  let component: CartPpageComponent;
  let fixture: ComponentFixture<CartPpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartPpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
