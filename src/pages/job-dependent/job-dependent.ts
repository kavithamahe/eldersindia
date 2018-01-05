import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';

import { JobBoardService } from '../../providers/job-board-service';
import {FormBuilder,FormGroup,Validators,FormArray} from '@angular/forms';

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';


/*
  Generated class for the JobDependent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-job-dependent',
  templateUrl: 'job-dependent.html',
  providers:[JobBoardService]
})
export class JobDependentPage {
authForm : FormGroup;
token:any;
imageUrl:any;
user_id:any;
user_type_id:any;
getDependentList:any;
dependent:any;
nativepath:any;
file_name:any;
file_path:any;
user_type:any;
submitAttempt:any;
jobId:any;
dependentstatus:any=0;
  constructor(public formBuilder: FormBuilder,private transfer: Transfer,private filePath: FilePath,private fileChooser: FileChooser,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public jobBoardService:JobBoardService, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.jobId=navParams.get("jobId");
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
    storage.get('user_type').then((user_type) => { this.user_type=user_type;});
    storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id;});
    storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
        this.getDependent();
    })

  });
  if(this.user_type !='sponsor'){
   this.authForm = formBuilder.group({
        elder_dependent: ['', Validators.compose([Validators.required])],
   })
}
}

 getDependent()
 {
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.jobBoardService.getDependent().subscribe(
     (getDependent) => {
      if(getDependent.length<=0 && this.user_type !='elder')
      {
        this.showToaster("There is no dependent. You can not apply job!.");
        //this.dismiss();
      }
      this.getDependentList=getDependent; 
       loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
         loader.dismiss();
      }
    );  
 }
 checkDependent(){
  this.jobBoardService.checkDependent(this.user_id,this.dependent,this.jobId).subscribe((checkjob) => {
        this.dependentstatus=checkjob.status;
        this.showToaster(checkjob.result);
 })
 }
 fileChange(event) {
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('attachemts[0]', file, file.name);
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.token);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
           this.jobBoardService.resumeupload( formData, options)
        .subscribe(
     (sendMessage) => { 
      this.file_name=sendMessage[0].file_name;
      this.file_path=sendMessage[0].file_path;
      loader.dismiss();
    },
    (err) => { 
      loader.dismiss();
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
      });
      
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
dismiss() { 
  let data={'dependent':''};
   this.viewCtrl.dismiss(data);
 }
 cancelDependent(){
  let data={'dependent':''};
   this.viewCtrl.dismiss(data);
 }
 submitDependent()
 {
  if(this.file_name == undefined){
    this.showToaster("Please select the file");
  }
  else{
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    // if(!this.authForm.valid){
    //   this.submitAttempt = true;
    //   this.showToaster("Enter the required fields");
    // }
    //else{
      //this.submitAttempt = false;
      if(this.user_type == 'sponsor'){
      this.jobBoardService.applyjobelder(this.dependent,this.user_id,this.jobId,this.file_name,
        this.file_path).subscribe((applyjob) => {
          this.showToaster(applyjob.result);
          this.dismiss();
           loader.dismiss();
       },
        (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
         loader.dismiss();
      }
    ); 
      }
      else{
        this.jobBoardService.applyjobelder(this.user_type_id,this.user_id,this.jobId,this.file_name,
        this.file_path).subscribe((applyjob) => {
          this.showToaster(applyjob.result);
           loader.dismiss();
        },
      (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
         loader.dismiss();
      }
    ); 
        
      }

 }
 }

 }
