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

/***/ "./scripts/baddie.js":
/*!***************************!*\
  !*** ./scripts/baddie.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaddiePool = function (_ObjectPool) {
  _inherits(BaddiePool, _ObjectPool);

  function BaddiePool(size, context) {
    _classCallCheck(this, BaddiePool);

    var _this = _possibleConstructorReturn(this, (BaddiePool.__proto__ || Object.getPrototypeOf(BaddiePool)).call(this, size, context));

    for (var i = 0; i < size; i++) {
      var baddie = new Baddie('demon');
      _this.pool.push(baddie);
    }
    return _this;
  }

  return BaddiePool;
}(_utilities.ObjectPool);

exports.default = BaddiePool;

var Baddie = function () {
  function Baddie(type) {
    _classCallCheck(this, Baddie);

    this.type = type;
    this.setDefaultValues();
  }

  _createClass(Baddie, [{
    key: 'spawn',
    value: function spawn(x, y, radius) {}
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues() {
      this.chanceToFire = 0.01;
      this.spawned = false;
    }
  }]);

  return Baddie;
}();

/***/ }),

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

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BulletPool = function (_ObjectPool) {
  _inherits(BulletPool, _ObjectPool);

  function BulletPool(size, context) {
    _classCallCheck(this, BulletPool);

    var _this = _possibleConstructorReturn(this, (BulletPool.__proto__ || Object.getPrototypeOf(BulletPool)).call(this, size, context));

    for (var i = 0; i < size; i++) {
      var bullet = new Bullet('playerBullet');
      _this.pool.push(bullet);
    }
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;

var Bullet = function () {
  function Bullet(type) {
    _classCallCheck(this, Bullet);

    this.type = type;
    this.setDefaultValues();
  }

  _createClass(Bullet, [{
    key: 'spawn',
    value: function spawn(theta, speed) {
      this.pathAngle = theta;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);
      this.speed = speed;
      this.spawned = true;
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      // context.clearRect(this.x, this.y, this.width, this.height); optimize later
      this.startRadius -= this.speed;
      this.endRadius -= this.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);

      if ((this.startPoint.y > -1 || this.endPoint.y > -1) && (this.startPoint.y < 501 || this.endPoint.y < 501) && (this.startPoint.x > -1 || this.endPoint.x > -1) && (this.startPoint.x < 801 || this.endPoint.x < 801)) {
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(this.startPoint.x, this.startPoint.y);
        context.lineTo(this.endPoint.x, this.endPoint.y);
        context.stroke();
      } else {
        return true;
      };
    }
  }, {
    key: 'computePoint',
    value: function computePoint(offset) {
      return {
        x: Math.cos(this.pathAngle) * -offset + this.xOffset,
        y: Math.sin(this.pathAngle) * -offset + this.yOffset
      };
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues() {
      if (this.type === 'playerBullet') {
        this.startRadius = 18;
        this.endRadius = 8;
        this.xOffset = 400;
        this.yOffset = 250;
      } else {
        this.startRadius = 0;
        this.endRadius = 0;
        this.xOffset = 0;
        this.yOffset = 0;
      }

      this.pathAngle = 0;
      this.startPoint = { x: 0, y: 0 };
      this.endPoint = { x: 0, y: 0 };
      this.speed = 0;
      this.spawned = false;
      // this.height = 10;
      // this.width = 10;
    }
  }]);

  return Bullet;
}();

;

// Bullet.prototype = new Drawable();

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

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _baddie = __webpack_require__(/*! ./baddie */ "./scripts/baddie.js");

var _baddie2 = _interopRequireDefault(_baddie);

var _bullet = __webpack_require__(/*! ./bullet */ "./scripts/bullet.js");

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var KEY_STATUS = {};
for (var code in KEY_MAP) {
  KEY_STATUS[KEY_MAP[code]] = false;
}

var Field = function () {
  function Field(fgCanvas, pcCanvas) {
    _classCallCheck(this, Field);

    this.fgWidth = 800;
    this.fgHeight = 500;
    this.pcWidth = 100;
    this.pcHeight = 100;

    fgCanvas.width = this.fgWidth;
    fgCanvas.height = this.fgHeight;
    pcCanvas.width = this.pcWidth;
    pcCanvas.height = this.pcHeight;

    this.fgContext = fgCanvas.getContext("2d");
    this.pcContext = pcCanvas.getContext("2d");

    this.ImageStore = new _utilities.ImageStore();
    this.BaddiePool = new _baddie2.default(5, this.fgContext);
    this.pcBulletPool = new _bullet2.default(5, this.fgContext);
    this.player = new _player2.default(this.pcContext, this.pcWidth, this.pcHeight, this.pcBulletPool);
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
    this.render = this.render.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  _createClass(Field, [{
    key: 'drawFieldBorder',
    value: function drawFieldBorder() {
      this.fgContext.beginPath();
      this.fgContext.lineWidth = 1;
      this.fgContext.rect(0, 0, this.fgWidth, this.fgHeight);
      this.fgContext.strokeStyle = 'black';
      this.fgContext.stroke();

      this.pcContext.beginPath();
      this.pcContext.lineWidth = 1;
      this.pcContext.rect(0, 0, this.pcWidth, this.pcHeight);
      this.pcContext.strokeStyle = 'black';
      this.pcContext.stroke();
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
      this.clearFGContext();
      this.clearPCContext();
      this.drawFieldBorder();
      this.drawPlayerRails('circle');
      this.drawPlayer();
      this.pcBulletPool.draw();
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var keyCode = e.which || e.keyCode || 0;
      if (KEY_MAP[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_MAP[keyCode]] = true;
      }
    }
  }, {
    key: 'keyup',
    value: function keyup(e) {
      var keyCode = e.which || e.keyCode || 0;
      if (KEY_MAP[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_MAP[keyCode]] = false;
      }
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer() {
      this.player.move(KEY_STATUS);
      this.player.draw();
    }
  }, {
    key: 'clearFGContext',
    value: function clearFGContext() {
      this.fgContext.clearRect(0, 0, this.fgWidth, this.fgHeight);
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

var startGame = function startGame(foregroundCanvas, playerCanvas) {
  var field = new _field2.default(foregroundCanvas, playerCanvas);

  field.playRound();
};

document.addEventListener("DOMContentLoaded", function () {
  var foregroundCanvas = document.getElementById("foregroundCanvas");
  var playerCanvas = document.getElementById("playerCanvas");
  startGame(foregroundCanvas, playerCanvas);
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

var Player = function () {
  function Player(ctx, fieldWidth, fieldHeight, BulletPool) {
    _classCallCheck(this, Player);

    this.ctx = ctx;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.BulletPool = BulletPool;

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

    this.draw = this.draw.bind(this);
    this.fire = this.fire.bind(this);
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
    key: 'move',
    value: function move(keyStatus) {
      if (keyStatus.left) {
        this.starboardTheta += this.speed;
        this.portTheta -= this.speed;
        this.bowTheta -= this.speed;
      } else if (keyStatus.right) {
        this.starboardTheta -= this.speed;
        this.portTheta += this.speed;
        this.bowTheta += this.speed;
      }

      if (keyStatus.fire) this.fire();
    }
  }, {
    key: 'fire',
    value: function fire() {
      var bulletSpeed = 2;
      this.BulletPool.get(this.bowTheta, bulletSpeed);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.starboardVertex = this.computeStarboardVertex();
      this.portVertex = this.computePortVertex();
      this.bowVertex = this.computeBowVertex();

      this.ctx.beginPath();
      this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
      this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
      this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
      this.ctx.strokeStyle = 'black';
      this.ctx.fill();
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./scripts/utilities.js":
/*!******************************!*\
  !*** ./scripts/utilities.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectPool = exports.ObjectPool = function () {
  function ObjectPool(size, context, ImageStore) {
    _classCallCheck(this, ObjectPool);

    this.size = size;
    this.context = context;
    this.ImageStore = ImageStore;
    this.pool = [];
  }

  _createClass(ObjectPool, [{
    key: 'get',
    value: function get(theta, speed) {
      if (!this.pool[this.size - 1].spawned) {
        this.pool[this.size - 1].spawn(theta, speed);
        this.pool.unshift(this.pool.pop());
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      for (var i = 0; i < this.size; i++) {
        if (this.pool[i].spawned) {
          if (this.pool[i].draw(this.context, this.ImageStore)) {
            this.pool[i].setDefaultValues();
            this.pool.push(this.pool.splice(i, 1)[0]);
          }
        } else {
          break;
        }
      }
    }
  }]);

  return ObjectPool;
}();

;

var Drawable = exports.Drawable = function Drawable(x, y, width, height) {
  _classCallCheck(this, Drawable);

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

var ImageStore = exports.ImageStore = function ImageStore() {
  _classCallCheck(this, ImageStore);

  this.bulletSheet = new Image();
  this.demonSheet = new Image();
  // this.numImages = 2;
  // this.numLoaded = 0;
  //
  // this.bullet.onload = () => {
  //   this.imageLoaded();
  // }

  this.bulletSheet.src = 'assets/sprites/bullet.png';
  this.demonSheet.src = 'assets/sprites/demon_sheet.png';
}

// imageLoaded() {
//   this.numLoaded++;
//   if(this.numLoaded === this.numImages) game.playRound();
// }
;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map