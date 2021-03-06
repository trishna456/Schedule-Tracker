const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/contacts', require('./routes/contacts'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.use('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
