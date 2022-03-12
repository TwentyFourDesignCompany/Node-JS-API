const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactRouter = require("./routers/contactRouter");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// db config
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
  });

// api endpoints
app.get("/", (req, res) => {
  res.json({
    message: "hey welcome to 24 design",
  });
});

app.use("/api/v1", contactRouter);

// listners
app.listen(port, () => console.log(`api working on ${port}`));
