import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ViewEventsPage } from '../../pages/view-events/view-events';
import { EventsService } from '../../providers/events-service';

import moment from 'moment';
/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  providers:[EventsService]
})
export class EventsPage {
@ViewChild(Content) content: Content;
token:string;
imageUrl:string;
eventsLists:any[]=[];
nextPageURL:any='';
eventScrollLists:any;
emptyRecord:any;
scrollTop:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public eventsService:EventsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
       
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.eventsList();
    })

  });
 
  }
  public eventsList()
  { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.eventsService.eventsList().subscribe(
     (eventsList) => {
      this.eventsLists=eventsList.result.data;    
      var dataList=eventsList.result.data; 
        for(let data of dataList) {
            data.post_date = moment(data.post_date).format("DD MMM YYYY");
            data.end_date = moment(data.end_date).format("DD MMM YYYY");
          } 
          this.eventsLists = dataList;    
      this.nextPageURL=eventsList.result.next_page_url;
      loader.dismiss(); 
    },
    (err) => {       
        if(err.status===401)
        {
        this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
           this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );  
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
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
  public viewEvents(eventsId)
  {
   this.navCtrl.push(ViewEventsPage, {eventsId});
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.newsscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  newsscroll()
  {
    this.scrollTop = true;
     this.eventsService.eventsscroll(this.nextPageURL).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.data;
      var dataList=eventsscroll.result.data; 
        for(let data of dataList) {
            data.post_date = moment(data.post_date).format("DD MMM YYYY");
            data.end_date = moment(data.end_date).format("DD MMM YYYY");
          } 
          this.eventScrollLists = dataList; 
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.eventsLists.push(dataList[i]);
        }
      
       this.nextPageURL=eventsscroll.result.next_page_url;     
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
      }
    );
  }
}
