const { app } = require("./app");
const { PORT } = require("./config");

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`Listening on port ${PORT}`);
});
