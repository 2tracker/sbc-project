const mongoose = require("mongoose");
require('dotenv').config()
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => {
    process.exit(1);
  });