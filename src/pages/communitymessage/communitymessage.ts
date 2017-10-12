import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,LoadingController } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import { CommunityServices } from '../../providers/community-services';

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';


@Component({
  selector: 'page-communitymessage',
  templateUrl: 'communitymessage.html'
})
export class CommunitymessagePage {
     headers;
    token:string;
    options:any;
    rootUrl:any;
	 authForm : FormGroup;
	 submitAttempt:any;
	 base64Image:any;
   member_name:any;
   attachment:any;
   subject:any;
   message:any;
   member_id:any;
   file_path:any='';
   nativepath: any='';
   file_name:any='';
   name:any;
   imageUrl:any;
   user_type:any;


  constructor(public storage:Storage,private transfer: Transfer,private filePath: FilePath,private fileChooser: FileChooser,public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public communityServices: CommunityServices, public formBuilder: FormBuilder, public viewCtrl: ViewController) {
  	   this.storage.ready().then(() => {
     storage.get('user_type').then((user_type) => { this.user_type=user_type;});
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
    });
   });
     this.member_name = navParams.get("member_data").name;
     this.member_id = navParams.get("member_data").id;
    // console.log("member name in message",this.member_name);
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
      this.communityServices.showToast("Enter the required fields");
  	}
  	else{
  		this.submitAttempt = false;
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.communityServices.sendMessage(this.member_id,this.authForm.value.subject,this.authForm.value.message,this.file_name,this.file_path).subscribe(users => {
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

fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('attachemts[0]', file, file.name);
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.token);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
           this.communityServices.upload( formData, options)
        .subscribe(
     (sendMessage) => { 
      console.log(sendMessage);
      this.file_name=sendMessage[0].file_name;
      this.file_path=sendMessage[0].file_path;
      console.log(this.file_path);
      console.log(this.file_name);
      
    },
    (err) => { 
        if(err.status===401)
        {
          this.communityServices.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this.communityServices.showToast("Try again later");
        }
      });
      
    }
}

}
