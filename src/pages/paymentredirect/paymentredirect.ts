import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';


/*
  Generated class for the PaymentredirectPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-paymentredirect',
  templateUrl: 'paymentredirect.html'
})
export class PaymentredirectPagePage {
	status:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.status = navParams.get("status");
  	console.log(this.status);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentredirectPagePage');
  }
goBack(){
	this.navCtrl.setRoot(ServicerequestPage);
}
}
