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
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { CommunityServices } from '../../providers/community-services';
import { DashboardPage } from '../../pages/dashboard/dashboard';
var EldersPage = (function () {
    //-----------------------END-------------------//
    function EldersPage(nav, storage, formBuilder, navParams, communityServices, loadingCtrl) {
        // this.getElderMasterDetails();
        var _this = this;
        this.nav = nav;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.communityServices = communityServices;
        this.loadingCtrl = loadingCtrl;
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
                if (_this.functionality == 'edit') {
                    if (navParams.get("editData") != null) {
                        // let dependent = navParams.get("editData");
                        _this.loadManageDependentData(navParams.get("editData").id);
                    }
                }
            });
        });
        // this.today = "";
        this.job_interest = false;
        this.authForm = formBuilder.group({
            elder_name: ['', Validators.compose([Validators.required])],
            elder_number: ['', Validators.compose([Validators.required])],
            elder_address: ['', Validators.compose([Validators.required])],
            elder_dob: ['', Validators.compose([Validators.required])],
            elder_email: ['', Validators.compose([Validators.required])],
            elder_password: ['', Validators.compose([Validators.required])],
            elder_location: ['', Validators.compose([Validators.required])],
            emergency_numbers: ['', Validators.compose([Validators.required])],
            experienceYears: ['', Validators.compose([Validators.required])],
            college: ['', Validators.compose([Validators.required])],
            elderGraduation: ['', Validators.compose([Validators.required])],
            elderSpecialization: ['', Validators.compose([Validators.required])],
            functional_area: ['', Validators.compose([Validators.required])],
            functional_duration: ['', Validators.compose([Validators.required])]
        });
        // }
        this.nav = nav;
    }
    EldersPage.prototype.loadManageDependentData = function (elderId) {
        var _this = this;
        this.communityServices.getElder(elderId).subscribe(function (elder) {
            _this.manageDependentData = elder.result.info[0];
            // this.manageDependentData = data[0] ;
            _this.elder_id = _this.manageDependentData.id;
            _this.elder_name = _this.manageDependentData.name;
            _this.elder_service = _this.manageDependentData.in_service;
            _this.elder_number = _this.manageDependentData.mobile;
            _this.elder_dob = _this.getDate(_this.manageDependentData.dob);
            _this.elder_email = _this.manageDependentData.email;
            _this.elder_password = _this.manageDependentData.password;
            _this.elder_location = _this.manageDependentData.location;
            _this.elder_relation = _this.manageDependentData.relation;
            _this.elder_address = _this.manageDependentData.address;
            var emergency = _this.manageDependentData.emergency;
            if (emergency.length != 0) {
                _this.emergency_list.pop();
                for (var i = 0; i < emergency.length; i++) {
                    _this.emergency_name.push(emergency[i].person);
                    _this.emergency_no.push(emergency[i].mobile);
                    _this.emergency_list.push({ emergency: [i] });
                }
            }
            _this.job_interest = _this.manageDependentData.job_interested;
            if (_this.job_interest) {
                console.log("interested in job");
                _this.area_of_interest = _this.manageDependentData.area_interest;
                _this.job_type = _this.manageDependentData.job_type;
                var experiences = _this.manageDependentData.experience;
                // console.log(this.manageDependentData.experience);
                if (experiences.length != 0) {
                    _this.experience_list.pop();
                    for (var i = 0; i < experiences.length; i++) {
                        _this.experience_industry.push(experiences[i].functional_id);
                        _this.experience_years.push(experiences[i].year);
                        _this.experience_duration.push(experiences[i].duration);
                        _this.experience_list.push({ experience: [i] });
                    }
                }
                var skills = _this.manageDependentData.skills;
                if (skills.length != 0) {
                    for (var i = 0; i < skills.length; i++) {
                        _this.skill_set.push(skills[i].skill);
                    }
                }
                var educations = _this.manageDependentData.education;
                if (educations.length != 0) {
                    _this.education_list.pop();
                    for (var i = 0; i < educations.length; i++) {
                        _this.education_graduation.push(educations[i].graduation);
                        _this.education_specialization.push(educations[i].specialization);
                        _this.education_college.push(educations[i].university);
                        _this.education_list.push({ education: [i] });
                    }
                }
            }
        }, function (err) {
            _this.communityServices.showErrorToast(err);
        });
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
    EldersPage.prototype.removeEmergency = function () {
        this.emergency_list.pop({ emergency: "" });
    };
    EldersPage.prototype.addExperience = function (count) {
        // this.getElderMasterDetails();
        this.experience_list.push({ experience: "" });
    };
    EldersPage.prototype.removeExperience = function () {
        this.experience_list.pop();
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
        if (this.functionality != "edit") {
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
        if (this.functionality != "edit") {
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
        if (this.functionality != "edit") {
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
        if (this.functionality != "edit") {
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
                    "experience": this.experience_data,
                    "education": this.education_data,
                    "sponsor_id": this.sponsor_id,
                    "job_interested": this.job_interest
                }]
        };
        //-------------------modified----------------------------//
        if (this.functionality == "edit") {
            if (this.authForm.value.elder_name != "") {
                this.elder_name = this.authForm.value.elder_name;
            }
            if (this.authForm.value.elder_number != "") {
                this.elder_number = this.authForm.value.elder_number;
            }
            if (this.authForm.value.elder_address != "") {
                this.elder_address = this.authForm.value.elder_address;
            }
            var editedData = { "info": [{ "id": this.elder_id,
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
                        "education": this.education_data
                    }] };
            this.communityServices.editSubmit(editedData).subscribe(function (elders) {
                console.log(elders);
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
        }
        else {
            this.communityServices.addSubmit(dependentData).subscribe(function (elders) {
                console.log(elders);
            }, function (err) {
                _this.communityServices.showErrorToast(err);
            });
        }
        this.nav.pop();
    };
    EldersPage.prototype.cancel = function () {
        this.nav.pop();
    };
    EldersPage.prototype.dashboardPage = function () {
        this.nav.setRoot(DashboardPage);
    };
    return EldersPage;
}());
EldersPage = __decorate([
    Component({
        selector: 'page-elders',
        templateUrl: 'elders.html',
        providers: [CommunityServices]
    }),
    __metadata("design:paramtypes", [NavController, Storage, FormBuilder, NavParams, CommunityServices, LoadingController])
], EldersPage);
export { EldersPage };
//# sourceMappingURL=elders.js.map