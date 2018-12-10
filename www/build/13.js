webpackJsonp([13],{

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzleListPageModule", function() { return PuzzleListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__puzzle_list__ = __webpack_require__(758);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PuzzleListPageModule = /** @class */ (function () {
    function PuzzleListPageModule() {
    }
    PuzzleListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__puzzle_list__["a" /* PuzzleListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__puzzle_list__["a" /* PuzzleListPage */]),
            ],
        })
    ], PuzzleListPageModule);
    return PuzzleListPageModule;
}());

//# sourceMappingURL=puzzle-list.module.js.map

/***/ }),

/***/ 758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PuzzleListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utility_camera_camera__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PuzzleListPage = /** @class */ (function () {
    function PuzzleListPage(cameraProvider, settingProvider, gameProvider, navCtrl, navParams) {
        this.cameraProvider = cameraProvider;
        this.settingProvider = settingProvider;
        this.gameProvider = gameProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.puzzleTemp = {};
        this.puzzleTempKey = '';
        this.locationId = this.navParams.get("locationId");
        console.log("locationId", this.locationId);
        console.log(this.gameProvider.puzzleInfoKeys[this.locationId]);
        this.initPuzzle();
    }
    PuzzleListPage.prototype.initPuzzle = function () {
        this.puzzleTemp = {};
        this.puzzleTemp.title = '';
        this.puzzleTemp.strictAnswer = false;
        this.puzzleTemp.puzzleContent = '';
        this.puzzleTemp.hint1 = '';
        this.puzzleTemp.hint2 = '';
        this.puzzleTemp.answer = '';
        this.puzzleTemp.photoUrl = this.cameraProvider.puzzleDefault;
        this.puzzleTemp.order = 0;
        this.puzzleTemp.special = false;
        this.puzzleTemp.memory = '';
        this.puzzleTempKey = '';
    };
    PuzzleListPage.prototype.editPuzzle = function (puzzleId) {
        this.puzzleTemp = this.gameProvider.gameTableInfo[this.locationId].puzzles[puzzleId];
        this.puzzleTempKey = puzzleId;
        this.cameraProvider.initStartUpImage(this.puzzleTemp.photoUrl);
    };
    PuzzleListPage.prototype.deletePuzzle = function (puzzleId) {
        this.puzzleTemp = null;
        this.puzzleTempKey = puzzleId;
        this.updatePuzzle();
    };
    PuzzleListPage.prototype.addPuzzle = function () {
        this.puzzleTempKey = this.settingProvider.time;
        this.cameraProvider.initStartUpImage(this.puzzleTemp.photoUrl);
    };
    PuzzleListPage.prototype.updatePuzzle = function () {
        var _this = this;
        if (this.puzzleTemp.photoUrl != this.cameraProvider.base64Image) {
            this.cameraProvider.uploadImage(this.cameraProvider.puzzleRef).then(function (url) {
                _this.puzzleTemp.photoUrl = url;
                _this.updateFurther();
            }).catch(function (err) {
            });
        }
        else {
            this.updateFurther();
        }
    };
    PuzzleListPage.prototype.chooseImage = function () {
        this.cameraProvider.presentChoiceNotSupportedForIOS();
    };
    PuzzleListPage.prototype.updateFurther = function () {
        this.gameProvider.updatePuzzle(this.locationId, this.puzzleTempKey, this.puzzleTemp).then(function (res) {
            console.log("update game table res", res);
        }).catch(function (err) {
            console.log("update game table err", err);
        });
        this.initPuzzle();
    };
    PuzzleListPage.prototype.cancel = function () {
        this.initPuzzle();
    };
    PuzzleListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-puzzle-list',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/admin/puzzle-list/puzzle-list.html"*/'<ion-header>\n\n    <ion-navbar color="hcolor">\n      <ion-title>Puzzle Detail</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  <ion-content padding>\n    <ion-list no-border>\n      <ion-item-sliding *ngFor="let puzzleId of gameProvider.puzzleInfoKeys[locationId]">\n        <ion-item text-wrap>\n          <ion-thumbnail item-start>\n            <img src={{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].photoUrl}}>\n          </ion-thumbnail>\n          <h2> {{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].title}}</h2>\n          <p> Content:{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].puzzleContent}}</p>\n          <p> Hint1 :{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].hint1}}</p>\n          <p> Hint2 :{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].hint2}}</p>\n          <p> Answer :{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].answer}}</p>\n          <p>Strict Answer?{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].strictAnswer}}</p>\n          <p>Special Puzzle?{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].special}}</p>\n          <p>Order:{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].order}}</p>\n          <p>Memory:{{gameProvider.gameTableInfo[locationId].puzzles[puzzleId].memory}}</p>\n        </ion-item>\n        <ion-item-options slide="left">\n          <button ion-button color="primary" (click)="editPuzzle(puzzleId)">\n            <ion-icon name="color-wand"></ion-icon>\n            Edit\n          </button>\n          <button ion-button color="danger" (click)="deletePuzzle(puzzleId)">\n            <ion-icon name="trash"></ion-icon>\n            Del\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  \n    <div *ngIf="puzzleTempKey!=null && puzzleTempKey!=\'\'">\n      <ion-item-group>\n        <ion-item>\n          <ion-label floating>Puzzle title:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="puzzleTemp.title"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Puzzle content:</ion-label>\n          <ion-textarea type="text"\n                        [(ngModel)]="puzzleTemp.puzzleContent"></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Puzzle hint1:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="puzzleTemp.hint1"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Puzzle hint2:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="puzzleTemp.hint2"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Puzzle answer:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="puzzleTemp.answer"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label>Strict answer?</ion-label>\n          <ion-checkbox [(ngModel)]="puzzleTemp.strictAnswer"></ion-checkbox>\n        </ion-item>\n        <ion-item>\n          <ion-label>Puzzle special?</ion-label>\n          <ion-checkbox [(ngModel)]="puzzleTemp.special"></ion-checkbox>\n        </ion-item>\n        <!--*ngIf="editPuzzleFlag"-->\n        <ion-item>\n          <ion-label floating>Puzzle order:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="puzzleTemp.order"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Memory:</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="puzzleTemp.memory"></ion-input>\n        </ion-item>\n  \n  \n        <div class="puzzleImage">\n          <img src="{{cameraProvider.base64Image}}">\n        </div>\n        <button ion-button block (click)="chooseImage()">Choose picture</button>\n        <!--<div class="spacer" style="height: 20px;"></div>-->\n        <button ion-button block (click)="updatePuzzle()">Submit</button>\n        <button ion-button block (click)="cancel()">Cancel</button>\n  \n  \n      </ion-item-group>\n    </div>\n    <button *ngIf="puzzleTempKey==null||puzzleTempKey==\'\'" ion-button block (click)="addPuzzle()">Add new</button>\n  \n    <div class="spacer footSpacer"></div>\n  </ion-content>\n  '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/about/admin/puzzle-list/puzzle-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_utility_camera_camera__["a" /* CameraProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_game_game__["a" /* GameProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], PuzzleListPage);
    return PuzzleListPage;
}());

//# sourceMappingURL=puzzle-list.js.map

/***/ })

});
//# sourceMappingURL=13.js.map