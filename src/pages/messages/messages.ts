import { Component, ViewChild } from '@angular/core';
import { NavController,Slides,NavParams, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

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
@ViewChild(Slides) slides: Slides;
prev_index:any = 0;
messages: String ="inbox";
isAndroid: boolean = false;
token:string;
imageUrl:string;
inboxInfo:any=[];
sentInfo:any=[];
nextPageURL1:any='';
nextPageURL2:any='';
inboxScrollLists:any=[];
sentScrolllLists:any=[];
status:any;
inbox:any="";
outbox:any="";
emptyRecord:any;

   constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,platform: Platform,public storage:Storage,public messagesService:MessagesService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  	this.isAndroid = platform.is('android');
    if(navParams.get("viewType")!='' && navParams.get("viewType")!=null)
    {
    this.messages=navParams.get("viewType");
    }
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      // this.blogId=navParams.get("blogId");
      if(this.messages=='inbox')
      {
      this.onInit();
      }
      else
      {
       this.sent(); 
      }
      })
  	});
  }
  
  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.inbox(this.inbox).subscribe(
     (inbox) => {
      this.inboxInfo=inbox.result.data;
      this.status=this.inboxInfo.read_status;
      this.nextPageURL1=inbox.result.next_page_url;  
      loader.dismiss();    
    },
    (err) => { 
      this.inboxInfo =[];
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
           this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );
  }
   public getItems(inbox){

    
    this.inbox = inbox;
    this.onInit();
   

     // let term = searchEvent.target.value;
     // this.onInit();
      // this.messagesService.inboxSearch(term).subscribe(searchConnection => {
      // this.inboxInfo=searchConnection.result.data;
      // },
      // (err) => { 
      //   this.inboxInfo =[];
      //   if(err.status===401)
      //   {
      //     this.showToaster(JSON.parse(err._body).error);
      //   this.emptyRecord = (JSON.parse(err._body).error);
      //   }
      //   else
      //   {
      //     this.showToaster("Try again later");
      //      this.emptyRecord = "No Records Found"
      //   }
      // }
      // );
  }
 
  public setItems(outbox){
     // let term = searchEvent.target.value;
     this.outbox = outbox;
    this.sent();
      // this.messagesService.sentSearch(term).subscribe(searchConnection => {
      // this.sentInfo=searchConnection.result.data;
      // },
      // (err) => {
      // this.sentInfo =[]; 
      //   if(err.status===401)
      //   {
      //     this.showToaster(JSON.parse(err._body).error);
      //   this.emptyRecord = (JSON.parse(err._body).error);
      //   }
      //   else
      //   {
      //     this.showToaster("Try again later");
      //      this.emptyRecord = "No Records Found"
      //   }
      // }
      // );
  }
  
  public sent()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.sent(this.outbox).subscribe(
     (sent) => {
      this.sentInfo=sent.result.data;  
      this.nextPageURL2=sent.result.next_page_url; 
      loader.dismiss();        
    },
    (err) => { 
       this.sentInfo=[];
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
          this.emptyRecord = (JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
          this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );    
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
  showConfirm(messageId,viewType){
     let confirm = this.alertCtrl.create({
     subTitle: 'This Message will be deleted',
       buttons: [
        {
          text: 'Cancel',
         },
        {
          text: 'Ok',
          handler: () => {
           this.deleteMessage(messageId,viewType);
          
          }
        }
      ]
    });
    confirm.present();
  }
  deleteMessage(messageId,viewType)
  {
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.deleteMessage(messageId,viewType).subscribe(
     (deleteMessage) => {
       this.showToaster(deleteMessage.result);
      if(viewType =='sent')
      {
        this.sent();
        loader.dismiss();
      } 
      else
      {
        this.onInit();
        loader.dismiss();
      }  
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
        loader.dismiss();
      }
    );    
  }

}
