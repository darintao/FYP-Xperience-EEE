webpackJsonp([3],{

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RankPageModule", function() { return RankPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rank__ = __webpack_require__(769);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RankPageModule = /** @class */ (function () {
    function RankPageModule() {
    }
    RankPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__rank__["a" /* RankPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__rank__["a" /* RankPage */]),
            ],
        })
    ], RankPageModule);
    return RankPageModule;
}());

//# sourceMappingURL=rank.module.js.map

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_status_status__ = __webpack_require__(172);
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




var RankPage = /** @class */ (function () {
    function RankPage(groupProvider, statusProvider, navCtrl, navParams) {
        this.groupProvider = groupProvider;
        this.statusProvider = statusProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RankPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rank',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/util/rank/rank.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Team Rank</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <ion-toolbar ion-fixed>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6>\n          You team rank:{{statusProvider.groupRankKeys.indexOf(groupProvider.userGroupId)+1}}\n        </ion-col>\n        <ion-col *ngIf="statusProvider.groupStatus.endTime==null\n                        ||statusProvider.groupStatus.endTime==\'\'" col-6>\n          Puzzle Solved:\n          {{statusProvider.puzzleStatusKeys.indexOf(statusProvider.firstUnsolved)}}/{{statusProvider.puzzleStatusKeys.length}}\n        </ion-col>\n        <ion-col *ngIf="statusProvider.groupStatus.endTime!=null\n                        &&statusProvider.groupStatus.endTime!=\'\'" col-6>\n          Finish at {{statusProvider.groupRank[groupProvider.userGroupId].endTime|date:\'HH:mm:ss\'}}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n  <div class="spacer headSpacer"></div>\n  <ion-item *ngFor="let groupId of statusProvider.groupRankKeys"\n            ngClass="{{groupId==groupProvider.userGroupId?\'selfView\':\'\'}}"\n            no-lines >\n    <ion-avatar item-start>\n      <img src={{groupProvider.groupTableInfo[groupId].photoUrl}}>\n    </ion-avatar>\n    <h2>No.{{statusProvider.groupRankKeys.indexOf(groupId)+1}}</h2>\n    <h2>{{groupProvider.groupTableInfo[groupId].name}}</h2>\n    <h5 *ngIf="statusProvider.groupRank[groupId].endTime==null\n        ||statusProvider.groupRank[groupId].timeUsed==\'\'">Puzzle\n      Solved: {{statusProvider.groupRank[groupId].solvedPuzzleNo}}/{{statusProvider.puzzleStatusKeys.length}}</h5>\n    <h5 *ngIf="statusProvider.groupRank[groupId].endTime!=null\n        &&statusProvider.groupRank[groupId].timeUsed!=\'\'">Finished\n      at {{statusProvider.groupRank[groupId].endTime|date:\'HH:mm:ss\'}}</h5>\n    <h5>Time used: {{statusProvider.groupRank[groupId].timeUsed|date:\'HH:mm:ss\':\'UTC\'}}</h5>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/util/rank/rank.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_tables_group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_status_status__["a" /* StatusProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], RankPage);
    return RankPage;
}());

//# sourceMappingURL=rank.js.map

/***/ })

});
//# sourceMappingURL=3.js.map