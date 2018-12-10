webpackJsonp([8],{

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupProfilePageModule", function() { return GroupProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_profile__ = __webpack_require__(763);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupProfilePageModule = /** @class */ (function () {
    function GroupProfilePageModule() {
    }
    GroupProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__group_profile__["a" /* GroupProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group_profile__["a" /* GroupProfilePage */]),
            ],
        })
    ], GroupProfilePageModule);
    return GroupProfilePageModule;
}());

//# sourceMappingURL=group-profile.module.js.map

/***/ }),

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utility_camera_camera__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GroupProfilePage = /** @class */ (function () {
    function GroupProfilePage(actionSheetCtrl, settingProvider, cameraProvider, userProvider, groupProvider, navCtrl, navParams) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.settingProvider = settingProvider;
        this.cameraProvider = cameraProvider;
        this.userProvider = userProvider;
        this.groupProvider = groupProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupTemp = {};
        this.lock = false;
        this.nameChecked = false;
        this.groupId = this.navParams.get("groupId");
        if (this.groupId != null) {
            this.groupTemp.name = this.groupProvider.groupTableInfo[this.groupId].name;
            this.groupTemp.photoUrl = this.groupProvider.groupTableInfo[this.groupId].photoUrl;
        }
        else
            this.initGroup();
        this.cameraProvider.initStartUpImage(this.groupTemp.photoUrl);
        this.lock = false;
    }
    GroupProfilePage.prototype.initGroup = function () {
        this.groupTemp = {};
        this.groupTemp.members = [];
        this.groupTemp.groupCreator = '';
        this.groupTemp.photoUrl = this.cameraProvider.groupDefault;
        if (this.userProvider.userTableInfo[this.userProvider.getUid()] != null
            && this.userProvider.userTableInfo[this.userProvider.getUid()].name != null
            && this.userProvider.userTableInfo[this.userProvider.getUid()].name != '')
            this.groupTemp.name = this.userProvider.userTableInfo[this.userProvider.getUid()].name + "'s group";
        else {
            this.groupTemp.name = '';
        }
        this.groupTemp.groupNumber = 0;
    };
    GroupProfilePage.prototype.changeName = function () {
        this.nameChecked = false;
    };
    GroupProfilePage.prototype.checkName = function () {
        if (!this.settingProvider.checkName(this.groupTemp.name)) {
            return;
        }
        this.nameChecked = true;
    };
    GroupProfilePage.prototype.update = function () {
        this.lock = true;
        if (this.groupId == null)
            this.createGroup();
        else
            this.updateGroup();
    };
    GroupProfilePage.prototype.updateGroup = function () {
        var _this = this;
        if (this.groupTemp.photoUrl != this.cameraProvider.base64Image) {
            this.cameraProvider.uploadImage(this.cameraProvider.groupImgRef).then(function (url) {
                _this.groupTemp.photoUrl = url;
                _this.updateGroupFurther();
            }).catch(function (err) {
            });
        }
        else {
            this.updateGroupFurther();
        }
    };
    GroupProfilePage.prototype.updateGroupFurther = function () {
        var _this = this;
        this.groupProvider.updateGroup(this.groupId, this.groupTemp).then(function (res) {
            if (res) {
                if (_this.navCtrl.canGoBack())
                    _this.navCtrl.pop();
            }
        }).catch(function (err) {
            _this.lock = false;
        });
    };
    GroupProfilePage.prototype.chooseImage = function () {
        this.presentChoice();
    };
    GroupProfilePage.prototype.presentChoice = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Source:',
            buttons: [
                {
                    text: 'Gallery',
                    handler: function () {
                        _this.cameraProvider.initGallery();
                        _this.cameraProvider.getPicture().then(function (res) {
                            _this.update();
                        }).catch(function (err) {
                        });
                    }
                },
                {
                    text: 'Camera',
                    handler: function () {
                        _this.cameraProvider.initCamera();
                        _this.cameraProvider.getPicture().then(function (res) {
                            _this.update();
                        }).catch(function (err) {
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    GroupProfilePage.prototype.quitGroup = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.groupProvider.quitGroup().then(function (res) {
                console.log(res);
                resolve(true);
            }).catch(function (err) {
                console.log(err);
                reject(err);
                _this.lock = false;
            });
        });
        return promise;
    };
    GroupProfilePage.prototype.createGroup = function () {
        var _this = this;
        this.groupTemp.members.push(this.userProvider.getUid());
        this.groupTemp.groupCreator = this.userProvider.getUid();
        if (this.groupProvider.userGroupId == null || this.groupProvider.userGroupId == '') {
            this.createGroupFurther();
        }
        else {
            this.quitGroup().then(function (res) {
                if (res) {
                    _this.createGroupFurther();
                }
            }).catch(function (err) {
            });
        }
    };
    GroupProfilePage.prototype.createGroupFurther = function () {
        var _this = this;
        if (this.groupTemp.photoUrl != this.cameraProvider.base64Image) {
            this.cameraProvider.uploadImage(this.cameraProvider.groupImgRef).then(function (url) {
                _this.groupTemp.photoUrl = url;
                _this.createGroupFurtherMore();
            }).catch(function (err) {
            });
        }
        else {
            this.createGroupFurtherMore();
        }
    };
    GroupProfilePage.prototype.createGroupFurtherMore = function () {
        var _this = this;
        this.groupProvider.createGroup(this.groupTemp).then(function (res) {
            if (_this.navCtrl.canGoBack())
                _this.navCtrl.pop();
        }).catch(function (err) {
            _this.lock = false;
        });
    };
    GroupProfilePage.prototype.uploadGroupImg = function () {
        var _this = this;
        this.cameraProvider.uploadImage(this.cameraProvider.groupDefault).then(function (res) {
            return res;
        }).catch(function (err) {
            return _this.cameraProvider.groupDefault;
        });
    };
    GroupProfilePage.prototype.ionViewWillLeave = function () {
    };
    GroupProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group-profile',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/group-profile/group-profile.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>Group Profile</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n  \n    <ion-item *ngIf="!nameChecked">\n      <ion-label floating>Pick a name</ion-label>\n      <ion-input type="text"\n                 [(ngModel)]="groupTemp.name" clearInput></ion-input>\n    </ion-item>\n  \n    <button style="margin-top: 5%" *ngIf="!nameChecked" ion-button outline round block [disabled]="lock" (click)="checkName()">Check Name\n    </button>\n  \n    <!--name and image -->\n    <button *ngIf="nameChecked" ion-button outline round block [disabled]="lock"\n            (click)="changeName()">Change name\n    </button>\n    <div *ngIf="nameChecked" class="spacer buttonSpacer"></div>\n  \n    <div *ngIf="nameChecked" class="profileImage">\n      <img src="{{cameraProvider.base64Image}}">\n    </div>\n  \n    <div *ngIf="nameChecked" class="spacer buttonSpacer"></div>\n    <!--name and image -->\n    <h5 *ngIf="nameChecked&&lock">Updating...</h5>\n    <!--first time-->\n    <button *ngIf="nameChecked&&groupId==null||groupId==\'\'" ion-button outline round block [disabled]="lock"\n            (click)="update()">Use default image\n    </button>\n    <div *ngIf="nameChecked&&groupId==null||groupId==\'\'" class="spacer buttonSpacer"></div>\n    <button *ngIf="nameChecked&&groupId==null||groupId==\'\'" ion-button outline round block [disabled]="lock"\n            (click)="chooseImage()">Use other image\n    </button>\n    <h5 *ngIf="nameChecked&&groupId==null||groupId==\'\'">You can edit again in options</h5>\n    <!--first time-->\n  \n    <!--editing-->\n    <button *ngIf="nameChecked&&groupId!=null&&groupId!=\'\'" ion-button outline round block [disabled]="lock"\n            (click)="update()">Image is OK\n    </button>\n    <div *ngIf="nameChecked&&groupId!=null&&groupId!=\'\'" class="spacer buttonSpacer"></div>\n    <button *ngIf="nameChecked&&groupId!=null&&groupId!=\'\'" ion-button outline round block [disabled]="lock"\n            (click)="chooseImage()">Use other image\n    </button>\n    <!--editing-->\n  \n  </ion-content>\n  '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/group-profile/group-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_utility_camera_camera__["a" /* CameraProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], GroupProfilePage);
    return GroupProfilePage;
}());

//# sourceMappingURL=group-profile.js.map

/***/ })

});
//# sourceMappingURL=8.js.map