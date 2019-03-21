import pool from '../db/dbConnection';
import queries from '../utils/queries';
import HelperUtils from '../utils/messageHelper';

class GroupController {
  static async createGroup(req, res) {
    const { id } = req.user;
    const { rows } = await pool.query(
      queries.createGroup, [req.body.name.trim(), id],
    );
    const data = rows[0];
    const user = await pool.query(queries.getAuser, [id]);
    const userInsession = user.rows[0];
    await pool.query(queries.addmember, [data.id, id, userInsession.email]);
    return res.status(201).json({
      status: res.statusCode,
      data: [
        {
          message: 'Group created',
          data,
        },
      ],
    });
  }

  static async addMemberToGroup(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.id, 10);
    const { rows } = await pool.query(queries.getgroup, [groupid]);
    const group = rows[0];
    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such group exist',
      });
    }
    const user = await HelperUtils.getUser(req.body.email.trim());
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such email exist',
      });
    }
    if (group.createdby === id) {
      const output = await pool.query(
        queries.addmember, [groupid, user.id, req.body.email.trim()],
      );
      const data = output.rows[0];
      return res.status(201).json({
        status: res.statusCode,
        data: [
          {
            message: 'Member added',
            data,
          },
        ],
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      error: 'authorization denied',
    });
  }

  static async updateGroup(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.id, 10);
    const { rows } = await pool.query(queries.getgroup, [groupid]);
    const group = rows[0];
    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such group exist',
      });
    }
    if (group.createdby === id) {
      const output = await pool.query(queries.updateGroup, [req.body.name.trim(), groupid]);
      const data = output.rows[0];
      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            message: 'Group updated',
            data,
          },
        ],
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      data: [
        {
          status: res.statusCode,
          error: 'authorization denied',
        },
      ],
    });
  }

  static async deleteGroup(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.id, 10);
    const { rows } = await pool.query(queries.getgroup, [groupid]);
    const group = rows[0];
    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'no such group exist',
      });
    }
    if (group.createdby === id) {
      await pool.query(queries.deleteGroup, [groupid]);
      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            message: 'Group deleted',
          },
        ],
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      data: [
        {
          status: res.statusCode,
          error: 'authorization denied',
        },
      ],
    });
  }

  static async deleteGroupMember(req, res) {
    const { id } = req.user;
    const groupid = parseInt(req.params.groupid, 10);
    const memberid = parseInt(req.params.id, 10);
    const grp = await pool.query(queries.getgroup, [groupid]);
    const { rows } = await pool.query(queries.getGroupmember, [groupid, memberid]);
    const groupmem = rows[0];
    const group = grp.rows[0];
    if (!groupmem) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'group member does not exist',
      });
    }

    if (!group) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'group does not exit',
      });
    }
    if (group.createdby === id) {
      await pool.query(queries.deleteMember, [groupid, memberid]);
      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            message: 'Member deleted',
          },
        ],
      });
    }
    return res.status(403).json({
      status: res.statusCode,
      data: [
        {
          status: res.statusCode,
          error: 'authorization denied',
        },
      ],
    });
  }
}

export default GroupController;
