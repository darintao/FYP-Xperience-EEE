webpackJsonp([1],{

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(770);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utility_camera_camera__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_setting_setting__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utility_toast_toast__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = /** @class */ (function () {
    function ProfilePage(actionSheetCtrl, toastProvider, settingProvider, cameraProvider, userProvider, navCtrl, navParams) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastProvider = toastProvider;
        this.settingProvider = settingProvider;
        this.cameraProvider = cameraProvider;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userTemp = {};
        this.lock = false;
        this.uid = '';
        this.nameChecked = false;
        this.uid = this.navParams.get('uid');
        if (this.uid == null || this.uid == '')
            this.initUser();
        else {
            this.userTemp = this.userProvider.userTableInfo[this.uid];
        }
        this.cameraProvider.initStartUpImage(this.userTemp.photoUrl);
        this.lock = false;
    }
    ProfilePage.prototype.changeName = function () {
        this.nameChecked = false;
    };
    ProfilePage.prototype.initUser = function () {
        this.userTemp = {};
        this.userTemp.name = '';
        this.userTemp.edited = false;
        this.userTemp.photoUrl = this.cameraProvider.userDefault;
    };
    ProfilePage.prototype.checkName = function () {
        if (!this.settingProvider.checkName(this.userTemp.name)) {
            return;
        }
        this.nameChecked = true;
    };
    ProfilePage.prototype.chooseImage = function () {
        this.presentChoice();
    };
    ProfilePage.prototype.presentChoice = function () {
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
    ProfilePage.prototype.update = function () {
        var _this = this;
        console.log("update profile");
        this.lock = true;
        if (this.userTemp.photoUrl != this.cameraProvider.base64Image) {
            this.cameraProvider.uploadImage(this.cameraProvider.userImgRef).then(function (url) {
                _this.userTemp.photoUrl = url;
                _this.updateFurther();
            }).catch(function (err) {
                _this.lock = false;
            });
        }
        else {
            this.updateFurther();
        }
    };
    ProfilePage.prototype.updateFurther = function () {
        var _this = this;
        this.userProvider.updateUser(this.userTemp).then(function (res) {
            if (_this.uid == null || _this.uid == '') {
                _this.navCtrl.push("TabsPage");
            }
            else {
                if (_this.navCtrl.canGoBack())
                    _this.navCtrl.pop();
            }
            _this.lock = false;
        })
            .catch(function (err) {
            _this.lock = false;
        });
    };
    ProfilePage.prototype.ionViewWillLeave = function () {
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/profile/profile.html"*/'<ion-header>\n\n        <ion-navbar color="eeeGoldLight">\n          <ion-title>Profile</ion-title>\n        </ion-navbar>\n      \n      </ion-header>\n      \n      \n      <ion-content padding>\n        <ion-item *ngIf="!nameChecked">\n          <ion-label stacked>Pick a name</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="userTemp.name" clearInput></ion-input>\n        </ion-item>\n      \n        <button style="margin-top: 5%" *ngIf="!nameChecked" ion-button outline round block [disabled]="lock" (click)="checkName()">Check Name\n        </button>\n      \n        <!--name and image -->\n        <button *ngIf="nameChecked" ion-button outline round block [disabled]="lock"\n                (click)="changeName()">Change name\n        </button>\n        <div *ngIf="nameChecked" class="spacer buttonSpacer"></div>\n      \n        <div *ngIf="nameChecked" class="profileImage">\n          <img src="{{cameraProvider.base64Image}}">\n        </div>\n      \n        <div *ngIf="nameChecked" class="spacer buttonSpacer"></div>\n        <!--name and image -->\n        <h5 *ngIf="nameChecked&&lock">Updating...</h5>\n        <!--first time-->\n        <button *ngIf="nameChecked&&uid==null||uid==\'\'" ion-button outline round block [disabled]="lock"\n                (click)="update()">Use default image\n        </button>\n        <div *ngIf="nameChecked&&uid==null||uid==\'\'" class="spacer buttonSpacer"></div>\n        <button *ngIf="nameChecked&&uid==null||uid==\'\'" ion-button outline round block [disabled]="lock"\n                (click)="chooseImage()">Use other image\n        </button>\n        <h5 *ngIf="nameChecked&&uid==null||uid==\'\'">You can edit again in the setting</h5>\n        <!--first time-->\n      \n        <!--editing-->\n        <button *ngIf="nameChecked&&uid!=null&&uid!=\'\'" ion-button outline round block [disabled]="lock"\n                (click)="update()">Image is OK\n        </button>\n        <div *ngIf="nameChecked&&uid!=null&&uid!=\'\'" class="spacer buttonSpacer"></div>\n        <button *ngIf="nameChecked&&uid!=null&&uid!=\'\'" ion-button outline round block [disabled]="lock"\n                (click)="chooseImage()">Use other image\n        </button>\n        <!--editing-->\n      \n      </ion-content>\n      '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__providers_utility_toast_toast__["a" /* ToastProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utility_camera_camera__["a" /* CameraProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=1.js.map