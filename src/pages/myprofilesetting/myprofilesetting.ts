import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { CommunityServices } from '../../providers/community-services';



@Component({
  selector: 'page-myprofilesetting',
  templateUrl: 'myprofilesetting.html'
})
export class MyprofilesettingPage {
	member_data:any;
	avatar:any;
	birthday:any;
	email:any;
	location:any;
	mobile:any;
	name:any;
	imageUrl:any;
	token:any;

  constructor(public navCtrl: NavController, public storage:Storage, public communityServices: CommunityServices, public navParams: NavParams, public viewCtrl: ViewController) {
 	 this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token;})
    });
 	this.member_data=navParams.get("member_data");
 	this.myProfile(this.member_data);
 	this.getPrivacy(this.member_data);
  }
  myProfile(member_data){
  	 this.communityServices.myprofile(this.member_data).subscribe(users => {
       this.myProfile = users.result;
      },
   err =>{
    this.communityServices.showErrorToast(err);
  })

  }
  getPrivacy(member_data){
  	 this.communityServices.getPrivacy(this.member_data).subscribe(users => {
       let Privacy = users.result[0];
       this.avatar = Privacy.privacy_avatar;
       this.birthday = Privacy.privacy_birthday;
       this.email = Privacy.privacy_email;
       this.location = Privacy.privacy_location;
       this.mobile = Privacy.privacy_mobile;
       this.name = Privacy.privacy_name;
       console.log(this.location);
      
      },
   err =>{
    this.communityServices.showErrorToast(err);
  })

  }

   dismiss() {
    this.viewCtrl.dismiss();
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilesettingPage');
  }

}
