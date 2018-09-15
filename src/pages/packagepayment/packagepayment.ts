import { Component } from '@angular/core';
import { NavController,NavParams,Platform,ViewController,LoadingController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BlogListService } from '../../providers/blog-list-service';
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

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public viewCtrl: ViewController,public storage:Storage, public navParams: NavParams) {
  	 
    if(navParams.get("service_type") != undefined){
  		this.service_type = navParams.get("service_type");
  		this.service_cost=navParams.get("service_cost");
  		this.service_costss = (this.service_cost * 100).toFixed(0);
  		localStorage.setItem('service_costss', this.service_costss);
  		this.service_id = navParams.get("service_id");
      console.log(this.service_id);
      this.recurring_request_id = navParams.get("recurring_request_id");
      this.reqstatus = navParams.get("reqstatus");
      localStorage.setItem('recurring_request_id', this.recurring_request_id);
      console.log(this.service_id);
  	}
  	if(navParams.get("sr_token") != undefined){
         this.status = navParams.get("status");
      if(navParams.get("status") == "1"){
        this.sr_token=navParams.get("sr_token");
        this.service_type = navParams.get("service_type");
        this.service_cost=navParams.get("service_cost");
        this.service_costadd = (this.service_cost * 100).toFixed(0);
        localStorage.setItem('service_costadd', this.service_costadd);
        this.service_id = navParams.get("service_id");
        this.payment_status = navParams.get("payment_status");
      }
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
    storage.get('token').then((token) => { this.token=token;
   
    localStorage.setItem('key', this.token);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
          });
     storage.get('id').then((id) => { this.user_id=id; })
     storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id; })
     storage.get('name').then((name) => { this.name=name; })
     storage.get('email').then((email) => { this.email=email; })
     storage.get('phone').then((phone) => { this.phone=phone; })
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagepaymentPagePage');
  }
  payadditional(){
    console.log(this.service_type);
     var optionss = {
      description: "Payment made for "+this.sr_token+"",
      image: 'http://qa.eldersindia.com/assets/img/Elderlogo.png',
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
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

  var url  = "http://qa.eldersindia.com/api/razorPaymentResponseAdditionalServiceCost";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costadd")}));


console.log(xmlhttp.responseText);
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
      image: 'http://qa.eldersindia.com/assets/img/Elderlogo.png',
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

  var url  = "http://qa.eldersindia.com/api/razorPaymentResponseforPartialPayment";
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
      image: 'http://qa.eldersindia.com/assets/img/Elderlogo.png',
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
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

let nav = this.navCtrl;
let loading = this.loadingCtrl.create({content: 'Please wait...!'});
 var successCallback = function(payment_id) {
    
loading.present();
  var url  = "http://qa.eldersindia.com/api/razorPaymentResponseforPackage";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("package_amounts")}));

xmlhttp.onload = function () {
  loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  nav.push(PackageRequestPagePage,{"status":"1","result":result});
  } 
    }

var cancelCallback = function(error) {
  nav.push(PackageRequestPagePage);
  // alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
}
else{
	  var optionss = {
      description: "Payment made for "+this.sr_token+"",
      image: 'http://qa.eldersindia.com/assets/img/Elderlogo.png',
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
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

  var url  = "http://qa.eldersindia.com/api/razorPaymentResponsependingPayment";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costs")}));


console.log(xmlhttp.responseText);
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
