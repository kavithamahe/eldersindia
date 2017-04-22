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

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsModalPage');
  }
  dismiss(){
this.viewCtrl.dismiss();
  }

}
