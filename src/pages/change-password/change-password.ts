import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
  providers:[ServiceProvider]
})
export class ChangePasswordPage {

submitAttempt:any;
password_submit:any;
nav:any;
change_password_Form: FormGroup;

  constructor(public formBuilder:FormBuilder,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	this.password_submit = false;
  	this.nav = navCtrl;
  	this.change_password_Form = formBuilder.group({
        currentPassword: ['',Validators.compose([Validators.minLength(6), Validators.required])],
        newPassword: ['',Validators.compose([Validators.minLength(6), Validators.required])],
        re_enterPassword: ['',Validators.compose([Validators.minLength(6), Validators.required])]
        
    });

   }

  submit() {
    if(this.change_password_Form.value.newPassword != this.change_password_Form.value.re_enterPassword){
      this.password_submit = true;
      this.submitAttempt = false;
    }else{
    	this.submitAttempt = false;
      this.password_submit = false;      
      let change_password_data = {"current_password": this.change_password_Form.value.currentPassword, "new_password": this.change_password_Form.value.newPassword, "confirm_password": this.change_password_Form.value.re_enterPassword};
      this.service.webServiceCall(`changePassword`,change_password_data)
      .subscribe(data =>{      	
      		this.service.showToast(data.result);
      		this.change_password_Form.reset();
          this.dismiss();
	    },
		    error =>{
		      this.service.showErrorToast(error);
	    })
    } 
  }

  dismiss(){
  	this.password_submit = false;
  	this.submitAttempt = false;
    // this.nav.popToRoot();
    this.dashboardPage();
    console.log("change password is attempting to close");
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
