import { Component } from '@angular/core';
import { ViewController,NavController, NavParams,LoadingController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the ForgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers:[ServiceProvider]
})

export class ForgotPasswordPage {

	mailId:any;
	resetCode:any;
	newPassword:any;
	reEnterPassword:any;

	modalType:any;
	modalData:any;
	passwordCode:any;

  constructor(public service:ServiceProvider,public loadingCtrl: LoadingController, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  	this.mailId="";
  	this.modalType = navParams.get("modalType");
  	this.passwordCode = navParams.get("passCode");
  }
pressevent(){
	this.submit();
}
submit() {
	if(this.modalType == 'forgotPassword'){
			if( this.mailId == ''){
				this.service.showToast("Enter a valid e-mail..!")	
			}else{
				let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    			loader.present();
				this.service.forgotPassword(`forgetPassword`,{"email":this.mailId})
				.subscribe(
					data=>{
			            this.viewCtrl.dismiss("dismiss");
			            loader.dismiss();
			                },
	                err=>{
	                       if(err.status===401)
					        {
					        	this.service.showToast(JSON.parse(err._body).error);
					        }
					        else
					        {
					          	this.service.showToast("Try again later");
					        }
					        loader.dismiss();
	                              })
			}		
	}
  }

  dismiss(){
    this.viewCtrl.dismiss("dismiss");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  
}
