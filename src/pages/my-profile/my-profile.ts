import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ServiceProvider } from '../../providers/service-provider';
import { Storage } from '@ionic/storage';

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
imageURL:any;
token:any;
gender:any ="";
user_dob:any;

  constructor(public storage:Storage,public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {  }


  loadMyProfile(token){
    this.user_type = "";
    this.providerService.webServiceCall(`myaccount`,"")
  .subscribe(data =>{
    this.profileData = data.result.info;
    this.gender = this.profileData.gender;
    this.user_type = data.result.info.user_type;
    if(this.user_type != "sponsor"){
      this.user_type = "Elder";
    }
    this.user_dob= this.profileData.dob;//this.getDate(this.profileData.dob);
  },
  err=>{
    this.providerService.showErrorToast(err);
  })
  }

  getDate(datepar){
     var dateParts = datepar.split("-").reverse().join("-");
     // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
     return dateParts;
  }

  editProfile(){
  	this.navCtrl.push(EditProfilePage,{profileData:this.profileData});
  }

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  
  ionViewWillEnter(){
    this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
      this.loadMyProfile( this.token);
      })
    });
  }
}
