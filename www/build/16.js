webpackJsonp([16],{

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageModule", function() { return AboutPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about__ = __webpack_require__(755);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */]),
            ],
        })
    ], AboutPageModule);
    return AboutPageModule;
}());

//# sourceMappingURL=about.module.js.map

/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { TabsPage } from '../../../pages/tabs/tabs';

var AboutPage = /** @class */ (function () {
    function AboutPage(userProvider, navCtrl, navParams, auth) {
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.showContributorFlag = false;
        this.tapCounter = 0;
        this.tapCounter = 0;
    }
    AboutPage.prototype.goToAdminPage = function () {
        this.navCtrl.push("AdminPage");
    };
    AboutPage.prototype.editProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */], { 'uid': this.userProvider.getUid() });
    };
    AboutPage.prototype.toggleContributor = function () {
        this.showContributorFlag = !this.showContributorFlag;
    };
    AboutPage.prototype.adminOption = function () {
        this.tapCounter++;
        if (this.tapCounter >= 7) {
            this.goToAdminPage();
        }
    };
    AboutPage.prototype.logout = function () {
        this.auth.signOut();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
    ], AboutPage.prototype, "nav", void 0);
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/about/about.html"*/'<ion-header>\n\n  <ion-navbar color="eeeGoldLight">\n    <ion-title>Setting</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding text-center>\n\n  <ion-item *ngIf="!userProvider.firstTimeFlag&&userProvider.userTableInfo[userProvider.getUid()]!=null" no-lines>\n    <ion-avatar item-start>\n      <img src={{userProvider.userTableInfo[userProvider.getUid()].photoUrl}}>\n    </ion-avatar>\n    <h2>{{userProvider.userTableInfo[userProvider.getUid()].name}}</h2>\n    <p>You may update your profile!</p>\n    <button ion-button clear\n            item-end\n            (click)="editProfile()">\n      edit\n    </button>\n  </ion-item>\n\n  <ion-list-header *ngIf="auth.getEmail()">{{auth.getEmail()}}</ion-list-header>\n\n  <ion-item (click)="logout()" *ngIf="auth.authenticated">\n    <ion-icon name="log-out" item-left></ion-icon>\n    Log out\n  </ion-item>\n    \n  <ion-item (click)="login()" *ngIf="!auth.authenticated">\n    <ion-icon name="log-in" item-left></ion-icon>\n    Log in\n  </ion-item>\n\n  \n  <button ion-button block outline (click)="toggleContributor()">Contributor\n    &nbsp;\n    <ion-icon name="close-circle" *ngIf="showContributorFlag"></ion-icon>\n  </button>\n  <div *ngIf="showContributorFlag" style="text-align: center;">\n    <h5>Version:1.0.1</h5>\n    <h6>\n      Supervisor: Prof.Shum Ping\n    </h6>\n    <h6>\n      Puzzle design: Cherie & Gloria\n    </h6>\n    <h6>\n      Logo design: Tao liran\n    </h6>\n    <h6 (click)="adminOption()">\n      Programmer: Tao Liran\n    </h6>\n    <h6>\n      Main framework used: Ionic 3.0, Firebase, AngularFire 2\n    </h6>\n    <h6>\n      Email: TAOL0005@e.ntu.edu.sg\n    </h6>\n  </div>\n  <div class="spacer buttonSpacer"></div>\n  \n  <!-- <ion-item (click)="logout()" *ngIf="auth.authenticated">\n    <ion-icon name="log-out" item-left></ion-icon>\n    Log out\n  </ion-item> -->\n    \n  <ion-item (click)="login()" *ngIf="!auth.authenticated">\n    <ion-icon name="log-in" item-left></ion-icon>\n    Log in\n  </ion-item>\n\n  <img class="eeeLogo" src="assets/imgs/eeeLogoGoldRect.png">\n  <!--../../-->\n</ion-content>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ })

});
//# sourceMappingURL=16.js.map