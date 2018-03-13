import { Component } from '@angular/core';
import { NavParams, ViewController,LoadingController,ModalController,NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import {DatePicker} from 'ionic-native';
import {Platform} from 'ionic-angular';
// import { Calendar } from '@ionic-native/calendar';

import moment from 'moment';
import { ServiceProvider } from '../../providers/service-provider';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';
 import { Modelpage1PagePage } from '../../pages/modelpage1/modelpage1';
 import { PaymentPage } from '../../pages/payment/payment';


import { Storage } from '@ionic/storage';

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
  startDate:any;
  endDate:any;
  constructor(platform: Platform,public modalCtrl: ModalController, public navCtrl: NavController,public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {    
     this.date = new Date().toISOString();
     this.startDate = new Date().toISOString();
     this.endDate = new Date().toISOString();
     this.dependentLists = params.get("dependentList");
     //this.dependents = this.dependentLists[0].id;
     this.lead_time = params.get("lead_time"); 
     // this.service_cost = params.get("vendorservice_cost"); 
     this.serviceTitle = params.get("serviceTitle");
     this.location_id = params.get("location_id");
    
     if(params.get("serviceData") != undefined){
     this.service_id = this.params.get("serviceData").service_id;
      this.requestService=params.get("serviceData");
     this.category = this.requestService.category;
     this.category_id = this.requestService.category_id;
     this.service = this.requestService.service;
     this.service_ids = this.requestService.service_id;
     this.sub_category_id = this.requestService.sub_category_id;
     this.subcategory = this.requestService.subcategory;
     }
     if(params.get("vendor") != undefined){
      this.vendorr = this.params.get("vendor");
      console.log(this.vendorr);
      this.vendor = this.params.get("vendor").name;
      this.service_cost = this.params.get("vendor").service_cost;
      this.percentage_cost = this.params.get("vendor").percentage_cost;
      this.servicecost = this.service_cost - this.percentage_cost;
      console.log(this.servicecost);
      this.vendor_id = this.params.get("vendor").vendor_id;
      this.recurringType = this.params.get("vendor").recurring;
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

        storage.get('id').then((id) => { this.elderId=id;});
      }

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
                                                                                              
  }
  dayCalculation(){
   this.days = [];
   this.count = this.selectedDates.length;    
      for(let data of this.selectedDates) {
        let date = moment(data).format('YYYY-MM-DD');

        let weekoff=moment(date).day();
           // console.log(date);
           // console.log(weekoff);
           // console.log(this.excludeDays);
           let _index= this.excludeDays.indexOf(weekoff);
             if(_index>=0 ){
                    if(this.count>0){
                    this.count=this.count-1;
                }
                
             }  
       }
     this.datCount = this.count;
  }
 
  exclude(day){
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
   packageinfo(){
    
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
   pressnext(){
    this.next();
   }
   paynow(){
     let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    // this.navCtrl.setRoot(PaymentPage);
    let serviceModal = this.modalCtrl.create(PaymentPage,{serviceData:serviceData,servicecost:this.servicecost,
      category:this.category,category_id:this.category_id,service:this.service,service_ids:this.service_ids,
      sub_category_id:this.sub_category_id,subcategory:this.subcategory,
      location_id:this.location_id,lead_time:this.lead_time,vendor_id:this.vendor_id});
      serviceModal.present();
       serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.seviceCheck = data;
      }
    })

   }
   next(){
     this.modalForm.value.date= moment(this.modalForm.value.date).format("YYYY-MM-DD");
      var objFromDate = this.modalForm.value.startdate;
var objToDate = this.modalForm.value.enddate;
 
var date1 = new Date(objFromDate);
var date2 = new Date(objToDate);
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
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    
       this.providerService.validateTime(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor});
      serviceModal.present();
         serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.seviceCheck = data;
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
      // console.log(this.durations);
    if(this.durations != undefined){
      // if(this.durations == 'Fixed hours'){}
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
       this.providerService.validateTimes(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory,this.datCount).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor});
      serviceModal.present();
         serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.seviceCheck = data;
      }
    })
       }
      }
    ); 
    }
    else{
      this.providerService.showToast("Please Select Frequency");
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
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
      this.providerService.validateTime(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor});
      serviceModal.present();
         serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.seviceCheck = data;
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
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
     this.providerService.validateTimes(serviceData,this.location_id,this.lead_time,this.vendor_id,this.category,this.category_id,this.service,this.service_ids,this.sub_category_id,this.subcategory,this.datCount).subscribe(
     (viewServiceRequest) => {

    },
    (err) => { 
        if(err.status===401)
        {
        this.providerService.showToast(JSON.parse(err._body).error);
        }
       else{
         let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
    
         let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceData,"name":this.name,"serviceTitle":this.serviceTitle,vendor:this.vendor});
      serviceModal.present();
         serviceModal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.seviceCheck = data;
      }
    })
       }
      }
    ); 
        }
    else{
      this.providerService.showToast("Please Select Frequency");
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
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
   
      this.viewCtrl.dismiss(serviceData);
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
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":this.durations,
       "exclude_days":this.excludeDays,"from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":this.selectedDates,
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
  
      this.viewCtrl.dismiss(serviceData);
    }
    else{
      this.providerService.showToast("Please Select Frequency");
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
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
   
       this.viewCtrl.dismiss(serviceData);
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
       "serviceType":this.onetimes,"datCount":this.datCount,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
 
       this.viewCtrl.dismiss(serviceData);
        }
    else{
      this.providerService.showToast("Please Select Frequency");
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
   
      this.viewCtrl.dismiss(serviceData);
}
  dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }
}
