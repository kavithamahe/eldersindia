import { Component } from '@angular/core';
import { LoadingController, ViewController, NavController, NavParams, AlertController,ToastController,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServiceInfoPage } from '../service-info/service-info';
import { ModalContentPage } from '../modal-page/modal-page';
//import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';
/*
  Generated class for the SubcategoryList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'subcategory-list.html',
  providers :[ModalContentPage]
})
export class SubcategoryListPage {

	sublists:any= [];
  logoUrl: any;
  location_id:any;
  service_id:any;
  subCategorydata: any;
  dependentLists:any = [];
  dependents:any;
  elderId:any;
  userType:any;
  modal:any;
  serviceData:any;
  serviceTitle:any;
  rate:any;
	token:any;

  constructor( public loadingCtrl: LoadingController, public providerService: ServiceProvider, public navCtrl: NavController, public altCtrl:AlertController, public navParams: NavParams,public toastCtrl: ToastController,public modalCtrl: ModalController, public mp:ModalContentPage, public storage:Storage) {
      this.location_id = navParams.get("location_id");
      this.service_id = navParams.get("service").id;
      this.serviceTitle = navParams.get("service").name;   
      // this.userType = "elder";
      this.rate = 3.5;
      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.logoUrl=imageurl;});
      storage.get('user_type').then((user_type) => { this.userType=user_type;});
      if(this.userType != 'sponsor'){

        storage.get('id').then((id) => { this.elderId=id;});
      }
      storage.get('token').then((token) => { this.token=token; 
      this.loadSubcategoryList(this.service_id,this.location_id);  
      });
    });
    }
    
loadSubcategoryList(subCategory_id,location_id){
  
      this.subCategorydata = {subCategoryId : subCategory_id, flag:"1", locationId : location_id};
      // this.providerService.loadServiceProviderList(this.subCategorydata)
      this.providerService.webServiceCall(`getServiceProviderlist`,this.subCategorydata)
          .subscribe(data =>{
                            this.sublists = data.result.info;
                            this.dependentLists = data.result.info.dependentLists;
                            this.serviceData = data.result.info.requestServices;
                            console.log("dependentList data : "+this.dependentLists);
                            },
                      (err) =>{               
                            this.providerService.showErrorToast(err);
                            
                            });
            }

  serviceInfo(vendor){
    let servieListData = {"vendor": vendor, "subCategoryId": this.service_id, "flag": "1", "location_id": this.location_id};
    this.navCtrl.push(ServiceInfoPage,servieListData);
  }

  instantRequest(vendor_id) {
    if(this.userType != "sponsor"){
            this.serviceRequestCall("",vendor_id);
    }else{
      this.openModal("instant",vendor_id);
    // let instantRequestmodal = this.modalCtrl.create(InstantRequestModalPage, {dependentList:this.dependentLists});
        
    // instantRequestmodal.onDidDismiss(data =>{
    //   if(data == "dismiss"){
    //     console.log(" Instant Request modal dismissed..!");
    //   }else{
    //         this.serviceRequestCall(data);
    //        }
    //   })  
    // instantRequestmodal.present();   
    }
  }

  openModal(modalPage,vendor_id){
    if(modalPage == "instant"){
      this.modal = this.modalCtrl.create(InstantRequestModalPage,{dependentList:this.dependentLists});
    }else{
      this.modal = this.modalCtrl.create(ModalContentPage,{dependentList:this.dependentLists});
    }
    
    this.modal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.serviceRequestCall(data,vendor_id);
      }
    })
    
    this.modal.present();
  }

  serviceRequestCall(service_request_data,vendorId){
   
    let requestServiceData = {"vendor_id":vendorId, "category_id":this.serviceData.category_id, "sub_category_id":this.serviceData.sub_category_id, "service_id":this.serviceData.service_id, "problem":service_request_data.problem, "datetime":service_request_data.datetime, "dependentid":service_request_data.dependentId, "mobile":service_request_data.mobile_no}

    this.providerService.webServiceCall(`serviceRequest`,requestServiceData)
       .subscribe(
        data =>{
                 console.log(data.result);
                 this.providerService.showToast(data.result);
                },
        err =>{
                this.providerService.showErrorToast(err);
                console.log("Response for serviceRequest: "+err);
              });
  }

}


@Component({
  template: `
  <div class="dependent-modal">
<ion-header>
</ion-header>

<ion-content>
  <ion-row>
      <ion-item >
            <ion-label>Select Dependent</ion-label>
              <ion-select [(ngModel)]="dependentData">
                <ion-option *ngFor = "let dependent of dependentLists" [value]="dependent">{{dependent.name}}
                </ion-option>
              </ion-select>
          </ion-item>
  </ion-row>
  <ion-row>
  <ion-col><button ion-button item-left small (click)="dismiss()">close</button></ion-col>
  <ion-col offset-33><button ion-button item-right small (click)="submit()">Submit</button></ion-col>
  </ion-row>
</ion-content>
</div>
`
})
export class InstantRequestModalPage {
  dependentLists:any;
  dependentData:any;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.dependentLists = this.params.get('dependentList');
  }

  dismiss() {
    this.viewCtrl.dismiss("dismiss");
  }
  submit(){
    let dependent_model = this.dependentData;
    let serviceRequestData = {"problem": "", "datetime": "", "dependentId": dependent_model.id, "mobile_no": dependent_model.mobile};
    this.viewCtrl.dismiss(serviceRequestData);
  }
}