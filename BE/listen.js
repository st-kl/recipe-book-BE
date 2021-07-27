const app = require('./db/connection');

const { PORT = 3000 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
