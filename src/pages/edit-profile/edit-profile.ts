import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

profileData:any;
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
user_dob:any

  constructor(public storage:Storage,public loadingCtrl: LoadingController,public formBuilder:FormBuilder,public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;
        this.avatar = this.profileData.avatar;
      this.base64Image = this.imageURL+this.profileData.avatar;
      console.log(this.base64Image);
    });

    });
      this.profileData = navParams.get("profileData");
      this.user_dob = this.profileData.dob;//this.getDate(this.profileData.dob);

      this.user_type = this.profileData.user_type;
     this.edit_profile_Form = formBuilder.group({
        name: [this.profileData.name,Validators.compose([Validators.required])],
        designation: [{value:this.profileData.designation,disabled: true},Validators.compose([Validators.minLength(3), Validators.required])],
        gender: ["male",Validators.compose([Validators.required])],
        mobile_number: [this.profileData.mobile,Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
        location: [{value:this.profileData.locationName,disabled:true},Validators.compose([Validators.required])],
        // dob: ['',Validators.compose([Validators.required])],
        email: [{value:this.profileData.email,disabled:true},Validators.compose([Validators.minLength(6), Validators.required])],
        user_type: [{value:this.profileData.user_type,disabled:true},Validators.compose([Validators.required])]        
    });
     
   
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
    let data = this.edit_profile_Form.value;
    let updateData = {name: data.name ,mobile:data.mobile_number,dob:this.user_dob ,app:"",avatar1:this.avatar};
    this.providerService.webServiceCall(`myaccountEdit`,updateData)
    .subscribe(data=>{
      console.log(data);
      this.dismiss();
    },
    err=>{
      console.log(err);
    })
  }

}
