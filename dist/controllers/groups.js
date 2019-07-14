"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConnection = _interopRequireDefault(require("../db/dbConnection"));

var _queries = _interopRequireDefault(require("../utils/queries"));

var _messageHelper = _interopRequireDefault(require("../utils/messageHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GroupController =
/*#__PURE__*/
function () {
  function GroupController() {
    _classCallCheck(this, GroupController);
  }

  _createClass(GroupController, null, [{
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var id, _ref, rows, data, user, userInsession;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.user.id;
                _context.next = 3;
                return _dbConnection["default"].query(_queries["default"].createGroup, [req.body.name.trim(), id]);

              case 3:
                _ref = _context.sent;
                rows = _ref.rows;
                data = rows[0];
                _context.next = 8;
                return _dbConnection["default"].query(_queries["default"].getAuser, [id]);

              case 8:
                user = _context.sent;
                userInsession = user.rows[0];
                _context.next = 12;
                return _dbConnection["default"].query(_queries["default"].addmember, [data.id, id, userInsession.email, data.role]);

              case 12:
                return _context.abrupt("return", res.status(201).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Group created',
                    data: data
                  }]
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "addMemberToGroupByEmail",
    value: function () {
      var _addMemberToGroupByEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, groupid, _ref2, rows, group, user, output, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.user.id;
                groupid = parseInt(req.params.id, 10);
                _context2.next = 4;
                return _dbConnection["default"].query(_queries["default"].getgroup, [groupid]);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                group = rows[0];

                if (group) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'no such group exist'
                }));

              case 9:
                _context2.next = 11;
                return _messageHelper["default"].getUser(req.body.email.trim());

              case 11:
                user = _context2.sent;

                if (user) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'User does not exit'
                }));

              case 14:
                if (!(group.createdby === id)) {
                  _context2.next = 20;
                  break;
                }

                _context2.next = 17;
                return _dbConnection["default"].query(_queries["default"].addmember, [groupid, user.id, req.body.email.trim(), req.body.role.trim()]);

              case 17:
                output = _context2.sent;
                data = output.rows[0];
                return _context2.abrupt("return", res.status(201).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Member added',
                    data: data
                  }]
                }));

              case 20:
                return _context2.abrupt("return", res.status(403).json({
                  status: res.statusCode,
                  error: 'authorization denied'
                }));

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addMemberToGroupByEmail(_x3, _x4) {
        return _addMemberToGroupByEmail.apply(this, arguments);
      }

      return addMemberToGroupByEmail;
    }()
  }, {
    key: "addMemberToGroupById",
    value: function () {
      var _addMemberToGroupById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, groupid, memberid, grp, user, _ref3, rows, groupmem, group;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.user.id;
                groupid = parseInt(req.params.groupid, 10);
                memberid = parseInt(req.params.id, 10);
                _context3.next = 5;
                return _dbConnection["default"].query(_queries["default"].getgroup, [groupid]);

              case 5:
                grp = _context3.sent;
                _context3.next = 8;
                return _messageHelper["default"].getUserById(memberid);

              case 8:
                user = _context3.sent;
                _context3.next = 11;
                return _dbConnection["default"].query(_queries["default"].getGroupmember, [groupid, memberid]);

              case 11:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                groupmem = rows[0];
                group = grp.rows[0];

                if (!groupmem) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'member already exits'
                }));

              case 17:
                if (group) {
                  _context3.next = 19;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'group does not exit'
                }));

              case 19:
                if (!(group.createdby === id)) {
                  _context3.next = 23;
                  break;
                }

                _context3.next = 22;
                return _dbConnection["default"].query(_queries["default"].addmember, [groupid, memberid, user.email, 'member']);

              case 22:
                return _context3.abrupt("return", res.status(201).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Member added'
                  }]
                }));

              case 23:
                return _context3.abrupt("return", res.status(403).json({
                  status: res.statusCode,
                  data: [{
                    status: res.statusCode,
                    error: 'authorization denied'
                  }]
                }));

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function addMemberToGroupById(_x5, _x6) {
        return _addMemberToGroupById.apply(this, arguments);
      }

      return addMemberToGroupById;
    }()
  }, {
    key: "updateGroup",
    value: function () {
      var _updateGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, groupid, _ref4, rows, group, output, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.user.id;
                groupid = parseInt(req.params.id, 10);
                _context4.next = 4;
                return _dbConnection["default"].query(_queries["default"].getgroup, [groupid]);

              case 4:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                group = rows[0];

                if (group) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'no such group exist'
                }));

              case 9:
                if (!(group.createdby === id)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 12;
                return _dbConnection["default"].query(_queries["default"].updateGroup, [req.body.name.trim(), groupid]);

              case 12:
                output = _context4.sent;
                data = output.rows[0];
                return _context4.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Group updated',
                    data: data
                  }]
                }));

              case 15:
                return _context4.abrupt("return", res.status(403).json({
                  status: res.statusCode,
                  data: [{
                    status: res.statusCode,
                    error: 'authorization denied'
                  }]
                }));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateGroup(_x7, _x8) {
        return _updateGroup.apply(this, arguments);
      }

      return updateGroup;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, groupid, _ref5, rows, group;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.user.id;
                groupid = parseInt(req.params.id, 10);
                _context5.next = 4;
                return _dbConnection["default"].query(_queries["default"].getgroup, [groupid]);

              case 4:
                _ref5 = _context5.sent;
                rows = _ref5.rows;
                group = rows[0];

                if (group) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'no such group exist'
                }));

              case 9:
                if (!(group.createdby === id)) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 12;
                return _dbConnection["default"].query(_queries["default"].deleteGroup, [groupid]);

              case 12:
                return _context5.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Group deleted'
                  }]
                }));

              case 13:
                return _context5.abrupt("return", res.status(403).json({
                  status: res.statusCode,
                  data: [{
                    status: res.statusCode,
                    error: 'authorization denied'
                  }]
                }));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteGroup(_x9, _x10) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: "deleteGroupMember",
    value: function () {
      var _deleteGroupMember = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var id, groupid, memberid, grp, _ref6, rows, groupmem, group;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.user.id;
                groupid = parseInt(req.params.groupid, 10);
                memberid = parseInt(req.params.id, 10);
                _context6.next = 5;
                return _dbConnection["default"].query(_queries["default"].getgroup, [groupid]);

              case 5:
                grp = _context6.sent;
                _context6.next = 8;
                return _dbConnection["default"].query(_queries["default"].getGroupmember, [groupid, memberid]);

              case 8:
                _ref6 = _context6.sent;
                rows = _ref6.rows;
                groupmem = rows[0];
                group = grp.rows[0];

                if (groupmem) {
                  _context6.next = 14;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'group member does not exist'
                }));

              case 14:
                if (group) {
                  _context6.next = 16;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'group does not exit'
                }));

              case 16:
                if (!(group.createdby === id)) {
                  _context6.next = 20;
                  break;
                }

                _context6.next = 19;
                return _dbConnection["default"].query(_queries["default"].deleteMember, [groupid, memberid]);

              case 19:
                return _context6.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'Member deleted'
                  }]
                }));

              case 20:
                return _context6.abrupt("return", res.status(403).json({
                  status: res.statusCode,
                  data: [{
                    status: res.statusCode,
                    error: 'authorization denied'
                  }]
                }));

              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteGroupMember(_x11, _x12) {
        return _deleteGroupMember.apply(this, arguments);
      }

      return deleteGroupMember;
    }()
  }, {
    key: "sendMessageToGroup",
    value: function () {
      var _sendMessageToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var msgd, id, groupid, _ref7, rows, group, members, gm, groupmem, sender, senderName;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                msgd = {
                  subject: req.body.subject.trim(),
                  message: req.body.message.trim()
                };
                id = req.user.id;
                groupid = parseInt(req.params.groupid, 10);
                _context7.next = 5;
                return _dbConnection["default"].query(_queries["default"].getgroup, [groupid]);

              case 5:
                _ref7 = _context7.sent;
                rows = _ref7.rows;
                group = rows[0];
                _context7.next = 10;
                return _dbConnection["default"].query(_queries["default"].getAllGroupMembers, [group.id]);

              case 10:
                members = _context7.sent;
                gm = members.rows;
                groupmem = gm.map(function (m) {
                  return m.userid;
                });
                _context7.next = 15;
                return _messageHelper["default"].getMessageSender(id);

              case 15:
                sender = _context7.sent;
                senderName = "".concat(sender.firstname, " ").concat(sender.lastname);

                if (!groupmem.includes(id)) {
                  _context7.next = 21;
                  break;
                }

                _context7.next = 20;
                return gm.forEach(function (m) {
                  _messageHelper["default"].sendToGroup(id, msgd.subject, msgd.message, m.memberemail, m.userid, senderName, group.name);
                });

              case 20:
                return _context7.abrupt("return", res.status(201).json({
                  status: res.statusCode,
                  message: 'Message sent'
                }));

              case 21:
                return _context7.abrupt("return", res.status(403).json({
                  status: res.statusCode,
                  error: 'Authorization denied'
                }));

              case 22:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function sendMessageToGroup(_x13, _x14) {
        return _sendMessageToGroup.apply(this, arguments);
      }

      return sendMessageToGroup;
    }()
  }, {
    key: "getAllgroups",
    value: function () {
      var _getAllgroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res) {
        var id, _ref8, rows, userMemGroups, userMemGroupsIds, result, allGroups, groups;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                id = req.user.id;
                _context8.next = 3;
                return _dbConnection["default"].query(_queries["default"].getAllUserGroups, [id]);

              case 3:
                _ref8 = _context8.sent;
                rows = _ref8.rows;
                userMemGroups = rows;
                userMemGroupsIds = userMemGroups.map(function (u) {
                  return u.groupid;
                });
                _context8.next = 9;
                return _dbConnection["default"].query(_queries["default"].getAllGroups);

              case 9:
                result = _context8.sent;
                allGroups = result.rows;
                groups = [];
                allGroups.forEach(function (g) {
                  if (userMemGroupsIds.includes(g.id)) {
                    groups.push(g);
                  }
                });
                return _context8.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'All groups retrieved',
                    groups: groups
                  }]
                }));

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getAllgroups(_x15, _x16) {
        return _getAllgroups.apply(this, arguments);
      }

      return getAllgroups;
    }()
  }, {
    key: "getAllgroupUsers",
    value: function () {
      var _getAllgroupUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(req, res) {
        var groupid, _ref9, rows, groupMembers, usersResult, users, memberIds, members;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                groupid = parseInt(req.params.id, 10);
                _context9.next = 3;
                return _dbConnection["default"].query(_queries["default"].getAllGroupMembers, [groupid]);

              case 3:
                _ref9 = _context9.sent;
                rows = _ref9.rows;
                groupMembers = rows;

                if (groupMembers) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", res.status(404).json({
                  status: res.statusCode,
                  error: 'no group member found'
                }));

              case 8:
                _context9.next = 10;
                return _dbConnection["default"].query(_queries["default"].allUserQ);

              case 10:
                usersResult = _context9.sent;
                users = usersResult.rows;
                memberIds = groupMembers.map(function (g) {
                  return g.userid;
                });
                members = [];
                users.forEach(function (u) {
                  if (memberIds.includes(u.id)) {
                    members.push(u);
                  }
                });
                return _context9.abrupt("return", res.status(200).json({
                  status: res.statusCode,
                  data: [{
                    message: 'members retrieved',
                    members: members
                  }]
                }));

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getAllgroupUsers(_x17, _x18) {
        return _getAllgroupUsers.apply(this, arguments);
      }

      return getAllgroupUsers;
    }()
  }]);

  return GroupController;
}();

var _default = GroupController;
exports["default"] = _default;