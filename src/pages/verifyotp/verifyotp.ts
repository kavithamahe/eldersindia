import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MyProfilePage } from '../../pages/my-profile/my-profile';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public providerService : ServiceProvider) {
  	this.sendotp();
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
			this.providerService.showToast("Please enter the ome time password");
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
}
