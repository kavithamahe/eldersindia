import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams} from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';

import { ServiceProvider } from '../../providers/service-provider';
import {FormBuilder,FormGroup,Validators,FormArray} from '@angular/forms';
import { CommunityServices } from '../../providers/community-services';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ManagePage } from '../../pages/manage/manage';
import moment from 'moment';

@Component({
  selector: 'page-elders',
  templateUrl: 'elders.html',
  providers:[CommunityServices]
})
export class EldersPage {
  headers:any;
  options:any;
authForm : FormGroup;
myForm : FormGroup;
base64Image:any;
avatar:any='';
title:any;
submitAttempt:any;
  //---------------add functionality start-----------------------//

functionalArea:any;
educations:any=[];
specializations:any=[];
locations:any=[];
areaOfInterest:any;
blog_category:any;
service_category:any;
servicesubcategory:any=[];
servicesubcategorylist:any;
servicecategory:any;
blog_interest:any;
in_service:any;
relations:any=[];
functionality:String = "";
sponser_id:any;

  emergency_name = [];
  emergency_no =[];
  elderGraduation=[];
  
  area_interest:any;
  tags:any;
  industry_experience:any = [{year:""}];
  functional_duration:any ="";
  sponsor_id:any;
  mobile:any="";
  elder_email:any="";
  elder_password:any="";
  elder_id:any="";
  elder_relation:any="";
  elder_name:any="";
  last_name:any="";
  hobbies:any="";
  allergic:any="";
  elder_service:any="";
  elder_number:any="";

  elder_dob:any="";
  elder_address:any="";
  elder_location:any="";
  emergency_numbers:any;
  job_interest:boolean;
  area_of_interest:any="";
  job_type:any="";
  skill_set=[];
  skills=[];
  experience_industry=[];
  experience_years=[];
  experience_duration=[];

  education_graduation=[];
  education_specialization=[];
  education_college=[];
  graduationOther=[];
  specialization_other=[];
  specializationsOther:any;
  

  emergency_list=[];
  experience_list=[];
  education_list=[];

  blog_categoryinterest=[];
  blog_data:any;
  serviceCategory_interests=[];
  servicecategoryinterest_data:any;
  areaofinterestdata=[];
  area_of_interest_data:any;
  industry_set=[];
  elder_skills=[];
  elder_emergency=[];
  elder_experience=[];
  elder_education=[];
  imageUrl:any;
  user_id:any;
  token:any;
  elderInfo:any;
//-------------------END---------------------------------//


//------------------Edit Functionality start------------------------//
manageDependentData:any=[];

education_data:any;
experience_data:any;
emergency_data:any;
skill_data:any;
mytype:string ="password";
 file_path:any;
  nativepath: any='';
  file_name:any;
  other:any;
  avatar1:any="";
  
//-----------------------END-------------------//

  constructor(public providerService:ServiceProvider, public nav: NavController, public storage:Storage, public formBuilder: FormBuilder, public navParams: NavParams, public communityServices: CommunityServices,public loadingCtrl: LoadingController ) {

      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});

      storage.get('user_type_id').then((id) => { this.sponsor_id=id;});

      storage.get('token').then((token) => { this.token=token; 
         this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
        this.getElderMasterDetails();
        this.functionality=navParams.get("fuctionality");
       // console.log(navParams.get("editData"));
      if(this.functionality == 'edit'){
          this.title = "Edit Elder Details"
          if(navParams.get("editData")!= null){
            // let dependent = navParams.get("editData");
            this.loadManageDependentData(navParams.get("editData").id);
         }
        }else if(this.functionality == 'profileEdit'){
          this.title = "Profile Edit"
          console.log("....edit profile..",navParams.get('profileData'));
          this.loadForm(navParams.get('profileData'));
        }else{
          this.title = "Elder Onboarding";
        }
      })
      
    }); 
    // this.today = "";
     
     this.job_interest=false;
     
         
  // }
  if(navParams.get("fuctionality") !="profileEdit"){
    
        this.authForm = formBuilder.group({
        elder_relation : ['', Validators.compose([Validators.required])],
        elder_name : ['', Validators.compose([ Validators.maxLength(30), 
              ,Validators.required])],
        last_name: ['', Validators.compose([ Validators.maxLength(30), 
              ,Validators.required])],
       
        //elder_service : ['', Validators.compose([Validators.required])],
        elder_number : ['', Validators.compose([Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(12),Validators.required])],
        elder_address: ['', Validators.compose([Validators.required])],
        elder_dob : ['', Validators.compose([Validators.required])],
        // elder_email: ['', Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
        // elder_password:['', Validators.compose([Validators.required])],
        elder_location: ['', Validators.compose([Validators.required])],
        
         emergency_list: this. formBuilder.array([
                this.emergencyAddress(),
            ]),
        // education_graduation: ['', Validators.compose([Validators.required])],
        // education_specialization: ['', Validators.compose([Validators.required])],
        // education_college: ['', Validators.compose([Validators.required])],
        // experience_industry: ['', Validators.compose([Validators.required])],
        // experience_years: ['', Validators.compose([Validators.required])],
        // experience_duration: ['', Validators.compose([Validators.required])],
       /* emergency_numbers: ['', Validators.compose([Validators.required])],
        experienceYears: ['', Validators.compose([Validators.required])],
        college: ['', Validators.compose([Validators.required])],
        elderGraduation: ['', Validators.compose([Validators.required])],
        elderSpecialization: ['', Validators.compose([Validators.required])],
        functional_area: ['', Validators.compose([Validators.required])],
        functional_duration: ['', Validators.compose([Validators.required])]*/
       
       
              });
  }
  else
  {
        this.authForm = formBuilder.group({
        elder_relation : ['', Validators.compose([])],
        elder_name : ['', Validators.compose([ Validators.maxLength(30), 
              Validators.required])],
        last_name: ['', Validators.compose([ Validators.maxLength(30), 
              ,Validators.required])],
       
       // elder_service : ['', Validators.compose([Validators.required])],
        elder_number : ['', Validators.compose([Validators.pattern('[0-9]*'),Validators.maxLength(12),Validators.required])],
        elder_address: ['', Validators.compose([Validators.required])],
        elder_dob : ['', Validators.compose([Validators.required])],
        elder_location: ['', Validators.compose([Validators.required])],
        // education_list: this. formBuilder.array([
        //         this.educationAddress(),
        //     ]),
        //  experience_list: this. formBuilder.array([
        //         this.experienceAddress(),
        //     ]),
         emergency_list: this. formBuilder.array([
                this.emergencyAddress(),
            ]),
       /* emergency_numbers: ['', Validators.compose([Validators.required])],
        experienceYears: ['', Validators.compose([Validators.required])],
        college: ['', Validators.compose([Validators.required])],
        elderGraduation: ['', Validators.compose([Validators.required])],
        elderSpecialization: ['', Validators.compose([Validators.required])],
        functional_area: ['', Validators.compose([Validators.required])],
        functional_duration: ['', Validators.compose([Validators.required])]*/
        // area_of_interest: ['', Validators.compose([Validators.required])],
        // job_type: ['', Validators.compose([Validators.required])],
        // skill_set: ['', Validators.compose([Validators.required])],
        
              });
  }
    if(navParams.get("fuctionality")!= "edit" && navParams.get("fuctionality") !="profileEdit")
    {

   this.myForm = formBuilder.group({
    
      education_list: this. formBuilder.array([
                this.educationAddress(),
            ]),
         experience_list: this. formBuilder.array([
                this.experienceAddress(),
            ]),
          area_of_interest: ['', Validators.compose([Validators.required])],
           elder_email: ['', Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i),Validators.required])],
        elder_password:['', Validators.compose([Validators.required])],
        elder_service: ['', Validators.compose([Validators.required])],
        job_type: ['', Validators.compose([Validators.required])],
        skill_set: ['', Validators.compose([Validators.required])],
        //file_name: ['', Validators.compose([Validators.required])],
   })
 }
 else{
    this.myForm = formBuilder.group({
    
      education_list: this. formBuilder.array([
                this.educationAddress(),
            ]),
         experience_list: this. formBuilder.array([
                this.experienceAddress(),
            ]),
          area_of_interest: ['', Validators.compose([Validators.required])],
        job_type: ['', Validators.compose([Validators.required])],
         elder_service: ['', Validators.compose([Validators.required])],
        skill_set: ['', Validators.compose([Validators.required])]
   })
 }
 
  this.nav=nav;
}
    educationAddress() {
    return this.formBuilder.group({
        education_graduation: ['', Validators.compose([Validators.required])],
        // graduationOther: ['', Validators.compose([Validators.required])],
        education_specialization: ['', Validators.compose([Validators.required])],
       // specialization_other: ['', Validators.compose([])],
        education_college: ['', Validators.compose([])],
        });
    }
    experienceAddress(){
      return this.formBuilder.group({
        experience_industry: ['', Validators.compose([Validators.required])],
        experience_years: ['', Validators.compose([Validators.required])],
        experience_duration: ['', Validators.compose([Validators.required])],
        });
    }
    emergencyAddress(){
      return this.formBuilder.group({
        emergency_name: ['', Validators.compose([Validators.required])],
        emergency_no: ['', Validators.compose([Validators.required])],
     });
    }

 loadManageDependentData(elderId){
   this.communityServices.getElder(elderId).subscribe(
       elder=>{
          this.loadForm(elder.result.info[0]);
        },
         err =>{
            this.communityServices.showErrorToast(err);
            })
 }
 
imageURL:any;
public emergencies =  [
        {
            "name": "Police",
            "val" : "1"
          },
           {
            "name": "Ambulance",
            "val" : "2"
          },
           {
            "name": "Hospital",
            "val" : "3"
          }
            

        ];

        onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
 loadForm(data){
              // this.manageDependentData = data[0] ;
              this.manageDependentData = data;
          this.storage.ready().then(() => {
            this.storage.get('imageurl').then((imageurl) => { this.imageURL=imageurl;
            this.base64Image = this.imageURL+this.manageDependentData.avatar;
         
              });
            });
                    
          this.elder_id = this.manageDependentData.id;
          this.sponsor_id = this.manageDependentData.sponsor_id;
          this.elder_name= this.manageDependentData.name;
          this.last_name =this.manageDependentData.last_name;
          this.hobbies=this.manageDependentData.hobbies;
          this.allergic=this.manageDependentData.allergic;
          this.elder_service = this.manageDependentData.in_service;
          this.elder_number= this.manageDependentData.mobile;
          this.file_name=this.manageDependentData.docs_name;
          this.elder_dob= moment(this.manageDependentData.dob).format("YYYY-MM-DD");
      
          this.elder_email= this.manageDependentData.email;
          //this.elder_password= this.manageDependentData.password;
          this.elder_location = this.manageDependentData.location;        
          this.elder_relation = this.manageDependentData.relation;
          this.elder_address= this.manageDependentData.address; 
          let bloginterests = this.manageDependentData.blog_interest;

          if(bloginterests != undefined){ 
            this.blog_interest=[];
            if(bloginterests.length != 0){
              for(let i=0 ; i< bloginterests.length ; i++){    
                this.blog_interest.push(bloginterests[i].id);
              }
             }
           }
             let serviceinterest=this.manageDependentData.service_interest;
             if(serviceinterest !=undefined){
              if(serviceinterest.length != 0){
              this.servicecategory=[];
              for(let i=0 ; i< serviceinterest.length ; i++){                
                this.servicecategory.push(serviceinterest[i]);
                 this.selectsubcategory(serviceinterest[i]);
              }
             }
           }

             let servicesubinterest=this.manageDependentData.service_checked_interest;
             if(servicesubinterest !=undefined){
             this.servicesubcategorylist=[];
              if(servicesubinterest.length != 0){           
              for(let i=0 ; i< servicesubinterest.length ; i++){
                 
                this.servicesubcategorylist.push(servicesubinterest[i].id);

              }
             }
           }
          let emergencies = this.manageDependentData.emergency;

          if(emergencies != undefined){
          if(emergencies.length != 0 ){
            console.log(emergencies.length);
           this.emergency_list.pop();

               this.emergency_name =[];
               this.emergency_no =[];
            for(let i = 0; i < emergencies.length;i++)
            {
              this.emergency_name.push(emergencies[i].person);
              console.log(this.emergency_name);
              this.emergency_no.push(emergencies[i].mobile);
              this.emergency_list.push({emergency:[i]});
              }
              if(emergencies.length > 1 ){
                this.addEmergency();
              }
           
          }
        }       
          this.job_interest = this.manageDependentData.job_interested;

          if(this.job_interest){
            //this.area_of_interest = this.manageDependentData.area_interest;
            
            let areainterest = this.manageDependentData.area_interest;
             this.area_of_interest=[];
            if(areainterest.length != 0){
              for(let i=0 ; i< areainterest.length ; i++){               
                this.area_of_interest.push(areainterest[i].id);
              }
             }
            this.job_type = this.manageDependentData.job_type;
            //this.attach_resume = this.manageDependentData.docs;

            let experiences = this.manageDependentData.experience;
            if(experiences.length != 0)
            {
              this.experience_list.pop();
              for(let i = 0; i < experiences.length;i++)
              {
                this.experience_industry.push(experiences[i].functional_id);
                this.experience_years.push(experiences[i].year);
                this.experience_duration.push(experiences[i].duration);
                this.experience_list.push({experience:[i]});
                // if(experiences.length > 1){
                  //this.addExperience();
                  //}
                
              }  
             // if(experiences.length>1){
             //   this.removeExperience(experiences.length-1);
             // }
              if(experiences.length > 1){
                this.addExperience();
              }
            
            }

            

            let skills = this.manageDependentData.skills;
            if(skills.length != 0){
              for(let i=0 ; i< skills.length ; i++){
                this.skill_set.push(skills[i].skill);
              }
             }
            let educations =  this.manageDependentData.education;
            if(educations.length != 0)
            {
              //this.education_list.pop();
              for(let i = 0; i < educations.length;i++)
              {
                this.education_graduation.push(educations[i].graduation);
                console.log(this.education_graduation);
                this.graduationOther.push(educations[i].graduation_other);
                this.education_specialization.push(educations[i].specialization);
                this.specialization_other.push(educations[i].specialization_other);
                this.education_college.push(educations[i].university);
                this.education_list.push({education:[i]});
                //this.addEducation();
               // console.log(i);
              }  
              if(educations.length > 1){
                this.addEducation();
              }
              
            }
          }
 }
  accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
      this.avatar1 = this.base64Image;
     }, (err) => {
      console.log(err);
    });
  }
 getDate(datepar){
     var dateParts = datepar.split("-").reverse().join("-");
     // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
     return dateParts;
  }

 getElderMasterDetails(){
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.communityServices.getElderMasterDetails(this.options)
       .subscribe(masterData =>{
                    this.functionalArea=masterData.result.FunctionalArea;
                    this.educations=masterData.result.Educational;
                    this.other=this.educations[15].value;
                    this.specializations=masterData.result.Specialization;
                    this.specializationsOther=this.specializations[20].value;
                    this.locations=masterData.result.Locations;
                    this.areaOfInterest=masterData.result.AreaofInterest;
                    this.blog_category=masterData.result.BlogCategory;
                    this.service_category=masterData.result.ServiceOffered;
                    let skillset =masterData.result.Skills;
                    for(let i=0;i<skillset.length;i++){
                      this.skills.push(skillset[i].skill)
                    }
                    this.relations=masterData.result.Relations;
                    this.in_service=masterData.result.InService;

                    loader.dismiss();
                     },
                     err =>{
                    this.communityServices.showErrorToast(err);
                    loader.dismiss();
                  })
       

   }
  selectsubcategory(servicecategory){
  this.communityServices.selectsubcategory(servicecategory).subscribe( 
      (servicecategoryinfo) => {
          this.servicesubcategory=servicecategoryinfo.result;
        });

  }
   // ionViewWillEnter(){
   //      this.getElderMasterDetails();
   //    }

  addEmergency(){
    
    const control = <FormArray>this.authForm.controls['emergency_list'];
        control.push(this.emergencyAddress());
        
  }
  removeEmergency(index){
     const control = <FormArray>this.authForm.controls['emergency_list'];
        control.removeAt(index);
         this.emergency_name.splice(index,1);
         this.emergency_no.splice(index,1);
  }

  addExperience(){
    const control = <FormArray>this.myForm.controls['experience_list'];
        control.push(this.experienceAddress());
  }
  removeExperience(index){
    const control = <FormArray>this.myForm.controls['experience_list'];
        control.removeAt(index);
         this.experience_industry.splice(index,1);
         this.experience_years.splice(index,1);
         this.experience_duration.splice(index,1);

  }

  addEducation(){
     const control = <FormArray>this.myForm.controls['education_list'];
        control.push(this.educationAddress());
  }
  removeEducation(index){
    const control = <FormArray>this.myForm.controls['education_list'];
        control.removeAt(index);
  this.education_graduation.splice(index,1);
  //this.graduationOther.splice(index,1);
  this.education_specialization.splice(index,1);
  //this.specialization_other.splice(index,1);
  this.education_college.splice(index,1);

  }
getblog_category(){
  if(this.functionality !="profileEdit"){
   if(this.functionality !="edit" && this.functionality !="profileEdit"){
    //console.log(this.blog_interest);
    if(this.blog_interest != undefined){
      for(let i=0;i<this.blog_interest.length;i++){
        this.blog_categoryinterest.push({"id":this.blog_interest[i]})  
      }
    }
    }else{
    if(this.blog_interest != undefined){
      for(let i=0;i<this.blog_interest.length;i++){
        this.blog_categoryinterest.push({"elder_id":this.elder_id,"id":this.blog_interest[i]})  
      }
    }
  }
}
  
}
getservicecategory(){
  if(this.functionality !="profileEdit"){
   if(this.functionality !="edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.servicesubcategorylist.length;i++){
        this.serviceCategory_interests.push({"id":this.servicesubcategorylist[i]})  
      }
    }else{
      for(let i=0;i<this.servicesubcategorylist.length;i++){
        this.serviceCategory_interests.push({"elder_id":this.elder_id,"id":this.servicesubcategorylist[i]})  
      }
    }
  }
}
getareaof_interest(){
  // if(this.functionality !="profileEdit"){
   if(this.functionality !="edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.area_of_interest.length;i++){
        this.areaofinterestdata.push({"id":this.area_of_interest[i]})  
      }
    }else{

      for(let i=0;i<this.area_of_interest.length;i++){
        this.areaofinterestdata.push({"elder_id":this.elder_id,"id":this.area_of_interest[i]})  
    
      }
    }
  // }
}
  getElderSkills(){
     if(this.functionality !="edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.skill_set.length;i++){
        //console.log(this.skill_set);
        this.elder_skills.push({"skill":this.skill_set[i]})  
      }
    }else{

      for(let i=0;i<this.skill_set.length;i++){
        this.elder_skills.push({"elder_id":this.elder_id,"skill":this.skill_set[i]})  
      }
    }
  }

  getEmergencyNumber(){
    if(this.functionality != "edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.emergency_name.length;i++){
            this.elder_emergency.push({"person":this.emergency_name[i],"mobile":this.emergency_no[i]})  
          }
        }
  else{
    for(let i=0;i<this.emergency_name.length;i++){
            this.elder_emergency.push({"elder_id":this.elder_id,"person":this.emergency_name[i],"mobile":this.emergency_no[i]})  
          }
       }
  }

  getElderExperience(){
    if(this.functionality != "edit" && this.functionality !="profileEdit"){
      for(let i=0;i<this.experience_industry.length;i++){
            this.elder_experience.push({"industry":this.experience_industry[i],"year":this.experience_years[i],"duration":this.experience_duration[i]})  
            }
      }else{
        //const control = <FormArray>this.myForm.controls['experience_list'];
        for(let i=0;i<this.experience_industry.length;i++){
            this.elder_experience.push({"elder_id":this.elder_id,"functional_id":this.experience_industry[i],"year":this.experience_years[i],"duration":this.experience_duration[i]})
          
          }
         //const control = <FormArray>this.myForm.controls['experience_list'];
        //control=this.elder_experience;
      }
  }

  getElderEducation(){
    if(this.functionality != "edit" && this.functionality !="profileEdit"){
    for(let i=0;i<this.education_graduation.length;i++){
            this.elder_education.push({"graduation":this.education_graduation[i],"graduationOther":this.graduationOther[i],"specialization":this.education_specialization[i],"specializationOther":this.specialization_other[i],"university":this.education_college[i]})  

        } 
       }
       else{
         for(let i=0;i<this.education_graduation.length;i++){
            this.elder_education.push({"elder_id":this.elder_id,"graduation":this.education_graduation[i],"graduationOther":this.graduationOther[i],"specialization":this.education_specialization[i],"specializationOther":this.specialization_other[i],"university":this.education_college[i]})  

          }
       }
  }
 fileChange(event) {
   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('attachemts[0]', file, file.name);
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.token);
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
           this.communityServices.resumeupload( formData, options)
        .subscribe(
     (sendMessage) => { 
      console.log(sendMessage);
      this.file_name=sendMessage[0].file_name;
      this.file_path=sendMessage[0].file_path;
     loader.dismiss();
      
    },
    (err) => { 
       loader.dismiss();
        if(err.status===401)
        {
          this.communityServices.showToast(JSON.parse(err._body).error);
        }
        else
        {
          this.communityServices.showToast("Try again later");
        }
      });
      
    }
}
 addDependent(){
    //---------------------------------edited-------------------------------//
  if(this.avatar1 != ""){
    this.avatar = this.avatar1;
  }else{
    this.avatar = "";
  }
        

    // let dependentData = {"info":
    //                       [{"email":this.authForm.value.elder_email,
    //                       "relation":this.elder_relation,
    //                       "password":this.authForm.value.elder_password,
    //                       "name":this.authForm.value.elder_name,
    //                       "dob":this.elder_dob,
    //                       "mobile":this.authForm.value.elder_number,
    //                       "in_service":this.elder_service,
    //                       "address":this.authForm.value.elder_address,
    //                       "location":this.elder_location,
    //                       "area_interest":this.area_of_interest,
    //                       "job_type":this.job_type,
    //                       "skills":this.skill_data,
    //                       "emergency":this.emergency_data,
    //                       "emergency_numbers":this.mobile,
    //                       "experience":this.experience_data,
    //                       "education":this.education_data,
    //                       "sponsor_id":this.sponsor_id,
    //                       "job_interested":this.job_interest,
    //                       //"docs":this.file_name
    //                       }]
    //                     };
    
                        //-------------------modified----------------------------//

      if(this.functionality=="edit" || this.functionality =="profileEdit")
      {
        if(this.authForm.value.elder_name != ""){
            this.elder_name = this.authForm.value.elder_name;
        }
        if(this.authForm.value.elder_number != ""){
            this.elder_number = this.authForm.value.elder_number;
        }
        if(this.authForm.value.elder_address != ""){
            this.elder_address = this.authForm.value.elder_address;
        }
        if(this.functionality =="profileEdit")
        {
        this.getElderSkills();
    this.skill_data= this.elder_skills;

    this.getEmergencyNumber();
    this.emergency_data = this.elder_emergency;

    this.getElderExperience();
    this.experience_data = this.elder_experience;

    this.getElderEducation();
    this.education_data = this.elder_education;
    this.getblog_category();
    this.blog_data=this.blog_categoryinterest;
    console.log(this.blog_data);

    this.getareaof_interest();
     this.area_of_interest_data=this.areaofinterestdata;
     console.log(this.area_of_interest_data);
 }
        let profileEditData = {
        "id":this.elder_id,
        "area_interest":this.area_of_interest_data,
        "location":this.elder_location,
        "locationName":this.manageDependentData.locationName,
        "job_type":this.job_type,        
        "sponsor_id":this.sponsor_id,
        "name":this.elder_name,
        "password":this.elder_password,
        "last_name":this.manageDependentData.last_name,
        "docs":this.manageDependentData.docs,
        "avatar":this.avatar,
        "relation":this.elder_relation,
        "gender":this.manageDependentData.gender,
        "dob":this.elder_dob,
        "allergic":this.allergic,
        "hobbies":this.hobbies,
        "mobile":this.elder_number,
        "mobile_verified":this.manageDependentData.mobile_verified, 
       "email":this.elder_email,
        "email_verified":this.manageDependentData.email_verified,
        "email_sent":this.manageDependentData.email_sent,
        "message_sent":this.manageDependentData.message_sent,
        "mail_code":this.manageDependentData.mail_code,
        "message_code":this.manageDependentData.message_code,
        "in_service":this.elder_service,
        "job_interested":this.job_interest,
        "address":this.elder_address,
        "city":this.manageDependentData.city,
        "state":this.manageDependentData.state,
        "status":this.manageDependentData.status,
         "direct":this.manageDependentData.direct,
        "created_at":this.manageDependentData.created_at,
        "updated_at":this.manageDependentData.updated_at,
        "reject_comments":this.manageDependentData.reject_comments,
        // "city_name":this.manageDependentData.city_name,
        // "state_name":this.manageDependentData.state_name,
        "user_type":this.manageDependentData.user_type,
        "skills":this.skill_data,
        "emergency":this.emergency_data,
        "experience":this.experience_data,
        "education":this.education_data,
        "avatar1":this.avatar,
        "app":""
      }
      


          if(this.functionality == "edit"){
            if(this.job_interest != false){
               if(!this.authForm.valid || !this.myForm.valid){
            this.submitAttempt = true; 
           }
          else
          {
           this.submitAttempt = false;

             this.getblog_category();
    this.blog_data=this.blog_categoryinterest;
    console.log(this.blog_data);
    this.getservicecategory();
    this.servicecategoryinterest_data=this.serviceCategory_interests;
    this.getareaof_interest();

     this.area_of_interest_data= this.areaofinterestdata;
     console.log(this.area_of_interest_data);

    this.getElderSkills();
    this.skill_data = this.elder_skills;

    this.getEmergencyNumber();
    this.emergency_data = this.elder_emergency;

    this.getElderExperience();
    this.experience_data = this.elder_experience;

    this.getElderEducation();
    this.education_data = this.elder_education;
           let loader = this.loadingCtrl.create({ content: "Please wait..." });     
            loader.present();
            this.communityServices.editSubmit({"info": [{
        "id":this.elder_id,
        "area_interest":this.area_of_interest_data,
        "location":this.elder_location,
        "job_type":this.job_type,        
        "sponsor_id":this.sponsor_id,
        "password":this.elder_password,
        "name":this.elder_name,
        "last_name":this.last_name,
        "avatar":this.manageDependentData.avatar,
        "relation":this.elder_relation,
        "gender":this.manageDependentData.gender,
        "dob":this.elder_dob,
        "allergic":this.allergic,
        "hobbies":this.hobbies,
        "mobile":this.elder_number,
        "mobile_verified":this.manageDependentData.mobile_verified,
        "email":this.elder_email,
        "email_verified":this.manageDependentData.email_verified,
        "email_sent":this.manageDependentData.email_sent,
        "message_sent":this.manageDependentData.message_sent,
        "mail_code":this.manageDependentData.mail_code,
        "message_code":this.manageDependentData.message_code,
        "in_service":this.elder_service,
        "job_interested":this.job_interest,
        "address":this.elder_address,
        "city":this.manageDependentData.city,
        "state":this.manageDependentData.state,
        "status":this.manageDependentData.status,
        "direct":this.manageDependentData.direct,
        "created_at":this.manageDependentData.created_at,
        "updated_at":this.manageDependentData.updated_at,
        "reject_comments":this.manageDependentData.reject_comments,
        "city_name":this.manageDependentData.city_name,
        "state_name":this.manageDependentData.state_name,
        "skills":this.skill_data,
        "emergency":this.emergency_data,
        "experience":this.experience_data,
        "education":this.education_data,
        "blog_interest":this.blog_data,
        "service_interest":this.servicecategory,
        "serviceCategory_interest":this.servicecategoryinterest_data,
        "app":"",
        "document_name":this.file_name,
        "docs":this.file_path
      }]}).subscribe(elders =>{
                    // console.log(elders); 
                    let msg='';
              if(elders.result.updated!='')
              {
                this.nav.setRoot(ManagePage);
                msg="Elder details updated successfully.";
                this.communityServices.showToast(msg); 
              } 
              else 
              {
               msg="Elder details can not updated.";
               this.communityServices.showToast(msg); 
              } 
               loader.dismiss();       
             },
             err =>{
                    this.communityServices.showErrorToast(err);
                    loader.dismiss();
              })
             
            }
            }
            else{
               if(!this.authForm.valid){
            this.submitAttempt = true; 
           }
          else
          {
           this.submitAttempt = false;
            this.getEmergencyNumber();
            this.emergency_data = this.elder_emergency;

              this.getblog_category();
    this.blog_data=this.blog_categoryinterest;
    console.log(this.blog_data);

      this.getservicecategory();
    this.servicecategoryinterest_data=this.serviceCategory_interests;

           let loader = this.loadingCtrl.create({ content: "Please wait..." });     
            loader.present();
            this.communityServices.editSubmit({"info": [{
        "id":this.elder_id,
        //"area_interest":this.area_of_interest_data,
        "location":this.elder_location,
        //"job_type":this.job_type,        
        "sponsor_id":this.sponsor_id,
        "password":this.elder_password,
        "name":this.elder_name,
        "last_name":this.last_name,
        "avatar":this.manageDependentData.avatar,
        "relation":this.elder_relation,
        "gender":this.manageDependentData.gender,
        "dob":this.elder_dob,
        "allergic":this.allergic,
        "hobbies":this.hobbies,
        "mobile":this.elder_number,
        "mobile_verified":this.manageDependentData.mobile_verified,
        "email":this.elder_email,
        "email_verified":this.manageDependentData.email_verified,
        "email_sent":this.manageDependentData.email_sent,
        "message_sent":this.manageDependentData.message_sent,
        "mail_code":this.manageDependentData.mail_code,
        "message_code":this.manageDependentData.message_code,
        "in_service":this.elder_service,
        "job_interested":this.job_interest,
        "address":this.elder_address,
        "city":this.manageDependentData.city,
        "state":this.manageDependentData.state,
        "status":this.manageDependentData.status,
        "direct":this.manageDependentData.direct,
        "created_at":this.manageDependentData.created_at,
        "updated_at":this.manageDependentData.updated_at,
        "reject_comments":this.manageDependentData.reject_comments,
        "city_name":this.manageDependentData.city_name,
        "state_name":this.manageDependentData.state_name,
        //"skills":this.skill_data,
        "emergency":this.emergency_data,
        //"experience":this.experience_data,
        //"education":this.education_data,
        "blog_interest":this.blog_data,
        "service_interest":this.servicecategory,
        "serviceCategory_interest":this.servicecategoryinterest_data,
        "app":""
      }]}).subscribe(elders =>{
                    // console.log(elders); 
                    let msg='';
              if(elders.result.updated!='')
              {
                this.nav.setRoot(ManagePage);
                msg="Elder details updated successfully.";
                this.communityServices.showToast(msg); 
              } 
              else 
              {
               msg="Elder details can not updated.";
               this.communityServices.showToast(msg); 
              } 
               loader.dismiss();       
             },
             err =>{
                    this.communityServices.showErrorToast(err);
                    loader.dismiss();
              })
             
            }
            }
         
          }else{
            let loader = this.loadingCtrl.create({ content: "Please wait..." });     
            loader.present();
              this.providerService.webServiceCall(`myaccountEdit`,profileEditData)
                  .subscribe(data=>{
                    this.providerService.showToast(data.result);
                    console.log(data);
                    loader.dismiss();
                  },
                  err=>{
                    this.providerService.showErrorToast(err);
                    console.log(err);
                    loader.dismiss();
                  })
                   
       
          }
        
      }
      else
        {
        
       // }
        if(this.functionality != "edit" && this.functionality !="profileEdit"){   
        if(this.job_interest != false){

          if(!this.myForm.valid || !this.authForm.valid){
      this.submitAttempt = true;
      this.communityServices.showToast("Please Enter The Required Details");
    }
    else{
      this.submitAttempt = false;
      this.getElderSkills();
    this.skill_data= this.elder_skills;
    console.log(this.skill_data);
    this.getblog_category();
    this.blog_data=this.blog_categoryinterest;
    console.log(this.blog_data);

    this.getareaof_interest();
     this.area_of_interest_data=this.areaofinterestdata;
     console.log(this.area_of_interest_data);
    this.getEmergencyNumber();
      this.emergency_data = this.elder_emergency;

    this.getElderExperience();
    this.experience_data = this.elder_experience;

    this.getElderEducation();
    this.education_data = this.elder_education;
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
       this.communityServices.addSubmit({"info":
                          [{"email":this.elder_email,
                          "relation":this.elder_relation,
                          "password":this.elder_password,
                          "name":this.authForm.value.elder_name,
                          "last_name":this.last_name,
                          "dob":this.elder_dob,
                          "mobile":this.authForm.value.elder_number,
                          "in_service":this.elder_service,
                          "address":this.authForm.value.elder_address,
                          "location":this.elder_location,
                          "allergic":this.allergic,
                          "hobbies":this.hobbies,
                          "area_interest":this.area_of_interest_data,
                          "blog_interest":this.blog_data,
                          "service_interest":this.servicecategory,
                          "serviceCategory_interest":this.servicesubcategorylist,
                          "job_type":this.job_type,
                          "skills":this.skill_data,
                          "emergency":this.emergency_data,
                          "experience":this.experience_data,
                          "education":this.education_data,
                          "sponsor_id":this.sponsor_id,
                          "job_interested":this.job_interest,
                          "document_name":this.file_name,
                          "docs":this.file_path
                          }]
                        }).subscribe(
           elders=>{
              let msg='';
              if(elders.result.added!='')
              {
                 this.nav.setRoot(ManagePage);
                msg="Elder details added Successfully";
              }
              else if(elders.result.exist!='')
              {
                msg="Elder email id already exits.";
              } 
              else
              {
               msg="Elder details can not added.";
              } 
               this.communityServices.showToast(msg);
               loader.dismiss();
              },
           err =>{
              this.communityServices.showErrorToast(err);
              loader.dismiss();
              })
    
     }
        }  
        else{
          if(!this.authForm.valid){
      this.submitAttempt = true;
      this.communityServices.showToast("Please Enter The Required Details");
    }
    else{
      this.submitAttempt = false;
      this.getblog_category();
    this.blog_data=this.blog_categoryinterest;
    console.log(this.blog_data);
      this.getEmergencyNumber();
      this.emergency_data = this.elder_emergency;
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
       this.communityServices.addSubmit({"info":
                          [{"email":this.elder_email,
                          "relation":this.elder_relation,
                          "password":this.elder_password,
                          "name":this.authForm.value.elder_name,
                          "last_name":this.last_name,
                          "dob":this.elder_dob,
                          "mobile":this.authForm.value.elder_number,
                          "in_service":this.elder_service,
                          "address":this.authForm.value.elder_address,
                          "location":this.elder_location,
                          "allergic":this.allergic,
                          "hobbies":this.hobbies,
                          "emergency":this.emergency_data,
                          "blog_interest":this.blog_data,
                          "service_interest":this.servicecategory,
                          "serviceCategory_interest":this.servicesubcategorylist,
                          "emergency_numbers":this.mobile,
                          "sponsor_id":this.sponsor_id,
                          "job_interested":this.job_interest
                          }]
                        }).subscribe(
           elders=>{
              let msg='';
              if(elders.result.added!='')
              {
                 this.nav.setRoot(ManagePage);
                msg="Elder details added Successfully";
              }
              else if(elders.result.exist!='')
              {
                msg="Elder email id already exits.";
              } 
              else
              {
               msg="Elder details can not added.";
              } 
               this.communityServices.showToast(msg);
               loader.dismiss();
              },
           err =>{
              this.communityServices.showErrorToast(err);
              loader.dismiss();
              })
    
     }
    
        } 
    
    }

  }
    
    if(this.functionality =="profileEdit")
      {
        this.nav.pop();
      }
    

}
 cancel(){
     this.nav.pop();
   }    

 dashboardPage()
    {
      this.nav.setRoot(DashboardPage);
    }


}






[{
"id":"1",
"sponsor_id":"1",
"name":"neduncheliyan",
"avatar":"uploads\/avatar\/1492778687usr3.jpg",
"relation":"father",
"gender":"",
"dob":"13-06-1950",
"mobile":"9874563211",
"mobile_verified":"1",
"email":"neduncheliyan@elderindia.com",
"email_verified":"1",
"in_service":"0",
"location":"3",
"job_interested":"1",
"area_interest":"Animation",
"job_type":"full time",
"address":"4\/22 Rutland Gate 4th Street, Chennai, Tamil Nadu 600034",
"city":"",
"state":"",
"status":"1",
"created_at":"2017-04-07 22:59:14",
"updated_at":"2017-04-21 18:14:47",
"city_name":"",
"state_name":"",
"experience":[{"id":"23","elder_id":"1","functional_id":"5","functional_other":"","year":"5","duration":"APRIL 2001-2017","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46","$hashKey":"object:3907"}],
"education":[{"id":"23","elder_id":"1","graduation":"BCA","graduation_other":"","specialization":"Maths","specialization_other":"","university":"anna university","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46","$hashKey":"object:3910"}],
"emergency":[{"id":"27","elder_id":"1","person":"police","mobile":"100","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46","$hashKey":"object:3904"}],
"skills":[{"id":"68","elder_id":"1","skill":"java","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46"},{"id":"69","elder_id":"1","skill":"php","status":"1","created_at":"2017-04-21 18:14:46","updated_at":"2017-04-21 18:14:46"},{"id":"70","elder_id":"1","skill":"yii","status":"1","created_at":"2017-04-21 18:14:47","updated_at":"2017-04-21 18:14:47"}],
"avatar1":"uploads\/avatar\/1492778687usr3.jpg"
}]