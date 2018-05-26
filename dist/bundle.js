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

/***/ "./scripts/bullet.js":
/*!***************************!*\
  !*** ./scripts/bullet.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BulletPool = exports.BulletPool = function () {
  function BulletPool(size) {
    _classCallCheck(this, BulletPool);

    this.size = size;
    this.pool = [];

    for (var i = 0; i < size; i++) {
      var bullet = new Bullet();
      this.pool.push(bullet);
    }
  }

  _createClass(BulletPool, [{
    key: "get",
    value: function get() {
      if (!this.pool[this.size - 1].spawned) {
        this.pool[this.size - 1].spawn(x, y, speed);
        this.pool.unshift(this.pool.pop());
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      for (var i = 0; i < this.size; i++) {
        if (this.pool[i].spawned && this.pool[i].draw) {
          this.pool[i].clear();
          this.pool.push(this.pool.splice(i, 1)[0]);
        } else {
          break;
        }
      }
    }
  }]);

  return BulletPool;
}();

;

var Bullet = exports.Bullet = function () {
  function Bullet() {
    _classCallCheck(this, Bullet);

    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.spawned = false;
    this.height = 20;
    this.width = 20;
  }

  _createClass(Bullet, [{
    key: "spawn",
    value: function spawn(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.spawned = true;
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.clearRect(this.x, this.y, this.width, this.height);
      this.y -= this.speed;
      this.x -= this.speed;
      if (this.y <= 0 - this.height) {
        return true;
      } else {
        context.drawImage(imageStore.bullet, this.x, this.y);
      };
    }
  }]);

  return Bullet;
}();

;

/***/ }),

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

var _bullet = __webpack_require__(/*! ./bullet */ "./scripts/bullet.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
  function Field(bgCanvas, pcCanvas) {
    _classCallCheck(this, Field);

    this.bgWidth = 800;
    this.bgHeight = 500;
    this.pcWidth = 100;
    this.pcHeight = 100;

    bgCanvas.width = this.bgWidth;
    bgCanvas.height = this.bgHeight;
    pcCanvas.width = this.pcWidth;
    pcCanvas.height = this.pcHeight;

    this.bgContext = bgCanvas.getContext("2d");
    this.pcContext = pcCanvas.getContext("2d");

    this.player = new _player2.default(this.pcContext, this.pcWidth, this.pcHeight);
    this.BulletPool = new _bullet.BulletPool(5);
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
    this.render = this.render.bind(this);

    console.log(this.BulletPool);
  }

  _createClass(Field, [{
    key: 'drawFieldBorder',
    value: function drawFieldBorder() {
      this.bgContext.beginPath();
      this.bgContext.lineWidth = 1;
      this.bgContext.rect(0, 0, this.bgWidth, this.bgHeight);
      this.bgContext.strokeStyle = 'black';
      this.bgContext.stroke();
    }
  }, {
    key: 'drawPlayerRails',
    value: function drawPlayerRails(shape) {
      var xCenter = this.pcWidth / 2;
      var yCenter = this.pcHeight / 2;

      switch (shape) {
        case 'circle':
        default:
          this.pcContext.beginPath();
          this.pcContext.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
          this.pcContext.strokeStyle = "black";
          this.pcContext.lineWidth = 2;
          this.pcContext.stroke();
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
      this.clearBGContext();
      this.clearPCContext();
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
    key: 'clearBGContext',
    value: function clearBGContext() {
      this.bgContext.clearRect(0, 0, this.bgWidth, this.bgHeight);
    }
  }, {
    key: 'clearPCContext',
    value: function clearPCContext() {
      this.pcContext.clearRect(0, 0, this.pcWidth, this.pcHeight);
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

var startGame = function startGame(backgroundCanvas, playerCanvas) {
  var field = new _field2.default(backgroundCanvas, playerCanvas);

  field.playRound();
};

document.addEventListener("DOMContentLoaded", function () {
  var backgroundCanvas = document.getElementById("backgroundCanvas");
  var playerCanvas = document.getElementById("playerCanvas");
  startGame(backgroundCanvas, playerCanvas);
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

var KEY_MAP = {
  74: 'left', // j
  76: 'right', // l
  68: 'right', // d
  65: 'left', // a
  39: 'right', // left arrow
  37: 'left', // right arrow
  32: 'fire' // space bar
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
    this.radius = 30; // The 'track' the player moves along
    this.starboardTheta = 1.7359;
    this.starboardVertex = this.computeStarboardVertex();
    this.portTheta = -1.4056;
    this.portVertex = this.computePortVertex();
    this.bowTheta = Math.PI / 2;
    this.bowVertex = this.computeBowVertex();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.draw = this.draw.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
  }

  _createClass(Player, [{
    key: 'computeStarboardVertex',
    value: function computeStarboardVertex() {
      return {
        x: Math.cos(this.starboardTheta) * this.radius + this.fieldWidth / 2,
        y: -Math.sin(this.starboardTheta) * this.radius + this.fieldHeight / 2
      };
    }
  }, {
    key: 'computePortVertex',
    value: function computePortVertex() {
      return {
        x: Math.cos(this.portTheta) * this.radius + this.fieldWidth / 2,
        y: Math.sin(this.portTheta) * this.radius + this.fieldHeight / 2
      };
    }
  }, {
    key: 'computeBowVertex',
    value: function computeBowVertex() {
      return {
        x: Math.cos(this.bowTheta) * -20 + this.fieldWidth / 2,
        y: Math.sin(this.bowTheta) * -20 + this.fieldHeight / 2
      };
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
      this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
      this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
      this.ctx.strokeStyle = 'black';
      this.ctx.fill();
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var arrow = KEY_MAP[e.keyCode];
      if (arrow === 'left') {
        this.starboardTheta += this.speed;
        this.portTheta -= this.speed;
        this.bowTheta -= this.speed;
      }

      if (arrow === 'right') {
        this.starboardTheta -= this.speed;
        this.portTheta += this.speed;
        this.bowTheta += this.speed;
      }

      this.starboardVertex = this.computeStarboardVertex();
      this.portVertex = this.computePortVertex();
      this.bowVertex = this.computeBowVertex();
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map