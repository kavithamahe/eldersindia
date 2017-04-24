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
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Singleblog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SingleblogPage = (function () {
    function SingleblogPage(formBuilder, navCtrl, navParams, blogListService, storage, loadingCtrl, toastCtrl) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.blogListService = blogListService;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.submitAttempt = false;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('id').then(function (id) { _this.user_id = id; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.blogId = navParams.get("blogId");
                _this.onInit(_this.blogId);
                _this.viewComments(_this.blogId);
            });
        });
        this.commentForm = formBuilder.group({
            comment: ['', Validators.compose([Validators.required])]
        });
        this.showComment = true;
    }
    SingleblogPage.prototype.leaveComment = function () {
        this.showComment = !this.showComment;
    };
    SingleblogPage.prototype.onInit = function (blogId) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.blogListService.singleBlog(blogId).subscribe(function (singleBlog) {
            _this.singleBlogInfo = singleBlog.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    SingleblogPage.prototype.blogComment = function (blogId) {
        var _this = this;
        if (!this.commentForm.valid) {
            this.submitAttempt = true;
        }
        else {
            this.submitAttempt = false;
            this.comment = this.commentForm.value.comment;
            var loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            this.commandObj = { "comment": this.comment };
            this.blogListService.blogComment(blogId, this.commandObj).subscribe(function (blogComment) {
                _this.viewComments(_this.blogId);
                _this.commentForm.reset();
                _this.showToaster(blogComment.result);
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
    SingleblogPage.prototype.viewComments = function (blogId) {
        var _this = this;
        this.blogListService.viewComments(blogId).subscribe(function (viewComments) {
            _this.viewCommentsList = viewComments.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    SingleblogPage.prototype.deleteComment = function (commentId) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.blogListService.deleteComment(commentId).subscribe(function (deleteComment) {
            _this.viewComments(_this.blogId);
            _this.showToaster(deleteComment.result);
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    SingleblogPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    SingleblogPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    return SingleblogPage;
}());
SingleblogPage = __decorate([
    Component({
        selector: 'page-singleblog',
        templateUrl: 'singleblog.html',
        providers: [BlogListService]
    }),
    __metadata("design:paramtypes", [FormBuilder, NavController, NavParams, BlogListService, Storage, LoadingController, ToastController])
], SingleblogPage);
export { SingleblogPage };
//# sourceMappingURL=singleblog.js.map