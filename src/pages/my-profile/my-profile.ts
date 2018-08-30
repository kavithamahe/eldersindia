import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { EldersPage } from '../../pages/elders/elders'
import { ServiceProvider } from '../../providers/service-provider';
import { Storage } from '@ionic/storage';
import { VerifyotpPagePage } from '../../pages/verifyotp/verifyotp';

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
user_type:any="";
imageURL:any;
token:any;
gender:any ="";
user_dob:any;
avatar:any;
base64Image:any;
  constructor(public storage:Storage,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {  
  
     
  }


  loadMyProfile(){
    // this.user_type = "";
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.providerService.webServiceCall(`myaccount`,"")
                        .subscribe(
                          data =>{
                                    this.profileData = data.result.info;
                                    this.avatar = this.profileData.avatar;
                                    this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;
      this.base64Image = this.imageURL+this.profileData.avatar;
        });
      });
                                    this.gender = this.profileData.gender;
                                    // this.user_type = (data.result.info.user_type == 'sponosr') ? 'Sponsor' : "Elder"; 
                                    this.user_dob= this.profileData.dob;//this.getDate(this.profileData.dob);
                                    loader.dismiss();
                                  },
                          err=>{
                                      this.providerService.showErrorToast(err);
                                      loader.dismiss();
                                    })
  }

  getDate(datepar){
     var dateParts = datepar.split("-").reverse().join("-");
     // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
     return dateParts;
  }

  editProfile(){
    if(this.user_type == "sponsor"){
      this.navCtrl.push(EditProfilePage,{profileData:this.profileData});
    }else{
      this.navCtrl.push(EldersPage,{fuctionality:"profileEdit",profileData:this.profileData});
    }
  }

  dismiss(){
    this.dashboardPage();
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  sendotp(){
      this.providerService.sendotp().subscribe(otp => {
        this.providerService.showToast(otp.result);
     },
   err =>{
    //loader.dismiss();
      this.providerService.showErrorToast(err);
  })
  }
  
  showPrompt() {
    this.navCtrl.push(VerifyotpPagePage);
  //   this.sendotp();
  //   let prompt = this.alertCtrl.create({
  //     title: 'Mobile number verification',
  //     //message: "All reports are strictly confidential. Please describe the reason",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Enter one time password'
  //       },
  //     ],
    
  //     buttons: [
  //      {
  //         text: 'Resend OTP',
  //         handler: data => {
  //           this.sendotp();
  //           return false;
  //           // prompt.present();
  //         }
  //       },
  //       {
  //         text: 'Submit',
  //         handler: data => {
  //             if(data.title == ""){
  //             this.providerService.showToast("Enter one time password");
  //              return false;
  //           }
  //           else{

  //           // this.verifyotp(data.title);
  //              this.providerService.verifyotp(data.title).subscribe(otp => {
  //       this.providerService.showToast(otp.result);
  //       this.loadMyProfile();
  //    },
  //    error =>{
  //         if(error.status===401){
  //     this.providerService.showToast(JSON.parse(error._body).error);
  //     }
  // })
  //               // return false;
  //         }
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  }
  // verifyotp(otp){
  //    this.providerService.verifyotp(otp).subscribe(otp => {
  //       this.providerService.showToast(otp.result);
  //       this.loadMyProfile();
  //    },
  //    error =>{
  //         if(error.status===401){
  //     this.providerService.showToast(JSON.parse(error._body).error);
  //     }
  // })
  // }
  ionViewWillEnter(){
    this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;});
      this.storage.get('user_type').then((user) => { this.user_type=user;
        console.log("usertype: ",this.user_type)});
      this.storage.get('token').then((token) => { this.token=token; 
      this.loadMyProfile();
      })
    });
  }
}
