import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { EventsService } from '../../providers/events-service';
/*
  Generated class for the ViewEvents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-events',
  templateUrl: 'view-events.html'
})
export class ViewEventsPage {
token:string;
imageUrl:string;
eventsInfo:any;
eventsId:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public eventsService:EventsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.eventsId=navParams.get("eventsId");
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.viewEvents(this.eventsId);
    })

  });
  
  }
  public viewEvents(eventsId)
  { 
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
   this.eventsService.viewEvents(eventsId).subscribe(
     (viewEvents) => {
      this.eventsInfo=viewEvents.result;
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

}
