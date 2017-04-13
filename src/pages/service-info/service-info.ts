import { Component , ViewChild } from '@angular/core';
import { LoadingController,NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the ServiceInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-service-info',
  templateUrl: 'service-info.html',
  providers:[ServiceProvider]
})
export class ServiceInfoPage {

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

@ViewChild('ghbslides') slider: Slides;
// @ViewChild('ghbslides') ghbslides: any;

  constructor(public formBuilder: FormBuilder,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
       
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

  loadServiceInformation(subcategoryData){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
    // this.providerService.loadVendorDetails(subcategoryData)
    this.providerService.webServiceCall(`getVendorDetails`,subcategoryData)
        .subscribe(
          data =>{
                   this.vendorList = data.result.info;
                   this.serviceData = data.result.info.requestServices;
                  },
          err =>{
                   this.providerService.showErrorToast(err);
                   console.log("Response for getVendorDetails: "+err);
                })
        loading.dismiss();
  }

//   ngOnInit() {
//     this.sliderOptions = {
//       initialSlide: 0,
//       loop: true,
//       direction: 'horizontal',
//       pager: true,
//       speed: 300,
//       autoplay: 300,
//         effect: 'fade',
//         fade: {
//             crossFade: true
//         }
//     }
//     this.slider.startAutoplay();
// };

ngViewInit() {
    this.sliderOptions = {
      // initialSlide: 0,
      // loop: true,
      // direction: 'horizontal',
      // pager: true,
      // paginationType:'fraction',
      // speed: 300,
      // autoplay: 300,
      // slidesPerView:2,
      //   effect: 'cube',
      //   // fade: {
      //   //     crossFade: true
      //   // }
      initialSlide: 0,
    loop: true,
    autoplay:2000,
    autoplayDisableOnInteraction: false
    }
    this.slider.startAutoplay();
};

  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceInfoPage');
    this.slider.startAutoplay();
  }

  sendRequestService(){
    if(!this.requestForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
      this.dependentID = this.requestForm.value.dependents; 
      if(this.userType != 'sponsor'){
      this.dependentID = this.elderId;
      }
    
    let requestServiceData = {"location_id":this.locationId,"vendor_id":this.vendor_id, "category_id":this.serviceData.category_id, "sub_category_id":this.serviceData.sub_category_id, "service_id":this.serviceData.service_id, "problem":this.requestForm.value.problem, "datetime":this.requestForm.value.date+" "+this.requestForm.value.time, "dependentid":this.dependentID, "mobile":this.requestForm.value.contact}
    
    // this.providerService.sendRequestServiceData(serviceData)
    this.providerService.webServiceCall(`serviceRequest`,requestServiceData)
    .subscribe(
        data =>{
                 console.log(data);
                 this.providerService.showToast(data.result);
                 this.toggleRequestService();
                 this.requestForm.reset();
                },
        err =>{
                  this.providerService.showErrorToast(err);
                  console.log("Response for serviceRequest: "+err);
              })

  }
}

  toggleContact(){
      this.showServiceOffered = false;
      this.showRequestService = false;
      this.show_service = false;

      if (this.showDetails){
        this.showDetails = false;
      }else
      {
        this.showDetails = true;
      }
    }

  toggleRequestService(){
      this.submitAttempt = false;
      this.showServiceOffered = false;
      this.showDetails = false;
      this.show_service = false;

      if (this.showRequestService){
        this.showRequestService = false;
      }else
      {
        this.showRequestService = true;
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
