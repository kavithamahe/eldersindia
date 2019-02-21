import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams,LoadingController,ToastController,ModalController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from 'ionic-native';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {saveAs as importedSaveAs} from "file-saver";


import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RecurringviewPagePage } from '../../pages/recurringview/recurringview';
import { RecurringcancelPagePage } from '../../pages/recurringcancel/recurringcancel';
import { PackagepaymentPagePage } from '../../pages/packagepayment/packagepayment';

import { BlogListService } from '../../providers/blog-list-service';
import { ServiceRequestService } from '../../providers/service-request-service';
import moment from 'moment';
declare var cordova: any;
/*
  Generated class for the RecurringPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recurring',
  templateUrl: 'recurring.html',
  providers:[BlogListService,ServiceRequestService]
})
export class RecurringPagePage {
  @ViewChild(Content) content: Content;
recurringRequest:any=[];
rootUrl:any;
searchText:any="";
nextPageURL:any='';
serviceRequestScrollLists:any=[];
discountcost:any;
sortby:any="";
sr_token:any;
updated_at:any;
scrollTop:boolean = false;
  constructor(public fileOpener :FileOpener,private transfer: FileTransfer,public platform:Platform,public serviceRequest:ServiceRequestService,private file: File,public navCtrl: NavController,public modalCtrl: ModalController,public blogListService: BlogListService,public toastCtrl: ToastController,public storage:Storage, public navParams: NavParams,public loadingCtrl: LoadingController) {
  if(this.navParams.get("sr_token")){
      this.searchText =this.navParams.get("sr_token");
  }
    
    this.storage.ready().then(() => {  
  		storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
	    
	  	this.getrecurringRequest();
      });  
  	
  });
  }
    // parseFloat(value)
    // {
    //     return parseFloat(value);
    // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecurringPagePage');
  } 
  inputSearch(searchEvent){
   this.searchText = searchEvent;
   this.getrecurringRequest();
   if(this.searchText.length == 0){
    this.getrecurringRequest();
   }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
   public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
     downloadBlobToPDF(recurring) { 
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      let recreation = "0";
      this.serviceRequest.invoiceFromUser(recurring.recurring_request_id,recreation).subscribe(
    res => {
      const blob = res.blob();
      const file = new Blob([blob], {type:'application/pdf'});
      const filename = 'invoice' + Date.now() + '.pdf';
  //     importedSaveAs(file, filename);
   loader.dismiss(); 

    var blobs = new Blob([blob], {type:'application/pdf'});
   
  let filePath =  this.file.externalApplicationStorageDirectory;

    //Write the file
    this.file.writeFile(filePath, filename, blobs, { replace: true }).then((fileEntry) => {
          this.fileOpener.open(fileEntry.nativeURL, 'application/pdf')
            .then(() => {
              let url = fileEntry.nativeURL;
               const fileTransfer: FileTransferObject = this.transfer.create();

         var targetPath = cordova.file.externalRootDirectory + filename;

      cordova.plugins.DownloadManager.download(url,targetPath);
        fileTransfer.download(url, targetPath,  true ).then((entry) => {
         this.showToaster("Downloaded Succesfully"); 
        },
         (error) => {
          console.log("error");
        }); 
            })
            .catch(err => console.error('Error openening file: ' + err));
        })
          .catch((err) => {
            console.error("Error creating file: " + err);
            throw err;  
          });
   },
    (err) => { 
      loader.dismiss(); 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      })  
   
}

   paynow(service_cost,service_id,recurring_request_id){
    let service_type = "Recurring";
    this.navCtrl.push(PackagepaymentPagePage,{"service_type":service_type,"service_cost":service_cost,"service_id":service_id,"recurring_request_id":recurring_request_id,"reqstatus":"2"});
     
  }
  getrecurringRequest(){
  	// let loading = this.loadingCtrl.create({content: 'Please wait...!'});
   //  loading.present();
    this.recurringRequest = [];
    this.blogListService.getrecurringRequest(this.rootUrl,this.searchText,this.sortby)
      .subscribe(data =>{ 
        var dataList=data.result.info.data;
        for(let data of dataList) {
      data.discountcost = parseFloat(data.servicediscountcost_one_service) + parseFloat(data.final_service_cost);
      data.totalServicecost = data.service_cost * data.req_count;
      data.balanceamount = data.total_service_cost - data.paid_amount;
      data.sr_token = data.sr_token
      var str = data.sr_token;
         data.sr_tokenend = str.replace("-1" ,"");
      data.remainingamount = parseFloat(data.remaining_amount).toFixed(2);
      data.updated_at = moment(data.updated_at).format("DD-MM-YYYY HH:mm:ss");
    }
        this.recurringRequest = dataList;
        this.nextPageURL=data.result.info.next_page_url;  
        // loading.dismiss();
    },
    err =>{
      this.recurringRequest = [];
      this.blogListService.showErrorToast(err);     
      // loading.dismiss();
    })
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.recurringRequestScroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  recurringRequestScroll()
  {
    this.scrollTop = true;
    this.blogListService.recurringRequestScroll(this.nextPageURL,this.searchText,this.sortby).subscribe(
     (serviceRequestScroll) => {
       var dataList=serviceRequestScroll.result.info.data;
        for(let data of dataList) {
      data.discountcost = parseFloat(data.servicediscountcost_one_service) + parseFloat(data.final_service_cost);
      data.totalServicecost = data.service_cost * data.req_count;
      data.balanceamount = data.total_service_cost - data.paid_amount;
      data.sr_token = data.sr_token
      var str = data.sr_token;
         data.sr_tokenend = str.replace("-1" ,"");
        data.remainingamount = parseFloat(data.remaining_amount).toFixed(2);
        data.updated_at = moment(data.updated_at).format("DD-MM-YYYY HH:mm:ss");
    }
      
      //this.serviceRequestScrollLists=serviceRequestScroll.result.data; 
       for (let i = 0; i < Object.keys(dataList).length; i++) {
        this.recurringRequest.push(dataList[i]);
        }
        // this.recurringRequest = dataList;
       this.nextPageURL=serviceRequestScroll.result.info.next_page_url;     
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      }
    );
     
  }
  deleteviewrecurring(recurring){
    this.navCtrl.push(RecurringcancelPagePage,{recurringview:recurring,"bulkcomplete":"0"});
    }
    completebulkrecurring(recurring){
    this.navCtrl.push(RecurringcancelPagePage,{"recurringview":recurring,"bulkcomplete":"1"});
    }
  viewrecurring(recurring){
    this.navCtrl.push(RecurringviewPagePage,{recurringview:recurring});
  	
  }
 dashboardPage(){
    this.navCtrl.setRoot(DashboardPage);
  }
   public makeCall(number)
  {
    if(number)
    {
    CallNumber.callNumber(number, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
   }
   else
   {
    this.showToaster("There is no contact number");
   }
  }
}
