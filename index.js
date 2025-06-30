const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const joyasRouter = require('./routes/joyas.routes');

dotenv.config();

const PORT = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', joyasRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


