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
show_option:boolean =false;

  manageLists:boolean;
  managesLists:boolean;
  manages:any=[];
  showblock:string = null;
  education:any;
  adds:any;
  elder:any;
  imageUrl:any;
  user_id:any;
  token:any;
  allowedElderFlag:any=true;
  constructor(public alertCtrl: AlertController, public nav: NavController,public storage:Storage, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public communityServices: CommunityServices) {
   this.nav=nav;  
           
    }
   showConfirm() {
     let DeleteId = this.manage_elder.id;
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
      this.allowedElderFlag=manages.result.allowedElderFlag;
      loader.dismiss();
     },
     (err) => {   
        this.manages=[]; 
        this.showToast(JSON.parse(err._body).error.error_msg);
        this.allowedElderFlag=JSON.parse(err._body).error.allowedElderFlag;             
        loader.dismiss();
      }
     );
      
   }
manage_elder:any;

   showOptions(user){
     this.manage_elder = user;
     console.log("options are pressed");
     if(this.show_option == false){
       this.show_option = true;
     }
   }
   closeOption(){
     if(this.show_option == true){
       this.show_option = false;
     }
     
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
 

  editElder(){
    let elder = this.manage_elder;
    let data={"fuctionality":"edit","editData":elder};
    this.nav.push(EldersPage,data);
  }


  deleteElder(id){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.communityServices.deleteDetail(id).subscribe(datas =>{
     this.showToast(datas.result);
     //this.closeOption();
     this.manageDetail();
     loader.dismiss();
     },
     err =>{
          this.communityServices.showErrorToast(err);
          loader.dismiss();
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
