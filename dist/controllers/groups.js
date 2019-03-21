'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbConnection = require('../db/dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _queries = require('../utils/queries');

var _queries2 = _interopRequireDefault(_queries);

var _messageHelper = require('../utils/messageHelper');

var _messageHelper2 = _interopRequireDefault(_messageHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GroupController {
  static async createGroup(req, res) {
    const { id } = req.user;
    const { rows } = await _dbConnection2.default.query(_queries2.default.createGroup, [req.body.name.trim(), id]);
    const data = rows[0];
    const user = await _dbConnection2.default.query(_queries2.default.getAuser, [id]);
    const userInsession = user.rows[0];
    await _dbConnection2.default.query(_queries2.default.addmember, [data.id, id, userInsession.email, userInsession.role]);
    return res.status(201).json({
      status: res.statusCode,
      data: [{
        message: 'Group created',
        data
      }]
    });
  }

  static async addMemberToGroup(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.id, 10);
    const { rows } = await _dbConnection2.default.query(_queries2.default.getgroup, [groupid]);
    const group = rows[0];
    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such group exist'
      });
    }
    const user = await _messageHelper2.default.getUser(req.body.email.trim());
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'User does not exit'
      });
    }

    if (group.createdby === id) {
      const output = await _dbConnection2.default.query(_queries2.default.addmember, [groupid, user.id, req.body.email.trim(), req.body.role.trim()]);
      const data = output.rows[0];
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          message: 'Member added',
          data
        }]
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      error: 'authorization denied'
    });
  }

  static async updateGroup(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.id, 10);
    const { rows } = await _dbConnection2.default.query(_queries2.default.getgroup, [groupid]);
    const group = rows[0];
    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such group exist'
      });
    }
    if (group.createdby === id) {
      const output = await _dbConnection2.default.query(_queries2.default.updateGroup, [req.body.name.trim(), groupid]);
      const data = output.rows[0];
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          message: 'Group updated',
          data
        }]
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      data: [{
        status: res.statusCode,
        error: 'authorization denied'
      }]
    });
  }

  static async deleteGroup(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.id, 10);
    const { rows } = await _dbConnection2.default.query(_queries2.default.getgroup, [groupid]);
    const group = rows[0];
    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such group exist'
      });
    }
    if (group.createdby === id) {
      await _dbConnection2.default.query(_queries2.default.deleteGroup, [groupid]);
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          message: 'Group deleted'
        }]
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      data: [{
        status: res.statusCode,
        error: 'authorization denied'
      }]
    });
  }

  static async deleteGroupMember(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.groupid, 10);
    const memberid = parseInt(req.params.id, 10);
    const grp = await _dbConnection2.default.query(_queries2.default.getgroup, [groupid]);
    const { rows } = await _dbConnection2.default.query(_queries2.default.getGroupmember, [groupid, memberid]);
    const groupmem = rows[0];
    const group = grp.rows[0];
    if (!groupmem) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'group member does not exist'
      });
    }

    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'group does not exit'
      });
    }
    if (group.createdby === id) {
      await _dbConnection2.default.query(_queries2.default.deleteMember, [groupid, memberid]);
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          message: 'Member deleted'
        }]
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      data: [{
        status: res.statusCode,
        error: 'authorization denied'
      }]
    });
  }

  static async sendMessageToGroup(req, res) {
    const msgd = {
      subject: req.body.subject.trim(),
      message: req.body.message.trim()
    };
    const { id } = req.user;
    const groupid = parseInt(req.params.groupid, 10);
    const { rows } = await _dbConnection2.default.query(_queries2.default.getgroup, [groupid]);
    const group = rows[0];
    const members = await _dbConnection2.default.query(_queries2.default.getAllGroupMembers, [group.id]);
    const gm = members.rows;
    const groupmem = gm.map(m => m.userid);
    if (groupmem.includes(id)) {
      await gm.forEach(m => {
        _messageHelper2.default.sendToGroup(id, msgd.subject, msgd.message, m.memberemail, m.userid);
      });
      return res.status(201).json({
        status: res.statusCode,
        message: 'message sent'
      });
    }

    return res.status(403).json({
      status: res.statusCode,
      error: 'Authorization denied'
    });
  }

  static async getAllgroups(req, res) {
    const { id } = req.user;
    const { rows } = await _dbConnection2.default.query(_queries2.default.getAllGroups, [id]);
    const data = rows;
    return res.status(200).json({
      status: res.statusCode,
      data: [{
        message: 'All groups retrieved',
        data
      }]
    });
  }
}

exports.default = GroupController;