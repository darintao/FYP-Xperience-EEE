webpackJsonp([5],{

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzleSolvePageModule", function() { return PuzzleSolvePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__puzzle_solve__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PuzzleSolvePageModule = /** @class */ (function () {
    function PuzzleSolvePageModule() {
    }
    PuzzleSolvePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__puzzle_solve__["a" /* PuzzleSolvePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__puzzle_solve__["a" /* PuzzleSolvePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], PuzzleSolvePageModule);
    return PuzzleSolvePageModule;
}());

//# sourceMappingURL=puzzle-solve.module.js.map

/***/ }),

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PuzzleSolvePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_tables_user_user__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utility_toast_toast__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utility_loader_loader__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_gallery_modal__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_canvas_draw_canvas_draw__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_speech_recognition__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var PuzzleSolvePage = /** @class */ (function () {
    function PuzzleSolvePage(domSanitizer, platform, cd, speechRecognition, actionSheetCtrl, modalCtrl, loaderProvider, toastProvider, settingProvider, userProvider, gameProvider, statusProvider, navCtrl, navParams) {
        this.domSanitizer = domSanitizer;
        this.platform = platform;
        this.cd = cd;
        this.speechRecognition = speechRecognition;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.loaderProvider = loaderProvider;
        this.toastProvider = toastProvider;
        this.settingProvider = settingProvider;
        this.userProvider = userProvider;
        this.gameProvider = gameProvider;
        this.statusProvider = statusProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.puzzleId = '';
        this.lock = false;
        this.answerTemp = '';
        this.onScrollFlag = false;
        this.noAudio = "Enter your answer here: ";
        this.forwardSlash = /\//g;
        this.backSlash = /\\/g;
        this.placeHolderText = this.noAudio;
        this.isRecording = false;
        this.micActivated = false;
        this.puzzleId = this.navParams.get('puzzleId');
        if (this.statusProvider.puzzleStatus[this.puzzleId] == null) {
            this.navCtrl.pop();
        }
        if (!this.statusProvider.puzzleStatus[this.puzzleId].solved) {
            this.statusProvider.solvingPuzzle = this.puzzleId;
        }
        this.answerTemp = '';
        this.placeHolderText = this.noAudio;
    }
    PuzzleSolvePage.prototype.isIos = function () {
        return this.platform.is('ios');
    };
    PuzzleSolvePage.prototype.closeFab = function () {
        if (this.fab != null)
            this.fab.close();
    };
    PuzzleSolvePage.prototype.checkPermission = function () {
        var _this = this;
        if (this.settingProvider.audioPermission)
            return;
        this.speechRecognition.hasPermission()
            .then(function (hasPermission) {
            if (!hasPermission) {
                _this.speechRecognition.requestPermission().then(function () {
                    _this.settingProvider.audioPermission = true;
                }, function () { return _this.settingProvider.audioPermission = false; });
            }
            else {
                _this.settingProvider.audioPermission = true;
                _this.startListeningFurther();
            }
        });
    };
    PuzzleSolvePage.prototype.selectMatch = function (match) {
        this.answerTemp = match;
        this.closeMicChanel();
    };
    PuzzleSolvePage.prototype.stopListeningMic = function () {
        var _this = this;
        clearTimeout(this.micTimer);
        this.speechRecognition.stopListening().then(function () {
            _this.isRecording = false;
            _this.matches = [];
        });
    };
    PuzzleSolvePage.prototype.openMicChanel = function () {
        this.startListeningMic();
    };
    PuzzleSolvePage.prototype.closeMicChanel = function () {
        this.micActivated = false;
        this.stopListeningMic();
    };
    PuzzleSolvePage.prototype.startListeningMic = function () {
        this.answerTemp = '';
        if (this.settingProvider.audioPermission)
            this.startListeningFurther();
        else
            this.checkPermission();
    };
    PuzzleSolvePage.prototype.startListeningFurther = function () {
        var _this = this;
        this.micActivated = true;
        clearTimeout(this.micTimer);
        this.micTimer = setTimeout(function () {
            _this.stopListeningMic();
        }, 10000);
        this.micActivated = true;
        var options = {
            language: 'en-US'
        };
        this.speechRecognition.startListening().subscribe(function (matches) {
            _this.matches = matches;
            _this.cd.detectChanges();
        });
        this.isRecording = true;
    };
    PuzzleSolvePage.prototype.answerOnfocus = function () {
        if (this.isIos())
            this.closeMicChanel();
    };
    PuzzleSolvePage.prototype.hideTimeScore = function () {
        var _this = this;
        setTimeout(function () {
            _this.settingProvider.showTimeScoreFlag = false;
        }, 1000);
    };
    PuzzleSolvePage.prototype.onScroll = function () {
        this.closeFab();
        var fixedHeight = this.content.getContentDimensions().scrollHeight;
        var relativeHeight = this.content.getContentDimensions().contentHeight
            + this.content.getContentDimensions().scrollTop + 50;
        if (relativeHeight > fixedHeight)
            this.onScrollFlag = false;
        else
            this.onScrollFlag = true;
    };
    PuzzleSolvePage.prototype.onScrollStart = function () {
        this.onScrollFlag = true;
    };
    PuzzleSolvePage.prototype.onScrollEnd = function () {
        this.onScrollFlag = false;
    };
    PuzzleSolvePage.prototype.showOptions = function () {
        var _this = this;
        if (this.settingProvider.showTimeScoreFlag) {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Hey yo! What do yo wanna do?',
                buttons: [
                    {
                        text: 'Hide Time & Score',
                        handler: function () {
                            _this.settingProvider.showTimeScoreFlag = false;
                        }
                    },
                    {
                        text: 'Ask Admin',
                        handler: function () {
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
        }
        else {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Hey yo! What do yo wanna do?',
                buttons: [
                    {
                        text: 'Show Time & Score',
                        handler: function () {
                            _this.settingProvider.showTimeScoreFlag = true;
                        }
                    },
                    {
                        text: 'Ask Admin',
                        handler: function () {
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
        }
    };
    PuzzleSolvePage.prototype.viewIntro = function () {
        this.closeFab();
        this.navCtrl.push('IntroPage');
    };
    PuzzleSolvePage.prototype.viewRank = function () {
        this.closeFab();
        this.navCtrl.push("RankPage");
    };
    PuzzleSolvePage.prototype.viewTable = function () {
        this.closeFab();
        var photos = [];
        photos.push({
            url: 'https://firebasestorage.googleapis.com/v0/b/fyp03-136e5.appspot.com/o/Table.jpg?alt=media&token=a1264fe1-983b-464e-8690-95ab6dfe3228'
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8_ionic_gallery_modal__["a" /* GalleryModal */], {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    };
    PuzzleSolvePage.prototype.viewMap = function () {
        this.closeFab();
        this.navCtrl.push("MapPage");
    };
    PuzzleSolvePage.prototype.showCanvas = function () {
        this.closeFab();
        var canvasModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__components_canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */]);
        canvasModal.onDidDismiss((function (data) {
        }));
        canvasModal.present();
    };
    PuzzleSolvePage.prototype.openImage = function () {
        var photos = [];
        photos.push({
            url: this.gameProvider.puzzleDetails[this.puzzleId].photoUrl
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8_ionic_gallery_modal__["a" /* GalleryModal */], {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    };
    PuzzleSolvePage.prototype.ionViewWillEnter = function () {
        // this.scrollToBottom();
    };
    PuzzleSolvePage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom(300);
        }, 300);
    };
    PuzzleSolvePage.prototype.ionViewWillLeave = function () {
        this.statusProvider.solvingPuzzle = '';
        if (this.isIos()) {
            this.closeMicChanel();
        }
    };
    PuzzleSolvePage.prototype.checkAnswer = function () {
        var correctAnswer = this.gameProvider.puzzleDetails[this.puzzleId].answer.trim().toLowerCase();
        var strictFlag = this.gameProvider.puzzleDetails[this.puzzleId].strictAnswer;
        //ignore space, lower case only
        var cookedAnswer = this.answerTemp.trim().toLowerCase();
        if (strictFlag) {
            return correctAnswer == cookedAnswer;
        }
        else {
            //cookedAnswer match 80% of correct answer length, correct answer contains cookedAnswer, or cookedAnswer contains correct answer
            return (cookedAnswer.length >= 0.8 * correctAnswer.length && (cookedAnswer.indexOf(correctAnswer) >= 0 || correctAnswer.indexOf(cookedAnswer) >= 0));
        }
    };
    PuzzleSolvePage.prototype.answerPuzzle = function () {
        var _this = this;
        if (!this.checkAnswer()) {
            this.toastProvider.showToast("Oops, wrong answer, try again");
            return;
        }
        this.lock = true;
        this.loaderProvider.showLoader("Correct answer, updating!");
        this.statusProvider.answerPuzzle(this.puzzleId).then(function (res) {
            _this.statusProvider.changePoint(_this.statusProvider.answerPoint).then(function (res) {
                _this.lock = false;
                _this.loaderProvider.dismissLoader();
                if (res) {
                    if (_this.gameProvider.puzzleDetails[_this.puzzleId] != null
                        && _this.gameProvider.puzzleDetails[_this.puzzleId].memory != null
                        && _this.gameProvider.puzzleDetails[_this.puzzleId].memory != '') {
                        _this.scrollToBottom();
                    }
                    else {
                        _this.navCtrl.pop();
                    }
                }
            }).catch(function (err) {
                _this.lock = false;
                _this.loaderProvider.dismissLoader();
            });
        }).catch(function (err) {
            _this.lock = false;
            _this.loaderProvider.dismissLoader();
        });
    };
    PuzzleSolvePage.prototype.viewHint1 = function () {
        var _this = this;
        if (this.checkPoint()) {
            this.lock = true;
            this.loaderProvider.showLoader("Hint will be uncovered");
            this.statusProvider.viewHint1(this.puzzleId).then(function (res) {
                _this.statusProvider.changePoint(_this.statusProvider.hintPoint).then(function (res) {
                    _this.lock = false;
                    _this.loaderProvider.dismissLoader();
                }).catch(function (err) {
                    _this.lock = false;
                    _this.loaderProvider.dismissLoader();
                });
            }).catch(function (err) {
                _this.lock = false;
                _this.loaderProvider.dismissLoader();
            });
        }
    };
    PuzzleSolvePage.prototype.viewHint2 = function () {
        var _this = this;
        if (this.checkPoint()) {
            this.lock = true;
            this.loaderProvider.showLoader("Hint will be uncovered");
            this.statusProvider.viewHint2(this.puzzleId).then(function (res) {
                _this.statusProvider.changePoint(_this.statusProvider.hintPoint).then(function (res) {
                    _this.lock = false;
                    _this.loaderProvider.dismissLoader();
                }).catch(function (err) {
                    _this.lock = false;
                    _this.loaderProvider.dismissLoader();
                });
            }).catch(function (err) {
                _this.lock = false;
                _this.loaderProvider.dismissLoader();
            });
        }
    };
    PuzzleSolvePage.prototype.checkPoint = function () {
        if (this.statusProvider.groupStatus.point < 20) {
            this.toastProvider.showToast("Point not enough, ask admin for help!");
            return false;
        }
        return true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], PuzzleSolvePage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fab'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* FabContainer */])
    ], PuzzleSolvePage.prototype, "fab", void 0);
    PuzzleSolvePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-puzzle-solve',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/puzzle-solve/puzzle-solve.html"*/'<ion-header>\n\n  <ion-navbar color="eeeGoldLight">\n    <ion-title *ngIf="!userProvider.firebaseConnection">\n      <ion-spinner name="bubbles"></ion-spinner>\n      Reconnecting\n    </ion-title>\n    <ion-title *ngIf="userProvider.firebaseConnection&&statusProvider.puzzleStatus[puzzleId].solved==false">\n      Solve the puzzle!\n    </ion-title>\n    <ion-title *ngIf="userProvider.firebaseConnection&&statusProvider.puzzleStatus[puzzleId].solved==true">\n      Solved puzzle\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="showOptions()">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content #content style="text-align: center" padding (ionScrollEnd)="onScrollEnd()"\n             (ionScrollStart)="onScrollStart()" (ionScroll)="onScroll()">\n  <!--<div class="background-wrap">-->\n  <!--<div class="bubble x1"></div>-->\n  <!--<div class="bubble x2"></div>-->\n  <!--<div class="bubble x3"></div>-->\n  <!--<div class="bubble x4"></div>-->\n  <!--<div class="bubble x5"></div>-->\n  <!--<div class="bubble x6"></div>-->\n  <!--<div class="bubble x7"></div>-->\n  <!--<div class="bubble x8"></div>-->\n  <!--<div class="bubble x9"></div>-->\n  <!--<div class="bubble x10"></div>-->\n  <!--</div>-->\n  <ion-fab #fab right bottom ion-fixed>\n    <button ion-fab mini color="eeeGoldLight">\n      <ion-icon name="arrow-dropup"></ion-icon>\n    </button>\n    <ion-fab-list side="top">\n      <button ion-fab (click)="viewIntro()" color="eeeGoldLight">\n        <ion-icon name="logo-freebsd-devil"></ion-icon>\n        <ion-label>Introduction</ion-label>\n      </button>\n      <button ion-fab (click)="viewMap()" color="eeeGoldLight">\n        <ion-icon ios="ios-compass" md="md-compass"></ion-icon>\n        <ion-label>Track me</ion-label>\n      </button>\n      <button ion-fab (click)="viewTable()" color="eeeGoldLight">\n        <ion-icon ios="ios-flask" md="md-flask"></ion-icon>\n        <ion-label>Periodic table</ion-label>\n      </button>\n      <button ion-fab (click)="viewRank()" color="eeeGoldLight">\n        <ion-icon ios="ios-podium" md="md-podium"></ion-icon>\n        <ion-label>Team rank</ion-label>\n      </button>\n      <button mini ion-fab (click)="showCanvas()" color="eeeGoldLight">\n        <ion-icon ios="ios-color-palette" md="md-color-palette"></ion-icon>\n        <ion-label>Doodling</ion-label>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n  <ion-toolbar *ngIf="settingProvider.showTimeScoreFlag" ion-fixed color="eeeGoldLight">\n    <ion-grid class="fontBlue">\n      <ion-row>\n        <ion-col col-6 *ngIf="statusProvider.groupStatus.endTime==null||statusProvider.groupStatus.endTime==\'\'">\n          <ion-icon padding-right ios="ios-alarm" md="md-alarm"></ion-icon>\n          {{settingProvider.time-statusProvider.groupStatus.startTime|date:\'HH:mm:ss\':\'UTC\'}}\n        </ion-col>\n        <ion-col col-6 *ngIf="statusProvider.groupStatus.endTime!=null&&statusProvider.groupStatus.endTime!=\'\'">\n          <ion-icon padding-right ios="ios-alarm" md="md-alarm"></ion-icon>\n          {{statusProvider.groupStatus.endTime-statusProvider.groupStatus.startTime|date:\'HH:mm:ss\':\'UTC\'}}\n        </ion-col>\n        <ion-col col-5>\n          <ion-icon padding-right ios="ios-clipboard" md="md-clipboard"></ion-icon>\n          {{statusProvider.groupStatus.point}}\n        </ion-col>\n        <ion-col col-1>\n          <ion-icon padding-right name="close-circle" (click)="hideTimeScore()"></ion-icon>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="statusProvider.groupStatus.endTime==null\n                        ||statusProvider.groupStatus.endTime==\'\'">\n        <div col-1>\n        </div>\n        <div class="progress-outer" col-9>\n          <div class="progress-inner"\n               [style.width]="statusProvider.puzzleStatusKeys.indexOf(statusProvider.firstUnsolved)/statusProvider.puzzleStatusKeys.length*100 + \'%\'">\n          </div>\n        </div>\n        <div col-2 class="statusNumber">\n          {{statusProvider.puzzleStatusKeys.indexOf(statusProvider.firstUnsolved)}}/{{statusProvider.puzzleStatusKeys.length}}\n        </div>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n\n  <div class="spacer headSpacer"></div>\n\n  <h2 style="text-align: center;">{{gameProvider.puzzleDetails[puzzleId].title}}</h2>\n\n  <h5 style="text-align: center;"\n      [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (gameProvider.puzzleDetails[puzzleId].puzzleContent.replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))">\n\n  </h5>\n  <img src=\'{{gameProvider.puzzleDetails[puzzleId].photoUrl}}\' (click)="openImage()">\n\n  <div class="spacer buttonSpacer"></div>\n  <h5 style="text-align: center;"\n      *ngIf="statusProvider.puzzleStatus[puzzleId].hint1==false\n            &&gameProvider.puzzleDetails[puzzleId].hint1!=null\n            &&gameProvider.puzzleDetails[puzzleId].hint1!=\'\'" class="importantText">\n    Try to save point for hard ones!\n  </h5>\n  <button ion-button [disabled]="lock"\n          class="in-progress"\n          *ngIf="statusProvider.puzzleStatus[puzzleId].hint1==false\n            &&gameProvider.puzzleDetails[puzzleId].hint1!=null\n            &&gameProvider.puzzleDetails[puzzleId].hint1!=\'\'"\n          block outline (click)="viewHint1()">Hint(-20)\n  </button>\n  <h5 *ngIf="statusProvider.puzzleStatus[puzzleId].hint1==true" style="text-align: left;">Hint\n    1: {{gameProvider.puzzleDetails[puzzleId].hint1}}</h5>\n  <div *ngIf="statusProvider.puzzleStatus[puzzleId].hint1==false\n            &&gameProvider.puzzleDetails[puzzleId].hint1!=null\n            &&gameProvider.puzzleDetails[puzzleId].hint1!=\'\'"\n       class="spacer buttonSpacer"></div>\n  <button ion-button [disabled]="lock"\n          *ngIf="statusProvider.puzzleStatus[puzzleId].hint2==false&&statusProvider.puzzleStatus[puzzleId].hint1==true\n            &&gameProvider.puzzleDetails[puzzleId].hint2!=null\n            &&gameProvider.puzzleDetails[puzzleId].hint2!=\'\'"\n          block outline (click)="viewHint2()">View More Hint(-20)\n  </button>\n  <h5 *ngIf="statusProvider.puzzleStatus[puzzleId].hint2==true" style="text-align: left;">Hint\n    2: {{gameProvider.puzzleDetails[puzzleId].hint2}}</h5>\n  <!--<div class="spacer buttonSpacer"></div>-->\n  <div *ngIf="statusProvider.puzzleStatus[puzzleId].solved==false">\n    <ion-item>\n      <!--<ion-label color="primary" floating>Answer:</ion-label>-->\n      <ion-input type="text" placeholder="{{placeHolderText}}"\n                 [(ngModel)]="answerTemp" clearInput (ionFocus)="answerOnfocus()"></ion-input>\n      <ion-icon *ngIf="isIos()&&!micActivated" item-end name="mic" (click)="openMicChanel()"></ion-icon>\n      <ion-icon *ngIf="isIos()&&micActivated" item-end name="mic-off" (click)="closeMicChanel()"></ion-icon>\n    </ion-item>\n    <button ion-button round outline *ngIf="micActivated&&!isRecording" (click)="startListeningMic()">Click to record\n    </button>\n    <h5 *ngIf="micActivated&&isRecording">I am listening...\n      <div class="timer">\n        <div class="mask"></div>\n      </div>\n    </h5>\n    <button ion-button round outline *ngIf="micActivated&&isRecording" (click)="stopListeningMic()">Click to stop\n    </button>\n    <h5 *ngIf="(micActivated&&!isRecording)&&(matches==null||matches.length<0)">No match yet</h5>\n    <ion-card *ngIf="micActivated&&!isRecording&&matches!=null&&matches.length>=0" text-center>\n      <ion-card-header>Select a match below</ion-card-header>\n      <ion-card-content>\n        <ion-list>\n          <ion-item *ngFor="let match of matches" (click)="selectMatch(match)" text-center>\n            {{ match }}\n          </ion-item>\n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n    <button style="margin-top: 5%" ion-button block outline (click)="answerPuzzle()">Submit (+10)</button>\n  </div>\n  <div padding *ngIf="statusProvider.puzzleStatus[puzzleId].solved==true">\n    <h5 style="text-align: center;">Puzzle has been solved,\n      answer: </h5>\n    <h3>\n      {{gameProvider.puzzleDetails[puzzleId].answer}}\n    </h3>\n    <h5 *ngIf="statusProvider.puzzleStatus[puzzleId].solvedBy!=null\n    &&userProvider.userTableInfo[statusProvider.puzzleStatus[puzzleId].solvedBy]!=null"\n        style="text-align: center;">Solved by:\n    </h5>\n    <img class="solvedByAvatar"\n         *ngIf="statusProvider.puzzleStatus[puzzleId].solvedBy!=null\n    &&userProvider.userTableInfo[statusProvider.puzzleStatus[puzzleId].solvedBy]!=null"\n         src={{userProvider.userTableInfo[statusProvider.puzzleStatus[puzzleId].solvedBy].photoUrl}}>\n    <span class="shadowText" *ngIf="statusProvider.puzzleStatus[puzzleId].solvedBy!=null\n    &&userProvider.userTableInfo[statusProvider.puzzleStatus[puzzleId].solvedBy]!=null">\n      {{userProvider.userTableInfo[statusProvider.puzzleStatus[puzzleId].solvedBy].name}}</span>\n\n    <h5 style="text-align: center;" *ngIf="gameProvider.puzzleDetails[puzzleId].memory!=null\n              &&gameProvider.puzzleDetails[puzzleId].memory!=\'\'">\n      <ion-icon name="happy"></ion-icon>\n      Memory piece has been unlocked:\n    </h5>\n    <h5 class="shadowText"\n        [innerHtml]="domSanitizer.\n        bypassSecurityTrustHtml\n        (gameProvider.puzzleDetails[puzzleId].memory.replace(forwardSlash, \'</span>\').replace(backSlash,\'<span>\'))">\n    </h5>\n  </div>\n  <div class="spacer footSpacer"></div>\n  <div ion-fixed style="width: 100%;top:90%;text-align: center;"\n       *ngIf="onScrollFlag\n       &&!statusProvider.puzzleStatus[puzzleId].solved">\n    <h5>\n      <ion-icon name="arrow-down"></ion-icon>\n      Enter answer at bottom!\n    </h5>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/puzzle-solve/puzzle-solve.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_utility_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utility_toast_toast__["a" /* ToastProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__["a" /* SettingProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_tables_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_tables_game_game__["a" /* GameProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__["a" /* StatusProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], PuzzleSolvePage);
    return PuzzleSolvePage;
}());

//# sourceMappingURL=puzzle-solve.js.map

/***/ })

});
//# sourceMappingURL=5.js.map