import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MessagesService } from '../../providers/messages-service';
import { ViewMessagesPage } from '../../pages/view-messages/view-messages';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateMessagePage } from '../../pages/create-message/create-message';

/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
messages:any;
token:string;
imageUrl:string;
inboxInfo:any;
sentInfo:any;
   constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public messagesService:MessagesService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  	this.messages="inbox";
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      // this.blogId=navParams.get("blogId");
  		this.onInit();
      })
  	});
  }
  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.inbox().subscribe(
     (inbox) => {
      this.inboxInfo=inbox.result;     
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
  public sent()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.sent().subscribe(
     (sent) => {
      this.sentInfo=sent.result;     
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
  public viewMessages(messageId)
  {
  this.navCtrl.push(ViewMessagesPage, {messageId});
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
  public createMessage()
  {
  this.navCtrl.push(CreateMessagePage);
  }
}
