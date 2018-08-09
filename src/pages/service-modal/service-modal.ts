import { Component  } from '@angular/core';
import { NavController,ViewController, NavParams, ModalController,AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GetpackagePagePage } from  '../../pages/getpackage/getpackage';
import { SubcategoryListPage } from '../subcategory-list/subcategory-list';
import { ServiceProvider } from '../../providers/service-provider'
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
  noofpeople: number;
  lastname: any;
  elderage: any;
  elder_age :any=[];
  elder_name: any=[];
  elder_id: any;
  total_cost: number;
  peoplecount: any;
  confirmationDetail: boolean;
  elderDetails: any =[];
  booknownext: boolean = false;
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
  constructor(public storage:Storage,public alertCtrl: AlertController,public modalCtrl: ModalController,public _provider:ServiceProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
   
    this.vendorList = navParams.get("vendorList");
    storage.get('name').then((name) => { this.name=name; })
    storage.get('lastname').then((lastname) => { this.lastname=lastname; })
    storage.get('elder_age').then((elder_age) => { this.elderage=elder_age; })
    storage.get('phone').then((phone) => { this.phone=phone; })
    storage.get('email').then((email) => { this.email=email; })
    storage.get('user_type').then((user_type) => { this.user_type=user_type; 
      console.log(this.user_type); })
     storage.get('imageurl').then((imageurl) => { this.url=imageurl;});
 
  	if(navParams.get("service") == "contact"){
  		this.showContactDetails = true;	
  		this.title = this.vendorList.vendorDetails.name+" - Contact Details";
  	}
    else if(navParams.get("service") == "packages"){
      this.showPackagesDetails = true; 
      this.title = this.vendorList.vendorDetails.name+" - Best Packages"; 
      this.location_id = navParams.get("location_id");
    }
    else if(navParams.get("service") == "Schedule"){
      this.showScheduleDetails = true;	
      this.schedule_cost = navParams.get("schedule_cost");
      this.service_cost = navParams.get("service_cost");
      this.location_id = navParams.get("location_id");
      this.availability = navParams.get("availability");
      this.balanceRecreationService = navParams.get("balanceRecreationService");
      this.title = this.vendorList.vendorDetails.name+" - Schedule";
      this.package_active_status = this.vendorList.vendorDetails.package_active_status;
      console.log(this.package_active_status);
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
    if(this.queries == undefined){

      this._provider.showToast("Please Enter the queries");
    }
    else{
             let service_data = {"data":{"category_id":category_id,"mobile":this.phone,"name":this.name,"query":this.queries,"service_id":service_id,"sub_category_id":sub_category_id,"vendor_id":vendor_id}};
    this._provider.webServiceCall(`packageContactNow`,service_data)
    .subscribe(
        data =>{
                 this._provider.showToast(data.result);
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
  dismiss(){
	this.viewCtrl.dismiss();
  }
  cancel(){
    this.booknow = false;
  }
  cancelconfirmation(){
    
    this.booknownext = false;
    this.booknow = true;
  }
  cancelpay(){
    this.confirmationDetail = false;
    this.booknownext = true;
  }
  cancelcontact(){
    this.contact = false;
  }
  contactNow(){
    this.contact = true;
    this.booknow = false;
  }
  bookNow(){
    this.booknow = true;
    this.contact = false;
  }
  bookDetails(){
    console.log(this.noofpeople);
    console.log(this.balanceRecreationService);
    if(this.noofpeople == undefined){
      this._provider.showToast("Please select the number of peoples");
   }
    else{
         if(this.balanceRecreationService == 0 || this.balanceRecreationService < this.noofpeople){
        this.showConfirm();
      }
      else{
        this.booknow = false;
        this.booknownext = true;
      }
    }
   
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
    //     if(this.elder_id == undefined || this.elder_name.length == 0 || this.elder_age == 0){
    //   this._provider.showToast("Please Enter the above Details");
    // else{
        this.booknownext = false;
    this.confirmationDetail = true;
    this.total_cost = (this.schedule_cost) * this.noofpeople;
    // }
   }
  getelderDetails(elderid){
    this.eldershow =true;
    let service_data = {"elder_id":elderid};
    this._provider.webServiceCall(`getElderDetails`,service_data)
    .subscribe(
        data =>{
                 this.elderDetails = data.result;
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
 payNow(category_id,service_id,sub_category_id,category,service,subcategory,vendor_id){

 let people = [];
 for(let i=0;i<this.total_peoples.length;i++) {
  
  var obj = {"elder_name":this.elder_name[i],"elder_age":this.elder_age[i]}
  people.push(obj);
 }
 
   let paymentData =  {"package_id":"","serviceType":"One time","service_cost":this.total_cost,"service_cost_travel":this.schedule_cost,
   "paymentflag":1,"base_cost":this.service_cost,"vendor_id":vendor_id,"location_id":this.location_id,"category_id":category_id,
   "sub_category_id":sub_category_id,"service_id":service_id,"get_custome_amount":"0","total_cost":this.schedule_cost,
   "get_custome_service_cancel_amount":"0","get_custome_deliever_amount":"0","total_service_cost":this.schedule_cost,
   "service_name":service,"dependentid":this.elder_id,"getCustomerBalanceAmount":"0","lead_time":"",
   "exclude_days":[],"Category_name":category,"category":category,
   "book":{"name":this.name,"mobile":this.phone,"mail":this.email,"book_peoples":this.peoplecount,
   people},
   "datetime":"","preferred_time":"","paymentservice_id":1606,
   "paymentcost":this.total_cost};
   this.navCtrl.push(PaymentPage,{"paymentData":paymentData,"service":"Recreation"});
   this.dismiss();
 }
 openRequestPackage(id,vendor_id,package_validity,package_amount){
  if(this.vendorList.dependentLists.length == 1){
      this.dependentId = this.vendorList.dependentLists[0].id;
    }
    let modal = this.modalCtrl.create(GetpackagePagePage,{packID:id,vendor_id:vendor_id,package_validity:package_validity,package_amount:package_amount,dependents:this.vendorList.dependentLists});

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
