'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _swagger = require('../swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

var _userRoute = require('./route/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

var _messageRoute = require('./route/messageRoute');

var _messageRoute2 = _interopRequireDefault(_messageRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

app.use((0, _express.json)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());

app.use('/api/v1/docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));
app.use(_userRoute2.default);
app.use(_messageRoute2.default);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EPIC MAIL'
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No such endpoint exist'
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app started at ${port}`));

exports.default = app;