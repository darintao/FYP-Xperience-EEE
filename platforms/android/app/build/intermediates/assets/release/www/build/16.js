webpackJsonp([16],{

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPageModule", function() { return AdminPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin__ = __webpack_require__(757);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdminPageModule = /** @class */ (function () {
    function AdminPageModule() {
    }
    AdminPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__admin__["a" /* AdminPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__admin__["a" /* AdminPage */]),
            ],
        })
    ], AdminPageModule);
    return AdminPageModule;
}());

//# sourceMappingURL=admin.module.js.map

/***/ }),

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminPage = /** @class */ (function () {
    function AdminPage(statusProvider, settingProvider, navCtrl, navParams) {
        this.statusProvider = statusProvider;
        this.settingProvider = settingProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AdminPage.prototype.goToLocationPage = function () {
        this.navCtrl.push("LocationListPage");
    };
    AdminPage.prototype.startGame = function () {
        this.statusProvider.startGame().then(function (res) {
        }).catch(function (err) {
        });
    };
    AdminPage.prototype.endGame = function () {
        this.statusProvider.endGame().then(function (res) {
        }).catch(function (err) {
        });
    };
    AdminPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/admin/admin/admin.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>Admin</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n    <ion-list no-lines>\n      <ion-item >\n        <button ion-button block (click)="goToLocationPage()"> Edit Game</button>\n      </ion-item>\n      <ion-item>\n        <button ion-button block (click)="startGame()"> Start Game</button>\n      </ion-item>\n      <ion-item\n        *ngIf="statusProvider.statusTableInfo!=null&&(statusProvider.statusTableInfo.endTime==null||statusProvider.statusTableInfo.endTime==\'\')">\n        <button ion-button block (click)="endGame()"> End Game</button>\n      </ion-item>\n    </ion-list>\n    <ion-item\n      *ngIf="statusProvider.statusTableInfo!=null&&(statusProvider.statusTableInfo.endTime==null||statusProvider.statusTableInfo.endTime==\'\')">\n      {{settingProvider.time-statusProvider.statusTableInfo.startTime|date:\'HH:mm:ss\':\'UTC\'}}\n    </ion-item>\n    <ion-item\n      *ngIf="statusProvider.statusTableInfo!=null&&statusProvider.statusTableInfo.endTime!=null&&statusProvider.statusTableInfo.endTime!=\'\'">\n      {{ statusProvider.statusTableInfo.endTime-statusProvider.statusTableInfo.startTime|date:\'HH:mm:ss\':\'UTC\'}}\n    </ion-item>\n  \n  </ion-content>\n  '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/admin/admin/admin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__["a" /* StatusProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], AdminPage);
    return AdminPage;
}());

//# sourceMappingURL=admin.js.map

/***/ })

});
//# sourceMappingURL=16.js.map