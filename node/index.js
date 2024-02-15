const express = require("express");
const app = express();
const router = require("./routes/index");
const port = 80;

app.use(express.json());

app.listen(port, () => {
    console.log("Listening on port " + port);
});

app.use(router);