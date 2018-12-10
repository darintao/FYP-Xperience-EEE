webpackJsonp([15],{

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationListPageModule", function() { return LocationListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location_list__ = __webpack_require__(755);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LocationListPageModule = /** @class */ (function () {
    function LocationListPageModule() {
    }
    LocationListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__location_list__["a" /* LocationListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__location_list__["a" /* LocationListPage */]),
            ],
        })
    ], LocationListPageModule);
    return LocationListPageModule;
}());

//# sourceMappingURL=location-list.module.js.map

/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationListPage = /** @class */ (function () {
    function LocationListPage(settingProvider, gameProvider, navCtrl, navParams) {
        this.settingProvider = settingProvider;
        this.gameProvider = gameProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.locationTemp = {};
        this.locationTempKey = '';
        this.initLocation();
    }
    LocationListPage.prototype.initLocation = function () {
        this.locationTemp = {};
        this.locationTemp.puzzles = null;
        this.locationTemp.name = '';
        this.locationTemp.type = '';
        this.locationTemp.photoUrl = '';
        this.locationTemp.order = 0;
        this.locationTempKey = '';
    };
    LocationListPage.prototype.editLocation = function (locationId) {
        this.locationTemp = this.gameProvider.gameTableInfo[locationId];
        this.locationTempKey = locationId;
    };
    LocationListPage.prototype.addLocation = function () {
        this.locationTempKey = this.settingProvider.time;
    };
    LocationListPage.prototype.updateLocation = function () {
        this.gameProvider.updateLocation(this.locationTempKey, this.locationTemp).then(function (res) {
            console.log("update game table res", res);
        }).catch(function (err) {
            console.log("update game table err", err);
        });
        this.initLocation();
    };
    LocationListPage.prototype.deleteLocation = function (locationId) {
        this.locationTemp = null;
        this.locationTempKey = locationId;
        this.updateLocation();
    };
    LocationListPage.prototype.cancel = function () {
        this.initLocation();
    };
    LocationListPage.prototype.viewPuzzles = function (locationId) {
        this.navCtrl.push("PuzzleListPage", { "locationId": locationId });
    };
    LocationListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-location-list',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/admin/location-list/location-list.html"*/'<ion-header>\n\n    <ion-navbar color="hcolor">\n      <ion-title>Location List</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  <ion-content padding>\n    <ion-list>\n      <ion-item-sliding *ngFor="let locationId of gameProvider.gameTableInfoKeys">\n        <ion-item>\n          <!--<ion-thumbnail item-start>-->\n          <!--<img src={{locationDetails[locationId].photoUrl}}>-->\n          <!--</ion-thumbnail>-->\n          <h2> {{gameProvider.gameTableInfo[locationId].name}}</h2>\n          <p> Type: {{gameProvider.gameTableInfo[locationId].type}}</p>\n          <p> Order: {{gameProvider.gameTableInfo[locationId].order}}</p>\n          <button ion-button clear item-end (click)="viewPuzzles(locationId)">puzzles</button>\n        </ion-item>\n  \n        <ion-item-options slide="left">\n          <button ion-button color="primary" (click)="editLocation(locationId)">\n            <ion-icon name="color-wand"></ion-icon>\n            Edit\n          </button>\n          <button ion-button color="danger" (click)="deleteLocation(locationId)">\n            <ion-icon name="trash"></ion-icon>\n            Del\n          </button>\n          <!--<button ion-button color="danger" (click)="deleteLocation(locationId)">-->\n          <!--<ion-icon name="trash"></ion-icon>-->\n          <!--Del-->\n          <!--</button>-->\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  \n    <div *ngIf="locationTempKey!=null&&locationTempKey!=\'\'">\n      <ion-item-group>\n        <ion-item>\n          <ion-label floating>Location name:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="locationTemp.name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Location type:</ion-label>\n          <ion-select [(ngModel)]="locationTemp.type">\n            <ion-option value="start">Start point</ion-option>\n            <ion-option value="random">Random point</ion-option>\n            <ion-option value="end">End point</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Location order:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="locationTemp.order"></ion-input>\n        </ion-item>\n  \n  \n        <!--<div class="locationImage">-->\n        <!--<img src="{{locationTemp.photoUrl}}">-->\n        <!--</div>-->\n        <!--<button ion-button block (click)="chooseImage()">Choose from Gallery</button>-->\n        <!--<div class="spacer" style="height: 20px;"></div>-->\n        <button ion-button block (click)="updateLocation()">Submit</button>\n        <button ion-button block (click)="cancel()">Cancel</button>\n      </ion-item-group>\n    </div>\n    <button *ngIf="locationTempKey==null||locationTempKey==\'\'" ion-button block (click)="addLocation()">Add new</button>\n    <div class="spacer footSpacer"></div>\n  </ion-content>\n  \n  '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/admin/location-list/location-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_game_game__["a" /* GameProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], LocationListPage);
    return LocationListPage;
}());

//# sourceMappingURL=location-list.js.map

/***/ })

});
//# sourceMappingURL=15.js.map