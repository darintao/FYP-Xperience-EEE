webpackJsonp([3],{

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapPageModule", function() { return MapPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map__ = __webpack_require__(767);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MapPageModule = /** @class */ (function () {
    function MapPageModule() {
    }
    MapPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__map__["a" /* MapPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__map__["a" /* MapPage */]),
            ],
        })
    ], MapPageModule);
    return MapPageModule;
}());

//# sourceMappingURL=map.module.js.map

/***/ }),

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utility_toast_toast__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MapPage = /** @class */ (function () {
    function MapPage(toastProvider, geoLocation, navCtrl, navParams) {
        this.toastProvider = toastProvider;
        this.geoLocation = geoLocation;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        var mapOptions = {
            camera: {
                target: {
                    lat: 1.347679,
                    lng: 103.681268
                },
                zoom: 12,
                tilt: 30
            }
        };
        var markerIcon = {
            'url': 'https://firebasestorage.googleapis.com/v0/b/fyp03-136e5.appspot.com/o/Doge.png?alt=media&token=e0ff153d-f580-414c-b45c-9e07307705c7',
            'size': {
                width: 35,
                height: 30,
            }
        };
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create(this.mapElement.nativeElement, mapOptions);
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function () {
            _this.geoLocation.getCurrentPosition().then(function (resp) {
                if (resp.coords != undefined && resp.coords != null) {
                    var cameraPos = {
                        target: new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](resp.coords.latitude, resp.coords.longitude),
                        zoom: 18,
                    };
                    _this.map.moveCamera(cameraPos);
                }
                else {
                    _this.toastProvider.showToast("You need to enable location manually :)");
                }
            });
            var firstMarkerFlag = true;
            var subscription = _this.geoLocation.watchPosition()
                .subscribe(function (position) {
                if (position.coords != undefined && position.coords != null) {
                    var userPosition = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](position.coords.latitude, position.coords.longitude);
                    if (_this.selfmarker != null) {
                        _this.selfmarker.setPosition(userPosition);
                        if (firstMarkerFlag) {
                            // this.map.addMarker(this.selfmarker).then((res) => {
                            //   firstMarkerFlag = false
                            // }).catch((err) => {
                            //   firstMarkerFlag = false
                            // });
                        }
                        else {
                            //original code
                            // this.map.addMarker(this.selfmarker);
                        }
                        firstMarkerFlag = false;
                    }
                    else {
                        if (firstMarkerFlag) {
                            var markerOptions = {
                                position: userPosition,
                                icon: markerIcon,
                                animation: 'DROP'
                            };
                            _this.map.addMarker(markerOptions).then(function (marker) {
                                _this.selfmarker = marker;
                                firstMarkerFlag = false;
                            }).catch(function (err) {
                                firstMarkerFlag = false;
                            });
                        }
                        firstMarkerFlag = false;
                    }
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/util/map/map.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Track me</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div #map id=\'map\' style="height: 80%"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/game/util/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_utility_toast_toast__["a" /* ToastProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ })

});
//# sourceMappingURL=3.js.map