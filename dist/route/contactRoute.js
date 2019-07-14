"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _contacts = _interopRequireDefault(require("../controllers/contacts"));

var _verifytoken = _interopRequireDefault(require("../middleware/verifytoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/api/v1/contacts', _verifytoken["default"].verifyToken, _contacts["default"].getContacts);
var _default = router;
exports["default"] = _default;