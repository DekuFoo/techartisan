const pool = require("../config/ormconfig");

class StaffController {
  async create(req, res) {
    let { id, f_name, l_name, login, pass, hired, dismissed } = req.body;
    const sql_insert = `INSERT INTO staff (id, f_name, l_name, login, pass, hired, dismissed) VALUES
        ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [id, f_name, l_name, login, pass, hired, dismissed];
    pool.query(sql_insert, values, (err, result) => {
      if (err) {
        if (err.code === "23505") {
          // код ошибки 23505 обозначает конфликт уникальности
          return res.status(400).send("Conflict: Data already exists");
        }
        console.error(err.message);
        return res.status(400).send("Bad request - " + err.message);
      }
      res.send("Data inserted successfully!");
    });
  }

  async getAll(req, res) {
    const sql = "SELECT * FROM staff";
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      const formattedData = result.rows.map((row) => ({
        ...row,
        hired: row.hired
          ? new Date(row.hired).toLocaleString("en-US", {
              timeZone: "Europe/Moscow",
            })
          : null, // Замените 'Europe/Moscow' на ваш часовой пояс
      }));
      res.json(formattedData);
    });
  }

  async getOne(req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM staff WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).send("Error: Database error!");
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Error: Staff member not found!");
      }
      const formattedData = {
        ...result.rows[0],
        hired: result.rows[0].hired
          ? new Date(result.rows[0].hired).toLocaleString("en-US", {
              timeZone: "Europe/Moscow",
            })
          : null, // Замените 'Europe/Moscow' на ваш часовой пояс
      };
      res.json(formattedData);
    });
  }

  async update(req, res) {
    const { id, f_name, l_name, login, pass } = req.body;
    let { hired, dismissed } = req.body;
    const sql_exist = `SELECT id FROM staff WHERE id = $1`;
    console.log(hired, dismissed);
    pool.query(sql_exist, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).send("Error: Database error! " + err.message);
      }
      if (result.rows.length === 0) {
        return res.status(404).send("Error: Staff member not found!");
      }
      const sql_update = `UPDATE staff SET f_name = $2, l_name = $3, login = $4, pass = $5, hired = $6, dismissed = $7 WHERE id = $1`;
      pool.query(
        sql_update,
        [id, f_name, l_name, login, pass, hired, dismissed],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res
              .status(400)
              .send("Error: Failed to update staff member! " + err.message);
          }
          res.send("Staff member updated successfully!");
        },
      );
    });
  }

  async deleteOne(req, res) {
    const id = req.params.id;
    try {
      const result = await pool.query(`SELECT id FROM staff WHERE id = $1`, [
        id,
      ]);
      if (result.rows.length === 0) {
        return res.status(404).send("Error: Staff member not found!");
      }
      await pool.query(`DELETE FROM staff WHERE id = $1`, [id]);
      res.send("Staff member deleted successfully!");
    } catch (err) {
      console.error(err.message);
      return res
        .status(400)
        .send("Error: Failed to delete staff member! " + err.message);
    }
  }

  async deleteAll(req, res) {
    try {
      const result = await pool.query("SELECT COUNT(*) FROM staff");
      const rowCount = result.rows[0].count;
      if (rowCount === 0) {
        return res.status(400).send("Error: Table is empty!");
      }
      await pool.query("DELETE FROM staff");
      res.send("All records deleted successfully!");
    } catch (err) {
      console.error(err.message);
      return res
        .status(400)
        .send("Error: Failed to delete all records! " + err.message);
    }
  }
}

module.exports = new StaffController();
