/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/game.js":
/*!*************************!*\
  !*** ./scripts/game.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ARROW_MAP = {
  40: 'up',
  39: 'right',
  38: 'down',
  37: 'left'
};

var Game = function () {
  function Game(canvas, width, height) {
    _classCallCheck(this, Game);

    canvas.width = width;
    canvas.height = height;

    this._width = width;
    this._height = height;
    this._ctx = canvas.getContext("2d");

    this.play = this.play.bind(this);
  }

  _createClass(Game, [{
    key: 'play',
    value: function play() {
      this._clearAll();
      this._drawBorder();

      requestAnimationFrame(this.play);
    }
  }, {
    key: '_clearAll',
    value: function _clearAll() {
      this._ctx.clearRect(0, 0, this._width, this._height);
    }
  }, {
    key: '_drawBorder',
    value: function _drawBorder() {
      this._ctx.beginPath();
      this._ctx.rect(0, 0, this._width, this._height);
      this._ctx.stroke();
    }
  }, {
    key: '_makePurple',
    value: function _makePurple() {
      this._ctx.fillStyle = "purple";
      this._ctx.fillRect(0, 0, 700, 500);

      this._ctx.beginPath();
      this._ctx.arc(300, 100, 20, 0, 2 * Math.PI, true);
      this._ctx.strokeStyle = "green";
      this._ctx.lineWidth = 5;
      this._ctx.stroke();
      this._ctx.fillStyle = "blue";
      this._ctx.fill();
    }
  }]);

  return Game;
}();

var canvas = document.getElementById("gameCanvas");
var game = new Game(canvas, 700, 500);

document.addEventListener("DOMContentLoaded", game.play);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map