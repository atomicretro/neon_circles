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

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BulletPool = function (_ObjectPool) {
  _inherits(BulletPool, _ObjectPool);

  function BulletPool(size, fgCanvas, type) {
    _classCallCheck(this, BulletPool);

    var _this = _possibleConstructorReturn(this, (BulletPool.__proto__ || Object.getPrototypeOf(BulletPool)).call(this, size));

    for (var i = 0; i < size; i++) {
      var bullet = new Bullet(fgCanvas, type);
      _this.pool.push(bullet);
    };
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;
;

var Bullet = function () {
  function Bullet(fgCanvas, type) {
    _classCallCheck(this, Bullet);

    this.ctx = fgCanvas.ctx;
    this.ctxWidth = fgCanvas.width;
    this.ctxHeight = fgCanvas.height;
    this.resetX = fgCanvas.width + 5;
    this.resetY = fgCanvas.height + 5;
    this.setDefaultValues(type);
  }

  _createClass(Bullet, [{
    key: 'spawn',
    value: function spawn(bulletData) {
      this.pathAngle = bulletData.theta;
      this.startRadius = bulletData.startRadius;
      this.endRadius = bulletData.endRadius;
      this.speed = bulletData.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);
      this.spawned = true;
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.startRadius -= this.speed;
      this.endRadius -= this.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);

      this.clear();
    }
  }, {
    key: 'resetable',
    value: function resetable() {
      if ((this.startPoint.y > -5 || this.endPoint.y > -5) && (this.startPoint.y < this.resetY || this.endPoint.y < this.resetY) && (this.startPoint.x > -5 || this.endPoint.x > -5) && (this.startPoint.x < this.resetX || this.endPoint.x < this.resetX)) {
        return false;
      } else {
        return true;
      };
    }
  }, {
    key: 'clear',
    value: function clear() {
      var startX = void 0;
      var startY = void 0;

      if (this.startPoint.x > this.endPoint.x) {
        startX = this.endPoint.x;
      } else {
        startX = this.startPoint.x;
      }
      if (this.startPoint.y > this.endPoint.y) {
        startY = this.endPoint.y;
      } else {
        startY = this.startPoint.y;
      }

      this.ctx.clearRect(startX, startY, 16, 16);
    }
  }, {
    key: 'computePoint',
    value: function computePoint(radius) {
      // create a computeOffset funciton that works on a half circle tilted 45degrees
      // when pc is on top left of circle drawpoint needs to be in topleft;
      // when pc is on bottom right of circle drawpoint needs to be in *topleft*
      return {
        x: Math.cos(this.pathAngle) * -radius + this.xOffset - 5,
        y: Math.sin(this.pathAngle) * -radius + this.yOffset - 5
      };
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues(type) {
      this.xOffset = this.ctxWidth / 2;
      this.yOffset = this.ctxHeight / 2;
      this.pathAngle = 0;
      this.startPoint = { x: 0, y: 0 };
      this.endPoint = { x: 0, y: 0 };
      this.speed = 0;
      this.spawned = false;
    }
  }]);

  return Bullet;
}();

;

/***/ }),

/***/ "./scripts/demon.js":
/*!**************************!*\
  !*** ./scripts/demon.js ***!
  \**************************/
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

var getRandNum = function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var DemonPool = function (_ObjectPool) {
  _inherits(DemonPool, _ObjectPool);

  function DemonPool(demons, ctx, AssetStore, BulletPool) {
    _classCallCheck(this, DemonPool);

    var _this = _possibleConstructorReturn(this, (DemonPool.__proto__ || Object.getPrototypeOf(DemonPool)).call(this, demons.length, ctx));

    _this.BulletPool = BulletPool;

    for (var i = 0; i < demons.length; i++) {
      var demon = new Demon(ctx, demons[i], AssetStore);
      _this.pool.push(demon);
    }
    return _this;
  }

  return DemonPool;
}(_utilities.ObjectPool);

exports.default = DemonPool;
;

var Demon = function () {
  function Demon(ctx, type, AssetStore) {
    _classCallCheck(this, Demon);

    this.ctx = ctx;
    this.type = type;

    var storedAsset = AssetStore[type];
    this.image = storedAsset.image;
    this.width = storedAsset.width;
    this.height = storedAsset.height;
    this.sprite = new _utilities.Sprite(ctx, storedAsset.image, this.width, this.height, storedAsset.srcX, storedAsset.srcY);
    this.setDefaultValues();
  }

  _createClass(Demon, [{
    key: 'spawn',
    value: function spawn() {
      this.drawPoint = this.computeDrawPoint();
      this.spawned = true;
    }
  }, {
    key: 'draw',
    value: function draw(BulletPool) {
      if (this.type === 'faceDemon') {
        if (this.radius > this.endRadius) {
          this.radius -= Math.abs(this.speed * 100);
        } else {
          this.speed = this.endSpeed;
        }
      };

      this.invincibilityFrames++;
      this.theta -= this.speed;
      this.drawPoint = this.computeDrawPoint();

      if (this.type === 'faceDemon' && this.invincibilityFrames < 50) {
        this.hurtSprite.draw(this.drawPoint.x, this.drawPoint.y);
      } else {
        this.sprite.draw(this.drawPoint.x, this.drawPoint.y);
      }

      this.chanceToFire = Math.floor(Math.random() * 101);
      if (this.chanceToFire / 100 < this.fireThreshold) {
        this.fire(BulletPool);
      }
    }
  }, {
    key: 'resetable',
    value: function resetable() {
      if (this.life <= 0) return true;
      return false;
    }
  }, {
    key: 'computeDrawPoint',
    value: function computeDrawPoint() {
      return {
        x: Math.cos(this.theta) * -this.radius + 390,
        y: Math.sin(this.theta) * -this.radius + 232
      };
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(this.drawPoint.x - 5, this.drawPoint.y - 5, this.width + 10, this.height + 10);
    }
  }, {
    key: 'fire',
    value: function fire(BulletPool) {
      var bulletData = {
        theta: this.theta,
        startRadius: this.radius,
        endRadius: this.radius - 20,
        speed: 4,
        startPoint: {
          x: this.drawPoint.x + this.width / 2,
          y: this.drawPoint.y + this.height / 2
        }
      };
      BulletPool.get(bulletData);
    }
  }, {
    key: 'isHit',
    value: function isHit() {
      this.life -= 1;
      this.invincibilityFrames = 0;
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues() {
      var thetaMultiplier = Math.random() < 0.5 ? -1 : 1;
      var speedMultiplier = Math.random() < 0.5 ? -1 : 1;

      if (this.type === 'mouthDemon' || this.type === 'eyeDemon') {
        this.theta = Math.PI / 2 * thetaMultiplier;
        this.speed = getRandNum(4, 7) / 1000 * speedMultiplier;
        this.radius = getRandNum(265, 380); // The 'track' the demon moves along
        this.life = 1;
        this.fireThreshold = 0.01;
      } else if (this.type === 'faceDemon') {
        this.theta = Math.PI / 2 * thetaMultiplier;
        this.speed = getRandNum(6, 9) / 1000 * speedMultiplier;
        this.endSpeed = this.speed * 2;
        this.radius = 400;
        this.endRadius = getRandNum(125, 225);
        this.life = 2;
        this.fireThreshold = 0.02;
        this.hurtSprite = new _utilities.Sprite(this.ctx, this.image, this.width, this.height, 31, 0);
      } else if (this.type === 'bossDemon') {
        this.speed = 0.4;
      }
      this.invincibilityFrames = 50;
      this.chanceToFire = 0;
      this.spawned = false;
      this.drawPoint = { x: 400, y: 250 };
    }
  }]);

  return Demon;
}();

;

// class MouthDemon extends Demon {
//   constructor(ctx, type, AssetStore) {
//     super(ctx, type, AssetStore);
//   }
// };

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

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {
  function Field(fgCanvasObj, statsCanvasObj, pcCanvasObj, optsCanvasObj, AssetStore, demonBulletPool, pcBulletPool, lvl1DemonPool, lvl2DemonPool, player, movementDirection, gameStatus, mobileCanvasObj) {
    _classCallCheck(this, Field);

    this.fgCanvas = fgCanvasObj;
    this.statsCanvas = statsCanvasObj;
    this.pcCanvas = pcCanvasObj;
    this.optsCanvas = optsCanvasObj;
    this.mobileCanvas = mobileCanvasObj;

    this.AssetStore = AssetStore;
    this.demonBulletPool = demonBulletPool;
    this.pcBulletPool = pcBulletPool;
    this.lvl1DemonPool = lvl1DemonPool;
    this.lvl2DemonPool = lvl2DemonPool;

    this.player = player;
    this.movementDirection = movementDirection;
    this.gameStatus = gameStatus;

    this.lastTime = Date.now;
    this.playerScore = 0;
    this.heart = new _utilities.Sprite(this.statsCanvas.ctx, this.AssetStore.heart.image, 13, 13, 0, 0);
  }

  _createClass(Field, [{
    key: 'updateMovementDirection',
    value: function updateMovementDirection(newDirection) {
      this.movementDirection = newDirection;
    }
  }, {
    key: 'updateGameStatus',
    value: function updateGameStatus(gameStatus) {
      this.gameStatus = gameStatus;
    }
  }, {
    key: 'drawStartScreen',
    value: function drawStartScreen() {
      this.optsCanvas.canvas.classList.remove('hidden');
      this.clearOptsContext();
      this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
      this.optsCanvas.ctx.fillRect(0, 0, 800, 500);

      this.optsCanvas.ctx.fillStyle = 'white';

      this.drawStartScreenMessage();
      if (this.mobileCanvas == null) this.drawControls();else this.drawMobileControls();

      // for checking centeredness of start screen items
      // this.optsCanvas.ctx.beginPath();
      // this.optsCanvas.ctx.moveTo(20,410);
      // this.optsCanvas.ctx.lineTo(20,490);
      // this.optsCanvas.ctx.stroke();
      // this.optsCanvas.ctx.beginPath();
      // this.optsCanvas.ctx.moveTo(170,410);
      // this.optsCanvas.ctx.lineTo(170,490);
      // this.optsCanvas.ctx.stroke();

      this.optsCanvas.ctx.strokeRect(300, 385, 205, 87);
      this.optsCanvas.ctx.font = "60px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("PLAY", 320, 450);
    }
  }, {
    key: 'drawStartScreenMessage',
    value: function drawStartScreenMessage() {
      if (this.gameStatus === 'over') {
        this.optsCanvas.ctx.font = "36px sf_alien_encountersitalic";
        this.optsCanvas.ctx.fillText("GAME OVER", 285, 70);
        this.optsCanvas.ctx.font = "22px sf_alien_encountersitalic";
        this.optsCanvas.ctx.fillText("fight! fight! don't let demons win!", 176, 105);
      } else {
        this.optsCanvas.ctx.font = "36px sf_alien_encountersitalic";
        this.optsCanvas.ctx.fillText("SHOOT ALL DEMONS", 207, 70);
        this.optsCanvas.ctx.font = "22px sf_alien_encountersitalic";
        this.optsCanvas.ctx.fillText("careful! demon power is strong!", 182, 105);
      }
    }
  }, {
    key: 'drawControls',
    value: function drawControls() {
      var cw = void 0; // clockwise
      var ccw = void 0; // counterclockwise
      if (this.movementDirection === 'standard') {
        ccw = { descX: 70, circleX: 160 };
        cw = { descX: 590, circleX: -640 };
      } else {
        ccw = { descX: 545, circleX: 640 };
        cw = { descX: 109, circleX: -160 };
      };

      this.drawSwapMovementButton();

      this.optsCanvas.ctx.strokeStyle = "white";

      this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("counterclockwise", ccw.descX, 250);
      this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("a   j   left", 90, 280);

      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.arc(ccw.circleX, 190, 30, Math.PI / 2, Math.PI, true);
      this.optsCanvas.ctx.lineWidth = 2;
      this.optsCanvas.ctx.stroke();
      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.moveTo(Math.abs(ccw.circleX - 30), 190);
      this.optsCanvas.ctx.lineTo(Math.abs(ccw.circleX - 20), 180);
      this.optsCanvas.ctx.stroke();
      this.optsCanvas.ctx.moveTo(Math.abs(ccw.circleX - 30), 190);
      this.optsCanvas.ctx.lineTo(Math.abs(ccw.circleX - 35), 175);
      this.optsCanvas.ctx.stroke();

      this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("clockwise", cw.descX, 250);
      this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("d   l   right", 566, 280);

      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.arc(Math.abs(cw.circleX), 190, 30, Math.PI / 2, 0, false);
      this.optsCanvas.ctx.lineWidth = 2;
      this.optsCanvas.ctx.stroke();
      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.moveTo(Math.abs(cw.circleX - 30), 190);
      this.optsCanvas.ctx.lineTo(Math.abs(cw.circleX - 20), 180);
      this.optsCanvas.ctx.stroke();
      this.optsCanvas.ctx.moveTo(Math.abs(cw.circleX - 30), 190);
      this.optsCanvas.ctx.lineTo(Math.abs(cw.circleX - 35), 175);
      this.optsCanvas.ctx.stroke();

      this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("SPACE TO FIRE WHEN POWER IS FULL!", 148, 340);
      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.moveTo(148, 347);
      this.optsCanvas.ctx.lineTo(650, 347);
      this.optsCanvas.ctx.stroke();

      this.drawGamePadToggleButton();

      this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("m to mute!", 705, 440);
      this.optsCanvas.ctx.fillText("p to pause!", 700, 460);
      if (this.gameStatus !== 'playing') {
        this.optsCanvas.ctx.fillText("enter to start!", 670, 480);
      }
    }
  }, {
    key: 'drawMobileControls',
    value: function drawMobileControls() {
      var cw = void 0; // clockwise
      var ccw = void 0; // counterclockwise
      if (this.movementDirection === 'standard') {
        ccw = { descX: 70, circleX: 160 };
        cw = { descX: 590, circleX: -640 };
      } else {
        ccw = { descX: 545, circleX: 640 };
        cw = { descX: 109, circleX: -160 };
      };

      this.drawSwapMovementButton();

      this.optsCanvas.ctx.strokeStyle = "white";

      this.optsCanvas.ctx.font = "42px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("FIRE!", 46, 265);
      this.optsCanvas.ctx.fillText("FIRE!", 650, 265);

      this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("counterclockwise", ccw.descX, 280);

      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.arc(ccw.circleX, 190, 30, Math.PI / 2, Math.PI, true);
      this.optsCanvas.ctx.lineWidth = 2;
      this.optsCanvas.ctx.stroke();
      this.optsCanvas.ctx.beginPath();
      this.optsCanvas.ctx.moveTo(Math.abs(ccw.circleX - 30), 190);
      this.optsCanvas.ctx.lineTo(Math.abs(ccw.circleX - 20), 180);
      this.optsCanvas.ctx.stroke();
      this.optsCanvas.ctx.moveTo(Math.abs(ccw.circleX - 30), 190);
      this.optsCanvas.ctx.lineTo(Math.abs(ccw.circleX - 35), 175);
      this.optsCanvas.ctx.stroke();

      this.optsCanvas.ctx.strokeStyle = "red";
      this.optsCanvas.ctx.strokeRect(0, 400, 200, 100);
      this.optsCanvas.ctx.strokeRect(0, 300, 200, 100);
      this.optsCanvas.ctx.strokeRect(0, 200, 200, 100);
      this.optsCanvas.ctx.strokeRect(600, 400, 200, 100);
      this.optsCanvas.ctx.strokeRect(600, 300, 200, 100);
      this.optsCanvas.ctx.strokeRect(600, 200, 200, 100);
    }
  }, {
    key: 'drawSwapMovementButton',
    value: function drawSwapMovementButton() {
      this.optsCanvas.ctx.strokeStyle = "white";
      this.optsCanvas.ctx.strokeRect(240, 165, 320, 35);
      this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("swap movement direction", 250, 190);
    }
  }, {
    key: 'drawGamePadToggleButton',
    value: function drawGamePadToggleButton() {
      if (this.gamePadConnected) {
        this.optsCanvas.ctx.clearRect(20, 410, 150, 80);
        this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
        this.optsCanvas.ctx.fillRect(20, 410, 150, 80);
        this.optsCanvas.ctx.fillStyle = "white";
        this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
        if (this.gamePadToggle) this.optsCanvas.ctx.fillText("gamepad", 33, 435);else this.optsCanvas.ctx.fillText("keyboard", 27, 435);
        this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
        this.optsCanvas.ctx.fillText("click here to toggle", 20, 460);
        this.optsCanvas.ctx.fillText("gamepad input!", 20, 480);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      this.undrawFGContext();
      this.clearPCContext();
      this.updatePlayerCharge();
      this.drawPlayerRails('circle');
      this.player.draw();
      this.lvl1DemonPool.draw();
      this.lvl2DemonPool.draw();
      this.pcBulletPool.draw('player');
      this.demonBulletPool.draw();
    }
  }, {
    key: 'drawStatusBar',
    value: function drawStatusBar() {
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(0, 0, this.statsCanvas.width, this.statsCanvas.height);

      // Charge container
      this.statsCanvas.ctx.strokeStyle = '#6816e0';
      this.statsCanvas.ctx.strokeRect(352, 30, 97, 13);

      // Player life
      this.drawPlayerHearts();

      this.statsCanvas.ctx.fillStyle = 'black';
      this.statsCanvas.ctx.strokeStyle = 'black';

      // Titles
      this.statsCanvas.ctx.font = "22px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("SCORE", 49, 21);
      this.statsCanvas.ctx.font = "22px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("LIFE", 204, 21);
      this.statsCanvas.ctx.font = "22px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("POWER", 351, 21);

      // Player score
      this.statsCanvas.ctx.font = "20px Courier";
      this.statsCanvas.ctx.fillText("0", 50, 43);

      // Mute / unmute button
      this.statsCanvas.ctx.lineWidth = 2;
      this.statsCanvas.ctx.strokeRect(530, 10, 100, 30);
      this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("MUTE", 550, 32);

      // Pause button
      this.statsCanvas.ctx.lineWidth = 2;
      this.statsCanvas.ctx.strokeRect(650, 10, 100, 30);
      this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("PAUSE", 665, 32);
    }
  }, {
    key: 'drawPlayerHearts',
    value: function drawPlayerHearts() {
      this.statsCanvas.ctx.clearRect(200, 20, 140, 40);
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(200, 20, 140, 40);
      for (var i = 0; i < this.player.life; i++) {
        this.heart.draw(205 + i * 20, 30);
      }
    }
  }, {
    key: 'updatePlayerScore',
    value: function updatePlayerScore(demon) {
      if (demon === 'mouthDemon' || demon === 'eyeDemon') this.playerScore += 100;else if (demon === 'faceDemon') this.playerScore += 150;
      this.statsCanvas.ctx.clearRect(45, 20, 150, 40);
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(45, 20, 150, 40);
      this.statsCanvas.ctx.fillStyle = 'black';
      this.statsCanvas.ctx.font = "20px Courier";
      this.statsCanvas.ctx.fillText('' + this.playerScore, 50, 43);
    }
  }, {
    key: 'updatePlayerCharge',
    value: function updatePlayerCharge() {
      if (this.player.fireCharge === 0) {
        this.statsCanvas.ctx.clearRect(353, 31, 95, 11);
        this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
        this.statsCanvas.ctx.fillRect(353, 31, 95, 11);
      } else if (this.player.fireCharge < 20) {
        this.statsCanvas.ctx.fillStyle = '#6816e0';
        this.statsCanvas.ctx.fillRect(353, 31, this.player.fireCharge * 5, 11);
      }
    }
  }, {
    key: 'updateMuteButton',
    value: function updateMuteButton(muted) {
      this.statsCanvas.ctx.clearRect(532, 12, 96, 26);
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(532, 12, 96, 26);
      if (muted === true) {
        this.statsCanvas.ctx.fillStyle = 'black';
        this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
        this.statsCanvas.ctx.fillText("UNMUTE", 537, 32);
      } else {
        this.statsCanvas.ctx.fillStyle = 'black';
        this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
        this.statsCanvas.ctx.fillText("MUTE", 550, 32);
      }
    }
  }, {
    key: 'drawPlayerRails',
    value: function drawPlayerRails(shape) {
      var xCenter = this.pcCanvas.width / 2;
      var yCenter = this.pcCanvas.height / 2;
      if (this.player.fireCharge < 20) {
        this.pcCanvas.ctx.strokeStyle = "white";
      } else {
        this.pcCanvas.ctx.strokeStyle = "#6816e0";
      }

      switch (shape) {
        case 'circle':
        default:
          this.pcCanvas.ctx.beginPath();
          this.pcCanvas.ctx.arc(xCenter, yCenter, 60, 0, 2 * Math.PI, true);
          this.pcCanvas.ctx.lineWidth = 2;
          this.pcCanvas.ctx.stroke();
      }
    }
  }, {
    key: 'undrawFGContext',
    value: function undrawFGContext() {
      this.fgCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.1";
      this.fgCanvas.ctx.fillRect(0, 0, 800, 500);
    }
  }, {
    key: 'clearFGContext',
    value: function clearFGContext() {
      this.fgCanvas.ctx.clearRect(0, 0, this.fgCanvas.width, this.fgCanvas.height);
    }
  }, {
    key: 'clearStatsContext',
    value: function clearStatsContext() {
      this.statsCanvas.ctx.clearRect(0, 0, this.statsCanvas.width, this.statsCanvas.height);
    }
  }, {
    key: 'clearPCContext',
    value: function clearPCContext() {
      this.pcCanvas.ctx.clearRect(0, 0, this.pcCanvas.width, this.pcCanvas.height);
    }
  }, {
    key: 'clearOptsContext',
    value: function clearOptsContext() {
      this.optsCanvas.ctx.clearRect(0, 0, this.optsCanvas.width, this.optsCanvas.height);
    }
  }, {
    key: 'clearAllContexts',
    value: function clearAllContexts() {
      this.clearFGContext();
      this.clearStatsContext();
      this.clearPCContext();
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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = __webpack_require__(/*! ./field */ "./scripts/field.js");

var _field2 = _interopRequireDefault(_field);

var _player = __webpack_require__(/*! ./player */ "./scripts/player.js");

var _player2 = _interopRequireDefault(_player);

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _demon = __webpack_require__(/*! ./demon */ "./scripts/demon.js");

var _demon2 = _interopRequireDefault(_demon);

var _bullet2 = __webpack_require__(/*! ./bullet */ "./scripts/bullet.js");

var _bullet3 = _interopRequireDefault(_bullet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_MAP = {
  74: 'left', // j
  76: 'right', // l
  68: 'right', // d
  65: 'left', // a
  39: 'right', // left arrow
  37: 'left', // right arrow
  32: 'fire', // space bar
  13: 'start', // enter
  touchLeft: 'left',
  touchRight: 'right',
  touchFire: 'fire'
};

var KEY_STATUS = {};
for (var code in KEY_MAP) {
  KEY_STATUS[KEY_MAP[code]] = false;
}

var Game = function () {
  function Game(fgCanvas, statsCanvas, pcCanvas, optsCanvas, mobileCanvas) {
    _classCallCheck(this, Game);

    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    };
    this.statsCanvas = {
      ctx: statsCanvas.getContext("2d"),
      width: 800,
      height: 50
    };
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 150,
      height: 150
    };
    this.optsCanvas = {
      canvas: optsCanvas,
      ctx: optsCanvas.getContext("2d"),
      width: 800,
      height: 500
    };
    if (mobileCanvas != null) {
      this.mobileCanvas = {
        canvas: mobileCanvas,
        ctx: mobileCanvas.getContext("2d"),
        width: 800,
        height: 500
      };
    };

    this.play = this.play.bind(this);
    this.startRound = this.startRound.bind(this);
    this.optsCanvasCheckClick = this.optsCanvasCheckClick.bind(this);
    this.statsCanvasCheckClick = this.statsCanvasCheckClick.bind(this);

    this.AssetStore = new _utilities.AssetStore(this);

    this.gamePadConnected = false;
    this.gamePadToggle = false;

    this.drawLoadingScreen();
    this.setupEventListners(fgCanvas, statsCanvas, optsCanvas);
    this.setupNewGame();
    this.setupNewField();
  }

  _createClass(Game, [{
    key: 'drawLoadingScreen',
    value: function drawLoadingScreen() {
      this.optsCanvas.ctx.fillStyle = 'black';
      this.optsCanvas.ctx.font = "16px Courier";
      this.optsCanvas.ctx.fillText("Loading...", 50, 50);
    }
  }, {
    key: 'setupEventListners',
    value: function setupEventListners(fgCanvas, statsCanvas, optsCanvas) {
      var _this = this;

      document.addEventListener('keydown', this.keydown.bind(this));
      document.addEventListener('keyup', this.keyup.bind(this));
      optsCanvas.addEventListener('click', function (e) {
        _this.optsCanvasCheckClick(e, optsCanvas.getBoundingClientRect());
      });
      statsCanvas.addEventListener('click', function (e) {
        _this.statsCanvasCheckClick(e, statsCanvas.getBoundingClientRect());
      });

      fgCanvas.addEventListener("touchstart", function (e) {
        _this.handleStart(e, fgCanvas.getBoundingClientRect());
      }, false);
      fgCanvas.addEventListener("touchend", function (e) {
        _this.handleEnd(e, fgCanvas.getBoundingClientRect());
      }, false);
      fgCanvas.addEventListener("touchcancel", this.handleCancel, false);
      // fgCanvas.addEventListener("touchmove", this.handleMove, false);
      this.ongoingTouches = [];

      window.addEventListener("gamepadconnected", function (e) {
        _this.mapGamePadButtons(e);
        _this.gamePadConnected = true;
      });
      window.addEventListener("gamepaddisconnected", function (e) {
        _this.gamePadConnected = false;
        _this.gamePadToggle = false;
      });
    }
  }, {
    key: 'setupNewGame',
    value: function setupNewGame() {
      this.demonBulletPool = new _bullet3.default(3, this.fgCanvas, 'demonBullet');
      this.pcBulletPool = new _bullet3.default(4, this.fgCanvas, 'player');
      this.setupDemonPools();
      this.player = new _player2.default(this.pcCanvas, this.pcBulletPool);
      this.movementDirection = 'standard';
      this.muted = false;
      this.paused = false;
      this.gameStatus = 'unbegun';
    }
  }, {
    key: 'setupDemonPools',
    value: function setupDemonPools() {
      var lvl1Demons = ['mouthDemon', 'mouthDemon', 'mouthDemon', 'eyeDemon', 'eyeDemon', 'eyeDemon'];
      this.lvl1DemonPool = new _demon2.default(lvl1Demons, this.fgCanvas.ctx, this.AssetStore, this.demonBulletPool);

      var lvl2Demons = ['faceDemon', 'faceDemon'];
      this.lvl2DemonPool = new _demon2.default(lvl2Demons, this.fgCanvas.ctx, this.AssetStore, this.demonBulletPool);
    }
  }, {
    key: 'setupNewField',
    value: function setupNewField() {
      this.field = new _field2.default(this.fgCanvas, this.statsCanvas, this.pcCanvas, this.optsCanvas, this.AssetStore, this.demonBulletPool, this.pcBulletPool, this.lvl1DemonPool, this.lvl2DemonPool, this.player, this.movementDirection, this.gameStatus, this.mobileCanvas);
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.field.drawStatusBar();
      this.field.drawStartScreen();
    }
  }, {
    key: 'startRound',
    value: function startRound() {
      var _this2 = this;

      this.AssetStore.backgroundMusic.play();

      this.lvl1Timer = new _utilities.Timer(function () {
        _this2.spawnLvl1Demons();
      }, 5000);
      this.lvl2Timer = new _utilities.Timer(function () {
        _this2.spawnLvl2Demons();
      }, 15000);

      this.field.clearOptsContext();
      this.optsCanvas.canvas.classList.add('hidden');
      this.gameStatus = 'playing';
      this.field.updateGameStatus(this.gameStatus);
      this.startTime = Date.now();
      this.lastTime = Date.now();
      this.play();
    }
  }, {
    key: 'pauseSpawnTimers',
    value: function pauseSpawnTimers() {
      this.lvl1Timer.pause();
      this.lvl2Timer.pause();
    }
  }, {
    key: 'resumeSpawnTimers',
    value: function resumeSpawnTimers() {
      this.lvl1Timer.resume();
      this.lvl2Timer.resume();
    }
  }, {
    key: 'removeSpawnTimers',
    value: function removeSpawnTimers() {
      this.lvl1Timer.clear();
      this.lvl2Timer.clear();
    }
  }, {
    key: 'play',
    value: function play() {
      this.checkGameOver();
      this.checkCollisions();
      if (this.gamePadToggle) this.buttonDown();
      this.player.move(KEY_STATUS);
      if (this.gamePadToggle) this.buttonUp();

      var now = Date.now();
      var dt = (now - this.lastTime) / 1000.0;

      // update(dt);
      this.checkLevel1Demons();
      this.field.render();

      if (!this.paused) {
        this.lastTime = now;
        requestAnimationFrame(this.play);
      }
    }
  }, {
    key: 'checkLevel1Demons',
    value: function checkLevel1Demons() {
      var spawnedLvl1 = 0;
      for (var i = 0; i < this.lvl1DemonPool.pool.length; i++) {
        var demon = this.lvl1DemonPool.pool[i];
        if (demon.type === 'mouthDemon' && demon.spawned) spawnedLvl1++;else if (demon.type === 'eyeDemon' && demon.spawned) spawnedLvl1++;
      }

      if (spawnedLvl1 < 1) {
        this.lvl1DemonPool.get('mouthDemon');
        this.lvl1DemonPool.get('eyeDemon');
      }

      return spawnedLvl1;
    }
  }, {
    key: 'spawnLvl1Demons',
    value: function spawnLvl1Demons() {
      var _this3 = this;

      var maxDemons = this.getMaxDemons('lvl1');
      if (this.checkLevel1Demons() < maxDemons) {
        var toGet = Math.random() < 0.5 ? 'mouthDemon' : 'eyeDemon';
        this.lvl1DemonPool.get(toGet);
      };

      this.lvl1Timer = new _utilities.Timer(function () {
        _this3.spawnLvl1Demons();
      }, 5000);
    }
  }, {
    key: 'spawnLvl2Demons',
    value: function spawnLvl2Demons() {
      var _this4 = this;

      var spawnedLvl2 = 0;
      for (var i = 0; i < this.lvl2DemonPool.pool.length; i++) {
        var demon = this.lvl2DemonPool.pool[i];
        if (demon.type === 'faceDemon' && demon.spawned) spawnedLvl2++;
      };

      var maxDemons = this.getMaxDemons('lvl2');
      if (spawnedLvl2 < maxDemons) this.lvl2DemonPool.get('faceDemon');

      this.lvl2Timer = new _utilities.Timer(function () {
        _this4.spawnLvl2Demons();
      }, 15000);
    }
  }, {
    key: 'getMaxDemons',
    value: function getMaxDemons(level) {
      if (this.lastTime - this.startTime < 40000) {
        if (level === 'lvl1') return 4;
        if (level === 'lvl2') return 1;
      } else {
        if (level === 'lvl1') return 6;
        if (level === 'lvl2') return 2;
      };
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      var spawnedPCBullets = this.pcBulletPool.pool.filter(function (bullet) {
        return bullet.spawned;
      });
      this.checkPlayerCollision(spawnedPCBullets);
      this.checkDemonCollision(spawnedPCBullets);
    }
  }, {
    key: 'checkPlayerCollision',
    value: function checkPlayerCollision(spawnedPCBullets) {
      var spawnedDemonBullets = this.demonBulletPool.pool.filter(function (bullet) {
        return bullet.spawned;
      });

      var hitbox = {
        x: this.player.hitboxCenter.x,
        y: this.player.hitboxCenter.y,
        radius: 12
      };

      for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        var bullet = spawnedPCBullets[bullIdx];
        if ((this.bulletHitsPC(this.player, hitbox, bullet.startPoint) || this.bulletHitsPC(this.player, hitbox, bullet.endPoint)) && this.player.invincibilityFrames > 50) {
          this.player.isHit();
          this.field.drawPlayerHearts();
        };
      }

      for (var _bullIdx = 0; _bullIdx < spawnedDemonBullets.length; _bullIdx++) {
        var _bullet = spawnedDemonBullets[_bullIdx];
        if ((this.bulletHitsPC(this.player, hitbox, _bullet.startPoint) || this.bulletHitsPC(this.player, hitbox, _bullet.endPoint)) && this.player.invincibilityFrames > 50) {
          this.player.isHit();
          this.field.drawPlayerHearts();
        };
      }
    }
  }, {
    key: 'bulletHitsPC',
    value: function bulletHitsPC(player, hitbox, bullet) {
      var newX = hitbox.x - player.pcFieldWidth / 2 + this.fgCanvas.width / 2;
      var newY = hitbox.y - player.pcFieldHeight / 2 + this.fgCanvas.height / 2;
      var distanceFromHitboxToBullet = Math.sqrt(Math.pow(newX - bullet.x, 2) + Math.pow(newY - bullet.y, 2));

      return distanceFromHitboxToBullet <= hitbox.radius;
    }
  }, {
    key: 'checkDemonCollision',
    value: function checkDemonCollision(spawnedPCBullets) {
      var spawnedlvl1Demons = this.lvl1DemonPool.pool.filter(function (demon) {
        return demon.spawned;
      });
      var spawnedlvl2Demons = this.lvl2DemonPool.pool.filter(function (demon) {
        return demon.spawned;
      });

      var spawnedDemons = spawnedlvl1Demons.concat(spawnedlvl2Demons);

      for (var demonIdx = 0; demonIdx < spawnedDemons.length; demonIdx++) {
        var demon = spawnedDemons[demonIdx];
        for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
          var bullet = spawnedPCBullets[bullIdx];
          var drawPoint = demon.drawPoint;
          if ((this.pcBulletHitsDemon(demon, drawPoint, bullet.startPoint) || this.pcBulletHitsDemon(demon, drawPoint, bullet.endPoint)) && demon.invincibilityFrames > 50) {
            this.field.updatePlayerScore(demon.type);
            demon.isHit();
          };
        };
      };
    }
  }, {
    key: 'pcBulletHitsDemon',
    value: function pcBulletHitsDemon(demon, drawPoint, bullet) {
      return drawPoint.x <= bullet.x && bullet.x <= drawPoint.x + demon.width && drawPoint.y <= bullet.y && bullet.y <= drawPoint.y + demon.height;
    }
  }, {
    key: 'checkGameOver',
    value: function checkGameOver() {
      if (this.player.life <= 0) {
        this.paused = true;
        this.removeSpawnTimers();
        this.gameStatus = 'over';
        this.field.updateGameStatus(this.gameStatus);
        this.field.drawStartScreen();
      };
    }
  }, {
    key: 'buttonDown',
    value: function buttonDown() {
      var gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [];

      if (navigator.getGamepads()[0].buttons[14].pressed || navigator.getGamepads()[0].axes[0] < -0.1) {
        KEY_STATUS[KEY_MAP['controllerLeft']] = true;
      }
      if (navigator.getGamepads()[0].buttons[15].pressed || navigator.getGamepads()[0].axes[0] > 0.1) {
        KEY_STATUS[KEY_MAP['controllerRight']] = true;
      };
      if (navigator.getGamepads()[0].buttons[0].pressed || navigator.getGamepads()[0].buttons[1].pressed || navigator.getGamepads()[0].buttons[2].pressed || navigator.getGamepads()[0].buttons[3].pressed || navigator.getGamepads()[0].buttons[4].pressed || navigator.getGamepads()[0].buttons[5].pressed) {
        KEY_STATUS[KEY_MAP['controllerFire']] = true;
      };
    }
  }, {
    key: 'buttonUp',
    value: function buttonUp() {
      var gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [];

      if (!navigator.getGamepads()[0].buttons[14].pressed) {
        KEY_STATUS[KEY_MAP['controllerLeft']] = false;
      }
      if (!navigator.getGamepads()[0].buttons[15].pressed) {
        KEY_STATUS[KEY_MAP['controllerRight']] = false;
      };
      if (!navigator.getGamepads()[0].buttons[0].pressed && !navigator.getGamepads()[0].buttons[1].pressed && !navigator.getGamepads()[0].buttons[2].pressed && !navigator.getGamepads()[0].buttons[3].pressed && !navigator.getGamepads()[0].buttons[4].pressed && !navigator.getGamepads()[0].buttons[5].pressed) {
        KEY_STATUS[KEY_MAP['controllerFire']] = false;
      };
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var keyCode = e.which || e.keyCode || 0;
      if (keyCode === 13 && this.gameStatus !== 'playing') this.newGame();
      if (keyCode === 77) this.clickMute();
      if (keyCode === 80) this.clickPause();
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
    key: 'handleStart',
    value: function handleStart(e, boundingRect) {
      e.preventDefault();
      var touches = e.changedTouches;
      for (var i = 0; i < touches.length; i++) {
        var touch = touches[i];
        var posX = touch.pageX - boundingRect.left;
        var posY = touch.pageY - boundingRect.top;

        if (posY < 250) KEY_STATUS[KEY_MAP['touchFire']] = true;
        if (posX < 400 && posY > 250) KEY_STATUS[KEY_MAP['touchLeft']] = true;
        if (posX > 400 && posY > 250) KEY_STATUS[KEY_MAP['touchRight']] = true;

        this.ongoingTouches.push(this.copyTouch(touches[i], posX, posY));
      };
    }
  }, {
    key: 'handleEnd',
    value: function handleEnd(e, boundingRect) {
      e.preventDefault();
      var touches = e.changedTouches;
      for (var i = 0; i < touches.length; i++) {
        var touch = touches[i];
        var posX = touch.pageX - boundingRect.left;
        var posY = touch.pageY - boundingRect.top;

        if (posY < 250) KEY_STATUS[KEY_MAP['touchFire']] = false;
        if (posX < 400 && posY > 250) KEY_STATUS[KEY_MAP['touchLeft']] = false;
        if (posX > 400 && posY > 250) KEY_STATUS[KEY_MAP['touchRight']] = false;

        var touchIdx = this.ongoingTouchIndexById(touch.identifier);
        this.ongoingTouches.splice(touchIdx, 1);
      };
    }
  }, {
    key: 'copyTouch',
    value: function copyTouch(touch, posX, posY) {
      return {
        identifier: touch.identifier,
        posX: posX,
        posY: posY
      };
    }
  }, {
    key: 'ongoingTouchIndexById',
    value: function ongoingTouchIndexById(idToFind) {
      for (var i = 0; i < this.ongoingTouches.length; i++) {
        var id = this.ongoingTouches[i].identifier;
        if (id == idToFind) return i;
      }
      return -1; // not found
    }
  }, {
    key: 'statsCanvasCheckClick',
    value: function statsCanvasCheckClick(e, boundingRect) {
      e.preventDefault();
      var clickPosX = e.clientX - boundingRect.left;
      var clickPosY = e.clientY - boundingRect.top;

      if (530 <= clickPosX && clickPosX <= 630 && 10 <= clickPosY && clickPosY <= 40) {
        this.clickMute();
      } else if (650 <= clickPosX && clickPosX <= 750 && 10 <= clickPosY && clickPosY <= 40) {
        this.clickPause();
      }
    }
  }, {
    key: 'optsCanvasCheckClick',
    value: function optsCanvasCheckClick(e, boundingRect) {
      e.preventDefault();
      var clickPosX = e.clientX - boundingRect.left;
      var clickPosY = e.clientY - boundingRect.top;

      if (240 <= clickPosX && clickPosX <= 560 && 165 <= clickPosY && clickPosY <= 200) {
        this.swapMovementDirection();
      } else if (300 <= clickPosX && clickPosX <= 505 && 385 <= clickPosY && clickPosY <= 472) {
        if (this.gameStatus === 'unbegun') {
          this.startRound();
        } else if (this.gameStatus === 'playing') {
          this.clickPause();
        } else if (this.gameStatus === 'over') {
          this.newGame();
        }
      } else if (20 <= clickPosX && clickPosX <= 170 && 410 <= clickPosY && clickPosY <= 490) {
        this.gamePadToggle = this.gamePadToggle ? false : true;
        this.field.drawGamePadToggleButton();
      }
    }
  }, {
    key: 'clickMute',
    value: function clickMute() {
      if (this.muted === true) {
        this.muted = false;
        this.AssetStore.backgroundMusic.volume = 0.25;
      } else {
        this.muted = true;
        this.AssetStore.backgroundMusic.volume = 0;
      }

      this.field.updateMuteButton(this.muted);
    }
  }, {
    key: 'clickPause',
    value: function clickPause() {
      if (this.paused && this.gameStatus === 'playing') {
        this.paused = false;
        this.resumeSpawnTimers();
        this.field.clearOptsContext();
        this.optsCanvas.canvas.classList.add('hidden');
        this.play();
      } else if (!this.paused && this.gameStatus === 'playing') {
        this.paused = true;
        this.pauseSpawnTimers();
        this.field.drawStartScreen();
      };
    }
  }, {
    key: 'newGame',
    value: function newGame() {
      this.field.clearAllContexts();
      this.setupNewGame();
      this.setupNewField();
      this.field.drawStatusBar();
      this.startRound();
    }
  }, {
    key: 'swapMovementDirection',
    value: function swapMovementDirection() {
      if (this.movementDirection === 'standard') {
        this.movementDirection = 'reversed';
        KEY_MAP[74] = 'right';
        KEY_MAP[76] = 'left';
        KEY_MAP[68] = 'left';
        KEY_MAP[65] = 'right';
        KEY_MAP[39] = 'left';
        KEY_MAP[37] = 'right';
      } else {
        this.movementDirection = 'standard';
        KEY_MAP[74] = 'left';
        KEY_MAP[76] = 'right';
        KEY_MAP[68] = 'right';
        KEY_MAP[65] = 'left';
        KEY_MAP[39] = 'right';
        KEY_MAP[37] = 'left';
      }

      this.field.updateMovementDirection(this.movementDirection);
      this.field.drawStartScreen();
    }
  }, {
    key: 'mapGamePadButtons',
    value: function mapGamePadButtons(e) {
      KEY_MAP['controllerFire'] = 'fire';
      KEY_MAP['controllerLeft'] = 'left';
      KEY_MAP['controllerRight'] = 'right';
      KEY_STATUS['controllerFire'] = false;
      KEY_STATUS['controllerLeft'] = false;
      KEY_STATUS['controllerRight'] = false;
    }
  }]);

  return Game;
}();

document.addEventListener("DOMContentLoaded", function () {
  var foregroundCanvas = document.getElementById("foreground-canvas");
  var playerCanvas = document.getElementById("player-canvas");
  var statsCanvas = document.getElementById("stats-canvas");
  var optionsCanvas = document.getElementById("options-canvas");
  var mobileCanvas = null;

  if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1) {
    mobileCanvas = document.createElement("canvas");
    mobileCanvas.id = "mobile-canvas";
    mobileCanvas.width = "800";
    mobileCanvas.height = "500";
    document.getElementsByClassName("game-area")[0].appendChild(mobileCanvas);
  };

  var game = new Game(foregroundCanvas, statsCanvas, playerCanvas, optionsCanvas, mobileCanvas);
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
  function Player(pcCanvas, BulletPool) {
    _classCallCheck(this, Player);

    this.ctx = pcCanvas.ctx;
    this.pcFieldWidth = pcCanvas.width;
    this.pcFieldHeight = pcCanvas.height;
    this.BulletPool = BulletPool;

    this.velocity = 0;
    this.acceleration = 0.015;
    this.maxSpeed = 0.2;
    this.radius = 50; // The 'track' the player moves along
    this.fireCharge = 0;
    this.fireCooldown = 25;
    this.invincibilityFrames = 50;
    this.life = 3;

    this.portTheta = -1.23;
    this.starboardTheta = 1.9106;
    this.bowTheta = Math.PI / 2;
    this.computeAllVerticies();

    this.draw = this.draw.bind(this);
    this.fire = this.fire.bind(this);
  }

  _createClass(Player, [{
    key: 'computeAllVerticies',
    value: function computeAllVerticies() {
      this.portVertex = this.computePortVertex();
      this.starboardVertex = this.computeStarboardVertex();
      this.bowVertex = this.computeCenterPoints(-15);
      this.hitboxCenter = this.computeCenterPoints(-35);
    }
  }, {
    key: 'computeStarboardVertex',
    value: function computeStarboardVertex() {
      return {
        x: Math.cos(this.starboardTheta) * this.radius + this.pcFieldWidth / 2,
        y: -Math.sin(this.starboardTheta) * this.radius + this.pcFieldHeight / 2
      };
    }
  }, {
    key: 'computePortVertex',
    value: function computePortVertex() {
      return {
        x: Math.cos(this.portTheta) * this.radius + this.pcFieldWidth / 2,
        y: Math.sin(this.portTheta) * this.radius + this.pcFieldHeight / 2
      };
    }
  }, {
    key: 'computeCenterPoints',
    value: function computeCenterPoints(radius) {
      return {
        x: Math.cos(this.bowTheta) * radius + this.pcFieldWidth / 2,
        y: Math.sin(this.bowTheta) * radius + this.pcFieldHeight / 2
      };
    }
  }, {
    key: 'move',
    value: function move(keyStatus) {
      this.fireCharge++; // increments once every frame
      this.invincibilityFrames++; // increments once every frame
      if (keyStatus.left) {
        if (this.velocity <= this.maxSpeed) this.velocity += this.acceleration;
        this.starboardTheta += this.velocity;
        this.portTheta -= this.velocity;
        this.bowTheta -= this.velocity;
      } else if (keyStatus.right) {
        if (this.velocity <= this.maxSpeed) this.velocity += this.acceleration;
        this.starboardTheta -= this.velocity;
        this.portTheta += this.velocity;
        this.bowTheta += this.velocity;
      } else {
        this.velocity = 0;
      }

      if (keyStatus.fire && this.fireCharge >= this.fireCooldown) this.fire();
    }
  }, {
    key: 'fire',
    value: function fire() {
      this.fireCharge = 0;
      var bulletData = {
        theta: this.bowTheta,
        startRadius: 12,
        endRadius: -8,
        speed: 6
      };
      this.BulletPool.get(bulletData);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.computeAllVerticies();
      this.ctx.beginPath();

      if (this.invincibilityFrames < 50) this.ctx.fillStyle = 'red';else this.ctx.fillStyle = 'white';

      this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
      this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
      this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
      this.ctx.fill();
    }
  }, {
    key: 'isHit',
    value: function isHit() {
      this.life -= 1;
      this.invincibilityFrames = 0;
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

exports.Timer = Timer;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectPool = exports.ObjectPool = function () {
  function ObjectPool(size) {
    _classCallCheck(this, ObjectPool);

    this.size = size;
    this.pool = [];
  }

  _createClass(ObjectPool, [{
    key: 'get',
    value: function get(objectData) {
      if (!this.pool[this.size - 1].spawned) {
        this.pool[this.size - 1].spawn(objectData);
        this.pool.unshift(this.pool.pop());
      }
    }
  }, {
    key: 'draw',
    value: function draw(type) {
      for (var i = 0; i < this.size; i++) {
        if (this.pool[i].spawned) {
          this.pool[i].draw(this.BulletPool);
          if (this.pool[i].resetable()) {
            this.pool[i].setDefaultValues(type);
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

var Sprite = exports.Sprite = function () {
  function Sprite(context, image, srcWidth, srcHeight, srcX, srcY) {
    _classCallCheck(this, Sprite);

    this.context = context;
    this.image = image;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;
    this.srcX = srcX;
    this.srcY = srcY;

    this.draw = this.draw.bind(this);
  }

  _createClass(Sprite, [{
    key: 'draw',
    value: function draw(drawPointX, drawPointY) {
      this.context.drawImage(this.image, this.srcX, this.srcY, this.srcWidth, this.srcHeight, drawPointX, drawPointY, this.srcWidth, // drawn image width, same as src
      this.srcHeight // drawn image height, same as src
      );
    }
  }]);

  return Sprite;
}();

;

var AssetStore = exports.AssetStore = function () {
  function AssetStore(game) {
    var _this = this;

    _classCallCheck(this, AssetStore);

    this.game = game;

    this.backgroundMusic = new Audio("assets/sounds/background_music.mp3");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.25;
    this.backgroundMusic.load();
    this.checkReadyState = this.checkReadyState.bind(this);
    this.checkAudio = window.setInterval(function () {
      _this.checkReadyState();
    }, 1000);

    this.mouthDemon = {
      image: new Image(),
      width: 30,
      height: 30,
      srcX: 0,
      srcY: 0
    };
    this.eyeDemon = {
      image: new Image(),
      width: 30,
      height: 30,
      srcX: 0,
      srcY: 0
    };
    this.faceDemon = {
      image: new Image(),
      width: 30,
      height: 40,
      srcX: 0,
      srcY: 0
    };
    this.faceDemonHurt = {
      image: new Image(),
      width: 30,
      height: 40,
      srcX: 0,
      srcY: 0
    };
    this.bossDemon = {
      image: new Image(),
      width: 50,
      height: 54,
      srcX: 0,
      srcY: 0
    };
    this.heart = { image: new Image() };

    this.numAssets = 7;
    this.numLoaded = 0;

    this.mouthDemon.image.onload = function () {
      _this.assetLoaded();
    };
    this.eyeDemon.image.onload = function () {
      _this.assetLoaded();
    };
    this.faceDemon.image.onload = function () {
      _this.assetLoaded();
    };
    this.faceDemonHurt.image.onload = function () {
      _this.assetLoaded();
    };
    this.bossDemon.image.onload = function () {
      _this.assetLoaded();
    };
    this.heart.image.onload = function () {
      _this.assetLoaded();
    };

    this.mouthDemon.image.src = 'assets/sprites/mouth_demon.png';
    this.eyeDemon.image.src = 'assets/sprites/eye_demon.png';
    this.faceDemon.image.src = 'assets/sprites/face_demon.png';
    this.faceDemonHurt.image.src = 'assets/sprites/face_demon_hurt.png';
    this.bossDemon.image.src = 'assets/sprites/boss_demon.png';
    this.heart.image.src = 'assets/sprites/heart.png';
  }

  _createClass(AssetStore, [{
    key: 'checkReadyState',
    value: function checkReadyState() {
      if (this.backgroundMusic.readyState === 4) {
        window.clearInterval(this.checkAudio);
        this.assetLoaded();
      }
    }
  }, {
    key: 'assetLoaded',
    value: function assetLoaded() {
      this.numLoaded++;
      if (this.numLoaded === this.numAssets) this.game.startGame();
    }
  }]);

  return AssetStore;
}();

;

function Timer(callback, delay) {
  var timerId,
      start,
      remaining = delay;

  this.pause = function () {
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  this.resume = function () {
    start = new Date();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.clear = function () {
    window.clearTimeout(timerId);
  };

  this.resume();
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map