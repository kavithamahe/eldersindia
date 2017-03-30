import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams,ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EldersPage } from '../elders/elders';

import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {
  manageLists:boolean;
  managesLists:boolean;
  manages:any;
  showblock:string = null;
  education:any;
  adds:any;
  elder:any;
  imageUrl:any;
  user_id:any;
  token:any;
  constructor(public nav: NavController,public storage:Storage, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public communityServices: CommunityServices) {
   this.nav=nav;
   this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
       this.manageDetail();
      })
    });   
           
    }

  manageDetail(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
      this.communityServices.manageLists().subscribe(manages =>{
     
      this.manages=manages.result.info.data;
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
      loader.dismiss();
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
