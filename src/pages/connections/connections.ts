import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { PopoverController,ViewController,Slides,NavController, NavParams,ActionSheetController,LoadingController,ToastController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityprofilePage } from '../../pages/communityprofile/communityprofile';
import { ConnectionsService } from '../../providers/connections-service';

import * as _ from "lodash"

/*
  Generated class for the Connections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	  selector: 'page-connections',
  templateUrl: 'connections.html',
  providers:[ConnectionsService]
})
export class ConnectionsPage {
@ViewChild(Content) content: Content;
@ViewChild(Slides) slides: Slides;
getconnections:string;
connections:string;  
messages:any;
token:string='';
imageUrl:string;
allConnectionsInfo:any=[];
myNewList:any=[];
receivedRquestInfo:any=[];
sentRquestInfo:any=[];
addConnectionInfo:any=[];
orgReceivedRquestInfo:any=[];
connectionStatusInfo:any=[];
orgAllConnectionsInfo:any=[];
infiniteReceivedRquestInfo:any=[];
nextURL;any;
user_id:any;
nextPageURL1:any='';
nextPageURL2:any='';
nextPageURL3:any='';
nextPageURL4:any='';
connect_name:any;
receivedrequests:any;
sentrequests:any;
allrequests:any;
connectionsaction:any;

allConnectionScrollLists:any=[];
receivedConnectionScrollLists:any=[];
prev_index:any = 0;
data:any;
All:any;
searchText:any="";
searchrec:any="";
searchsend:any="";
searchadd:any="";
error:any;
check:any;
scrollTop:boolean = false;
result:any=[];
   constructor(private popoverCtrl: PopoverController,public platform: Platform,public navCtrl: NavController, public actionsheetCtrl: ActionSheetController,public navParams: NavParams,public storage:Storage,public connectionsService:ConnectionsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.getconnections="myConnections";
    this.connectionsaction ="all";
    if(navParams.get("notification")== 'connection_request'){
      this.connections = "received";
    }else{
      this.connections="all";  
    }
    
    this.messages="inbox";
    this.storage.ready().then(() => {
    
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
       storage.get('id').then((id) => { this.user_id=id;
       });

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
  public onInit()
  {

   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.connectionsService.allConnections().subscribe(
     (allConnections) => {
     // setInterval(()=> {
        this.allConnectionsInfo=allConnections.result.info.list.data;  
        var filtered =  _.uniqBy(this.allConnectionsInfo, 'id');
        this.allConnectionsInfo = filtered;
      this.orgAllConnectionsInfo=allConnections.result.info.list.data;
      this.nextPageURL1=allConnections.result.info.list.next_page_url; 
      console.log(this.nextPageURL1);
       //},5000); 
     loader.dismiss();       
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
  public receivedRquest()
  {    
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.receivedRquest().subscribe(
     (receivedRquest) => {
      this.receivedRquestInfo=receivedRquest.result.info.list.data;
      var filtered =  _.uniqBy(this.receivedRquestInfo, 'id');
        this.receivedRquestInfo = filtered; 
      this.orgReceivedRquestInfo=receivedRquest.result.info.list.data; 
      this.nextPageURL2=receivedRquest.result.info.list.next_page_url;  
       loader.dismiss();   
    },
    (err) => { 
      this.error = JSON.parse(err._body).error;
        if(err.status===401)
        {
          this.check = JSON.parse(err._body).error;
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
   public sentRquest()
  {    
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.sentRquest().subscribe(
     (sentRquest) => {
      this.sentRquestInfo=sentRquest.result.info.list.data;
       var filtered =  _.uniqBy(this.sentRquestInfo, 'id');
        this.sentRquestInfo = filtered; 
      this.nextPageURL4=sentRquest.result.info.list.next_page_url;     
      loader.dismiss();
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
    public addConnectionsList()
  {    
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.getAllConnectionList().subscribe(
     (addConnectionsList) => {
      this.addConnectionInfo=addConnectionsList.result.info.data;
      var filtered =  _.uniqBy(this.addConnectionInfo, 'id');
        this.addConnectionInfo = filtered;
      this.nextPageURL3=addConnectionsList.result.info.next_page_url;
      loader.dismiss();
        },
    (err) => { 
        if(err.status===401)
        {
          this.error = JSON.parse(err._body).error;
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
  public connectionStatus(connectionId,status)
  {    
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.connectionStatus(connectionId,status).subscribe(
     (connectionStatus) => {
      this.showToaster(connectionStatus.result);
      this.receivedRquest();  
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
        this.error = JSON.parse(err._body).error;
        this.showToaster(JSON.parse(err._body).error);
        this.receivedRquest(); 
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
  }
  cancelMember(connectionId){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.cancelMember(connectionId).subscribe(
     (connectionStatus) => {
      this.showToaster(connectionStatus.result);
      this.sentRquest();  
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        this.sentRquest(); 
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );    
  }
  
  public search(searchEvent) {
   this.searchText = searchEvent;
      this.connectionsService.searchConnection(this.searchText).subscribe(searchConnection => {
        this.allConnectionsInfo= searchConnection.result.info.list.data;
        var filtered =  _.uniqBy(this.allConnectionsInfo, 'id');
        this.allConnectionsInfo = filtered;
      },
      (err) => { 
        this.allConnectionsInfo = [];
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
  public sendsearch(searchEvent){
     this.searchsend=searchEvent;
      this.connectionsService.sendsearchConnection(this.searchsend).subscribe(searchConnection => {
        this.sentRquestInfo= searchConnection.result.info.list.data;
        var filtered =  _.uniqBy(this.sentRquestInfo, 'id');
        this.sentRquestInfo = filtered; 
      },
       (err) => { 
        this.sentRquestInfo = [];
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
   
 public receivedsearch(searchEvent){
     this.searchrec = searchEvent;
      this.connectionsService.receivedsearchConnection(this.searchrec).subscribe(searchConnection => {
        this.receivedRquestInfo= searchConnection.result.info.list.data;
        var filtered =  _.uniqBy(this.receivedRquestInfo, 'id');
        this.receivedRquestInfo = filtered; 
      },
      (err) => { 
        this.receivedRquestInfo = [];
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
  public search1(Event) {
    this.searchadd=Event;
      this.connectionsService.addsearchConnection(this.searchadd).subscribe(searchConnections => {
        this.addConnectionInfo= searchConnections.result.info.data;
         var filtered =  _.uniqBy(this.addConnectionInfo, 'id');
        this.addConnectionInfo = filtered;
        if(this.addConnectionInfo == ""){
          this.addConnectionsList();
        }
      },
      (err) => { 
        this.addConnectionInfo = [];
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
 public connectMember(connect_id,connect_name,last_name){
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.sendConnectionRequest(connect_id,connect_name,last_name).subscribe(
     (connectionMember) => {
       this.showToaster(connectionMember.result.info);
       this.addConnectionsList();
       loader.dismiss();
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
  public doInfinite2(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL2!=null && this.nextPageURL2!='')
      {
        this.receivedConnectionScroll();
      }
      else{
         infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  receivedConnectionScroll()
  {
    this.scrollTop = true;
     this.connectionsService.receivedConnectionScroll(this.nextPageURL2,this.searchrec).subscribe(
     (receivedConnectionScroll) => {
      this.receivedConnectionScrollLists=receivedConnectionScroll.result.info.list.data;  
      var filtered =  _.uniqBy(this.receivedConnectionScrollLists, 'id');
        this.receivedConnectionScrollLists = filtered; 
      for (let i = 0; i < Object.keys(this.receivedConnectionScrollLists).length; i++) {        
        this.receivedRquestInfo.push(this.receivedConnectionScrollLists[i]);
        }
      
       this.nextPageURL2=receivedConnectionScroll.result.info.list.next_page_url;   
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
  public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  public CommunityUserWall(profile_uid)
  {
    this.navCtrl.push(CommunityprofilePage,{profile_uid});
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
   doInfinite1(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL1!=null && this.nextPageURL1!='')
      {
       this.allConnectionScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  allConnectionScroll()
  {
    this.scrollTop = true;
   
     this.connectionsService.allConnectionScroll(this.nextPageURL1,this.searchText).subscribe(
     (allConnectionScroll) => {
      this.allConnectionScrollLists=allConnectionScroll.result.info.list.data; 
      var filtered =  _.uniqBy(this.allConnectionScrollLists, 'id');
        this.allConnectionScrollLists = filtered; 
      
      for (let i = 0; i < Object.keys(this.allConnectionScrollLists).length; i++) {
        this.allConnectionsInfo.push(this.allConnectionScrollLists[i]);
        }
      
       this.nextPageURL1=allConnectionScroll.result.info.list.next_page_url;   
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
 
   doInfinite4(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL4!=null && this.nextPageURL4!='')
      {
       this.sentRequestScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  sentRequestScroll()
  {
   this.scrollTop = true;
     this.connectionsService.sentRequestScroll(this.nextPageURL4,this.searchsend).subscribe(
     (sentRequestScroll) => {
      this.allConnectionScrollLists=sentRequestScroll.result.info.list.data;  
    var filtered =  _.uniqBy(this.allConnectionScrollLists, 'id');
        this.allConnectionScrollLists = filtered; 
      for (let i = 0; i < Object.keys(this.allConnectionScrollLists).length; i++) {
        this.sentRquestInfo.push(this.allConnectionScrollLists[i]);
        }
      
       this.nextPageURL4=sentRequestScroll.result.info.list.next_page_url;   
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
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage, {
    });
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((popoverData) => {
      this.connectionsaction = popoverData;
   if(this.connectionsaction == "all"){
      this.connectionsaction = "all";
            this.onInit();
   }
    if(this.connectionsaction == "received"){
      this.connectionsaction = "received";
            this.receivedRquest();
   }
    if(this.connectionsaction == "sent"){
      this.connectionsaction = "sent";
            this.sentRquest();
   }
   if(this.connectionsaction == "null" || this.connectionsaction === null  ){
      this.connectionsaction = "all";
            this.onInit();
   }
    })
  }

}



@Component({
  template: `<ion-list class='send-req'>
<ion-item (click)="requests('all')">
All Requests
</ion-item>
<ion-item (click)="requests('received')">
Received Requests
</ion-item>
<ion-item (click)="requests('sent')">
Sent Requests
</ion-item>
</ion-list>
  `
})
export class PopoverPage {
  connectionsaction:any;
  constructor(private viewCtrl: ViewController) {
   this.connectionsaction = "all";
   }
 requests(data){
   this.connectionsaction=data;
   this.viewCtrl.dismiss(this.connectionsaction);
 }
 
}