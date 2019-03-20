import pool from '../db/dbConnection';
import queries from '../utils/queries';

class GroupController {
  static async createGroup(req, res) {
    const { id } = req.user;
    const { rows } = await pool.query(
      queries.createGroup, [req.body.name.trim(), id],
    );
    const data = rows[0];
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
}

export default GroupController;
