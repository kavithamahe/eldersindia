import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from 'ionic-native';
import { ServiceRequestService } from '../../providers/service-request-service';
import { ViewServiceRequestPage } from '../../pages/view-service-request/view-service-request';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Servicerequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-servicerequest',
  templateUrl: 'servicerequest.html',
  providers:[ServiceRequestService]
})
export class ServicerequestPage {
    @ViewChild(Content) content: Content;
imageUrl:any;
token:any;
status:any="";
serviceRequestInfo:any=[];
showRemark:any=null;
rating:number=0;
remarks:string='';
nextPageURL:any='';
getRemarksList:any=[];
serviceRequestScrollLists:any=[];
vendorStatus:any=[];
servicestatus:any=[];
sr_token:any;
searchEvent:any="";
sortby:any="";
other:any;
user_type:any;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
       storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      console.log(this.user_type); })
      storage.get('token').then((token) => { this.token=token; 
      this.sr_token=navParams.get("sr_token");
      if(navParams.get("sr_token")){
        this.onInits();
      }
      else{
       this.onInit(); 
      }
  		
      this.getRemarks();
      })
  	});
  }
    scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  onInitstatus(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    //this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestStatus(this.searchEvent,this.status).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
      this.vendorStatus=serviceRequest.result.info.status;
       this.servicestatus=serviceRequest.result.info.status;
      this.nextPageURL=serviceRequest.result.info.list.next_page_url;  
      loader.dismiss();    
    },
    (err) => { 
      this.serviceRequestInfo =[];
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
  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    //this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestList(this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
      this.vendorStatus=serviceRequest.result.info.status;
      this.servicestatus=serviceRequest.result.info.status;
      this.nextPageURL=serviceRequest.result.info.list.next_page_url;  
      loader.dismiss();    
    },
    (err) => { 
      this.serviceRequestInfo =[];
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
  public onInits()
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestLists(this.sr_token,this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
      this.vendorStatus=serviceRequest.result.info.status;
       this.servicestatus=serviceRequest.result.info.status;
      this.nextPageURL=serviceRequest.result.info.list.next_page_url;  
      loader.dismiss();    
    },
    (err) => { 
      this.serviceRequestInfo =[];
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
  public getItems(searchEvent) {
    this.searchEvent = searchEvent;
    this.onInit();
      // this.serviceRequest.searchConnection(term).subscribe(searchConnection => {
      //   this.serviceRequestInfo= searchConnection.result.info.list.data;
      // });
  }
  public getRemarks()
  {
    this.serviceRequest.getRemarks().subscribe(
     (getRemarks) => {
      this.getRemarksList=getRemarks.result.info.remark.data;       
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        
      }
    );
  }
    showConfirm(serviceId){
    let prompt = this.alertCtrl.create({
      title: 'Cancel Service Request',
     // message: "All reports are strictly confidential. Please describe the reason",
      inputs: [
        {
          name: 'title',
          placeholder: 'Comments'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            
            //console.log(data.title);
            if(data.title == ""){
              this.showToaster("Please enter the reason");
               return false;
            }
            else{
            this.cancelRequest(data.title,serviceId);
          }
          }
        }
      ]
    });
    prompt.present();
  }
  // showConfirm(serviceId){
  //    let confirm = this.alertCtrl.create({
  //    subTitle: 'This request will be deleted',
  //      buttons: [
  //       {
  //         text: 'Cancel',
  //        },
  //       {
  //         text: 'Ok',
  //         handler: () => {
  //          this.cancelRequest(serviceId);
          
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }
  public cancelRequest(title,serviceId)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.cancelRequest(title,serviceId).subscribe(
     (cancelRequest) => {
      this.getRemarksList=cancelRequest.result;   
      this.showToaster(cancelRequest.result); 
      loader.dismiss(); 
      this.onInit();   
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
      });
  }
  
  public viewRequest(serviceRequestId)
  {
     this.navCtrl.push(ViewServiceRequestPage, {serviceRequestId});
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
  enableRemark(eventId)
  {
    this.remarks='';
    this.rating=0;
   if(this.showRemark==eventId)
   {
     this.showRemark=null;
   }
   else
   {
     this.showRemark=eventId;
   }
  }
  submitRemark(serviceId)
  {
    if(this.rating==0 && this.remarks=='')
    {
    this.showAlert('Please enter rating and remarks');
    }
    else if(this.rating==0)
    {
    this.showAlert('Please enter rating');
    }
    else if(this.remarks=='')
    {
    this.showAlert('Please enter remarks');
    }
    else
    {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.submitRemark(serviceId,this.rating,this.remarks,this.other).subscribe(
     (submitRemark) => {      
      this.showToaster(submitRemark.result);  
      this.remarks='';
      this.rating=0;   
      this.showRemark=null;  
      this.onInit(); 
      loader.dismiss(); 
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
  showAlert(errorMsg) {
    let alert = this.alertCtrl.create({
      title: 'Error Message',
      subTitle:errorMsg,
      buttons: ['OK']
    });
    alert.present();
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.serviceRequestScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  serviceRequestScroll()
  {
    this.serviceRequest.serviceRequestScroll(this.nextPageURL,this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequestScroll) => {
      this.serviceRequestScrollLists=serviceRequestScroll.result.info.list.data; 
       for (let i = 0; i < Object.keys(this.serviceRequestScrollLists).length; i++) {
        this.serviceRequestInfo.push(this.serviceRequestScrollLists[i]);
        }
      
       this.nextPageURL=serviceRequestScroll.result.info.list.next_page_url;     
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
  public makeCall(number)
  {
    if(number)
    {
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
   }
   else
   {
    this.showToaster("There is no contact number");
   }
  }
}
