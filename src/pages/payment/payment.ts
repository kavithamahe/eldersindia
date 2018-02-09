import { Component } from '@angular/core';
import { NavController,NavParams,Platform,ViewController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';



import 'rxjs/add/operator/map';

declare var RazorpayCheckout: any;

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers:[BlogListService]

})
export class PaymentPage {
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
// payment_success:any ="";
  constructor(public platform:Platform,private iab: InAppBrowser,public viewCtrl: ViewController,public navParams: NavParams,public storage:Storage,public blogListService:BlogListService,public navCtrl: NavController,private http: Http) {
    // localStorage.getItem("payment_success");
    // console.log(localStorage.getItem("payment_success"));
    // this.payment_success=localStorage.getItem("payment_success");
    // if(this.payment_success == 1){
    //   this.blogListService.showToast("Request submitted successfully. Service provider will contact you shortly.")
    //   this.payment_success == "";
    // }
this.serviceData=navParams.get("serviceData");
    this.serviceData=navParams.get("serviceData");
    console.log(this.serviceData);
    this.datCount=this.serviceData.datCount;
    this.datetime=this.serviceData.datetime;
    this.paymenttype =this.serviceData.payment;
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

  this.servicecost=navParams.get("servicecost");
  this.service_cost=this.servicecost*100;
  this.service_costs=navParams.get("service_costs");
  this.servicediscountcosts=navParams.get("servicediscountcost");



  this.servicediscountcost=navParams.get("servicediscountcost") * 100;
  this.category=navParams.get("category");

  this.category_id=navParams.get("category_id");

  this.service=navParams.get("service");

  this.service_ids=navParams.get("service_ids");

  this.sub_category_id=navParams.get("sub_category_id");

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
     if(this.datCount != undefined){
      this.service_costss=this.servicediscountcost;

     }
     else{
      this.service_costss=this.service_cost;
     }
     localStorage.setItem('service_costss', this.service_costss);
}
 serviceRequestSubmitbeforePayment(){
  if(this.datCount != undefined){

    this.blogListService.serviceRequestSubmitbeforePayment(this.rootUrl,this.servicecost,
      this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,
     this.subcategory,this.datetime,this.dependentId,this.durations,this.exclude_days,
     this.from_date,this.from_time,this.serviceType,this.selected_dates,this.time_slot,
     this.to_date,this.to_time,this.package_id,this.preferred_time,this.quantity,
     this.location_id,this.lead_time,this.vendor_id,this.datCount,this.service_costs,this.servicediscountcosts,
     this.paymenttype).subscribe(     
      (loginuser) => {
        this.udf3= loginuser.result.serviceType;
        this.udf2 = loginuser.result.service_request_id;
    },

    (err) => { 
        console.log(err);
        
    },
  )
  }
  else{
    this.blogListService.serviceRequestSubmitbeforePayments(this.rootUrl,this.servicecost,
      this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,
     this.subcategory,this.datetime,this.dependentId,this.durations,this.exclude_days,
     this.from_date,this.from_time,this.serviceType,this.selected_dates,this.time_slot,
     this.to_date,this.to_time,this.package_id,this.preferred_time,this.quantity,
     this.location_id,this.lead_time,this.vendor_id).subscribe(     
      (loginuser) => {
        this.udf3= loginuser.result.serviceType;
        this.udf2 = loginuser.result.service_request_id;
    },

    (err) => { 
        console.log(err);
        
    },
  )
  }
    
  }

  pay() {
    var options = {
      description: 'Razorpay',
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
        service_id:this.udf2,
        service_type:this.udf3,
        email: this.email,
      },
      theme: {
        color: '#208ad6'
      },
      modal: {
        ondismiss: function() {
          localStorage.getItem("payment_success");
    console.log(localStorage.getItem("payment_success"));
          alert('dismissed')
        }
      }
    };


var ajaxCallCheck = function(payment_id){

  

  var url  = "http://192.168.1.187:8000/api/razorPaymentResponse";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"service_cost":  localStorage.getItem("service_costss")}));
console.log(localStorage.getItem("service_costss"));
// xmlhttp.send(JSON.stringify({ "service_cost":  localStorage.getItem("service_costss")}));

console.log(xmlhttp.responseText);


xmlhttp.onload = function () {
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
 alert(result);
 // let payment_success ="1";
 // localStorage.setItem('payment_success', payment_success);

  }
}

 var successCallback = function(payment_id) {
      ajaxCallCheck(payment_id);
       // this.navCtrl.push(DashboardPage,{
       //         //status: result
       //    });
    }

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
}

RazorpayCheckout.on('payment.success', successCallback);
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }

}