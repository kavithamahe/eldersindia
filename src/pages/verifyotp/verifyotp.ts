import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MyProfilePage } from '../../pages/my-profile/my-profile';
import { Storage } from '@ionic/storage';
import { CommunityServices } from '../../providers/community-services';

import { Http,Headers,RequestOptions } from '@angular/http';

/*
  Generated class for the VerifyotpPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html'
})
export class VerifyotpPagePage {
otp:any;
invitefriends:any;
 selectedConnections:any;
  connectionInfo:any; 
  friendsId:any;
  communityId:any;
  imageUrl:any;
  token:any;
  user_id:any;
  user_ids:any;
  community_id:any;
  headers:any;
  options:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public providerService : ServiceProvider,
    public communityServices: CommunityServices,public loadingCtrl: LoadingController,public storage:Storage) {
  	  this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
    }) 
  })
    this.invitefriends = this.navParams.get("inviteFriends");
       this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
     // this.getConnections();
      });
      this.storage.get('id').then((id) => { this.user_ids=id; 
      this.user_id=this.navParams.get("user_id");
      this.communityId = this.navParams.get("communityId");
      this.community_id = this.navParams.get("community_id");
      this.connectionInfo = this.navParams.get("connectionInfo");
      // this.getConnections(this.community_id);
    })
    });
       if(this.invitefriends != "1"){
        this.sendotp();
       }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyotpPagePage');
  }
    sendotp(){
      this.providerService.sendotp().subscribe(otpre => {
        this.providerService.showToast(otpre.result);
     },
   err =>{
    //loader.dismiss();
      this.providerService.showErrorToast(err);
  })
  }
  resendotp(){
  	this.sendotp();
  }
	submit(){
		if(this.otp == undefined){
			this.providerService.showToast("Please enter the one time password");
		}
		else{
			  this.providerService.verifyotp(this.otp).subscribe(otpon => {
        this.providerService.showToast(otpon.result);
        this.navCtrl.setRoot(MyProfilePage);
     },
     error =>{
          if(error.status===401){
      this.providerService.showToast(JSON.parse(error._body).error);
      }
  })
		}
		   
	}
	public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

   inviteFriends(){ 
if(this.selectedConnections != undefined){
 let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.communityServices.inviteFriends(this.communityId,this.selectedConnections,this.options).subscribe(connections => {
       //this.connectionInfo=connections.result;
    
        loader.dismiss();

        this.showToaster(connections.result);
        //this.navCtrl.push(BlogsPage);
        this.navCtrl.pop();
     },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      });
    }else{
      this.showToaster("Please Select atleast one");
    }
 }
  public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  cancel(){
    this.navCtrl.pop();
  }
}
