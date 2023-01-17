import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import {CartService} from 'src/app/Service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList : any;
  public filterCateogory:any;  //filter items
  searchkey:string="";   //search items

  constructor(private api:ApiService,private cartService:CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList=res;
      this.filterCateogory = res;

      this.productList.forEach((a:any)=>{
        if(a.category=== "Women's clothing" || a.category=== "men's clothing"){
          a.category="fashion"
        }
          Object.assign(a,{quantity:1,total:a.price});
      })
    })
 
  this.cartService.search.subscribe((val:any)=>{
    this.searchkey=val;
  })

}
  addtocart(item:any){
   this.cartService.addtoCart(item);
   alert('Added Successfully')
  }

  filter(category:string){
   this.filterCateogory= this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
         return a;
    }
  })
  }
}

