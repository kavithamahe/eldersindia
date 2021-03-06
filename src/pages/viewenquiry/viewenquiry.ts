import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';

import moment from 'moment';

/*
  Generated class for the ViewenquiryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-viewenquiry',
  templateUrl: 'viewenquiry.html'
})
export class ViewenquiryPagePage {
	enquiriesList:any;
	enquirydatas:any;
	enquiry_id:any;
  start_date:any;
  preferred_datetime:any;
  end_date:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public _provider:ServiceProvider) {
  	this.enquirydatas=navParams.get("enquiries");
  	this.enquiry_id = this.enquirydatas.enquiry_id;
  	this.viewenquiryList(this.enquiry_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewenquiryPagePage');
  }
 public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  viewenquiryList(enquiry_id){
  	let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
   this._provider.viewenquiryList(enquiry_id)
      .subscribe(data =>{ 
		this.enquiriesList = data.result;
    this.start_date = moment(this.enquiriesList.start_date).format("DD-MM-YYYY");
     this.end_date = moment(this.enquiriesList.end_date).format("DD-MM-YYYY");
     this.preferred_datetime = moment(this.enquiriesList.preferred_datetime).format("DD-MM-YYYY");

        loading.dismiss();
    },
    err =>{
      this._provider.showErrorToast(err);     
      loading.dismiss();
    })
  }
}
