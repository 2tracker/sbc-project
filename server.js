const express = require('express');
const Router = require('./router/indexRouter')
const app = express();
const db = require('./database/DB')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',Router)
const PORT = process.env.PORT || 5151;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});