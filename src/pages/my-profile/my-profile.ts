import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { EditProfilePage } from '../edit-profile/edit-profile';
import { ServiceProvider } from '../../providers/service-provider';

/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {

profileData:any;
user_type:any ;
  constructor(public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  this.providerService.webServiceCall(`myaccount`,"")
	.subscribe(data =>{
		this.profileData = data.result.info;
		this.user_type = data.result.info.user_type;
		// alert(this.user_type);
	},
	err=>{
		this.providerService.showErrorToast(err);
	})

  }

  editProfile(){
  	this.navCtrl.push(EditProfilePage,{profileData:this.profileData});
  }
  
}
