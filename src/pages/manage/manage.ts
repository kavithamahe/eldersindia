import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams,ToastController,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EldersPage } from '../elders/elders';
import { DashboardPage } from '../../pages/dashboard/dashboard';

import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
  providers:[CommunityServices]
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
  constructor(public alertCtrl: AlertController, public nav: NavController,public storage:Storage, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public communityServices: CommunityServices) {
   this.nav=nav;  
           
    }
   showConfirm(DeleteId) {
    let confirm = this.alertCtrl.create({
     subTitle: 'Confirm Deletion',
      buttons: [
        {
          text: 'Cancel',
         },
        {
          text: 'Agree',
          handler: () => {
           this.deleteElder(DeleteId);
           this.manageDetail();
          }
        }
      ]
    });
    confirm.present();
  }
  manageDetail(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
      this.communityServices.manageLists().subscribe(manages =>{
     
      this.manages=manages.result.info.data;
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
 

  editElder(elder){
    let data={"fuctionality":"edit","editData":elder};
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

   ionViewWillEnter(){
     this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('id').then((id) => { this.user_id=id;});
      this.storage.get('token').then((token) => { this.token=token; 
       this.manageDetail();
      })
    });   
  }
  public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }


}
