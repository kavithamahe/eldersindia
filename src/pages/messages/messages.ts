import { Component, ViewChild } from '@angular/core';
import { NavController,Slides,NavParams, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

import { MessagesService } from '../../providers/messages-service';
import { ViewMessagesPage } from '../../pages/view-messages/view-messages';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateMessagePage } from '../../pages/create-message/create-message';
import moment from 'moment';

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
delete:any;
deleteSelected =[];
hidedelete: boolean = false;
senddelete: boolean = false;
selected:any;
 selectedContacts: any=[];
 sendselectedContacts: any=[];
 currentCompany:any;
 multirow:any=[];
   constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,platform: Platform,public storage:Storage,public messagesService:MessagesService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.isAndroid = platform.is('android');
    if(navParams.get("viewType")!='' && navParams.get("viewType")!=null)
    {
    this.messages=navParams.get("viewType");
    }
     this.selectedContacts = [];
     this.sendselectedContacts = [];
      
  
  }
  ionViewWillEnter(){
      this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
       this.messages=='inbox'
      if(this.navParams.get("messages")=="sent")
    {
    this.messages=this.navParams.get("messages");
    this.sent();
    }
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
  clickedAvatar(id){

       if(this.isInArray(id)){
         let index = this.selectedContacts.indexOf(id);
         this.selectedContacts.splice(index,1);
         this.selected = false;
       }else{
          this.selectedContacts.push(id);
          this.hidedelete = true;
       }
    }

    isInArray(id){
      let check= false;
      for(let contactId of this.selectedContacts){
         if(contactId == id){ 
           check = true;
         }
      }
      return check;
    }
      setClickedRow(index){
        if(this.multirow[index]){
          this.multirow[index] = "";
        }
        else{
          this.multirow[index] = index;
        }
           
        }
   deletesendMultipel(id) {
   
       if(this.isInArraySend(id)){
         let index = this.sendselectedContacts.indexOf(id);

         this.sendselectedContacts.splice(index,1);
         // this.selected = false;
       }else{
          this.sendselectedContacts.push(id);
                this.senddelete = true;
       }
  }
    isInArraySend(id){
      let check= false;
      for(let contactId of this.sendselectedContacts){
         if(contactId == id){ 
           check = true;
         }
      }
      return check;
    }
  logDeleteStudents(viewType) { 
    this.hidedelete = false;
      this.messagesService.deleteBulkMessages(this.selectedContacts,viewType).subscribe(
     (deleteMessage) => {
       this.showToaster(deleteMessage.result);
       this.onInit(); 
    });
  }
 
sentlogDeleteStudents(viewType){
  this.senddelete = false;
  this.messagesService.deleteBulkMessages(this.sendselectedContacts,viewType).subscribe(
     (deleteMessage) => {
       this.showToaster(deleteMessage.result);
       this.sent();
    });
}
  public onInit()
  {
    this.deleteSelected = [];
    this.senddelete = false;
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.inbox(this.inbox).subscribe(
     (inbox) => {
      this.inboxInfo=inbox.result.data;
      var dataList=inbox.result.data;
      for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YY HH:mm");
           }
        this.inboxInfo = dataList;
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
          this.showToaster("Something went wrong");
           this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );
  }
 
   public getItems(inbox){

    
    this.inbox = inbox;
    this.onInit();
   

  }
 
  public setItems(outbox){
     // let term = searchEvent.target.value;
     this.outbox = outbox;
    this.sent();
 
  }
  
  public sent()
  {
    this.deleteSelected = [];
    this.hidedelete = false;
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.sent(this.outbox).subscribe(
     (sent) => {
      this.sentInfo=sent.result.data; 
        var dataList=sent.result.data; 
      for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YY HH:mm");
           }
        this.sentInfo = dataList; 
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
          this.showToaster("Something went wrong");
          this.emptyRecord = "No Records Found"
        }
        loader.dismiss();
      }
    );    
  }
  public viewMessages(messageId,viewType)
  {

    this.senddelete = false;
    this.hidedelete = false;
    this.deleteSelected = [];
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
        var dataList=inboxScroll.result.data;
      for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YY HH:mm");
           }
        this.inboxScrollLists = dataList;
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
          this.showToaster("Something went wrong");
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
       var dataList=sentScroll.result.data; 
      for(let data of dataList) {
          data.created_at = moment(data.created_at).format("DD MMM YY HH:mm");
           }
        this.sentScrolllLists = dataList; 
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
          this.showToaster("Something went wrong");
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
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
  }

}
