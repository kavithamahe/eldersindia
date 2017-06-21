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
nextPageURL:any='';
appliedJobScrollLists:any;
loader:any;
searchTextBox:any='';

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
   this.loader = this.loadingCtrl.create({ content: "Please wait..." });     
    this.loader.present();
    this.appliedJobsList =[];
   this.jobBoardService.appliedJobs().subscribe(
     (appliedJobs) => {      
      this.appliedJobsList=appliedJobs.result.info.data; 
      this.loader.dismiss();
    },
    (err) => { 
      this.appliedJobsList =[];
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
        this.loader.dismiss();
      }
    );  
 }
 
  public jobsearch(searchEvent) {
    let term = searchEvent.target.value;
      this.jobBoardService.searchConnection(term).subscribe(searchConnection => {
        this.appliedJobsList= searchConnection.result.info.data;
      });
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
   doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.appliedJobscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  appliedJobscroll()
  {

     this.jobBoardService.appliedJobscroll(this.nextPageURL).subscribe(
     (appliedJobscroll) => {
      this.appliedJobScrollLists=appliedJobscroll.result.info.data;

      for (let i = 0; i < Object.keys(this.appliedJobScrollLists).length; i++) {
        this.appliedJobsList.push(this.appliedJobScrollLists[i]);
        }
      
       this.nextPageURL=appliedJobscroll.result.info.next_page_url;     
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
  ionViewDidLoad()
  {
    this.loader.dismiss();
  }
}
