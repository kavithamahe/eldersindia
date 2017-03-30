import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams,ToastController  } from 'ionic-angular';

import { EldersPage } from '../elders/elders';

import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {
  manageLists:boolean;
  managesLists:boolean;
  public manages:any;
  showblock:string = null;
  education:any;
  adds:any;
  elder:any;



  constructor(public nav: NavController, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public communityServices: CommunityServices) {
   this.nav=nav;
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
       this.manageDetail();
      loader.dismiss();
     
    }

  manageDetail(){
      this.communityServices.manageLists().subscribe(manages =>{
     
      this.manages=manages.result.info.data;
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
   }

  toggleDetails(event) {
     
    if (this.showblock == null) {
        this.showblock = event;
    } else {
       this.showblock = null;
    }

  }

    
  addElder(){
    let data={fuctionality:"add"};
    this.nav.push(EldersPage,data);
  }
 

  editElder(editData){
    let data={fuctionality:"edit","editData":editData};
    this.nav.push(EldersPage,data);
  }


  deleteElder(id){
    this.communityServices.deleteDetail(id).subscribe(datas =>{
     this.showToast(datas.result);
     },
     err =>{
          this.communityServices.showErrorToast(err);
      })
  }


  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 3000
      });
      toast.present();
   }


}
