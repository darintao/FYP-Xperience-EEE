webpackJsonp([7],{

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinishPageModule", function() { return FinishPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__finish__ = __webpack_require__(764);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FinishPageModule = /** @class */ (function () {
    function FinishPageModule() {
    }
    FinishPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__finish__["a" /* FinishPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__finish__["a" /* FinishPage */]),
            ],
        })
    ], FinishPageModule);
    return FinishPageModule;
}());

//# sourceMappingURL=finish.module.js.map

/***/ }),

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FinishPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_game_game__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FinishPage = /** @class */ (function () {
    function FinishPage(gameProvider, domSanitizer, navCtrl, navParams) {
        this.gameProvider = gameProvider;
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.forwardSlash = /\//g;
        this.backSlash = /\\/g;
        this.memoryPieces = [];
        this.memoryPieces = [];
        for (var _i = 0, _a = Object.keys(this.gameProvider.puzzleDetails); _i < _a.length; _i++) {
            var puzzleId = _a[_i];
            if (this.gameProvider.puzzleDetails[puzzleId] != null
                && this.gameProvider.puzzleDetails[puzzleId].memory != null
                && this.gameProvider.puzzleDetails[puzzleId].memory != '') {
                this.memoryPieces.push(this.gameProvider.puzzleDetails[puzzleId].memory);
            }
        }
    }
    FinishPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    FinishPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-finish',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/finish/finish.html"*/'<ion-fab>\n  <button ion-fab mini color="eeeBlueLight" (click)="back()">\n    <ion-icon name="close-circle" style="color: white!important;"></ion-icon>\n  </button>\n</ion-fab>\n<ion-content no-lines no-border no-bounce>\n  <ion-fab>\n    <button ion-fab mini color="eeeBlueLight" (click)="back()">\n      <ion-icon name="close-circle" style="color: white!important;"></ion-icon>\n    </button>\n  </ion-fab>\n  <ion-slides pager="true" parallax="true" padding>\n    <ion-slide *ngFor="let memoryPiece of memoryPieces">\n      <div class="conversation"\n           [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (memoryPiece.replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))"></div>\n    </ion-slide>\n  </ion-slides>\n  <img class="adven" src="assets/imgs/adven.png">\n  <img class="chest" src="assets/imgs/chest.png">\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/finish/finish.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_tables_game_game__["a" /* GameProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], FinishPage);
    return FinishPage;
}());

//# sourceMappingURL=finish.js.map

/***/ })

});
//# sourceMappingURL=7.js.map