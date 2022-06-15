/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var _require = require('fabric-contract-api'),
    Contract = _require.Contract;

var FabCar =
/*#__PURE__*/
function (_Contract) {
  _inherits(FabCar, _Contract);

  function FabCar() {
    _classCallCheck(this, FabCar);

    return _possibleConstructorReturn(this, _getPrototypeOf(FabCar).apply(this, arguments));
  }

  _createClass(FabCar, [{
    key: "initLedger",
    value: function initLedger(ctx) {
      var cars, i;
      return regeneratorRuntime.async(function initLedger$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.info('============= START : Initialize Ledger ===========');
              cars = [{
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko'
              }, {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad'
              }, {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo'
              }, {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max'
              }, {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana'
              }, {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel'
              }, {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav'
              }, {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari'
              }, {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria'
              }, {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro'
              }];
              i = 0;

            case 3:
              if (!(i < cars.length)) {
                _context.next = 11;
                break;
              }

              cars[i].docType = 'car';
              _context.next = 7;
              return regeneratorRuntime.awrap(ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i]))));

            case 7:
              console.info('Added <--> ', cars[i]);

            case 8:
              i++;
              _context.next = 3;
              break;

            case 11:
              console.info('============= END : Initialize Ledger ===========');

            case 12:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "queryCar",
    value: function queryCar(ctx, carNumber) {
      var carAsBytes;
      return regeneratorRuntime.async(function queryCar$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(ctx.stub.getState(carNumber));

            case 2:
              carAsBytes = _context2.sent;

              if (!(!carAsBytes || carAsBytes.length === 0)) {
                _context2.next = 5;
                break;
              }

              throw new Error("".concat(carNumber, " does not exist"));

            case 5:
              console.log(carAsBytes.toString());
              return _context2.abrupt("return", carAsBytes.toString());

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "createCar",
    value: function createCar(ctx, carNumber, make, model, color, owner) {
      var car;
      return regeneratorRuntime.async(function createCar$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.info('============= START : Create Car ===========');
              car = {
                color: color,
                docType: 'car',
                make: make,
                model: model,
                owner: owner
              };
              _context3.next = 4;
              return regeneratorRuntime.awrap(ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car))));

            case 4:
              console.info('============= END : Create Car ===========');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "queryAllCars",
    value: function queryAllCars(ctx) {
      var startKey, endKey, allResults, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, _value2, key, value, strValue, record;

      return regeneratorRuntime.async(function queryAllCars$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              startKey = '';
              endKey = '';
              allResults = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context4.prev = 5;
              _iterator = _asyncIterator(ctx.stub.getStateByRange(startKey, endKey));

            case 7:
              _context4.next = 9;
              return regeneratorRuntime.awrap(_iterator.next());

            case 9:
              _step = _context4.sent;
              _iteratorNormalCompletion = _step.done;
              _context4.next = 13;
              return regeneratorRuntime.awrap(_step.value);

            case 13:
              _value = _context4.sent;

              if (_iteratorNormalCompletion) {
                _context4.next = 23;
                break;
              }

              _value2 = _value, key = _value2.key, value = _value2.value;
              strValue = Buffer.from(value).toString('utf8');
              record = void 0;

              try {
                record = JSON.parse(strValue);
              } catch (err) {
                console.log(err);
                record = strValue;
              }

              allResults.push({
                Key: key,
                Record: record
              });

            case 20:
              _iteratorNormalCompletion = true;
              _context4.next = 7;
              break;

            case 23:
              _context4.next = 29;
              break;

            case 25:
              _context4.prev = 25;
              _context4.t0 = _context4["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context4.t0;

            case 29:
              _context4.prev = 29;
              _context4.prev = 30;

              if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                _context4.next = 34;
                break;
              }

              _context4.next = 34;
              return regeneratorRuntime.awrap(_iterator["return"]());

            case 34:
              _context4.prev = 34;

              if (!_didIteratorError) {
                _context4.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return _context4.finish(34);

            case 38:
              return _context4.finish(29);

            case 39:
              console.info(allResults);
              return _context4.abrupt("return", JSON.stringify(allResults));

            case 41:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[5, 25, 29, 39], [30,, 34, 38]]);
    }
  }, {
    key: "changeCarOwner",
    value: function changeCarOwner(ctx, carNumber, newOwner) {
      var carAsBytes, car;
      return regeneratorRuntime.async(function changeCarOwner$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.info('============= START : changeCarOwner ===========');
              _context5.next = 3;
              return regeneratorRuntime.awrap(ctx.stub.getState(carNumber));

            case 3:
              carAsBytes = _context5.sent;

              if (!(!carAsBytes || carAsBytes.length === 0)) {
                _context5.next = 6;
                break;
              }

              throw new Error("".concat(carNumber, " does not exist"));

            case 6:
              car = JSON.parse(carAsBytes.toString());
              car.owner = newOwner;
              _context5.next = 10;
              return regeneratorRuntime.awrap(ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car))));

            case 10:
              console.info('============= END : changeCarOwner ===========');

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "queryCarOwner",
    value: function queryCarOwner(ctx, owner) {
      var carAsBytes;
      return regeneratorRuntime.async(function queryCarOwner$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(ctx.stub.getState(carNumber));

            case 2:
              carAsBytes = _context6.sent;

              if (!(!carAsBytes || carAsBytes.length === 0)) {
                _context6.next = 5;
                break;
              }

              throw new Error("".concat(carNumber, " does not exist"));

            case 5:
              console.log(carAsBytes.toString());
              return _context6.abrupt("return", carAsBytes.toString());

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return FabCar;
}(Contract);

module.exports = FabCar;