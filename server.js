const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'hi all' }));

//Define routes
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
