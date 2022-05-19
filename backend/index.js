const express = require('express');
const cors = require('cors');
require('./utils/mongo_connection')();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: "HW"})
})
app.use('/api/user', require('./routes/user'));

app.listen(5000, () => {
  console.log("Server starting on port no: 5000");
})