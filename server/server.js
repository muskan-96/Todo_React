const express = require("express");
const app = express();
const cors = require("cors")
const mysql = require("mysql");
app.use(express.json());
app.use(cors());
//connecting the sql
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todotbl" //databasename is todotbl which is shortform of todotable
});
// databasename=todotbl
// columnname=todo_id with autoincrement and primarykey attribut
// columnname=todo (name of the todo)
conn.connect((err) => {
    if (err) {

        return console.log(err.message, "(Database not connected)");

    } else {

        console.log("Database connected Succesfully on XAMPP")

        // Making POST request
        app.post("/AddTodo", (req, res) => {
            const { todo } = req.body;


            const sql = `INSERT INTO tasks (todo) VALUES (?)`;
            conn.query(sql, [todo], (err, results) => {
                if (err) {
                    return res.status(500).send(`404 Server Error/ ${err}`);
                }
                console.log("Data Posted")
                res.json(results);
            });
        });

        //Making GET request from server database
        app.get("/AddTodo/GetTodo", (req, res) => {
            conn.query("SELECT * FROM tasks", (err, results, fields) => {
                res.json({ data: results });
                console.log("data received");
                return
            })
        });

        //Performing DELETE request to server database
        app.delete("/AddTodo/:id", (req, res) => {
            const { id } = req.params;
            const del = `DELETE FROM todotbl.tasks WHERE todo_id = ?`;
            conn.query(del, [id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                console.log(`Item deleted`);
                res.json(results);
            });
        });

    }
});


app.listen(5000, () => {
    console.log("Server started on Port", 5000)
});