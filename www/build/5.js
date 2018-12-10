webpackJsonp([5],{

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageModule", function() { return GamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(388);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GamePageModule = /** @class */ (function () {
    function GamePageModule() {
    }
    GamePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__game__["a" /* GamePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__game__["a" /* GamePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], GamePageModule);
    return GamePageModule;
}());

//# sourceMappingURL=game.module.js.map

/***/ }),

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_status_status__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_tables_game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_gallery_modal__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_canvas_draw_canvas_draw__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_utility_notification_notification__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_tables_chat_chat__ = __webpack_require__(174);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var GamePage = /** @class */ (function () {
    function GamePage(chatProvider, notificationProvider, actionSheetCtrl, modalController, modalCtrl, settingProvider, userProvider, gameProvider, statusProvider, groupProvider, navCtrl, navParams) {
        this.chatProvider = chatProvider;
        this.notificationProvider = notificationProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalController = modalController;
        this.modalCtrl = modalCtrl;
        this.settingProvider = settingProvider;
        this.userProvider = userProvider;
        this.gameProvider = gameProvider;
        this.statusProvider = statusProvider;
        this.groupProvider = groupProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    GamePage.prototype.onScroll = function () {
        this.closeFab();
    };
    GamePage.prototype.closeFab = function () {
        if (this.fab != null)
            this.fab.close();
    };
    GamePage.prototype.viewAllMemory = function () {
        this.navCtrl.push("FinishPage");
    };
    GamePage.prototype.ionViewWillLeave = function () {
        this.closeFab();
    };
    GamePage.prototype.ionViewWillEnter = function () {
        this.notificationProvider.clearAllNotification();
        if (this.statusProvider.firstUnsolved != null
            && this.statusProvider.firstUnsolved != '')
            this.scrollToBottom();
    };
    GamePage.prototype.ionViewDidLoad = function () {
    };
    GamePage.prototype.askAdmin = function () {
        this.navCtrl.push("ChatPage", { "title": "Public Chat", "receiver": this.chatProvider.public });
    };
    GamePage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content._scroll)
                _this.content.scrollToBottom(300);
        }, 300);
    };
    GamePage.prototype.showOptions = function () {
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
                            _this.askAdmin();
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
                            _this.askAdmin();
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
    GamePage.prototype.hideTimeScore = function () {
        this.settingProvider.showTimeScoreFlag = false;
    };
    GamePage.prototype.joinGroup = function () {
        this.navCtrl.push("GroupListPage");
    };
    GamePage.prototype.puzzleSolve = function (puzzleId) {
        console.log(puzzleId);
        this.navCtrl.push('PuzzleSolvePage', { 'puzzleId': puzzleId });
    };
    GamePage.prototype.startGame = function () {
        this.statusProvider.groupStart().then(function (res) {
        }).catch(function (err) {
        });
    };
    GamePage.prototype.viewIntro = function () {
        this.closeFab();
        this.navCtrl.push('IntroPage');
    };
    GamePage.prototype.viewRank = function () {
        this.closeFab();
        this.navCtrl.push("RankPage");
    };
    GamePage.prototype.viewTable = function () {
        this.closeFab();
        var photos = [];
        photos.push({
            url: 'https://firebasestorage.googleapis.com/v0/b/fyp03-136e5.appspot.com/o/Table.jpg?alt=media&token=a1264fe1-983b-464e-8690-95ab6dfe3228'
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7_ionic_gallery_modal__["a" /* GalleryModal */], {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    };
    GamePage.prototype.viewMap = function () {
        this.closeFab();
        this.navCtrl.push("MapPage");
    };
    GamePage.prototype.showCanvas = function () {
        this.closeFab();
        var canvasModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__components_canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */]);
        canvasModal.onDidDismiss((function (data) {
        }));
        canvasModal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], GamePage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fab'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* FabContainer */])
    ], GamePage.prototype, "fab", void 0);
    GamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-game',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/game/game.html"*/'<ion-header>\n\n    <ion-navbar color="eeeGoldLight">\n      <ion-title *ngIf="!userProvider.firebaseConnection">\n        <ion-spinner name="bubbles"></ion-spinner>\n        Reconnect\n      </ion-title>\n      <ion-title *ngIf="userProvider.firebaseConnection">\n        Xperience @EEE+\n      </ion-title>\n      <ion-buttons *ngIf="(!gameProvider.firstTimeFlag\n      &&!groupProvider.firstTimeFlag\n      &&!statusProvider.firstTimeFlag)\n      &&(statusProvider.statusTableInfo.startTime!=null\n      &&statusProvider.statusTableInfo.startTime!=\'\'\n      &&(statusProvider.statusTableInfo.endTime==null\n      ||statusProvider.statusTableInfo.endTime==\'\'))\n      &&(statusProvider.statusTableInfo.groups!=null\n      &&statusProvider.statusTableInfo.groups.length!=0\n      &&statusProvider.groupStatus!=null\n      &&statusProvider.groupStatus.startTime!=null\n      &&statusProvider.groupStatus.puzzles!=null)" end>\n        <button ion-button icon-only (click)="showOptions()">\n          <ion-icon name="more"></ion-icon>\n        </button>\n      </ion-buttons>\n  \n      <ion-buttons *ngIf="(!gameProvider.firstTimeFlag\n      &&!groupProvider.firstTimeFlag\n      &&!statusProvider.firstTimeFlag)\n      &&(statusProvider.statusTableInfo.startTime!=null\n      &&statusProvider.statusTableInfo.startTime!=\'\'\n      &&(statusProvider.statusTableInfo.endTime==null\n      ||statusProvider.statusTableInfo.endTime==\'\'))\n      &&(statusProvider.statusTableInfo.groups==null\n      ||statusProvider.statusTableInfo.groups.length==0\n      ||statusProvider.groupStatus==null\n      ||statusProvider.groupStatus.startTime==null\n      ||statusProvider.groupStatus.puzzles==null)" end>\n        <button ion-button icon-only (click)="askAdmin()">\n          <ion-icon name="help"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  <ion-content #content (ionScroll)="onScroll()">\n    <ion-toolbar color="eeeGoldLight" *ngIf="(settingProvider.showTimeScoreFlag\n      &&!gameProvider.firstTimeFlag\n      &&!groupProvider.firstTimeFlag\n      &&!statusProvider.firstTimeFlag)\n      &&(statusProvider.statusTableInfo.startTime!=null\n      &&statusProvider.statusTableInfo.startTime!=\'\'\n      &&(statusProvider.statusTableInfo.endTime==null\n      ||statusProvider.statusTableInfo.endTime==\'\'))\n      &&(statusProvider.statusTableInfo.groups!=null\n      &&statusProvider.statusTableInfo.groups.length!=0\n      &&statusProvider.groupStatus!=null\n      &&statusProvider.groupStatus.startTime!=null\n      &&statusProvider.groupStatus.puzzles!=null)" ion-fixed>\n      <ion-grid class="fontBlue">\n        <ion-row style="text-align: center;">\n          <ion-col col-6 *ngIf="statusProvider.groupStatus.endTime==null||statusProvider.groupStatus.endTime==\'\'">\n            <ion-icon padding-right ios="ios-alarm" md="md-alarm"></ion-icon>\n            {{settingProvider.time-statusProvider.groupStatus.startTime|date:\'HH:mm:ss\':\'UTC\'}}\n          </ion-col>\n          <ion-col col-6 *ngIf="statusProvider.groupStatus.endTime!=null&&statusProvider.groupStatus.endTime!=\'\'">\n            <ion-icon padding-right ios="ios-alarm" md="md-alarm"></ion-icon>\n            {{statusProvider.groupStatus.endTime-statusProvider.groupStatus.startTime|date:\'HH:mm:ss\':\'UTC\'}}\n          </ion-col>\n          <ion-col col-5>\n            <ion-icon padding-right ios="ios-clipboard" md="md-clipboard"></ion-icon>\n            {{statusProvider.groupStatus.point}}\n          </ion-col>\n          <ion-col col-1>\n            <ion-icon padding-right name="close-circle" (click)="hideTimeScore()"></ion-icon>\n          </ion-col>\n        </ion-row>\n        <ion-row *ngIf="statusProvider.groupStatus.endTime==null\n                          ||statusProvider.groupStatus.endTime==\'\'">\n          <div col-1>\n          </div>\n          <div class="progress-outer" col-9>\n            <div class="progress-inner"\n                 [style.width]="statusProvider.puzzleStatusKeys.indexOf(statusProvider.firstUnsolved)/statusProvider.puzzleStatusKeys.length*100 + \'%\'">\n            </div>\n          </div>\n          <div col-2 class="statusNumber">\n            {{statusProvider.puzzleStatusKeys.indexOf(statusProvider.firstUnsolved)}}/{{statusProvider.puzzleStatusKeys.length}}\n          </div>\n  \n        </ion-row>\n        <!--<ion-row *ngIf="statusProvider.groupStatus.endTime!=null-->\n        <!--&&statusProvider.groupStatus.endTime!=\'\'" text-center>-->\n        <!--check team rank-->\n        <!--</ion-row>-->\n      </ion-grid>\n    </ion-toolbar>\n    <ion-fab #fab *ngIf="(!gameProvider.firstTimeFlag\n      &&!groupProvider.firstTimeFlag\n      &&!statusProvider.firstTimeFlag)\n      &&(statusProvider.statusTableInfo.startTime!=null\n      &&statusProvider.statusTableInfo.startTime!=\'\'\n      &&(statusProvider.statusTableInfo.endTime==null\n      ||statusProvider.statusTableInfo.endTime==\'\'))\n      &&(statusProvider.statusTableInfo.groups!=null\n      &&statusProvider.statusTableInfo.groups.length!=0\n      &&statusProvider.groupStatus!=null\n      &&statusProvider.groupStatus.startTime!=null\n      &&statusProvider.groupStatus.puzzles!=null)"\n             right bottom ion-fixed>\n      <button ion-fab mini color="eeeGoldLight">\n        <ion-icon name="arrow-dropup"></ion-icon>\n      </button>\n      <ion-fab-list side="top">\n        <button ion-fab (click)="viewIntro()" color="eeeGoldLight">\n          <ion-icon name="logo-freebsd-devil"></ion-icon>\n          <ion-label>Introduction</ion-label>\n        </button>\n        <button ion-fab (click)="viewMap()" color="eeeGoldLight">\n          <ion-icon ios="ios-compass" md="md-compass"></ion-icon>\n          <ion-label>Track me</ion-label>\n        </button>\n        <button ion-fab (click)="viewTable()" color="eeeGoldLight">\n          <ion-icon ios="ios-flask" md="md-flask"></ion-icon>\n          <ion-label>Periodic table</ion-label>\n        </button>\n        <button ion-fab (click)="viewRank()" color="eeeGoldLight">\n          <ion-icon ios="ios-podium" md="md-podium"></ion-icon>\n          <ion-label>Team rank</ion-label>\n        </button>\n        <button mini ion-fab (click)="showCanvas()" color="eeeGoldLight">\n          <ion-icon ios="ios-color-palette" md="md-color-palette"></ion-icon>\n          <ion-label>Doodling</ion-label>\n        </button>\n      </ion-fab-list>\n    </ion-fab>\n    <div class="spacer headSpacer"></div>\n    <div *ngIf="!gameProvider.firstTimeFlag\n      &&!groupProvider.firstTimeFlag\n      &&!statusProvider.firstTimeFlag">\n      <!--tableAllFetched-->\n      <div *ngIf="groupProvider.userGroupId==null||groupProvider.userGroupId==\'\'" class="balloonContainer">\n        <div class="balloon">\n          <img src="{{userProvider.userTableInfo[userProvider.getUid()].photoUrl}}">\n          {{userProvider.userTableInfo[userProvider.getUid()].name}}\n        </div>\n      </div>\n      <div class="bottomElement" style="width: 100%;"\n           *ngIf="groupProvider.userGroupId==null||groupProvider.userGroupId==\'\'">\n        <h6>Hello! {{userProvider.userTableInfo[userProvider.getUid()].name}}</h6>\n        <h6>Let\'s join a group first!</h6>\n        <button padding\n                ion-button round outline (click)="joinGroup()">Join Group Now!\n        </button>\n      </div>\n  \n      <div *ngIf="statusProvider.statusTableInfo.startTime!=null\n      &&statusProvider.statusTableInfo.startTime!=\'\'\n      &&(statusProvider.statusTableInfo.endTime==null\n      ||statusProvider.statusTableInfo.endTime==\'\')">\n        <!--game master has started game, and in progress;-->\n        <div *ngIf="statusProvider.statusTableInfo.groups==null\n      ||statusProvider.statusTableInfo.groups.length==0\n      ||statusProvider.groupStatus==null||statusProvider.groupStatus.startTime==null">\n          <!--group not started-->\n          <div class="balloonContainer" *ngIf="groupProvider.groupTableInfo[groupProvider.userGroupId]!=null">\n            <div class="balloon"\n                 *ngFor="let memberId of groupProvider.groupTableInfo[groupProvider.userGroupId].members">\n              <img src="{{userProvider.userTableInfo[memberId].photoUrl}}">\n              {{userProvider.userTableInfo[memberId].name}}\n            </div>\n  \n          </div>\n  \n          <ion-grid class="bottomElement"\n                    *ngIf="groupProvider.groupTableInfo[groupProvider.userGroupId]!=null&&!groupProvider.groupLeaderFlag">\n            <ion-row no-padding>\n              <ion-col col-10 offset-1 no-padding>\n                <h6 no-margin>\n                  Ask your team leader to start.\n                </h6>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col col-10 offset-1 no-padding>\n                <h6 no-margin>\n                  You team leader is: </h6>\n              </ion-col>\n  \n            </ion-row>\n            <ion-row>\n              <ion-col col-10 offset-1 no-padding>\n                <img class="groupLeaderAvatar"\n                     src={{userProvider.userTableInfo[groupProvider.groupTableInfo[groupProvider.userGroupId].groupCreator].photoUrl}}>\n                <span> {{userProvider.userTableInfo[groupProvider.groupTableInfo[groupProvider.userGroupId].groupCreator].name}}</span>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col offset-1 col-10>\n                <button ion-button no-margin\n                        round outline small (click)="viewIntro()">Watch Intro First\n                </button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <ion-grid class="bottomElement" *ngIf="groupProvider.groupLeaderFlag">\n            <ion-row>\n              <ion-col col-10 offset-1 no-padding>\n                <h6 no-margin>\n                  You are team leader.</h6>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col col-10 offset-1 no-padding>\n                <h6 no-margin>\n                  Your team is waiting for you to start.\n                </h6>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col offset-3 col-6>\n                <button ion-button no-margin\n                        round outline small (click)="startGame()">Start Game\n                </button>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col offset-1 col-10>\n                <button ion-button no-margin\n                        round outline small (click)="viewIntro()">Watch Intro First\n                </button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </div>\n        <div *ngIf="(statusProvider.statusTableInfo.groups!=null\n      &&statusProvider.statusTableInfo.groups.length!=0\n      &&statusProvider.groupStatus!=null\n      &&statusProvider.groupStatus.startTime!=null\n      &&statusProvider.groupStatus.puzzles!=null)">\n          <!--group started-->\n  \n  \n          <div *ngFor="let puzzleId of statusProvider.puzzleStatusKeys">\n            <!--group solved-->\n            <ion-item text-wrap no-lines class="puzzle" *ngIf="statusProvider.puzzleStatus[puzzleId].solved"\n                      (click)="puzzleSolve(puzzleId)"\n                      [ngStyle]="{\'animation\':statusProvider.randomStyle[puzzleId].randomAnimation,\'animation-duration\': statusProvider.randomStyle[puzzleId].randomDuration,\'background\':statusProvider.randomStyle[puzzleId].randomColor}">\n              <ion-thumbnail item-start>\n                <img src={{gameProvider.puzzleDetails[puzzleId].photoUrl}}>\n              </ion-thumbnail>\n              {{gameProvider.puzzleDetails[puzzleId].title}}\n              <h5 *ngIf="gameProvider.puzzleDetails[puzzleId].memory!=null\n                         &&gameProvider.puzzleDetails[puzzleId].memory!=\'\'">\n                Memory piece found!\n                <ion-icon name="happy"></ion-icon>\n              </h5>\n              <ion-icon name="checkmark" item-end></ion-icon>\n            </ion-item>\n          </div>\n          <ion-item text-wrap no-lines\n                    *ngIf="statusProvider.firstUnsolved!=null\n                    &&statusProvider.firstUnsolved!=\'\'"\n                    (click)="puzzleSolve(statusProvider.firstUnsolved)" class="puzzle unsolvedPuzzle">\n  \n            <ion-thumbnail item-start>\n              <img src={{gameProvider.puzzleDetails[statusProvider.firstUnsolved].photoUrl}}>\n            </ion-thumbnail>\n            {{gameProvider.puzzleDetails[statusProvider.firstUnsolved].title}}\n            <h5>Awaits your challenge!</h5>\n            <ion-icon item-end name="bonfire"></ion-icon>\n          </ion-item>\n          <ion-grid text-center *ngIf="statusProvider.groupStatus.endTime!=null\n                          &&statusProvider.groupStatus.endTime!=\'\'">\n            <ion-row>\n              <ion-col no-padding>\n                <h6 no-margin>\n                  Your team has finished!\n                </h6>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col no-padding>\n                <h6 no-margin>\n                  You may proceed to the specified location!\n                </h6>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col>\n                <button ion-button no-margin\n                        round outline small (click)="viewAllMemory()">Check all memory pieces!\n                </button>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col>\n                <button ion-button no-margin\n                        round outline small (click)="viewRank()">View rank\n                </button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </div>\n      </div>\n    </div>\n    <div class="spacer footSpacer"></div>\n  </ion-content>\n  \n  '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/game/game.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__providers_tables_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_utility_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_tables_game_game__["a" /* GameProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_status_status__["a" /* StatusProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], GamePage);
    return GamePage;
}());

//# sourceMappingURL=game.js.map

/***/ })

});
//# sourceMappingURL=5.js.map