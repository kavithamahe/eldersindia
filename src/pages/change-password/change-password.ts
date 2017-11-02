import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
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
mytype:string ="password";
show_password:boolean = false;

  constructor(public formBuilder:FormBuilder,public loadingCtrl: LoadingController,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	this.password_submit = false;
  	this.nav = navCtrl;
  	this.change_password_Form = formBuilder.group({
        currentPassword: ['',Validators.compose([Validators.required])],
        newPassword: ['',Validators.compose([Validators.required])],
        re_enterPassword: ['',Validators.compose([Validators.required])]
        
    });

   }
   reEnter(){
     console.log("re enter password is focused..!");
     this.password_submit = false;
   }

   showPassword(){
     if(this.show_password == false){
       this.mytype = "password";
     }else{
       this.mytype = "text";
     }
   }


  submit() {

console.log(this.change_password_Form.value.newPassword.length);
    if(this.change_password_Form.valid){

    if(this.change_password_Form.value.newPassword != this.change_password_Form.value.re_enterPassword){
      this.password_submit = true;
      this.submitAttempt = false;
    }else{
    	this.submitAttempt = false;
      this.password_submit = false; 
        if(this.change_password_Form.value.newPassword.length < 6){
      this.service.showToast("Please enter minimum 6 characters");
    }else{
      if(this.change_password_Form.value.newPassword.length > 12){
      this.service.showToast("Please enter maximum 12 characters");
    }else{

      console.log(this.change_password_Form.value.newPassword);
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();     
      let change_password_data = {"current_password": this.change_password_Form.value.currentPassword, "new_password": this.change_password_Form.value.newPassword, "confirm_password": this.change_password_Form.value.re_enterPassword};
      this.service.webServiceCall(`changePassword`,change_password_data)
      .subscribe(data =>{      	
      		this.service.showToast(data.result);
      		this.change_password_Form.reset();
          this.dismiss();
          loader.dismiss(); 
	    },
		    error =>{
          if(error.status===401){
      this.service.showToast(JSON.parse(error._body).error);  
      }
      else{
       this.service.showToast("Please try again later..!");   
      }
		   loader.dismiss();    
	    })
    }
    } 
  }
  }else{
    this.submitAttempt = true;
  }

}
  dismiss(){
  	this.password_submit = false;
  	this.submitAttempt = false;
    this.dashboardPage();
    console.log("change password is attempting to close");
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

  // showPassword(input: any): any {
  //  input.type = input.type === 'password' ?  'text' : 'password';
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
