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

/***/ "./scripts/field.js":
/*!**************************!*\
  !*** ./scripts/field.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(/*! ./player */ "./scripts/player.js");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
  function Field(canvas, width, height) {
    _classCallCheck(this, Field);

    canvas.width = width;
    canvas.height = height;

    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext("2d");
    this.player = new _player2.default(this.ctx, width, height);

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
  }

  _createClass(Field, [{
    key: 'clearAll',
    value: function clearAll() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: 'drawFieldBorder',
    value: function drawFieldBorder() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.rect(0, 0, this.width, this.height);
      this.ctx.stroke();
    }
  }, {
    key: 'drawPlayerRails',
    value: function drawPlayerRails(shape) {
      var xCenter = this.width / 2;
      var yCenter = this.height / 2;

      switch (shape) {
        case 'circle':
        default:
          this.ctx.beginPath();
          this.ctx.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = 2;
          this.ctx.stroke();
      }
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer() {
      this.player.draw();
    }
  }, {
    key: 'playRound',
    value: function playRound() {
      this.clearAll();
      this.drawFieldBorder();
      this.drawPlayerRails('circle');

      this.drawPlayer();
      requestAnimationFrame(this.playRound);
    }
  }]);

  return Field;
}();

exports.default = Field;

/***/ }),

/***/ "./scripts/game.js":
/*!*************************!*\
  !*** ./scripts/game.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _field = __webpack_require__(/*! ./field */ "./scripts/field.js");

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startGame = function startGame(canvas) {
  var field = new _field2.default(canvas, 800, 500);
  field.drawPlayer();
  field.playRound();
};

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("gameCanvas");
  startGame(canvas);
});

/***/ }),

/***/ "./scripts/player.js":
/*!***************************!*\
  !*** ./scripts/player.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ARROW_MAP = {
  40: 'up',
  39: 'right',
  38: 'down',
  37: 'left'
};

var Player = function () {
  function Player(ctx, fieldWidth, fieldHeight) {
    _classCallCheck(this, Player);

    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    document.addEventListener('keydown', this.keydown.bind(this));
  }

  _createClass(Player, [{
    key: 'draw',
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = 'red';
      this.ctx.fill();
    }
  }, {
    key: 'getBorders',
    value: function getBorders() {
      return {
        xMin: this.x,
        xMax: this.x + this.width,
        yMin: this.y,
        yMax: this.y + this.height
      };
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var arrow = ARROW_MAP[e.keyCode];

      if (arrow === 'left') {
        this.x -= this.speed;
      }
      if (arrow === 'right') {
        this.x += this.speed;
      }
      if (arrow === 'up') {
        this.y += this.speed;
      }
      if (arrow === 'down') {
        this.y -= this.speed;
      }
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map