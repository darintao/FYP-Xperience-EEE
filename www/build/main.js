webpackJsonp([20],{

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utility_notification_notification__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utility_toast_toast__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var StatusProvider = /** @class */ (function () {
    function StatusProvider(toastProvider, notificationProvider, userProvider, groupProvider, gameProvider, settingProvider, events) {
        this.toastProvider = toastProvider;
        this.notificationProvider = notificationProvider;
        this.userProvider = userProvider;
        this.groupProvider = groupProvider;
        this.gameProvider = gameProvider;
        this.settingProvider = settingProvider;
        this.events = events;
        this.STATUS_TABLE = '/StatusTable';
        this.statusTableRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["database"]().ref(this.STATUS_TABLE);
        this.STATUS_TABLE_UPDATE = "statusTableUpdate";
        this.groups = "groups";
        this.puzzles = "puzzles";
        this.hintPoint = -20;
        this.answerPoint = 10;
        this.firstTimeFlag = true;
        this.firstUnsolved = '';
        this.puzzleStatus = [];
        this.puzzleStatusKeys = [];
        this.groupStatus = {};
        this.randomStyle = [];
        this.animationArray = ['moveHorizon', 'moveAround', 'rotate', 'moveVertical'];
        this.groupRank = [];
        this.groupRankKeys = [];
        this.solvingPuzzle = '';
    }
    StatusProvider.prototype.initParams = function () {
        this.groupStatus = {};
        this.puzzleStatus = [];
        this.puzzleStatusKeys = [];
    };
    StatusProvider.prototype.getStatusTableOnce = function () {
        var _this = this;
        this.statusTableRef.once('value', function (snapshot) {
            _this.initParams();
            _this.statusTableInfo = snapshot.val();
            if (_this.statusTableInfo.groups != null
                && _this.statusTableInfo.groups.length != 0
                && _this.groupProvider.userGroupId != null
                && _this.groupProvider.userGroupId != '') {
                _this.groupStatus = _this.statusTableInfo.groups[_this.groupProvider.userGroupId];
                _this.getGroupRank();
                _this.getPuzzleStatus();
                _this.getRandomStyle();
                _this.getFirstUnsolved();
            }
        });
    };
    StatusProvider.prototype.getStatusTable = function () {
        var _this = this;
        this.statusTableRef.on('value', function (snapshot) {
            _this.initParams();
            _this.statusTableInfo = snapshot.val();
            if (_this.statusTableInfo.groups != null
                && _this.statusTableInfo.groups.length != 0
                && _this.groupProvider.userGroupId != null
                && _this.groupProvider.userGroupId != '') {
                _this.groupStatus = _this.statusTableInfo.groups[_this.groupProvider.userGroupId];
                _this.getGroupRank();
                _this.getPuzzleStatus();
                _this.getRandomStyle();
                _this.getFirstUnsolved();
            }
            _this.events.publish(_this.STATUS_TABLE_UPDATE);
            if (_this.firstTimeFlag)
                _this.firstTimeFlag = false;
        });
    };
    StatusProvider.prototype.getGroupRank = function () {
        var _this = this;
        if (this.statusTableInfo.groups != null) {
            for (var _i = 0, _a = Object.keys(this.statusTableInfo.groups); _i < _a.length; _i++) {
                var groupId = _a[_i];
                var solvedPuzzle = 0;
                if ((this.statusTableInfo.groups[groupId].puzzles) != null) {
                    for (var _b = 0, _c = Object.keys(this.statusTableInfo.groups[groupId].puzzles); _b < _c.length; _b++) {
                        var puzzleId = _c[_b];
                        if (this.statusTableInfo.groups[groupId].puzzles[puzzleId].solved) {
                            solvedPuzzle++;
                        }
                    }
                }
                if (this.groupRank[groupId] == undefined || this.groupRank[groupId] == null)
                    this.groupRank[groupId] = {};
                this.groupRank[groupId].solvedPuzzleNo = solvedPuzzle;
                if (this.statusTableInfo.groups[groupId].endTime != null && this.statusTableInfo.groups[groupId].endTime != '') {
                    this.groupRank[groupId].timeUsed = this.statusTableInfo.groups[groupId].endTime - this.statusTableInfo.groups[groupId].startTime;
                    this.groupRank[groupId].endTime = this.statusTableInfo.groups[groupId].endTime;
                }
                else {
                    this.groupRank[groupId].timeUsed = this.settingProvider.time - this.statusTableInfo.groups[groupId].startTime;
                }
            }
            this.groupRankKeys = Object.keys(this.groupRank);
            this.groupRankKeys.sort(function (groupId1, groupId2) {
                if (_this.groupRank[groupId1].endTime != null && _this.groupRank[groupId1].endTime != ''
                    && _this.groupRank[groupId2].endTime != null && _this.groupRank[groupId2].endTime != '') {
                    if (_this.groupRank[groupId1].endTime < _this.groupRank[groupId2].endTime) {
                        return -1;
                    }
                    if (_this.groupRank[groupId1].endTime > _this.groupRank[groupId2].endTime) {
                        return 1;
                    }
                    return 0;
                }
                if (_this.groupRank[groupId1].solvedPuzzleNo < _this.groupRank[groupId2].solvedPuzzleNo)
                    return 1;
                if (_this.groupRank[groupId1].solvedPuzzleNo > _this.groupRank[groupId2].solvedPuzzleNo)
                    return -1;
                if (_this.groupRank[groupId1].timeUsed < _this.groupRank[groupId2].timeUsed)
                    return -1;
                if (_this.groupRank[groupId1].timeUsed > _this.groupRank[groupId2].timeUsed)
                    return 1;
                return 0;
            });
        }
    };
    StatusProvider.prototype.getPuzzleStatus = function () {
        var _this = this;
        if (this.groupStatus != null) {
            if (this.groupStatus.puzzles != null)
                this.puzzleStatus = this.settingProvider.jsonToArray(this.groupStatus.puzzles);
            this.puzzleStatusKeys = Object.keys(this.puzzleStatus);
            this.puzzleStatusKeys.sort(function (puzzleId1, puzzleId2) {
                if (_this.puzzleStatus[puzzleId1].order < _this.puzzleStatus[puzzleId2].order) {
                    return -1;
                }
                if (_this.puzzleStatus[puzzleId1].order > _this.puzzleStatus[puzzleId2].order) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            this.groupStatus = {};
        }
    };
    StatusProvider.prototype.getFirstUnsolved = function () {
        this.firstUnsolved = '';
        for (var _i = 0, _a = this.puzzleStatusKeys; _i < _a.length; _i++) {
            var puzzleId = _a[_i];
            if (this.puzzleStatus[puzzleId].solved == false) {
                this.firstUnsolved = puzzleId;
                if (this.solvingPuzzle != '' && this.firstUnsolved != this.solvingPuzzle) {
                    this.notificationProvider.showNotification("This puzzle has been solved", "You may go on and solve the next");
                    this.toastProvider.showToast("This puzzle has been solved");
                }
                break;
            }
        }
        if ((this.firstUnsolved == null || this.firstUnsolved == '')
            && (this.groupProvider.userGroupId != null && this.groupProvider.userGroupId != '') && this.groupStatus != null && this.groupStatus.startTime != null && (this.groupStatus.endTime == null || this.groupStatus.endTime == '')) {
            this.groupEnd().then(function (res) {
            }).catch((function (err) {
            }));
        }
    };
    StatusProvider.prototype.changePoint = function (point) {
        var updatedPoint = point + this.groupStatus.point;
        var groupTemp = {};
        groupTemp.point = updatedPoint;
        var promise = this.updateGroupStatus(groupTemp);
        return promise;
    };
    StatusProvider.prototype.viewHint1 = function (puzzleId) {
        var puzzleTemp = {};
        puzzleTemp.hint1 = true;
        var promise = this.updatePuzzleStatus(puzzleId, puzzleTemp);
        return promise;
    };
    StatusProvider.prototype.viewHint2 = function (puzzleId) {
        var puzzleTemp = {};
        puzzleTemp.hint2 = true;
        var promise = this.updatePuzzleStatus(puzzleId, puzzleTemp);
        return promise;
    };
    StatusProvider.prototype.groupStart = function () {
        var _this = this;
        //need to use set to create puzzles branch
        var groupTemp = {};
        groupTemp.startTime = this.settingProvider.getFireBaseTimeStamp();
        groupTemp.endTime = '';
        groupTemp.point = 50;
        groupTemp.puzzles = this.getRandomPuzzles();
        var promise = new Promise(function (resolve, reject) {
            _this.statusTableRef.child(_this.groups).child(_this.groupProvider.userGroupId)
                .set(groupTemp).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    StatusProvider.prototype.groupEnd = function () {
        console.log("game has ended");
        var groupTemp = {};
        groupTemp.endTime = this.settingProvider.getFireBaseTimeStamp();
        var promise = this.updateGroupStatus(groupTemp);
        return promise;
    };
    StatusProvider.prototype.groupForceEnd = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.statusTableRef.child(_this.groups).remove().then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    StatusProvider.prototype.answerPuzzle = function (puzzleId) {
        var puzzleTemp = {};
        puzzleTemp.solved = true;
        puzzleTemp.solvedBy = this.userProvider.getUid();
        var promise = this.updatePuzzleStatus(puzzleId, puzzleTemp);
        return promise;
    };
    StatusProvider.prototype.updatePuzzleStatus = function (puzzleId, puzzleTemp) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.statusTableRef.child(_this.groups).child(_this.groupProvider.userGroupId)
                .child(_this.puzzles).child(puzzleId)
                .update(puzzleTemp).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    StatusProvider.prototype.updateGroupStatus = function (groupTemp) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.statusTableRef.child(_this.groups).child(_this.groupProvider.userGroupId)
                .update(groupTemp).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    StatusProvider.prototype.getRandomPuzzles = function () {
        var puzzleStatusArray = [];
        var order = 0;
        var locationOrder = this.getLocationOrder();
        console.log("location order", locationOrder);
        for (var _i = 0, locationOrder_1 = locationOrder; _i < locationOrder_1.length; _i++) {
            var locationId = locationOrder_1[_i];
            if (this.gameProvider.gameTableInfo[locationId].puzzles != null) {
                for (var _a = 0, _b = this.gameProvider.puzzleInfoKeys[locationId]; _a < _b.length; _a++) {
                    var puzzleId = _b[_a];
                    var puzzleStatus = this.initPuzzleStatus();
                    puzzleStatus.order = order;
                    puzzleStatusArray[puzzleId] = puzzleStatus;
                    order++;
                }
            }
        }
        return puzzleStatusArray;
    };
    StatusProvider.prototype.getLocationOrder = function () {
        var locationOrder = [];
        locationOrder[0] = this.gameProvider.gameTableInfoKeys[0];
        locationOrder[this.gameProvider.gameTableInfoKeys.length - 1] = this.gameProvider.gameTableInfoKeys[this.gameProvider.gameTableInfoKeys.length - 1];
        var random = Math.floor(Math.random() * (this.gameProvider.gameTableInfoKeys.length - 2)) + 1;
        var direction = (Math.random() - 0.5) > 0 ? true : false;
        for (var i = 0; i < this.gameProvider.gameTableInfoKeys.length - 2; i++) {
            if (direction) {
                if (random + i == this.gameProvider.gameTableInfoKeys.length - 1)
                    random = 1 - i;
                locationOrder[i + 1] = this.gameProvider.gameTableInfoKeys[random + i];
            }
            else {
                if (random - i == 0)
                    random = i + this.gameProvider.gameTableInfoKeys.length - 2;
                locationOrder[i + 1] = this.gameProvider.gameTableInfoKeys[random - i];
            }
        }
        return locationOrder;
    };
    StatusProvider.prototype.deleteGroupStatus = function (groupId) {
        var _this = this;
        var promise = new Promise((function (resolve, reject) {
            _this.statusTableRef.child(_this.groups).child(groupId).remove().then(function (res) {
                _this.groupProvider.dismissGroup(groupId).then(function (res) {
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        }));
        return promise;
    };
    StatusProvider.prototype.getRandomStyle = function () {
        for (var _i = 0, _a = this.puzzleStatusKeys; _i < _a.length; _i++) {
            var puzzleId = _a[_i];
            if (this.puzzleStatus[puzzleId].solved
                && (this.randomStyle[puzzleId] == undefined
                    || this.randomStyle[puzzleId] == null)) {
                this.randomStyle[puzzleId] = {};
                this.randomStyle[puzzleId].randomColor = this.compileRandomColors();
                this.randomStyle[puzzleId].randomDuration = this.getRandomAnimationDuration();
                this.randomStyle[puzzleId].randomAnimation = this.getRandomAnimation();
            }
        }
        console.log(this.randomStyle);
    };
    StatusProvider.prototype.getRandomAnimation = function () {
        var animation = this.animationArray[Math.floor(Math.random() * this.animationArray.length)];
        return animation + ' infinite';
    };
    StatusProvider.prototype.compileRandomColors = function () {
        var param1 = this.getRandomColor();
        var param2 = this.getRandomColor();
        var param3 = this.getRandomColor();
        return 'linear-gradient(-45deg, ' + param1 + ', ' + param2 + ', ' + param3 + ')';
    };
    StatusProvider.prototype.getRandomColor = function () {
        var maxVal = 200;
        var minVal = 20;
        var r = Math.floor(Math.random() * maxVal) + minVal;
        var g = Math.floor(Math.random() * maxVal) + minVal;
        var b = Math.floor(Math.random() * maxVal) + minVal;
        var a = 1;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    StatusProvider.prototype.getRandomAnimationDuration = function () {
        var d = Math.floor(Math.random() * 10) * 1000 + 10000;
        return d + 'ms';
    };
    StatusProvider.prototype.initPuzzleStatus = function () {
        var puzzleStatus = {};
        puzzleStatus.solved = false;
        puzzleStatus.solvedBy = '';
        puzzleStatus.hint1 = false;
        puzzleStatus.hint2 = false;
        return puzzleStatus;
    };
    StatusProvider.prototype.startGame = function () {
        var _this = this;
        var statusTemp = {};
        statusTemp.startTime = this.settingProvider.getFireBaseTimeStamp();
        statusTemp.endTime = '';
        var promise = new Promise(function (resolve, reject) {
            _this.statusTableRef.set(statusTemp).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    StatusProvider.prototype.endGame = function () {
        var _this = this;
        var statusTemp = {};
        statusTemp.endTime = this.settingProvider.getFireBaseTimeStamp();
        var promise = new Promise(function (resolve, reject) {
            _this.statusTableRef.update(statusTemp).then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    StatusProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__utility_toast_toast__["a" /* ToastProvider */], __WEBPACK_IMPORTED_MODULE_7__utility_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_6__user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_5__group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_4__game_game__["a" /* GameProvider */], __WEBPACK_IMPORTED_MODULE_3__setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */]])
    ], StatusProvider);
    return StatusProvider;
}());

//# sourceMappingURL=status.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tables_user_user__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CameraProvider = /** @class */ (function () {
    function CameraProvider(platform, userProvider, settingProvider, camera, actionSheetCtrl) {
        this.platform = platform;
        this.userProvider = userProvider;
        this.settingProvider = settingProvider;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.fireStore = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]();
        this.groupImgRef = '/groupImage';
        this.groupDefault = 'https://firebasestorage.googleapis.com/v0/b/fyp03-136e5.appspot.com/o/groupImageDefault.png?alt=media&token=11ae859f-3a99-477a-a50b-24f97b002c3a';
        this.imgHeader = "data:image/png;base64,";
        this.userDefault = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
        this.userImgRef = '/userImage';
        this.puzzleDefault = 'https://firebasestorage.googleapis.com/v0/b/fyp03-136e5.appspot.com/o/puzzleImageDefault.png?alt=media&token=797e0b0a-152c-41be-b9ff-f3f0f838aa00';
        this.puzzleRef = '/puzzleImage';
        this.chatImgRef = 'chatImage';
    }
    CameraProvider.prototype.initStartUpImage = function (startUpImage) {
        this.base64Image = startUpImage;
    };
    CameraProvider.prototype.initGallery = function () {
        this.options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            // destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1000,
            targetHeight: 1000,
        };
    };
    CameraProvider.prototype.initCamera = function () {
        this.options = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            // destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1000,
            targetHeight: 1000
        };
    };
    CameraProvider.prototype.getPicture = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.camera.getPicture(_this.options).then(function (imageData) {
                _this.base64Image = _this.imgHeader + imageData;
                _this.base64ImgRaw = imageData;
                resolve(true);
            }, function (err) {
                reject(err);
            });
        });
        return promise;
    };
    CameraProvider.prototype.uploadImage = function (chosenRef) {
        var _this = this;
        var imgBlob = this.getBlob();
        if (chosenRef == this.userImgRef)
            this.subChild = this.userProvider.getUid();
        else
            this.subChild = this.settingProvider.time.toString();
        var promise = new Promise(function (resolve, reject) {
            var imgRef = _this.fireStore.ref(chosenRef).child(_this.subChild);
            imgRef.put(imgBlob).then(function (res) {
                imgRef.getDownloadURL().then(function (res) {
                    if (_this.platform.is('ios')) {
                        _this.base64Image = res;
                    }
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
        return promise;
    };
    CameraProvider.prototype.getBlob = function () {
        var byteCharacters = atob(this.base64ImgRaw);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var imgBlob = new Blob([byteArray], { type: 'image/jpeg' });
        this.base64ImgRaw = null;
        return imgBlob;
    };
    CameraProvider.prototype.presentChoiceNotSupportedForIOS = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Source:',
            buttons: [
                {
                    text: 'Gallery',
                    handler: function () {
                        _this.initGallery();
                        _this.getPicture().then(function (res) {
                        }).catch(function (err) {
                        });
                    }
                },
                {
                    text: 'Camera',
                    handler: function () {
                        _this.initCamera();
                        _this.getPicture().then(function (res) {
                        }).catch(function (err) {
                        });
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
    };
    CameraProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_4__setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], CameraProvider);
    return CameraProvider;
}());

//# sourceMappingURL=camera.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utility_notification_notification__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatProvider = /** @class */ (function () {
    function ChatProvider(notificationProvider, groupProvider, userProvider, events, settingProvider) {
        this.notificationProvider = notificationProvider;
        this.groupProvider = groupProvider;
        this.userProvider = userProvider;
        this.events = events;
        this.settingProvider = settingProvider;
        this.CHAT_TABLE = '/ChatTable';
        this.chatTableRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["database"]().ref(this.CHAT_TABLE);
        this.CHAT_TABLE_UPDATE = "chatTableUpdate";
        this.chatTableInfo = [];
        this.chatTableInfoKeys = [];
        this.firstTimeFlag = true;
        this.newMsgNo = [];
        this.public = 'public';
        this.totalMsgNo = 0;
        this.currentView = '';
        this.newMsgFlag = false;
        this.text = 'text';
        this.image = 'image';
        this.admin = 'admin';
    }
    ChatProvider.prototype.getChatTable = function () {
        var _this = this;
        this.chatTableRef.on('value', function (snapshot) {
            var infoTemp = _this.settingProvider.snapshotToArray(snapshot);
            for (var _i = 0, _a = Object.keys(infoTemp); _i < _a.length; _i++) {
                var receiverId = _a[_i];
                if (!_this.groupProvider.firstTimeFlag && (_this.groupProvider.userGroupId == null || _this.groupProvider.userGroupId == '')) {
                }
                else if (!_this.groupProvider.firstTimeFlag && (_this.groupProvider.userGroupId != null
                    && _this.groupProvider.userGroupId != '')) {
                    if (receiverId != _this.groupProvider.userGroupId && receiverId != _this.public)
                        continue;
                }
                _this.handleMessages(infoTemp, receiverId);
            }
            _this.events.publish(_this.CHAT_TABLE_UPDATE);
            _this.firstTimeFlag = false;
        });
    };
    ChatProvider.prototype.handleMessages = function (infoTemp, receiverId) {
        if (this.chatTableInfo[receiverId] == null) {
            this.chatTableInfo[receiverId] = [];
        }
        for (var _i = 0, _a = Object.keys(infoTemp[receiverId]); _i < _a.length; _i++) {
            var messageId = _a[_i];
            if (this.newMsgNo[receiverId] == null) {
                this.newMsgNo[receiverId] = 0;
            }
            if (this.chatTableInfo[receiverId][messageId] == null) {
                this.chatTableInfo[receiverId][messageId] = infoTemp[receiverId][messageId];
                if (this.currentView != receiverId
                    && this.chatTableInfo[receiverId][messageId].sender != this.userProvider.getUid()
                    && !this.firstTimeFlag
                    && (receiverId == this.groupProvider.userGroupId
                        || receiverId == this.public)) {
                    this.notificationProvider.showNotification("new message", "You have received new message!");
                    this.newMsgNo[receiverId]++;
                }
                if (this.currentView == receiverId
                    && this.chatTableInfo[receiverId][messageId].sender != this.userProvider.getUid() && !this.firstTimeFlag) {
                    this.newMsgFlag = true;
                }
            }
        }
        this.chatTableInfoKeys[receiverId] = Object.keys(this.chatTableInfo[receiverId]);
        this.getNewMsgCount();
    };
    ChatProvider.prototype.getNewMsgCount = function () {
        if (this.newMsgNo == null)
            return;
        this.totalMsgNo = 0;
        for (var _i = 0, _a = Object.keys(this.newMsgNo); _i < _a.length; _i++) {
            var receiverId = _a[_i];
            if (receiverId == this.groupProvider.userGroupId || receiverId == this.public) {
                this.totalMsgNo += this.newMsgNo[receiverId];
            }
        }
    };
    ChatProvider.prototype.sendMessage = function (receiver, messageTemp) {
        var _this = this;
        messageTemp.time = this.settingProvider.getFireBaseTimeStamp();
        messageTemp.sender = this.userProvider.getUid();
        var promise = new Promise(function (resolve, reject) {
            _this.chatTableRef.child(receiver).push(messageTemp).then(function (res) {
                resolve(true);
            });
        });
        return promise;
    };
    ChatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__utility_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_5__group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__setting_setting__["a" /* SettingProvider */]])
    ], ChatProvider);
    return ChatProvider;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(341);
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






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, auth, fb) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.loginForm = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(6)])]
        });
    }
    LoginPage.prototype.login = function (userProvider) {
        var _this = this;
        var data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signInWithEmail(credentials)
            .then(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]); }, function (error) { return _this.loginError = error.message; });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/login/login.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>Log in</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<form (ngSubmit)="login()" [formGroup]="loginForm">\n		<ion-list inset>\n\n			<ion-item [ngClass]="{ invalid: emailErrors.hasError(\'*\', [\'touched\', \'dirty\']) }">\n				<ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n			</ion-item>\n\n			<div ngxErrors="email" #emailErrors="ngxErrors">\n				<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\', \'dirty\']">It should be a valid email</div>\n			</div>\n\n			<ion-item [ngClass]="{ invalid: passwordErrors.hasError(\'*\', [\'touched\']) }">\n				<ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n			</ion-item>\n\n			<div ngxErrors="password" #passwordErrors="ngxErrors">\n				<div [ngxError]="[\'minlength\', \'required\']" [when]="[\'touched\']">It should be at least 5 characters</div>\n			</div>\n		</ion-list>\n\n		<div padding-horizontal>\n			<div class="form-error">{{loginError}}</div>\n\n			<button ion-button full type="submit" [disabled]="!loginForm.valid">Log in</button>\n			<div class="login-footer">\n				<p>\n					<a href="#">Forgot password?</a>\n					If you\'re a new user, please sign up.\n				</p>\n			</div>\n\n			<ion-list>\n				\n				<button ion-button icon-left block clear (click)="signup()">\n					<ion-icon name="person-add"></ion-icon>\n					Sign up\n				</button>\n			</ion-list>\n		</div>\n	</form>\n</ion-content>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_tables_group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_tables_status_status__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_tables_chat_chat__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_utility_notification_notification__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TabsPage = /** @class */ (function () {
    function TabsPage(notificationProvider, chatProvider, statusProvider, settingProvider, groupProvider, gameProvider, events, userProvider, navCtrl, navParams) {
        var _this = this;
        this.notificationProvider = notificationProvider;
        this.chatProvider = chatProvider;
        this.statusProvider = statusProvider;
        this.settingProvider = settingProvider;
        this.groupProvider = groupProvider;
        this.gameProvider = gameProvider;
        this.events = events;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1 = 'GamePage';
        this.tab2 = 'ChatListPage';
        this.tab3 = 'AboutPage';
        this.events.subscribe(this.userProvider.USER_TABLE_UPDATE);
        this.events.subscribe(this.gameProvider.GAME_TABLE_UPDATE);
        this.events.subscribe(this.groupProvider.GROUP_TABLE_UPDATE);
        this.events.subscribe(this.statusProvider.STATUS_TABLE_UPDATE);
        this.events.subscribe(this.chatProvider.CHAT_TABLE_UPDATE);
        this.syncLocalTimer = setInterval(function () {
            _this.syncLocalTime();
        }, 10000);
        this.lastOnlineTimer = setInterval(function () {
            _this.userProvider.updateLastOnline().then(function (res) {
            }).catch(function (err) {
            });
        }, 200000);
    }
    TabsPage.prototype.ionViewDidEnter = function () {
        // this.tabRef.select(2);
    };
    TabsPage.prototype.ionViewWillEnter = function () {
        this.userProvider.checkFireBaseConnection();
        this.userProvider.getUserTable();
        this.gameProvider.getGameTable();
        this.groupProvider.getGroupTable();
        this.statusProvider.getStatusTable();
        this.chatProvider.getChatTable();
        this.syncLocalTime();
    };
    TabsPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe(this.userProvider.USER_TABLE_UPDATE);
        this.events.unsubscribe(this.gameProvider.GAME_TABLE_UPDATE);
        this.events.unsubscribe(this.groupProvider.GROUP_TABLE_UPDATE);
        this.events.unsubscribe(this.statusProvider.STATUS_TABLE_UPDATE);
        this.events.unsubscribe(this.chatProvider.CHAT_TABLE_UPDATE);
        this.settingProvider.stopLocalTimer();
        clearInterval(this.lastOnlineTimer);
        clearInterval(this.syncLocalTimer);
    };
    TabsPage.prototype.syncLocalTime = function () {
        var _this = this;
        this.settingProvider.getEstimatedServerTimeOnce().then(function (res) {
            _this.settingProvider.startLocalTimer();
        }).catch(function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('tabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/tabs/tabs.html"*/'<ion-tabs color="eeeGoldLight" #tabs>\n  <ion-tab [tabsHideOnSubPages]="true" [root]="tab1" tabTitle="Game" tabIcon="bonfire"></ion-tab>\n  <ion-tab [tabsHideOnSubPages]="true" [root]="tab2" tabTitle="Chat" tabIcon="chatbubbles"\n           [tabBadge]="chatProvider.totalMsgNo>0 ? chatProvider.totalMsgNo: null"></ion-tab>\n  <ion-tab [tabsHideOnSubPages]="true" [root]="tab3" tabTitle="Setting" tabIcon="settings"></ion-tab>\n</ion-tabs>\n\n\n\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_utility_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_tables_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_tables_status_status__["a" /* StatusProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_tables_group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_game_game__["a" /* GameProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasDrawComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CanvasDrawComponent = /** @class */ (function () {
    function CanvasDrawComponent(navController, platform, renderer) {
        this.navController = navController;
        this.platform = platform;
        this.renderer = renderer;
        this.currentColour = '#1abc9c';
        this.brushSize = 10;
        this.availableColours = [
            '#1abc9c',
            '#3498db',
            '#9b59b6',
            '#e67e22',
            '#e74c3c'
        ];
    }
    CanvasDrawComponent.prototype.goBack = function () {
        this.navController.pop();
    };
    CanvasDrawComponent.prototype.ngAfterViewInit = function () {
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + '');
    };
    CanvasDrawComponent.prototype.changeColour = function (colour) {
        this.currentColour = colour;
    };
    CanvasDrawComponent.prototype.changeSize = function (size) {
        this.brushSize = size;
    };
    CanvasDrawComponent.prototype.handleStart = function (ev) {
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    };
    CanvasDrawComponent.prototype.handleMove = function (ev) {
        var ctx = this.canvasElement.getContext('2d');
        var currentX = ev.touches[0].pageX;
        var currentY = ev.touches[0].pageY;
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        this.lastX = currentX;
        this.lastY = currentY;
        ctx.stroke();
    };
    CanvasDrawComponent.prototype.clearCanvas = function () {
        var ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myCanvas'),
        __metadata("design:type", Object)
    ], CanvasDrawComponent.prototype, "canvas", void 0);
    CanvasDrawComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'canvas-draw',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/components/canvas-draw/canvas-draw.html"*/'<ion-toolbar id="top-toolbar">\n    <ion-buttons left>\n      <button *ngFor="let colour of availableColours" icon-only ion-button (click)="changeColour(colour)">\n        <ion-icon [style.color]="colour" name="brush"></ion-icon>\n      </button>\n  \n      <!--<button style="border: 1px solid #cecece;" ion-button icon-only style.color="#fff"-->\n              <!--(click)="changeColour(\'rgba(0, 0, 0, 0.7)\')">-->\n        <!--<ion-icon style="color: #fff;" name="square"></ion-icon>-->\n      <!--</button>-->\n    </ion-buttons>\n    <ion-buttons right>\n  \n      <button ion-button icon-only (click)="goBack()">\n        <ion-icon name="close-circle" style="color: white!important;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n  \n  <canvas #myCanvas (touchstart)="handleStart($event)" (touchmove)="handleMove($event)"></canvas>\n  \n  <ion-toolbar id="bottom-toolbar">\n    <ion-buttons left>\n      <button color="dark" ion-button icon-only (click)="clearCanvas()">\n        <ion-icon name="trash"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons right>\n      <button color="dark" ion-button icon-only (click)="changeSize(5)">\n        <ion-icon style="font-size: 0.25em;" name="radio-button-on"></ion-icon>\n      </button>\n      <button color="dark" ion-button icon-only (click)="changeSize(10)">\n        <ion-icon style="font-size: 0.5em;" name="radio-button-on"></ion-icon>\n      </button>\n      <button color="dark" ion-button icon-only (click)="changeSize(20)">\n        <ion-icon style="font-size: 1em;" name="radio-button-on"></ion-icon>\n      </button>\n      <button color="dark" ion-button icon-only (click)="changeSize(50)">\n        <ion-icon style="font-size: 2em;" name="radio-button-on"></ion-icon>\n      </button>\n      <button color="dark" ion-button icon-only (click)="changeSize(200)">\n        <ion-icon style="font-size: 3em;" name="radio-button-on"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n  '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/components/canvas-draw/canvas-draw.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */]])
    ], CanvasDrawComponent);
    return CanvasDrawComponent;
}());

//# sourceMappingURL=canvas-draw.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderProvider = /** @class */ (function () {
    function LoaderProvider(loadingController) {
        this.loadingController = loadingController;
    }
    LoaderProvider.prototype.showLoader = function (loaderMessage) {
        this.loader = this.loadingController.create({ content: loaderMessage });
        this.loader.present();
    };
    LoaderProvider.prototype.dismissLoader = function () {
        if (this.loader != null) {
            this.loader.dismiss();
        }
    };
    LoaderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */]])
    ], LoaderProvider);
    return LoaderProvider;
}());

//# sourceMappingURL=loader.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 189;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about/about.module": [
		735,
		16
	],
	"../pages/about/admin/admin/admin.module": [
		736,
		15
	],
	"../pages/about/admin/location-list/location-list.module": [
		737,
		14
	],
	"../pages/about/admin/puzzle-list/puzzle-list.module": [
		738,
		13
	],
	"../pages/all-user/all-user.module": [
		739,
		12
	],
	"../pages/chat/chat-list/chat-list.module": [
		741,
		11
	],
	"../pages/chat/chat/chat.module": [
		740,
		10
	],
	"../pages/chat/group-list/group-list.module": [
		742,
		9
	],
	"../pages/chat/group-profile/group-profile.module": [
		743,
		8
	],
	"../pages/finish/finish.module": [
		744,
		7
	],
	"../pages/game/end/end.module": [
		745,
		6
	],
	"../pages/game/game/game.module": [
		746,
		5
	],
	"../pages/game/puzzle-solve/puzzle-solve.module": [
		748,
		4
	],
	"../pages/game/util/map/map.module": [
		747,
		3
	],
	"../pages/game/util/rank/rank.module": [
		749,
		2
	],
	"../pages/intro/intro.module": [
		751,
		1
	],
	"../pages/login/login.module": [
		750,
		19
	],
	"../pages/profile/profile.module": [
		752,
		18
	],
	"../pages/tabs/tabs.module": [
		753,
		17
	],
	"../pages/tutorial/tutorial.module": [
		754,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 234;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utility_toast_toast__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingProvider = /** @class */ (function () {
    function SettingProvider(network, toastProvider) {
        this.network = network;
        this.toastProvider = toastProvider;
        this.CONNECTION_STATE = '.info/connected';
        this.SERVER_OFFSET = '.info/serverTimeOffset';
        this.connectionGood = true;
        this.showTimeScoreFlag = true;
        this.regExString = "^[a-zA-Z0-9 '_]+$";
        this.audioPermission = false;
        this.snapshotToArray = function (snapshot) {
            var returnArr = [];
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                returnArr[childSnapshot.key] = item;
            });
            return returnArr;
        };
        this.jsonToArray = function (json) {
            var array = [];
            var keys = Object.keys(json);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                array[key] = json[key];
            }
            return array;
        };
    }
    SettingProvider.prototype.startLocalTimer = function () {
        var _this = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            _this.time += 1000;
        }, 1000);
    };
    SettingProvider.prototype.stopLocalTimer = function () {
        clearInterval(this.timer);
    };
    SettingProvider.prototype.getEstimatedServerTimeOnce = function () {
        var _this = this;
        var offsetRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref(this.SERVER_OFFSET);
        var promise = new Promise(function (resolve, reject) {
            offsetRef.once('value').then(function (snapshot) {
                var offset = snapshot.val();
                var estimatedServerTimeMs = new Date().getTime() + offset;
                _this.time = parseInt(estimatedServerTimeMs);
                resolve(estimatedServerTimeMs);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    SettingProvider.prototype.checkFireBaseConnection = function () {
        var connectedRef = __WEBPACK_IMPORTED_MODULE_2_firebase__["database"]().ref(this.CONNECTION_STATE);
        connectedRef.on("value", function (snapshot) {
            if (snapshot.val() === true) {
            }
            else {
            }
        });
    };
    SettingProvider.prototype.checkConnection = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            _this.connectionGood = false;
        });
        this.network.onConnect().subscribe(function () {
            setTimeout(function () {
                _this.connectionGood = true;
                if (_this.network.type === 'wifi') {
                }
                if (_this.network.type = 'cellular') {
                }
            }, 3000);
        });
    };
    SettingProvider.prototype.getFireBaseTimeStamp = function () {
        return __WEBPACK_IMPORTED_MODULE_2_firebase__["database"].ServerValue.TIMESTAMP;
    };
    SettingProvider.prototype.checkName = function (name) {
        if (name == null) {
            this.toastProvider.showToast("The name can not be empty");
            return false;
        }
        if (name.length < 3) {
            this.toastProvider.showToast("The name length should be between 3-20");
            return false;
        }
        if (name.length > 20) {
            this.toastProvider.showToast("The name length should be between 3-20");
            return false;
        }
        var trimmedName = name.trim();
        if (trimmedName == '') {
            this.toastProvider.showToast("The name can not be empty");
            return false;
        }
        if (trimmedName == 'admin') {
            this.toastProvider.showToast("Name can not be admin");
            return false;
        }
        var regEx = new RegExp(this.regExString);
        var testResult = regEx.test(name);
        if (testResult) {
            this.toastProvider.showToast('Name OK');
            return true;
        }
        else {
            this.toastProvider.showToast('Name can not contain special char');
            return false;
        }
    };
    SettingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_3__utility_toast_toast__["a" /* ToastProvider */]])
    ], SettingProvider);
    return SettingProvider;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = /** @class */ (function () {
    function SignupPage(fb, navCtrl, auth) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.form = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(6)])]
        });
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        var data = this.form.value;
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signUp(credentials).then(function () { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */]); }, function (error) { return _this.signupError = error.message; });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'as-page-signup',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/signup/signup.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>Sign up</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n\n	<form (ngSubmit)="signup()" [formGroup]="form">\n		<ion-list inset>\n\n			<ion-item [ngClass]="{ invalid: emailErrors.hasError(\'*\', [\'touched\']) }">\n				<ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n			</ion-item>\n\n			<div ngxErrors="email" #emailErrors="ngxErrors">\n				<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\']">It should be a valid email</div>\n			</div>\n\n			<ion-item [ngClass]="{ invalid: passwordErrors.hasError(\'*\', [\'touched\']) }">\n				<ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n			</ion-item>\n\n			<div ngxErrors="password" #passwordErrors="ngxErrors">\n				<div [ngxError]="[\'minlength\', \'required\']" [when]="[\'touched\']">It should be at least 6 characters</div>\n			</div>\n		</ion-list>\n\n		<div padding-horizontal>\n			<div class="form-error">{{signupError}}</div>\n\n			<button ion-button full type="submit" [disabled]="!form.valid">Sign up</button>\n		</div>\n	</form>\n</ion-content>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utility_loader_loader__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserProvider = /** @class */ (function () {
    function UserProvider(loaderProvider, events, settingProvider, device, platform, angularFireAuth) {
        this.loaderProvider = loaderProvider;
        this.events = events;
        this.settingProvider = settingProvider;
        this.device = device;
        this.platform = platform;
        this.angularFireAuth = angularFireAuth;
        this.USER_TABLE = '/UserTable';
        this.CONNECTION_STATE = '.info/connected';
        this.userTableRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref(this.USER_TABLE);
        this.userTableInfoKey = [];
        this.USER_TABLE_UPDATE = "userTableUpdate";
        this.LAST_TIME_ONLINE = "lastTimeOnline";
        this.firebaseConnection = false;
    }
    UserProvider.prototype.checkFireBaseConnection = function () {
        var _this = this;
        var connectedRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["database"]().ref(this.CONNECTION_STATE);
        connectedRef.on("value", function (snapshot) {
            if (snapshot.val() === true) {
                _this.firebaseConnection = true;
            }
            else {
                _this.userTableRef.child(_this.getUid()).child(_this.LAST_TIME_ONLINE).onDisconnect().set(_this.settingProvider.getFireBaseTimeStamp());
                _this.firebaseConnection = false;
            }
        });
    };
    UserProvider.prototype.updateLastOnline = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.userTableRef.child(_this.getUid()).child(_this.LAST_TIME_ONLINE).set(_this.settingProvider.getFireBaseTimeStamp()).then(function (res) {
            }).catch(function (err) {
            });
        });
        return promise;
    };
    UserProvider.prototype.getUserTable = function () {
        var _this = this;
        this.userTableRef.on('value', function (snapshot) {
            _this.userTableInfo = _this.settingProvider.snapshotToArray(snapshot);
            _this.userTableInfoKey = Object.keys(_this.userTableInfo);
            _this.events.publish(_this.USER_TABLE_UPDATE);
        });
    };
    UserProvider.prototype.anonymousLogin = function () {
        var _this = this;
        console.log("in sign in");
        var promise = new Promise(function (resolve, reject) {
            _this.angularFireAuth.auth.signInAnonymously().then(function (res) {
                console.log("sign in good");
                resolve(true);
            }).catch(function (err) {
                console.log("sign in fail");
                reject(false);
            });
        });
        return promise;
    };
    UserProvider.prototype.checkUser = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.userTableRef.child(_this.getUid()).once('value').then(function (snapshot) {
                resolve(snapshot.val());
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.updateUser = function (user) {
        var _this = this;
        user.edited = true;
        user.lastTimeOnline = this.settingProvider.getFireBaseTimeStamp();
        var promise = new Promise(function (resolve, reject) {
            _this.userTableRef.child(_this.getUid()).update(user).then(function (snapshot) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.getUid = function () {
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            return "admin";
        }
        return this.device.uuid;
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__utility_loader_loader__["a" /* LoaderProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_5__setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OpenPage = /** @class */ (function () {
    function OpenPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OpenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-open',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/open/open.html"*/'<ion-content padding text-center>\n  <!--../../-->\n  <img class="eeeLogo" src="assets/imgs/eeeLogoGoldRect.png">\n  <div class="bottomElement" style="width: 100%">\n    <h5>\n      First time might take longer\n    </h5>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/open/open.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], OpenPage);
    return OpenPage;
}());

//# sourceMappingURL=open.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SplashPage = /** @class */ (function () {
    function SplashPage(navCtrl, navParams, viewCtrl, splashScreen) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    SplashPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 2000);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/splash/splash.html"*/'<ion-content>\n  <svg id="bars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.15 224.35">\n    <defs>\n      <style>.cls-1 {\n        fill: #dd238c;\n      }\n\n      .cls-2 {\n        fill: #ef4328;\n      }\n\n      .cls-3 {\n        fill: #7dd0df;\n      }\n\n      .cls-4 {\n        fill: #febf12;\n      }\n\n      .cls-5 {\n        fill: #282828;\n      }</style>\n    </defs>\n    <rect class="cls-1" x="27.22" width="20.06" height="163.78"/>\n    <rect class="cls-2" y="4" width="20.06" height="163.78"/>\n    <rect class="cls-3" x="13.9" y="13.1" width="20.06" height="163.78"/>\n    <rect class="cls-4" x="43.1" y="7.45" width="20.06" height="163.78"/>\n  </svg>\n  <!--../../-->\n  <img class="eeeLogo" src="assets/imgs/eeeLogoGoldRect.png">\n</ion-content>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas_draw_canvas_draw__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(397);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__firebaseConfig__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_utility_toast_toast__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_utility_loader_loader__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_device__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_tables_game_game__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_tables_status_status__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_tables_group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_tables_chat_chat__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_camera__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_utility_camera_camera__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ionic_gallery_modal__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_google_maps__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_components_module__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_canvas_draw_canvas_draw__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_utility_notification_notification__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_local_notifications__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_splash_splash__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_open_open__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_speech_recognition__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ultimate_ngxerrors__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_login_login__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_signup_signup__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_tabs_tabs__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_profile_profile__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































// import { LoginPage } from '../pages/login/login';






// import { SignupPage } from '../pages/signup/signup';
// import {TutorialPage} from '../pages/tutorial/tutorial';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_30__pages_open_open__["a" /* OpenPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_tabs_tabs__["a" /* TabsPage */]
                // LoginPage,
                // TabsPage,
                // SignupPage
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                // IonicModule.forRoot(MyApp),
                //tabsPlacement: 'top',
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], { scrollAssist: false, autoFocusAssist: true }, {
                    links: [
                        { loadChildren: '../pages/about/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/about/admin/admin/admin.module#AdminPageModule', name: 'AdminPage', segment: 'admin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/about/admin/location-list/location-list.module#LocationListPageModule', name: 'LocationListPage', segment: 'location-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/about/admin/puzzle-list/puzzle-list.module#PuzzleListPageModule', name: 'PuzzleListPage', segment: 'puzzle-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/all-user/all-user.module#AllUserPageModule', name: 'AllUserPage', segment: 'all-user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat-list/chat-list.module#GroupPageModule', name: 'ChatListPage', segment: 'chat-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/group-list/group-list.module#GroupListPageModule', name: 'GroupListPage', segment: 'group-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/group-profile/group-profile.module#GroupProfilePageModule', name: 'GroupProfilePage', segment: 'group-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/finish/finish.module#FinishPageModule', name: 'FinishPage', segment: 'finish', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/game/end/end.module#EndPageModule', name: 'EndPage', segment: 'end', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/game/game/game.module#GamePageModule', name: 'GamePage', segment: 'game', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/game/util/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/game/puzzle-solve/puzzle-solve.module#PuzzleSolvePageModule', name: 'PuzzleSolvePage', segment: 'puzzle-solve', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/game/util/rank/rank.module#RankPageModule', name: 'RankPage', segment: 'rank', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro/intro.module#IntroPageModule', name: 'IntroPage', segment: 'intro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_7__firebaseConfig__["a" /* config */]),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_firestore__["a" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_22_ionic_gallery_modal__["c" /* GalleryModalModule */],
                __WEBPACK_IMPORTED_MODULE_32__ultimate_ngxerrors__["a" /* NgxErrorsModule */],
                // IonicPageModule.forChild(OpenPage),
                __WEBPACK_IMPORTED_MODULE_25__components_components_module__["a" /* ComponentsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_30__pages_open_open__["a" /* OpenPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_26__components_canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */]
                // LoginPage,
                // SignupPage,
                // TabsPage
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__["a" /* SettingProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_tables_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_33__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_13__providers_utility_toast_toast__["a" /* ToastProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_tables_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_utility_loader_loader__["a" /* LoaderProvider */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_16__providers_tables_game_game__["a" /* GameProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_tables_status_status__["a" /* StatusProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_tables_group_group__["a" /* GroupProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_tables_chat_chat__["a" /* ChatProvider */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_21__providers_utility_camera_camera__["a" /* CameraProvider */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["d" /* HAMMER_GESTURE_CONFIG */],
                    useClass: __WEBPACK_IMPORTED_MODULE_22_ionic_gallery_modal__["b" /* GalleryModalHammerConfig */],
                },
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_27__providers_utility_notification_notification__["a" /* NotificationProvider */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_speech_recognition__["a" /* SpeechRecognition */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GroupProvider = /** @class */ (function () {
    function GroupProvider(settingProvider, events, userProvider) {
        this.settingProvider = settingProvider;
        this.events = events;
        this.userProvider = userProvider;
        this.GROUP_TABLE = '/GroupTable';
        this.groupTableRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["database"]().ref(this.GROUP_TABLE);
        this.groupTableInfoKeys = [];
        this.GROUP_TABLE_UPDATE = "groupTableUpdate";
        this.groupSyncTime = 'groupSyncTime';
        this.members = 'members';
        this.firstTimeFlag = true;
        this.userGroupId = '';
        this.groupLeaderFlag = false;
        this.filterString = '';
        this.filteredKeys = [];
    }
    GroupProvider.prototype.getGroupTable = function () {
        var _this = this;
        this.groupTableRef.on('value', function (snapshot) {
            _this.groupTableInfo = _this.settingProvider.snapshotToArray(snapshot);
            _this.groupTableInfo.sort(function (group1, group2) {
                if (group1.groupNumber < group2.groupNumber)
                    return -1;
                if (group1.groupNumber > group2.groupNumber)
                    return 1;
                return 0;
            });
            _this.groupTableInfoKeys = Object.keys(_this.groupTableInfo);
            _this.updateUserGroupStatus();
            _this.filterGroupTable();
            _this.events.publish(_this.GROUP_TABLE_UPDATE);
        });
    };
    GroupProvider.prototype.filterGroupTable = function () {
        var _this = this;
        this.filteredKeys = this.groupTableInfoKeys;
        if (this.filterString != null && this.filterString != '') {
            this.filteredKeys = this.filteredKeys.filter(function (groupId) {
                if (((_this.groupTableInfo[groupId].groupNumber + '').toLowerCase().indexOf(_this.filterString) > -1)
                    || ((_this.groupTableInfo[groupId].name).toLowerCase().indexOf(_this.filterString) > -1)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    };
    GroupProvider.prototype.inviteMemberOut = function (userId) {
        var groupTemp = this.groupTableInfo[this.userGroupId];
        var index = groupTemp.members.indexOf(userId);
        if (index !== -1) {
            groupTemp.members.splice(index, 1);
        }
        var promise = this.updateGroup(this.userGroupId, groupTemp);
        return promise;
    };
    GroupProvider.prototype.updateUserGroupStatus = function () {
        this.groupLeaderFlag = false;
        for (var _i = 0, _a = this.groupTableInfoKeys; _i < _a.length; _i++) {
            var groupId = _a[_i];
            if (this.groupTableInfo[groupId].members != null
                && this.groupTableInfo[groupId].members.indexOf(this.userProvider.getUid()) > -1) {
                this.userGroupId = groupId;
                if (this.groupTableInfo[groupId].groupCreator == this.userProvider.getUid()) {
                    this.groupLeaderFlag = true;
                }
                break;
            }
            this.userGroupId = '';
        }
        this.firstTimeFlag = false;
    };
    GroupProvider.prototype.createGroup = function (groupTemp) {
        var _this = this;
        groupTemp.groupSyncTime = this.settingProvider.getFireBaseTimeStamp();
        groupTemp.groupNumber = this.getNextGroupNumber();
        var promise = new Promise(function (resolve, reject) {
            _this.groupTableRef.child(_this.settingProvider.time).set(groupTemp).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    GroupProvider.prototype.updateGroup = function (groupId, groupTemp) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.groupTableRef.child(groupId).update(groupTemp).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    GroupProvider.prototype.getNextGroupNumber = function () {
        var nextNumber = 0;
        for (var _i = 0, _a = this.groupTableInfoKeys; _i < _a.length; _i++) {
            var groupId = _a[_i];
            if (nextNumber < this.groupTableInfo[groupId].groupNumber) {
                nextNumber = this.groupTableInfo[groupId].groupNumber;
            }
        }
        return nextNumber + 1;
    };
    GroupProvider.prototype.joinGroup = function (groupId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.getGroupSynTime(groupId).then(function (res) {
                if (res != _this.groupTableInfo[groupId].groupSyncTime) {
                    reject("Network busy, join later");
                }
                else {
                    _this.groupTableInfo[groupId].groupSyncTime = _this.settingProvider.getFireBaseTimeStamp();
                    _this.groupTableInfo[groupId].members.push(_this.userProvider.getUid());
                    _this.groupTableRef.child(groupId).update(_this.groupTableInfo[groupId]).then(function (res) {
                        resolve(true);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    GroupProvider.prototype.dismissGroup = function (groupId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.groupTableRef.child(groupId).remove().then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    //   if (this.userGroupId != null) {
    //   this.getGroupSynTime(groupId).then((res) => {
    // this.groupTableInfo[groupId].groupSyncTime = this.settingProvider.getFireBaseTimeStamp();
    //   if (res != this.groupTableInfo[groupId].groupSyncTime) {
    //   reject("Network busy, quit later");
    // }
    // }
    // else {
    // }).catch((err) => {
    //   reject(err);
    // })
    // }
    // resolve(true);
    GroupProvider.prototype.quitGroup = function () {
        var _this = this;
        var groupId = this.userGroupId;
        var groupTemp = this.groupTableInfo[groupId];
        var promise = new Promise(function (resolve, reject) {
            var index = _this.groupTableInfo[groupId].members.indexOf(_this.userProvider.getUid());
            if (index > -1) {
                groupTemp.members.splice(index, 1);
            }
            var promise = _this.updateGroup(groupId, groupTemp);
            _this.userGroupId = '';
            // this.groupTableRef.child(groupId).update(this.groupTableInfo[groupId]).then((res) => {
            //   resolve(true)
            // }).catch((err) => {
            //   reject(err);
            // })
        });
        return promise;
    };
    GroupProvider.prototype.getGroupSynTime = function (groupId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.groupTableRef.child(groupId).child(_this.groupSyncTime).once('value').then(function (snapshot) {
                resolve(snapshot.val());
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    GroupProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserProvider */]])
    ], GroupProvider);
    return GroupProvider;
}());

//# sourceMappingURL=group.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToastProvider = /** @class */ (function () {
    function ToastProvider(toastController) {
        this.toastController = toastController;
    }
    ToastProvider.prototype.showToast = function (toastMessage) {
        var toast = this.toastController.create({
            message: '',
            duration: 3000,
            position: 'top'
        });
        toast.setMessage(toastMessage);
        toast.present();
    };
    ToastProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */]])
    ], ToastProvider);
    return ToastProvider;
}());

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_local_notifications__ = __webpack_require__(340);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationProvider = /** @class */ (function () {
    function NotificationProvider(localNotifications) {
        this.localNotifications = localNotifications;
        this.iconUrl = 'https://firebasestorage.googleapis.com/v0/b/fyp03-136e5.appspot.com/o/Doge.png?alt=media&token=e0ff153d-f580-414c-b45c-9e07307705c7';
    }
    NotificationProvider.prototype.clearAllNotification = function () {
        this.localNotifications.clearAll().then(function () {
        }).catch(function (err) {
        });
    };
    NotificationProvider.prototype.showNotification = function (titleContent, textContent) {
        var _this = this;
        this.localNotifications.clearAll().then(function () {
            _this.localNotifications.schedule({
                id: 1,
                title: titleContent,
                text: textContent,
                smallIcon: _this.iconUrl,
                icon: _this.iconUrl
            });
        }).catch(function (err) {
            console.log(err);
        });
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], NotificationProvider);
    return NotificationProvider;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_open_open__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_splash_splash__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_profile_profile__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { LoginPage } from '../pages/login/login';



// import {TutorialPage} from '../pages/tutorial/tutorial';
var MyApp = /** @class */ (function () {
    function MyApp(modalCtrl, userProvider, platform, statusBar, splashScreen, auth) {
        var _this = this;
        this.auth = auth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_open_open__["a" /* OpenPage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            var splash = modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_splash_splash__["a" /* SplashPage */]);
            splash.present();
            // splashScreen.hide();
            _this.auth.afAuth.authState
                .subscribe(function (user) {
                if (user) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_profile_profile__["a" /* ProfilePage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                }
            }, function () {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
            });
            // userProvider.checkUser().then((res: User) => {
            //   if (res == null || (res).edited == null || (res).edited == false) {
            //     this.rootPage = ProfilePage;
            //   }
            //   else {
            //     this.rootPage = 'TutorialPage';
            //   }
            // }).catch((err) => {
            //   console.log("err", err.message);
            // });
            // userProvider.anonymousLogin().then((res) => {
            //   if (res == true) {
            //     console.log("login success");
            //     userProvider.checkUser().then((res: User) => {
            //       if (res == null || (res).edited == null || (res).edited == false) {
            //         this.rootPage = 'ProfilePage';
            //       }
            //       else {
            //         this.rootPage = 'TutorialPage';
            //       }
            //     }).catch((err) => {
            //       console.log("err", err.message);
            //     });
            //   }
            // }).catch((err) => {
            //   console.log("login fail")
            // });
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/app/app.html"*/'<!-- <ion-menu id="leftMenu" [content]="content" type="overlay">\n	<ion-header>\n		<ion-toolbar>\n			<ion-title>Pages</ion-title>\n		</ion-toolbar>\n	</ion-header>\n\n<ion-content>\n	<ion-list>\n		<ion-item *ngFor="let p of pages" (click)="openPage(p)">\n			<ion-icon [name]="p.icon" item-left></ion-icon>\n			{{p.title}}\n		</ion-item>\n		<ion-list-header *ngIf="auth.getEmail()">{{auth.getEmail()}}</ion-list-header>\n\n		<ion-item (click)="logout()" *ngIf="auth.authenticated">\n			<ion-icon name="log-out" item-left></ion-icon>\n			Log out\n		</ion-item>\n\n		<ion-item (click)="login()" *ngIf="!auth.authenticated">\n			<ion-icon name="log-in" item-left></ion-icon>\n			Log in\n		</ion-item>\n	</ion-list>\n\n</ion-content>\n\n</ion-menu>\n\n<ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav> -->\n\n<ion-nav [root]="rootPage">\n</ion-nav>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
var config = {
    apiKey: "AIzaSyBxj4sC-5VuaOyyJCcWSUANphw0iSAvShc",
    authDomain: "fyp03-136e5.firebaseapp.com",
    databaseURL: "https://fyp03-136e5.firebaseio.com",
    projectId: "fyp03-136e5",
    storageBucket: "fyp03-136e5.appspot.com",
    messagingSenderId: "624664988831"
};
//# sourceMappingURL=firebaseConfig.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(126);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = /** @class */ (function () {
    function AuthService(afAuth) {
        var _this = this;
        this.afAuth = afAuth;
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
    }
    AuthService.prototype.signInWithEmail = function (credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.signUp = function (credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.user !== null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.getEmail = function () {
        return this.user && this.user.email;
    };
    AuthService.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GameProvider = /** @class */ (function () {
    function GameProvider(events, settingProvider) {
        this.events = events;
        this.settingProvider = settingProvider;
        this.GAME_TABLE = '/GameTable';
        this.gameTableRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["database"]().ref(this.GAME_TABLE);
        this.gameTableInfoKeys = [];
        this.puzzleInfoKeys = [];
        this.GAME_TABLE_UPDATE = "gameTableUpdate";
        this.PUZZLE_TABLE = 'puzzles';
        this.firstTimeFlag = true;
        this.puzzleDetails = [];
    }
    GameProvider.prototype.getGameTable = function () {
        var _this = this;
        this.gameTableRef.on('value', function (snapshot) {
            _this.gameTableInfo = _this.settingProvider.snapshotToArray(snapshot);
            _this.gameTableInfoKeys = Object.keys(_this.gameTableInfo);
            if (_this.gameTableInfo != null) {
                _this.sortLocation();
                _this.puzzleDetails = [];
                _this.sortPuzzles();
            }
            _this.events.publish(_this.GAME_TABLE_UPDATE);
            _this.firstTimeFlag = false;
        });
    };
    GameProvider.prototype.sortLocation = function () {
        var _this = this;
        this.gameTableInfoKeys.sort(function (locationId1, locationId2) {
            if (_this.gameTableInfo[locationId1].order < _this.gameTableInfo[locationId2].order)
                return -1;
            if (_this.gameTableInfo[locationId1].order > _this.gameTableInfo[locationId2].order)
                return 1;
            return 0;
        });
    };
    GameProvider.prototype.sortPuzzles = function () {
        for (var _i = 0, _a = this.gameTableInfoKeys; _i < _a.length; _i++) {
            var locationId = _a[_i];
            if (this.gameTableInfo[locationId].puzzles != null) {
                var puzzleArray = this.settingProvider.jsonToArray(this.gameTableInfo[locationId].puzzles);
                var puzzleArrayKey = Object.keys(puzzleArray);
                puzzleArrayKey.sort(function (puzzleId1, puzzleId2) {
                    if (puzzleArray[puzzleId1].order < puzzleArray[puzzleId2].order)
                        return -1;
                    if (puzzleArray[puzzleId1].order > puzzleArray[puzzleId2].order)
                        return 1;
                    return 0;
                });
                this.puzzleInfoKeys[locationId] = puzzleArrayKey;
                this.savePuzzleInfo(puzzleArrayKey, puzzleArray);
            }
        }
    };
    GameProvider.prototype.savePuzzleInfo = function (puzzleArrayKey, puzzleArray) {
        for (var _i = 0, puzzleArrayKey_1 = puzzleArrayKey; _i < puzzleArrayKey_1.length; _i++) {
            var puzzleId = puzzleArrayKey_1[_i];
            this.puzzleDetails[puzzleId] = puzzleArray[puzzleId];
        }
    };
    GameProvider.prototype.updateLocation = function (locationId, locationTemp) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.gameTableRef.child(locationId).set(locationTemp).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    GameProvider.prototype.updatePuzzle = function (locationId, puzzleId, puzzleTemp) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.gameTableRef.child(locationId).child(_this.PUZZLE_TABLE).child(puzzleId).set(puzzleTemp).then(function () {
                resolve(true);
            }).catch(function (err) {
                resolve(err);
            });
        });
        return promise;
    };
    GameProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__setting_setting__["a" /* SettingProvider */]])
    ], GameProvider);
    return GameProvider;
}());

//# sourceMappingURL=game.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utility_camera_camera__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_setting_setting__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_utility_toast_toast__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = /** @class */ (function () {
    function ProfilePage(actionSheetCtrl, toastProvider, settingProvider, cameraProvider, userProvider, navCtrl, navParams) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastProvider = toastProvider;
        this.settingProvider = settingProvider;
        this.cameraProvider = cameraProvider;
        this.userProvider = userProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userTemp = {};
        this.lock = false;
        this.uid = '';
        this.nameChecked = false;
        this.uid = this.navParams.get('uid');
        if (this.uid == null || this.uid == '')
            this.initUser();
        else {
            this.userTemp = this.userProvider.userTableInfo[this.uid];
        }
        this.cameraProvider.initStartUpImage(this.userTemp.photoUrl);
        this.lock = false;
    }
    ProfilePage.prototype.changeName = function () {
        this.nameChecked = false;
    };
    ProfilePage.prototype.initUser = function () {
        this.userTemp = {};
        this.userTemp.name = '';
        this.userTemp.edited = false;
        this.userTemp.photoUrl = this.cameraProvider.userDefault;
    };
    ProfilePage.prototype.checkName = function () {
        if (!this.settingProvider.checkName(this.userTemp.name)) {
            return;
        }
        this.nameChecked = true;
    };
    ProfilePage.prototype.chooseImage = function () {
        this.presentChoice();
    };
    ProfilePage.prototype.presentChoice = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Source:',
            buttons: [
                {
                    text: 'Gallery',
                    handler: function () {
                        _this.cameraProvider.initGallery();
                        _this.cameraProvider.getPicture().then(function (res) {
                            _this.update();
                        }).catch(function (err) {
                        });
                    }
                },
                {
                    text: 'Camera',
                    handler: function () {
                        _this.cameraProvider.initCamera();
                        _this.cameraProvider.getPicture().then(function (res) {
                            _this.update();
                        }).catch(function (err) {
                        });
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
    };
    ProfilePage.prototype.update = function () {
        var _this = this;
        console.log("update profile");
        this.lock = true;
        if (this.userTemp.photoUrl != this.cameraProvider.base64Image) {
            this.cameraProvider.uploadImage(this.cameraProvider.userImgRef).then(function (url) {
                _this.userTemp.photoUrl = url;
                _this.updateFurther();
            }).catch(function (err) {
                _this.lock = false;
            });
        }
        else {
            this.updateFurther();
        }
    };
    ProfilePage.prototype.updateFurther = function () {
        var _this = this;
        this.userProvider.updateUser(this.userTemp).then(function (res) {
            if (_this.uid == null || _this.uid == '') {
                _this.navCtrl.push("TutorialPage");
            }
            else {
                if (_this.navCtrl.canGoBack())
                    _this.navCtrl.pop();
            }
            _this.lock = false;
        })
            .catch(function (err) {
            _this.lock = false;
        });
    };
    ProfilePage.prototype.ionViewWillLeave = function () {
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/profile/profile.html"*/'<ion-header>\n\n        <ion-navbar color="eeeGoldLight">\n          <ion-title>Profile</ion-title>\n        </ion-navbar>\n      \n      </ion-header>\n      \n      \n      <ion-content padding>\n        <ion-item *ngIf="!nameChecked">\n          <ion-label stacked>Pick a name</ion-label>\n          <ion-input type="text"\n                     [(ngModel)]="userTemp.name" clearInput></ion-input>\n        </ion-item>\n      \n        <button style="margin-top: 5%" *ngIf="!nameChecked" ion-button outline round block [disabled]="lock" (click)="checkName()">Check Name\n        </button>\n      \n        <!--name and image -->\n        <button *ngIf="nameChecked" ion-button outline round block [disabled]="lock"\n                (click)="changeName()">Change name\n        </button>\n        <div *ngIf="nameChecked" class="spacer buttonSpacer"></div>\n      \n        <div *ngIf="nameChecked" class="profileImage">\n          <img src="{{cameraProvider.base64Image}}">\n        </div>\n      \n        <div *ngIf="nameChecked" class="spacer buttonSpacer"></div>\n        <!--name and image -->\n        <h5 *ngIf="nameChecked&&lock">Updating...</h5>\n        <!--first time-->\n        <button *ngIf="nameChecked&&uid==null||uid==\'\'" ion-button outline round block [disabled]="lock"\n                (click)="update()">Use default image\n        </button>\n        <div *ngIf="nameChecked&&uid==null||uid==\'\'" class="spacer buttonSpacer"></div>\n        <button *ngIf="nameChecked&&uid==null||uid==\'\'" ion-button outline round block [disabled]="lock"\n                (click)="chooseImage()">Use other image\n        </button>\n        <h5 *ngIf="nameChecked&&uid==null||uid==\'\'">You can edit again in the setting</h5>\n        <!--first time-->\n      \n        <!--editing-->\n        <button *ngIf="nameChecked&&uid!=null&&uid!=\'\'" ion-button outline round block [disabled]="lock"\n                (click)="update()">Image is OK\n        </button>\n        <div *ngIf="nameChecked&&uid!=null&&uid!=\'\'" class="spacer buttonSpacer"></div>\n        <button *ngIf="nameChecked&&uid!=null&&uid!=\'\'" ion-button outline round block [disabled]="lock"\n                (click)="chooseImage()">Use other image\n        </button>\n        <!--editing-->\n      \n      </ion-content>\n      '/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__providers_utility_toast_toast__["a" /* ToastProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utility_camera_camera__["a" /* CameraProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

},[392]);
//# sourceMappingURL=main.js.map