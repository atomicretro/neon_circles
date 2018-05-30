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

  function BulletPool(size, ctx, type) {
    _classCallCheck(this, BulletPool);

    var _this = _possibleConstructorReturn(this, (BulletPool.__proto__ || Object.getPrototypeOf(BulletPool)).call(this, size));

    for (var i = 0; i < size; i++) {
      var bullet = new Bullet(ctx, type);
      _this.pool.push(bullet);
    }
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;

var Bullet = function () {
  function Bullet(ctx, type) {
    _classCallCheck(this, Bullet);

    this.ctx = ctx;
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
    value: function draw() {
      // ctx.clearRect(this.x, this.y, this.width, this.height); optimize later
      this.startRadius -= this.speed;
      this.endRadius -= this.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);
      // console.log('bullet.draw');

      if ((this.startPoint.y > -1 || this.endPoint.y > -1) && (this.startPoint.y < 501 || this.endPoint.y < 501) && (this.startPoint.x > -1 || this.endPoint.x > -1) && (this.startPoint.x < 801 || this.endPoint.x < 801)) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
        this.ctx.stroke();
        // console.log('bullet.draw#if');
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

  return Bullet;
}();

;

// Bullet.prototype = new Sprite();

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
    this.badBulletPool = new _bullet2.default(20, this.fgContext, 'demonBullet');
    this.pcBulletPool = new _bullet2.default(8, this.fgContext, 'playerBullet');
    this.BaddiePool = new _baddie2.default(1, this.fgContext, this.ImageStore, this.badBulletPool);
    this.player = new _player2.default(this.pcContext, this.pcWidth, this.pcHeight, this.pcBulletPool);
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
    this.render = this.render.bind(this);
    this.keydown = this.keydown.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.checkPlayerCollision = this.checkPlayerCollision.bind(this);
    this.checkBaddieCollision = this.checkBaddieCollision.bind(this);

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

      // this.pcContext.beginPath();
      // this.pcContext.lineWidth = 1;
      // this.pcContext.rect(0, 0, this.pcWidth, this.pcHeight);
      // this.pcContext.strokeStyle = 'black';
      // this.pcContext.stroke();
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
      this.checkCollisions();
      this.drawPlayer();
      this.pcBulletPool.draw();
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

        // this.pcContext.arc(hitbox.x, hitbox.y, 5, 0, 2 * Math.PI, true);

      };for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        var bullet = spawnedPCBullets[bullIdx];
        if (this.pcBulletHitsPC(this.player, hitbox, bullet.startPoint) || this.pcBulletHitsPC(this.player, hitbox, bullet.endPoint)) {
          // debugger
          this.player.isHit();
        };
      }
    }
  }, {
    key: 'pcBulletHitsPC',
    value: function pcBulletHitsPC(player, hitbox, bullet) {
      hitbox.x = hitbox.x - player.pcFieldWidth / 2 + this.fgWidth / 2;
      hitbox.y = hitbox.y - player.pcFieldHeight / 2 + this.fgHeight / 2;
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
      this.fgContext.clearRect(0, 0, this.fgWidth, this.fgHeight);
    } // implement dirty rectangles on each sprite?

  }, {
    key: 'clearPCContext',
    value: function clearPCContext() {
      this.pcContext.clearRect(0, 0, this.pcWidth, this.pcHeight);
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
  function Player(ctx, pcFieldWidth, pcFieldHeight, BulletPool) {
    _classCallCheck(this, Player);

    this.ctx = ctx;
    this.pcFieldWidth = pcFieldWidth;
    this.pcFieldHeight = pcFieldHeight;
    this.BulletPool = BulletPool;

    this.velocity = 0;
    this.acceleration = 0.03;
    this.maxSpeed = 0.3;
    this.radius = 30; // The 'track' the player moves along
    this.fireCharge = 0;
    this.fireCooldown = 15;

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
      this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
      this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
      this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
    }
  }, {
    key: 'isHit',
    value: function isHit() {
      console.log('ouch!');
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
  function ObjectPool(size) {
    _classCallCheck(this, ObjectPool);

    this.size = size;
    this.pool = [];
  }

  _createClass(ObjectPool, [{
    key: 'get',
    value: function get(theta, speed) {
      // debugger
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
          if (this.pool[i].draw(this.BulletPool)) {
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