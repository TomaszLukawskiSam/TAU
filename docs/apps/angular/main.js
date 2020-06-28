(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _spin_spin_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spin/spin.component */ "./src/app/spin/spin.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class AppComponent {
    constructor() {
        this.title = 'hello-world';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 27, vars: 1, consts: [["role", "banner", 1, "toolbar"], ["width", "40", "alt", "Angular Logo", "src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="], [1, "spacer"], ["aria-label", "Angular on twitter", "target", "_blank", "rel", "noopener", "href", "https://twitter.com/angular", "title", "Twitter"], ["id", "twitter-logo", "height", "24", "data-name", "Logo", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 400 400"], ["width", "400", "height", "400", "fill", "none"], ["d", "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23", "fill", "#fff"], ["role", "main", 1, "content"], [1, "card", "highlight-card", "card-small"], ["id", "rocket", "alt", "Rocket Ship", "xmlns", "http://www.w3.org/2000/svg", "width", "101.678", "height", "101.678", "viewBox", "0 0 101.678 101.678"], ["id", "Group_83", "data-name", "Group 83", "transform", "translate(-141 -696)"], ["id", "Ellipse_8", "data-name", "Ellipse 8", "cx", "50.839", "cy", "50.839", "r", "50.839", "transform", "translate(141 696)", "fill", "#dd0031"], ["id", "Group_47", "data-name", "Group 47", "transform", "translate(165.185 720.185)"], ["id", "Path_33", "data-name", "Path 33", "d", "M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z", "transform", "translate(0.371 3.363)", "fill", "#fff"], ["id", "Path_34", "data-name", "Path 34", "d", "M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z", "transform", "translate(0 0.005)", "fill", "#fff"], ["id", "rocket-smoke", "alt", "Rocket Ship Smoke", "xmlns", "http://www.w3.org/2000/svg", "width", "516.119", "height", "1083.632", "viewBox", "0 0 516.119 1083.632"], ["id", "Path_40", "data-name", "Path 40", "d", "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z", "transform", "translate(-147.025 -140.939)", "fill", "#f5f5f5"], [1, "card-container"], ["id", "clouds", "alt", "Gray Clouds Background", "xmlns", "http://www.w3.org/2000/svg", "width", "2611.084", "height", "485.677", "viewBox", "0 0 2611.084 485.677"], ["id", "Path_39", "data-name", "Path 39", "d", "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z", "transform", "translate(142.69 -634.312)", "fill", "#eee"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Welcome");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "rect", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "svg", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "g", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "circle", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "g", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "svg", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "app-spin");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "svg", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.title, " app is running!");
    } }, directives: [_spin_spin_component__WEBPACK_IMPORTED_MODULE_1__["SpinComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQubGVzcyJ9 */", "[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n\n  \n  @media screen and (max-width: 767px) {\n\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.less']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _spin_spin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./spin/spin.component */ "./src/app/spin/spin.component.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _spin_spin_component__WEBPACK_IMPORTED_MODULE_4__["SpinComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _spin_spin_component__WEBPACK_IMPORTED_MODULE_4__["SpinComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/spin/spin.component.ts":
/*!****************************************!*\
  !*** ./src/app/spin/spin.component.ts ***!
  \****************************************/
/*! exports provided: SpinComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinComponent", function() { return SpinComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class SpinComponent {
    constructor() { }
    ngOnInit() {
    }
}
SpinComponent.ɵfac = function SpinComponent_Factory(t) { return new (t || SpinComponent)(); };
SpinComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpinComponent, selectors: [["app-spin"]], decls: 1, vars: 0, consts: [["min", "1902", "max", "2050", "value", "year", "loop", "enabled", "roll-height", "custom", "item-height", "50", "momentum-level", "1", "duration", "500", 1, "default-spin"]], template: function SpinComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tau-spin", 0);
    } }, styles: ["[_ngcontent-%COMP%]:root {\n  --text-secondary-color: #909090;\n  --primary-color: #0381fe;\n  --control-background: #e6e6e6;\n  --textual-background: #FCFCFC;\n  --color-white: #fafafa;\n  --surface: #FCFCFC;\n  --accent-badge: #F56A0D;\n  --on-background: #858585;\n  --border-surface: #e6e6e6;\n  --button-background: rgba(0, 0, 0, 0);\n  --button-background-flat: #f5f5f5;\n  --button-text-font-size: 17px;\n  --button-contained-text-font-size: 17px;\n  --button-contained-list-text-font-size: 15px;\n  --slider-bg-color: rgba(3, 129, 254, 0.3);\n  --slider-bg-disabled-color: rgba(102, 102, 102, 0.15);\n  --slider-value-color: #0381fe;\n  --slider-handler-color: #0381fe;\n  --progress-circle-second-color: #06b485;\n  --on-off-switch-off-button-border: #8f8f8f;\n  --on-off-switch-on-disabled-track-background: rgba(143, 143, 143, 0.4);\n  --on-off-switch-off-track-background: transparent;\n  --on-off-switch-off-disabled-track-border: rgba(143, 143, 143, 0.4);\n}\nbody[_ngcontent-%COMP%], body.ui-theme-light[_ngcontent-%COMP%], body.ui-theme-default[_ngcontent-%COMP%] {\n  --primary-color: #0381fe;\n  --primary-dark-color: #0072de;\n  --primary-color-20p: rgba(3, 129, 254, 0.2);\n  --primary-color-30p: rgba(3, 129, 254, 0.3);\n  --control-active-color: #3e91ff;\n  --control-active-disabled-color: rgba(62, 145, 255, 0.4);\n  --control-inactive-color: #8f8f8f;\n  --text-color: #252525;\n  --text-secondary-color: #909090;\n  --color-white: #fafafa;\n  --color-black: #000000;\n  --ripple-color: rgba(0, 0, 0, 0.1);\n  --overlay: rgba(0, 0, 0, 0.45);\n  --background-color: #F2F2F2;\n  --background-area-color: #fcfcfc;\n  --expandable-text-color: #666666;\n  --popup-background: #fcfcfc;\n  --popup-text: #505050;\n  --popup-text-secondary-color: #8f8f8f;\n  --popup-footer-divider-color: #e6e6e6;\n  --popup-scroll-divider-color: #d4d4d4;\n  --icon-color: #3b3b3b;\n  --appbar-main-text-color: #252525;\n  --appbar-subtitle-color: #636363;\n  --appbar-miltiline-title-color: #252525;\n  --tab-text-color: #858585;\n  --tab-text-color-dim: rgba(133, 133, 133, 0.4);\n  --bottom-bar-color: #F2F2F2;\n  --button-icon-color: #252525;\n  --bottom-button-icon-color: #454545;\n  --sub-tab-bg-color: #F2F2F2;\n  --sub-tab-text-color: #858585;\n  --sub-tab-active-text-color: #252525;\n  --sub-tab-border-color: rgba(113, 113, 113, 0.8);\n  --progress-bar-color: #0381fe;\n  --progress-bar-bg-color: rgba(3, 129, 254, 0.3);\n  --button-text-color-disabled: rgba(3, 129, 254, 0.4);\n  --checkbox-favorite-color: #f5ab00;\n  --ripple-button-flat-color: rgba(0, 0, 0, 0.1);\n  --slider-handler-disabled-color: #d2d2d2;\n  --slider-scale-dot: #9c9c9c;\n  --slider-level-bar-bg-color: rgba(151, 151, 151, 0.3);\n  --button-background-contained: rgba(0, 0, 0, 0.06);\n  --on-off-switch-off-disabled-button-border: #d0d0d0;\n  --on-off-switch-on-disabled-button-border: #d0d0d0;\n  --on-off-switch-on-disabled-button-background: #fafafa;\n  --on-off-switch-divider-color: #c4c4c4;\n  --master-on-off-off-color: #fafafa;\n  --master-on-off-on-color: rgba(62, 145, 255, 0.8);\n  --text-input-invalid-color: #b00020;\n  --dropdown-menu-options-border: 0.25px solid #cccccc;\n  --dropdown-menu-options-background: #fcfcfc;\n  --dropdown-menu-options-color: #000000;\n  --dropdown-menu-options-color-dim: rgba(0, 0, 0, 0.4);\n  --content-area-line-color: #d6d6d6;\n  --list-item-selected-color: rgba(3, 129, 254, 0.08);\n  --divider-color: #e6e6e6;\n  --divider-opacity: 100%;\n  --subheader-divider-color: #979797;\n  --expander-color: #747474;\n  --spin-item-opacity: 0.1;\n  --grid-selection-color: rgba(0, 0, 0, 0.3);\n  --calendar-weekend-day-color: #c95151;\n  --calendar-weekend-color: #d77e7e;\n  --calendar-text-color: #454545;\n  --calendar-arrow-color: #8e8e8e;\n  --calendar-select-text-color: #fafafa;\n  --date-picker-header-text-color: #454545;\n  --text-input-disabled: #bebebe;\n  --text-input-label-inactive: #8c8c8c;\n  --text-input-underline-inactive: #8c8c8c;\n  --text-input-underline-active: var(--primary-color);\n  --icon-control-color: var(--color-white);\n  --progress-background-color: #cccccc;\n  --on-off-switch-track-off: #8f8f8f;\n  --more-options-background-color: var(--popup-background);\n  --more-options-background-stroke: #cccccc;\n  --more-options-pressed-color: rgba(0, 0, 0, 0.1);\n  --button-text-contained-dim-color: rgba(37, 37, 37, 0.4);\n}\nbody.ui-theme-dark[_ngcontent-%COMP%] {\n  --primary-color: #0381fe;\n  --primary-dark-color: #3e91ff;\n  --primary-color-20p: rgba(3, 129, 254, 0.2);\n  --primary-color-30p: rgba(3, 129, 254, 0.3);\n  --control-active-color: #3e91ff;\n  --control-active-disabled-color: rgba(62, 145, 255, 0.4);\n  --control-inactive-color: #8f8f8f;\n  --text-color: #fafafa;\n  --text-secondary-color: #999999;\n  --color-white: #fafafa;\n  --color-black: #080808;\n  --ripple-color: rgba(255, 255, 255, 0.2);\n  --overlay: rgba(0, 0, 0, 0.65);\n  --background-color: #080808;\n  --background-area-color: #252525;\n  --expandable-text-color: #9c9c9c;\n  --popup-background: #252525;\n  --popup-text: #e5e5e5;\n  --popup-text-secondary-color: #999999;\n  --popup-footer-divider-color: rgba(230, 230, 230, 0.2);\n  --popup-scroll-divider-color: rgba(212, 212, 212, 0.18);\n  --icon-color: #d9d9d9;\n  --appbar-main-text-color: #fafafa;\n  --appbar-subtitle-color: #9c9c9c;\n  --appbar-miltiline-title-color: #e5e5e5;\n  --tab-text-color: #a8a9a9;\n  --tab-text-color-dim: rgba(168, 169, 169, 0.4);\n  --bottom-bar-color: #010101;\n  --button-icon-color: #fafafa;\n  --bottom-button-icon-color: #cccccc;\n  --sub-tab-bg-color: #010101;\n  --sub-tab-text-color: #999999;\n  --sub-tab-active-text-color: #FFFFFF;\n  --sub-tab-border-color: rgba(255, 255, 255, 0.6);\n  --progress-bar-color: #0381fe;\n  --progress-bar-bg-color: rgba(3, 129, 254, 0.3);\n  --button-text-color-disabled: rgba(3, 129, 254, 0.4);\n  --checkbox-favorite-color: #f5ab00;\n  --ripple-button-flat-color: rgba(255, 255, 255, 0.2);\n  --slider-handler-disabled-color: #545454;\n  --slider-scale-dot: #808080;\n  --slider-level-bar-bg-color: rgba(151, 151, 151, 0.3);\n  --button-background-contained: rgba(250, 250, 250, 0.17);\n  --on-off-switch-off-disabled-button-border: #3b3b3b;\n  --on-off-switch-on-disabled-button-border: #3b3b3b;\n  --on-off-switch-on-disabled-button-background: #858585;\n  --on-off-switch-divider-color: rgba(212, 212, 212, 0.15);\n  --master-on-off-off-color: rgba(250, 250, 250, 0.17);\n  --master-on-off-on-color: rgba(62, 145, 255, 0.4);\n  --text-input-invalid-color: #ff6666;\n  --dropdown-menu-options-border: 0.75px solid #525252;\n  --dropdown-menu-options-background: #3d3d3d;\n  --dropdown-menu-options-color: #fafafa;\n  --dropdown-menu-options-color-dim: rgba(250, 250, 250, 0.4);\n  --content-area-line-color: #d6d6d6;\n  --list-item-selected-color: rgba(250, 250, 250, 0.1);\n  --divider-color: #d4d4d4;\n  --divider-opacity: 15%;\n  --subheader-divider-color: #fafafa;\n  --expander-color: #808080;\n  --spin-item-opacity: 0.2;\n  --grid-selection-color: rgba(0, 0, 0, 0.3);\n  --calendar-weekend-day-color: #c95151;\n  --calendar-weekend-color: #993d3d;\n  --calendar-text-color: #cccccc;\n  --calendar-arrow-color: #737373;\n  --calendar-select-text-color: #000000;\n  --date-picker-header-text-color: #cccccc;\n  --surface: #3d3d3d;\n  --text-input-disabled: #454545;\n  --text-input-label-inactive: #737373;\n  --text-input-underline-inactive: #737373;\n  --text-input-underline-active: var(--primary-color);\n  --icon-control-color: var(--surface);\n  --progress-background-color: #252525;\n  --more-options-background-color: #3d3d3d;\n  --more-options-background-stroke: #525252;\n  --more-options-pressed-color: rgba(255, 255, 255, 0.2);\n  --button-text-contained-dim-color: rgba(250, 250, 250, 0.4);\n}\n.tau-info-theme[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -999px;\n  left: -999px;\n}\n.ui-spin[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  height: 164px;\n  background-color: transparent;\n  overflow: hidden;\n  font-size: 32px;\n  padding: 0;\n  box-sizing: content-box;\n  width: 50px;\n}\n.ui-spin-item[_ngcontent-%COMP%] {\n  align-items: center;\n  background-color: transparent;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  color: var(--primary-dark-color);\n  opacity: var(--spin-item-opacity) !important;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  font-family: Roboto-Medium;\n}\n.ui-spin-item-selected[_ngcontent-%COMP%] {\n  opacity: 1 !important;\n}\n.ui-spin-carousel-item[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.ui-spin-enabling[_ngcontent-%COMP%]   .ui-spin-item[_ngcontent-%COMP%] {\n  transition: 300ms opacity linear;\n}\n.ui-spin-placeholder[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  display: none;\n}\n.tau-info-theme[_ngcontent-%COMP%]:after {\n  content: \"default\";\n}\n.default-spin[_ngcontent-%COMP%] {\n  height: 150px;\n  font-size: 50px;\n  width: 200px;\n}\n.default-spin[_ngcontent-%COMP%]   .ui-spin-item-selected[_ngcontent-%COMP%] {\n  font-size: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hc3NldHMvY3NzL3NwaW4uY3NzIiwiL2hvbWUvdGx1a2F3c2tpL2dpdGh1Yi9UQVUvZXhhbXBsZXMvYW5ndWxhci9oZWxsby13b3JsZC9zcmMvYXBwL3NwaW4vc3Bpbi5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvc3Bpbi9zcGluLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztnQ0FFZ0M7QUFDaEM7OzZCQUU2QjtBQUM3Qjs7NkJBRTZCO0FBQzdCO0VBQ0UsK0JBQStCO0VBQy9CLHdCQUF3QjtFQUN4Qiw2QkFBNkI7RUFDN0IsNkJBQTZCO0VBQzdCLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLHdCQUF3QjtFQUN4Qix5QkFBeUI7RUFDekIscUNBQXFDO0VBQ3JDLGlDQUFpQztFQUNqQyw2QkFBNkI7RUFDN0IsdUNBQXVDO0VBQ3ZDLDRDQUE0QztFQUM1Qyx5Q0FBeUM7RUFDekMscURBQXFEO0VBQ3JELDZCQUE2QjtFQUM3QiwrQkFBK0I7RUFDL0IsdUNBQXVDO0VBQ3ZDLDBDQUEwQztFQUMxQyxzRUFBc0U7RUFDdEUsaURBQWlEO0VBQ2pELG1FQUFtRTtBQUNyRTtBQUNBOzs7RUFHRSx3QkFBd0I7RUFDeEIsNkJBQTZCO0VBQzdCLDJDQUEyQztFQUMzQywyQ0FBMkM7RUFDM0MsK0JBQStCO0VBQy9CLHdEQUF3RDtFQUN4RCxpQ0FBaUM7RUFDakMscUJBQXFCO0VBQ3JCLCtCQUErQjtFQUMvQixzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLGtDQUFrQztFQUNsQyw4QkFBOEI7RUFDOUIsMkJBQTJCO0VBQzNCLGdDQUFnQztFQUNoQyxnQ0FBZ0M7RUFDaEMsMkJBQTJCO0VBQzNCLHFCQUFxQjtFQUNyQixxQ0FBcUM7RUFDckMscUNBQXFDO0VBQ3JDLHFDQUFxQztFQUNyQyxxQkFBcUI7RUFDckIsaUNBQWlDO0VBQ2pDLGdDQUFnQztFQUNoQyx1Q0FBdUM7RUFDdkMseUJBQXlCO0VBQ3pC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RUFDcEIsYUFBYTtFQUNiLDZCQUE2QjtFQUM3QixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFVBQVU7RUFDVix1QkFBdUI7RUFDdkIsV0FBVztBQUNiO0FBQ0E7RUFHVSxtQkFBbUI7RUFDM0IsNkJBQTZCO0VBQzdCLFdBQVc7RUFHWCxhQUFhO0VBR0wsc0JBQXNCO0VBR3RCLHVCQUF1QjtFQUMvQixnQ0FBZ0M7RUFDaEMsNENBQTRDO0VBQzVDLHlCQUF5QjtLQUN0QixzQkFBc0I7VUFFakIsaUJBQWlCO0VBQ3pCLDBCQUEwQjtBQUM1QjtBQUNBO0VBQ0UscUJBQXFCO0FBQ3ZCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLE1BQU07RUFDTixXQUFXO0VBR1gsYUFBYTtFQUdMLHNCQUFzQjtFQUd0Qix1QkFBdUI7QUFDakM7QUFDQTtFQUNFLGdDQUFnQztBQUNsQztBQUNBO0VBQ0UsVUFBVTtFQUNWLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsYUFBYTtBQUNmO0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7QUMxUUE7RUFDQyxhQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7QUNBRDtBREVBO0VBQ0MsZUFBQTtBQ0FEIiwiZmlsZSI6InNyYy9hcHAvc3Bpbi9zcGluLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBUaXplbiBDaGFuZ2VhYmxlIExlc3MgSGVhZGVyICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFRpemVuIG5pbmUtcGF0Y2ggaW1hZ2VzICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBUaXplbiBDb21tb24gTGVzcyBIZWFkZXIgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG46cm9vdCB7XG4gIC0tdGV4dC1zZWNvbmRhcnktY29sb3I6ICM5MDkwOTA7XG4gIC0tcHJpbWFyeS1jb2xvcjogIzAzODFmZTtcbiAgLS1jb250cm9sLWJhY2tncm91bmQ6ICNlNmU2ZTY7XG4gIC0tdGV4dHVhbC1iYWNrZ3JvdW5kOiAjRkNGQ0ZDO1xuICAtLWNvbG9yLXdoaXRlOiAjZmFmYWZhO1xuICAtLXN1cmZhY2U6ICNGQ0ZDRkM7XG4gIC0tYWNjZW50LWJhZGdlOiAjRjU2QTBEO1xuICAtLW9uLWJhY2tncm91bmQ6ICM4NTg1ODU7XG4gIC0tYm9yZGVyLXN1cmZhY2U6ICNlNmU2ZTY7XG4gIC0tYnV0dG9uLWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMCk7XG4gIC0tYnV0dG9uLWJhY2tncm91bmQtZmxhdDogI2Y1ZjVmNTtcbiAgLS1idXR0b24tdGV4dC1mb250LXNpemU6IDE3cHg7XG4gIC0tYnV0dG9uLWNvbnRhaW5lZC10ZXh0LWZvbnQtc2l6ZTogMTdweDtcbiAgLS1idXR0b24tY29udGFpbmVkLWxpc3QtdGV4dC1mb250LXNpemU6IDE1cHg7XG4gIC0tc2xpZGVyLWJnLWNvbG9yOiByZ2JhKDMsIDEyOSwgMjU0LCAwLjMpO1xuICAtLXNsaWRlci1iZy1kaXNhYmxlZC1jb2xvcjogcmdiYSgxMDIsIDEwMiwgMTAyLCAwLjE1KTtcbiAgLS1zbGlkZXItdmFsdWUtY29sb3I6ICMwMzgxZmU7XG4gIC0tc2xpZGVyLWhhbmRsZXItY29sb3I6ICMwMzgxZmU7XG4gIC0tcHJvZ3Jlc3MtY2lyY2xlLXNlY29uZC1jb2xvcjogIzA2YjQ4NTtcbiAgLS1vbi1vZmYtc3dpdGNoLW9mZi1idXR0b24tYm9yZGVyOiAjOGY4ZjhmO1xuICAtLW9uLW9mZi1zd2l0Y2gtb24tZGlzYWJsZWQtdHJhY2stYmFja2dyb3VuZDogcmdiYSgxNDMsIDE0MywgMTQzLCAwLjQpO1xuICAtLW9uLW9mZi1zd2l0Y2gtb2ZmLXRyYWNrLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLW9uLW9mZi1zd2l0Y2gtb2ZmLWRpc2FibGVkLXRyYWNrLWJvcmRlcjogcmdiYSgxNDMsIDE0MywgMTQzLCAwLjQpO1xufVxuYm9keSxcbmJvZHkudWktdGhlbWUtbGlnaHQsXG5ib2R5LnVpLXRoZW1lLWRlZmF1bHQge1xuICAtLXByaW1hcnktY29sb3I6ICMwMzgxZmU7XG4gIC0tcHJpbWFyeS1kYXJrLWNvbG9yOiAjMDA3MmRlO1xuICAtLXByaW1hcnktY29sb3ItMjBwOiByZ2JhKDMsIDEyOSwgMjU0LCAwLjIpO1xuICAtLXByaW1hcnktY29sb3ItMzBwOiByZ2JhKDMsIDEyOSwgMjU0LCAwLjMpO1xuICAtLWNvbnRyb2wtYWN0aXZlLWNvbG9yOiAjM2U5MWZmO1xuICAtLWNvbnRyb2wtYWN0aXZlLWRpc2FibGVkLWNvbG9yOiByZ2JhKDYyLCAxNDUsIDI1NSwgMC40KTtcbiAgLS1jb250cm9sLWluYWN0aXZlLWNvbG9yOiAjOGY4ZjhmO1xuICAtLXRleHQtY29sb3I6ICMyNTI1MjU7XG4gIC0tdGV4dC1zZWNvbmRhcnktY29sb3I6ICM5MDkwOTA7XG4gIC0tY29sb3Itd2hpdGU6ICNmYWZhZmE7XG4gIC0tY29sb3ItYmxhY2s6ICMwMDAwMDA7XG4gIC0tcmlwcGxlLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIC0tb3ZlcmxheTogcmdiYSgwLCAwLCAwLCAwLjQ1KTtcbiAgLS1iYWNrZ3JvdW5kLWNvbG9yOiAjRjJGMkYyO1xuICAtLWJhY2tncm91bmQtYXJlYS1jb2xvcjogI2ZjZmNmYztcbiAgLS1leHBhbmRhYmxlLXRleHQtY29sb3I6ICM2NjY2NjY7XG4gIC0tcG9wdXAtYmFja2dyb3VuZDogI2ZjZmNmYztcbiAgLS1wb3B1cC10ZXh0OiAjNTA1MDUwO1xuICAtLXBvcHVwLXRleHQtc2Vjb25kYXJ5LWNvbG9yOiAjOGY4ZjhmO1xuICAtLXBvcHVwLWZvb3Rlci1kaXZpZGVyLWNvbG9yOiAjZTZlNmU2O1xuICAtLXBvcHVwLXNjcm9sbC1kaXZpZGVyLWNvbG9yOiAjZDRkNGQ0O1xuICAtLWljb24tY29sb3I6ICMzYjNiM2I7XG4gIC0tYXBwYmFyLW1haW4tdGV4dC1jb2xvcjogIzI1MjUyNTtcbiAgLS1hcHBiYXItc3VidGl0bGUtY29sb3I6ICM2MzYzNjM7XG4gIC0tYXBwYmFyLW1pbHRpbGluZS10aXRsZS1jb2xvcjogIzI1MjUyNTtcbiAgLS10YWItdGV4dC1jb2xvcjogIzg1ODU4NTtcbiAgLS10YWItdGV4dC1jb2xvci1kaW06IHJnYmEoMTMzLCAxMzMsIDEzMywgMC40KTtcbiAgLS1ib3R0b20tYmFyLWNvbG9yOiAjRjJGMkYyO1xuICAtLWJ1dHRvbi1pY29uLWNvbG9yOiAjMjUyNTI1O1xuICAtLWJvdHRvbS1idXR0b24taWNvbi1jb2xvcjogIzQ1NDU0NTtcbiAgLS1zdWItdGFiLWJnLWNvbG9yOiAjRjJGMkYyO1xuICAtLXN1Yi10YWItdGV4dC1jb2xvcjogIzg1ODU4NTtcbiAgLS1zdWItdGFiLWFjdGl2ZS10ZXh0LWNvbG9yOiAjMjUyNTI1O1xuICAtLXN1Yi10YWItYm9yZGVyLWNvbG9yOiByZ2JhKDExMywgMTEzLCAxMTMsIDAuOCk7XG4gIC0tcHJvZ3Jlc3MtYmFyLWNvbG9yOiAjMDM4MWZlO1xuICAtLXByb2dyZXNzLWJhci1iZy1jb2xvcjogcmdiYSgzLCAxMjksIDI1NCwgMC4zKTtcbiAgLS1idXR0b24tdGV4dC1jb2xvci1kaXNhYmxlZDogcmdiYSgzLCAxMjksIDI1NCwgMC40KTtcbiAgLS1jaGVja2JveC1mYXZvcml0ZS1jb2xvcjogI2Y1YWIwMDtcbiAgLS1yaXBwbGUtYnV0dG9uLWZsYXQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgLS1zbGlkZXItaGFuZGxlci1kaXNhYmxlZC1jb2xvcjogI2QyZDJkMjtcbiAgLS1zbGlkZXItc2NhbGUtZG90OiAjOWM5YzljO1xuICAtLXNsaWRlci1sZXZlbC1iYXItYmctY29sb3I6IHJnYmEoMTUxLCAxNTEsIDE1MSwgMC4zKTtcbiAgLS1idXR0b24tYmFja2dyb3VuZC1jb250YWluZWQ6IHJnYmEoMCwgMCwgMCwgMC4wNik7XG4gIC0tb24tb2ZmLXN3aXRjaC1vZmYtZGlzYWJsZWQtYnV0dG9uLWJvcmRlcjogI2QwZDBkMDtcbiAgLS1vbi1vZmYtc3dpdGNoLW9uLWRpc2FibGVkLWJ1dHRvbi1ib3JkZXI6ICNkMGQwZDA7XG4gIC0tb24tb2ZmLXN3aXRjaC1vbi1kaXNhYmxlZC1idXR0b24tYmFja2dyb3VuZDogI2ZhZmFmYTtcbiAgLS1vbi1vZmYtc3dpdGNoLWRpdmlkZXItY29sb3I6ICNjNGM0YzQ7XG4gIC0tbWFzdGVyLW9uLW9mZi1vZmYtY29sb3I6ICNmYWZhZmE7XG4gIC0tbWFzdGVyLW9uLW9mZi1vbi1jb2xvcjogcmdiYSg2MiwgMTQ1LCAyNTUsIDAuOCk7XG4gIC0tdGV4dC1pbnB1dC1pbnZhbGlkLWNvbG9yOiAjYjAwMDIwO1xuICAtLWRyb3Bkb3duLW1lbnUtb3B0aW9ucy1ib3JkZXI6IDAuMjVweCBzb2xpZCAjY2NjY2NjO1xuICAtLWRyb3Bkb3duLW1lbnUtb3B0aW9ucy1iYWNrZ3JvdW5kOiAjZmNmY2ZjO1xuICAtLWRyb3Bkb3duLW1lbnUtb3B0aW9ucy1jb2xvcjogIzAwMDAwMDtcbiAgLS1kcm9wZG93bi1tZW51LW9wdGlvbnMtY29sb3ItZGltOiByZ2JhKDAsIDAsIDAsIDAuNCk7XG4gIC0tY29udGVudC1hcmVhLWxpbmUtY29sb3I6ICNkNmQ2ZDY7XG4gIC0tbGlzdC1pdGVtLXNlbGVjdGVkLWNvbG9yOiByZ2JhKDMsIDEyOSwgMjU0LCAwLjA4KTtcbiAgLS1kaXZpZGVyLWNvbG9yOiAjZTZlNmU2O1xuICAtLWRpdmlkZXItb3BhY2l0eTogMTAwJTtcbiAgLS1zdWJoZWFkZXItZGl2aWRlci1jb2xvcjogIzk3OTc5NztcbiAgLS1leHBhbmRlci1jb2xvcjogIzc0NzQ3NDtcbiAgLS1zcGluLWl0ZW0tb3BhY2l0eTogMC4xO1xuICAtLWdyaWQtc2VsZWN0aW9uLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIC0tY2FsZW5kYXItd2Vla2VuZC1kYXktY29sb3I6ICNjOTUxNTE7XG4gIC0tY2FsZW5kYXItd2Vla2VuZC1jb2xvcjogI2Q3N2U3ZTtcbiAgLS1jYWxlbmRhci10ZXh0LWNvbG9yOiAjNDU0NTQ1O1xuICAtLWNhbGVuZGFyLWFycm93LWNvbG9yOiAjOGU4ZThlO1xuICAtLWNhbGVuZGFyLXNlbGVjdC10ZXh0LWNvbG9yOiAjZmFmYWZhO1xuICAtLWRhdGUtcGlja2VyLWhlYWRlci10ZXh0LWNvbG9yOiAjNDU0NTQ1O1xuICAtLXRleHQtaW5wdXQtZGlzYWJsZWQ6ICNiZWJlYmU7XG4gIC0tdGV4dC1pbnB1dC1sYWJlbC1pbmFjdGl2ZTogIzhjOGM4YztcbiAgLS10ZXh0LWlucHV0LXVuZGVybGluZS1pbmFjdGl2ZTogIzhjOGM4YztcbiAgLS10ZXh0LWlucHV0LXVuZGVybGluZS1hY3RpdmU6IHZhcigtLXByaW1hcnktY29sb3IpO1xuICAtLWljb24tY29udHJvbC1jb2xvcjogdmFyKC0tY29sb3Itd2hpdGUpO1xuICAtLXByb2dyZXNzLWJhY2tncm91bmQtY29sb3I6ICNjY2NjY2M7XG4gIC0tb24tb2ZmLXN3aXRjaC10cmFjay1vZmY6ICM4ZjhmOGY7XG4gIC0tbW9yZS1vcHRpb25zLWJhY2tncm91bmQtY29sb3I6IHZhcigtLXBvcHVwLWJhY2tncm91bmQpO1xuICAtLW1vcmUtb3B0aW9ucy1iYWNrZ3JvdW5kLXN0cm9rZTogI2NjY2NjYztcbiAgLS1tb3JlLW9wdGlvbnMtcHJlc3NlZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAtLWJ1dHRvbi10ZXh0LWNvbnRhaW5lZC1kaW0tY29sb3I6IHJnYmEoMzcsIDM3LCAzNywgMC40KTtcbn1cbmJvZHkudWktdGhlbWUtZGFyayB7XG4gIC0tcHJpbWFyeS1jb2xvcjogIzAzODFmZTtcbiAgLS1wcmltYXJ5LWRhcmstY29sb3I6ICMzZTkxZmY7XG4gIC0tcHJpbWFyeS1jb2xvci0yMHA6IHJnYmEoMywgMTI5LCAyNTQsIDAuMik7XG4gIC0tcHJpbWFyeS1jb2xvci0zMHA6IHJnYmEoMywgMTI5LCAyNTQsIDAuMyk7XG4gIC0tY29udHJvbC1hY3RpdmUtY29sb3I6ICMzZTkxZmY7XG4gIC0tY29udHJvbC1hY3RpdmUtZGlzYWJsZWQtY29sb3I6IHJnYmEoNjIsIDE0NSwgMjU1LCAwLjQpO1xuICAtLWNvbnRyb2wtaW5hY3RpdmUtY29sb3I6ICM4ZjhmOGY7XG4gIC0tdGV4dC1jb2xvcjogI2ZhZmFmYTtcbiAgLS10ZXh0LXNlY29uZGFyeS1jb2xvcjogIzk5OTk5OTtcbiAgLS1jb2xvci13aGl0ZTogI2ZhZmFmYTtcbiAgLS1jb2xvci1ibGFjazogIzA4MDgwODtcbiAgLS1yaXBwbGUtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgLS1vdmVybGF5OiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xuICAtLWJhY2tncm91bmQtY29sb3I6ICMwODA4MDg7XG4gIC0tYmFja2dyb3VuZC1hcmVhLWNvbG9yOiAjMjUyNTI1O1xuICAtLWV4cGFuZGFibGUtdGV4dC1jb2xvcjogIzljOWM5YztcbiAgLS1wb3B1cC1iYWNrZ3JvdW5kOiAjMjUyNTI1O1xuICAtLXBvcHVwLXRleHQ6ICNlNWU1ZTU7XG4gIC0tcG9wdXAtdGV4dC1zZWNvbmRhcnktY29sb3I6ICM5OTk5OTk7XG4gIC0tcG9wdXAtZm9vdGVyLWRpdmlkZXItY29sb3I6IHJnYmEoMjMwLCAyMzAsIDIzMCwgMC4yKTtcbiAgLS1wb3B1cC1zY3JvbGwtZGl2aWRlci1jb2xvcjogcmdiYSgyMTIsIDIxMiwgMjEyLCAwLjE4KTtcbiAgLS1pY29uLWNvbG9yOiAjZDlkOWQ5O1xuICAtLWFwcGJhci1tYWluLXRleHQtY29sb3I6ICNmYWZhZmE7XG4gIC0tYXBwYmFyLXN1YnRpdGxlLWNvbG9yOiAjOWM5YzljO1xuICAtLWFwcGJhci1taWx0aWxpbmUtdGl0bGUtY29sb3I6ICNlNWU1ZTU7XG4gIC0tdGFiLXRleHQtY29sb3I6ICNhOGE5YTk7XG4gIC0tdGFiLXRleHQtY29sb3ItZGltOiByZ2JhKDE2OCwgMTY5LCAxNjksIDAuNCk7XG4gIC0tYm90dG9tLWJhci1jb2xvcjogIzAxMDEwMTtcbiAgLS1idXR0b24taWNvbi1jb2xvcjogI2ZhZmFmYTtcbiAgLS1ib3R0b20tYnV0dG9uLWljb24tY29sb3I6ICNjY2NjY2M7XG4gIC0tc3ViLXRhYi1iZy1jb2xvcjogIzAxMDEwMTtcbiAgLS1zdWItdGFiLXRleHQtY29sb3I6ICM5OTk5OTk7XG4gIC0tc3ViLXRhYi1hY3RpdmUtdGV4dC1jb2xvcjogI0ZGRkZGRjtcbiAgLS1zdWItdGFiLWJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAtLXByb2dyZXNzLWJhci1jb2xvcjogIzAzODFmZTtcbiAgLS1wcm9ncmVzcy1iYXItYmctY29sb3I6IHJnYmEoMywgMTI5LCAyNTQsIDAuMyk7XG4gIC0tYnV0dG9uLXRleHQtY29sb3ItZGlzYWJsZWQ6IHJnYmEoMywgMTI5LCAyNTQsIDAuNCk7XG4gIC0tY2hlY2tib3gtZmF2b3JpdGUtY29sb3I6ICNmNWFiMDA7XG4gIC0tcmlwcGxlLWJ1dHRvbi1mbGF0LWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG4gIC0tc2xpZGVyLWhhbmRsZXItZGlzYWJsZWQtY29sb3I6ICM1NDU0NTQ7XG4gIC0tc2xpZGVyLXNjYWxlLWRvdDogIzgwODA4MDtcbiAgLS1zbGlkZXItbGV2ZWwtYmFyLWJnLWNvbG9yOiByZ2JhKDE1MSwgMTUxLCAxNTEsIDAuMyk7XG4gIC0tYnV0dG9uLWJhY2tncm91bmQtY29udGFpbmVkOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuMTcpO1xuICAtLW9uLW9mZi1zd2l0Y2gtb2ZmLWRpc2FibGVkLWJ1dHRvbi1ib3JkZXI6ICMzYjNiM2I7XG4gIC0tb24tb2ZmLXN3aXRjaC1vbi1kaXNhYmxlZC1idXR0b24tYm9yZGVyOiAjM2IzYjNiO1xuICAtLW9uLW9mZi1zd2l0Y2gtb24tZGlzYWJsZWQtYnV0dG9uLWJhY2tncm91bmQ6ICM4NTg1ODU7XG4gIC0tb24tb2ZmLXN3aXRjaC1kaXZpZGVyLWNvbG9yOiByZ2JhKDIxMiwgMjEyLCAyMTIsIDAuMTUpO1xuICAtLW1hc3Rlci1vbi1vZmYtb2ZmLWNvbG9yOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuMTcpO1xuICAtLW1hc3Rlci1vbi1vZmYtb24tY29sb3I6IHJnYmEoNjIsIDE0NSwgMjU1LCAwLjQpO1xuICAtLXRleHQtaW5wdXQtaW52YWxpZC1jb2xvcjogI2ZmNjY2NjtcbiAgLS1kcm9wZG93bi1tZW51LW9wdGlvbnMtYm9yZGVyOiAwLjc1cHggc29saWQgIzUyNTI1MjtcbiAgLS1kcm9wZG93bi1tZW51LW9wdGlvbnMtYmFja2dyb3VuZDogIzNkM2QzZDtcbiAgLS1kcm9wZG93bi1tZW51LW9wdGlvbnMtY29sb3I6ICNmYWZhZmE7XG4gIC0tZHJvcGRvd24tbWVudS1vcHRpb25zLWNvbG9yLWRpbTogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjQpO1xuICAtLWNvbnRlbnQtYXJlYS1saW5lLWNvbG9yOiAjZDZkNmQ2O1xuICAtLWxpc3QtaXRlbS1zZWxlY3RlZC1jb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjEpO1xuICAtLWRpdmlkZXItY29sb3I6ICNkNGQ0ZDQ7XG4gIC0tZGl2aWRlci1vcGFjaXR5OiAxNSU7XG4gIC0tc3ViaGVhZGVyLWRpdmlkZXItY29sb3I6ICNmYWZhZmE7XG4gIC0tZXhwYW5kZXItY29sb3I6ICM4MDgwODA7XG4gIC0tc3Bpbi1pdGVtLW9wYWNpdHk6IDAuMjtcbiAgLS1ncmlkLXNlbGVjdGlvbi1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICAtLWNhbGVuZGFyLXdlZWtlbmQtZGF5LWNvbG9yOiAjYzk1MTUxO1xuICAtLWNhbGVuZGFyLXdlZWtlbmQtY29sb3I6ICM5OTNkM2Q7XG4gIC0tY2FsZW5kYXItdGV4dC1jb2xvcjogI2NjY2NjYztcbiAgLS1jYWxlbmRhci1hcnJvdy1jb2xvcjogIzczNzM3MztcbiAgLS1jYWxlbmRhci1zZWxlY3QtdGV4dC1jb2xvcjogIzAwMDAwMDtcbiAgLS1kYXRlLXBpY2tlci1oZWFkZXItdGV4dC1jb2xvcjogI2NjY2NjYztcbiAgLS1zdXJmYWNlOiAjM2QzZDNkO1xuICAtLXRleHQtaW5wdXQtZGlzYWJsZWQ6ICM0NTQ1NDU7XG4gIC0tdGV4dC1pbnB1dC1sYWJlbC1pbmFjdGl2ZTogIzczNzM3MztcbiAgLS10ZXh0LWlucHV0LXVuZGVybGluZS1pbmFjdGl2ZTogIzczNzM3MztcbiAgLS10ZXh0LWlucHV0LXVuZGVybGluZS1hY3RpdmU6IHZhcigtLXByaW1hcnktY29sb3IpO1xuICAtLWljb24tY29udHJvbC1jb2xvcjogdmFyKC0tc3VyZmFjZSk7XG4gIC0tcHJvZ3Jlc3MtYmFja2dyb3VuZC1jb2xvcjogIzI1MjUyNTtcbiAgLS1tb3JlLW9wdGlvbnMtYmFja2dyb3VuZC1jb2xvcjogIzNkM2QzZDtcbiAgLS1tb3JlLW9wdGlvbnMtYmFja2dyb3VuZC1zdHJva2U6ICM1MjUyNTI7XG4gIC0tbW9yZS1vcHRpb25zLXByZXNzZWQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgLS1idXR0b24tdGV4dC1jb250YWluZWQtZGltLWNvbG9yOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuNCk7XG59XG4udGF1LWluZm8tdGhlbWUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTk5OXB4O1xuICBsZWZ0OiAtOTk5cHg7XG59XG4udWktc3BpbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtZmxleDtcbiAgZGlzcGxheTogLW1zLWlubGluZS1mbGV4Ym94O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgaGVpZ2h0OiAxNjRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGZvbnQtc2l6ZTogMzJweDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIHdpZHRoOiA1MHB4O1xufVxuLnVpLXNwaW4taXRlbSB7XG4gIC13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICBkaXNwbGF5OiBmbGV4O1xuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2xvcjogdmFyKC0tcHJpbWFyeS1kYXJrLWNvbG9yKTtcbiAgb3BhY2l0eTogdmFyKC0tc3Bpbi1pdGVtLW9wYWNpdHkpICFpbXBvcnRhbnQ7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8tTWVkaXVtO1xufVxuLnVpLXNwaW4taXRlbS1zZWxlY3RlZCB7XG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn1cbi51aS1zcGluLWNhcm91c2VsLWl0ZW0ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4udWktc3Bpbi1lbmFibGluZyAudWktc3Bpbi1pdGVtIHtcbiAgdHJhbnNpdGlvbjogMzAwbXMgb3BhY2l0eSBsaW5lYXI7XG59XG4udWktc3Bpbi1wbGFjZWhvbGRlciB7XG4gIG9wYWNpdHk6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4udGF1LWluZm8tdGhlbWU6YWZ0ZXIge1xuICBjb250ZW50OiBcImRlZmF1bHRcIjtcbn1cbiIsIkBpbXBvcnQgJy4uLy4uL2Fzc2V0cy9jc3Mvc3Bpbi5jc3MnO1xuXG4uZGVmYXVsdC1zcGluIHtcblx0aGVpZ2h0OiAxNTBweDtcblx0Zm9udC1zaXplOiA1MHB4O1xuXHR3aWR0aDogMjAwcHg7XG59XG4uZGVmYXVsdC1zcGluIC51aS1zcGluLWl0ZW0tc2VsZWN0ZWQge1xuXHRmb250LXNpemU6IDUwcHg7XG59IiwiQGltcG9ydCAnLi4vLi4vYXNzZXRzL2Nzcy9zcGluLmNzcyc7XG4uZGVmYXVsdC1zcGluIHtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgZm9udC1zaXplOiA1MHB4O1xuICB3aWR0aDogMjAwcHg7XG59XG4uZGVmYXVsdC1zcGluIC51aS1zcGluLWl0ZW0tc2VsZWN0ZWQge1xuICBmb250LXNpemU6IDUwcHg7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpinComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-spin',
                templateUrl: './spin.component.html',
                styleUrls: ['./spin.component.less']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tlukawski/github/TAU/examples/angular/hello-world/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map