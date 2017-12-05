import { Component } from '@angular/core';
import { ViewController,NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TermsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms-modal',
  templateUrl: 'terms-modal.html'
})
export class TermsModalPage {

description:any;
show_description:any = false;
show_details:any=null;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsModalPage');
    this.description = 'These Terms of Use set out the terms and conditions under which individuals may use the website or mobile application and access the services offered by CareGuide Inc. ("CareGuide"). These Terms of Use comprise a legal agreement between CareGuide and you, the person accessing and using the website or mobile application ("You" or "User"). CareGuide owns, operates and maintains the CareGuide.com website at careguide.com, other subsidiary websites, including sitter.com (collectively referred to as "Website"), and the Sitter.com mobile application ("App"), Website and App collectively referred to as the "Platform". By downloading, accessing and/or using the Platform, you are deemed to have read Terms of Use and you agree to be bound by the Terms of Use which shall govern your access and use of the Platform and all applicable laws and regulations.';
  }
  toggleContent(){
    if(this.show_description == false){
      this.show_description = true;
    }else{
      this.show_description = false;
    }
  }
  
  show(event){
    if(this.show_details == event){
      this.show_details = null;
    }else{
      this.show_details = event;
    }
  }

  accept(){
    this.viewCtrl.dismiss("true");
  }

  dismiss(){
this.viewCtrl.dismiss("dismiss");
  }

}
