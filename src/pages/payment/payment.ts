import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BlogListService } from '../../providers/blog-list-service';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';

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
   constructor(public http: Http,public navCtrl: NavController,public storage:Storage,public blogListService:BlogListService, public navParams: NavParams) {
  this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      console.log(this.rootUrl);
      this.getHashKey();
      });
     storage.get('id').then((id) => { this.user_id=id; })
   });
  this.getTxnId();
  
   this.key="rjQUPktU";
 this.productinfo="We are ApnaCare, a comprehensive healthcare resources company that is committed to take care of the health and wellness of the elderly in India. To do so, we have over the years built our expertise in the curation and delivery of the best-in-class elderly healthcare services, healthcare professionals and home care. Our specialists offer a range of home healthcare services including post hospitalization care, rehab care, physiotherapy, doctor visits, diagnostics, supply of medical equipment, and assistance in identifying suitable living spaces for the elderly. Our services can be accessed globally to serve the elderly living in Bangalore, Chennai, Hyderabad, Kolkata and Mumbai.";
this.amount='1';
this.firstname='arun';
this.email="muthu.k@quadrupleindia.com";
this.phone="82203780131";
this.surl="http://192.168.1.187:8000/paymentRenderforSR";
this.furl="http://192.168.1.187:8000/paymentfailureforSR";
this.service_provider="payu_paisa";
this.udf1="6";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');

  }
getHashKey()
{
	
     this.blogListService.paymentTran(this.rootUrl,this.key,this.productinfo,this.txnid,this.amount,this.firstname,this.email,
      this.phone,this.surl,this.service_provider,this.udf1).subscribe(     
      (loginuser) => {
        console.log(loginuser.result);
        this.hash = loginuser.result;
        
    },

    (err) => { 
        console.log(err);
        
    },
  )   
}

   submitForm(sendParam){
   	document.forms["sendParam"].submit();
   	//document.sendParam.submit();

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
 

}

