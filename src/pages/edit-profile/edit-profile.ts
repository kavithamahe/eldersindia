import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service-provider';
import { MyProfilePage } from '../../pages/my-profile/my-profile';
import moment from 'moment';
/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers:[ServiceProvider]
})
export class EditProfilePage {

profileData:any = "";
user_type:any ;
edit_profile_Form:FormGroup;
user_dob:any;
name:any;
gender:any;
mobile:any;
location:any;
dob:any;
email:any;
logoUrl:any;
base64Image:any;
avatar:any="";
file: File;
imageURL:any;
//user_dob:any;
updateData:any;
token:any;
pemail:any='';
  my_location:any;
submitAttempt:any;
  constructor(public storage:Storage,public loadingCtrl: LoadingController,public formBuilder:FormBuilder,public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {

      this.profileData = navParams.get("profileData");
      this.pemail=this.profileData.personal_email;
      this.avatar = this.profileData.avatar;

      this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;
      this.base64Image = this.imageURL+this.profileData.avatar;
        });
      });
      
      
      this.user_dob = moment(this.profileData.dob).format("YYYY-DD-MM");
      this.user_type = this.profileData.user_type;
      if(this.user_type == 'sponsor'){
      this.my_location = this.profileData.locationName;  
    }else{
      this.user_type = "Elder";
      this.my_location = this.profileData.address;
    }
      
      // this.gender = this.profileData.gender;
      this.edit_profile_Form = formBuilder.group({
        name: [{value:this.profileData.name,disabled: true},Validators.compose([Validators.required])],
        company: [{value:this.profileData.company_name,disabled: true}],
        designation: [{value:this.profileData.designation,disabled: true},Validators.compose([Validators.minLength(3), Validators.required])],
       // gender: [this.profileData.gender,Validators.compose([Validators.required])],
        mobile_number: [this.profileData.mobile,Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
        location: [{value:this.my_location,disabled:true},Validators.compose([])],
         user_dob: [{value:this.profileData.dob},Validators.compose([])],
        email: [{value:this.profileData.email,disabled:true},Validators.compose([Validators.required])],
        personal_email: ['',Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
        user_type: [{value:this.user_type,disabled:true},Validators.compose([Validators.required])]        
    });
 
  }



  loadMyProfile(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.providerService.webServiceCall(`myaccount`,"")
  .subscribe(data =>{
    this.profileData = data.result.info;
    this.user_dob=data.result.info.dob;
    this.user_type = data.result.info.user_type;
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


  dismiss(){
    this.navCtrl.pop();
  }

  accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.avatar = this.base64Image;
     }, (err) => {
      console.log(err);
    });
  }


 updateProfile(){
   
   if(!this.edit_profile_Form.valid){
            this.submitAttempt = true;
            console.log("error");
            
           }
          else
          {
           this.submitAttempt = false;
           let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    let data = this.edit_profile_Form.value;
//     if(this.user_type == 'elder'){
  this.updateData = { id:this.profileData.id,company_id:this.profileData.company_id,branch_id:this.profileData.branch_id,
   name:this.profileData.name,last_name:this.profileData.last_name, 
  avatar:this.avatar,location:this.profileData.location,designation:this.profileData.designation,
  "email":this.profileData.official_email,"gender":this.profileData.gender,"employee_id":this.profileData.employee_id,
  "business_unit":this.profileData.business_unit,"division":this.profileData.division,
"dob":data.user_dob,"email_verified":this.profileData.email_verified,"mobile_verified":this.profileData.mobile_verified, 
"mobile":data.mobile_number,"personal_email":data.personal_email,"status":this.profileData.status,"offboard":this.profileData.offboard,
"created_at":this.profileData.created_at,"updated_at":this.profileData.updated_at,"offboarded_on":this.profileData.offboarded_on,"email_sent":this.profileData.email_sent,
"message_sent":this.profileData.message_sent,
"mail_code":this.profileData.mail_code,"message_code":this.profileData.message_code,"company_name":this.profileData.company_name,
"locationName":this.profileData.locationName,"logo":this.profileData.logo,
"user_type":this.profileData.user_type,"official_email":this.profileData.official_email,
"avatar1":this.avatar,"app":""}
   
 
    
    this.providerService.webServiceCall(`myaccountEdit`,this.updateData)
    .subscribe(data=>{
      this.showToaster(data.result);
      this.navCtrl.setRoot(MyProfilePage);
      loader.dismiss();
          },
    err=>{
      console.log(err);
      loader.dismiss();
    })
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
}
