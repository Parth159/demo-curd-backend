const config = require("./config.js");
const express = require("express");
const app = express();
const cors = require("cors");

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.set("view engine", "ejs");

app.use(cors({ origin: "*" }));

app.use(express.json({ type: "application/json", limit: "10mb" }));

app.get("/", [], (req, res) =>
  res.send("<h1>Something cool is coming soon</h1>")
);

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.listen(process.env.PORT, () =>
  console.warn(
    `${process.env.NODE_ENV} Server Started on port:  ${process.env.PORT}`
  )
);
