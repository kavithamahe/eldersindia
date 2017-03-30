import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Camera } from 'ionic-native';

import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-communitymessage',
  templateUrl: 'communitymessage.html'
})
export class CommunitymessagePage {
	 authForm : FormGroup;
	 submitAttempt:any;
	 base64Image:any;
   member_name:any;
   attachment:any;
   subject:any;
   message:any;
   member_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public communityServices: CommunityServices, public formBuilder: FormBuilder, public viewCtrl: ViewController) {
  	 
     this.member_name = navParams.get("member_data").name;
     this.member_id = navParams.get("member_data").id;
     console.log("member name in message",this.member_name);
     this.authForm = formBuilder.group({
        subject : ['', Validators.compose([Validators.required])],
        message : ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunitymessagePage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  sendMessage(){
     this.communityServices.sendMessage(this.member_id,this.attachment,this.authForm.value.subject,this.authForm.value.message).subscribe(users => {
       this.communityServices.showToast(users.result);
       this.authForm.reset();
      },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })

  	if(!this.authForm.valid){
  		this.submitAttempt = true;
  	}
  	else{
  		this.submitAttempt = false;
  	}

  }

  accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }


}
