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
requestForm: FormGroup;
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
// @ViewChild('ghbslides') ghbslides: any;


  constructor(public modalCtrl: ModalController, public platform: Platform,public toastCtrl: ToastController, public formBuilder: FormBuilder,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
   
      this.subCategoryId = navParams.get("subCategoryId");
      this.locationId = navParams.get("location_id");
      this.one_time = navParams.get("one_time");
      this.recurring = navParams.get("recurring");
      this.vendor_id = navParams.get("vendor").id;    
      this.vendor_name = navParams.get("vendor").name; 
      this.vendor=navParams.get("vendor");
      this.service_cost = navParams.get("vendor").service_cost;
      this.package_amount = navParams.get("package_amount");
      if(navParams.get("status") == "1"){
         this.one_time = navParams.get("vendor").one_time;
      this.recurring = navParams.get("vendor").recurring;
      }
      this.showDetails = false;
      this.showRequestService = false;
      this.sub_category = false ;
      // this.show_service = null;
      this.showServiceOffered = false;

      this.requestForm = formBuilder.group({
        problem: ['',Validators.compose([Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        date: ['',Validators.compose([Validators.required])],
        time: ['',Validators.compose([Validators.required])],
        contact: ['',Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        dependents: ['',Validators.compose([Validators.required])]
        
    });

      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.url=imageurl;});
      storage.get('user_type').then((user_type) => { this.userType=user_type;});
      if(this.userType != 'sponsor'){

        storage.get('id').then((id) => { this.elderId=id;});
      }
      storage.get('token').then((token) => { this.token=token; 
      let servieListData = {"vendor_id": this.vendor_id, "subCategoryId": this.subCategoryId, "flag": "1", "location_id": this.locationId};
      this.loadServiceInformation(servieListData);
      })
    });
  }

  openUrl() {
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(this.website,'_blank');

        });
  }

  loadServiceInformation(subcategoryData){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
    // this.providerService.loadVendorDetails(subcategoryData)
    this.providerService.webServiceCall(`getVendorDetails`,subcategoryData)
        .subscribe(
          data =>{
                   this.vendorList = data.result.info;
                   this.packageinfo = this.vendorList.packages;
                   this.serviceData = data.result.info.requestServices;
                   this.serviceids = this.serviceData.service_id;
                   this.website = this.vendorList.vendorDetails.website;
                   this.dependentLists = data.result.info.dependentLists;
                   if(data.result.info.serviceOffered[0] != undefined){
                       this.lead_time=data.result.info.serviceOffered[0].category_lists[0].service_sub_category_lists[0].lead_time;
                    }
                   loading.dismiss();
                  },
          err =>{
                   this.providerService.showErrorToast(err);
                   loading.dismiss();
                })
        
  }

pressmodel(){
  this.modal();
}
modal(){

    let modal = this.modalCtrl.create(ServiceModalPage,{service:"service_offered",vendorList:this.vendorList});    
    modal.present();
}

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }

  sendRequestService(data){
   
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
     let requestServiceData = {"category":this.serviceData.category,"service":this.serviceData.service,
    "category_id":this.serviceData.category_id,"location_id":this.locationId,"vendor_id":this.vendor_id,
     "sub_category_id":this.serviceData.sub_category_id,"discountCost":data.discountCost,"actualCost":"",
      "service_id":this.serviceData.service_id, "problem":data.problem,
     "datetime":data.datetime,"preferred_time":data.preferred_time, "dependentid":data.dependentId,
      "mobile":data.mobile_no,"lead_time":this.lead_time,
      "subcategory":this.serviceData.subcategory, "durations":data.durations,
       "exclude_days":data.exclude_days,"from_date":data.from_date,"from_time":data.from_time,"quantity":"",
       "selected_dates":data.selected_dates,"serviceType":data.serviceType,"time_slot":data.time_slot,"to_date":data.to_date,"to_time":data.to_time,
     "package_id":data.package_id}
    // let requestServiceData = {"location_id":this.locationId,"vendor_id":this.vendor_id,
    //  "category_id":this.serviceData.category_id, "sub_category_id":this.serviceData.sub_category_id,
    //   "service_id":this.serviceData.service_id, "problem":data.problem, 
    //   "datetime":data.datetime, "dependentid":data.dependentId, 
    //   "mobile":data.mobile_no,"lead_time":this.lead_time}    
    this.providerService.webServiceCall(`serviceRequest`,requestServiceData)
    .subscribe(
        data =>{
                 this.providerService.showToast(data.result);
                 loading.dismiss();
                },
        err =>{
          if(err.status===400)
        {
          this.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this.showToast("Try again later");
        }
                  loading.dismiss();
              })

  }
   
pressContact(){
  this.toggleContact();
}
  toggleContact(){
    let modal = this.modalCtrl.create(ServiceModalPage,{service:"contact",vendorList:this.vendorList});    
    modal.present();
    }
    pressPackages(){
      this.togglePackages();
    }
    togglePackages(){
      if(this.packageinfo.length == 0){
        this.showToast("No Packages Available")
      }
      else{
      let modal = this.modalCtrl.create(ServiceModalPage,{service:"packages",vendorList:this.vendorList,location_id:this.locationId});    
    modal.present();
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
     
     if((this.vendorList.dependentLists.length<=0) && this.userType == 'sponsor')
      {
        this.showToast("There is no dependent. You can not apply job!");      
      
      }else{
        console.log(this.recurring);
     let service_modal = this.modalCtrl.create(ModalContentPage,{dependentList:this.vendorList.dependentLists,lead_time:this.lead_time,vendor:this.vendorList.vendorDetails,vendorservice_cost:this.service_cost,one_time:this.one_time,recurring:this.recurring,status:"1",vendor_id:this.vendor_id,dependentLists:this.dependentLists,
      serviceids:this.serviceids,locationId:this.locationId,package_amount:this.package_amount});    
    service_modal.present();
    service_modal.onDidDismiss(data =>{
      if(data == "dismiss"){
      }else{
       this.sendRequestService(data);
      }
    })
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
