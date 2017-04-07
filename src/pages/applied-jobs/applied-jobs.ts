import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { JobBoardService } from '../../providers/job-board-service';
import { SinglejobPage } from '../../pages/singlejob/singlejob';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the AppliedJobs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-applied-jobs',
  templateUrl: 'applied-jobs.html',
  providers:[JobBoardService]
})
export class AppliedJobsPage {
appliedJobsList:any;
token:string;
imageUrl:string;
   constructor(public navCtrl: NavController, public navParams: NavParams,public jobBoardService:JobBoardService, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.appliedJobs();
    })

  });
}
 appliedJobs()
 {
 	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.jobBoardService.appliedJobs().subscribe(
     (appliedJobs) => {      
      this.appliedJobsList=appliedJobs.result.info.data; 
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
    
    loader.dismiss();
 }
 public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
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
  public viewJob(jobId)
  {
   this.navCtrl.push(SinglejobPage, {jobId});
  }
}
