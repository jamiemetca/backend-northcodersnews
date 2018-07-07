const { app } = require("./app");
const { PORT } = require("process.env.PORT");

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`Listening on port ${PORT}`);
});
