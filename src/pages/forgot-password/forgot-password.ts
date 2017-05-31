import { Component } from '@angular/core';
import { ViewController,NavController, NavParams } from 'ionic-angular';

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

  constructor(public service:ServiceProvider, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  	this.mailId="";
  	this.modalType = navParams.get("modalType");
  	this.passwordCode = navParams.get("passCode");
  }

submit() {
	if(this.modalType == 'forgotPassword'){
			if( this.mailId == ''){
				this.service.showToast("Enter a valid E-Mail..!")	
			}else{
				this.service.forgotPassword(`forgetPassword`,{"email":this.mailId})
				.subscribe(
					data=>{
					      console.log(data);
			            // this.dismiss();
			            this.viewCtrl.dismiss("dismiss");
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
	                              })
				// this.modalData = {"emailId": this.mailId};	
				// let submitData = {"modalType":this.modalType , modalData:this.modalData};
				// this.viewCtrl.dismiss(submitData);	
			}		
	}
	// else if(this.resetCode != this.passwordCode){
	// 	this.service.showToast("Invaild code.!")
	// 	}else if(this.newPassword == '' || this.newPassword == null){
	// 		this.service.showToast("Enter the Pass word to proceed.!")
	// 		}else if(this.newPassword != this.reEnterPassword){
	// 			this.service.showToast("Entered Password does not match.")
	// 			}else{
	// 				this.modalData ={"resetCode": this.resetCode, "newPassword":this.newPassword};	
	// 				let submitData = {"modalType":this.modalType , modalData:this.modalData};
	// 				this.viewCtrl.dismiss(submitData);
	// 		}
  }

  dismiss(){
    this.viewCtrl.dismiss("dismiss");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  
}
