import { Component } from '@angular/core';
import { LoadingController, ViewController, NavController, NavParams, AlertController,ToastController,ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ServiceInfoPage } from '../service-info/service-info';
import { ModalContentPage } from '../modal-page/modal-page';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ServiceProvider } from '../../providers/service-provider';
import { ServicerequestPage } from '../../pages/servicerequest/servicerequest';
import { ServiceModalPage } from '../service-modal/service-modal';

import moment from 'moment';
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

  subcategory_id: any;
  vendor_id: any;
  flagId: any;
  serviceOffered: any;
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
  service_cost:any;
  paystatus:any;
  vendorList:any=[];
  availability:any;
  balanceRecreationService:any;
  get_Servicedependentlist:any;
  booking_status:any;
  totalServicecost:any;
  template_id:any;
  is_recreation_config:any;
  recreation_config:any;
  constructor( public loadingCtrl: LoadingController, public providerService: ServiceProvider, public navCtrl: NavController, public altCtrl:AlertController, public navParams: NavParams,public toastCtrl: ToastController,public modalCtrl: ModalController, public mp:ModalContentPage, public storage:Storage) {
    this.date = new Date().toISOString();
    this.paystatus = navParams.get("status");
    if(this.paystatus == "1"){
      this.location_id = navParams.get("location_id");
      this.service_id = navParams.get("service_id");
    }
    else{
      this.location_id = navParams.get("location_id");
      this.service_id = navParams.get("service").id;
      this.serviceTitle = navParams.get("service").name;
      this.serviceOffered =  navParams.get("serviceOffereds"); 
      this.recreation_config = navParams.get("recreation_config"); 
      if(this.recreation_config == '1'){
        this.flagId = "3";
      }
      else{
        this.flagId = "1";
      }
    }
    
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
    getVendorDetails(vendor_id,subcategory_id,template_id,is_recreation_config){
       let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
      let servieListData = {"vendor_id": vendor_id, "subCategoryId": this.service_id, "flag": this.flagId, "location_id": this.location_id,"category_name":this.serviceOffered,
      "template_id":template_id,"is_recreation_config":is_recreation_config};
      this.providerService.webServiceCall(`getVendorDetails`,servieListData)
      .subscribe(
        data =>{
                 this.vendorList = data.result.info;
                 this.booking_status=this.vendorList.requestServices.booking_status;
                 loading.dismiss();
        },
        err =>{
          loading.dismiss();
                 this.providerService.showErrorToast(err);
              })
      
    }
     
loadSubcategoryList(subCategory_id,location_id){
 
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
      loading.present();
      this.subCategorydata = {subCategoryId : subCategory_id, flag:this.flagId, locationId : location_id};
      // this.providerService.loadServiceProviderList(this.subCategorydata)
      this.providerService.webServiceCall(`getServiceProviderlist`,this.subCategorydata)
          .subscribe(data =>{
                            this.sublists = data.result.info.lists;
                            var dataList=data.result.info.lists;
          for(let data of dataList) {
            data.id = data.id;
            this.storage.set('vendor_id', data.id);
            if(data.percentage_cost.length != undefined){
              data.percentage_cost = (data.percentage_cost).replace(',', '');
            }
          }
          this.sublists = dataList;
          console.log(this.sublists);
                            this.dependentLists = data.result.info.dependentLists;
                            this.serviceData = data.result.info.requestServices;
                            this.subcategory_id = this.serviceData.sub_category_id;
                            // this.totalServicecost = (data.result.info.lists[0].service_cost - data.result.info.lists[0].service_cost);
                            this.lead_time =data.result.info.lists[0].lead_time;
                            this.vendor_id = data.result.info.lists[0].id;
                            this.template_id = data.result.info.lists[0].template_id;
                            console.log(this.template_id);
                            this.is_recreation_config = data.result.info.lists[0].is_recreation_config
                            this.availability = data.result.info.lists[0].availability;
                            this.balanceRecreationService = data.result.info.lists[0].balanceRecreationService;
                            
                            this.getVendorDetails(this.vendor_id,this.subcategory_id,this.template_id,this.is_recreation_config);

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

bookNow(schedule_cost,service_cost,id,template_id){
  console.log(this.template_id);
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","bookNow":"1",vendorList:this.vendorList,schedule_cost:schedule_cost,service_cost:service_cost,location_id:this.location_id,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":id,"template_id":this.template_id});    
}
emergencybook(schedule_cost,service_cost,id,template_id){
  console.log(this.template_id);
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","emergencybook":"1",vendorList:this.vendorList,schedule_cost:schedule_cost,service_cost:service_cost,location_id:this.location_id,"safecategory":"2","booking_status":this.booking_status,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":id,"template_id":this.template_id});    
}
transportationdriver(schedule_cost,service_cost,id,template_id){
  console.log(this.template_id);
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","transportationdriver":"1",vendorList:this.vendorList,schedule_cost:schedule_cost,service_cost:service_cost,location_id:this.location_id,"safecategory":"2","booking_status":this.booking_status,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":id,"template_id":this.template_id});    
}
transportationcab(schedule_cost,service_cost,id,template_id){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","transportationcab":"1",vendorList:this.vendorList,schedule_cost:schedule_cost,service_cost:service_cost,location_id:this.location_id,"safecategory":"2","booking_status":this.booking_status,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":id,"template_id":this.template_id});    
}
homemodify(schedule_cost,service_cost,id,template_id){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","homemodify":"1",vendorList:this.vendorList,schedule_cost:schedule_cost,service_cost:service_cost,location_id:this.location_id,"safecategory":"2","booking_status":this.booking_status,"availability":this.availability,"balanceRecreationService":this.balanceRecreationService,"vendor_id":id,"template_id":this.template_id});    
}
preBook(schedule_cost,service_cost,id,template_id){
  this.navCtrl.push(ServiceModalPage,{service:"Schedule","preBook":"1",vendorList:this.vendorList,schedule_cost:schedule_cost,service_cost:service_cost,location_id:this.location_id,"safecategory":"1","booking_status":this.booking_status,"vendor_id":id,"template_id":template_id});
}
serviceInfomore(vendor){
   let servieListData = {"vendor": vendor, "subCategoryId": this.service_id,status:"1" ,"flag":this.flagId, "location_id": this.location_id,"serviceOffered":this.serviceOffered,"moreinfovendor":"1"};
    this.navCtrl.push(ServiceInfoPage,servieListData);
}
  serviceInfo(vendor){
    let servieListData = {"vendor": vendor, "subCategoryId": this.service_id,status:"1" ,"flag":this.flagId, "location_id": this.location_id,"serviceOffered":this.serviceOffered};
    this.navCtrl.push(ServiceInfoPage,servieListData);
  }
pressinstant(vendorData){
  this.instantRequest(vendorData);
}
  instantRequest(vendorData) {
      this.providerService.getServicedependentlist(vendorData.id)
      .subscribe(data =>{ 
        this.get_Servicedependentlist = data.result;
        console.log(this.get_Servicedependentlist);
             if(this.get_Servicedependentlist !=  0){
      this.providerService.showToast("You have not paid previous availed service,please pay and request new services");
    }
    else{
      this.instant_request(vendorData);
    }
    })
   
  }
  instant_request(vendorData){
     if(this.userType != "sponsor"){ 
      if(vendorData.lead_time == "00:00")
      {
        vendorData.lead_time = "01:00";
      }
       this.date = new Date().toISOString();
     this.date = moment(this.date).format("DD-MM-YYYY");
      this.service_cost = vendorData.service_cost - vendorData.percentage_cost;
      let d = new Date();
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    let time =("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
     var hours = time;   
      var n = hours.split(':');

      var minutess = (+n[0]) * 60 + (+n[1]);
       var hms = vendorData.lead_time; 
        var a = hms.split(':'); 

        var minutes = (+a[0]) * 60 + (+a[1]);
        let getHours=(minutess + minutes)/60;
        let lead_time = (getHours.toString().split(".")[0])+":"+((minutess + minutes)%60);

    let serviceRequestData = {"problem": this.serviceTitle, "datetime": this.date, "dependentId": this.elderId, "mobile_no": "","serviceType":"One time",

    "time_slot":"","from_date":"","from_time":"","preferred_time":"lead_time","to_date":"","to_time":"","instant":"","base_cost":vendorData.service_cost,"service_cost":this.service_cost,
    "lead_time":vendorData.lead_time};

    
            this.serviceRequestCall(serviceRequestData,vendorData.id,);
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
      this.modal.onDidDismiss(data =>{
      if(data == "dismiss"){
        console.log(" schedule request modal dismissed..!");
      }else{
       this.serviceRequestCall(data,vendorData.id);
      }
    })
    
    this.modal.present();
    }else{
      this.navCtrl.push(ModalContentPage,{dependentList:this.dependentLists,lead_time:vendorData.lead_time,vendor:vendorData,location_id:this.location_id,serviceData:this.serviceData,serviceTitle:this.serviceTitle});

    }
    this.scheduleModal=modalPage;

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
    if(service_request_data != "1"){
      let loading = this.loadingCtrl.create({content: 'Please wait...!'});
    loading.present();
   if(this.scheduleModal != "instant"){

    let requestServiceData = {"category":this.serviceData.category,"service":this.serviceData.service,
    "category_id":this.serviceData.category_id,"location_id":this.location_id,"vendor_id":vendorId,
     "sub_category_id":this.serviceData.sub_category_id,"datCount":service_request_data.datCount,
      "service_id":this.serviceData.service_id, "problem":service_request_data.problem,
     "datetime":"","preferred_time":"", "dependentid":service_request_data.dependentId,
      "mobile":service_request_data.mobile_no,"lead_time":"00:00","base_cost":service_request_data.base_cost,
      "subcategory":this.serviceData.subcategory, "durations":service_request_data.durations,"service_cost":service_request_data.service_cost,
       "exclude_days":service_request_data.exclude_days,"from_date":service_request_data.from_date,"from_time":service_request_data.from_time,"quantity":"",
       "selected_dates":service_request_data.selected_dates,"serviceType":service_request_data.serviceType,"time_slot":service_request_data.time_slot,
       "to_date":service_request_data.to_date,"to_time":service_request_data.to_time,
     "package_id":service_request_data.package_id,"instant":service_request_data.instant,"paymentflag":1}


    this.providerService.webServiceCall(`serviceRequestSubmitbeforePayLater`,requestServiceData)
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
     "sub_category_id":this.serviceData.sub_category_id,"base_cost":service_request_data.base_cost,"service_cost":service_request_data.service_cost,
      "service_id":this.serviceData.service_id, "problem":service_request_data.problem,
     "datetime":service_request_data.datetime,"preferred_time":service_request_data.preferred_time, "dependentid":service_request_data.dependentId,
      "mobile":service_request_data.mobile_no,"lead_time":service_request_data.lead_time,
      "subcategory":this.serviceData.subcategory, "durations":service_request_data.durations,
     "exclude_days":service_request_data.exclude_days,"from_date":service_request_data.from_date,"from_time":service_request_data.from_time,"quantity":"",
     "selected_dates":service_request_data.selected_dates,"serviceType":service_request_data.serviceType,"time_slot":service_request_data.time_slot,"to_date":service_request_data.to_date,"to_time":service_request_data.to_time,
     "package_id":service_request_data.package_id,"instant":service_request_data.instant,"paymentflag":1}
     
    this.providerService.webServiceCall(`serviceRequestSubmitbeforePayLater`,requestServiceData)
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
    
  }
  contactNow(id){
    this.navCtrl.push(ServiceModalPage,{service:"Schedule","contact":"1",vendorList:this.vendorList,location_id:this.location_id,"vendor_id":id,"template_id":this.template_id});
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
              <ion-select style=" width: 100% !important; margin-right:11px !important; text-align:left; font-size:15px;" [(ngModel)]="dependentData">
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
  base_cost:any="";
  service_cost:any="";
  date:any;
  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
     this.date = new Date().toISOString();
     this.date = moment(this.date).format("DD-MM-YYYY");
    this.dependentLists = this.params.get('dependentList');
    // this.lead_time = this.params.get('lead_time');
    this.service = this.params.get('service');
    if(params.get("vendor") != undefined){
      this.vendor = this.params.get("vendor").name;
      this.lead_time = this.params.get('vendor').lead_time;
      this.base_cost = this.params.get("vendor").service_cost;
      this.service_cost = (this.params.get("vendor").service_cost) - (this.params.get("vendor").percentage_cost);
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

    if(this.dependentData != ""){
       if(this.lead_time == "00:00"){
      this.lead_time = "01:00";
      console.log(this.lead_time);
    }
    console.log(this.lead_time);
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
    let serviceRequestData = {"problem": this.service, "datetime": this.date, "dependentId": dependent_model.id, "mobile_no": dependent_model.mobile,"serviceType":"One time",

    "time_slot":"","from_date":"","from_time":"","preferred_time":lead_time,"to_date":"","to_time":"","instant":"","base_cost":this.base_cost,"service_cost":this.service_cost,"lead_time":this.lead_time};

    this.viewCtrl.dismiss(serviceRequestData);
  }else{
    this.showToaster("Please select the dependent");
    }
  }
}
