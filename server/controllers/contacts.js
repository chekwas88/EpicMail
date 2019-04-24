import pool from '../db/dbConnection';
import queries from '../utils/queries';

class ContactController {
  static async getContacts(req, res) {
    const { id } = req.user;
    const { rows } = await pool.query(queries.getContact, [id]);
    const contacts = rows;
    if (contacts.length === 0) {
      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            message: 'You have no contacts',
          },
        ],
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      data: [
        {
          message: 'contacts retrieved',
          contacts,
        },
      ],
    });
  }
}

export default ContactController;
