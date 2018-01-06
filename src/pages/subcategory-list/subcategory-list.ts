import { Component } from '@angular/core';
import { LoadingController, ViewController, NavController, NavParams, AlertController,ToastController,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServiceInfoPage } from '../service-info/service-info';
import { ModalContentPage } from '../modal-page/modal-page';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';
/*
  Generated class for the SubcategoryList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector:'page-subcategory-list',
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
	token:any;
  date:any;
  dependentLen:any=true;
  scheduleModal:any='';
  lead_time:any='00:00';
  constructor( public loadingCtrl: LoadingController, public providerService: ServiceProvider, public navCtrl: NavController, public altCtrl:AlertController, public navParams: NavParams,public toastCtrl: ToastController,public modalCtrl: ModalController, public mp:ModalContentPage, public storage:Storage) {
    this.date = new Date().toISOString();
      this.location_id = navParams.get("location_id");
      this.service_id = navParams.get("service").id;
      this.serviceTitle = navParams.get("service").name;   
      // this.userType = "elder";
      
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
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
      this.subCategorydata = {subCategoryId : subCategory_id, flag:"1", locationId : location_id};
      // this.providerService.loadServiceProviderList(this.subCategorydata)
      this.providerService.webServiceCall(`getServiceProviderlist`,this.subCategorydata)
          .subscribe(data =>{
                            this.sublists = data.result.info;
                            this.dependentLists = data.result.info.dependentLists;
                            this.serviceData = data.result.info.requestServices;
                            this.lead_time =data.result.info.lists[0].lead_time;
                            if((Object.keys(this.dependentLists).length<=0) && this.userType == 'sponsor')
                            {
                             this.showToaster("There is no dependent. You can not apply job!.");
                            this.dependentLen=false;
                            }
                            loading.dismiss();
                            },
                      (err) =>{               
                            this.providerService.showErrorToast(err);
                            loading.dismiss();
                            });
            }

  serviceInfo(vendor){
    let servieListData = {"vendor": vendor, "subCategoryId": this.service_id, "flag": "1", "location_id": this.location_id};
    this.navCtrl.push(ServiceInfoPage,servieListData);
  }
pressinstant(vendorData){
  this.instantRequest(vendorData);
}
  instantRequest(vendorData) {
    if(this.userType != "sponsor"){
      let d = new Date();
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    let time =("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
     var hours = time;   
      var n = hours.split(':');

      var minutess = (+n[0]) * 60 + (+n[1]);
       var hms = this.lead_time; 
        var a = hms.split(':'); 

        var minutes = (+a[0]) * 60 + (+a[1]);
        let getHours=(minutess + minutes)/60;
        let lead_time = (getHours.toString().split(".")[0])+":"+((minutess + minutes)%60);

    let serviceRequestData = {"problem": this.serviceTitle, "datetime": lead_time, "dependentId": this.elderId, "mobile_no": "","serviceType":"One time",
    "time_slot":"","from_date":"","from_time":"","preferred_time":"","to_date":"","to_time":"","instant":""};
    
            this.serviceRequestCall(serviceRequestData,vendorData.id);
    }else{
      this.openModal("instant",vendorData); 
    }
  }
pressevent(modalPage,vendorData){
  this.openModal(modalPage,vendorData);
}
  openModal(modalPage,vendorData){
    if(modalPage == "instant"){
      this.modal = this.modalCtrl.create(InstantRequestModalPage,{dependentList:this.dependentLists,lead_time:this.lead_time,service:this.serviceTitle,vendor:vendorData});
    }else{
      this.modal = this.modalCtrl.create(ModalContentPage,{dependentList:this.dependentLists,lead_time:this.lead_time,vendor:vendorData,location_id:this.location_id,serviceData:this.serviceData,serviceTitle:this.serviceTitle});
    }
    this.scheduleModal=modalPage;
    this.modal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.serviceRequestCall(data,vendorData.id);
      }
    })
    
    this.modal.present();
    if(modalPage != "instant"){
      //console.log("test venkatesh");
     // this.navCtrl.setRoot(ServicerequestPage);
    }
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  serviceRequestCall(service_request_data,vendorId){
    let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
   if(this.scheduleModal != "instant"){

    let requestServiceData = {"category":this.serviceData.category,"service":this.serviceData.service,
    "category_id":this.serviceData.category_id,"location_id":this.location_id,"vendor_id":vendorId,
     "sub_category_id":this.serviceData.sub_category_id,"datCount":service_request_data.datCount,
      "service_id":this.serviceData.service_id, "problem":service_request_data.problem,
     "datetime":service_request_data.datetime,"preferred_time":service_request_data.preferred_time, "dependentid":service_request_data.dependentId,
      "mobile":service_request_data.mobile_no,"lead_time":this.lead_time,
      "subcategory":this.serviceData.subcategory, "durations":service_request_data.durations,
       "exclude_days":service_request_data.exclude_days,"from_date":service_request_data.from_date,"from_time":service_request_data.from_time,"quantity":"",
       "selected_dates":service_request_data.selected_dates,"serviceType":service_request_data.serviceType,"time_slot":service_request_data.time_slot,"to_date":service_request_data.to_date,"to_time":service_request_data.to_time,
     "package_id":service_request_data.package_id,"instant":service_request_data.instant}

    this.providerService.webServiceCall(`serviceRequest`,requestServiceData)
       .subscribe(
        data =>{
                 this.providerService.showToast(data.result);
                  if(this.scheduleModal != "instant"){
                 this.navCtrl.setRoot(ServicerequestPage);
               }
               loading.dismiss();
                },
         (err) => { 
        if(err.status===400)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
         loading.dismiss();
      });
   }
   else{

    let requestServiceData = {"category":this.serviceData.category,"service":this.serviceData.service,
    "category_id":this.serviceData.category_id,"location_id":this.location_id,"vendor_id":vendorId,
     "sub_category_id":this.serviceData.sub_category_id,
      "service_id":this.serviceData.service_id, "problem":service_request_data.problem,
     "datetime":service_request_data.datetime,"preferred_time":service_request_data.preferred_time, "dependentid":service_request_data.dependentId,
      "mobile":service_request_data.mobile_no,"lead_time":this.lead_time,
      "subcategory":this.serviceData.subcategory, "durations":service_request_data.durations,
       "exclude_days":service_request_data.exclude_days,"from_date":service_request_data.from_date,"from_time":service_request_data.from_time,"quantity":"",
       "selected_dates":service_request_data.selected_dates,"serviceType":service_request_data.serviceType,"time_slot":service_request_data.time_slot,"to_date":service_request_data.to_date,"to_time":service_request_data.to_time,
     "package_id":service_request_data.package_id,"instant":service_request_data.instant}
     
    this.providerService.webServiceCall(`serviceRequest`,requestServiceData)
       .subscribe(
        data =>{
                 this.providerService.showToast(data.result);
                  if(this.scheduleModal != "instant"){
                 this.navCtrl.setRoot(ServicerequestPage);
               }
               loading.dismiss();
                },
         (err) => { 
        if(err.status===400)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
         loading.dismiss();
      });
   }

  }
  public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }

}


@Component({
  template: `
<ion-header>
  <ion-navbar color="primary">
    <ion-buttons left>
      <button ion-button icon-only (click)="dismiss()">
         <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
      </button>
    </ion-buttons>
    <ion-title text-center>
      {{vendor}} - Instant Request
    </ion-title>
     <ion-buttons right>
       <button ion-button (click)="dismiss()">
        <ion-icon ios="ios-close-circle-outline" md="md-close-circle" ></ion-icon>
      </button>
    </ion-buttons>

  </ion-navbar>
</ion-header>


<ion-content padding class="popup-mds">

<br/>

   <ion-label style=" font-size:17px;  padding-top:10px; line-height:20px; float:left;" class="required">Select dependent</ion-label>
      <ion-item class="sel-label">
           <ion-label>Select dependent</ion-label>
              <ion-select style=" width: 100% !important; margin-right:11px !important; text-align:left; font-size:15px;" [(ngModel)]="dependentData" placeholder="Select dependent">
                <ion-option *ngFor = "let dependent of dependentLists" [value]="dependent">{{dependent.name}}
                </ion-option>
              </ion-select>
          </ion-item>
		  <br/>
          <ion-row>
          <ion-col>
      <button class="btn-warnings" color="primary" (press)="presscancel()" (click)="cancel()">Cancel</button>

    <button class="instant-bt" (press)="presssubmit()" (click)="submit()">Submit</button>
    </ion-col>
    </ion-row>


</ion-content>
<style>
.sel-label{border:1px solid #a8aaad;
    border-radius:20px; margin-right:5px !important;}
.btn-warnings{background:#025FA9 !important; height:35px;  font-size:15px; color:#fff; border-radius:20px; width:40%;
    font-weight:600;
    float: left;margin-bottom:10px;
    text-transform: capitalize;
    font-family: 'Muli', sans-serif;}
    .instant-bt{ float:right;height:35px; margin-bottom:10px;   background:#FE5722 !important;width:40%;font-size:15px;color:#fff;border-radius:20px;font-weight:600;text-transform:capitalize;font-family: 'Muli', sans-serif;}


</style>
`
})
export class InstantRequestModalPage {
  dependentLists:any;
  dependentData:any = "";
  lists:any;
  service:any="";
  lead_time:any;
  selected:boolean=false;
  vendor:any="";
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
    
    this.dependentLists = this.params.get('dependentList');
    this.lead_time = this.params.get('lead_time');
    this.service = this.params.get('service');
    if(params.get("vendor") != undefined){
      this.vendor = this.params.get("vendor").name;
    }
    
  }

  dismiss() {
    this.viewCtrl.dismiss("dismiss");
  }
  presssubmit(){
    this.submit();
  }
  presscancel(){
    this.cancel();
  }
  cancel(){
    this.dismiss();
  }
    public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  submit(){
    console.log(this.dependentData);
    if(this.dependentData != ""){
    let dependent_model = this.dependentData;
    let d = new Date();
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
   
    let time =("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
     var hours = time;   
      var n = hours.split(':');

      var minutess = (+n[0]) * 60 + (+n[1]);
       var hms = this.lead_time; 
        var a = hms.split(':'); 

        var minutes = (+a[0]) * 60 + (+a[1]);
        let getHours=(minutess + minutes)/60;
        let lead_time = (getHours.toString().split(".")[0])+":"+((minutess + minutes)%60);
    let serviceRequestData = {"problem": this.service, "datetime": lead_time, "dependentId": dependent_model.id, "mobile_no": dependent_model.mobile,"serviceType":"One time",
    "time_slot":"","from_date":"","from_time":"","preferred_time":"","to_date":"","to_time":"","instant":""};
    this.viewCtrl.dismiss(serviceRequestData);
  }else{
    this.showToaster("Please select the dependent");
    }
  }
}
