import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { JobBoardService } from '../../providers/job-board-service';
import { SinglejobPage } from '../../pages/singlejob/singlejob';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { JobDependentPage } from '../../pages/job-dependent/job-dependent';
/*
  Generated class for the Jobboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jobboard',
  templateUrl: 'jobboard.html'
})
export class JobboardPage {
imageUrl:any;
token:any;
jobBoardInfo:any;
user_type:any;
user_type_id:any;
jobDependentId:any;
emptyRecordSet:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public jobBoardService:JobBoardService,public modalCtrl: ModalController) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('user_type').then((user_type) => { this.user_type=user_type;});
      storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id;});
      storage.get('token').then((token) => { this.token=token; 
  		this.onInit();
      })
  	});
  }

  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.jobBoardService.jobsList().subscribe(
     (jobBoard) => {
      this.jobBoardInfo=jobBoard.result.info.data; 
      this.emptyRecordSet='';
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        this.emptyRecordSet=JSON.parse(err._body).error;
        }
        else
        {
          this.showToaster("Try again later");
        }
      }
    );
    loader.dismiss();
  }

  public viewJob(jobId)
  {
   this.navCtrl.push(SinglejobPage, {jobId});
  }

  public applyJob(jobId)
  {
    if(this.user_type=='elder')
    {
       this.jobDependentId=this.user_type_id;
       this.callApplyJob(jobId,this.jobDependentId);
    }
    else
    {
      this.jobDependent(jobId);
    }
   
  }
  callApplyJob(jobId,jobDependentId)
  {
    this.jobBoardService.applyJob(jobId,jobDependentId).subscribe(
     (applyJob) => {
     // this.applyJobInfo=applyJob.result;  
       this.showToaster(applyJob.result);
      //console.log(singleJob);
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
  
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  jobDependent(jobId) {
    let modal = this.modalCtrl.create(JobDependentPage);
     modal.onDidDismiss(data => {
     this.jobDependentId=data.dependent;
     this.callApplyJob(jobId,this.jobDependentId);
     });
    modal.present();
  }
}
