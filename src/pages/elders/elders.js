var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service-provider';
import { FormBuilder, Validators } from '@angular/forms';
import { CommunityServices } from '../../providers/community-services';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ManagePage } from '../../pages/manage/manage';
var EldersPage = (function () {
    //-----------------------END-------------------//
    function EldersPage(providerService, nav, storage, formBuilder, navParams, communityServices, loadingCtrl) {
        // this.getElderMasterDetails();
        var _this = this;
        this.providerService = providerService;
        this.nav = nav;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.communityServices = communityServices;
        this.loadingCtrl = loadingCtrl;
        this.avatar = '';
        this.educations = [];
        this.specializations = [];
        this.locations = [];
        this.relations = [];
        this.functionality = "";
        this.emergency_name = [];
        this.emergency_no = [];
        this.elderGraduation = [];
        this.industry_experience = [{ year: "" }];
        this.functional_duration = "";
        this.mobile = "";
        this.elder_email = "";
        this.elder_password = "";
        this.elder_id = "";
        this.elder_relation = "";
        this.elder_name = "";
        this.elder_service = "";
        this.elder_number = "";
        this.elder_dob = "";
        this.elder_address = "";
        this.elder_location = "";
        this.area_of_interest = "";
        this.job_type = "";
        this.skill_set = [];
        this.skills = [];
        this.experience_industry = [];
        this.experience_years = [];
        this.experience_duration = [];
        this.education_graduation = [];
        this.education_specialization = [];
        this.education_college = [];
        this.emergency_list = [{ emergency: "" }];
        this.experience_list = [{ experience: "" }];
        this.education_list = [{ education: "" }];
        this.industry_set = [];
        this.elder_skills = [];
        this.elder_emergency = [];
        this.elder_experience = [];
        this.elder_education = [];
        //-------------------END---------------------------------//
        //------------------Edit Functionality start------------------------//
        this.manageDependentData = [];
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('user_type_id').then(function (id) { _this.sponsor_id = id; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.functionality = navParams.get("fuctionality");
                console.log(_this.functionality + 'fffffffffff');
                if (_this.functionality == 'edit') {
                    _this.title = "Edit Elder Details";
                    if (navParams.get("editData") != null) {
                        // let dependent = navParams.get("editData");
                        _this.loadManageDependentData(navParams.get("editData").id);
                    }
                }
                else if (_this.functionality == 'profileEdit') {
                    _this.title = "Profile Edit";
                    console.log("....edit profile..", navParams.get('profileData'));
                    _this.loadForm(navParams.get('profileData'));
                }
                else {
                    _this.title = "Elder Onboarding";
                }
            });
        });
        // this.today = "";
        this.job_interest = false;
        // }
        if (navParams.get("fuctionality") != "edit" && navParams.get("fuctionality") != "profileEdit") {
            this.authForm = formBuilder.group({
                elder_relation: ['', Validators.compose([Validators.required])],
                elder_name: ['', Validators.compose([Validators.maxLength(30),
                        Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                elder_service: ['', Validators.compose([Validators.required])],
                elder_number: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
                elder_address: ['', Validators.compose([Validators.required])],
                elder_dob: ['', Validators.compose([Validators.required])],
                elder_email: ['', Validators.compose([Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]*'), Validators.required])],
                elder_password: ['', Validators.compose([Validators.required])],
                elder_location: ['', Validators.compose([Validators.required])],
                /* emergency_numbers: ['', Validators.compose([Validators.required])],
                 experienceYears: ['', Validators.compose([Validators.required])],
                 college: ['', Validators.compose([Validators.required])],
                 elderGraduation: ['', Validators.compose([Validators.required])],
                 elderSpecialization: ['', Validators.compose([Validators.required])],
                 functional_area: ['', Validators.compose([Validators.required])],
                 functional_duration: ['', Validators.compose([Validators.required])]*/
                emergency_numbers: ['', Validators.compose([])],
                experienceYears: ['', Validators.compose([])],
                college: ['', Validators.compose([])],
                elderGraduation: ['', Validators.compose([])],
                elderSpecialization: ['', Validators.compose([])],
                functional_area: ['', Validators.compose([])],
                functional_duration: ['', Validators.compose([])]
            });
        }
        else {
            this.authForm = formBuilder.group({
                elder_relation: ['', Validators.compose([Validators.required])],
                elder_name: ['', Validators.compose([Validators.maxLength(30),
                        Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                elder_service: ['', Validators.compose([Validators.required])],
                elder_number: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
                elder_address: ['', Validators.compose([Validators.required])],
                elder_dob: ['', Validators.compose([Validators.required])],
                elder_location: ['', Validators.compose([Validators.required])],
                /* emergency_numbers: ['', Validators.compose([Validators.required])],
                 experienceYears: ['', Validators.compose([Validators.required])],
                 college: ['', Validators.compose([Validators.required])],
                 elderGraduation: ['', Validators.compose([Validators.required])],
                 elderSpecialization: ['', Validators.compose([Validators.required])],
                 functional_area: ['', Validators.compose([Validators.required])],
                 functional_duration: ['', Validators.compose([Validators.required])]*/
                emergency_numbers: ['', Validators.compose([])],
                experienceYears: ['', Validators.compose([])],
                college: ['', Validators.compose([])],
                elderGraduation: ['', Validators.compose([])],
                elderSpecialization: ['', Validators.compose([])],
                functional_area: ['', Validators.compose([])],
                functional_duration: ['', Validators.compose([])]
            });
        }
        this.nav = nav;
    }
    EldersPage.prototype.loadManageDependentData = function (elderId) {
        var _this = this;
        this.communityServices.getElder(elderId).subscribe(function (elder) {
            _this.loadForm(elder.result.info[0]);
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    EldersPage.prototype.loadForm = function (data) {
        var _this = this;
        // this.manageDependentData = data[0] ;
        this.manageDependentData = data;
        this.storage.ready().then(function () {
            _this.storage.get('imageurl').then(function (imageurl) {
                _this.imageURL = imageurl;
                _this.base64Image = _this.imageURL + _this.manageDependentData.avatar;
            });
        });
        this.elder_id = this.manageDependentData.id;
        this.sponsor_id = this.manageDependentData.sponsor_id;
        this.elder_name = this.manageDependentData.name;
        this.elder_service = this.manageDependentData.in_service;
        this.elder_number = this.manageDependentData.mobile;
        this.elder_dob = this.manageDependentData.dob; //this.getDate(this.manageDependentData.dob);
        this.elder_email = this.manageDependentData.email;
        this.elder_password = this.manageDependentData.password;
        this.elder_location = this.manageDependentData.location;
        this.elder_relation = this.manageDependentData.relation;
        this.elder_address = this.manageDependentData.address;
        var emergency = this.manageDependentData.emergency;
        if (emergency.length != 0) {
            this.emergency_list.pop();
            for (var i = 0; i < emergency.length; i++) {
                this.emergency_name.push(emergency[i].person);
                this.emergency_no.push(emergency[i].mobile);
                this.emergency_list.push({ emergency: [i] });
            }
        }
        this.job_interest = this.manageDependentData.job_interested;
        if (this.job_interest) {
            console.log("interested in job");
            this.area_of_interest = this.manageDependentData.area_interest;
            this.job_type = this.manageDependentData.job_type;
            var experiences = this.manageDependentData.experience;
            // console.log(this.manageDependentData.experience);
            if (experiences.length != 0) {
                this.experience_list.pop();
                for (var i = 0; i < experiences.length; i++) {
                    this.experience_industry.push(experiences[i].functional_id);
                    this.experience_years.push(experiences[i].year);
                    this.experience_duration.push(experiences[i].duration);
                    this.experience_list.push({ experience: [i] });
                }
            }
            var skills = this.manageDependentData.skills;
            if (skills.length != 0) {
                for (var i = 0; i < skills.length; i++) {
                    this.skill_set.push(skills[i].skill);
                }
            }
            var educations = this.manageDependentData.education;
            if (educations.length != 0) {
                this.education_list.pop();
                for (var i = 0; i < educations.length; i++) {
                    this.education_graduation.push(educations[i].graduation);
                    this.education_specialization.push(educations[i].specialization);
                    this.education_college.push(educations[i].university);
                    this.education_list.push({ education: [i] });
                }
            }
        }
    };
    EldersPage.prototype.getDate = function (datepar) {
        var dateParts = datepar.split("-").reverse().join("-");
        // let date = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0];
        return dateParts;
    };
    EldersPage.prototype.getElderMasterDetails = function () {
        var _this = this;
        this.communityServices.getElderMasterDetails()
            .subscribe(function (masterData) {
            _this.functionalArea = masterData.result.FunctionalArea;
            _this.educations = masterData.result.Educational;
            _this.specializations = masterData.result.Specialization;
            _this.locations = masterData.result.Locations;
            _this.areaOfInterest = masterData.result.AreaofInterest;
            var skillset = masterData.result.Skills;
            for (var i = 0; i < skillset.length; i++) {
                _this.skills.push(skillset[i].skill);
            }
            _this.relations = masterData.result.Relations;
            _this.in_service = masterData.result.InService;
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
    };
    EldersPage.prototype.ionViewWillEnter = function () {
        this.getElderMasterDetails();
    };
    EldersPage.prototype.addEmergency = function () {
        this.emergency_list.push({ emergency: "" });
    };
    EldersPage.prototype.removeEmergency = function (index) {
        this.emergency_list.splice(index, 1);
        this.emergency_name.splice(index, 1);
        this.emergency_no.splice(index, 1);
    };
    EldersPage.prototype.addExperience = function (count) {
        // this.getElderMasterDetails();
        this.experience_list.push({ experience: "" });
    };
    EldersPage.prototype.removeExperience = function (index) {
        this.experience_list.splice(index, 1);
        this.experience_industry.splice(index, 1);
        this.experience_years.splice(index, 1);
        this.experience_duration.splice(index, 1);
    };
    EldersPage.prototype.addEducation = function () {
        this.education_list.push({ education: "" });
    };
    EldersPage.prototype.removeEducation = function (index) {
        this.education_list.splice(index, 1);
        this.education_graduation.splice(index, 1);
        this.education_specialization.splice(index, 1);
        this.education_college.splice(index, 1);
        console.log(this.education_list, this.education_graduation, this.education_specialization, this.education_college);
    };
    EldersPage.prototype.getElderSkills = function () {
        if (this.functionality != "edit" && this.functionality != "profileEdit") {
            for (var i = 0; i < this.skill_set.length; i++) {
                this.elder_skills.push({ "skill": this.skill_set[i] });
            }
        }
        else {
            for (var i = 0; i < this.skill_set.length; i++) {
                this.elder_skills.push({ "elder_id": this.elder_id, "skill": this.skill_set[i] });
            }
        }
    };
    EldersPage.prototype.getEmergencyNumber = function () {
        if (this.functionality != "edit" && this.functionality != "profileEdit") {
            for (var i = 0; i < this.emergency_no.length; i++) {
                this.elder_emergency.push({ "id": (i + 1), "person": this.emergency_name[i], "mobile": this.emergency_no[i] });
            }
        }
        else {
            for (var i = 0; i < this.emergency_no.length; i++) {
                this.elder_emergency.push({ "elder_id": this.elder_id, "person": this.emergency_name[i], "mobile": this.emergency_no[i] });
            }
        }
    };
    EldersPage.prototype.getElderExperience = function () {
        if (this.functionality != "edit" && this.functionality != "profileEdit") {
            for (var i = 0; i < this.experience_industry.length; i++) {
                this.elder_experience.push({ "industry": this.experience_industry[i], "year": this.experience_years[i], "duration": this.experience_duration[i] });
            }
        }
        else {
            for (var i = 0; i < this.experience_industry.length; i++) {
                this.elder_experience.push({ "elder_id": this.elder_id, "functional_id": this.experience_industry[i], "year": this.experience_years[i], "duration": this.experience_duration[i] });
            }
        }
    };
    EldersPage.prototype.getElderEducation = function () {
        if (this.functionality != "edit" && this.functionality != "profileEdit") {
            for (var i = 0; i < this.education_graduation.length; i++) {
                this.elder_education.push({ "graduation": this.education_graduation[i], "specialization": this.education_specialization[i], "university": this.education_college[i] });
            }
        }
        else {
            for (var i = 0; i < this.education_graduation.length; i++) {
                console.log("data pushed..!");
                this.elder_education.push({ "elder_id": this.elder_id, "graduation": this.education_graduation[i], "specialization": this.education_specialization[i], "university": this.education_college[i] });
            }
        }
    };
    EldersPage.prototype.addDependent = function () {
        //---------------------------------edited-------------------------------//
        var _this = this;
        this.getElderSkills();
        this.skill_data = this.elder_skills;
        this.getEmergencyNumber();
        this.emergency_data = this.elder_emergency;
        this.getElderExperience();
        this.experience_data = this.elder_experience;
        this.getElderEducation();
        this.education_data = this.elder_education;
        var dependentData = { "info": [{ "email": this.authForm.value.elder_email,
                    "relation": this.elder_relation,
                    "password": this.authForm.value.elder_password,
                    "name": this.authForm.value.elder_name,
                    "dob": this.elder_dob,
                    "mobile": this.authForm.value.elder_number,
                    "in_service": this.elder_service,
                    "address": this.authForm.value.elder_address,
                    "location": this.elder_location,
                    "area_interest": this.area_of_interest,
                    "job_type": this.job_type,
                    "skills": this.skill_data,
                    "emergency": this.emergency_data,
                    "emergency_numbers": this.mobile,
                    "experience": this.experience_data,
                    "education": this.education_data,
                    "sponsor_id": this.sponsor_id,
                    "job_interested": this.job_interest
                }]
        };
        //-------------------modified----------------------------//
        if (this.functionality == "edit" || this.functionality == "profileEdit") {
            if (this.authForm.value.elder_name != "") {
                this.elder_name = this.authForm.value.elder_name;
            }
            if (this.authForm.value.elder_number != "") {
                this.elder_number = this.authForm.value.elder_number;
            }
            if (this.authForm.value.elder_address != "") {
                this.elder_address = this.authForm.value.elder_address;
            }
            var profileEditData = {
                "id": this.elder_id,
                "area_interest": this.area_of_interest,
                "location": this.elder_location,
                "job_type": this.job_type,
                "sponsor_id": this.sponsor_id,
                "name": this.elder_name,
                "avatar": this.manageDependentData.avatar,
                "relation": this.elder_relation,
                "gender": this.manageDependentData.gender,
                "dob": this.elder_dob,
                "mobile": this.elder_number,
                "email": this.elder_email,
                "in_service": this.elder_service,
                "job_interested": this.job_interest,
                "address": this.elder_address,
                "city": this.manageDependentData.city,
                "state": this.manageDependentData.state,
                "status": this.manageDependentData.status,
                "created_at": this.manageDependentData.created_at,
                "city_name": this.manageDependentData.city_name,
                "state_name": this.manageDependentData.state_name,
                "skills": this.skill_data,
                "emergency": this.emergency_data,
                "experience": this.experience_data,
                "education": this.education_data,
                "app": "",
                "avatar1": this.avatar
            };
            var editedData = { "info": [profileEditData] };
            if (this.functionality == "edit") {
                if (!this.authForm.valid) {
                    this.submitAttempt = true;
                }
                else {
                    this.submitAttempt = false;
                    this.communityServices.editSubmit(editedData).subscribe(function (elders) {
                        // console.log(elders); 
                        var msg = '';
                        if (elders.result.updated != '') {
                            _this.nav.setRoot(ManagePage);
                            msg = "Elder Information updated successfully";
                            _this.communityServices.showToast(msg);
                        }
                        else {
                            msg = "Can not edit elder information";
                            _this.communityServices.showToast(msg);
                        }
                    }, function (err) {
                        _this.communityServices.showErrorToast(err);
                    });
                }
            }
            else {
                this.providerService.webServiceCall("myaccountEdit", profileEditData)
                    .subscribe(function (data) {
                    _this.providerService.showToast(data.result);
                    console.log(data);
                }, function (err) {
                    _this.providerService.showErrorToast(err);
                    console.log(err);
                });
            }
        }
        else {
            // }
            if (this.functionality != "edit" && this.functionality != "profileEdit") {
                if (!this.authForm.valid) {
                    this.submitAttempt = true;
                }
                else {
                    this.submitAttempt = false;
                    this.communityServices.addSubmit(dependentData).subscribe(function (elders) {
                        var msg = '';
                        if (elders.result.added != '') {
                            _this.nav.setRoot(ManagePage);
                            msg = "Elder Information added Successfully";
                        }
                        else if (elders.result.exist != '') {
                            msg = "Elder email id already exits";
                        }
                        else {
                            msg = "Can not added elder information";
                        }
                        _this.communityServices.showToast(msg);
                    }, function (err) {
                        _this.communityServices.showErrorToast(err);
                    });
                    // this.nav.pop();
                }
            }
            this.communityServices.showToast("Successfully Added");
        }
        if (this.functionality == "profileEdit") {
            this.nav.pop();
        }
    };
    EldersPage.prototype.cancel = function () {
        this.nav.pop();
    };
    EldersPage.prototype.dashboardPage = function () {
        this.nav.setRoot(DashboardPage);
    };
    EldersPage.prototype.accessGallery = function () {
        var _this = this;
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.avatar = _this.base64Image;
        }, function (err) {
            console.log(err);
        });
    };
    return EldersPage;
}());
EldersPage = __decorate([
    Component({
        selector: 'page-elders',
        templateUrl: 'elders.html'
    }),
    __metadata("design:paramtypes", [ServiceProvider, NavController, Storage, FormBuilder, NavParams, CommunityServices, LoadingController])
], EldersPage);
export { EldersPage };
[{
        "id": "1",
        "sponsor_id": "1",
        "name": "neduncheliyan",
        "avatar": "uploads\/avatar\/1492778687usr3.jpg",
        "relation": "father",
        "gender": "",
        "dob": "13-06-1950",
        "mobile": "9874563211",
        "mobile_verified": "1",
        "email": "neduncheliyan@elderindia.com",
        "email_verified": "1",
        "in_service": "0",
        "location": "3",
        "job_interested": "1",
        "area_interest": "Animation",
        "job_type": "full time",
        "address": "4\/22 Rutland Gate 4th Street, Chennai, Tamil Nadu 600034",
        "city": "",
        "state": "",
        "status": "1",
        "created_at": "2017-04-07 22:59:14",
        "updated_at": "2017-04-21 18:14:47",
        "city_name": "",
        "state_name": "",
        "experience": [{ "id": "23", "elder_id": "1", "functional_id": "5", "functional_other": "", "year": "5", "duration": "APRIL 2001-2017", "status": "1", "created_at": "2017-04-21 18:14:46", "updated_at": "2017-04-21 18:14:46", "$hashKey": "object:3907" }],
        "education": [{ "id": "23", "elder_id": "1", "graduation": "BCA", "graduation_other": "", "specialization": "Maths", "specialization_other": "", "university": "anna university", "status": "1", "created_at": "2017-04-21 18:14:46", "updated_at": "2017-04-21 18:14:46", "$hashKey": "object:3910" }],
        "emergency": [{ "id": "27", "elder_id": "1", "person": "police", "mobile": "100", "status": "1", "created_at": "2017-04-21 18:14:46", "updated_at": "2017-04-21 18:14:46", "$hashKey": "object:3904" }],
        "skills": [{ "id": "68", "elder_id": "1", "skill": "java", "status": "1", "created_at": "2017-04-21 18:14:46", "updated_at": "2017-04-21 18:14:46" }, { "id": "69", "elder_id": "1", "skill": "php", "status": "1", "created_at": "2017-04-21 18:14:46", "updated_at": "2017-04-21 18:14:46" }, { "id": "70", "elder_id": "1", "skill": "yii", "status": "1", "created_at": "2017-04-21 18:14:47", "updated_at": "2017-04-21 18:14:47" }],
        "avatar1": "uploads\/avatar\/1492778687usr3.jpg"
    }];
//# sourceMappingURL=elders.js.map