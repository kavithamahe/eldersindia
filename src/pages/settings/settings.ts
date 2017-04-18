import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
	privacy_name:any;
	privacy_email:any;
	privacy_mobile:any;
	privacy_location:any;
	privacy_birthday:any;
	privacy_avatar:any;
	status:any;
	user_uid:any;
	user_id:any;


  constructor(public storage:Storage, public serviceProvider:ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {}

  getPrivacy(){
  	let requestId = {"user_id":this.user_uid};
  	this.serviceProvider.webServiceCall('getPrivacy',requestId)
  	.subscribe(data=>{
  		let [info] = data.result;
  		this.user_id = info.id;
  		this.user_uid = info.uid;
  		this.privacy_name = info.privacy_name;
  		console.log("this.privacy_name",!!this.privacy_name);
  		this.privacy_email = info.privacy_email;
  		this.privacy_mobile = info.privacy_mobile;
  		this.privacy_location = info.privacy_location;
  		this.privacy_birthday = info.privacy_birthday;
  		this.privacy_avatar = info.privacy_avatar;
  		this.status = info.status;
  	},
  	error=>{
  		console.log(error);
  	});
  }


  privacy_submit(){
  	let data = {"info":{
  		"id":this.user_id,
  		"uid":this.user_uid,
  		"privacy_name":this.privacy_name,
  		"privacy_email":this.privacy_email,
  		"privacy_mobile":this.privacy_mobile,
  		"privacy_location":this.privacy_location,
  		"privacy_birthday":this.privacy_birthday,
  		"privacy_avatar":this.privacy_avatar,
  		"status":this.status}}
  	this.serviceProvider.webServiceCall('setPrivacy',data)
  	.subscribe(data=>{
  		this.serviceProvider.showToast(data.result);
  		console.log(data);
  		this.getPrivacy();
  	},
  	error=>{
  		if(error.status===401){
      this.serviceProvider.showToast(JSON.parse(error._body).error);  
      }
      else{
       this.serviceProvider.showToast("Server Error..!");   
      }
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter(){
     this.storage.ready().then(() => {
      this.storage.get('id').then((id) => { this.user_uid=id;
      this.getPrivacy();
  		});
      })  
  }

  dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

}
