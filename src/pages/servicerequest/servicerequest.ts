import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, LoadingController,ToastController,AlertController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from 'ionic-native';
import { ServiceRequestService } from '../../providers/service-request-service';
import { ViewServiceRequestPage } from '../../pages/view-service-request/view-service-request';
import { DashboardPage } from '../../pages/dashboard/dashboard';
 import { PackagepaymentPagePage } from '../../pages/packagepayment/packagepayment';
 import { RecurringPagePage } from '../../pages/recurring/recurring';


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
result:any;
deduction_amount:any;
dedaction_service_cost:any;
payment_status:any;
percentage:any;
deductionamount:any;
servicecancelamount:any;
servicecost:any;
  constructor(public alertCtrl: AlertController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
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
  paynow(sr_token,service_cost,service_id,additional_service_cost){
    if(additional_service_cost == "0"){
      this.servicecost = service_cost;
    }
    else{
      this.servicecost = additional_service_cost;
    }
    let serviceModal = this.modalCtrl.create(PackagepaymentPagePage,{"sr_token":sr_token,"service_cost":this.servicecost,"service_id":service_id});
      serviceModal.present();
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
    showConfirm(serviceId,hours,service_id,sub_category_id,status,servicediscountcost_one_service,service_type,txnid,id,service_cost){
      if(service_type == "Recurring"){
        
    this.serviceRequest.getcancelRecurringPolicyConfig(hours,service_id,sub_category_id,status,servicediscountcost_one_service).subscribe(
     (cancelRequest) => {
      this.result = cancelRequest.result;
      this.deduction_amount=servicediscountcost_one_service * (this.result / 100);
      this.dedaction_service_cost = servicediscountcost_one_service - this.deduction_amount;
      var number = parseFloat(this.dedaction_service_cost).toFixed(2);
      console.log(number);
      this.showConfirms(serviceId,this.result,number,service_type,status,txnid); 
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
      });
  }
  else{
    this.serviceRequest.getcancelPolicyConfig(hours,service_id,sub_category_id,status,id,service_type).subscribe(
     (cancelRequest) => {
      this.result = cancelRequest.result;  
      this.percentage = this.result.percentage;
      this.payment_status = this.result.payment_status;
      this.deductionamount = service_cost * this.percentage/100;
      this.servicecancelamount = service_cost - this.deductionamount;
      this.showOnetime(serviceId,this.result,service_type,status,txnid,this.percentage,this.payment_status,this.deductionamount,this.servicecancelamount); 
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
      });
  }
    
  }
  showConfirms(serviceId,result,number,service_type,status,txnid){
    let prompt = this.alertCtrl.create({
      title: 'Cancel Service Request',
      message: "Service cancellation percentage :"+ result +" % Service cancellation amount "+ number+"",
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
          text: 'Confirm',
          handler: data => {
            
            //console.log(data.title);
            if(data.title == ""){
              this.showToaster("Please enter the reason");
               return false;
            }
            else{
            this.cancelRequest(data.title,serviceId,number,service_type,txnid);
          }
          }
        }
      ]
    });
    prompt.present();
    
  
  }
  showOnetime(serviceId,result,service_type,status,txnid,percentage,payment_status,deductionamount,servicecancelamount){
     let prompt = this.alertCtrl.create({
      title: 'Cancel Service Request',
      message: "Service cancellation percentage :"+ percentage +" % Service cancellation amount :"+ deductionamount+"Service refund amount :"+ servicecancelamount+" ",
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
          text: 'Confirm',
          handler: data => {
            
            //console.log(data.title);
            if(data.title == ""){
              this.showToaster("Please enter the reason");
               return false;
            }
            else{
            this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount);
          }
          }
        }
      ]
    });
    prompt.present();
  }
 
  public cancelRequest(title,serviceId,dedaction_service_cost,service_type,txnid)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.cancelRequest(title,serviceId,dedaction_service_cost,service_type,txnid).subscribe(
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
  public razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount).subscribe(
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
  
  public viewRequest(serviceRequestId,service)
  {
     this.navCtrl.push(ViewServiceRequestPage, {serviceRequestId,service});
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
  viewRecurring(){
    this.navCtrl.push(RecurringPagePage);
  }
}
