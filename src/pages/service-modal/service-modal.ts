import { Component  } from '@angular/core';
import { NavController,ViewController, NavParams, ModalController,AlertController,LoadingController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from 'ionic-native';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Device } from "@ionic-native/device";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import moment from 'moment';
import { GetpackagePagePage } from  '../../pages/getpackage/getpackage';
import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
import { ServiceProvider } from '../../providers/service-provider';
import { BlogListService } from '../../providers/blog-list-service';
import { PaymentPage } from '../payment/payment';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';

declare var RazorpayCheckout: any;

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
   headers;
token:string;
options:any;
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
// mobile_imei:any;
template_id:any;
  totalpayableamountservice:any;
  totalpayableamountbalance:any;
  totalpayableamountcancel:any;
  totalpayableamounts:any;
  get_custome_deliever_amount:any;
  get_custome_amount:any;
  get_custome_service_cancel_amount:any;
  getCustomerBalanceAmount:any;
  totalpayableamount:any;
  get_Servicedependentlist:any;
  servicecost:any;
  package_availability:any;
  id:any;
  rootUrl:any;
  udf3:any;
  udf2:any;
  service_costss:any;
  coupan_code:any;
  coupon_id:any;
  discounted_cost:any;
  final_service_cost:any;
  coupandiscount:any;
  gender:any;
  elderDetailsname:any;
  elderDetailsage:any;
  elderDetailslastname:any;
  wallet_value:any;
  booknowtours:boolean=false;
  hoteltype:any;
  payingtax:any;
  getHotelCost:any;
  people_count:any;
  getHotelType:any=[];
  getPersonPerHotel:any=[];
  tourslabel:any=[];
  tourstotal_peoples:any=[];
  booknownexttours:boolean = false;
  noofpeopletravel:any;
  confirmationDetailtours:boolean =false;
  tourstotal:any=[];
  packageCost:boolean = false;
  scheduled_date:any;
  discount_rate:any;
  getHotelCosts:any;
  getvendor_cancelpolicy:any=[];
  CurrentTime:any;
  CurrentDate:any;
  tourService_id:any;
  start_date:any;
  imageUrl:any;
  razorkey:any;
  bookNowToursmore:any;
  constructor(public platform: Platform,public storage:Storage,public alertCtrl: AlertController,private device: Device,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public _provider:ServiceProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,public blogListService:BlogListService) {
    this.date = new Date().toISOString();
    this.CurrentDate = new Date().toISOString(); 
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    this.vendorList = navParams.get("vendorList");
    console.log(this.vendorList);
    this.template_id = navParams.get("template_id");
    this.tourService_id = navParams.get("tourService_id");
    this.start_date = moment(navParams.get("start_date")).format("DD-MM-YYYY");
    this.discount_rate = navParams.get("discount_rate");
    this.bookNowToursmore = navParams.get("bookNowToursmore");
    this.storage.ready().then(() => {
      storage.get('token').then((token) => { this.token=token;
        storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      localStorage.setItem('key', this.token);
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + this.token);
      this.options = new RequestOptions({ headers: this.headers });
         })    
      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
        localStorage.setItem('rootUrl', this.rootUrl);
            });
       storage.get('id').then((id) => { this.id=id; })
     });
    storage.get('name').then((name) => { this.name=name; })
    storage.get('lastname').then((lastname) => { this.lastname=lastname; })
    storage.get('elder_age').then((elder_age) => { this.elderage=elder_age; })
    storage.get('phone').then((phone) => { this.phone=phone; })
    storage.get('email').then((email) => { this.email=email; })
    // storage.get('elder_mobile_imei').then((elder_mobile_imei) => { this.mobile_imei=elder_mobile_imei; })
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
        if(navParams.get("bookNowTours") == "1"){
         this.booknowtours = true;
          this.contact = false;
          this.schedule = false;
          this.hotelType();
          if(this.bookNowToursmore == "1"){
          storage.get('getHotelType').then((getHotelType) => { this.getHotelType=getHotelType;
            storage.get('hoteltype').then((hoteltype) => { this.hoteltype=hoteltype;})
              storage.get('payingtax').then((payingtax) => { this.payingtax=payingtax;})
              storage.get('people_count').then((people_count) => { this.people_count=people_count;})
              storage.get('getHotelCost').then((getHotelCost) => { this.getHotelCost=getHotelCost;
                storage.get('getHotelCosts').then((getHotelCosts) => { this.getHotelCosts=getHotelCosts;
                if(this.getHotelCost){
                  this.packageCost = true;
                }})
          storage.get('getPersonPerHotel').then((getPersonPerHotel) => { this.getPersonPerHotel=getPersonPerHotel;
          storage.get('tourstotal_peoples').then((tourstotal_peoples) => { this.tourstotal_peoples=tourstotal_peoples;})
          });
          });
            });
        }
       }

      this.showScheduleDetails = true;	
      this.schedule_cost = navParams.get("schedule_cost");
      this.service_cost = navParams.get("service_cost");
      this.location_id = navParams.get("location_id");
      this.availability = navParams.get("availability");
      this.balanceRecreationService = navParams.get("balanceRecreationService");
      this.title = this.vendorList.vendorDetails.service;
      this.package_active_status = this.vendorList.vendorDetails.package_active_status;
      this.scheduled_date = moment(this.vendorList.requestServices.start_date).format("DD-MM-YYYY");
      this.pre_book_percentage = this.vendorList.requestServices.pre_book_percentage;
      this.vendor_id=navParams.get("vendor_id");
      this.booking_status = navParams.get("booking_status");
      console.log(this.booking_status);
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
    
  	  this.getCustomerserviceamounts();
      this.getCustomerDeliverStatusAmounts();
      this.getServicecancelamounts();
      this.getCustomerBalanceAmounts();
      this.getServicedependentlists();
      this.getCancelpolicyByVendor();
      this.getRazorPaymentsaltKey();
  }
getRazorPaymentsaltKey(){
      let loader = this.loadingCtrl.create({content: 'Please wait...!'});
      loader.present();
  this._provider.webServiceCall(`getRazorPaymentsaltKey`,"")
  .subscribe(
      data =>{
        this.razorkey= data.result.test_key;
        loader.dismiss();
              },
      err =>{
        loader.dismiss();
     
            })
}
  hotelType(){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this._provider.gethotelType(this.tourService_id)
      .subscribe(data =>{ 
          this.getHotelType = data.result.getHotelType;
          console.log(this.getHotelType);
          loader.dismiss();
    })
  }
  selecthotel(hoteltype){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this._provider.getselecthotel(hoteltype,this.tourService_id)
      .subscribe(data =>{ 
          this.getPersonPerHotel = data.result.getHotelPersons;
          loader.dismiss();
    })
  }
   payingTax(payingTax){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.packageCost = true;
     this._provider.getpayingTax(payingTax,this.hoteltype,this.tourService_id)
      .subscribe(data =>{ 
          this.getHotelCosts = data.result.getHotelCost;
          this.getHotelCost = (this.getHotelCosts - (this.getHotelCosts * (this.discount_rate/100)));
          this.people_count = data.result.people_count;
            this.tourslabel = [];
    for(var i=1;i<=this.people_count - 1;i++) {          
     this.tourslabel.push(i);
  }
  this.tourstotal_peoples =this.tourslabel;
  loader.dismiss();
    })
  }
   selecetPeopleTours(people){
    this.tourslabel = [];
    for(var i=1;i<= people -1;i++) {          
     this.tourslabel.push(i);
  }
  this.tourstotal = this.tourslabel;
  }
   canceltours(){
   this.navCtrl.pop();
  }
  bookDetailsTours(){
    if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
   if(this.hoteltype == undefined && this.payingtax == undefined){
      this._provider.showToast("Please select the details");
   }
    else{
       if(this.terms != undefined){
          this.booknowtours = false;
        this.booknownexttours = true;
      }
        else{
          this._provider.showToast("Please check the terms and conditions");
        }  
    }
    }
 
   
  }

  cancelconfirmationtravel(){
     this.booknowtours = true;
     this.booknownexttours = false;
  }
   confirmationDetailstravel(){
    this.elderDetailsname = localStorage.getItem("elderDetailsname");
    this.elderDetailsage = localStorage.getItem("elderDetailsage");
    this.elderDetailslastname = localStorage.getItem("elderDetailslastname");
    let no_people = this.people_count;
    if(this.people_count == 1 && this.user_type == 'sponsor'){
        if(this.elder_id == undefined){
      this._provider.showToast("Please Enter all the Details");
    }
    else{
        this.booknownexttours = false;
    this.confirmationDetailtours = true;
    }
    }
    else if(this.people_count == 1 && this.user_type == 'elder'){
        this.booknownexttours = false;
    this.confirmationDetailtours = true;

 }
    else{
      if(this.user_type == 'sponsor'){
            if(this.elder_id != undefined && this.elder_name.length == this.tourstotal_peoples.length && this.elder_age.length == this.tourstotal_peoples.length){
    this.booknownexttours = false;
    this.confirmationDetailtours = true;
      
    }
    else{
       this._provider.showToast("Please Enter all the Details");
    }
      }
      else{
          if(this.elder_name.length == this.tourstotal_peoples.length && this.elder_age.length == this.tourstotal_peoples.length){
    this.booknownexttours = false;
    this.confirmationDetailtours = true;
      
    }
    else{
       this._provider.showToast("Please Enter all the Details");
    }
      }
     
    }
   }
    cancelpaytours(){
    this.confirmationDetailtours = false;
    this.booknownexttours = true;
  }
  payNowTours(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
 
     if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
 let people = [];
 for(let i=0;i< this.people_count - 1;i++) {
  var obj = {"elder_name":this.elder_name[i],"elder_age":this.elder_age[i]}
  people.push(obj);
 } 
    if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.getHotelCost - this.getCustomerBalanceAmount);
      if(this.coupandiscount == "1"){
        this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = ((this.getHotelCost - this.getCustomerBalanceAmount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
       
    }
   
    else if(this.get_custome_deliever_amount!=0 && this.get_custome_service_cancel_amount ==0 && this.getCustomerBalanceAmount ==0){
      this.servicecost = (this.getHotelCost + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
      this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.getHotelCost + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.getHotelCost + this.get_custome_service_cancel_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.getHotelCost + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.getHotelCost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
        if(this.coupandiscount == "1"){
          this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.getHotelCost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.getHotelCost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
        if(this.coupandiscount == "1"){
          this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.getHotelCost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.getHotelCost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = (((this.getHotelCost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.getHotelCost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
        if(this.coupandiscount == "1"){
          this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (((this.getHotelCost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    else{
      this.servicecost = this.getHotelCost;
       if(this.coupandiscount == "1"){
        this.service_costss = (((this.getHotelCost) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (this.getHotelCost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }

    let paymentData =  {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
    "start_date":this.start_date,"subcategory":subcategory,"service_id":service_id,
    "location_id":this.location_id,"vendor_id":this.vendor_id,"discount":"","pay_method":"","coupon_code_discount_cost":this.discounted_cost,
    "final_service_cost_after_coupon_code_discount":this.final_service_cost,"wallet_value":this.wallet_value,"coupon_id":this.coupon_id,
    "service_name":service,"paymentflag":1,"service_cost":0,"corporateDiscount":this.discount_rate,"getPersonHotelCost":this.getHotelCost,"getPersonHotelCostTotal":this.getHotelCosts,
    "service_cost_travel":0,"base_cost":0,"from_date":"","to_date":"","time_slot":"",
    "from_time":"","to_time":"","durations":"","problem":"","datetime":this.start_date,
    "mobile":"","preferred_time":"01:00 AM - 02:00 AM","package_id":"","quantity":"",
    "getCustomerBalanceAmount":0,"get_custome_amount_actual":0,"get_custome_amount":0,
    "total_cost":0,"get_custome_deliever_amount":0,"total_service_cost":0,
    "get_custome_service_cancel_amount":0,"driver_time_slot":"","transportation_from":"",
    "transportation_to":"","automation_time":"","automation_date":"","transportReqType":"",
    "weelchairType":"","mobile_imei":"","coupen_code":this.coupan_code,"dependentid":this.elder_id,
    "gender":"1","lead_time":this.vendorList.vendorDetails.businessLeadTime,"selected_dates":[],"exclude_days":[],"Category_name":category,
    "serviceType":"One time","book":{"name":this.name,"mobile":this.phone,"mail":this.email,"book_peoples":this.people_count,
    "book_paying_pax":this.payingtax,"hotelType":this.hoteltype,people},"total_peoples":this.people_count}


       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,paymentData)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        // loading.dismiss();
        var options = {
      description: service,
      image: this.url + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: this.name
      },
      
       "notes": {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":"",
        "category_name":category,
        "service_name":service,
        "service_cost":this.schedule_cost,
        "pre_book":this.schedule_cost
      },
      theme: {
        color: '#208ad6'
      },

    };
let navCtrl = this.navCtrl;
let nav = this.blogListService;
if(this.coupon_id == undefined || this.coupon_id == ""){
 var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);

  nav.presentConfirm(result);

  }
    }
}
else{
   var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss"),
  "coupon_id":localStorage.getItem("coupon_id"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
  var error = users.error;
 var result=users.result;

  // navCtrl.setRoot(ServicerequestPage);
  if(result){
     nav.presentConfirm(result);
  }
   if(error){
     nav.presentConfirm(error);
  }


  }
    }
}
var cancelCallback = function(error) {
  nav.showToaster(error.description);
  loading.dismiss();
}
RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Something went wrong");
        // this.navCtrl.pop();
      }
            })
   this.dismiss();
  }
     getCustomerserviceamounts(){
        this._provider.getCustomerserviceamount()
      .subscribe(data =>{ 
          this.get_custome_amount = parseFloat(data.result);
    })
    }
     getCustomerDeliverStatusAmounts(){
        this._provider.getCustomerDeliverStatusAmount()
      .subscribe(data =>{ 
        this.get_custome_deliever_amount = parseFloat(data.result);
       
    })
    }
     getServicecancelamounts(){
        this._provider.getServicecancelamount()
      .subscribe(data =>{ 
        this.get_custome_service_cancel_amount = parseFloat(data.result);
    })
    }
     getCustomerBalanceAmounts(){
        this._provider.getCustomerBalanceAmount()
      .subscribe(data =>{ 
        this.getCustomerBalanceAmount = parseFloat(data.result);
     })
    }
    getServicedependentlists(){
      this._provider.getServicedependentlist(this.vendor_id)
      .subscribe(data =>{ 
        this.get_Servicedependentlist = data.result;
    })
    }
        getCancelpolicyByVendor(){
          console.log(this.vendor_id);
          this._provider.getCancelpolicyByVendor(this.vendor_id)
      .subscribe(data =>{ 
        this.getvendor_cancelpolicy = data.result.conditionsLink;
    })
    }
     applyCoupan(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
    if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
   
   if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost - this.getCustomerBalanceAmount);
        }
   
    else if(this.get_custome_deliever_amount!=0 && this.get_custome_service_cancel_amount ==0 && this.getCustomerBalanceAmount ==0){
      this.servicecost = (this.total_cost + this.get_custome_deliever_amount);
      }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount);
      }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
        }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
        }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       }
    else{
      this.servicecost = this.schedule_cost;
         }
   let payment_data=  {"info":{"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
    "start_date":start_date,"subcategory":subcategory,"service_id":service_id,
    "location_id":this.location_id,"vendor_id":this.vendor_id,"discount":"","pay_method":"",
    "coupon_code_discount_cost":0,"final_service_cost_after_coupon_code_discount":0,"corporateDiscount":this.discount_rate,
    "service_name":service,"paymentflag":1,"service_cost":this.servicecost,"getPersonHotelCost":this.getHotelCost,"getPersonHotelCostTotal":this.getHotelCosts,
    "service_cost_travel":this.servicecost,"base_cost":this.service_cost,"from_date":"","to_date":"",
    "time_slot":"","from_time":"","to_time":"","durations":"","problem":"",
    "datetime":"","mobile":"","preferred_time":"","package_id":"","quantity":"","prebook_percentage":this.pre_book_percentage,"prebook_status":this.vendorList.requestServices.booking_status,
    "getCustomerBalanceAmount":0,"get_custome_amount_actual":0,"get_custome_amount":0,
    "total_cost":this.servicecost,"get_custome_deliever_amount":0,"total_service_cost":this.servicecost,
    "get_custome_service_cancel_amount":0,"dependentid":this.elder_id,"mobile_imei":"",
    "gender":this.gender,"coupen_code":this.coupan_code,"type":"service","coupon_id":"",
    "driver_time_slot":"","transportation_from":"","transportation_to":"",
    "automation_time":"","automation_date":"","transportReqType":"","weelchairType":""}}

      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`checkCoupenCodeValidity`,payment_data)
  .subscribe(
      data =>{
        this.coupon_id = data.result.coupon_id;
        localStorage.setItem('coupon_id', this.coupon_id);
        this.discounted_cost = data.result.discounted_cost;
        localStorage.setItem('coupon_offer', this.discounted_cost);
        this.final_service_cost = data.result.final_service_cost;
        this.wallet_value = data.result.wallet_value;
        localStorage.setItem('wallet_value', this.wallet_value);
        this.coupandiscount = "1";
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this._provider.showToast("Something went wrong");
      }
            })
  }

 applyCoupans(prebook_cost,category_id,service_id,sub_category_id,category,service,subcategory,start_date){
  
    if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
    if(this.booking_status != '1' && this.vendorList.requestServices.booking_status != '0'){
     this.total_cost = prebook_cost;
  }
  else{
     this.total_cost = this.total_cost;
   }
   if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost - this.getCustomerBalanceAmount);
        }
   
    else if(this.get_custome_deliever_amount!=0 && this.get_custome_service_cancel_amount ==0 && this.getCustomerBalanceAmount ==0){
      this.servicecost = (this.total_cost + this.get_custome_deliever_amount);
      }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount);
      }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
        }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
        }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       }
    else{
      this.servicecost = this.schedule_cost;
         }
         
   let payment_data=  {"info":{"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
    "start_date":start_date,"subcategory":subcategory,"service_id":service_id,
    "location_id":this.location_id,"vendor_id":this.vendor_id,"discount":"","pay_method":"","corporateDiscount":this.discount_rate,
    "coupon_code_discount_cost":0,"final_service_cost_after_coupon_code_discount":0,
    "service_name":service,"paymentflag":1,"service_cost":prebook_cost,
    "service_cost_travel":this.servicecost,"base_cost":this.service_cost,"from_date":"","to_date":"",
    "time_slot":"","from_time":"","to_time":"","durations":"","problem":"",
    "datetime":"","mobile":"","preferred_time":"","package_id":"","quantity":"","prebook_percentage":this.pre_book_percentage,
    "prebook_status":this.vendorList.requestServices.booking_status,"service_cost_prebook":prebook_cost,
    "getCustomerBalanceAmount":0,"get_custome_amount_actual":0,"get_custome_amount":0,
    "total_cost":prebook_cost,"get_custome_deliever_amount":0,"total_service_cost":prebook_cost,
    "get_custome_service_cancel_amount":0,"dependentid":this.elder_id,"mobile_imei":"",
    "gender":this.gender,"coupen_code":this.coupan_code,"type":"service","coupon_id":"",
    "driver_time_slot":"","transportation_from":"","transportation_to":"",
    "automation_time":"","automation_date":"","transportReqType":"","weelchairType":""}}

      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`checkCoupenCodeValidity`,payment_data)
  .subscribe(
      data =>{
        this.coupon_id = data.result.coupon_id;
        localStorage.setItem('coupon_id', this.coupon_id);
        this.discounted_cost = data.result.discounted_cost;
        localStorage.setItem('coupon_offer', this.discounted_cost);
        this.final_service_cost = data.result.final_service_cost;
        this.wallet_value = data.result.wallet_value;
        localStorage.setItem('wallet_value', this.wallet_value);
        this.coupandiscount = "1";
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this.coupon_id = "";
        this.discounted_cost = "";
        this.final_service_cost = "";
        this.coupandiscount = "0";
        this.coupan_code = "";
        this._provider.showToast("Something went wrong");
      }
            })
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
          this._provider.showToast("Something went wrong");
        }
              })
    }
   
  }
  viewDetails(schedule_cost,service_cost,location_id,availability,balanceRecreationService,vendor_id,subCategoryId,category){
      let servieListData = {"vendor_id": vendor_id, "subCategoryId": subCategoryId, "flag": 3,
       "location_id": location_id,"category_name":category,"template_id":this.vendorList.template_id,"is_recreation_config":this.vendorList.template_id};
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
       if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
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
         if(this.terms != undefined){
        this.emergencyConfirm = true;
        this.emergencyhelp = false;
      }
      else{
        this._provider.showToast("Please enter all the details");
      }
  
      }
        }
     }
  }
  cancelsafe(){
    this.navCtrl.pop();
  }
  sendsafe(){
      if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
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
      if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
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
      if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
    if(this.date == this.CurrentDate && this.time <= this.CurrentTime){
      this._provider.showToast("Please choose valid date and time");
    }
    else{
     if(this.user_type == 'sponsor'){
      if(this.elder_id != undefined && this.elder_id != "" && this.date != undefined && this.date != "" && this.time != undefined && this.time != "" && this.hours != undefined && this.hours != "" && this.pickup != undefined && this.pickup != ""){
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
      if(this.date != undefined && this.date != "" && this.time != undefined && this.time != "" && this.hours != undefined && this.hours != "" && this.pickup != undefined && this.pickup != ""){
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
     if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
    if(this.date == this.CurrentDate && this.time <= this.CurrentTime){
      this._provider.showToast("Please choose valid date and time");
    }
    else{
    if(this.user_type == 'sponsor'){
      if(this.vendorList.vendorDetails.transport_type == '2'){
         if(this.elder_id != undefined && this.elder_id != "" && this.date != undefined && this.date != "" && this.time != undefined && this.time != ""
        && this.typeofservice != undefined && this.typeofservice != "" && this.weelchair != undefined && this.weelchair != "" && this.pickup != undefined && this.pickup != "" && this.drop != undefined 
        && this.drop != ""){
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
         if(this.elder_id != undefined && this.elder_id != "" && this.date != undefined && this.date != "" && this.time != undefined && this.time != ""
        && this.typeofservice != undefined && this.typeofservice != "" && this.pickup != undefined && this.pickup != "" && this.drop != undefined 
        && this.drop != ""){
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
         if(this.date != undefined && this.date != "" && this.time != undefined && this.time != ""
        && this.typeofservice != undefined && this.typeofservice != "" && this.weelchair != undefined && this.weelchair != "" && this.pickup != undefined && this.pickup != "" && this.drop != undefined 
        && this.drop != ""){
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
         if(this.date != undefined && this.date != "" && this.time != undefined && this.time != ""
        && this.typeofservice != undefined && this.typeofservice != "" && this.pickup != undefined && this.pickup != "" && this.drop != undefined 
        && this.drop != ""){
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
     if(this.get_Servicedependentlist !=  0){
      this._provider.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
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
   
  }
    termsChanged(){
     if(this.terms == true){
       this.checkTerms = false;
     }else{
       this.checkTerms = true;
     }
   }
  openTerms(){
     this.navCtrl.push(TermsModalPage,{"vendor_id":this.vendor_id,"terms_and_condition_length":this.vendorList.vendorDetails.terms_and_condition_length,
      "terms_and_condition":this.vendorList.vendorDetails.terms_and_condition})
     // this.platform.ready().then(() => {
     //  if(this.vendorList.vendorDetails.terms_and_condition_length > 1){
     //     let browser = new InAppBrowser(this.imageUrl + "#/termsandconditionForVendor/" + this.vendor_id,'_blank');
     //  }
     //  else if(this.vendorList.vendorDetails.terms_and_condition_length=='' || this.vendorList.vendorDetails.terms_and_condition_length < 1){
     //     let browser = new InAppBrowser(this.imageUrl + "#/termsandcondition",'_blank');
     //  }
     //    });
      
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
    this.elderDetailsname = localStorage.getItem("elderDetailsname");
    this.elderDetailsage = localStorage.getItem("elderDetailsage");
    this.elderDetailslastname = localStorage.getItem("elderDetailslastname");
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
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
    this.eldershow =true;
    let service_data = {"elder_id":elderid};
    this._provider.webServiceCall(`getElderDetails`,service_data)
    .subscribe(
        data =>{
                 this.elderDetails = data.result;
                 this.elderDetailsname = this.elderDetails.name;
                 this.elderDetailsage = this.elderDetails.age;
                 this.elderDetailslastname = this.elderDetails.last_name;
                 localStorage.setItem('elderDetailsname', this.elderDetailsname);
                 localStorage.setItem('elderDetailsage', this.elderDetailsage);
                 localStorage.setItem('elderDetailslastname', this.elderDetailslastname);
                 this.gender = this.elderDetails.gender;
                 loading.dismiss();
                 // this.mobile_imei = this.elderDetails.mobile_imei;
                },
        err =>{
          loading.dismiss();
          if(err.status===400)
        {
          this._provider.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this._provider.showToast("Something went wrong");
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
  "service_name":service,"get_custome_service_cancel_amount":0,
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
        this._provider.showToast("Something went wrong");
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
        this._provider.showToast("Something went wrong");
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
   if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost - this.getCustomerBalanceAmount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost - this.getCustomerBalanceAmount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
    else if(this.get_custome_deliever_amount!=0 && this.get_custome_service_cancel_amount ==0 && this.getCustomerBalanceAmount ==0){
      this.servicecost = (this.total_cost + this.get_custome_deliever_amount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    else{
      this.servicecost = this.schedule_cost;
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (this.schedule_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
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
"exclude_days":[],"Category_name":category,"category":category,"coupen_code":this.coupan_code,"coupon_code_discount_cost":this.discounted_cost,"type":"service",
  "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"final_service_cost_after_coupon_code_discount":this.final_service_cost,
"prebook_status":this.vendorList.requestServices.booking_status,"book":{"name":this.name +" "+this.lastname,"mobile":this.phone,"mail":this.email},
"datetime":this.date,"preferred_time":this.automation_time}
 // this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security","template_id":this.template_id});
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,paymentData)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        // loading.dismiss();
        var options = {
      description: service,
      image: this.url + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: this.name
      },
      
       "notes": {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":"",
        "category_name":category,
        "service_name":service,
        "service_cost":this.schedule_cost,
        "pre_book":this.schedule_cost
      },
      theme: {
        color: '#208ad6'
      },

    };
let navCtrl = this.navCtrl;
let nav = this.blogListService;
if(this.coupon_id == undefined || this.coupon_id == ""){
 var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);

  nav.presentConfirm(result);

  }
      
    }
    }
else{
   var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss"),
"coupon_id":localStorage.getItem("coupon_id"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
  var error = users.error;
 var result=users.result;

  // navCtrl.setRoot(ServicerequestPage);
  if(result){
     nav.presentConfirm(result);
  }
   if(error){
     nav.presentConfirm(error);
  }

  }
      
    }
}
var cancelCallback = function(error) {
  nav.showToaster(error.description);
  loading.dismiss();
}


RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Something went wrong");
        // this.navCtrl.pop();
      }
            })
   this.dismiss();

}
 submitRequesthomeautomation(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
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
"exclude_days":[],"Category_name":category,"category":category,"coupen_code":this.coupan_code,"coupon_code_discount_cost":this.discounted_cost,"type":"service",
  "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"final_service_cost_after_coupon_code_discount":this.final_service_cost,
"prebook_status":this.vendorList.requestServices.booking_status,"book":{"name":this.name +" "+this.lastname,"mobile":this.phone,"mail":this.email},
"datetime":this.date,"preferred_time":this.automation_time}

 
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayLater`,paymentData)
  .subscribe(
      data =>{
        this._provider.showToast(data.result);
        this.dismiss();
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this._provider.showToast("Something went wrong");
      }
            })
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
 if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost - this.getCustomerBalanceAmount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost - this.getCustomerBalanceAmount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
    else if(this.get_custome_deliever_amount!=0 && this.get_custome_service_cancel_amount ==0 && this.getCustomerBalanceAmount ==0){
      this.servicecost = (this.total_cost + this.get_custome_deliever_amount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    else{
      this.servicecost = this.schedule_cost;
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (this.schedule_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   let paymentData =   {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
 "start_date":start_date,"subcategory":subcategory,"service_id":service_id,"location_id":this.location_id,
 "paymentflag":1,"service_cost":this.schedule_cost,"service_cost_travel":this.schedule_cost,"base_cost":this.service_cost,
 "from_date":"","problem":"","datetime":"","mobile":this.altercontact,"preferred_time":"",
 "prebook_status":this.vendorList.requestServices.booking_status,"service_cost_prebook":this.schedule_cost,"service_cost_total":this.schedule_cost,
 "prebook_percentage":this.pre_book_percentage,"service_name":service,"vendor_id":this.vendor_id,
 "get_custome_service_cancel_amount":0,"total_cost":this.schedule_cost,"get_custome_deliever_amount":0,
 "total_service_cost":this.schedule_cost,"get_custome_amount":0,"package_id":"","quantity":"",
 "coupen_code":this.coupan_code,"coupon_code_discount_cost":this.discounted_cost,"type":"service",
  "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"final_service_cost_after_coupon_code_discount":this.final_service_cost,
 "dependentid":this.elder_id,"getCustomerBalanceAmount":0,"lead_time":"00:00","selected_dates":[],
 "exclude_days":[],"Category_name":category,"serviceType":"One time","mobile_imei":this.device.uuid,
 "book":{"name":this.name,"mobile":this.phone,"mail":this.email},
 emergency,
 "paymentcost":this.schedule_cost};
   // this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security","template_id":this.template_id});
     let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,paymentData)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        // loading.dismiss();
        var options = {
      description: service,
      image: this.url + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: this.name
      },
      
       "notes": {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":"",
        "category_name":category,
        "service_name":service,
        "service_cost":this.schedule_cost,
        "pre_book":this.schedule_cost
      },
      theme: {
        color: '#208ad6'
      },

    };
let navCtrl = this.navCtrl;
let nav = this.blogListService;
if(this.coupon_id == undefined || this.coupon_id == ""){
 var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
  loading.dismiss();

  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);

  nav.presentConfirm(result);

  }
    }  
     
    }
    else{
       var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss"),
"coupon_id":localStorage.getItem("coupon_id"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
  loading.dismiss();

  var users = JSON.parse(xmlhttp.responseText);
  var error = users.error;
 var result=users.result;

  // navCtrl.setRoot(ServicerequestPage);
  if(result){
     nav.presentConfirm(result);
  }
   if(error){
     nav.presentConfirm(error);
  }

  }
    }  
    }

var cancelCallback = function(error) {
  nav.showToaster(error.description);
  loading.dismiss();
}


RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Something went wrong");
        // this.navCtrl.pop();
      }
            })
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
   if(this.booking_status != '1' && this.vendorList.requestServices.booking_status != '0'){
     this.total_cost = prebook_cost;
  }
  else{
     this.total_cost = this.schedule_cost;
     console.log(this.total_cost);
   }

   if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost - this.getCustomerBalanceAmount);
        if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost - this.getCustomerBalanceAmount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }

    else if(this.get_custome_deliever_amount != 0 && this.get_custome_service_cancel_amount == 0 && this.getCustomerBalanceAmount == 0){
      this.servicecost = (this.total_cost + this.get_custome_deliever_amount);
     if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount);
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    else{
      this.servicecost = this.schedule_cost;

    if(this.booking_status != '1' && this.vendorList.requestServices.booking_status != '0'){
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
      }
      else{
       this.service_costss = (prebook_cost * 100).toFixed(0);
     }
    }
    else{
      if(this.coupandiscount == "1"){
        this.service_costss = (this.final_service_cost * 100).toFixed(0);
      }
      else{
       this.service_costss = (this.schedule_cost * 100).toFixed(0);
     }
     }
       localStorage.setItem('service_costss', this.service_costss);
    }
console.log(this.service_costss);
   let paymentData =   {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
 "start_date":start_date,"subcategory":subcategory,"service_id":service_id,"location_id":this.location_id,
 "paymentflag":1,"service_cost":prebook_cost,"service_cost_travel":this.schedule_cost,"base_cost":this.service_cost,
 "from_date":"","problem":"","datetime":"","mobile":this.altercontact,"preferred_time":"",
 "prebook_status":this.vendorList.requestServices.booking_status,"service_cost_prebook":prebook_cost,"service_cost_total":this.schedule_cost,
 "prebook_percentage":this.pre_book_percentage,"service_name":service,"vendor_id":this.vendor_id,
 "get_custome_service_cancel_amount":0,"total_cost":prebook_cost,"get_custome_deliever_amount":0,
 "total_service_cost":prebook_cost,"get_custome_amount":0,"package_id":"","quantity":"",
 "dependentid":this.elder_id,"getCustomerBalanceAmount":0,"lead_time":"00:00","selected_dates":[],
 "exclude_days":[],"Category_name":category,"serviceType":"One time","coupen_code":this.coupan_code,"coupon_code_discount_cost":this.discounted_cost,"type":"service",
  "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"final_service_cost_after_coupon_code_discount":this.final_service_cost,
 "book":{"name":this.name,"mobile":this.phone,"mail":this.email},
 "emergency":[{"name":this.name,"mobile":this.phone}],
 "paymentcost":prebook_cost};
   // this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Safety and security","template_id":this.template_id});
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,paymentData)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        // loading.dismiss();
        console.log(this.service_costss);
        var options = {
      description: service,
      image: this.url + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: this.name
      },
      
       "notes": {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":"",
        "category_name":category,
        "service_name":service,
        "service_cost":this.schedule_cost,
        "pre_book":prebook_cost
      },
      theme: {
        color: '#208ad6'
      },

    };
let navCtrl = this.navCtrl;
let nav = this.blogListService;
if(this.coupon_id == undefined || this.coupon_id == ""){
 var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);

  nav.presentConfirm(result);

  }
    }  
     
    }
else{
   var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss"),
"coupon_id":localStorage.getItem("coupon_id"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
   var error = users.error;
 var result=users.result;

  // navCtrl.setRoot(ServicerequestPage);
  if(result){
     nav.presentConfirm(result);
  }
   if(error){
     nav.presentConfirm(error);
  }

  }
    } 
}
var cancelCallback = function(error) {
  nav.showToaster(error.description);
  loading.dismiss();
}


RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Something went wrong");
        // this.navCtrl.pop();
      }
            })
   this.dismiss();
}
submitRequestwearable(prebook_cost,category_id,service_id,sub_category_id,category,service,subcategory,start_date){
   if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
   if(this.booking_status != '1' && this.vendorList.requestServices.booking_status != '0'){
     this.total_cost = prebook_cost;
  }
  else{
     this.total_cost = this.total_cost;
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
 "exclude_days":[],"Category_name":category,"serviceType":"One time","coupen_code":this.coupan_code,"coupon_code_discount_cost":this.discounted_cost,"type":"service",
  "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"final_service_cost_after_coupon_code_discount":this.final_service_cost,
 "book":{"name":this.name,"mobile":this.phone,"mail":this.email},
 "emergency":[{"name":this.name,"mobile":this.phone}],
 "paymentcost":prebook_cost};
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayLater`,paymentData)
  .subscribe(
      data =>{
        this._provider.showToast(data.result);
        this.dismiss();
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this._provider.showToast("Something went wrong");
      }
            })
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
    if(this.getCustomerBalanceAmount!=0 && this.get_custome_service_cancel_amount ==0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost - this.getCustomerBalanceAmount);
      if(this.coupandiscount == "1"){
        this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = ((this.total_cost - this.getCustomerBalanceAmount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
       
    }
   
    else if(this.get_custome_deliever_amount!=0 && this.get_custome_service_cancel_amount ==0 && this.getCustomerBalanceAmount ==0){
      this.servicecost = (this.total_cost + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
      this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
      // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
      this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount == 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = (this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
        if(this.coupandiscount == "1"){
          this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
   
  else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount == 0){
      this.servicecost = (this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount);
        if(this.coupandiscount == "1"){
          this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = ((this.total_cost + this.getCustomerBalanceAmount + this.get_custome_service_cancel_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
  
    else if(this.get_custome_service_cancel_amount==0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount);
       if(this.coupandiscount == "1"){
        this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
        this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    
    else if(this.get_custome_service_cancel_amount!=0 && this.getCustomerBalanceAmount != 0 && this.get_custome_deliever_amount != 0){
      this.servicecost = ((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount);
        if(this.coupandiscount == "1"){
          this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (((this.total_cost - this.getCustomerBalanceAmount) + this.get_custome_service_cancel_amount + this.get_custome_deliever_amount) * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
    else{
      this.servicecost = this.schedule_cost;
       if(this.coupandiscount == "1"){
        this.service_costss = (((this.schedule_cost * this.peoplecount) - this.getCustomerBalanceAmount + this.get_custome_deliever_amount + this.get_custome_service_cancel_amount - this.discounted_cost) * 100).toFixed(0);
        // this.service_costss = (this.final_service_cost * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
      }
      else{
       this.service_costss = (this.totalcosts * 100).toFixed(0);
       localStorage.setItem('service_costss', this.service_costss);
     }
    }
 // this.service_costss = (this.schedule_cost * 100).toFixed(0);
 // localStorage.setItem('service_costss', this.service_costss);
   let paymentData =  {"package_id":"","serviceType":"One time","service_cost":this.total_cost,"service_cost_travel":this.schedule_cost,
   "paymentflag":1,"base_cost":this.service_cost,"vendor_id":this.vendor_id,"location_id":this.location_id,"category_id":category_id,
   "sub_category_id":sub_category_id,"subcategory":subcategory,"service_id":service_id,"get_custome_amount":"0","total_cost":this.schedule_cost,
   "get_custome_service_cancel_amount":"0","get_custome_deliever_amount":"0","total_service_cost":this.servicecost,
   "service_name":service,"dependentid":this.elder_id,"getCustomerBalanceAmount":"0","lead_time":"02:00","type":"service",
   "exclude_days":[],"Category_name":category,"category":category,"coupen_code":this.coupan_code,"coupon_code_discount_cost":this.discounted_cost,
   "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"final_service_cost_after_coupon_code_discount":this.final_service_cost,
   "book":{"name":this.name,"mobile":this.phone,"mail":this.email,"book_peoples":this.peoplecount,
   people},
   "datetime":start_date,"preferred_time":"01:00 AM - 02:00 AM",
   "paymentcost":this.total_cost};
   // this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Recreation","template_id":this.template_id});
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayment`,paymentData)
  .subscribe(
      data =>{
        this.udf3= data.result.serviceType;
        this.udf2 = data.result.service_request_id;
        // loading.dismiss();
        var options = {
      description: service,
      image: this.url + "assets/img/Elderlogo.png",
      currency: 'INR',
      key: this.razorkey,
      amount: this.service_costss,
      name: "EldersIndia",
      prefill: {
        email: this.email,
        contact: this.phone,
        name: this.name
      },
      
       "notes": {
        "service_id":this.udf2,
        "service_type":this.udf3,
        "email": this.email,
        "pre_balance_amount":"",
        "category_name":category,
        "service_name":service,
        "service_cost":this.schedule_cost,
        "pre_book":this.schedule_cost
      },
      theme: {
        color: '#208ad6'
      },

    };
let navCtrl = this.navCtrl;
let nav = this.blogListService;
if(this.coupon_id == undefined || this.coupon_id == ""){
 var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
 var result=users.result;
  // navCtrl.setRoot(ServicerequestPage);

  nav.presentConfirm(result);

  }
    }
}
else{
  var successCallback = function(payment_id) {
  loading.present();
      // ajaxCallCheck(payment_id);

  var url  = localStorage.getItem("rootUrl")+"razorPaymentResponse";
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", url,true);

xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("key"));
xmlhttp.send(JSON.stringify({ "razorpay_payment_id": payment_id,"prev_due_amount":localStorage.getItem("get_custome_deliever_amount"),"service_cost":  localStorage.getItem("service_costss"),
  "coupon_id":localStorage.getItem("coupon_id"),"coupon_offer":localStorage.getItem("coupon_offer"),"wallet_value":localStorage.getItem("wallet_value")}));

xmlhttp.onload = function () {
loading.dismiss();
  var users = JSON.parse(xmlhttp.responseText);
   var error = users.error;
 var result=users.result;

  // navCtrl.setRoot(ServicerequestPage);
  if(result){
     nav.presentConfirm(result);
  }
   if(error){
     nav.presentConfirm(error);
  }

  }
    }
}
var cancelCallback = function(error) {
  nav.showToaster(error.description);
  loading.dismiss();
}
RazorpayCheckout.on('payment.success', successCallback,this.dismiss());
RazorpayCheckout.on('payment.cancel', cancelCallback);
RazorpayCheckout.open(options, successCallback, cancelCallback);
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
        // this.navCtrl.pop();
      }
      else
      {
        this._provider.showToast("Something went wrong");
        // this.navCtrl.pop();
      }
            })
   this.dismiss();
 }
 submitRequest(category_id,service_id,sub_category_id,category,service,subcategory,start_date){
      if(this.user_type == 'sponsor')
  {
    this.elder_id = this.elder_id;
  }
  else{
    this.elder_id = this.user_id;
  }
  let data = {"category_id":category_id,"sub_category_id":sub_category_id,"category":category,
  "start_date":start_date,"subcategory":subcategory,"service_id":service_id,"location_id":this.location_id,
  "discount":"","pay_method":"","coupon_code_discount_cost":this.discounted_cost,
  "final_service_cost_after_coupon_code_discount":this.final_service_cost,"service_name":service,
  "paymentflag":1,"service_cost":this.servicecost,"service_cost_travel":this.servicecost,"base_cost":this.service_cost,
  "from_date":"","to_date":"","time_slot":"","from_time":"","to_time":"",
  "durations":"","problem":"","mobile":"","package_id":"","quantity":"",
  "getCustomerBalanceAmount":0,"get_custome_amount_actual":0,"get_custome_amount":0,
  "total_cost":this.servicecost,"get_custome_deliever_amount":0,"total_service_cost":this.servicecost,
  "get_custome_service_cancel_amount":0,"dependentid":this.elder_id,"mobile_imei":"",
  "gender":this.gender,"coupen_code":this.coupan_code,"vendor_id":this.vendor_id,"type":"service",
  "coupon_id":this.coupon_id,"wallet_value":this.wallet_value,"lead_time":"00:00","selected_dates":[],"exclude_days":[],
  "serviceType":"One time"}

 
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
  this._provider.webServiceCall(`serviceRequestSubmitbeforePayLater`,data)
  .subscribe(
      data =>{
        this._provider.showToast(data.result);
        this.dismiss();
        loading.dismiss();
              },
      err =>{
        loading.dismiss();
        if(err.status===400)
      {
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else if(err.status === 401){
        this._provider.showToast(JSON.parse(err._body).error);
      }
      else
      {
        this._provider.showToast("Something went wrong");
      }
            })
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
