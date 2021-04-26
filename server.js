const express = require("express");
const countriesRouter = require("./router/router");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.use("/v1", countriesRouter);

app.listen(PORT, () => console.log(`Your app is listening on PORT ${PORT}`));
