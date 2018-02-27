import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';

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
   @ViewChild(Content) content: Content;
appliedJobsList:any;
token:string;
imageUrl:string;
nextPageURL:any='';
appliedJobScrollLists:any;
loader:any;
searchTextBox:any='';
emptyRecord:any;
functionalAreaList:any=[];
locationList:any=[];
functionalArea:any='';
location:any='';
emptyRecordSet:any='';
searchText:any="";
usermenu:any;
   constructor(public navCtrl: NavController, public navParams: NavParams,public jobBoardService:JobBoardService, public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    
  this.storage.ready().then(() => {
      storage.get('usermenu').then((val) => { this.usermenu=val;
    console.log(this.usermenu);});
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.onInit();
    })

  });
}
scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  onSelectChange(selectedValue: any) {
    console.log(this.functionalArea);
   if(this.functionalArea == "All"){
    this.functionalArea = "";
    this.onInit();
   }
   else{
      this.functionalArea = selectedValue;
    this.onInit();
   }
  
  }
 public onInit()
 {
   this.loader = this.loadingCtrl.create({ content: "Please wait..." });     
    this.loader.present();
    this.appliedJobsList =[];
   this.jobBoardService.appliedJobs(this.searchText,this.functionalArea,this.location).subscribe(
     (appliedJobs) => {      
       this.appliedJobsList=appliedJobs.result.info.data;
       if(this.appliedJobsList.length == 0){
        this.showToaster("No Records Found")
      }
       this.nextPageURL=appliedJobs.result.info.next_page_url; 
      this.functionalAreaList=appliedJobs.result.get.FunctionalArea; 
      this.locationList=appliedJobs.result.get.Location; 
      this.loader.dismiss();
    },
    (err) => { 
      this.appliedJobsList =[];
        if(err.status===401)
        {
        this.emptyRecord = (JSON.parse(err._body).error);
         this.appliedJobsList=[];
        this.nextPageURL='';
        this.emptyRecordSet=JSON.parse(err._body).error;
        }
        else
        {
          this.showToaster("Try again later");
          this.emptyRecord = "No Records Found"
        }
        this.loader.dismiss();
      }
    );  
 }
 getItems(searchEvent){
   this.searchText = searchEvent;

  this.onInit();
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
    let  appliedjobs ={fuctionality:"appliedjobs"}
   this.navCtrl.push(SinglejobPage, {jobId,appliedjobs});
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

     this.jobBoardService.appliedJobscroll(this.nextPageURL,this.searchText,this.functionalArea,this.location).subscribe(
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
