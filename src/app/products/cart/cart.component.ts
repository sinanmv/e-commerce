import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData:any=[]
  totalprice:number = 0
  paymentStatus:boolean= false

  offerstatus:boolean = true
  offerclicked:boolean = false

  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean = false
  showpaypal:boolean = false
  
  username:String = ''
  housenumber:String=''
  street:String=''
  pincode:String = ''
  state:String = ''
  constructor(private api:ApiService,private cartFb:FormBuilder){}
  cartform = this.cartFb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
    streetname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]

  })
  ngOnInit(): void {
    this.initConfig();
    this.api.getAllCart().subscribe((result:any)=>{
      console.log(result);
      this.cartData = result
      // call get cart total price
      this.getcarttotal()
      console.log(this.totalprice);
      
      
    },
    (result:any)=>{
      console.log(result);
      
    })
  }
  formValidate(){
    // console.log(this.cartform);
    
    if(this.cartform.valid){
      this.paymentStatus = true
      this.username = this.cartform.value.username || ""
      this.housenumber = this.cartform.value.housenumber || ""
      this.street = this.cartform.value.streetname || ""
      this.pincode = this.cartform.value.pincode || ""
      this.state = this.cartform.value.state || ""
    }
    else
    {
      alert("Invalid Form")
    }
  }
 
  deletecart(id:any){
   this.api.deletecart(id).subscribe((result:any)=>{
    console.log(result);
    alert("deleted item from cart")
    this.api.cartcount()
    this.cartData = result
    this.getcarttotal()
    
   },
   (result:any)=>{
    console.log(result);
    
  })
  }

  getcarttotal(){
    let total = 0
    this.cartData.forEach((item:any)=>{
      total += item.grandTotal //total
      this.totalprice = Math.ceil(total)
      this.paymentStatus = false
      this.cartform.reset()
      this.showpaypal = false

    })
  }
  incrementquantity(product:any){
    this.api.incrementcart(product).subscribe((result:any)=>{
      this.cartData =result
      this.api.cartcount()
      this.getcarttotal()

    })
  }
  decrementquantity(product:any){
    this.api.decrementcart(product).subscribe((result:any)=>{
      this.cartData =result
      this.api.cartcount()
      this.getcarttotal()
    })
  }
  proceedtopay(){
    this.showpaypal = true
  }
  offer(){
 

      this.offerstatus = false
      this.offerclicked = true

  }
  discount(value:any){
    this.totalprice = this.totalprice*(100-value)/100
    this.offerclicked = false

  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
