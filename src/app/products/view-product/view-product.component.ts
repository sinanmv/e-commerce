import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
  productId:string=''
  productData:any={}

  constructor(private activatedRoute:ActivatedRoute,private api:ApiService){


  }
  ngOnInit(): void{
    this.activatedRoute.params.subscribe((data:any)=>{
      console.log(data.id);
      this.productId = data.id
      
    })
    this.api.viewproduct(this.productId).subscribe((result:any)=>{
      this.productData = result
      console.log(this.productData);
      
    })
  }
  addtowishlist(){
    const {id,title,price,image}= this.productData
    this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    })
  }
  addtocart(product:any){
     // add to quantity
     Object.assign(product,{quantity:1})
     console.log(product);
 
     this.api.addToCart(product).subscribe((result:any)=>{
       this.api.cartcount()
       alert(result);
       
     },
     (result:any)=>{
       console.log(result.error);
       
     })
  }

}
