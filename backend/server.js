const express = require("express");
const { ConnectDb } = require("./models/db");
const router = require("./routes/auth");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
require("dotenv").config();

const Port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

ConnectDb();

app.use("/api", router);

app.use(cors());
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
