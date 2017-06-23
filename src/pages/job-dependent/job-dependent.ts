import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { JobBoardService } from '../../providers/job-board-service';
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
token:any;
imageUrl:any;
user_id:any;
getDependentList:any;
dependent:any;
nativepath:any;
file_name:any;
  constructor(private transfer: Transfer,private filePath: FilePath,private fileChooser: FileChooser,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public jobBoardService:JobBoardService, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
    storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
        this.getDependent();
    })

  });
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
        this.dismiss();
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
   let data={'dependent':this.dependent,'file_name':this.file_name};
   this.viewCtrl.dismiss(data);
 }
  openCamera(){
console.log("open success");
    this.fileChooser.open()
      .then((imageData) => {

      console.log("filedfsdf"+imageData );
         (<any>window).FilePath.resolveNativePath(imageData, (result) => {
    this.nativepath = result;
     this.file_name = this.nativepath.split("/").pop();
console.log("name"+this.file_name);
    console.log("nativepath"+ this.nativepath);
    
  })
        this.jobBoardService.upload(imageData);
      });

  }
}
