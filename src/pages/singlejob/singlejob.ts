import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController,Platform,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from 'ionic-native';
import { InAppBrowser } from 'ionic-native';

import { JobBoardService } from '../../providers/job-board-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { JobDependentPage } from '../../pages/job-dependent/job-dependent';
import { AppliedJobsPage } from '../../pages/applied-jobs/applied-jobs';

import moment from 'moment';
/*
  Generated class for the Singlejob page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-singlejob',
  templateUrl: 'singlejob.html',
  providers:[JobBoardService]
})
export class SinglejobPage {
jobId:number;
imageUrl:any='';
token:any;
singleJobInfo:any;
applyJobInfo:any;
jobDependentId:any;
user_type:any;
user_type_id:any;
file_name:any;
functional_area:any=[];
appliedjobs:any;
myjobrequestinfo:any=[];
companyname:any;
is_applied:any;
eldertitle:any=[];
user:any=[];
logo:any;
  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public jobBoardService:JobBoardService,public modalCtrl: ModalController) {
  	this.jobId=navParams.get("jobId");
    this.is_applied=navParams.get("status");
    this.appliedjobs=navParams.get("appliedjobs");
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
    if(this.appliedjobs){  
       let loader = this.loadingCtrl.create({ content: "Please wait..." });     
       loader.present();
    this.jobBoardService.myjobrequest(this.jobId).subscribe(
     (myjobrequest) => {
      this.myjobrequestinfo=myjobrequest.result.info;
       var dataList=myjobrequest.result.info;
        for(let data of dataList) {
         data.created_at = moment(data.created_at).format("DD-MM-YYYY HH:mm:ss"); 
        }
        this.myjobrequestinfo = dataList;
      this.user=this.myjobrequestinfo[0].user;
      this.logo=this.user.logo;
      loader.dismiss();
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
         }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
    }
    else{
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.jobBoardService.singleJob(this.jobId).subscribe(
     (singleJob) => {
      this.singleJobInfo=singleJob.result.info;
       var dataList=singleJob.result.info;
        for(let data of dataList) {
         data.created_at = moment(data.created_at).format("DD-MM-YYYY HH:mm:ss"); 
        }
        this.singleJobInfo = dataList;
      this.user=this.singleJobInfo[0].user;
      this.logo=this.user.logo;
      this.functional_area=singleJob.result.info.functional_area;
      loader.dismiss();
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
          this.singleJobInfo=[];
          this.functional_area=[];
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
    }
}
pressevent(jobId){
  this.applyJob(jobId);
}
   public applyJob(jobId)
  {
 
      let modal = this.modalCtrl.create(JobDependentPage,{"jobId":jobId,"is_applied":this.is_applied,"appliedjobs":this.appliedjobs});
      modal.onDidDismiss(data => {
     this.jobId=data.jobId;
     this.appliedjobs=data.appliedjobs;
     this.is_applied = data.is_applied;
     if(this.jobId){
      this.onInit();
     }
     });
    modal.present();
    
   
  }
  callApplyJob(jobId,jobDependentId,file_name)
  {
    this.jobBoardService.applyJob(jobId,jobDependentId,file_name).subscribe(
     (applyJob) => {
       this.showToaster(applyJob.result);
       this.navCtrl.setRoot(AppliedJobsPage);
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      });
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
     this.file_name=data.file_name
     if(this.jobDependentId!='')
     {
     this.callApplyJob(jobId,this.jobDependentId,this.file_name);
     }
     });
    modal.present();
  }
   public makeCall(number)
  {
    if(number)
    {
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
   }
   else
   {
    this.showToaster("There is no contact number");
   }
  }

  openUrl(website) {
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(website,'_blank');

        });
  }
  openUrlemail(email){
    this.platform.ready().then(() => {
            let browser = new InAppBrowser(email,'_blank');

        });
  }
}
