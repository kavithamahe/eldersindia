import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditElder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-elder',
  templateUrl: 'edit-elder.html'
})
export class EditElderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditElderPage');
  }

}
