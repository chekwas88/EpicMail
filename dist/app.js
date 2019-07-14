"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _userRoute = _interopRequireDefault(require("./route/userRoute"));

var _messageRoute = _interopRequireDefault(require("./route/messageRoute"));

var _groupRoute = _interopRequireDefault(require("./route/groupRoute"));

var _contactRoute = _interopRequireDefault(require("./route/contactRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var app = (0, _express["default"])();
var corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use((0, _express.json)());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])(corsOptions));
app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use(_userRoute["default"]);
app.use(_messageRoute["default"]);
app.use(_groupRoute["default"]);
app.use(_contactRoute["default"]);
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to EPIC MAIL'
  });
});
app.all('*', function (req, res) {
  res.status(404).json({
    message: 'No such endpoint exist'
  });
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
  return console.log("app started at ".concat(port));
});
var _default = app;
exports["default"] = _default;