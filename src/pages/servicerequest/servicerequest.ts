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

 import moment from 'moment';


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
totalcostofrecurring:any;
paid_amount:any;
utilized_service_cost:any;
cancelCharges:any;
service_remaing_cost:any;
new_service_amount:any;
final_payable_amount:any;
paystatus:any;
results:any;
user_type:any;
get_participants:any=[];
preferred_date:any;
  constructor(public alertCtrl: AlertController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public serviceRequest:ServiceRequestService) {
  	this.paystatus = navParams.get("status");
    this.results = navParams.get("result");
    console.log(this.results);
    if(this.paystatus == "1"){
      this.showToaster(this.results);
    }
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
  getparticipants(service){
        this.serviceRequest.travelServiceMemberList(service.id).subscribe(
     (serviceRequest) => {
      this.get_participants=serviceRequest.result;
      this.toggleDetails(service);
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
toggleDetails(service) {
    if (service.showDetails) {
        service.showDetails = false;
    } else {
        service.showDetails = true;
    }
  }
  onInitstatus(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    //this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestStatus(this.searchEvent,this.status).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
       var dataList=serviceRequest.result.info.list.data;
        for(let data of dataList) {
          this.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
        }
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
  payOptionforAdditionalServiceCost(sr_token,id,additional_service_cost,payment_status,service_type){
     this.navCtrl.push(PackagepaymentPagePage,{"sr_token":sr_token,"service_cost":additional_service_cost,"service_id":id,"payment_status":payment_status,"status":"1","service_type":service_type});
  }
  payOptionforpendingPayment(sr_token,pending_service_amount,id,additional_service_cost,payment_status,prev_service_amount_balance){
      if(payment_status == 'payment_success'){
   this.servicecost = pending_service_amount;
  }else{
    this.servicecost = parseInt(pending_service_amount) + parseInt(additional_service_cost) - parseInt(prev_service_amount_balance);
  }
     this.navCtrl.push(PackagepaymentPagePage,{"sr_token":sr_token,"service_cost":this.servicecost,"service_id":id,"payment_status":payment_status,"pending_service_amount":pending_service_amount,"prev_service_amount_balance":prev_service_amount_balance,"additional_service_cost":additional_service_cost});
  }

  public onInit()
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    //this.serviceRequestInfo =[];
    this.serviceRequest.serviceRequestList(this.searchEvent,this.status,this.sortby).subscribe(
     (serviceRequest) => {
      this.serviceRequestInfo=serviceRequest.result.info.list.data; 
       var dataList=serviceRequest.result.info.list.data;
        for(let data of dataList) {
          this.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
        }
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
       var dataList=serviceRequest.result.info.list.data;
        for(let data of dataList) {
          this.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
        }
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
        // this.showToaster(JSON.parse(err._body).error);
        }
        
      }
    );
  }
    showConfirm(serviceId,hours,service_id,sub_category_id,status,servicediscountcost_one_service,service_type,txnid,id,service_cost,recurring_request_id,req_count,package_id,Paymentstatus,paid_amount,sr_token){
      if(service_type == "Recurring"){
        this.totalcostofrecurring = service_cost * req_count;
        // this.totalcostofrecurring = paid_amount;
    this.serviceRequest.getcancelRecurringPolicyConfig(hours,service_id,sub_category_id,status,service_type,recurring_request_id,req_count,id).subscribe(
     (cancelRequest) => {
      this.result = cancelRequest.result;
      this.percentage = this.result.percentage;
      this.paid_amount = this.result.paid_amount;
      this.service_remaing_cost = this.result.service_remaing_cost;
      this.utilized_service_cost = this.result.utilized_service_cost;
       if(this.paid_amount > this.utilized_service_cost){
          this.cancelCharges = service_cost * (this.percentage/100);
          if(this.service_remaing_cost > this.cancelCharges){
           this.dedaction_service_cost = this.service_remaing_cost - this.cancelCharges;
          }else{
            
          }
        }
          else if(this.paid_amount == this.utilized_service_cost){
          this.cancelCharges = service_cost*(this.percentage/100);
          //$scope.dedaction_service_cost = parseFloat(response.data.result.service_remaing_cost - $scope.dedaction_amount).toFixed(2);
          //$scope.dedaction_service_cost = 0;  
         }else{
          this.cancelCharges = service_cost*(this.percentage/100);
          this.new_service_amount = this.utilized_service_cost + this.cancelCharges;
         this.final_payable_amount = (this.new_service_amount - this.paid_amount).toFixed(2);
          // $scope.service_type = response.data.result.service_type;
         }  
        
      // this.deduction_amount=servicediscountcost_one_service * (this.result / 100);
      // this.dedaction_service_cost = servicediscountcost_one_service - this.deduction_amount;
      // var number = parseFloat(this.dedaction_service_cost).toFixed(2);

      this.showConfirms(serviceId,service_cost,this.result,service_type,status,txnid,this.percentage,this.totalcostofrecurring,req_count,this.paid_amount,this.utilized_service_cost,recurring_request_id,this.cancelCharges,this.dedaction_service_cost,this.service_remaing_cost,this.final_payable_amount,package_id,sr_token); 
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
      this.deductionamount = paid_amount * this.percentage/100;
      this.servicecancelamount = paid_amount - this.deductionamount;
      this.showOnetime(serviceId,service_cost,this.result,service_type,status,txnid,this.percentage,this.payment_status,this.deductionamount,this.servicecancelamount,package_id,Paymentstatus,paid_amount,sr_token); 
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
  showConfirms(serviceId,service_cost,result,service_type,status,txnid,percentage,totalcostofrecurring,req_count,paid_amount,utilized_service_cost,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,final_payable_amount,package_id,sr_token){

       let prompt = this.alertCtrl.create({
      title: sr_token,
      // message: "Total services requests :"+ req_count +" and Total cost of the recurring : <i class='fa fa-rupee'></i>"+ totalcostofrecurring+" and Total Paid Amount : <i class='fa fa-rupee'></i>"+paid_amount+" and Cost of remaining SRs : <i class='fa fa-rupee'></i>"+paid_amount+" and Amount paid : <i class='fa fa-rupee'></i>"+utilized_service_cost+" and Refund on cancellation : <i class='fa fa-rupee'></i>"+cancelCharges+" and Refund on Cancellation : <i class='fa fa-rupee'></i>"+dedaction_service_cost+" ",
      message: "Total services requests :"+ req_count +" and Total cost of the recurring : <i class='fa fa-rupee'></i>"+ totalcostofrecurring+" and Total Paid Amount : <i class='fa fa-rupee'></i>"+paid_amount+" and Cost of remaining SRs : <i class='fa fa-rupee'></i>"+utilized_service_cost+" and service cancellation percentage : "+ percentage + "% ",

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
           this.cancelRequest(data.title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id);
          }
          }
        }
      ]
    });
    prompt.present();

    
  }
  showOnetime(serviceId,service_cost,result,service_type,status,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id,Paymentstatus,paid_amount,sr_token){
   if(percentage == "hours expired"){
      percentage = "0";
      deductionamount = "0";
      servicecancelamount = service_cost;
   }
  if(Paymentstatus == null){
        let prompt = this.alertCtrl.create({
      title: sr_token,
      message: "Service cost :  <i class='fa fa-rupee'></i>"+ service_cost +"<br> and Service cancellation percentage :"+ percentage +" % ",
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
            this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id);
          }
          }
        }
      ]
    });
    prompt.present();
  }
  else{
      let prompt = this.alertCtrl.create({
      title: sr_token,
      message: "Service cost :  <i class='fa fa-rupee'></i>"+ paid_amount +"<br> and Service cancellation percentage :"+ percentage +" % and Service cancellation deduction : <i class='fa fa-rupee'></i>"+ deductionamount+" and Service refund amount : <i class='fa fa-rupee'></i>"+ servicecancelamount+" ",
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
            this.razorPaymentResponseforCancel(data.title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id);
          }
          }
        }
      ]
    });
    prompt.present();
  }
    
     // }
     
  }
 cancelRequests(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,service_remaing_cost,final_payable_amount){
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.cancelRequests(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,service_remaing_cost,final_payable_amount).subscribe(
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
  public cancelRequest(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.cancelRequest(title,serviceId,service_type,txnid,paid_amount,utilized_service_cost,percentage,recurring_request_id,cancelCharges,dedaction_service_cost,service_remaing_cost,req_count,package_id).subscribe(
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
  public razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.serviceRequest.razorPaymentResponseforCancel(title,serviceId,service_type,txnid,percentage,payment_status,deductionamount,servicecancelamount,package_id).subscribe(
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
    this.other = '';
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
      this.other = '';
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
       var dataList=serviceRequestScroll.result.info.list.data;
        for(let data of dataList) {
          this.preferred_date = moment(data.preferred_date).format("DD-MM-YYYY");
        }
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
  viewRecurring(sr_token){
    console.log(sr_token);
    this.navCtrl.push(RecurringPagePage,{"sr_token":sr_token});
  }
}
