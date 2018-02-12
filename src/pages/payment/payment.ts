import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams ,Platform} from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SubcategoryListPage } from '../../pages/subcategory-list/subcategory-list';

declare var cordova;
declare var RazorpayCheckout: any;


/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
email:any;
phone:any;
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
   constructor(public iab:InAppBrowser,public platform: Platform,public http: Http,public navCtrl: NavController,public storage:Storage,public blogListService:BlogListService, public navParams: NavParams) {
  
  this.serviceData=navParams.get("serviceData");
    this.serviceData=navParams.get("serviceData");
    this.datetime=this.serviceData.datetime;
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

  this.category=navParams.get("category");

  this.category_id=navParams.get("category_id");

  this.service=navParams.get("service");

  this.service_ids=navParams.get("service_ids");

  this.sub_category_id=navParams.get("sub_category_id");

  this.subcategory=navParams.get("subcategory");

  console.log(this.serviceData);
  this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      console.log(this.rootUrl);
      //this.getHashKey();
      this.serviceRequestSubmitbeforePayment();
      });
     storage.get('id').then((id) => { this.user_id=id; })
   });
  this.getTxnId();
  
   this.key="rjQUPktU";
   this.salt="e5iIg1jwi8"
 this.productinfo="We are ApnaCare, a comprehensive healthcare resources company that is committed to take care of the health and wellness of the elderly in India. To do so, we have over the years built our expertise in the curation and delivery of the best-in-class elderly healthcare services, healthcare professionals and home care. Our specialists offer a range of home healthcare services including post hospitalization care, rehab care, physiotherapy, doctor visits, diagnostics, supply of medical equipment, and assistance in identifying suitable living spaces for the elderly. Our services can be accessed globally to serve the elderly living in Bangalore, Chennai, Hyderabad, Kolkata and Mumbai.";
this.amount=this.servicecost;
this.firstname='arun';
this.email="muthu.k@quadrupleindia.com";
this.phone="82203780131";
this.surl="http://192.168.1.187:8000/paymentsuccessforSR";
this.furl="http://192.168.1.187:8000/paymentfailureforSR";
this.service_provider="payu_paisa";
this.udf1="6";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');

  }





  serviceRequestSubmitbeforePayment(){
    this.blogListService.serviceRequestSubmitbeforePayment(this.rootUrl,this.servicecost,
      this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,
     this.subcategory,this.datetime,this.dependentId,this.durations,this.exclude_days,
     this.from_date,this.from_time,this.serviceType,this.selected_dates,this.time_slot,
     this.to_date,this.to_time,this.package_id,this.preferred_time,this.quantity,
     this.location_id,this.lead_time,this.vendor_id).subscribe(     
      (loginuser) => {
        console.log(loginuser.result);
        this.udf3= loginuser.result.serviceType;
        console.log(this.udf3);
        this.udf2 = loginuser.result.service_request_id;
        this.getHashKey();
    },

    (err) => { 
        console.log(err);
        
    },
  )
  }

getHashKey()
{
     this.blogListService.paymentTran(this.rootUrl,this.key,this.productinfo,this.txnid,this.amount,this.firstname,this.email,
      this.phone,this.surl,this.service_provider,this.udf1,this.udf2,this.udf3).subscribe(     
      (loginuser) => {
        this.hash=loginuser.result;
    },

    (err) => { 
        console.log(err);
        
    },
  )   
}

   submitForm(sendParam){
   // var url = "https://www.payumoney/payuBiz.html?amount="+amt+"&name="+name+"&mobileNo="+mobile+"&email="+email+"&bookingId="+bookingId+"&productinfo="+productinfo+"&hash="+encrypttext+"&salt="+salt+"&key="+key ;

    
    
    var url = "https://test.payu.in/_payment?key="+this.key+"&amount="+this.amount+"&firstname="+this.firstname+"&phone="+this.phone+"&email="+this.email+"&txnid="+this.txnid+"&productinfo="+this.productinfo+"&hash="+this.hash+"&surl="+this.surl+"&furl="+this.furl+"&service_provider="+this.service_provider+"&udf1="+this.udf1+"&udf2="+this.udf2+"&udf3="+this.udf3 ;

    //var url = "https://test.payu.in/_payment?amount="+this.amount+"&firstname="+this.firstname+"&phone="+this.phone+"&email="+this.email+"&txnid="+this.txnid+"&productinfo="+this.productinfo+"&hash="+this.hash+"&key="+this.key+"&salt="+this.salt+"&surl="+this.surl+"&service_provider="+this.service_provider+"&udf1="+this.udf1+"&udf2="+this.udf2+"&udf3="+this.udf3 ;
     console.log(url);
     // cordovaInAppBrowser.open(url, '_blank', options)
 //      this.platform.ready().then(() => {
 //   let browser = new InAppBrowser(url,'_blank');
 // });
      const browser = this.iab.create(url,'_blank');
      // const watch = browser.on('loadstart').subscribe(function(event){
      //   console.log('loadstart');
      // });
      //  .then(function(event) {
      //    // success
      //  })
      //  .catch(function(event) {
      // //   // error
      //  });
   document.forms["sendParam"].submit();
   
  }
 
 guid() {
          return this.s4() + this.s4() +  this.s4() + this.s4();
    }

     s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }

    getTxnId(){
      
       this.txnid = this.guid();
    }
 
 pay() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'demo@email.com',
        contact: '1234567890',
        name: 'My Name'
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = function(payment_id) {
      alert('payment_id: ' + payment_id);
    };

    var cancelCallback = function(error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
}

