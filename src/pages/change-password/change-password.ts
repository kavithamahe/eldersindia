import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceProvider } from '../../providers/service-provider';
import { DashboardPage } from '../../pages/dashboard/dashboard';

import { Storage } from '@ionic/storage';

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
allow:any;
stage1:any;
stage2:any;
strongRegex:any;
mediumRegex:any;
newPassword:any;
user_type:any;

  constructor(public formBuilder:FormBuilder,public loadingCtrl: LoadingController,public storage:Storage,public service:ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  	this.password_submit = false;
  	this.nav = navCtrl;
    this.storage.ready().then(() => {
       storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      console.log(this.user_type); })
     })
  	this.change_password_Form = formBuilder.group({
        currentPassword: ['',Validators.compose([Validators.required])],
        newPassword: ['',Validators.compose([Validators.required])],
        re_enterPassword: ['',Validators.compose([Validators.required])]
        
    });
      this.strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

   }
   reEnter(){
     this.password_submit = false;
   }
pressevent(){
  this.submit();
}
   showPassword(){
     if(this.show_password == false){
       this.mytype = "password";
     }else{
       this.mytype = "text";
     }
   }
 validationInputPwdText() {
    if(this.newPassword!=undefined)
    {
      if (this.newPassword.length >= 8) {

        if (this.strongRegex.test(this.newPassword)) {
         this.allow = 1;
          this.stage1 = 0;
          this.stage2 = 0;


        } else if (this.mediumRegex.test(this.newPassword)) {
          this.allow = 1;
          this.stage1 = 0;
          this.stage2 = 0;


        } else {
          this.allow = 0;
          this.stage2 = 1;
          this.stage1 = 0;
          // this.valid_style = 1;

        }
      }else{

       this.stage1 = 1;
        this.stage2 = 0;
        // this.valid_style = 1;


        } 
  }
      
      }


  submit() {
     if(this.change_password_Form.value.currentPassword == this.change_password_Form.value.newPassword){
        this.service.showToast("Current pasword and new password to be different");
      }
      else{
        if(this.change_password_Form.valid){
     
    if(this.change_password_Form.value.newPassword != this.change_password_Form.value.re_enterPassword){
      this.password_submit = true;
      this.submitAttempt = false;
    }else{
      this.submitAttempt = false;
      this.password_submit = false; 
        if(this.stage2 == 1 || this.stage1 == 1){
      this.service.showToast("Please enter correct password");
    }else{
    //   if(this.change_password_Form.value.newPassword.length > 12){
    //   this.service.showToast("Please enter maximum 12 characters");
    // }else{

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
   // }
    } 
  }
  }else{
    this.submitAttempt = true;
  }
      }
    

}
  dismiss(){
  	this.password_submit = false;
  	this.submitAttempt = false;
    this.dashboardPage();
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
