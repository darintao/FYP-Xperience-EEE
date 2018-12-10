webpackJsonp([2],{

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro__ = __webpack_require__(768);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IntroPageModule = /** @class */ (function () {
    function IntroPageModule() {
    }
    IntroPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__intro__["a" /* IntroPage */]),
            ],
        })
    ], IntroPageModule);
    return IntroPageModule;
}());

//# sourceMappingURL=intro.module.js.map

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntroPage = /** @class */ (function () {
    function IntroPage(domSanitizer, navCtrl, navParams) {
        this.domSanitizer = domSanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.forwardSlash = /\//g;
        this.backSlash = /\\/g;
        this.navNumber = 0;
        this.conversationContent = ["Hi, I am \\Prof. X/! In \\2008/, I developed the first Artificial Intelligent ‘\\Eccentra/’, to assist me in completing the \\time travelling theory/. With the help of ‘Eccentra’,  we finally developed the time-travelling machine and it garnered me a Nobel prize.",
            "Hi, I am ‘Eccentra’. I am a \\human-shape/ Artificial Intelligent with the capability to learn like a real human being. I \\helped/ Prof. X to develop time-travelling theory and time-travelling machine. No one admires Prof. X more than I do!",
            "‘Eccentra’ is indeed a good assistant. However, it is \\not complete/…for some some reason, which I can’t tell you. There is still \\20% of codes left undeveloped/.",
            "I believe I can do more to help Prof. X if I can get the \\remaining 20% of codes/. These codes are \\hidden somewhere in School of EEE/. The warriors of EEE, I urge you to solve the puzzles and find the codes for me!"];
    }
    IntroPage.prototype.changeNav = function (adder) {
        this.navNumber += adder;
    };
    IntroPage.prototype.ionViewDidLoad = function () {
    };
    IntroPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    IntroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-intro',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/intro/intro.html"*/'<ion-fab>\n  <button ion-fab mini color="eeeBlueLight" (click)="back()">\n    <ion-icon name="close-circle" style="color: white!important;"></ion-icon>\n  </button>\n</ion-fab>\n<ion-content no-lines no-border no-bounce>\n\n  <ion-slides pager="true" parallax="true" padding>\n    <ion-slide>\n\n      <div class="conversation"\n           [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (conversationContent[0].replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))"></div>\n      <img class="prof" src="assets/imgs/prof.png">\n    </ion-slide>\n\n    <ion-slide>\n\n      <div class="conversation"\n           [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (conversationContent[1].replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))"></div>\n      <img class="robot" src="assets/imgs/robot.png">\n    </ion-slide>\n\n    <ion-slide>\n\n      <div class="conversation"\n           [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (conversationContent[2].replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))"></div>\n      <img class="prof" src="assets/imgs/prof.png">\n    </ion-slide>\n\n    <ion-slide>\n\n      <div class="conversation"\n           [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (conversationContent[3].replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))"></div>\n      <img class="prof" class="robot" src="assets/imgs/robot.png">\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/intro/intro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ })

});
//# sourceMappingURL=2.js.map