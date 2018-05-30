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

  function BaddiePool(size, ctx, ImageStore, BulletPool) {
    _classCallCheck(this, BaddiePool);

    var _this = _possibleConstructorReturn(this, (BaddiePool.__proto__ || Object.getPrototypeOf(BaddiePool)).call(this, size, ctx));

    _this.BulletPool = BulletPool;

    for (var i = 0; i < size; i++) {
      var baddie = new Baddie(ctx, 'redDemon', ImageStore);
      _this.pool.push(baddie);
    }
    return _this;
  }

  return BaddiePool;
}(_utilities.ObjectPool);

exports.default = BaddiePool;

var Baddie = function () {
  function Baddie(ctx, type, ImageStore) {
    _classCallCheck(this, Baddie);

    this.ctx = ctx;
    this.type = type;
    this.setDefaultValues();
    var storedAsset = ImageStore[type];
    this.width = storedAsset.width;
    this.height = storedAsset.height;
    this.sprite = new _utilities.Sprite(ctx, storedAsset.image, this.width, this.height, storedAsset.srcX, storedAsset.srcY);
  }

  _createClass(Baddie, [{
    key: 'spawn',
    value: function spawn(theta, speed) {
      this.theta = theta;
      this.drawPoint = this.computeDrawPoint();
      this.speed = speed;
      this.spawned = true;
    }
  }, {
    key: 'draw',
    value: function draw(BulletPool) {
      if (this.isHit) {
        return true;
      } else {
        this.theta -= this.speed;
        this.drawPoint = this.computeDrawPoint();
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.sprite.draw(this.drawPoint.x, this.drawPoint.y);

        this.chanceToFire = Math.floor(Math.random() * 101);
        this.fire(BulletPool);
      }
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
    key: 'fire',
    value: function fire(BulletPool) {
      // console.log('baddie.fire');
      var bulletSpeed = 0.5;
      BulletPool.get(this.theta, bulletSpeed);
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues() {
      this.isHit = false;
      this.chanceToFire = 0;
      this.fireThreshold = 0.01;
      this.spawned = false;
      this.drawPoint = { x: 400, y: 250 };
      this.speed = 0.1;
      this.radius = 300; // The 'track' the baddie moves along
    }
  }]);

  return Baddie;
}();

/***/ }),

/***/ "./scripts/baddieBullet.js":
/*!*********************************!*\
  !*** ./scripts/baddieBullet.js ***!
  \*********************************/
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
      var bullet = new BadBullet(fgCanvas, type);
      _this.pool.push(bullet);
    }
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;

var BadBullet = function () {
  function BadBullet(fgCanvas, type) {
    _classCallCheck(this, BadBullet);

    this.ctx = fgCanvas.ctx;
    this.type = type;
    this.setDefaultValues();
  }

  _createClass(BadBullet, [{
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
    value: function draw() {
      // ctx.clearRect(this.x, this.y, this.width, this.height); optimize later
      this.startRadius -= this.speed;
      this.endRadius -= this.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);

      if ((this.startPoint.y > -1 || this.endPoint.y > -1) && (this.startPoint.y < 501 || this.endPoint.y < 501) && (this.startPoint.x > -1 || this.endPoint.x > -1) && (this.startPoint.x < 801 || this.endPoint.x < 801)) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
        this.ctx.stroke();
      } else {
        return true;
      };
    }
  }, {
    key: 'computePoint',
    value: function computePoint(radius) {
      return {
        x: Math.cos(this.pathAngle) * -radius + this.xOffset,
        y: Math.sin(this.pathAngle) * -radius + this.yOffset
      };
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues() {
      if (this.type === 'playerBullet') {
        this.startRadius = 12;
        this.endRadius = -8;
        this.xOffset = 400;
        this.yOffset = 250;
      } else {
        this.startRadius = 0;
        this.endRadius = 0;
        this.xOffset = 400;
        this.yOffset = 250;
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

  return BadBullet;
}();

;

// Bullet.prototype = new Sprite();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(fgCanvas, type) {
    _classCallCheck(this, Bullet);

    this.ctx = fgCanvas.ctx;
    this.ctxWidth = fgCanvas.width;
    this.ctxHeight = fgCanvas.height;
    this.undrawX = fgCanvas.width + 1;
    this.undrawY = fgCanvas.height + 1;
    this.setDefaultValues(type);
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
    value: function draw() {
      // ctx.clearRect(this.x, this.y, this.width, this.height); optimize later
      this.startRadius -= this.speed;
      this.endRadius -= this.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);

      if ((this.startPoint.y > -1 || this.endPoint.y > -1) && (this.startPoint.y < this.undrawY || this.endPoint.y < this.undrawY) && (this.startPoint.x > -1 || this.endPoint.x > -1) && (this.startPoint.x < this.undrawX || this.endPoint.x < this.undrawX)) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
        this.ctx.stroke();
      } else {
        return true;
      };
    }
  }, {
    key: 'computePoint',
    value: function computePoint(radius) {
      return {
        x: Math.cos(this.pathAngle) * -radius + this.xOffset,
        y: Math.sin(this.pathAngle) * -radius + this.yOffset
      };
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues(type) {
      if (type === 'player') {
        this.startRadius = 12;
        this.endRadius = -8;
      }
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

exports.default = Bullet;
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

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _baddie = __webpack_require__(/*! ./baddie */ "./scripts/baddie.js");

var _baddie2 = _interopRequireDefault(_baddie);

var _playerBullet = __webpack_require__(/*! ./playerBullet */ "./scripts/playerBullet.js");

var _playerBullet2 = _interopRequireDefault(_playerBullet);

var _baddieBullet = __webpack_require__(/*! ./baddieBullet */ "./scripts/baddieBullet.js");

var _baddieBullet2 = _interopRequireDefault(_baddieBullet);

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

    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    };
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 100,
      height: 100
    };

    fgCanvas.width = this.fgCanvas.width;
    fgCanvas.height = this.fgCanvas.height;
    pcCanvas.width = this.pcCanvas.width;
    pcCanvas.height = this.pcCanvas.height;

    this.ImageStore = new _utilities.ImageStore();
    this.badBulletPool = new _baddieBullet2.default(20, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new _playerBullet2.default(8, this.fgCanvas);
    this.BaddiePool = new _baddie2.default(1, this.fgCanvas.ctx, this.ImageStore, this.badBulletPool);
    this.player = new _player2.default(this.pcCanvas, this.pcBulletPool);
    this.lastTime = Date.now;

    this.playRound = this.playRound.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    // this.checkPlayerCollision = this.checkPlayerCollision.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  _createClass(Field, [{
    key: 'drawFieldBorder',
    value: function drawFieldBorder() {
      this.fgCanvas.ctx.beginPath();
      this.fgCanvas.ctx.lineWidth = 1;
      this.fgCanvas.ctx.rect(0, 0, this.fgCanvas.width, this.fgCanvas.height);
      this.fgCanvas.ctx.strokeStyle = 'black';
      this.fgCanvas.ctx.stroke();

      // this.pcCanvas.ctx.beginPath();
      // this.pcCanvas.ctx.lineWidth = 1;
      // this.pcCanvas.ctx.rect(0, 0, this.pcCanvas.width, this.pcCanvas.height);
      // this.pcCanvas.ctx.strokeStyle = 'black';
      // this.pcCanvas.ctx.stroke();
    }
  }, {
    key: 'drawPlayerRails',
    value: function drawPlayerRails(shape) {
      var xCenter = this.pcCanvas.width / 2;
      var yCenter = this.pcCanvas.height / 2;

      switch (shape) {
        case 'circle':
        default:
          this.pcCanvas.ctx.beginPath();
          this.pcCanvas.ctx.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
          this.pcCanvas.ctx.strokeStyle = "black";
          this.pcCanvas.ctx.lineWidth = 2;
          this.pcCanvas.ctx.stroke();
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
      this.checkCollisions();
      this.drawPlayer();
      this.pcBulletPool.draw('player');
      this.BaddiePool.get(Math.PI / 2, 0.005);
      this.BaddiePool.draw();
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
    key: 'checkCollisions',
    value: function checkCollisions() {
      var spawnedPCBullets = this.pcBulletPool.pool.filter(function (bullet) {
        return bullet.spawned;
      });
      this.checkPlayerCollision(spawnedPCBullets);
      this.checkBaddieCollision(spawnedPCBullets);
    }
  }, {
    key: 'checkPlayerCollision',
    value: function checkPlayerCollision(spawnedPCBullets) {
      var spawnedBadBullets = this.badBulletPool.pool.filter(function (bullet) {
        return bullet.spawned;
      });

      var hitbox = {
        x: this.player.hitboxCenter.x,
        y: this.player.hitboxCenter.y,
        radius: 9
      };

      for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        var bullet = spawnedPCBullets[bullIdx];
        if (this.pcBulletHitsPC(this.player, hitbox, bullet.startPoint) || this.pcBulletHitsPC(this.player, hitbox, bullet.endPoint)) {
          this.player.isHit();
        };
      }
    }
  }, {
    key: 'pcBulletHitsPC',
    value: function pcBulletHitsPC(player, hitbox, bullet) {
      hitbox.x = hitbox.x - player.pcFieldWidth / 2 + this.fgCanvas.width / 2;
      hitbox.y = hitbox.y - player.pcFieldHeight / 2 + this.fgCanvas.height / 2;
      var distanceFromHitboxToBullet = Math.sqrt(Math.pow(hitbox.x - bullet.x, 2)) + Math.sqrt(Math.pow(hitbox.y - bullet.y, 2));

      return distanceFromHitboxToBullet <= hitbox.radius;
    }
  }, {
    key: 'checkBaddieCollision',
    value: function checkBaddieCollision(spawnedPCBullets) {
      var spawnedBaddies = this.BaddiePool.pool.filter(function (baddie) {
        return baddie.spawned;
      });

      for (var badIdx = 0; badIdx < spawnedBaddies.length; badIdx++) {
        var baddie = spawnedBaddies[badIdx];
        for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
          var bullet = spawnedPCBullets[bullIdx];
          var drawPoint = baddie.drawPoint;
          if (this.pcBulletHitsBaddie(baddie, drawPoint, bullet.startPoint) || this.pcBulletHitsBaddie(baddie, drawPoint, bullet.endPoint)) {
            baddie.isHit = true;
          };
        }
      }
    }
  }, {
    key: 'pcBulletHitsBaddie',
    value: function pcBulletHitsBaddie(baddie, drawPoint, bullet) {
      return drawPoint.x <= bullet.x && bullet.x <= drawPoint.x + baddie.width && drawPoint.y <= bullet.y && bullet.y <= drawPoint.y + baddie.height;
    }

    // spawnedBaddies.forEach((baddie) => {
    //   spawnedPCBullets.forEach((bullet) => {
    //     if bullet.startPoint.x
    //     let bulletStart
    //   })
    // })

    // debugger
    // this.BaddiePool.pool.forEach((baddie) => {
    //   debugger
    //   let badX = baddie.drawPoint.x;
    //   let badY = baddie.drawPoint.y;
    //   this.pcBulletPool.pool.forEach((bullet) => {
    //     debugger
    //     console.log(`bullet ${bullet.startPoint.x}`);
    //     console.log(`baddie ${baddie.drawPoint.x}`);
    //     if(
    //       (bullet.startPoint.x <= badX && bullet.startPoint.x >= badX + 20) ||
    //       (bullet.endPoint.x <= badX && bullet.endPoint.x >= badX + 20) ||
    //       (bullet.startPoint.y <= badY && bullet.startPoint.y >= badY + 30) ||
    //       (bullet.endPoint.y <= badY && bullet.startPoint.y >= badY + 30)
    //     ) {
    //       console.log('hit!');
    //     }
    //   })
    //
    // })
    // }

  }, {
    key: 'clearFGContext',
    value: function clearFGContext() {
      this.fgCanvas.ctx.clearRect(0, 0, this.fgCanvas.width, this.fgCanvas.height);
    } // implement dirty rectangles on each sprite?

  }, {
    key: 'clearPCContext',
    value: function clearPCContext() {
      this.pcCanvas.ctx.clearRect(0, 0, this.pcCanvas.width, this.pcCanvas.height);
    } // implement dirty rectangles on each sprite?

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
  function Player(pcCanvas, BulletPool) {
    _classCallCheck(this, Player);

    this.ctx = pcCanvas.ctx;
    this.pcFieldWidth = pcCanvas.width;
    this.pcFieldHeight = pcCanvas.height;
    this.BulletPool = BulletPool;

    this.velocity = 0;
    this.acceleration = 0.03;
    this.maxSpeed = 0.3;
    this.radius = 30; // The 'track' the player moves along
    this.fireCharge = 0;
    this.fireCooldown = 25;
    this.damageFrames = 100;

    this.portTheta = -1.23;
    this.starboardTheta = 1.9106;
    this.bowTheta = Math.PI / 2;
    this.portVertex = this.computePortVertex();
    this.starboardVertex = this.computeStarboardVertex();
    this.bowVertex = this.computeCenterPoints(-10);
    this.hitboxCenter = this.computeCenterPoints(-22);

    this.draw = this.draw.bind(this);
    this.fire = this.fire.bind(this);
  }

  _createClass(Player, [{
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
      this.damageFrames++; // increments once every frame
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
      var bulletSpeed = 3.5;
      this.BulletPool.get(this.bowTheta, bulletSpeed);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.starboardVertex = this.computeStarboardVertex();
      this.portVertex = this.computePortVertex();
      this.bowVertex = this.computeCenterPoints(-10);
      this.hitboxCenter = this.computeCenterPoints(-22);

      this.ctx.beginPath();

      if (this.damageFrames < 50) {
        this.ctx.fillStyle = 'red';
      } else {
        if (this.fireCharge > this.fireCooldown) {
          this.ctx.fillStyle = 'blue';
        } else {
          this.ctx.fillStyle = 'black';
        }
      }

      this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
      this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
      this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
      this.ctx.fill();
    }
  }, {
    key: 'isHit',
    value: function isHit() {
      this.damageFrames = 0;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./scripts/playerBullet.js":
/*!*********************************!*\
  !*** ./scripts/playerBullet.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _bullet = __webpack_require__(/*! ./bullet */ "./scripts/bullet.js");

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BulletPool = function (_ObjectPool) {
  _inherits(BulletPool, _ObjectPool);

  function BulletPool(size, fgCanvas) {
    _classCallCheck(this, BulletPool);

    var _this = _possibleConstructorReturn(this, (BulletPool.__proto__ || Object.getPrototypeOf(BulletPool)).call(this, size));

    for (var i = 0; i < size; i++) {
      var bullet = new PlayerBullet(fgCanvas);
      _this.pool.push(bullet);
    }
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;

var PlayerBullet = function (_Bullet) {
  _inherits(PlayerBullet, _Bullet);

  function PlayerBullet(fgCanvas) {
    _classCallCheck(this, PlayerBullet);

    return _possibleConstructorReturn(this, (PlayerBullet.__proto__ || Object.getPrototypeOf(PlayerBullet)).call(this, fgCanvas, 'player'));
  }

  return PlayerBullet;
}(_bullet2.default);

;

// Bullet.prototype = new Sprite();

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
  function ObjectPool(size) {
    _classCallCheck(this, ObjectPool);

    this.size = size;
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
    value: function draw(type) {
      for (var i = 0; i < this.size; i++) {
        if (this.pool[i].spawned) {
          if (this.pool[i].draw(this.BulletPool)) {
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
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;

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

var ImageStore = exports.ImageStore = function ImageStore() {
  _classCallCheck(this, ImageStore);

  this.bullet = { image: new Image() };
  this.redDemon = {
    image: new Image(),
    width: 21,
    height: 30,
    srcX: 0,
    srcY: 0
    // this.numImages = 2;
    // this.numLoaded = 0;
    //
    // this.bullet.onload = () => {
    //   this.imageLoaded();
    // }

  };this.bullet.image.src = 'assets/sprites/bullet.png';
  this.redDemon.image.src = 'assets/sprites/demon_test.png';
}

// imageLoaded() {
//   this.numLoaded++;
//   if(this.numLoaded === this.numImages) game.playRound();
// }
;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map