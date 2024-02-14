const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const uploadFileRoutes = require('./routes/uploadFileRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', uploadFileRoutes);

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
  console.log('Server is active on port: ', port);
})