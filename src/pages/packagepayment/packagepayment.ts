import { Component } from '@angular/core';
import { NavController,NavParams,Platform,ViewController,LoadingController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BlogListService } from '../../providers/blog-list-service';
import { ServiceProvider } from '../../providers/service-provider';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';
import {PackageRequestPagePage } from '../../pages/package-request/package-request';


import 'rxjs/add/operator/map';

declare var RazorpayCheckout: any;
@Component({
  selector: 'page-packagepayment',
  templateUrl: 'packagepayment.html'
})
export class PackagepaymentPagePage {
headers;
token:string;
options:any;
rootUrl:any;
user_id:any;
name:any;
email:any;
phone:any;
user_type_id:any;
selectedConnections:any;
packId:any;
package_validity:any;
vendor_id:any;
package_amount:any;
package_amounts:any;
service_cost:any;
service_costs:any;
sr_token:any;
service_id:any;
service_type:any;
service_costss:any;
payment_status:any;
recurring_request_id:any;
userType:any;
elderId:any;
status:any;
pending_service_amount:any;
prev_service_amount_balance:any;
service_costadd:any;
additional_service_cost:any;
reqstatus:any;
paymentType:any;
imageUrl:any;
wallet_value:any;
coupan_offer:any;
coupon_id:any;
razorkey:any;
  constructor(public navCtrl: NavController,public blogListService:BlogListService,public _provider:ServiceProvider,public loadingCtrl: LoadingController,public viewCtrl: ViewController,public storage:Storage, public navParams: NavParams) {
  	 
    if(navParams.get("service_type") != undefined){
  		this.service_type = navParams.get("service_type");
  		this.service_cost=navParams.get("service_cost");
  		this.service_costss = (this.service_cost * 100);
  		localStorage.setItem('service_costss', this.service_costss);
  		this.service_id = navParams.get("service_id");
      this.recurring_request_id = navParams.get("recurring_request_id");
      this.reqstatus = navParams.get("reqstatus");
      localStorage.setItem('recurring_request_id', this.recurring_request_id);
  	}
  	if(navParams.get("sr_token") != undefined){
         this.status = navParams.get("status");
      if(navParams.get("status") == "1"){
        this.sr_token=navParams.get("sr_token");
        this.service_type = navParams.get("service_type");
        this.service_cost=navParams.get("service_cost");
        this.service_costadd = (this.service_cost * 100);
        localStorage.setItem('service_costadd', this.service_costadd);
        this.service_id = navParams.get("service_id");
        this.payment_status = navParams.get("payment_status");
      }
      this.paymentType = navParams.get("paymentType");
      localStorage.setItem('paymentType', this.paymentType);
      this.pending_service_amount=navParams.get("pending_service_amount");
      this.prev_service_amount_balance=navParams.get("prev_service_amount_balance");
      this.additional_service_cost=navParams.get("additional_service_cost");
  	this.sr_token=navParams.get("sr_token");
  	this.service_cost=navParams.get("service_cost");
    this.payment_status = navParams.get("payment_status");
  	this.service_costs = this.service_cost * 100;
  	localStorage.setItem('service_costs', this.service_costs);
  	this.service_id = navParams.get("service_id");
  }
  else{
  	this.packId=navParams.get("packId");
  	this.vendor_id=navParams.get("vendor_id");
  	this.package_validity=navParams.get("package_validity");
    this.wallet_value=navParams.get("wallet_value");
    if(this.wallet_value == undefined || this.wallet_value == null || this.wallet_value == ""){
    this.wallet_value = 0;
    }
    localStorage.setItem('wallet_value', this.wallet_value);
    this.coupon_id = navParams.get("coupon_id");
    if(this.coupon_id == undefined || this.coupon_id == null || this.coupon_id == ""){
    this.coupon_id = 0;
    }
    localStorage.setItem('coupon_id', this.coupon_id);
    this.coupan_offer = navParams.get("coupan_offer");
     if(this.coupan_offer == undefined || this.coupan_offer == null || this.coupan_offer == ""){
    this.coupan_offer = 0;
  }
    localStorage.setItem('coupan_offer', this.coupan_offer);
  	this.selectedConnections=navParams.get("selectedConnections");
     storage.get('user_type').then((user_type) => { this.userType=user_type;});
      storage.get('user_type_id').then((user_type_id) => { this.user_id=user_type_id;
     if(this.userType != 'sponsor'){
        
        this.elderId=this.user_id;
      }
      else{
        this.elderId = this.selectedConnections;
      }
    localStorage.setItem('elderId', this.elderId);
     })
  	this.package_amount = navParams.get("package_amount");
  	this.package_amounts = this.package_amount * 100;
  	localStorage.setItem('package_amounts', this.package_amounts);
}
  	this.storage.ready().then(() => {
       storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
       storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
       localStorage.setItem('rootUrl', this.rootUrl);});
    storage.get('token').then((token) => { this.token=token;
   
    localStorage.setItem('key', this.token);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
          });
     storage.get('id').then((id) => { this.user_id=id; })
     storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id; })
     storage.get('name').then((name) => { this.name=name; })
     storage.get('email').then((email) => { this.email=email; })
     storage.get('phone').then((phone) => { this.phone=phone; })
   });
    this.getRazorPaymentsaltKey();
  }
getRazorPaymentsaltKey(){
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`getRazorPaymentsaltKey`,"")
  .subscribe(
      data =>{
          this.razorkey= data.result.test_key;
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
     
            })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagepaymentPagePage');
  }
  payadditional(){
    console.log(this.service_type);
     var optionss = {
      description: "Payment made for "+this.sr_token+"",
      image: this.imageUrl + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costadd,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: ''
      },
      
       notes: {
       "service_id":this.service_id,
       "amount":this.service_costadd,
       "email": this.email,
       "service_type":this.service_type,
       // "payment_status":this.payment_status
      },
      theme: {
        color: '#208ad6'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

let nav = this.navCtrl;
let loading = this.loadingCtrl.create({content: 'Please wait...!'});

 var successCallback = function(payment_id) {
     loading.present();

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponseAdditionalServiceCost";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costadd")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
  
 var result=users.result;
   nav.setRoot(ServicerequestPage,{"status":"1","result":result});
  }

    }

var cancelCallback = function(error) {
   nav.setRoot(ServicerequestPage);
  // alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
    RazorpayCheckout.open(optionss, successCallback, cancelCallback);
  }
paypartial(){
  console.log(this.service_id);
	 var recurringOption = {
      description: "Payment made for SR"+this.recurring_request_id+"",
      image: this.imageUrl + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: ''
      },
      
       notes: {
       "service_id":this.service_id,
		   "amount": this.service_costss,
       "email": this.email,
      },
      theme: {
        color: '#208ad6'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };
let nav = this.navCtrl;
let loading = this.loadingCtrl.create({content: 'Please wait...!'});

 var successCallback = function(payment_id) {
     loading.present();

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponseforPartialPayment";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costss"),"recurring_request_id":  localStorage.getItem("recurring_request_id")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  nav.setRoot(ServicerequestPage,{"status":"1","result":result});
  }
 }

var cancelCallback = function(error) {
  nav.setRoot(ServicerequestPage);
  // alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(recurringOption, successCallback, cancelCallback);
}
   pay() {

    console.log(this.elderId);
   	if(this.sr_token == undefined){
 
    var options = {
      description: 'Razorpay',
      image: this.imageUrl + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.package_amounts,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: ''
      },
      
       notes: {
        "package_id":this.packId,
    		"elder_id":this.elderId,
    		"vendor_id":this.vendor_id,
    		"validity":this.package_validity,
        "payment_id":2,
    		"user_type_id":this.user_type_id,
        "email": this.email,
      },
      theme: {
        color: '#208ad6'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };
let toaster = this.blogListService;
let nav = this.navCtrl;
if(this.coupon_id == undefined || this.coupon_id == 0){
let loading = this.loadingCtrl.create({content: 'Please wait...!'});
 var successCallback = function(payment_id) {
    
loading.present();
  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponseforPackage";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("package_amounts"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  nav.setRoot(PackageRequestPagePage,{"status":"1","result":result});
  } 
    }
}
else{
  let loading = this.loadingCtrl.create({content: 'Please wait...!'});
 var successCallback = function(payment_id) {
    
loading.present();
  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponseforPackage";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("package_amounts"),"coupon_id":localStorage.getItem("coupon_id"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  nav.setRoot(PackageRequestPagePage,{"status":"1","result":result});
  } 
    }
}
var cancelCallback = function(error) {
  toaster.showToaster(error.description);
 nav.pop();
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
}
else{
	  var optionss = {
      description: "Payment made for "+this.sr_token+"",
      image: this.imageUrl + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costs,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: ''
      },
      "notes": {
        "service_id":this.service_id,
        'email': this.email,
        'amount': this.service_costs,
        'payment_status': this.payment_status,
        'additional_cost':this.additional_service_cost,
        'prev_service_amount':this.prev_service_amount_balance
      },
      
      theme: {
        color: '#208ad6'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

let nav = this.navCtrl;

let loading = this.loadingCtrl.create({content: 'Please wait...!'});
 var successCallback = function(payment_id) {
    loading.present();
     // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponsependingPayment";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costs"),"paymentType":localStorage.getItem("paymentType")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
  
 var result=users.result;
   nav.setRoot(ServicerequestPage,{"status":"1","result":result});
  }

    }

var cancelCallback = function(error) {
  nav.setRoot(ServicerequestPage);
  // alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
    RazorpayCheckout.open(optionss, successCallback, cancelCallback);
  }
}
  payno(){
    this.dismiss();
  }
dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }
}
