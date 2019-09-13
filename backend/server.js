const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//setting up environment variables in dotenv file
require("dotenv").config();

//creating express server and up the port to run upon
const app = express();
const port = process.env.PORT || 5000;

//middleware
//it will be parsing json as server will be receiving and sending json
app.use(cors());
app.use(express.json());

//uri is our database uri which we can get from mongoDb dashboard saved in .env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

//starting or listening of the server on port mentioned
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
