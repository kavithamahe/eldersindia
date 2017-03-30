import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityPage } from '../community/community';
import { CommunityServices } from '../../providers/community-services';

@Component({

  selector: 'page-communitylist',
  templateUrl: 'communitylist.html'
})
export class CommunitylistPage {

   // private start:number=0;
	community: String = "mycommunity";
  isAndroid: boolean = false;
  communitylists:any;
  imageUrl:any;
  uid:any;
  categoryLists:any;
  searchTerm: string = '';
  searchData:any;
  categoryName:any;
  token:any;
  id:any;
  constructor(public nav: NavController,public storage:Storage, public navParams: NavParams,platform: Platform,public toastCtrl: ToastController, public communityServices: CommunityServices ) {
     this.isAndroid = platform.is('android');
     this.searchData = "";
      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.id=id; })
      storage.get('token').then((token) => { this.token=token;
      this.myCommunity(this.searchData);
      })
    });

     
   }
  getPost(id){
    this.nav.push(CommunityPage,{community_id:id});
  }
  myCommunity(searchData){
    
      this.communityServices.myCommunity(searchData).
      subscribe(mycommunity => {
      this.communitylists = mycommunity.result.info.data;
      this.categoryLists = mycommunity.result.get.communityCategory;
  },
   err =>{
    this.communitylists =[];
    this.communityServices.showErrorToast(err);
  })

  }

  otherCommunity(searchData){

      this.communityServices.recommendedCommunity(searchData).
      subscribe(mycommunity => {
      this.communitylists = mycommunity.result.info.data;
      this.categoryLists = mycommunity.result.get.communityCategory;
  },
   err =>{
    this.communitylists =[];
    this.communityServices.showErrorToast(err);
  })

  }
  getItems(ev) {
    
    var val = ev.target.value;
    this. myCommunity(val);
   
  }
  setItems(ev) {
   
    var val = ev.target.value;
    this. otherCommunity(val);
   
  }
  getCategory(id){
   
    this.communityServices.getCommunity(id).
     subscribe(mycommunity => {
      this.communitylists = mycommunity.result.info.data;
      this.categoryLists = mycommunity.result.get.communityCategory;
  },
   err =>{
    this.communitylists =[];
    this.communityServices.showErrorToast(err);
  })

  }
  
  setCategory(id){
    this.communityServices.setCategory(id).
     subscribe(otherCommunity => {
      this.communitylists = otherCommunity.result.info.data;
      this.categoryLists = otherCommunity.result.get.communityCategory;
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
  }

  //  doInfinite(infiniteScroll:any) {
  //    console.log('doInfinite, start is currently '+this.start);
  //    this.start+=50;
     
  //   this.myCommunity().then(()=>{
  //      infiniteScroll.complete();
  //    });
     
  // }

public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }


}
