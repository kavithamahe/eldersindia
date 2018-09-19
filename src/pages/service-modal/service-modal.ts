import { Component  } from '@angular/core';
import { NavController,ViewController, NavParams, ModalController,AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import moment from 'moment';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';
import { GetpackagePagePage } from  '../../pages/getpackage/getpackage';
import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
import { ServiceProvider } from '../../providers/service-provider';
import { BlogListService } from '../../providers/blog-list-service';
import { PaymentPage } from '../payment/payment';

/*
  Generated class for the ServiceModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-service-modal',
  templateUrl: 'service-modal.html'
})
export class ServiceModalPage {
  emergency: any = [];
  noofpeople: number;
  lastname: any;
  elderage: any;
  elder_age :any=[];
  elder_name: any=[];
  elder_id: any;
  total_cost: any;
  peoplecount: any;
  confirmationDetail: boolean= false;
  elderDetails: any =[];
  booknownext: boolean = false;
  safeandsecurity:boolean = false;
  eldershow: boolean = false;
  label: any[];
  email: any;
  queries: any;
  vendor_id: any;
  package_active_status: any;
  phone: any;
  name: any;
  contact: boolean = false;
  booknow: boolean = false;
  safeConfirm:boolean = false;
  schedule: boolean = true;
  service_cost: string;
  schedule_cost: any;
  total_peoples:any=[];
showScheduleDetails= false;
vendorList:any;
show_service:any = null;
sub_category:any;
showContactDetails = false;
showServiceOffered = false;
showPackagesDetails = false;
showRecreationDetails = false;
dependentId:any;
title:any;
user_type:any;;
location_id:any;
peopleDataname:any =[];
peopleDataage:any =[];
availability:any;
balanceRecreationService:any;
url:any;
vendorLists:any=[];
pre_book_percentage:any;
booking_status:any;
call_sponsor:any;
sponsor_name:any;
emergencyhelp:boolean = false;
emergencyConfirm:boolean = false;
homeschedule:boolean = false;
user_id:any;
emergency_name:any=[];
emergency_mobile:any=[];
date:any;
confirmhomemodify:boolean = false;
automation_time:any;
transportdriver:boolean = false;
confirmdriver:boolean = false;
hours:any;
pickup:any;
transportcab:boolean = false;
confirmcab:any;
typeofservice:any;
weelchair:any;
drop:any;
totalcosts:any;
terms:any;
checkTerms:any= false; 
sponsor_last:any;
time:any;
altercontact:any;
recreation:any;
mobile_imei:any;
// emergency_list=[];
  constructor(public storage:Storage,public alertCtrl: AlertController,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public _provider:ServiceProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,public blogListService:BlogListService) {
    this.date = new Date().toISOString();
     
    this.vendorList = navParams.get("vendorList");
    console.log(this.vendorList);
    storage.get('name').then((name) => { this.name=name; })
    storage.get('lastname').then((lastname) => { this.lastname=lastname; })
    storage.get('elder_age').then((elder_age) => { this.elderage=elder_age; })
    storage.get('phone').then((phone) => { this.phone=phone; })
    storage.get('email').then((email) => { this.email=email; })
    storage.get('elder_mobile_imei').then((elder_mobile_imei) => { this.mobile_imei=elder_mobile_imei; })
    storage.get('sponsor_name').then((sponsor_name) => { this.sponsor_name=sponsor_name;
    console.log(this.sponsor_name); })
    storage.get('sponsor_last').then((sponsor_last) => { this.sponsor_last=sponsor_last; })
    storage.get('call_sponsor').then((call_sponsor) => { this.call_sponsor=call_sponsor; })
    storage.get('user_type').then((user_type) => { this.user_type=user_type; })
    storage.get('user_type_id').then((user_type_id) => { this.user_id=user_type_id;})
     storage.get('imageurl').then((imageurl) => { this.url=imageurl;});

  	if(navParams.get("service") == "contact"){
  		this.showContactDetails = true;	
  		this.title = this.vendorList.vendorDetails.service+" - Contact Details";
  	}
    else if(navParams.get("service") == "packages"){
      this.showPackagesDetails = true; 
      this.title = this.vendorList.vendorDetails.name+" - Best Packages"; 
      this.location_id = navParams.get("location_id");
    }
    else if(navParams.get("service") == "Schedule"){
      if(navParams.get("contact") == "1"){
        this.contact = true;
        this.booknow = false;
        this.schedule = false;
      }
      if(navParams.get("preBook") == "1"){
         this.showScheduleDetails = false;
         storage.get('user_type').then((user_type) => { this.user_type=user_type; 
     if(this.user_type == 'sponsor'){
           this.safeandsecurity = true;
           this.schedule = false;
           this.showScheduleDetails = false;
        }
       else{
        this.safeConfirm = true;
        this.schedule = false;
        this.showScheduleDetails = false;
       }
     })
      }
       if(navParams.get("emergencybook") == "1"){
          this.emergencyhelp = true;
          this.contact = false;
          this.schedule = false;
       }
         if(navParams.get("transportationdriver") == "1"){
          this.transportdriver = true;
          this.contact = false;
          this.schedule = false;
       }
        if(navParams.get("transportationcab") == "1"){
          this.transportcab = true;
          this.contact = false;
          this.schedule = false;
       }
      if(navParams.get("homemodify") == "1"){
          this.homeschedule = true;
            this.contact = false;
            this.schedule = false;
       }
       if(navParams.get("bookNow") == "1"){
         this.booknow = true;
          this.contact = false;
          this.schedule = false;
       }

      this.showScheduleDetails = true;	
      this.schedule_cost = navParams.get("schedule_cost");
      this.service_cost = navParams.get("service_cost");
      this.location_id = navParams.get("location_id");
      this.availability = navParams.get("availability");
      this.balanceRecreationService = navParams.get("balanceRecreationService");
      this.title = this.vendorList.vendorDetails.service;
      console.log("this.title" + this.title);
      this.package_active_status = this.vendorList.vendorDetails.package_active_status;
      this.pre_book_percentage = this.vendorList.requestServices.pre_book_percentage;
      this.vendor_id=navParams.get("vendor_id");
      this.booking_status = navParams.get("booking_status");
      if(navParams.get("safecategory") == "1"){
        this.showScheduleDetails = false;
         storage.get('user_type').then((user_type) => { this.user_type=user_type; 
       if(this.user_type == 'sponsor'){
           this.safeandsecurity = true;
        }
       else{
        this.safeConfirm = true;
       }
        })
       
      }
      //  if(navParams.get("safecategory") == "2"){
      //   this.showScheduleDetails = false;
      //    storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      //  if(this.user_type == 'sponsor'){
      //      this.emergencyhelp = true;
      //   }
      //   })
       
      // }
       
    }
    else if(navParams.get("service") == "recreation_service"){
        this.showRecreationDetails = true; 
      this.title = this.vendorList.vendorDetails.name+" - Recreation Services"; 
      this.location_id = navParams.get("location_id");
      this.availability = navParams.get("availability");
      this.balanceRecreationService = navParams.get("balanceRecreationService");
    }
    else{
  		this.showServiceOffered = true;
  		this.title = this.vendorList.vendorDetails.name+" - Service Offered";
  	}
    
  	
  }
 
  sendContactDetails(category_id,service_id,sub_category_id,vendor_id){
    if(this.vendorList.requestServices.category == 'Safety and security' || this.vendorList.requestServices.category == 'Recreation'){
      this.recreation = 1;
    }
    else{
      this.recreation = 0;
    }
    if(this.queries == undefined){

      this._provider.showToast("Please Enter the queries");
    }
    else{
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
             let service_data = {"data":{"category_id":category_id,"mobile":this.phone,"name":this.name,"query":this.queries,"service_id":service_id,"sub_category_id":sub_category_id,"vendor_id":vendor_id,"recreation":this.recreation}};
    this._provider.webServiceCall(`packageContactNow`,service_data)
    .subscribe(
        data =>{
                 this._provider.showToast(data.result);
                 this.navCtrl.pop();
                 loading.dismiss();
                },
        err =>{
          loading.dismiss();
          if(err.status===400)
        {
          this._provider.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this._provider.showToast("Try again later");
        }
              })
    }
   
  }
  viewDetails(schedule_cost,service_cost,location_id,availability,balanceRecreationService,vendor_id,subCategoryId,category){
      let servieListData = {"vendor_id": vendor_id, "subCategoryId": subCategoryId, "flag": 3,
       "location_id": location_id,"category_name":category};
      this._provider.webServiceCall(`getVendorDetails`,servieListData)
        .subscribe(
          data =>{
                   this.vendorLists = data.result.info;
                    let modal = this.modalCtrl.create(ServiceModalPage,{service:"Schedule",vendorList:this.vendorLists,schedule_cost:schedule_cost,service_cost:service_cost,location_id:location_id,"availability":availability,"balanceRecreationService":balanceRecreationService});    
                    modal.present();
                  },
          err =>{
                   this._provider.showErrorToast(err);
                })
    
  }
  selectPeople(people){
    this.peoplecount = people;
    this.label = [];
    for(var i=1;i<=people - 1;i++) {          
     this.label.push(i);
  }
  this.total_peoples =this.label;
  }

  addUser(): void {
    console.log(this.emergency_name);
    console.log(this.emergency.length);
      var newItemNo = this.emergency.length+1;
        this.emergency.push(newItemNo);
     }
        

    removeUser(index: number) {
     this.emergency.splice(index,1);
  }
  preBook(){
    this.showScheduleDetails = false;
     if(this.user_type == 'sponsor'){
           this.safeandsecurity = true;
        }
       else{
        this.safeConfirm = true;
       }
  }
  backcancel(){
      if(this.user_type == 'sponsor'){
     this.safeandsecurity = true;
     this.safeConfirm = false;
    }
    else{
    this.navCtrl.pop();
  }
  }
  emergencybook(){
    this.emergencyhelp = true;
    this.contact = false;
    this.schedule = false;
    if(this.emergency[0]){

    }
  }
  backemergency(){
    this.emergencyhelp = true;
    this.emergencyConfirm = false;

  }
  cancelemergency(){
    this.navCtrl.pop();
  }
  emergencyDetails(){
    console.log(this.mobile_imei);
     if(this.user_type == 'sponsor' && this.elder_id == undefined){
      this._provider.showToast("Please select the dependent");
    }


    else{
    

        let emergencyDetailsname = this.emergency_name.filter(item => item == undefined);
        console.log(emergencyDetailsname.length);
      let emergencyDetailsmobile = this.emergency_mobile.filter(item => item == undefined);
      if(emergencyDetailsname.length > 0 || emergencyDetailsmobile.length > 0){
        this._provider.showToast("Please enter all the details");
      }
         else{
         if(this.terms != undefined && this.mobile_imei != undefined){
        this.emergencyConfirm = true;
        this.emergencyhelp = false;
      }
      else{
        this._provider.showToast("Please enter all the details");
      }
  
      }
        }
     
  }
  cancelsafe(){
    this.navCtrl.pop();
  }
  sendsafe(){
     if(this.user_type == 'sponsor' && this.elder_id == undefined){
      this._provider.showToast("Please select the dependent");
    }
    else{
      if(this.terms != undefined){
        this.safeConfirm = true;
     this.safeandsecurity = false;
      }
     else{
      this._provider.showToast("Please check the terms and conditions");
     }
   }
  }
  homemodify(){
    this.homeschedule = true;
    this.contact = false;
    this.schedule = false;
  }
  cancelhomemodify(){
    this.navCtrl.pop();
  }
  homemodifynext(){
    if(this.user_type == 'sponsor'){
      if(this.elder_id != undefined && this.date != undefined && this.automation_time != undefined && this.terms != undefined){
        this.confirmhomemodify = true;
        this.homeschedule = false;
      }
      else{
       this._provider.showToast("Please Enter all the Details");
      }
    }
    else{
      if(this.date != undefined && this.automation_time != undefined && this.terms != undefined){
        this.confirmhomemodify = true;
        this.homeschedule = false;
      }
      else{
        this._provider.showToast("Please Enter all the Details");
      }
    }
    
  }
  backconfirmhome(){
    this.homeschedule = true;
    this.confirmhomemodify = false;
  }
  transportationdriver(){
    this.transportdriver = true;
    this.contact = false;
    this.schedule = false;
  }
  canceldriver(){
    this.navCtrl.pop();
  }
  drivernext(){
     if(this.user_type == 'sponsor'){
      if(this.elder_id != undefined && this.date != undefined && this.time != undefined 
        && this.hours != undefined && this.pickup != undefined){
        if(this.terms != undefined){
        this.confirmdriver = true;
        this.transportdriver = false;
      }
      else{
        this._provider.showToast("Please check the terms and conditions");
      }
      }
      else{
       this._provider.showToast("Please Enter all the Details");
      }
    }
    else{
      if(this.date != undefined && this.time != undefined && this.hours != undefined && this.pickup != undefined){
         if(this.terms != undefined){
        this.confirmdriver = true;
        this.transportdriver = false;
      }
      else{
        this._provider.showToast("Please check the terms and conditions");
      }
      }
      else{
        this._provider.showToast("Please Enter all the Details");
      }
    }
  }
  backconfirmdriver(){
    this.confirmdriver = false;
    this.transportdriver = true;
  }
  transportationcab(){
    this.transportcab = true;
    this.contact = false;
    this.schedule = false;
  }
  cancelcab(){
    this.navCtrl.pop();
  }
  cabnext(){
    if(this.user_type == 'sponsor'){
      if(this.vendorList.vendorDetails.transport_type == '2'){
         if(this.elder_id != undefined && this.date != undefined && this.time != undefined 
        && this.typeofservice != undefined && this.weelchair != undefined && this.pickup != undefined && this.drop != undefined){
          if(this.terms != undefined){
             this.confirmcab = true;
            this.transportcab = false;
          }
          else{
             this._provider.showToast("Please check the terms and conditions");
          }
       
      }
      else{
       this._provider.showToast("Please Enter all the Details");
      }
      }
      else{
         if(this.elder_id != undefined && this.date != undefined && this.time != undefined 
        && this.typeofservice != undefined && this.pickup != undefined && this.drop != undefined){
        if(this.terms != undefined){
        this.confirmcab = true;
        this.transportcab = false;
      }
       else{
             this._provider.showToast("Please check the terms and conditions");
          }
      }
      else{
       this._provider.showToast("Please Enter all the Details");
      }
      }
     
    }
    else{
      if(this.vendorList.vendorDetails.transport_type == '2'){
         if(this.date != undefined && this.time != undefined && this.typeofservice != undefined && 
        this.weelchair != undefined && this.pickup != undefined && this.drop != undefined){
        if(this.terms != undefined){
        this.confirmcab = true;
        this.transportcab = false;
      }
         else{
             this._provider.showToast("Please check the terms and conditions");
          }
      }
      else{
        this._provider.showToast("Please Enter all the Details");
      }
      }
      else{
         if(this.date != undefined && this.time != undefined && this.typeofservice != undefined && this.pickup != undefined && this.drop != undefined){
       if(this.terms != undefined){
        this.confirmcab = true;
        this.transportcab = false;
      }
       else{
             this._provider.showToast("Please check the terms and conditions");
          }
      }
      else{
        this._provider.showToast("Please Enter all the Details");
      }
      }
     
    }
  }
  backconfirmcab(){
    this.confirmcab = false;
    this.transportcab = true;
  }
  dismiss(){
	this.viewCtrl.dismiss();
  }
  cancel(){
   this.navCtrl.pop();
  }
  cancelconfirmation(){
    this.elderDetails = "";
    this.booknownext = false;
    this.booknow = true;
  }
  cancelpay(){
    this.confirmationDetail = false;
    this.booknownext = true;
  }
  cancelcontact(){
    this.navCtrl.pop();
  }
  contactNow(){
    this.contact = true;
    this.booknow = false;
    this.schedule = false;
  }
  bookNow(){
    this.booknow = true;
    this.contact = false;
    this.schedule = false;
  }
  bookDetails(){
    if(this.noofpeople == undefined){
      this._provider.showToast("Please select the number of peoples");
   }
    else{
       if(this.terms != undefined){
         if(this.balanceRecreationService == 0 || this.balanceRecreationService < this.noofpeople){
        this.showConfirm();
      }
      else{
       
          this.booknow = false;
        this.booknownext = true;
        }
      }
        else{
          this._provider.showToast("Please check the terms and conditions");
        }
     
    }
   
  }
    termsChanged(){
     if(this.terms == true){
       this.checkTerms = false;
     }else{
       this.checkTerms = true;
     }
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
   showConfirm() {
    const confirm = this.alertCtrl.create({
      title: this.title,
      message: 'The available head counts are lesser than your request count. Still do you want to book?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Next',
          handler: () => {
            this.booknow = false;
            this.booknownext = true;
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  confirmationDetails(){
    let no_people = this.noofpeople;
    if(this.noofpeople == 1 && this.user_type == 'sponsor'){
        if(this.elder_id == undefined){
      this._provider.showToast("Please Enter all the Details");
    }
    else{
        this.booknownext = false;
    this.confirmationDetail = true;
    this.totalcosts = ((this.schedule_cost) * this.noofpeople).toFixed(2);
    this.total_cost = (this.schedule_cost) * this.noofpeople;
    }
    }
    else if(this.noofpeople == 1 && this.user_type == 'elder'){
        this.booknownext = false;
    this.confirmationDetail = true;
    this.totalcosts = ((this.schedule_cost) * this.noofpeople).toFixed(2);
    this.total_cost = (this.schedule_cost) * this.noofpeople;

 }
    else{
      if(this.user_type == 'sponsor'){
            if(this.elder_id != undefined && this.elder_name.length == this.total_peoples.length && this.elder_age.length == this.total_peoples.length){
    this.booknownext = false;
    this.confirmationDetail = true;
    this.totalcosts = ((this.schedule_cost) * this.noofpeople).toFixed(2);
    this.total_cost = (this.schedule_cost) * this.noofpeople;
      
    }
    else{
       this._provider.showToast("Please Enter all the Details");
    }
      }
      else{
          if(this.elder_name.length == this.total_peoples.length && this.elder_age.length == this.total_peoples.length){
    this.booknownext = false;
    this.confirmationDetail = true;
    this.totalcosts = ((this.schedule_cost) * this.noofpeople).toFixed(2);
    this.total_cost = (this.schedule_cost) * this.noofpeople;
      
    }
    else{
       this._provider.showToast("Please Enter all the Details");
    }
      }
     
    }
   }

  getelderDetails(elderid){
    this.eldershow =true;
    let service_data = {"elder_id":elderid};
    this._provider.webServiceCall(`getElderDetails`,service_data)
    .subscribe(
        data =>{
                 this.elderDetails = data.result;
                 this.mobile_imei = this.elderDetails.mobile_imei;
                },
        err =>{
          if(err.status===400)
        {
          this._provider.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this._provider.showToast("Try again later");
        }
              })
  }

  showService(event){
    if(this.show_service==event){
        this.show_service=null;
    }
    else{
      this.show_service=event;
    }

 }

 cabpaynow(category_id,service_id,sub_category_id,category,service,subcategory,start_date){

   this.date= moment(this.date).format("DD-MM-YYYY");
   // this.time = moment(this.time).format("HH:mm");
    if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
  let paymentData = {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
  "start_date":start_date,"subcategory":subcategory,"service_id":service_id,
  "location_id":this.location_id,"discount":"","pay_method":"","paymentflag":1,"service_cost":0,
  "service_cost_travel":0,"base_cost":0,"from_date":"","problem":"",
  "datetime":this.date,"mobile":this.altercontact,"preferred_time":this.time,
  "service_name":"Own Time Cab","get_custome_service_cancel_amount":0,
  "total_cost":0,"get_custome_amount":0,"get_custome_deliever_amount":0,
  "total_service_cost":0,"package_id":"","quantity":"","dependentid":this.elder_id,
  "getCustomerBalanceAmount":0,"automation_date":this.date,
  "automation_time":this.time,"transportReqType":this.typeofservice,"weelchairType":this.weelchair,
  "transportation_from":this.pickup,"transportation_to":this.drop,"vendor_id":this.vendor_id,
  "lead_time":"00:00","selected_dates":[],"exclude_days":[],"serviceType":"One time"}
   let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayLater`,paymentData)
  .subscribe(
      data =>{
        this.blogListService.presentConfirm(data.result);
        this.dismiss();
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Try again later");
        this.navCtrl.pop();
      }
            })
 }
 driverpaynow(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
   this.date= moment(this.date).format("DD-MM-YYYY");
    if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
  let payment_cost = this.schedule_cost * this.hours;
  let paymentData = {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
  "start_date":start_date,"subcategory":subcategory,"service_id":service_id,
  "location_id":this.location_id,"discount":"","pay_method":"","paymentflag":1,"service_cost":this.schedule_cost,
  "service_cost_travel":this.schedule_cost,"base_cost":this.service_cost,"from_date":"","problem":"","datetime":this.date,
  "mobile":this.altercontact,"preferred_time":this.time,"service_name":service,
  "get_custome_service_cancel_amount":0,"total_cost":this.schedule_cost,"get_custome_amount":0,
  "get_custome_deliever_amount":0,"total_service_cost":this.schedule_cost,"package_id":"","quantity":"",
  "dependentid":this.elder_id,"getCustomerBalanceAmount":0,"automation_date":this.date,
  "automation_time":this.time,"driver_time_slot":this.hours,
  "transportation_from":this.pickup,"service_cost_cab":payment_cost,"vendor_id":this.vendor_id,
  "lead_time":"00:00","selected_dates":[],"exclude_days":[],
  "Category_name":category,"serviceType":"One time",
  "book":{"name":this.name +" "+this.lastname,"mobile":this.phone,"mail":this.email},
  "emergency":[{"name":this.name,"mobile":this.phone}],
  "paymentcost":payment_cost}
   let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayLater`,paymentData)
  .subscribe(
      data =>{
        this.blogListService.presentConfirm(data.result);
        this.dismiss();
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Try again later");
        this.navCtrl.pop();
      }
            })
  // this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security"});
  //  this.dismiss();
 }
 homeautomationpaynow(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
   this.date= moment(this.date).format("DD-MM-YYYY");
    if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
let paymentData = {"package_id":"","serviceType":"One time","service_cost":this.schedule_cost,
"service_cost_travel":this.schedule_cost,"paymentflag":"1","base_cost":this.service_cost,"vendor_id":this.vendor_id,
"location_id":this.location_id,"category_id":category_id,"sub_category_id":sub_category_id,"service_id":service_id,
"get_custome_service_cancel_amount":0,"total_cost":this.schedule_cost,"get_custome_deliever_amount":0,
"total_service_cost":this.schedule_cost,"get_custome_amount":0,"service_name":service,"businessHoursOption":this.vendorList.vendorDetails.businessHoursOption,
"businessFromDay":this.vendorList.vendorDetails.businessFromDay,"businessToDay":this.vendorList.vendorDetails.businessToDay,
"businessFromTime":this.vendorList.vendorDetails.businessFromTime,"businessToTime":this.vendorList.vendorDetails.businessToTime,
"subcategory":subcategory,"dependentid":this.elder_id,"getCustomerBalanceAmount":0,
"automation_date":this.date,"automation_time":this.automation_time,"lead_time":this.vendorList.vendorDetails.businessLeadTime,
"exclude_days":[],"Category_name":category,"category":category,
"prebook_status":this.vendorList.requestServices.booking_status,"book":{"name":this.name +" "+this.lastname,"mobile":this.phone,"mail":this.email},
"datetime":this.date,"preferred_time":this.automation_time}
 this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security"});
   this.dismiss();

}
 emergencypaynow(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
  if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
   let emergency = [];
   if(this.user_type == 'sponsor'){
    this.emergency_name[0] = this.name +" "+ this.lastname;
  this.emergency_mobile[0] = this.phone;
  var obj = {"name":this.emergency_name[0],"mobile":this.emergency_mobile[0]}
  emergency.push(obj);
   }
   else{
     this.emergency_name[0] = this.sponsor_name;
  this.emergency_mobile[0] = this.call_sponsor;
  var obj = {"name":this.emergency_name[0],"mobile":this.emergency_mobile[0]}
  emergency.push(obj);
   }
  
  for(var i=1; i< this.emergency_name.length;i++){
  var obj = {"name":this.emergency_name[i],"mobile":this.emergency_mobile[i]}
  emergency.push(obj);
}
   let paymentData =   {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
 "start_date":start_date,"subcategory":subcategory,"service_id":service_id,"location_id":this.location_id,
 "paymentflag":1,"service_cost":this.schedule_cost,"service_cost_travel":this.schedule_cost,"base_cost":this.service_cost,
 "from_date":"","problem":"","datetime":"","mobile":this.altercontact,"preferred_time":"",
 "prebook_status":this.vendorList.requestServices.booking_status,"service_cost_prebook":this.schedule_cost,"service_cost_total":this.schedule_cost,
 "prebook_percentage":this.pre_book_percentage,"service_name":service,"vendor_id":this.vendor_id,
 "get_custome_service_cancel_amount":0,"total_cost":this.schedule_cost,"get_custome_deliever_amount":0,
 "total_service_cost":this.schedule_cost,"get_custome_amount":0,"package_id":"","quantity":"",
 "dependentid":this.elder_id,"getCustomerBalanceAmount":0,"lead_time":"00:00","selected_dates":[],
 "exclude_days":[],"Category_name":category,"serviceType":"One time","mobile_imei":this.mobile_imei,
 "book":{"name":this.name,"mobile":this.phone,"mail":this.email},
 emergency,
 "paymentcost":this.schedule_cost};
   this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security"});
   this.dismiss();
}

wearablespaynow(prebook_cost,category_id,service_id,sub_category_id,category,service,subcategory,start_date){
    if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
   let paymentData =   {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
 "start_date":start_date,"subcategory":subcategory,"service_id":service_id,"location_id":this.location_id,
 "paymentflag":1,"service_cost":prebook_cost,"service_cost_travel":this.schedule_cost,"base_cost":this.service_cost,
 "from_date":"","problem":"","datetime":"","mobile":this.altercontact,"preferred_time":"",
 "prebook_status":this.vendorList.requestServices.booking_status,"service_cost_prebook":prebook_cost,"service_cost_total":this.schedule_cost,
 "prebook_percentage":this.pre_book_percentage,"service_name":service,"vendor_id":this.vendor_id,
 "get_custome_service_cancel_amount":0,"total_cost":prebook_cost,"get_custome_deliever_amount":0,
 "total_service_cost":prebook_cost,"get_custome_amount":0,"package_id":"","quantity":"",
 "dependentid":this.elder_id,"getCustomerBalanceAmount":0,"lead_time":"00:00","selected_dates":[],
 "exclude_days":[],"Category_name":category,"serviceType":"One time",
 "book":{"name":this.name,"mobile":this.phone,"mail":this.email},
 "emergency":[{"name":this.name,"mobile":this.phone}],
 "paymentcost":prebook_cost};
   this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security"});
   this.dismiss();
}
 payNow(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
  if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
 let people = [];
 for(let i=0;i<this.total_peoples.length;i++) {
  
  var obj = {"elder_name":this.elder_name[i],"elder_age":this.elder_age[i]}
  people.push(obj);
 }
 
   let paymentData =  {"package_id":"","serviceType":"One time","service_cost":this.total_cost,"service_cost_travel":this.schedule_cost,
   "paymentflag":1,"base_cost":this.service_cost,"vendor_id":this.vendor_id,"location_id":this.location_id,"category_id":category_id,
   "sub_category_id":sub_category_id,"subcategory":subcategory,"service_id":service_id,"get_custome_amount":"0","total_cost":this.schedule_cost,
   "get_custome_service_cancel_amount":"0","get_custome_deliever_amount":"0","total_service_cost":this.schedule_cost,
   "service_name":service,"dependentid":this.elder_id,"getCustomerBalanceAmount":"0","lead_time":"02:00",
   "exclude_days":[],"Category_name":category,"category":category,
   "book":{"name":this.name,"mobile":this.phone,"mail":this.email,"book_peoples":this.peoplecount,
   people},
   "datetime":start_date,"preferred_time":"01:00 AM - 02:00 AM",
   "paymentcost":this.total_cost};
   this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Recreation"});
   this.dismiss();
 }
 openRequestPackage(id,vendor_id,package_validity,package_amount,service_quantity){
  if(this.vendorList.dependentLists.length == 1){
      this.dependentId = this.vendorList.dependentLists[0].id;
    }
    let modal = this.modalCtrl.create(GetpackagePagePage,{packID:id,vendor_id:vendor_id,package_validity:package_validity,package_amount:package_amount,dependents:this.vendorList.dependentLists,"service_quantity":service_quantity});

    modal.present();
 }
  goToService(sub_service){
   let service = {id:sub_service.service_id, name:sub_service.service};
    let location_id = this.locationId;
    this.navCtrl.push(SubcategoryListPage,{location_id,service});
 }

 show_sub_category(event){
      this.show_service = false;      
    if(this.sub_category== null){
      this.sub_category = event; 
    }else{
      this.sub_category = null;
    }
  }
  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get('service_location').then((location) => { this.locationId=location;});
    });
    
  }
locationId:any;
}
