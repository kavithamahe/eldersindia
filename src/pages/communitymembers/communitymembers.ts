import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CommunityprofilePage } from '../communityprofile/communityprofile';



/*
  Generated class for the Communitymembers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-communitymembers',
  templateUrl: 'communitymembers.html'
})
export class CommunitymembersPage {
 members:any;
 member_profiles = [];
 token:any;
 imageUrl:any;
  constructor(public nav: NavController, public navParams: NavParams,public storage:Storage) {
  	this.nav=nav;

  	 this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; });
    });
  	  this.members = navParams.get("members");
  	  this.member_profiles = this.members.members;

  }
   membersProfile(id){
     this.nav.push(CommunityprofilePage,{profile_uid:id});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunitymembersPage');
  }

}
