import { Component , ViewChild } from '@angular/core';
import { ModalController,LoadingController,NavController, ToastController,NavParams, Slides, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceModalPage } from '../../pages/service-modal/service-modal';
import { ModalContentPage } from '../modal-page/modal-page';

import { ServiceProvider } from '../../providers/service-provider'

import { InAppBrowser } from 'ionic-native';
/*
  Generated class for the ServiceInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-service-info',
  templateUrl: 'service-info.html',
  providers:[ServiceModalPage]
})
export class ServiceInfoPage {
  schedule_cost: number;
  percentage_cost: any;
  serviceoffered: any;
  flagId: any;
terms:any;

showDetails : boolean;
showRequestService : boolean;
showServiceOffered : boolean;

subCategoryId:any;
locationId:string ="";
vendor_id:any;
dependentID:any;

vendorList:any =[];
serviceData:any;
vendor_name:any;
sub_category:any;
show_service:any = null;
submitAttempt:any;
sliderOptions: any;
packageinfo:any;

token:any;
elderId:any;
url:any;
userType:any;
website:any;
lead_time:any='00:00';
@ViewChild('ghbslides') slider: Slides;
vendor:any;
service_cost:any;
recurring:any;
one_time:any;
dependentLists:any;
serviceids:any;
package_amount:any;
balanceRecreationService:any;
availability:any;
vendormoreinfo:any;
booking_status:any;
subcategory:any;
category:any;
package_active_status:any;
businessFromDayName:any;
businessToDayName:any;
businessFromTime:any;
businessToTime:any;
businessLeadTime:any;
package_validity:any;
end_date:any;
start_date:any;
businessHoursOption:any;
is_recreation_config:any;
template_id:any;
package:any;
hoteltype:any;
payingtax:any;
getHotelType:any=[];
getPersonPerHotel:any=[];
getHotelCost:any;
people_count:any;
tourslabel:any =[];
tourstotal_peoples:any = [];
packageCost:boolean = false;
tourService_id:any;
price_range:any;
discount_rate:any;
getHotelCosts:any;
terms_and_condition_length:any;
terms_and_condition:any;
// @ViewChild('ghbslides') ghbslides: any;


  constructor(public modalCtrl: ModalController, public platform: Platform,public toastCtrl: ToastController, public formBuilder: FormBuilder,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
   
      this.subCategoryId = navParams.get("subCategoryId");
      this.locationId = navParams.get("location_id");
      this.template_id = navParams.get("vendor").template_id;
      this.terms_and_condition_length = navParams.get("vendor").terms_and_condition_length;
      this.terms_and_condition = navParams.get("vendor").terms_and_condition;
      this.discount_rate = navParams.get("vendor").discount_rate;
      this.tourService_id = navParams.get("vendor").tourService_id;
      this.start_date = navParams.get("vendor").start_date;
      this.booking_status = navParams.get("vendor").booking_status;
      this.package_active_status = navParams.get("vendor").package_active_status;
      this.price_range = navParams.get("vendor").price_range;
      this.is_recreation_config = navParams.get("vendor").is_recreation_config;
      this.package
      this.one_time = navParams.get("one_time");
      this.recurring = navParams.get("recurring");
      this.vendor_id = navParams.get("vendor").id;    
      this.vendor_name = navParams.get("vendor").name; 
      this.availability = navParams.get("vendor").availability;
      this.balanceRecreationService = navParams.get("vendor").balanceRecreationService;  
      this.vendor=navParams.get("vendor");
      this.service_cost = navParams.get("vendor").service_cost;
      this.percentage_cost = navParams.get("vendor").percentage_cost;
      this.schedule_cost = this.service_cost - this.percentage_cost;
      this.package_amount = navParams.get("package_amount"); 
      if(this.is_recreation_config == '1'){
        this.flagId = "3";
      }
      else{
        this.flagId = "1";
      }
      if(navParams.get("status") == "1"){ 
      this.serviceoffered = navParams.get("serviceOffered");
      this.one_time = navParams.get("vendor").one_time;
      this.recurring = navParams.get("vendor").recurring;
      }
      this.vendormoreinfo = navParams.get("moreinfovendor");
      this.showDetails = false;
      this.showRequestService = false;
      this.sub_category = false ;
      // this.show_service = null;
      this.showServiceOffered = false;
      this.package = navParams.get("package");
      if(navParams.get("package") == "1"){ 
        this.flagId = "1";
        this.is_recreation_config = "0";
        this.template_id = "1";
        this.getServiceProviderlist(this.flagId);
      }
      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.url=imageurl;});
      storage.get('user_type').then((user_type) => { this.userType=user_type;});
      if(this.userType != 'sponsor'){

        storage.get('id').then((id) => { this.elderId=id;});
      }
      storage.get('token').then((token) => { this.token=token; 
      let servieListData = {"vendor_id": this.vendor_id, "subCategoryId": this.subCategoryId, "flag": this.flagId, "location_id": this.locationId,"category_name":this.serviceoffered,
      "template_id":this.template_id,"is_recreation_config":this.is_recreation_config};
      this.loadServiceInformation(servieListData);
      })
    });
      if(this.template_id == 9){
        this.hotelType();
      }
  }

  hotelType(){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.providerService.gethotelType(this.tourService_id)
      .subscribe(data =>{ 
          this.getHotelType = data.result.getHotelType;
          this.storage.set('getHotelType', this.getHotelType);
          loader.dismiss();
    })
  }
  selecthotel(hoteltype){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.providerService.getselecthotel(hoteltype,this.tourService_id)
      .subscribe(data =>{ 
          this.getPersonPerHotel = data.result.getHotelPersons;
          this.packageCost = false;
          this.storage.set('getPersonPerHotel', this.getPersonPerHotel);
          this.storage.set('hoteltype', hoteltype);
          loader.dismiss();
    })
  }
   payingTax(payingtax){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.packageCost = true;
     this.providerService.getpayingTax(payingtax,this.hoteltype,this.tourService_id)
      .subscribe(data =>{ 
          this.getHotelCosts = data.result.getHotelCost;
          this.getHotelCost = (this.getHotelCosts - (this.getHotelCosts * (this.discount_rate/100)));
          this.people_count = data.result.people_count;
          this.storage.set('getHotelCosts', this.getHotelCosts);
          this.storage.set('getHotelCost', this.getHotelCost);
          this.storage.set('payingtax', payingtax);
           this.storage.set('people_count', this.people_count);
            this.tourslabel = [];
    for(var i=1;i<=this.people_count - 1;i++) {          
     this.tourslabel.push(i);
  }
  this.tourstotal_peoples =this.tourslabel;
  this.storage.set('tourstotal_peoples', this.tourstotal_peoples);
  loader.dismiss();
    })
  }
  openUrl() {
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(this.website,'_blank');

        });
  }
  getServiceProviderlist(flagId){
    let subcategoryData = {"flag":flagId,"locationId":this.locationId,"subCategoryId":this.subCategoryId}
    this.providerService.webServiceCall(`getServiceProviderlist`,subcategoryData)
        .subscribe(
          data =>{
            this.vendor = data.result.info.lists[0];
            console.log(this.vendor);
          })
  }
  loadServiceInformation(subcategoryData){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
    // this.providerService.loadVendorDetails(subcategoryData)
    this.providerService.webServiceCall(`getVendorDetails`,subcategoryData)
        .subscribe(
          data =>{
                   this.vendorList = data.result.info;
                   // this.booking_status=this.vendorList.requestServices.booking_status;
                   // this.package_active_status = this.vendorList.vendorDetails.package_active_status;
                   this.businessFromDayName = this.vendorList.vendorDetails.businessFromDayName;
                   this.businessToDayName = this.vendorList.vendorDetails.businessToDayName;
                   this.businessFromTime = this.vendorList.vendorDetails.businessFromTime;
                   this.businessToTime = this.vendorList.vendorDetails.businessToTime;
                   this.businessLeadTime = this.vendorList.vendorDetails.businessLeadTime;
                   this.businessHoursOption = this.vendorList.vendorDetails.businessHoursOption;
                   this.package_validity = this.vendorList.vendorDetails.package_validity;
                   this.subcategory = data.result.info.requestServices.subcategory;
                   this.category = data.result.info.requestServices.category;
                   // this.start_date = data.result.info.requestServices.start_date;
                   this.end_date = data.result.info.requestServices.end_date;
                   this.packageinfo = this.vendorList.packages;
                   this.serviceData = data.result.info.requestServices;
                   this.serviceids = this.serviceData.service_id;
                   this.website = this.vendorList.vendorDetails.website;
                   this.dependentLists = data.result.info.dependentLists;
                   if(data.result.info.serviceOffered[0] != undefined && data.result.info.serviceOffered[0].category_lists[0] != undefined){
                       this.lead_time=data.result.info.serviceOffered[0].category_lists[0].service_sub_category_lists[0].lead_time;
                    }
                   loading.dismiss();
                  },
          err =>{
                   this.providerService.showErrorToast(err);
                   loading.dismiss();
                })
        
  }
contactNow(){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","contact":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status});    
}
bookNow(){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","bookNow":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
    "template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date,"tourService_id":this.tourService_id});    
}
bookNowTours(){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","bookNowTours":"1","bookNowToursmore":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
    "template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date,"tourService_id":this.tourService_id});    
}
preBook(){
   this.navCtrl.push(ServiceModalPage,{service:"Schedule","preBook":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
 "template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date});    
}
emergencybook(){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","emergencybook":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
"template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date});    
}
transportationdriver(){
   this.navCtrl.push(ServiceModalPage,{service:"Schedule","transportationdriver":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
 "template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date});    
}
transportationcab(){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","transportationcab":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
"template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date});   
}
homemodify(){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","homemodify":"1",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,
"template_id":this.template_id,"discount_rate":this.discount_rate,"start_date":this.start_date});    
}
pressmodel(){
  this.modal();
}

modal(){

    this.navCtrl.push(ServiceModalPage,{service:"service_offered",vendorList:this.vendorList,"template_id":this.template_id,"discount_rate":this.discount_rate});    
   
}
recreationServices(){
     this.navCtrl.push(ServiceModalPage,{service:"recreation_service",vendorList:this.vendorList,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"template_id":this.template_id,"discount_rate":this.discount_rate});    

}

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

 
  toggleSchedule(){
    this.navCtrl.push(ServiceModalPage,{service:"Schedule",vendorList:this.vendorList,schedule_cost:this.schedule_cost,service_cost:this.service_cost,location_id:this.locationId,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":this.vendor_id,"booking_status":this.booking_status,"template_id":this.template_id,"discount_rate":this.discount_rate});    

  }
  pressContact(){
    this.toggleContact();
  }
  toggleContact(){
    this.navCtrl.push(ServiceModalPage,{service:"contact",vendorList:this.vendorList,"template_id":this.template_id});    

    }
    contactNowothers(){
      this.navCtrl.push(ServiceModalPage,{service:"contact",vendorList:this.vendorList,"template_id":this.template_id});    

    }
    pressPackages(){
      this.togglePackages();
    }
    togglePackages(){
  //     if(this.packageinfo.length == 0){
  //       this.showToast("No Packages Available")
  //     }
  //     else{
  //    this.navCtrl.push(ServiceModalPage,{service:"packages",vendorList:this.vendorList,location_id:this.locationId,"template_id":this.template_id});    

  // }
    if(this.packageinfo){
      this.navCtrl.push(ServiceModalPage,{service:"packages",vendorList:this.vendorList,location_id:this.locationId,"template_id":this.template_id});    
        }
      else{
     this.showToast("No Packages Available");
      }
    }
  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 3000
      });
      toast.present();
   }
   pressRequestService(){
    this.toggleRequestService();
   }
  toggleRequestService(){
    console.log(this.vendor_id);
     if((this.vendorList.dependentLists.length<=0) && this.userType == 'sponsor')
      {
        this.showToast("Please Add Dependent");      
      
      }else{
      
  this.navCtrl.push(ModalContentPage,{serviceData:this.serviceData,dependentList:this.vendorList.dependentLists,lead_time:this.lead_time,vendor: this.vendor,vendorservice_cost:this.service_cost,one_time:this.one_time,recurring:this.recurring,status:"1",vendor_id:this.vendor_id,dependentLists:this.dependentLists,
      serviceids:this.serviceids,location_id:this.locationId,package_amount:this.package_amount,servicetypestatus:"2",terms_and_condition_length:this.terms_and_condition_length,terms_and_condition:this.terms_and_condition});    
    // service_modal.present();
    // service_modal.onDidDismiss(data =>{
    //   if(data == "dismiss"){
    //   }else{
    //     console.log(data);
    //    this.sendRequestService(data);
    //   }
    // })
    }
  }


  toggleServiceOffered(){
    this.showDetails = false;
    this.showRequestService = false;
    this.show_service = false;
    this.sub_category = false;

    if (this.showServiceOffered){
        this.showServiceOffered = false;
      }else
      {
        this.showServiceOffered = true;
      }  
  }
    show_sub_category(){
      this.show_service = false;      
    if(this.sub_category){
      this.sub_category = false; 
    }else{
      this.sub_category = true;
    }
  }

  // showService(n){
showService(event){
    // this.comment="";
    if(this.show_service==event){
        this.show_service=null;
    }
    else{
      this.show_service=event;
    }
 }
}
