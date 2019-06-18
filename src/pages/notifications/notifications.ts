import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { ConnectionsPage } from '../../pages/connections/connections';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';
import { ServiceProvider } from '../../providers/service-provider';
import {PackageRequestPagePage } from '../../pages/package-request/package-request';
import { BlogsPage } from '../../pages/blogs/blogs';
import { CommunitylistPage } from '../../pages/communitylist/communitylist';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
get_notification:any=[];
imageUrl:any;
multirowsent:any=[];
request_type:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public providerService: ServiceProvider) {
  	 this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
  })
  	this.get_notification = navParams.get("get_notification");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }
  dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  viewNotifications(notify_type,id){
          this.providerService.sendNotifyReadStatus(id)
      .subscribe(data =>{
    })
  	if(notify_type == "request_received" || notify_type == "request_accept"){
      if(notify_type == "request_received"){
         this.request_type="request";
      }
      else{
         this.request_type="accept";
      }
  		this.navCtrl.setRoot(ConnectionsPage,{"request_type":this.request_type});
  	}
  	else if(notify_type == "avail_package"){
  		this.navCtrl.setRoot(PackageRequestPagePage);
  	}
    else if(notify_type == "blog_approve"){
      this.navCtrl.setRoot(BlogsPage);
    }
    else if(notify_type == "comments" || notify_type == "likes"){
      this.navCtrl.setRoot(CommunitylistPage);
    }
    else{
      this.navCtrl.setRoot(ServicerequestPage);
    }
  }
    
}
