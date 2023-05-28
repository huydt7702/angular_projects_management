const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");
const employeeRoutes = require("./routes/employee");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

const app = express();

(async () => {
    try {
        await mongoose.connect(config.DATABASE_CONNECT_URL);
        console.log("Connected to the database");
    } catch (err) {
        console.error(err);
    }
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use(`${config.API}/accounts`, employeeRoutes);
app.use(`${config.API}/projects`, projectRoutes);
app.use(`${config.API}/tasks`, taskRoutes);

app.listen(config.PORT, (err) => {
    console.log("Magic happens on port awesome " + config.PORT);
});
