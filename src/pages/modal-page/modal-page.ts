import { Component } from '@angular/core';
import { NavParams, ViewController,LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServiceProvider } from '../../providers/service-provider';

import { Storage } from '@ionic/storage';

/*
  Generated class for the ModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
})
export class ModalContentPage {

  dependentLists:any=[];
  userType:any;
  submitAttempt:any;
  modalForm: FormGroup;

  dependent:string = "";
  elderId:any;


  constructor(public formBuilder: FormBuilder, public storage:Storage ,public loadingCtrl: LoadingController,public providerService: ServiceProvider,public params: NavParams,public viewCtrl: ViewController)
   {    
     console.log(params.get("dependentList"));
     let loading = this.loadingCtrl.create({content: 'Please wait...!'});
     loading.present();
     this.dependentLists = params.get("dependentList");
     this.modalForm = formBuilder.group({
        problem: ['',Validators.compose([Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        date: ['',Validators.compose([Validators.required])],
        time: ['',Validators.compose([Validators.required])],
        contact: ['',Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        dependents: ['',Validators.compose([Validators.required])]
        
    });
     loading.dismiss();
     // this.userType = "elder";
     storage.get('user_type').then((user_type) => { this.userType=user_type;});
     if(this.userType != 'sponsor'){

        storage.get('id').then((id) => { this.elderId=id;});
      }
   }

  submit() {

    if(!this.modalForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
      
      if(this.userType != 'sponsor'){
      this.dependent = this.elderId ;
    }else{
      this.dependent = this.modalForm.value.dependents;
    }
      
      let serviceData = {"problem": this.modalForm.value.problem, "datetime": this.modalForm.value.date+" "+this.modalForm.value.time, "dependentId": this.dependent, "mobile_no": this.modalForm.value.contact};
      console.log(serviceData);
      this.viewCtrl.dismiss(serviceData);
    } 
  }

  dismiss(){
    this.viewCtrl.dismiss("dismiss");
  }
}
