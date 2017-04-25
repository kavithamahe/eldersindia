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
  templateUrl: 'messages.html',
  providers:[MessagesService]
})
export class MessagesPage {
messages:any;
token:string;
imageUrl:string;
inboxInfo:any=[];
sentInfo:any=[];
nextPageURL1:any='';
nextPageURL2:any='';
inboxScrollLists:any=[];
sentScrolllLists:any=[];
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
      this.inboxInfo=inbox.result.data; 
      this.nextPageURL1=inbox.result.next_page_url;      
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
      this.sentInfo=sent.result.data;  
      this.nextPageURL2=sent.result.next_page_url;         
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
  public viewMessages(messageId,viewType)
  {
  this.navCtrl.push(ViewMessagesPage, {messageId,viewType});
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

  doInfinite1(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL1!=null && this.nextPageURL1!='')
      {
       this.inboxscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  inboxscroll()
  {
     this.messagesService.inboxScroll(this.nextPageURL1).subscribe(
     (inboxScroll) => {
      this.inboxScrollLists=inboxScroll.result.data;
      for (let i = 0; i < Object.keys(this.inboxScrollLists).length; i++) {
        this.inboxInfo.push(this.inboxScrollLists[i]);
        }      
       this.nextPageURL1=inboxScroll.result.next_page_url;     
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

  doInfinite2(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL2!=null && this.nextPageURL2!='')
      {
       this.sentScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  sentScroll()
  {
     this.messagesService.sentScroll(this.nextPageURL2).subscribe(
     (sentScroll) => {
      this.sentScrolllLists=sentScroll.result.data;
      for (let i = 0; i < Object.keys(this.sentScrolllLists).length; i++) {
        this.sentInfo.push(this.sentScrolllLists[i]);
        }      
       this.nextPageURL2=sentScroll.result.next_page_url;     
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
