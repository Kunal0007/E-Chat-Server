const express = require('express')
// const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./DB/connect");
var cors = require("cors");
const router = require('./routes/routes')

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

app.use("/api", router);

app.get('/', (req, res) => {
    res.send("PCCOE");
})

const port = process.env.PORT || 3000;
const start = async () => {
    try {
      await connectDB();
      app.listen(port, () => {
           console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
        console.log("error =>", error);
    }
  };
start();