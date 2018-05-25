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
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.render = this.render.bind(this);
    this.playRound = this.playRound.bind(this);
  }

  _createClass(Field, [{
    key: 'drawFieldBorder',
    value: function drawFieldBorder() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.rect(0, 0, this.width, this.height);
      this.ctx.strokeStyle = 'black';
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
    key: 'playRound',
    value: function playRound() {
      var now = Date.now();
      // let dt = (now - this.lastTime) / 1000.0;

      // update(dt);
      this.render();

      this.lastTime = now;
      requestAnimationFrame(this.playRound);
    }
  }, {
    key: 'render',
    value: function render() {
      this.clearAll();
      this.drawFieldBorder();
      this.drawPlayerRails('circle');
      this.drawPlayer();
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer() {
      this.player.draw();
    }
  }, {
    key: 'clearAll',
    value: function clearAll() {
      this.ctx.clearRect(0, 0, this.width, this.height);
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
  // field.drawPlayer();

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
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;

    this.width = 10;
    this.height = 10;
    this.speed = 0.1;
    this.outerAngle = 0.5 * Math.PI;
    this.radius = 20;
    this.drawPoint = this.computeDrawPoint();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.computeDrawPoint = this.computeDrawPoint.bind(this);
    this.draw = this.draw.bind(this);
    this.rotatePlayer = this.rotatePlayer.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
  }

  _createClass(Player, [{
    key: 'computeDrawPoint',
    value: function computeDrawPoint() {
      return {
        x: Math.cos(this.outerAngle) * this.radius + this.fieldWidth / 2,
        y: -Math.sin(this.outerAngle) * this.radius + this.fieldHeight / 2
      };
    }
  }, {
    key: 'draw',
    value: function draw() {
      // this.rotatePlayer();
      this.ctx.beginPath();
      this.ctx.moveTo(this.drawPoint.x, this.drawPoint.y);
      this.ctx.lineTo(this.drawPoint.x - 5 * Math.cos(Math.PI / 6), this.drawPoint.y - 10 * Math.sin(Math.PI / 6));
      this.ctx.lineTo(this.drawPoint.x + 5 * Math.cos(Math.PI / 6), this.drawPoint.y - 10 * Math.sin(Math.PI / 6));
      this.ctx.strokeStyle = 'black';
      this.ctx.fill();
      console.log(this.outerAngle - Math.PI / 2);

      // this.ctx.drawImage(
      //   this.playerImage,
      //   0,
      //   0,
      //   this.width,
      //   this.height,
      //   this.drawPoint.x,
      //   this.drawPoint.y,
      //   this.width,
      //   this.height
      // );

      this.ctx.beginPath();
      this.ctx.moveTo(this.fieldWidth / 2, this.fieldHeight / 2);
      this.ctx.lineTo(this.drawPoint.x, this.drawPoint.y);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'green';
      this.ctx.stroke();
    }

    // computeRadius() {
    //   return Math.sqrt(
    //     Math.pow((this.drawPoint.x - this.fieldWidth / 2), 2) +
    //     Math.pow((this.drawPoint.y - this.fieldHeight / 2), 2)
    //   )
    // }

    // draw() {
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.rotateX(this.x), this.rotateY(this.y + 10));
    //   this.ctx.lineTo(this.rotateX(this.x + 5), this.rotateY(this.y));
    //   this.ctx.lineTo(this.rotateX(this.x - 5), this.rotateY(this.y));
    //   this.ctx.fill();
    // }

  }, {
    key: 'rotatePlayer',
    value: function rotatePlayer() {
      this.ctx.save();
      this.ctx.translate(this.drawPoint.x, this.drawPoint.y);
      this.ctx.rotate(this.outerAngle);
      this.ctx.restore();
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var arrow = ARROW_MAP[e.keyCode];

      if (arrow === 'left') this.outerAngle += this.speed;
      if (arrow === 'right') this.outerAngle -= this.speed;
      this.drawPoint = this.computeDrawPoint();
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map