const { app } = require("./app");
const PORT = process.env.PORT || 9090;

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`Listening on port ${PORT}`);
});
