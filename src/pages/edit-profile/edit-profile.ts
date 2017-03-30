import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';

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
avatar:any;
file: File;


  constructor(public loadingCtrl: LoadingController,public formBuilder:FormBuilder,public providerService : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
// et
  		this.profileData = navParams.get("profileData");
  		this.logoUrl = "http://183.82.33.232:8097/";
  		this.user_type = this.profileData.user_type;
		console.log(this.logoUrl+this.profileData.logo);

 		this.edit_profile_Form = formBuilder.group({
        name: [this.profileData.name,Validators.compose([Validators.minLength(6), Validators.required])],
        designation: [this.profileData.designation,Validators.compose([Validators.minLength(3), Validators.required])],
        gender: ["male",Validators.compose([Validators.required])],
        mobile_number: [this.profileData.mobile,Validators.compose([Validators.minLength(10), Validators.required])],
        location: [this.profileData.locationName,Validators.compose([Validators.minLength(6), Validators.required])],
        dob: [this.profileData.dob,Validators.compose([Validators.minLength(6), Validators.required])],
        email: [this.profileData.email,Validators.compose([Validators.minLength(6), Validators.required])],
        user_type: [this.profileData.user_type,Validators.compose([Validators.minLength(6), Validators.required])]        
    });
 		
   
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
      this.avatar = imageData;
     }, (err) => {
      console.log(err);
    });
  }

  onChange1(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(target);
        console.log(this.file);
        let data = this.edit_profile_Form.value;
    let updateData = {name: data.name ,mobile:data.mobile_number,dob:data.dob ,avatar:this.file}
    this.providerService.webServiceCall(`myaccountEdit`,updateData)
    .subscribe(data=>{
      console.log(data);
    },
    err=>{
      console.log(err);
    })
    }

  updateProfile(){
    let data = this.edit_profile_Form.value;
    let updateData = {name: data.name ,mobile:data.mobile_number,dob:data.dob ,avatar:this.file}
    this.providerService.webServiceCall(`myaccountEdit`,updateData)
    .subscribe(data=>{
      console.log(data);
    },
    err=>{
      console.log(err);
    })
  }

  viewDidLoad() {
  	
    console.log('ionViewDidLoad EditProfilePage');
  }

}
