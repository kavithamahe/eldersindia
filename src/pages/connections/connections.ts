import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ConnectionsService } from '../../providers/connections-service';
/*
  Generated class for the Connections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'connections.html',
  providers:[ConnectionsService]
})
export class ConnectionsPage {
connections:string;  
messages:any;
token:string='';
imageUrl:string;
allConnectionsInfo:any=[];
receivedRquestInfo:any=[];
orgReceivedRquestInfo:any=[];
connectionStatusInfo:any=[];
orgAllConnectionsInfo:any=[];
infiniteReceivedRquestInfo:any=[];
nextURL;any;
user_id:any;
nextPageURL1:any='';
nextPageURL2:any='';
allConnectionScrollLists:any=[];
receivedConnectionScrollLists:any=[];
   constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public connectionsService:ConnectionsService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.connections="all";
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
  public onInit()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.allConnections().subscribe(
     (allConnections) => {
      this.allConnectionsInfo=allConnections.result.info.list.data;  
      this.orgAllConnectionsInfo=allConnections.result.info.list.data;
      this.nextPageURL1=allConnections.result.info.list.next_page_url; 
      console.log("onload");
      console.log(this.allConnectionsInfo);      
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
  public receivedRquest()
  {    
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.receivedRquest().subscribe(
     (receivedRquest) => {
      this.receivedRquestInfo=receivedRquest.result.info.list.data;
      this.orgReceivedRquestInfo=receivedRquest.result.info.list.data; 
       this.nextPageURL2=receivedRquest.result.info.list.next_page_url;     
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
  public connectionStatus(connectionId,status)
  {    
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.connectionsService.connectionStatus(connectionId,status).subscribe(
     (connectionStatus) => {
      this.showToaster(connectionStatus.result);
      this.receivedRquest();   
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        this.receivedRquest(); 
        }
        else
        {
          this.showToaster("Try again later");
        }
      }
    );
    loader.dismiss();
  }
  public search(searchEvent) {
    let term = searchEvent.target.value;
      this.connectionsService.searchConnection(term).subscribe(searchConnection => {
        this.allConnectionsInfo= searchConnection.result.info.list.data;
      });
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
     this.connectionsService.receivedConnectionScroll(this.nextPageURL2).subscribe(
     (receivedConnectionScroll) => {
      this.receivedConnectionScrollLists=receivedConnectionScroll.result.info.list.data;  
      // console.log(this.allConnectionScrollLists);
      for (let i = 0; i < Object.keys(this.receivedConnectionScrollLists).length; i++) {        
        this.receivedRquestInfo.push(this.receivedConnectionScrollLists[i]);
        // this.orgAllConnectionsInfo.push(this.allConnectionScrollLists[i]);
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
          this.showToaster("Try again later");
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
  
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
   doInfinite1(infiniteScroll) {
      console.log(this.allConnectionsInfo);
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
   
     this.connectionsService.allConnectionScroll(this.nextPageURL1).subscribe(
     (allConnectionScroll) => {
      this.allConnectionScrollLists=allConnectionScroll.result.info.list.data;  
      // console.log(this.allConnectionScrollLists);
      for (let i = 0; i < Object.keys(this.allConnectionScrollLists).length; i++) {
        this.allConnectionsInfo.push(this.allConnectionScrollLists[i]);
        // this.orgAllConnectionsInfo.push(this.allConnectionScrollLists[i]);
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
          this.showToaster("Try again later");
        }
      }
    );
  }
}
