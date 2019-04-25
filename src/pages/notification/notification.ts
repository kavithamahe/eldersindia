import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
	emailvalue:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public providerService: ServiceProvider) {
  console.log(this.emailvalue);
  if(this.emailvalue == undefined){
  	this.emailvalue = 1;
  }
  
  this.getNotificationPreference();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
  getNotificationPreference(){
  	this.providerService.webServiceCall(`getNotoficationPreference`,"")
      .subscribe(data =>{
      	this.emailvalue = data.result.notification_preference;
    },
    err =>{
      this.providerService.showErrorToast(err);        
    })
  }
  update(){
  	 this.providerService.webServiceCall(`setNotifyPreference`,{"info":this.emailvalue})
      .subscribe(data =>{
      	this.providerService.showToast(data.result); 
      	this.providerService.showToast(data.error); 
    },
    err =>{
      this.providerService.showErrorToast(err);        
    }) 
  }
}
