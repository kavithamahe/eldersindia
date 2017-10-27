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
getDependentList:any;
dependent:any;
nativepath:any;
file_name:any;
file_path:any;
user_type:any;
submitAttempt:any;
jobId:any;
  constructor(public formBuilder: FormBuilder,private transfer: Transfer,private filePath: FilePath,private fileChooser: FileChooser,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public jobBoardService:JobBoardService, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.jobId=navParams.get("jobId");
console.log(this.jobId);
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
    storage.get('user_type').then((user_type) => { this.user_type=user_type;});
    storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
        this.getDependent();
    })

  });
   this.authForm = formBuilder.group({
        elder_dependent: ['', Validators.compose([Validators.required])],
        //file_name: ['', Validators.compose([Validators.required])],
   })

}

 getDependent()
 {
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.jobBoardService.getDependent().subscribe(
     (getDependent) => {
      if(getDependent.length<=0)
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
           this.jobBoardService.resumeupload( formData, options)
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
 submitDependent()
 {
  console.log(this.dependent);
    if(!this.authForm.valid){
      this.submitAttempt = true;
      this.showToaster("Enter the required fields");
    }
    else{
      this.submitAttempt = false;
      this.jobBoardService.applyjobelder({"info": [{
             
        "job_id":this.jobId,
        "uid":this.user_id,
        "dependantId":this.dependent,
        "file_name":this.file_name,
        "file_path":this.file_path
        
      }]}).subscribe((applyjob) => {
        console.log(applyjob);
 })

 }
 }

 }
