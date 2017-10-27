import { Component } from '@angular/core';
import { NavParams, ViewController,LoadingController,ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DatePicker} from 'ionic-native';
import {Platform} from 'ionic-angular';
// import { Calendar } from '@ionic-native/calendar';


import { ServiceProvider } from '../../providers/service-provider';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';
// import { Modelpage1PagePage } from '../../pages/modelpage1/modelpage1';


import { Storage } from '@ionic/storage';

/*
  Generated class for the ModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
  providers:[TermsModalPage]
})
export class ModalContentPage {
 
  dependentLists:any=[];
  lead_time:any=[];
  userType:any;
  submitAttempt:any;
  modalForm: FormGroup;
  authForm: FormGroup;
  vendor:any="";
  dependent:string = "";
  elderId:any;
  problem:any;
  terms:boolean = false;
  checkTerms:any= false;
  date:any;
  minDate:any="";
  maxDate:any="";
  theBigDay:any=new Date();
  //currentDate:any=new Date();
  searchButton:boolean=false;
  searchValue:any;
  recurring:boolean=false;
  searchValues:any;
  fixedd:boolean=false;
  searchValuess:any;
  timeslots:boolean=false;
  searchValuesss:any;
  fulldays:boolean=false;
  searchValuessss:any;
  onetimes:any;
  packageLists:any=[];
   packageListss:any=[];
  flag:any;
  location_id:any;
  service_id:any;
  vendor_id:any;
  recurringType:any;
  constructor(platform: Platform,public modalCtrl: ModalController, public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {    
   
     this.date = new Date().toISOString();
      console.log(params.get("vendor"));
     this.dependentLists = params.get("dependentList");
     //this.dependents = this.dependentLists[0].id;
     this.lead_time = params.get("lead_time");
     this.location_id = params.get("location_id");
     if(params.get("serviceData") != undefined){
     this.service_id = this.params.get("serviceData").service_id;
     }
     if(params.get("vendor") != undefined){
      this.vendor = this.params.get("vendor").name;
      this.vendor_id = this.params.get("vendor").vendor_id;
      //this.recurringType = this.params.get("vendor").recurring;
    }
    this.modalForm = formBuilder.group({
     problem: ['',Validators.compose([Validators.required])],
        date: ['',Validators.compose([Validators.required])],
        time: ['',Validators.compose([Validators.required])],
        contact: ['',Validators.compose([Validators.minLength(10),Validators.maxLength(12), Validators.pattern('[0-9]*'), Validators.required])],
        //dependents: ['',Validators.compose([Validators.required])]
        startdate:['',Validators.compose([Validators.required])],
        enddate:['',Validators.compose([Validators.required])],
        fromtime:['',Validators.compose([Validators.required])],
        totime:['',Validators.compose([Validators.required])],
        preferredtime:['',Validators.compose([Validators.required])],
    });
 this.authForm = formBuilder.group({
   dependents: ['',Validators.compose([Validators.required])]
 })
  
     storage.get('user_type').then((user_type) => { this.userType=user_type;});
     if(this.userType != 'sponsor'){

        storage.get('id').then((id) => { this.elderId=id;});
      }

   }
   

   termsChanged(){
     console.log(this.terms);
     if(this.terms == true){
       this.checkTerms = false;
     }else{
       this.checkTerms = true;
     }
   }
onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  onetime(searchValue){
    this.recurring=false;
     this.searchButton=!searchValue;
   }
   recurringtime(searchValues){
    this.searchButton=false;
     this.recurring=!searchValues;
   }
     fixed(searchValuess){
      this.timeslots=false;
       this.fulldays=false;
     this.fixedd=!searchValuess;
   }
    timeslot(searchValuesss){
      this.fixedd=false;
      this.fulldays=false;
     this.timeslots=!searchValuesss;
   }
   fullday(searchValuessss){
    this.timeslots=false;
     this.fixedd=false;
      this.fulldays=!searchValuessss;
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
   packageinfo(){
    
    this.providerService.packageListsInfo(this.location_id,this.service_id,this.authForm.value.dependents,this.vendor_id)
      .subscribe(data =>{ 
        this.packageLists=data.result.info.lists;
        //this.packageLists =this.packageListss[1];
        this.flag="1";
        console.log(this.packageLists);       
    },

    (err) => { 
        console.log("you can not login");
        //this.packageLists='';
        this.flag="0";
    },)
   }
// submit(){
//        if(this.userType == 'sponsor'){
//        if(!this.authForm.valid || (this.terms == false)){
//           this.submitAttempt = true;
//            if(this.terms == false){
//             this.checkTerms = true;
//           }
//        }
//        else{
//           this.submitAttempt = false;
      
//       if(this.userType != 'sponsor'){
//       this.dependent = this.elderId ;
//     }else{
//       this.dependent = this.authForm.value.dependents;
//     }
      
//       let serviceDatas = {"problem": this.modalForm.value.problem, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
//       console.log(serviceDatas);
//       let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceDatas});
//    serviceModal.present();
//        }
//      }
// else{
//     if(!this.modalForm.valid || (this.terms == false)){
//       this.submitAttempt = true;
//       this.providerService.showToast("Please Enter The Required Fields");
//           if(this.terms == false){
//             this.checkTerms = true;
//           }
//     }else{
//       this.submitAttempt = false;
      
//       if(this.userType != 'sponsor'){
//       this.dependent = this.elderId ;
//     }else{
//       this.dependent = this.authForm.value.dependents;
//     }
//  let serviceDatas = {"problem": this.modalForm.value.problem, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
    
//    let serviceModal = this.modalCtrl.create(Modelpage1PagePage,{"serviceDatas":serviceDatas});
//    serviceModal.present();
//      }
// }
// }
  submit() {
      if(this.searchButton == true){
        this.onetimes = "One time";
      }else{
        this.onetimes = "Recurring";
      }
      console.log(this.onetimes);
    console.log(this.onetime);
     if(this.userType == 'sponsor'){
       if(!this.authForm.valid || (this.terms == false)){
          this.submitAttempt = true;
           if(this.terms == false){
            this.checkTerms = true;
          
          }
       }
       else{
          this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
    
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time,
       "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact,"durations":"",
       "exclude_days":"","from_date":this.modalForm.value.startdate,"from_time":this.modalForm.value.fromtime,"quantity":"","selected_dates":"",
       "serviceType":this.onetimes,"time_slot":this.modalForm.value.preferredtime,"to_date":this.modalForm.value.enddate,"to_time":this.modalForm.value.totime,"package_id":this.packageLists[0]};
      console.log(serviceData);
      this.viewCtrl.dismiss(serviceData);
       }
     }
else{
    if(!this.modalForm.valid || (this.terms == false)){
      this.submitAttempt = true;
      this.providerService.showToast("Please Enter The Required Fields");
          if(this.terms == false){
            this.checkTerms = true;
          }
    }else{
      this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.authForm.value.dependents;
    }
      
       let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date,"preferred_time":this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
       console.log(serviceData);
       this.viewCtrl.dismiss(serviceData);
     }
 }
      
    
  
  }
edit(){
if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }
     let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
      console.log(serviceData);
      this.viewCtrl.dismiss(serviceData);
}
  dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }
}
