import { Component } from '@angular/core';
import { NavParams, ViewController,LoadingController,ModalController,NavController,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import {DatePicker} from 'ionic-native';
import {Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Calendar } from '@ionic-native/calendar';

import moment from 'moment';
import { ServiceProvider } from '../../providers/service-provider';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';
import { DashboardPage } from '../../pages/dashboard/dashboard';
 import { Modelpage1PagePage } from '../../pages/modelpage1/modelpage1';
 import { PaymentPage } from '../../pages/payment/payment';
 import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';

/*
  Generated class for the ModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
  providers:[TermsModalPage]
})
export class ModalContentPage {
 
  dependentLists:any=[];
  lead_time:any=[];
  userType:any;
  submitAttempt:any;
  modalForm: FormGroup;
  authForm: FormGroup;
  vendor:any="";
  dependent:string = "";
  elderId:any;
  problem:any;
  days:any;
  count:any=0;
  seviceCheck:any=0;

  terms:boolean = false;
  checkTerms:any= false;
  date:any;
  minDate:any=""; 
  maxDate:any="";
  theBigDay:any=new Date();
  //currentDate:any=new Date();
  searchButton:boolean=false;
  searchValue:any;
  recurring:boolean=false;
  searchValues:any;
  fixedd:boolean=false;
  searchValuess:any;
  timeslots:boolean=false;
  searchValuesss:any;
  fulldays:boolean=false;
  searchValuessss:any;
  onetimes:any;
  datCount:any;
  selectedDates:any=[];
  excludeDays:any=[];
  to_date:any;
  starDate:any;
  enDate:any;
  packageLists:any=[];
  packageListss:any=[];
  flag:any;
  location_id:any;
  service_id:any;
  vendor_id:any;
  recurringType:any;
  durations:any;
  name:any;
  serviceTitle:any;
  requestService:any;
  category:any;
  category_id:any;
  service:any;
  service_ids:any;
  sub_category_id:any;
  subcategory:any;
  service_cost:any;
  percentage_cost:any;
  servicecost:any;
  vendorr:any;
  getpaymentDiscount:any;
  fullpays:boolean=false;
  partialpays:boolean=false;
  getpaidPayment:any;
  getpaidPaymentinfo:any =[];
  totalservice_costs:any;
  totalservice_cost:any;
  servicecosts:any;
  paidPayment:any;
  totalservice_costss:any;
  finalcost:any;
  paymenttype:any;
  getfullpaidPayment:any;
  fullpayDiscount:any =[];
  getpaymentDiscounts:any=[];
  fullgetpaidPayment:any;
  fullpaymentdiscount:any;
  finalpaymentfull:any;
  discount:any;
  discounts:any;
  afterdiscount_one_service:any;
  servicediscountcost:any;
  servicediscountcost_one_service:any;
  discountpartial:any;
  patialdiscount:any;
  payableamount:any;
  startDate:any;
  endDate:any;
  onetimetype:any;
  get_custome_deliever_amount:any;
  get_custome_amount:any;
  get_custome_service_cancel_amount:any;
  getCustomerBalanceAmount:any;
  totalpayableamount:any;
  get_Servicedependentlist:any;
  discount_100:any;
  discountcost:any;
  dependents_id:any;
  package:any;
  checkRise_status:any;
  initialservicecost:any;
  totalpayableamountservice:any;
  totalpayableamountbalance:any;
  totalpayableamountcancel:any;
  servicetypestatus:any;
  constructor(platform: Platform,public alertCtrl: AlertController,public modalCtrl: ModalController, public navCtrl: NavController,public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {   
     this.date = new Date().toISOString();
     this.startDate = new Date().toISOString();
     this.endDate = new Date().toISOString();
     this.dependentLists = params.get("dependentList");
     this.lead_time = params.get("lead_time"); 
     this.serviceTitle = params.get("serviceTitle");
     this.location_id = params.get("location_id");

     if(params.get("serviceData") != undefined){
     this.service_id = this.params.get("serviceData").service_id;
      this.requestService=params.get("serviceData");
      console.log(this.requestService);
     this.category = this.requestService.category;
     this.category_id = this.requestService.category_id;
     this.service = this.requestService.service;
     this.service_ids = this.requestService.service_id;
     this.sub_category_id = this.requestService.sub_category_id;
     this.subcategory = this.requestService.subcategory;
     this.vendor_id = this.params.get("vendor_id");
     }

     if(params.get("vendor") != undefined){
      if(this.params.get("one_time")){
        this.onetimetype = this.params.get("one_time");
      }
      else{
        this.onetimetype = this.params.get("vendor").one_time;
      }
      if(this.params.get("recurring")){
        this.recurringType = this.params.get("recurring");
      }
      else{
        this.recurringType = this.params.get("vendor").recurring;
      }
      this.vendorr = this.params.get("vendor");
      this.vendor = this.params.get("vendor").name;
      this.service_cost = this.params.get("vendor").service_cost;
      this.percentage_cost = this.params.get("vendor").percentage_cost;
      this.initialservicecost = this.service_cost - this.percentage_cost;
      this.servicecost=this.initialservicecost;
      this.vendor_id = this.params.get("vendor").vendor_id;
      // this.recurringType = this.params.get("vendor").recurring;
      // this.onetimetype = this.params.get("vendor").one_time;
      this.name = this.params.get("vendor").name;
    }
    this.modalForm = formBuilder.group({
     problem: ['',Validators.compose([Validators.required])],
        date: ['',Validators.compose([Validators.required])],
        time: ['',Validators.compose([Validators.required])],
        contact: ['',Validators.compose([Validators.maxLength(12), Validators.pattern('[0-9]*')])],
        //dependents: ['',Validators.compose([Validators.required])]
        startdate:['',Validators.compose([Validators.required])],
        enddate:['',Validators.compose([Validators.required])],
        fromtime:['',Validators.compose([Validators.required])],
        totime:['',Validators.compose([Validators.required])],
        preferredtime:['',Validators.compose([Validators.required])],
    });
 this.authForm = formBuilder.group({
   dependents: ['',Validators.compose([Validators.required])]
 })
  
     storage.get('user_type').then((user_type) => { this.userType=user_type;});
     if(this.userType != 'sponsor'){

        storage.get('id').then((id) => { this.elderId=id;
         this.dependents_id = this.elderId});

      }
      else{
        this.dependents_id = this.authForm.value.dependents;
      }
      this.getpackageInfo();
      this.getCustomerserviceamounts();
      this.getCustomerDeliverStatusAmounts();
      this.getServicecancelamounts();
      this.getCustomerBalanceAmounts();
      this.getServicedependentlists();

   }
   
    getCustomerserviceamounts(){
        this.providerService.getCustomerserviceamount()
      .subscribe(data =>{ 
          this.get_custome_amount = data.result;
          this.totalpayableamountservice = parseInt(this.initialservicecost) + parseInt(this.get_custome_amount);
    })
    }
     getCustomerDeliverStatusAmounts(){
        this.providerService.getCustomerDeliverStatusAmount()
      .subscribe(data =>{ 
        this.get_custome_deliever_amount = data.result;
        console.log(this.get_custome_deliever_amount);
        this.totalpayableamount = parseInt(this.initialservicecost) + parseInt(this.get_custome_deliever_amount); 
        console.log(this.totalpayableamount);
    })
    }
     getServicecancelamounts(){
        this.providerService.getServicecancelamount()
      .subscribe(data =>{ 
        this.get_custome_service_cancel_amount = data.result;
        this.totalpayableamountcancel = parseInt(this.initialservicecost) + parseInt(this.get_custome_service_cancel_amount);
    })
    }
     getCustomerBalanceAmounts(){
        this.providerService.getCustomerBalanceAmount()
      .subscribe(data =>{ 
        this.getCustomerBalanceAmount = data.result;
        this.totalpayableamountbalance = parseInt(this.initialservicecost) - parseInt(this.getCustomerBalanceAmount);
      
    })
    }
    getServicedependentlists(){
      this.providerService.getServicedependentlist(this.vendor_id)
      .subscribe(data =>{ 
        this.get_Servicedependentlist = data.result;
    })
    }
   termsChanged(){
     if(this.terms == true){
       this.checkTerms = false;
     }else{
       this.checkTerms = true;
     }
   }
   onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  onetime(searchValue){
    this.recurring=false;
     this.searchButton=!searchValue;
   }
   recurringtime(searchValues){
    this.searchButton=false;
     this.recurring=!searchValues;
   }
   fullpay(full){
    this.fullpays=!full;
    this.partialpays=false;
   }
   partialpay(partialpay){
    this.partialpays=!partialpay;
    this.fullpays=false;
   }
     fixed(searchValuess){
      this.modalForm.value.preferredtime = "";
      this.durations = "";
      this.durations = "Fixed hours";
      this.timeslots=false;
       this.fulldays=false;
     this.fixedd=!searchValuess;
   }
    timeslot(searchValuesss){
      console.log(this.modalForm.value.fromtime);
      this.modalForm.value.fromtime = "";
      this.modalForm.value.totime = "";
      this.durations = "";
      this.durations = "Time slot";
      this.fixedd=false;
      this.fulldays=false;
     this.timeslots=!searchValuesss;
   }
   fullday(searchValuessss){
    this.modalForm.value.fromtime = "";
      this.modalForm.value.totime = "";
      this.modalForm.value.preferredtime = "";
     this.durations = "";
      this.durations = "Full day";
    this.timeslots=false;
     this.fixedd=false;
      this.fulldays=!searchValuessss;
   }
   fromDateChange(){
    this.selectedDates=[];
    this.excludeDays=[];
    this.to_date="";
  }

   calculateDays(sDate,eDate){
  this.starDate = moment(sDate).format("YYYY-MM-DD");
  this.enDate = moment(eDate).format("YYYY-MM-DD");  
  this.selectedDates=[];
  this.excludeDays;
  this.enDate = moment(this.enDate).add(1, 'days');
  this.enDate =moment(this.enDate).format("YYYY-MM-DD"); 
     while (moment(this.starDate).isBefore(moment(this.enDate),'day')) {
            this.starDate = moment(this.starDate);
            this.selectedDates.push(this.starDate);
            this.starDate= moment(this.starDate).add(1, 'days');   
                   
           // this.starDate = moment(this.starDate).format("YYYY-MM-DD");
          }        
      this.dayCalculation();
       if(this.searchButton == true){
        this.onetimes = "One time";
      }else{
        this.onetimes = "Recurring";
      }
          if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
         this.providerService.checkRiseAvailable(this.onetimes,this.modalForm.value.date,this.selectedDates,this.service_ids,this.dependent,this.vendor_id)
      .subscribe(data =>{ 
        this.checkRise_status=data.result;   
         if(this.checkRise_status != 0){
   let alert = this.alertCtrl.create({
        title: 'Avail Services',
        message: "You have already booked a service for "+this.serviceTitle+" on this specified date.Do you want to still proceed?",
        buttons: [
          {
            text: 'Change Date',
            role: 'cancel',
            handler: () => {
              alert =null;
            }
          },
          {
            text: 'Next',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
      }
    })
                                                                                              
  }
  dayCalculation(){
   this.days = [];
   this.count = this.selectedDates.length;    
      for(let data of this.selectedDates) {
        let date = moment(data).format('YYYY-MM-DD');

        let weekoff=moment(date).day();
           let _index= this.excludeDays.indexOf(weekoff);
             if(_index>=0 ){
                    if(this.count>0){
                    this.count=this.count-1;
                }
                
             }  
       }
     this.datCount = this.count;
     this.servicecosts=this.initialservicecost*this.count;
     this.getRecurringDiscount(this.datCount);
  }
    getpackageInfo(){

    this.providerService.packageListsInfo(this.location_id,this.service_ids,this.dependents_id,this.vendor_id)
      .subscribe(data =>{                                                                             
        this.packageLists=data.result.info.lists;
        this.flag = "1";

    },
    err =>{
         this.flag = "0";
     // this.providerService.showErrorToast(err); 
    }) 
    
   }
  getRecurringDiscount(datCount){
     this.providerService.getRecurringDiscount(datCount)
      .subscribe(data =>{ 
          this.getpaymentDiscount = data.result;
          this.discount_100 = this.getpaymentDiscount.discount_100;
          this.discountcost = this.servicecosts * this.discount_100 / 100
          this.servicecost = this.servicecosts - (this.servicecosts * this.discount_100 / 100);
          this.finalcost = this.servicecosts - (this.servicecosts * this.discount_100 / 100);
    },

    (err) => { 
     console.log(err);
    },)
  }
 
  exclude(day){
    this.fullpays=false;
    this.partialpays=false;
    this.getpaidPayment="";
    this.totalservice_cost="";
    this.finalcost="";
      this.excludeDays=[];
     this.excludeDays=day;    
    this.dayCalculation();
  }
   openTerms(){
     let termsModal = this.modalCtrl.create(TermsModalPage);
     termsModal.present();
     termsModal.onDidDismiss(data=>{
       if(data == "dismiss"){
        console.log(" Terms modal dismissed..!");
      }else{
       this.terms = JSON.parse(data);
      }
     })
   }
  
   fullpaymentinfo(){
    this.providerService.getRecurringDiscount(this.datCount)
      .subscribe(data =>{ 
          this.getpaymentDiscount = data.result;
           if(this.fullgetpaidPayment == "100"){
      this.discount = data.result.discount_100;
   }
    this.paidPayment = this.servicecosts * this.fullgetpaidPayment / 100;
    this.totalservice_costss = this.paidPayment * this.discount / 100;
    this.servicediscountcost = this.paidPayment -this.totalservice_costss;
    this.afterdiscount_one_service = this.totalservice_costss / this.datCount;
    this.servicediscountcost_one_service = this.servicediscountcost / this.datCount;
   this.finalcost =this.servicecosts - (this.servicecosts * this.discount / 100);
   
    },

    (err) => { 
     console.log(err);
    },)
   }
   paymentinfo(){
  this.providerService.getRecurringDiscount(this.datCount)
      .subscribe(data =>{ 
          this.getpaymentDiscount = data.result;
           if(this.getpaidPayment == "25"){
      this.discount = data.result.discount_25;
      this.discounts = "discount_25";
    }
    if(this.getpaidPayment == "50"){
       this.discount = data.result.discount_50;
       this.discounts = "discount_50";
    }
    if(this.getpaidPayment == "75"){
       this.discount = data.result.discount_75;
       this.discounts = "discount_75";
    }
    this.paidPayment = this.servicecosts * this.getpaidPayment / 100;
    this.patialdiscount= (this.servicecosts/this.datCount) * this.getpaidPayment / 100;
    this.discountpartial = (this.servicecosts/this.datCount) - this.patialdiscount;
    this.totalservice_costss = this.paidPayment * this.discount / 100;
    this.servicediscountcost = this.paidPayment -this.totalservice_costss;
    this.afterdiscount_one_service = this.totalservice_costss / this.datCount;
    this.servicediscountcost_one_service = this.servicediscountcost / this.datCount;
    this.finalcost =this.servicecosts - (this.servicecosts * this.discount / 100);
    this.payableamount = (this.finalcost * this.getpaidPayment / 100).toFixed(2);
    },

    (err) => { 
     console.log(err);
    },)
  

   }
 onetimeChange(){
      if(this.searchButton == true){
        this.onetimes = "One time";
      }else{
        this.onetimes = "Recurring";
      }
          if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
         this.providerService.checkRiseAvailable(this.onetimes,this.modalForm.value.date,this.selectedDates,this.service_ids,this.dependent,this.vendor_id)
      .subscribe(data =>{ 
        this.checkRise_status=data.result;   
         if(this.checkRise_status != 0){
   let alert = this.alertCtrl.create({
        title: 'Avail Services',
        message: "You have already booked a service for "+this.serviceTitle+" on this specified date.Do you want to still proceed?",
        buttons: [
          {
            text: 'Change Date',
            role: 'cancel',
            handler: () => {
              alert =null;
            }
          },
          {
            text: 'Next',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
      }
    })

   }
   packageinfo(){
    this.getCustomerBalanceAmountsSponsor();
    this.providerService.packageListsInfo(this.location_id,this.service_id,this.authForm.value.dependents,this.vendor_id)
      .subscribe(data =>{ 
        this.packageLists=data.result.info.lists;
        //this.packageLists =this.packageListss[1];
        this.flag="1";      
    },

    (err) => { 
        console.log("you can not login");
        //this.packageLists='';
        this.flag="0";
    },)
   }


    getCustomerBalanceAmountsSponsor(){
      console.log("this.totalpayableamount");
        this.providerService.getCustomerBalanceAmountsSponsor(this.authForm.value.dependents)
      .subscribe(data =>{ 
        this.getCustomerBalanceAmount = data.result;
        this.totalpayableamount = parseInt(this.initialservicecost) - parseInt(this.getCustomerBalanceAmount);
        console.log(this.totalpayableamount);
    })
    }

   pressnext(recurringType){
    this.next(recurringType);
   }
   // paynow(){

   //   if(this.fullpays == true){
   //      this.paymenttype = "full_payment";
   //    }
   //    else if(this.finalcost == undefined){
   //      this.paymenttype = "CommonRate";
   //    }
   //    else{
   //      this.paymenttype = "partial_payment";
   //    }
   //  if(this.datCount != undefined){
   //    console.log(this.payableamount);
   //   let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
   //     "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"datCount":this.datCount,"payment":this.paymenttype,"serviceTitle":this.serviceTitle, 
   //     "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,"base_cost":this.service_cost,
   //     "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    
   //  // this.navCtrl.setRoot(PaymentPage);
   //   this.navCtrl.push(PaymentPage,{serviceData:serviceData,servicecost:this.servicecost,service_costs:this.servicecosts,servicediscountcost:this.finalcost,payableamount:this.payableamount,
   //    category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
   //    sub_category_id:this.sub_category_id,subcategory:this.subcategory,
   //    location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id,discounts:this.discounts,totalservice_costss:this.totalservice_costss,afterdiscount_one_service:this.afterdiscount_one_service,
   //    paidPayment:this.paidPayment,servicediscountcost_one_service:this.servicediscountcost_one_service,discountpartial:this.discountpartial});
   //    // serviceModal.present();
   //    //   let serviceDataPay = "1";
   //    // this.viewCtrl.dismiss(serviceDataPay);
   //  //    serviceModal.onDidDismiss(data =>{
   //  //   if(data == "dismiss"){
   //  //     console.log(" schedule request modal dismissed..!");
   //  //   }else{
   //  //    this.seviceCheck = data;
   //  //   }
   //  // })
   //   }
   //   else{
   //       let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
   //     "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"serviceTitle":this.serviceTitle,"base_cost":this.service_cost,
   //     "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
   //     "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
 
   //  // this.navCtrl.setRoot(PaymentPage);
   //  this.navCtrl.push(PaymentPage,{serviceData:serviceData,servicecost:this.servicecost,
   //    category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
   //    sub_category_id:this.sub_category_id,subcategory:this.subcategory,
   //    location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id});
   //    // serviceModal.present();
   //    // let serviceDataPay = "1";
   //    // this.viewCtrl.dismiss(serviceDataPay);
   //  //    serviceModal.onDidDismiss(data =>{
   //  //   if(data == "dismiss"){
   //  //     console.log(" schedule request modal dismissed..!");
   //  //   }else{
   //  //    this.seviceCheck = data;
   //  //   }
   //  // })
   //   }

   // }
    serviceRequestCall(service_request_data){
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();

    let requestServiceData = {"category":this.category,"service":this.service,
    "category_id":this.category_id,"location_id":this.location_id,"vendor_id":this.vendor_id,
     "sub_category_id": this.sub_category_id,"datCount":this.datCount,
      "service_id":this.service_id, "problem":service_request_data.problem,
     "datetime":service_request_data.datetime,"preferred_time":service_request_data.preferred_time, "dependentid":service_request_data.dependentId,
      "mobile":service_request_data.mobile_no,"lead_time":this.lead_time,"base_cost":service_request_data.base_cost,
      "subcategory":this.subcategory, "durations":service_request_data.durations,"service_cost":service_request_data.servicecost,
       "exclude_days":service_request_data.exclude_days,"from_date":service_request_data.from_date,"from_time":service_request_data.from_time,"quantity":"",
       "selected_dates":service_request_data.selected_dates,"serviceType":service_request_data.serviceType,"time_slot":service_request_data.time_slot,"to_date":service_request_data.to_date,"to_time":service_request_data.to_time,
     "package_id":service_request_data.package_id,"instant":"","paymentflag":1,"total_service_cost":service_request_data.base_cost,"total_cost":service_request_data.base_cost,
     "servicecost":"","service_cost_travel":service_request_data.base_cost,"getCustomerBalanceAmount":"","get_custome_amount":"","get_custome_deliever_amount":"",
     "get_custome_service_cancel_amount":""}

    this.providerService.webServiceCall(`serviceRequestSubmitbeforePayLater`,requestServiceData)
       .subscribe( 
        data =>{
                 this.providerService.showToast(data.result);
                
                 this.navCtrl.setRoot(ServicerequestPage);
              
               loading.dismiss();
                },
         (err) => { 
        if(err.status===400)
        {
          this.providerService.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this.providerService.showToast("Try again later");
        }
         loading.dismiss();
      });  
  }
   next(recurringType){
    if(this.get_Servicedependentlist !=  0){
      this.providerService.showToast("You have not paid previous availed service,please pay and request new services");
      this.navCtrl.setRoot(ServicerequestPage);
    }
    else{
    console.log(this.recurring);
    let paydata = {"fullpays":this.fullpays,"finalcost":this.finalcost,"datCount":this.datCount,
    "servicecost":this.servicecost,"category":this.category,"category_id":this.category_id,"service":this.service,"service_ids":this.service_ids,
      "sub_category_id":this.sub_category_id,"subcategory":this.subcategory,
      "location_id":this.location_id,"lead_time":this.lead_time,"vendor_id":this.vendor_id,"service_costs":this.servicecosts,
      "servicediscountcost":this.finalcost,"payableamount":this.payableamount,"discounts":this.discounts,"totalservice_costss":this.totalservice_costss,"afterdiscount_one_service":this.afterdiscount_one_service,
      "paidPayment":this.paidPayment,"servicediscountcost_one_service":this.servicediscountcost_one_service,"discountpartial":this.discountpartial};
     this.modalForm.value.date= moment(this.modalForm.value.date).format("YYYY-MM-DD");
     this.modalForm.value.startdate= moment(this.modalForm.value.startdate).format("YYYY-MM-DD");
     this.modalForm.value.enddate= moment(this.modalForm.value.enddate).format("YYYY-MM-DD");
      var objFromDate = this.modalForm.value.startdate;
var objToDate = this.modalForm.value.enddate;
 
var date1 = new Date(objFromDate);
var date2 = new Date(objToDate);
console.log(date1);
console.log(date2);
 // var today = new Date();
 // console.log(today);

    if(date1 > date2)
    {
        this.providerService.showToast("Start Date should be less than End Date");
        return false; 
    }
    else{
      if(this.searchButton == true){
        this.onetimes = "One time";
      }else if(this.recurring == true){
        this.onetimes = "Recurring";
      }
     if(this.userType == 'sponsor'){
      if(this.onetimes == 'One time'){
       if(!this.authForm.valid || (this.terms == false)){
          this.submitAttempt = true;
           if(this.terms == false){
            this.checkTerms = true;
          
          }
       }
       else{
          this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
    if(this.modalForm.value.date != "" && this.modalForm.value.time !=""){

    
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package};
    
       this.providerService.validateTime(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,"base_cost":this.service_cost,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"servicecost":this.servicecost,"servicecosts":this.servicecosts,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package,"getCustomerBalanceAmount":this.getCustomerBalanceAmount,"get_custome_amount":"","get_custome_deliever_amount":this.get_custome_deliever_amount,
       "get_custome_service_cancel_amount":"","total_cost":this.servicecost,"total_service_cost":this.totalpayableamount,"servicediscountcost":this.servicecost,"discountcost":this.discountcost};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor,"paydata":paydata,"packageListsvalue":this.package,"requestService":this.requestService,"recurringType":recurringType});
      serviceModal.present();
      serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
        console.log(data);
        if(data == "paydismiss"){
          this.navCtrl.pop();
        }
       if(data != 0 && data != "paydismiss"){
          this.serviceRequestCall(data);
        }
      }
    })
       }
      }
    ); 
     
   
    }
    else{
      this.providerService.showToast("Please Select Preferred date and time");
    }
       }
     }
     else{
           if(!this.authForm.valid || (this.terms == false)){
          this.submitAttempt = true;
           if(this.terms == false){
            this.checkTerms = true;
          
          }
       }
       else{
          this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
    // console.log(this.modalForm.value.startdate);
    if(this.modalForm.value.startdate != undefined && this.modalForm.value.enddate != undefined){
     
    if(this.durations != undefined){
        if(objFromDate == objToDate && objFromDate >=  objToDate){
  this.providerService.showToast("Start Date should be less than End Date");
        return false; 
 }
 else{
      // if(this.durations == 'Fixed hours'){}
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package,"service_cost":this.servicecost,"servicecost":this.servicecosts,
       "payment":"CommonRate"};
       this.providerService.validateTimes(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory,this.datCount).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
   this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,"base_cost":this.service_cost,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"servicecost":this.servicecost,"servicecosts":this.servicecosts,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package,"getCustomerBalanceAmount":this.getCustomerBalanceAmount,"get_custome_amount":"","get_custome_deliever_amount":this.get_custome_deliever_amount,
       "get_custome_service_cancel_amount":"","total_cost":this.servicecost,"total_service_cost":this.totalpayableamount,"servicediscountcost":this.servicecost,"discountcost":this.discountcost};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor,"paydata":paydata,"packageListsvalue":this.package,"requestService":this.requestService,"recurringType":recurringType});
      serviceModal.present();
         serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
        console.log(data);
        if(data == "paydismiss"){
          this.navCtrl.pop();
        }
       if(data != 0 && data != "paydismiss"){
          this.serviceRequestCall(data);
        }
      }
    })

       }
      }); 
     }
    }
    else{
      if(this.onetimes == undefined){
        this.providerService.showToast("Please Select request type");
      }
      else{
         this.providerService.showToast("Please Select Frequency");
      }
     
    }
    }
    else{
      this.providerService.showToast("Please Select start date and end date");
    }
       }
     }
     }
else{
  if(this.onetimes == 'One time'){
    if((this.terms == false)){
      this.submitAttempt = true;
      this.providerService.showToast("Please Enter The Required Fields");
          if(this.terms == false){
            this.checkTerms = true;
          }
    }else{
      this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
      if(this.modalForm.value.date != "" && this.modalForm.value.time !=""){
       let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package};
      this.providerService.validateTime(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,"base_cost":this.service_cost,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"servicecost":this.servicecost,"servicecosts":this.servicecosts,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package,"getCustomerBalanceAmount":this.getCustomerBalanceAmount,"get_custome_amount":"","get_custome_deliever_amount":this.get_custome_deliever_amount,
       "get_custome_service_cancel_amount":"","total_cost":this.servicecost,"total_service_cost":this.totalpayableamount,"servicediscountcost":this.servicecost,"discountcost":this.discountcost};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor,"paydata":paydata,"packageListsvalue":this.package,"requestService":this.requestService,"recurringType":recurringType});
      serviceModal.present();
          serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
        console.log(data);
        if(data == "paydismiss"){
          this.navCtrl.pop();
        }
       if(data != 0 && data != "paydismiss"){
          this.serviceRequestCall(data);
        }
      }
    })

       }
      }
    ); 
     }
     else{
      this.providerService.showToast("Please Select Preferred date and time");
     }
     }
   }
   else{
       if((this.terms == false)){
      this.submitAttempt = true;
      this.providerService.showToast("Please Enter The Required Fields");
          if(this.terms == false){
            this.checkTerms = true;
          }
    }else{
      this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
      if(this.modalForm.value.startdate != undefined && this.modalForm.value.enddate != undefined){
        if(this.durations != undefined){
       let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package,"service_cost":this.servicecost,"servicecost":this.servicecosts,
       "payment":"CommonRate"};
     this.providerService.validateTimes(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory,this.datCount).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,"base_cost":this.service_cost,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"servicecost":this.servicecost,"servicecosts":this.servicecosts,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.package,"getCustomerBalanceAmount":this.getCustomerBalanceAmount,"get_custome_amount":"","get_custome_deliever_amount":this.get_custome_deliever_amount,
       "get_custome_service_cancel_amount":"","total_cost":this.servicecost,"total_service_cost":this.totalpayableamount,"servicediscountcost":this.servicecost,"discountcost":this.discountcost};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor,"paydata":paydata,"packageListsvalue":this.package,"requestService":this.requestService,"recurringType":recurringType});
      serviceModal.present();
         serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
        console.log(data);
        if(data == "paydismiss"){
          this.navCtrl.pop();
        }
        if(data != 0 && data != "paydismiss"){
          this.serviceRequestCall(data);
        }
       
      }
    })

       }
      }
    ); 
        }
      else{
      if(this.onetimes == undefined){
        this.providerService.showToast("Please Select request type");
      }
      else{
         this.providerService.showToast("Please Select Frequency");
      }
     
    }
    }
    else{
      this.providerService.showToast("Please Select start date and end date");
    }
     }
   }
 }
}
}
   }
   public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
   presssubmit(){
    this.submit();
   }

  submit() {
      if(this.searchButton == true){
        this.onetimes = "One time";
      }else{
        this.onetimes = "Recurring";
      }
     if(this.userType == 'sponsor'){
      if(this.onetimes == 'One time'){
       if(!this.authForm.valid || (this.terms == false)){
          this.submitAttempt = true;
           if(this.terms == false){
            this.checkTerms = true;
          
          }
       }
       else{
          this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
    if(this.modalForm.value.date != "" && this.modalForm.value.time !=""){

    
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"service_cost":this.servicecost,"base_cost":this.service_cost,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
   
      // this.viewCtrl.dismiss(serviceData);
    }
    else{
      this.providerService.showToast("Please Select Preferred date and time");
    }
       }
     }
     else{
      console.log(this.onetimes);
           if(!this.authForm.valid || (this.terms == false)){
          this.submitAttempt = true;
           if(this.terms == false){
            this.checkTerms = true;
          
          }
       }
       else{
          this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
    // console.log(this.modalForm.value.startdate);
    if(this.modalForm.value.startdate != undefined && this.modalForm.value.enddate != undefined){
      // console.log(this.durations);
    if(this.durations != undefined){
      // if(this.durations == 'Fixed hours'){}
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"service_cost":this.servicecost,"base_cost":this.service_cost,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
  
      // this.viewCtrl.dismiss(serviceData);
    }
    else{
      this.providerService.showToast("Please Select Service Type");
    }
    }
    else{
      this.providerService.showToast("Please Select start date and end date");
    }
       }
     }
     }
else{
  if(this.onetimes == 'One time'){
    if((this.terms == false)){
      this.submitAttempt = true;
      this.providerService.showToast("Please Enter The Required Fields");
          if(this.terms == false){
            this.checkTerms = true;
          }
    }else{
      this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
      if(this.modalForm.value.date != "" && this.modalForm.value.time !=""){
       let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"service_cost":this.servicecost,"base_cost":this.service_cost,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
   
       // this.viewCtrl.dismiss(serviceData);
     }
     else{
      this.providerService.showToast("Please Select Preferred date and time");
     }
     }
   }
   else{
       if((this.terms == false)){
      this.submitAttempt = true;
      this.providerService.showToast("Please Enter The Required Fields");
          if(this.terms == false){
            this.checkTerms = true;
          }
    }else{
      this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
      if(this.modalForm.value.startdate != undefined && this.modalForm.value.enddate != undefined){
        if(this.durations != undefined){
       let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,"service_cost":this.servicecost,"base_cost":this.service_cost,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
 
       // this.viewCtrl.dismiss(serviceData);
        }
    else{
      this.providerService.showToast("Please Select Service Type");
    }
    }
    else{
      this.providerService.showToast("Please Select start date and end date");
    }
     }
   }
 }
 }
edit(){
if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }
     let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
   
      // this.viewCtrl.dismiss(serviceData);
}
  dismiss(){
      this.navCtrl.pop();
  }
}
