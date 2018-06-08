import { Component } from '@angular/core';
import { NavController,NavParams,Platform,ViewController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BlogListService } from '../../providers/blog-list-service';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';


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
  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public storage:Storage, public navParams: NavParams) {
  	if(navParams.get("service_type") != undefined){
  		this.service_type = navParams.get("service_type");
  		this.service_cost=navParams.get("service_cost");
  		this.service_costss = this.service_cost * 100;
  		localStorage.setItem('service_costss', this.service_costss);
  		this.service_id = navParams.get("service_id");
      this.recurring_request_id = navParams.get("recurring_request_id");
      localStorage.setItem('recurring_request_id', this.recurring_request_id);
      console.log(this.service_id);
  	}
  	if(navParams.get("sr_token") != undefined){
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
     if(this.userType != 'sponsor'){
        
        storage.get('id').then((id) => { this.elderId=id;});
      }
      else{
        this.elderId = this.selectedConnections;
      }
    localStorage.setItem('elderId', this.elderId);
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
paypartial(){
	 var recurringOption = {
      description: "Payment made for SR"+this.recurring_request_id+"",
      image: 'assets/img/elders-logo.png',
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: "82203780131",
        name: 'My Name'
      },
      
       notes: {
       "service_id":this.service_id,
		   //"service_type":this.service_type,
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

// var ajaxCallCheck = function(payment_id){
// console.log(localStorage.getItem("service_costss"));
  

//   var url  = "http://beta.eldersindia.com/api/razorPaymentResponseforPartialPayment";
//    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
// xmlhttp.open("POST", url,true);

// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
// xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costss")}));


// console.log(xmlhttp.responseText);
// xmlhttp.onload = function () {
//   var users = JSON.parse(xmlhttp.responseText);
//  var result=users.result;
//   }
// }

 var successCallback = function(payment_id) {
     // ajaxCallCheck(payment_id);
     console.log(localStorage.getItem("service_costss"));
  

  var url  = "http://192.168.1.187:8056/api/razorPaymentResponseforPartialPayment";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costss"),"recurring_request_id":  localStorage.getItem("recurring_request_id")}));


console.log(xmlhttp.responseText);
xmlhttp.onload = function () {
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  nav.setRoot(ServicerequestPage,{"status":"1","result":result});
  }
     

    }

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
    RazorpayCheckout.open(recurringOption, successCallback, cancelCallback);
}
   pay() {
console.log(this.elderId);

   	if(this.sr_token == undefined){
      console.log(this.package_amounts);
    var options = {
      description: 'Razorpay',
      image: 'assets/img/elders-logo.png',
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
      amount: this.package_amounts,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: "82203780131",
        name: 'My Name'
      },
      
       notes: {
       "package_id":this.packId,
		"elder_id":this.elderId,
		"vendor_id":this.vendor_id,
		"validity":this.package_validity,
		"user_type_id":this.user_type_id,
        email: this.email,
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
// var ajaxCallCheck = function(payment_id){

  

//   var url  = "http://beta.eldersindia.com/api/razorPaymentResponseforPackage";
//    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
// xmlhttp.open("POST", url,true);

// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
// xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("package_amounts")}));


// console.log(xmlhttp.responseText);
// xmlhttp.onload = function () {
//   var users = JSON.parse(xmlhttp.responseText);
//  var result=users.result;
//   nav.push(ServicerequestPage,{"status":"1","result":result});
//   }
// }

 var successCallback = function(payment_id) {
    

  var url  = "http://192.168.1.187:8056/api/razorPaymentResponseforPackage";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("package_amounts"),"elderId":  localStorage.getItem("elderId")}));


console.log(xmlhttp.responseText);
xmlhttp.onload = function () {
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  nav.push(ServicerequestPage,{"status":"1","result":result});
  }
    }

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
}
else{
	  var optionss = {
      description: "Payment made for "+this.sr_token+"",
      image: 'assets/img/elders-logo.png',
      currency: 'INR',
      key: 'rzp_test_53tdpMxkK8bFKw',
      amount: this.service_costs,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: "82203780131",
        name: 'My Name'
      },
      
       notes: {
       "service_id":this.service_id,
		   "amount":this.service_costs,
       "email": this.email,
       "payment_status":this.payment_status
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

// var ajaxCallCheck = function(payment_id){

  

//   var url  = "http://beta.eldersindia.com/api/razorPaymentResponsependingPayment";
//    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
// xmlhttp.open("POST", url,true);

// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
// xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costs")}));


// console.log(xmlhttp.responseText);
// xmlhttp.onload = function () {
//   var users = JSON.parse(xmlhttp.responseText);
  
//  var result=users.result;
//   }
// }

 var successCallback = function(payment_id) {
     // ajaxCallCheck(payment_id);

  var url  = "http://192.168.1.187:8056/api/razorPaymentResponsependingPayment";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"amount":  localStorage.getItem("service_costs")}));


console.log(xmlhttp.responseText);
xmlhttp.onload = function () {
  var users = JSON.parse(xmlhttp.responseText);
  
 var result=users.result;
   nav.setRoot(ServicerequestPage,{"status":"1","result":result});
  }

    }

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
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
