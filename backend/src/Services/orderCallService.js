const pool = require("../config/ormconfig.js");
const bcrypt = require("bcryptjs");
const UserRepository = require("../repositories/user.js");
const VerificationRepository = require("../repositories/verification.js");

class ClientController {
  async create(req, res) {
    const { name, phone_number } = req.body;
    const sql_insert = `INSERT INTO order_calls (phone_number,client_name) VALUES ($1,$2)`;
    const values = [phone_number, name];
    pool.query(sql_insert, values, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(400).send("Bad request - " + err.message);
      }
      res.send("Data inserted successfully!");
    });
  }
  async getAll(req, res) {
    // const sql = "SELECT * FROM client";
    // pool.query(sql, [], (err, result) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   // Преобразование даты и времени в нужный часовой пояс
    //   const formattedData = result.rows.map((row) => ({
    //     ...row,
    //     created: row.created
    //       ? new Date(row.created).toLocaleString("en-US", {
    //           timeZone: "Europe/Moscow",
    //         })
    //       : null, // Замените 'Europe/Moscow' на ваш часовой пояс
    //   }));
    //   res.json(formattedData);
    // });
  }
  async getOne(req, res) {
    // const id = req.params.id;
    // const sql = "SELECT * FROM client WHERE id = $1";
    // pool.query(sql, [id], (err, result) => {
    //   if (err) {
    //     console.error(err.message);
    //     return res.status(400).json({ error: "Invalid syntax" }); // Ошибка базы данных
    //   }
    //   if (result.rows.length === 0) {
    //     return res.status(404).json({ error: "User not found" }); // Пользователь не найден
    //   }
    //   // Преобразование даты и времени в нужный часовой пояс
    //   const formattedData = {
    //     ...result.rows[0],
    //     created: result.rows[0].created
    //       ? new Date(result.rows[0].created).toLocaleString("en-US", {
    //           timeZone: "Europe/Moscow",
    //         })
    //       : null, // Замените 'Europe/Moscow' на ваш часовой пояс
    //   };
    //   res.json(formattedData); // Отправка данных пользователя в формате JSON
    // });
  }

  // async deleteAll(req, res) {
  //   try {
  //     const result = await pool.query("SELECT COUNT(*) FROM client");
  //     const rowCount = result.rows[0].count;
  //     if (rowCount === "0") {
  //       return res.status(400).send("Error: Table is empty!");
  //     }
  //     await pool.query("DELETE FROM client");
  //     res.send("All records deleted successfully!");
  //   } catch (err) {
  //     console.error(err.message);
  //     return res
  //       .status(400)
  //       .send("Error: Failed to delete all records! " + err.message);
  //   }
  // }
  async deleteOne(req, res) {
    // const id = req.params.id;
    // try {
    //   const result = await pool.query(`SELECT id FROM client WHERE id = $1`, [
    //     id,
    //   ]);
    //   if (result.rows.length === 0) {
    //     return res.status(400).send("Error: Client not found!");
    //   }
    //   await pool.query(`DELETE FROM client WHERE id = $1`, [id]);
    //   res.send("Your record was deleted successfully!");
    // } catch (err) {
    //   console.error(err.message);
    //   return res
    //     .status(400)
    //     .send("Error: Failed to delete the record! " + err.message);
    // }
  }

  async update(req, res) {
    // const { f_name, l_name, email, created, deleted, phone_number, id } =
    //   req.body;
    // // Проверяем, есть ли клиент с указанным id
    // const sql_exist = `SELECT id FROM client WHERE id = $1`;
    // pool.query(sql_exist, [id], (err, result) => {
    //   if (err) {
    //     console.error(err.message);
    //     return res.status(400).send("Error: Database error! " + err.message);
    //   }
    //   if (result.rows.length === 0) {
    //     return res.status(400).send("Error: Client not found!");
    //   }
    //   // Обновляем запись клиента
    //   if (created || deleted) {
    //     const sql_update = `UPDATE client SET f_name = $1, l_name = $2, email = $3, created = $4, deleted = $5, phone_number = $6 WHERE id = $7`;
    //     pool.query(
    //       sql_update,
    //       [f_name, l_name, email, created, deleted, phone_number, id],
    //       (err, result) => {
    //         if (err) {
    //           console.error(err.message);
    //           return res
    //             .status(400)
    //             .send("Error: Failed to update client record! " + err.message);
    //         }
    //         res.send("Client record updated successfully!");
    //       },
    //     );
    //   } else {
    //     const sql_update = `UPDATE client SET f_name = $1, l_name = $2, email = $3, phone_number = $4 WHERE id = $5`;
    //     pool.query(
    //       sql_update,
    //       [f_name, l_name, email, phone_number, id],
    //       (err, result) => {
    //         if (err) {
    //           console.error(err.message);
    //           return res
    //             .status(400)
    //             .send("Error: Failed to update client record! " + err.message);
    //         }
    //         res.send("Client record updated successfully!");
    //       },
    //     );
    //   }
    // });
  }
}
module.exports = new ClientController();
