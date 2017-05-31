import { Component , ViewChild } from '@angular/core';
import { ModalController,LoadingController,NavController, NavParams, Slides, Platform } from 'ionic-angular';
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

token:any;
elderId:any;
url:any;
userType:any;
website:any;

@ViewChild('ghbslides') slider: Slides;
// @ViewChild('ghbslides') ghbslides: any;

  constructor(public modalCtrl: ModalController, public platform: Platform, public formBuilder: FormBuilder,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
       console.log("this is service info page");
     // this.url = this.providerService.getUrl();
      this.subCategoryId = navParams.get("subCategoryId");
      this.locationId = navParams.get("location_id");
      this.vendor_id = navParams.get("vendor").id;    
      this.vendor_name = navParams.get("vendor").name;    
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
        console.log("URL is ",this.website);
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
                   this.serviceData = data.result.info.requestServices;
                   this.website = this.vendorList.vendorDetails.website;
                   loading.dismiss();
                  },
          err =>{
                   this.providerService.showErrorToast(err);
                   loading.dismiss();
                   console.log("Response for getVendorDetails: "+err);
                })
        
  }


modal(){

    let modal = this.modalCtrl.create(ServiceModalPage,{service:"service_offered",vendorList:this.vendorList});    
    modal.present();
}

// ngViewInit() {
//     this.sliderOptions = {
//       initialSlide: 0,
//     loop: true,
//     autoplay:2000,
//     autoplayDisableOnInteraction: false
//     }
//     this.slider.startAutoplay();
// };

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ServiceInfoPage');
  //   this.slider.startAutoplay();
  // }

  sendRequestService(data){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
    let requestServiceData = {"location_id":this.locationId,"vendor_id":this.vendor_id, "category_id":this.serviceData.category_id, "sub_category_id":this.serviceData.sub_category_id, "service_id":this.serviceData.service_id, "problem":data.problem, "datetime":data.datetime, "dependentid":data.dependentId, "mobile":data.mobile_no}    
    this.providerService.webServiceCall(`serviceRequest`,requestServiceData)
    .subscribe(
        data =>{
                 console.log(data);
                 this.providerService.showToast(data.result);
                 loading.dismiss();
                },
        err =>{
                  this.providerService.showErrorToast(err);
                  console.log("Response for serviceRequest: "+err);
                  loading.dismiss();
              })

  }

  toggleContact(){

    let modal = this.modalCtrl.create(ServiceModalPage,{service:"contact",vendorList:this.vendorList});    
    modal.present();

      // this.showServiceOffered = false;
      // this.showRequestService = false;
      // this.show_service = false;

      // if (this.showDetails){
      //   this.showDetails = false;
      // }else
      // {
      //   this.showDetails = true;
      // }
    }

  toggleRequestService(){
     let service_modal = this.modalCtrl.create(ModalContentPage,{dependentList:this.vendorList.dependentLists,vendor:this.vendorList.vendorDetails});    
    service_modal.present();
    service_modal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.sendRequestService(data);
      }
    })

      // this.submitAttempt = false;
      // this.showServiceOffered = false;
      // this.showDetails = false;
      // this.show_service = false;

      // if (this.showRequestService){
      //   this.showRequestService = false;
      // }else
      // {
      //   this.showRequestService = true;
      // }

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
