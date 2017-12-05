import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';


import { CommunityServices } from '../../providers/community-services';



@Component({
  selector: 'page-myprofilesetting',
  templateUrl: 'myprofilesetting.html',
  providers : [CommunityServices]
})
export class MyprofilesettingPage {
	member_data:any;
	avatar:any="true";
	birthday:any="true";
	email:any="true";
	location:any="true";
	mobile:any="true";
	name:any="true";
	imageUrl:any;
	token:any;
  connection:any="true";
  profile:any="true";
  user_id:any;
  headers:any;
  options:any;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public storage:Storage, public communityServices: CommunityServices, public navParams: NavParams, public viewCtrl: ViewController) {
 	  this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
    this.member_data=navParams.get("member_data");
  this.myProfile(this.member_data);
  this.getPrivacy(this.member_data);
    })    
    storage.get('id').then((id) => { this.user_id=id; })
    
   }); 
   
 	
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
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
     loader.present();
  	 this.communityServices.getPrivacy(this.member_data).subscribe(users => {
      
       let Privacy = users.result[0];
       if(Privacy != null){
          // this.avatar = Privacy.privacy_avatar;
       this.birthday = Privacy.privacy_birthday;
       this.connection = Privacy.privacy_connection;
       this.email = Privacy.privacy_email;
       this.location = Privacy.privacy_location;
       this.mobile = Privacy.privacy_mobile;
       this.name = Privacy.privacy_name;
       this.profile = Privacy.privacy_profile;
      
       }
      // else{
     //       this.communityServices.showToast("No Data");

     // } 
      loader.dismiss();
      },
   err =>{
    this.communityServices.showErrorToast(err);
    loader.dismiss();
  })

  }

   dismiss() {
    this.viewCtrl.dismiss();
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilesettingPage');
  }

}
