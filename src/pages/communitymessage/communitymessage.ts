import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

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

  constructor(private transfer: Transfer, private fileChooser: FileChooser,private filePath: FilePath,public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public communityServices: CommunityServices, public formBuilder: FormBuilder, public viewCtrl: ViewController) {
  	 
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
     
    if(!this.authForm.valid){
  		this.submitAttempt = true;
  	}
  	else{
  		this.submitAttempt = false;
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.communityServices.sendMessage(this.member_id,this.attachment,this.authForm.value.subject,this.authForm.value.message).subscribe(users => {
       this.communityServices.showToast(users.result.info);
       this.authForm.reset();
       loader.dismiss(); 
      },
   err =>{
     loader.dismiss(); 
    this.communityServices.showErrorToast(err);
  })
  	}

  }
   browseFile(){
    this.fileChooser.open()
  .then(uri => {
    console.log(uri);
  this.filePath.resolveNativePath(uri)
  .then(filePath => {
    console.log(filePath);
    this.communityServices.fileTransferIonic(filePath);
  })
  .catch(err => console.log(err));
  })
  .catch(e => console.log(e));

  }
 openCamera(){

    this.fileChooser.open()
      .then((imageData) => {
        this.communityServices.upload(imageData);
      });
  }


}
