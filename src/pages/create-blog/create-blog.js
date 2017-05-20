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
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { Camera } from 'ionic-native';
import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ManageBlogsPage } from '../../pages/manage-blogs/manage-blogs';
/*
  Generated class for the CreateBlog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateBlogPage = (function () {
    function CreateBlogPage(formBuilder, navCtrl, navParams, storage, blogListService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.blogListService = blogListService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.highlights = '';
        this.tags = [];
        this.featuredImage = '';
        this.tagsModel = [];
        this.bannerImage = '';
        this.submitAttempt = false;
        this.blogTitle = "Create Blog";
        this.blogId = 0;
        this.action = "add";
        this.title = '';
        this.category = '';
        this.description = '';
        this.user_id = 0;
        this.user_type = '';
        this.actionUrl = 'addBlog';
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('id').then(function (id) { _this.user_id = id; });
            storage.get('user_type').then(function (user_type) { _this.user_type = user_type; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.blogId = navParams.get("blogId");
                _this.action = navParams.get("action");
                var loader = _this.loadingCtrl.create({ content: "Please wait..." });
                loader.present();
                if (_this.blogId > 0 && _this.action == 'edit') {
                    _this.blogTitle = "Edit Blog";
                    _this.getEditBlog(_this.blogId);
                }
                _this.getBlogCategories();
                loader.dismiss();
            });
        });
        this.blogForm = formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
            category: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])]
        });
    }
    CreateBlogPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    CreateBlogPage.prototype.getEditBlog = function (blogId) {
        var _this = this;
        this.blogListService.getEditBlog(blogId).subscribe(function (getEditBlog) {
            _this.title = getEditBlog.result.title;
            _this.category = getEditBlog.result.category;
            _this.highlights = getEditBlog.result.highlights;
            _this.description = getEditBlog.result.description;
            if (getEditBlog.result.featured_image != '') {
                _this.featuredImage = _this.imageUrl + getEditBlog.result.featured_image;
            }
            if (getEditBlog.result.banner_image != '') {
                _this.bannerImage = _this.imageUrl + getEditBlog.result.banner_image;
            }
            var tagsObject = getEditBlog.result.tags;
            for (var i = 0; Object.keys(tagsObject).length > i; i++) {
                _this.tagsModel[i] = tagsObject[i].name;
            }
            _this.allowComments = getEditBlog.result.allow_comment;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    CreateBlogPage.prototype.getBlogCategories = function () {
        var _this = this;
        this.blogListService.getBlogCategory().subscribe(function (getBlogCategories) {
            _this.categoriesList = getBlogCategories.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    CreateBlogPage.prototype.getTagsList = function ($event) {
        var _this = this;
        var tagsInput = $event.target.value;
        if (tagsInput != '') {
            this.blogListService.getTagsList(tagsInput).subscribe(function (getTagsList) {
                _this.tags = [];
                for (var i = 0; i < Object.keys(getTagsList).length; i++) {
                    _this.tags.push(getTagsList[i].name);
                }
            }, function (err) {
                if (err.status === 401) {
                    // this.showToaster(JSON.parse(err._body).error);
                }
                else {
                    _this.showToaster("Try again later");
                }
            });
        }
    };
    CreateBlogPage.prototype.accessGallery = function (type) {
        var _this = this;
        Camera.getPicture({
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL
        }).then(function (imageData) {
            if (type == 'banner') {
                _this.bannerImage = 'data:image/jpeg;base64,' + imageData;
            }
            else {
                _this.featuredImage = 'data:image/jpeg;base64,' + imageData;
            }
        }, function (err) {
            console.log(err);
        });
    };
    CreateBlogPage.prototype.createBlog = function () {
        var _this = this;
        if (!this.blogForm.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
            var loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            var tagsObj = [];
            if (this.tagsModel.length > 0) {
                for (var j = 0; j < this.tagsModel.length; j++) {
                    tagsObj.push({ "name": this.tagsModel[j] });
                }
            }
            this.blogObject = { "category": this.blogForm.value.category, "allow_comment": this.allowComments, "title": this.blogForm.value.title, "highlights": this.highlights,
                "description": this.blogForm.value.description, "featured_image": this.featuredImage, "banner_image": this.bannerImage, "tags": tagsObj, "app": ''
            };
            if (this.action == 'edit') {
                this.actionUrl = 'editBlog/' + this.blogId;
                this.blogObject.id = this.blogId;
                this.blogObject.author = this.user_id;
                this.blogObject.author_type = this.user_type;
                console.log(this.blogObject);
            }
            this.blogListService.createBlog(this.blogObject, this.actionUrl).subscribe(function (createBlog) {
                _this.navCtrl.push(ManageBlogsPage);
                _this.showToaster(createBlog.result);
                //console.log(createBlog.result);
            }, function (err) {
                if (err.status === 401) {
                    _this.showToaster(JSON.parse(err._body).error);
                }
                else {
                    _this.showToaster("Try again later");
                }
            });
            loader.dismiss();
        }
    };
    CreateBlogPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return CreateBlogPage;
}());
CreateBlogPage = __decorate([
    Component({
        selector: 'page-create-blog',
        templateUrl: 'create-blog.html',
        providers: [BlogListService]
    }),
    __metadata("design:paramtypes", [FormBuilder, NavController, NavParams, Storage, BlogListService, LoadingController, ToastController])
], CreateBlogPage);
export { CreateBlogPage };
//# sourceMappingURL=create-blog.js.map