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
  templateUrl: 'jobboard.html',
  providers:[JobBoardService]
})
export class JobboardPage {
imageUrl:any;
token:any;
jobBoardInfo:any;
user_type:any;
user_type_id:any;
jobDependentId:any;
emptyRecordSet:any='';
nextPageURL:any='';
jobBoardScrollLists:any;
loader:any;
functionalAreaList:any=[];
locationList:any=[];
functionalArea:any='';
location:any='';
file_name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public jobBoardService:JobBoardService,public modalCtrl: ModalController) {
    this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('user_type').then((user_type) => { this.user_type=user_type;});
      storage.get('user_type_id').then((user_type_id) => { this.user_type_id=user_type_id;});
      storage.get('token').then((token) => { this.token=token; 
  		this.onInit();
      });
  	});
  }

  public onInit()
  { 
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });     
    this.loader.present();
    this.jobBoardService.jobsList(this.functionalArea,this.location).subscribe(
     (jobBoard) => {
      this.jobBoardInfo=jobBoard.result.info.data; 
      if(this.jobBoardInfo.length == 0){
        this.showToaster("No Records Found")
      }
      this.nextPageURL=jobBoard.result.info.next_page_url;
      this.functionalAreaList=jobBoard.result.get.FunctionalArea; 
      this.locationList=jobBoard.result.get.Location; 
      this.emptyRecordSet='';
      this.loader.dismiss();
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        this.jobBoardInfo=[];
        this.nextPageURL='';
        this.emptyRecordSet=JSON.parse(err._body).error;       
        }
        else
        {
          this.showToaster("Try again later");
        }
         this.loader.dismiss();
      }
    );
    
  }

  public viewJob(jobId,status)
  {
   this.navCtrl.push(SinglejobPage, {jobId,status});
   console.log(status);

  }

  public applyJob(jobId)
  {
    if(this.user_type=='elder')
    {
       this.jobDependentId=this.user_type_id;
       
       this.callApplyJob(jobId,this.jobDependentId,this.file_name);
    }
    else
    {
      this.jobDependent(jobId);
    }
   
  }
  callApplyJob(jobId,jobDependentId,file_name)
  {
    this.jobBoardService.applyJob(jobId,jobDependentId,file_name).subscribe(
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
     this.file_name=data.file_name;

     if(this.jobDependentId!='')
     {
     this.callApplyJob(jobId,this.jobDependentId,this.file_name);
     }
     });
    modal.present();
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.jobBoardscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  jobBoardscroll()
  {

     this.jobBoardService.JobBoardscroll(this.nextPageURL,this.functionalArea,this.location).subscribe(
     (JobBoardscroll) => {
      this.jobBoardScrollLists=JobBoardscroll.result.info.data;

      for (let i = 0; i < Object.keys(this.jobBoardScrollLists).length; i++) {
        this.jobBoardInfo.push(this.jobBoardScrollLists[i]);
        }
      
       this.nextPageURL=JobBoardscroll.result.info.next_page_url;     
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
 
}
