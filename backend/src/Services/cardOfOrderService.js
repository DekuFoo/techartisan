const pool = require("../config/ormconfig");

class CardOfOrderController {
  async create(req, res) {
    const { price, description, ended, client_id, comment, visit } = req.body;
    let { created } = req.body;
    const now = new Date();
    const sql_insert = `INSERT INTO cardoforder (price, description, ended, client_id, created, comment, visit) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const values = [price, description, ended, client_id, now, comment, visit];
    try {
      const result = await pool.query(sql_insert, values);
      const newId = result.rows[0].id;
      res.json({ message: "Data inserted successfully!", id: newId });
    } catch (err) {
      if (err.code === "23505") {
        // Код ошибки 23505 обозначает конфликт уникальности
        return res.status(400).send("Conflict: Data already exists");
      }
      console.error(err.message);
      return res.status(400).send("Bad request - " + err.message);
    }
  }
  async getAll(req, res) {
    const sql = "SELECT * FROM cardoforder";
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      const formattedData = result.rows.map((row) => ({
        ...row,
        created: new Date(row.created).toLocaleString("en-US", {
          timeZone: "Europe/Moscow",
        }),
      }));
      res.json(formattedData);
    });
  }
  async getOneByClientId(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM cardoforder WHERE client_id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).json({ error: "Invalid syntax" });
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Card of order not found" });
      }
      return res.status(200).json(result.rows);
    });
  }

  async getOne(req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM cardoforder WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).json({ error: "Invalid syntax" });
      }
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Card of order not found" });
      }
      // Преобразование даты и времени в нужный часовой пояс
      res.json(result);
    });
  }

  // async deleteAll(req, res) {
  //   const sql_count = "SELECT COUNT(*) FROM cardoforder"; // Подсчитать количество записей в таблице
  //   try {
  //     const result = await pool.query(sql_count);
  //     const rowCount = result.rows[0].count; // Получить количество записей из результата запроса
  //     if (rowCount === 0) {
  //       return res.status(400).send("Error: Table is empty!");
  //     }
  //     const sql_delete = "DELETE FROM cardoforder"; // Удалить все записи из таблицы
  //     await pool.query(sql_delete);
  //     res.send("All records deleted successfully!");
  //   } catch (err) {
  //     console.error(err.message);
  //     return res
  //       .status(400)
  //       .send("Error: Failed to delete records! " + err.message);
  //   }
  // }
  async deleteOne(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      const result = await pool.query(
        `SELECT id FROM cardoforder WHERE id = $1`,
        [id],
      );
      if (result.rows.length === 0) {
        return res.status(400).send("Error: Card of order not found!");
      }
      await pool.query(`DELETE FROM cardoforder WHERE id = $1`, [id]);
      res.send("Your record was deleted successfully!");
    } catch (err) {
      console.error(err.message);
      return res
        .status(400)
        .send("Error: Failed to delete record! " + err.message);
    }
  }
  async update(req, res) {
    const { id, price, description, created, ended, client_id } = req.body;
    const sql_exist = `SELECT id FROM cardoforder WHERE id = $1`;
    pool.query(sql_exist, [id], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).send("Error: Database error! " + err.message);
      }
      if (result.rows.length === 0) {
        return res.status(400).send("Error: Card not found!");
      }
      // Обновляем запись карты
      const sql_update = `UPDATE cardoforder SET price = $2, description = $3, created = $4, ended = $5, client_id = $6 WHERE id = $1`;
      pool.query(
        sql_update,
        [id, price, description, created, ended, client_id],
        (err, result) => {
          if (err) {
            console.error(err.message);
            return res
              .status(400)
              .send("Error: Failed to update card record! " + err.message);
          }
          res.send("Card record updated successfully!");
        },
      );
    });
  }
}
module.exports = new CardOfOrderController();
