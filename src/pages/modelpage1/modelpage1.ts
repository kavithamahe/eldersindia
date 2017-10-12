import { Component } from '@angular/core';
import { NavController,NavParams, ViewController,LoadingController,ModalController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceProvider } from '../../providers/service-provider';
import { SubcategoryListPage } from '../../pages/subcategory-list/subcategory-list';


import { Storage } from '@ionic/storage';

/*
  Generated class for the Modelpage1Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modelpage1',
  templateUrl: 'modelpage1.html'
})
export class Modelpage1PagePage {

  dependentLists:any=[];
  lead_time:any=[];
  userType:any;
  submitAttempt:any;
  modalForm: FormGroup;
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
  serviceDatas:any;
  constructor(public modalCtrl: ModalController,public nav: NavController,public navParams: NavParams, public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
{    // this.minDate=new Date();
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
    this.serviceDatas =  navParams.get("serviceDatas");
    console.log(this.serviceDatas);
    this.modalForm = formBuilder.group({
     problem: ['',Validators.compose([Validators.required])],
        date: ['',Validators.compose([Validators.required])],
        time: ['',Validators.compose([Validators.required])],
        //contact: ['',Validators.compose([Validators.minLength(10),Validators.maxLength(12), Validators.pattern('[0-9]*'), Validators.required])],
        //dependents: ['',Validators.compose([Validators.required])]
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Modelpage1PagePage');
  }
  submit() {
   

      
      let serviceData = {"problem": this.serviceDatas.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.serviceDatas.dependentId, "mobile_no": this.serviceDatas.mobile_no};
      console.log(serviceData);
      this.nav.push(SubcategoryListPage,{"serviceData":serviceData});
    
}
}
