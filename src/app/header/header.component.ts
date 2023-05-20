import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartitem:number=0
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.carttitlecount.subscribe((data:any)=>{
      console.log(data);
      this.cartitem = data
    })
  }
  search(event:any){
    console.log(event.target.value);
    this.api.searchTerm.next(event.target.value) 
    // to assign new values to the behaviour subject
    
  }
}
