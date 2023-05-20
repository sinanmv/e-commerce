import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit{
  wishlistdata:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.getallwishlist().subscribe((result:any)=>{
      console.log(result);
      this.wishlistdata = result
      
    })
    }
    deletewishlistproduct(id:any){
      this.api.deletewishlist(id).subscribe((result:any)=>{
        console.log(result);
        alert("item deleted")
        this.wishlistdata = result
        
      },
      (result:any)=>{
        console.log(result.error);
      })
    }
    addtocart(product:any){
      // add to quantity
      Object.assign(product,{quantity:1})
      console.log(product);
  
      this.api.addToCart(product).subscribe((result:any)=>{
        this.api.cartcount()
        this.deletewishlistproduct(product.id)
        alert(result);
        
      },
      (result:any)=>{
        console.log(result.error);
        
      })
   }
}
