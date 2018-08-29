import { Component } from '@angular/core';
import { NavController,NavParams,Platform,ViewController,LoadingController} from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BlogListService } from '../../providers/blog-list-service';
import { ServiceProvider } from '../../providers/service-provider'
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';


import 'rxjs/add/operator/map';

declare var RazorpayCheckout: any;

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers:[BlogListService]

})
export class PaymentPage {
  service_name: any;
  Recreation_service: any;
  paymentData: any;
 headers;
token:string;
options:any;
rootUrl:any;
user_id:any;
 txnid:any;
 hash:any;
 key:any;
 productinfo:any;
 amount:any;
firstname:any;
surl:any;
furl:any;
service_provider:any;
udf1:any;
serviceData:any;
subcategory:any;
sub_category_id:any;
service_ids:any;
service:any;
category_id:any;
category:any;
servicecost:any;
datetime:any;
dependentId:any;
durations:any;
exclude_days:any;
from_date:any;
from_time:any;
serviceType:any;
selected_dates:any;
time_slot:any;
to_date:any;
to_time:any;
location_id:any;
lead_time:any;
vendor_id:any;
package_id:any;
preferred_time:any;
quantity:any;
serviceTypes:any;
service_request_id:any;
udf2:any;
udf3:any;
salt:any;
service_cost:any;
result:any;
datCount:any;
service_costs:any;
servicediscountcost:any;
paymenttype:any;
name:any;
email:any;
phone:any;
service_costss:any;
servicediscountcosts:any;
discounts:any;
totalservice_costss:any;
paidPayment:any;
afterdiscount_one_service:any;
servicediscountcost_one_service:any;
discountpartial:any;
serviceTitle:any;
base_cost:any;
payableamount:any;
servicediscost:any;
payableamounts:any;
getCustomerBalanceAmount:any;
get_custome_amount:any;
get_custome_deliever_amount:any;
get_custome_service_cancel_amount:any;
total_cost:any;
total_service_cost:any;
servicediscountcostss:any;
discountcost:any;
  constructor(public platform:Platform,public loadingCtrl: LoadingController,public viewCtrl: ViewController,public navParams: NavParams,public storage:Storage,
    public blogListService:BlogListService,public _provider:ServiceProvider,public navCtrl: NavController,private http: Http) {
   this.Recreation_service = navParams.get("service");
   if(navParams.get("service") == "Recreation"){
    this.paymentData = navParams.get("paymentData");
    this.service_name = this.paymentData.service_name;
    this.service_cost = this.paymentData.service_cost * 100;
    this.service_costs = this.service_cost;
    this.service_costss=(this.paymentData.service_cost * 100).toFixed(0);
    localStorage.setItem('service_costss', this.service_costss);
    this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;
      localStorage.setItem('key', this.token);
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.options = new RequestOptions({ headers: this.headers });
         })    
      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
   this.recreationRequestSubmitbeforePayment();
            });
       storage.get('id').then((id) => { this.user_id=id; })
       storage.get('name').then((name) => { this.name=name; })
       storage.get('email').then((email) => { this.email=email; })
       storage.get('phone').then((phone) => { this.phone=phone; })
     });
   }
   else if(navParams.get("service") == "Safety and security"){
        this.paymentData = navParams.get("paymentData");
    this.service_name = this.paymentData.service_name;
    this.service_cost = this.paymentData.service_cost * 100;
    this.service_costs = this.service_cost;
    this.service_costss=(this.paymentData.service_cost * 100).toFixed(0);
    localStorage.setItem('service_costss', this.service_costss);

    this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;
     
  localStorage.setItem('key', this.token);
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.options = new RequestOptions({ headers: this.headers });
         })    
      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
   this.safetyRequestSubmitbeforePayment();
            });
       storage.get('id').then((id) => { this.user_id=id; })
       storage.get('name').then((name) => { this.name=name; })
       storage.get('email').then((email) => { this.email=email; })
       storage.get('phone').then((phone) => { this.phone=phone; })
     });
   }
   else{
    this.serviceData=navParams.get("serviceData");
    this.serviceTitle=this.serviceData.serviceTitle;
    this.getCustomerBalanceAmount = this.serviceData.getCustomerBalanceAmount;
    this.get_custome_amount = this.serviceData.get_custome_amount;
    this.get_custome_deliever_amount = this.serviceData.get_custome_deliever_amount;
    localStorage.setItem('get_custome_deliever_amount', this.get_custome_deliever_amount);
    this.get_custome_service_cancel_amount = this.serviceData.get_custome_service_cancel_amount;
    this.total_cost = this.serviceData.total_cost;
    this.total_service_cost = this.serviceData.total_service_cost;
    this.servicediscountcostss = this.serviceData.servicediscountcost;
    this.discountcost = this.serviceData.discountcost;
    this.base_cost=this.serviceData.base_cost
    this.datCount=navParams.get("datCount");
    this.datetime=this.serviceData.datetime;
    this.paymenttype =navParams.get("paymenttype");
    this.dependentId =this.serviceData.dependentId;
    this.durations =this.serviceData.durations;
    this.exclude_days =this.serviceData.exclude_days;
    this.from_date=this.serviceData.from_date;
    this.from_time=this.serviceData.from_time;
    this.serviceType =this.serviceData.serviceType;
    this.selected_dates=this.serviceData.selected_dates;
    this.time_slot=this.serviceData.time_slot;
    this.to_date=this.serviceData.to_date;
    this.to_time=this.serviceData.to_time;
    this.package_id = this.serviceData.package_id;
    this.preferred_time= this.serviceData.preferred_time;
    this.quantity= this.serviceData.quantity;
    this.location_id=navParams.get("location_id");
    this.lead_time=navParams.get("lead_time");
    this.vendor_id=navParams.get("vendor_id");
    this.discounts=navParams.get("discounts");
    this.totalservice_costss=navParams.get("totalservice_costss");
    this.paidPayment = navParams.get("paidPayment");
    this.afterdiscount_one_service = navParams.get("afterdiscount_one_service");
    this.servicediscountcost_one_service = navParams.get("servicediscountcost_one_service");
    this.discountpartial = navParams.get("discountpartial");

  this.servicecost=navParams.get("servicecost");
  this.service_cost=this.servicecost*100;
  this.service_costs=navParams.get("service_costs");
  this.servicediscountcosts=navParams.get("servicediscountcost");
  this.servicediscost = navParams.get("servicediscountcost");
  this.payableamount = navParams.get("payableamount");
  this.payableamounts = (this.payableamount * 100).toFixed(0);
  this.servicediscountcost=navParams.get("servicediscountcost") * 100;
  this.category=navParams.get("category");

  this.category_id=navParams.get("category_id");

  this.service=navParams.get("service");

  this.service_ids=navParams.get("service_ids");

  this.sub_category_id=navParams.get("sub_category_id");
  console.log(this.sub_category_id);

  this.subcategory=navParams.get("subcategory");
this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
   
localStorage.setItem('key', this.token);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
 this.serviceRequestSubmitbeforePayment();
          });
     storage.get('id').then((id) => { this.user_id=id; })
     storage.get('name').then((name) => { this.name=name; })
     storage.get('email').then((email) => { this.email=email; })
     storage.get('phone').then((phone) => { this.phone=phone; })
   });
     if(this.get_custome_deliever_amount != 0 || this.getCustomerBalanceAmount != 0){
      this.service_costss=(this.total_service_cost * 100).toFixed(0);
     }
     else{
     if(this.datCount != undefined){
      this.service_costss=(this.servicediscountcostss * 100).toFixed(0);;
     }
     else{
        this.service_costss=this.service_cost;
     }
   }
     localStorage.setItem('service_costss', this.service_costss);
   } 
    
   
}
safetyRequestSubmitbeforePayment(){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  let payment_data =this.paymentData;
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,payment_data)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Try again later");
        this.navCtrl.pop();
      }
            })
}
recreationRequestSubmitbeforePayment(){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  let payment_data =this.paymentData;
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,payment_data)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Try again later");
        this.navCtrl.pop();
      }
            })
}

 serviceRequestSubmitbeforePayment(){

  if(this.paymenttype == "partial_payment"){
    this.servicediscountcosts = this.payableamount;
  }
  let paymentflag=1;
  if(this.datCount != undefined){
 let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
    this.blogListService.serviceRequestSubmitbeforePayment(this.rootUrl,this.servicecost,
      this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,
     this.subcategory,this.datetime,this.dependentId,this.durations,this.exclude_days,
     this.from_date,this.from_time,this.serviceType,this.selected_dates,this.time_slot,
     this.to_date,this.to_time,this.package_id,this.preferred_time,this.quantity,
     this.location_id,this.lead_time,this.vendor_id,this.datCount,this.service_costs,this.servicediscountcostss,
     this.paymenttype,paymentflag,this.discounts,this.totalservice_costss,this.discountcost,this.afterdiscount_one_service,this.servicediscountcost_one_service,
     this.discountpartial,this.base_cost,this.servicediscost,this.getCustomerBalanceAmount,this.get_custome_amount,this.get_custome_deliever_amount,
     this.get_custome_service_cancel_amount,this.total_cost,this.total_service_cost).subscribe(     
      (loginuser) => {
        this.udf3= loginuser.result.serviceType;
        this.udf2 = loginuser.result.service_request_id;
        loading.dismiss();
    },

    (err) => { 
      loading.dismiss();
        console.log(err);
        
    },
  )
  }
  else{
    console.log("one time");
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
    this.blogListService.serviceRequestSubmitbeforePayments(this.rootUrl,this.servicecost,
      this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,
     this.subcategory,this.datetime,this.dependentId,this.durations,this.exclude_days,
     this.from_date,this.from_time,this.serviceType,this.selected_dates,this.time_slot,
     this.to_date,this.to_time,this.package_id,this.preferred_time,this.quantity,
     this.location_id,this.lead_time,this.vendor_id,paymentflag,this.base_cost,this.getCustomerBalanceAmount,this.get_custome_amount,this.get_custome_deliever_amount,
     this.get_custome_service_cancel_amount,this.total_cost,this.total_service_cost).subscribe(     
      (loginuser) => {
        this.udf3= loginuser.result.serviceType;
        this.udf2 = loginuser.result.service_request_id;
        loading.dismiss();
    },

    (err) => { 
      loading.dismiss();
        console.log(err);
        
    },
  )}

  }
  payno(){
    this.dismiss();
  }
  payRecreation(){
    var options = {
      description: this.serviceTitle,
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: this.name
      },
      
       "notes": {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":this.get_custome_deliever_amount,
        "category_name":this.Recreation_service,
        "service_name":this.service_name,
        "service_cost":this.paymentData.service_cost,
        "pre_book":this.paymentData.service_cost
      },
      theme: {
        color: '#208ad6'
      },

    };
 let loading = this.loadingCtrl.create({content: 'Please wait...!'});

let navCtrl = this.navCtrl;
let nav = this.blogListService;
 var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = "http://beta.eldersindia.com/api/razorPaymentResponse";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);
   nav.showToast(result);

  }
      
     
    }

var cancelCallback = function(error) {
  nav.showToaster(error.description);
}


RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  pay() {
    console.log(this.service_costss);
    var options = { 
      description: this.serviceTitle,
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: ''
      },
      
       notes: {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":this.get_custome_deliever_amount,
        "category_name":this.category,
        "service_name":this.service
      },
      theme: {
        color: '#208ad6'
      },

    };
 let loading = this.loadingCtrl.create({content: 'Please wait...!'});

let navCtrl = this.navCtrl;
let nav = this.blogListService;
 var successCallback = function(payment_id) {

  loading.present();

  var url  = "http://beta.eldersindia.com/api/razorPaymentResponse";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);
   nav.showToast(result);

  }
      
     
    }

var cancelCallback = function(error) {
  nav.showToaster(error.description);
}


RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }

}