import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allproduct:any=[]
  searchterm:string = ''
  constructor(private api:ApiService){

  }
  ngOnInit(){
    this.api.getallproduct().subscribe((result:any)=>{
      console.log(result);
      this.allproduct = result

    })
    // this.searchTerm =  this.api.searchTerm
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchterm = result
    })
    console.log(this.searchterm);
    
  }
  addToCart(product:any){
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
