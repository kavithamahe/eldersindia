import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/*
  Generated class for the RemotemonitorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-remotemonitor',
  templateUrl: 'remotemonitor.html'
})
export class RemotemonitorPagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotemonitorPagePage');
  }

}
