webpackJsonp([12],{

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllUserPageModule", function() { return AllUserPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__all_user__ = __webpack_require__(759);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AllUserPageModule = /** @class */ (function () {
    function AllUserPageModule() {
    }
    AllUserPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__all_user__["a" /* AllUserPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__all_user__["a" /* AllUserPage */]),
            ],
        })
    ], AllUserPageModule);
    return AllUserPageModule;
}());

//# sourceMappingURL=all-user.module.js.map

/***/ }),

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_group_group__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AllUserPage = /** @class */ (function () {
    function AllUserPage(userProvider, groupProvider, navCtrl, navParams) {
        this.userProvider = userProvider;
        this.groupProvider = groupProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.lock = false;
    }
    AllUserPage.prototype.inviteMemberOut = function (userId) {
        var _this = this;
        this.lock = true;
        this.groupProvider.inviteMemberOut(userId).then(function (res) {
            _this.lock = false;
        }).catch(function (err) {
            _this.lock = false;
        });
    };
    AllUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-all-user',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/all-user/all-user.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>User Page</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list *ngIf="groupProvider.userGroupId!=null\n                    &&groupProvider.groupTableInfo[groupProvider.userGroupId]!=null">\n    <ion-item *ngFor="let userId of groupProvider.groupTableInfo[groupProvider.userGroupId].members"\n              text-wrap>\n      <ion-avatar item-start>\n        <img src={{userProvider.userTableInfo[userId].photoUrl}}>\n      </ion-avatar>\n      <h2>{{userProvider.userTableInfo[userId].name}}</h2>\n      <button *ngIf="userId==userProvider.getUid()"\n              ion-button color="secondary"\n              clear item-end>You\n      </button>\n      <button *ngIf="userId!=userProvider.getUid()"\n              ion-button color="danger" [disabled]="lock"\n              clear item-end (click)="inviteMemberOut(userId)">Invite out\n      </button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/all-user/all-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], AllUserPage);
    return AllUserPage;
}());

//# sourceMappingURL=all-user.js.map

/***/ })

});
//# sourceMappingURL=12.js.map