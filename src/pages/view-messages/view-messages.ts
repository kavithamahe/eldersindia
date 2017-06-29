import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController,ToastController,Platform,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesService } from '../../providers/messages-service';

import { CommunityprofilePage } from '../../pages/communityprofile/communityprofile';
import { CreateMessagePage } from '../../pages/create-message/create-message';
import { MessagesPage } from '../../pages/messages/messages';
import { InAppBrowser } from 'ionic-native';
declare var cordova: any;

/*
  Generated class for the ViewMessages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-messages',
  templateUrl: 'view-messages.html',
  providers:[MessagesService]
})
export class ViewMessagesPage {
 @Input('progress') progress;
messages:any;
token:string;
imageUrl:string;
veiwMessagesInfo:any=[];
attachmentInfo:any=[];
file_path:any;
messageId:any;
toAddress:any;
subject:any;
message:any;
viewType:any;
rootUrl:any;
downloadProgress:any;
  constructor(public platform: Platform,private transfer: Transfer,private filePath: FilePath,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl:AlertController,public modalCtrl: ModalController,public messagesService:MessagesService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  //	this.messages="inbox";
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      this.messageId=navParams.get("messageId");
      this.viewType=navParams.get("viewType");
  		this.onInit(this.messageId,this.viewType);
      })
      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      });

  	});
  }

  onInit(messageId,viewType)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.viewMessages(messageId,viewType).subscribe(
     (viewMessages) => {
      this.veiwMessagesInfo=viewMessages.result.details;
      this.attachmentInfo=viewMessages.result.attachments;
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
        loader.dismiss();
      }
    );    
  }
//  downloadFile(file_path,file_name) {
// console.log("Source file path  "+ file_path);
//         this.platform.ready().then(() => {
            
//   const fileTransfer: TransferObject = this.transfer.create();
//   //const url = this.rootUrl + file_path;
//   var uri = encodeURI(this.rootUrl + file_path);
//   console.log("constructed url =" + uri);
//   var targetPath = cordova.file.externalRootDirectory + file_name;
//    //var targetPath = "file:///storage/emulated/0/Download/" + file_name;
//    console.log("target"+targetPath);
//   fileTransfer.download(uri,targetPath,true).then((entry) => {
//     console.log("success");
//     console.log("download complete:" + entry.toURL());
//    this.showToaster("Downloaded Succesfully"); 
//   },
//    (error) => {
//     console.log("error");
//   });
//          });

//   }
 downloadFile(file_path,file_name) {
console.log("Source file path  "+ file_path);
        this.platform.ready().then(() => {
            
  const fileTransfer: TransferObject = this.transfer.create();
  const url = "http://52.91.174.4:8096/" + file_path;
  console.log("constructed url =" + url);
  
   var targetPath = cordova.file.externalRootDirectory + file_name;
   console.log("target"+targetPath);
  fileTransfer.download(url, targetPath,  true ).then((entry) => {
    console.log("success");
    console.log("download complete:" + entry.toURL());
   this.showToaster("Downloaded Succesfully"); 
  },
   (error) => {
    console.log("error");
  }); 

         });

  }

 
public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  public CommunityUserWall(profile_uid)
  {
    this.navCtrl.push(CommunityprofilePage,{profile_uid});
  }
  public messageReply(to,subject,sender_id)
  {
    let msgObject={"to":to,"subject":subject,"id":sender_id};
   // this.navCtrl.setRoot(CreateMessagePage,msgObject);
    this.navCtrl.push(CreateMessagePage,msgObject);
  }
  public messageForward(subject,message)
  {
    let msgObject={"subject":subject,"message":message};
    //this.navCtrl.setRoot(CreateMessagePage,msgObject);
    this.navCtrl.push(CreateMessagePage,msgObject);
  }
  deleteMessage(messageId,viewType)
  {
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.deleteMessage(messageId,viewType).subscribe(
     (deleteMessage) => {
       this.showToaster(deleteMessage.result);
      let viewObj={"viewType":viewType}; 
      this.navCtrl.setRoot(MessagesPage,viewObj);
      loader.dismiss();
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
        loader.dismiss();
      }
    );
    
  }

}
