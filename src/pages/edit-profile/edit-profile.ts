import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service-provider';
import { MyProfilePage } from '../../pages/my-profile/my-profile';
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
user_dob:any;
updateData:any;
token:any;
pemail:any='';
  my_location:any;
submitAttempt:any;

  constructor(public storage:Storage,public loadingCtrl: LoadingController,public formBuilder:FormBuilder,public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {

      this.profileData = navParams.get("profileData");
      console.log("xxxxxxxxxxx");
      console.log(this.profileData);
      console.log("person"+this.profileData.personal_email);
      this.pemail=this.profileData.personal_email;
      this.avatar = this.profileData.avatar;

      this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;
      this.base64Image = this.imageURL+this.profileData.avatar;
        });
      });
      
      
      this.user_dob = this.profileData.dob;

      this.user_type = this.profileData.user_type;
      if(this.user_type == 'sponsor'){
      this.my_location = this.profileData.locationName;  
    }else{
      this.user_type = "Elder";
      this.my_location = this.profileData.address;
    }
      
      // this.gender = this.profileData.gender;
      this.edit_profile_Form = formBuilder.group({
        name: [this.profileData.name,Validators.compose([Validators.required])],
        company: [{value:this.profileData.company_name,disabled: true}],
        designation: [{value:this.profileData.designation,disabled: true},Validators.compose([Validators.minLength(3), Validators.required])],
       // gender: [this.profileData.gender,Validators.compose([Validators.required])],
        mobile_number: [this.profileData.mobile,Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
        location: [{value:this.my_location,disabled:true},Validators.compose([Validators.required])],
         dob: [{value:this.my_location,disabled:false},Validators.compose([])],
        email: [{value:this.profileData.email,disabled:true},Validators.compose([Validators.required])],
        personal_email: ['',Validators.compose([])],
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
this.updateData = {name: data.name,mobile:data.mobile_number,personal_email:data.personal_email,dob:this.user_dob ,app:"",avatar1:this.avatar};
//     }else{
// this.updateData = {name: data.name,mobile:data.mobile_number,dob:this.user_dob ,app:"",avatar1:this.avatar};
    // }
    // 
    
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
