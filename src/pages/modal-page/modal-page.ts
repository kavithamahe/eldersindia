import { Component } from '@angular/core';
import { NavParams, ViewController,LoadingController,ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceProvider } from '../../providers/service-provider';
import { TermsModalPage } from '../../pages/terms-modal/terms-modal';

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

  constructor(public modalCtrl: ModalController, public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {    
    // this.minDate=new Date();
    // this.maxDate=(new Date().getFullYear() +40)+"-12-31";
     this.date = new Date().toISOString();
    //  let formalDate = new Date(this.currentDate.getFullYear()+5);
    // this.currentDate=this.currentDate.setDate(formalDate.getFullYear()+"-"+formalDate.getMonth()+"-"+formalDate.getDate());
     // this.currentDate=this.currentDate.getFullYear()+3;
    // console.log("date"+this.currentDate.setDate(formalDate.getFullYear()+5).toISOString());
     console.log("this is modal page");
     console.log("modal content page",params.get("vendor"));
     //let loading = this.loadingCtrl.create({content: 'Please wait...!'});
     //loading.present();
     this.dependentLists = params.get("dependentList");
     this.lead_time = params.get("lead_time");
     if(params.get("vendor") != undefined){
      this.vendor = this.params.get("vendor").name;
    }
    this.modalForm = formBuilder.group({
     problem: ['',Validators.compose([Validators.required])],
        date: ['',Validators.compose([Validators.required])],
        time: ['',Validators.compose([Validators.required])],
        contact: ['',Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        //dependents: ['',Validators.compose([Validators.required])]
    });
 this.authForm = formBuilder.group({
   dependents: ['',Validators.compose([Validators.required])]
 })
  

    // loading.dismiss();
     // this.userType = "elder";
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

  submit() {
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
      
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
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
      
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
      console.log(serviceData);
      this.viewCtrl.dismiss(serviceData);
    }
}
      
    
  
  }
// edit(){
// if(this.userType != 'sponsor'){
//       this.dependent = this.elderId ;
//     }
//      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
//       console.log(serviceData);
//       this.viewCtrl.dismiss(serviceData);
// }
  dismiss(){
      this.viewCtrl.dismiss("dismiss");
  }
}
