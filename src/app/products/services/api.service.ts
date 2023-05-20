import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // to hold search value
  searchTerm =  new BehaviorSubject('')
// to hold cart count
carttitlecount = new BehaviorSubject(0)

baseUrl='https://e-cart-zioj.onrender.com'
  constructor(private http:HttpClient) {
    this.cartcount()
   }

  // api call for get all products
  getallproduct(){
   return this.http.get(`${this.baseUrl}/products/all-products`)
  }
// api call for get view product
// http://localhost:5000/product/view-product/5
  viewproduct(id:any){
    return this.http.get(`${this.baseUrl}/product/view-product/${id}`)
  }
  // api call for add to wishlist
  
  addtowishlist(id:any,title:any,price:any,image:any){
    const body={
      id,title,price,image
    }
    return this.http.post(`${this.baseUrl}/wishlist/add-to-wishlist`,body)
  }
  getallwishlist(){
    return this.http.get(`${this.baseUrl}/wishlist/getwishlistproduct`)
  }
  deletewishlist(id:any){
    return this.http.delete(`${this.baseUrl}/wishlist/delete-wishlist-product/${id}`)
  }
  addToCart(product:any){
    const body = {
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.baseUrl}/cart/add-to-cart`,body)
  }
  getAllCart(){
    return this.http.get(`${this.baseUrl}/cart/get-all-cart`)
  }
  cartcount(){
    this.getAllCart().subscribe((result:any)=>{
      this.carttitlecount.next(result.length);//array of cart items
  })
}
deletecart(id:any){
  return this.http.delete(`${this.baseUrl}/cart/remove-cart/${id}`)
}

incrementcart(product:any)
{
  const id = product.id
  return this.http.get(`${this.baseUrl}/cart/incrementquantity/${id}`)
}
decrementcart(product:any){
  const id = product.id
  return this.http.get(`${this.baseUrl}/cart/decrementquantity/${id}`)
}
}
