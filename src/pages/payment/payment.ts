import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BlogListService } from '../../providers/blog-list-service';


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

  constructor(private iab: InAppBrowser,public storage:Storage,public blogListService:BlogListService,public navCtrl: NavController,private http: Http) {

this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl;       });
     storage.get('id').then((id) => { this.user_id=id; })
   });
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