import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product : any=[]; 
    public grandTotal : number = 0;
    
    constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.product = res;
      this.grandTotal=this.cartService.getTotalPrice();
    })
  }

  removeitem(item:any){
  this.cartService.removeCardItem(item);
}
  emptycard(){
    this.cartService.removeAllCard();
  }

}
