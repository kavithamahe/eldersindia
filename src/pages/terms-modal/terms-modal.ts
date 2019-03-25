import { Component } from '@angular/core';
import { ViewController,NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TermsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms-modal',
  templateUrl: 'terms-modal.html'
})
export class TermsModalPage {

vendor_id:any;
terms_and_condition:any;
terms_and_condition_length:any;
// text:any;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.vendor_id = navParams.get("vendor_id");
    this.terms_and_condition = navParams.get("terms_and_condition");
    this.terms_and_condition_length = navParams.get("terms_and_condition_length");
    // var html = this.terms_and_condition;
    // var div = document.createElement("div");
    // div.innerHTML = html;
    // this.text = div.textContent || div.innerText || "";
  }

  ionViewDidLoad() {
     this.vendor_id = this.navParams.get("vendor_id");
    this.terms_and_condition = this.navParams.get("terms_and_condition");
    this.terms_and_condition_length = this.navParams.get("terms_and_condition_length");
     }


}
