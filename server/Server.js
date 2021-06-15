const express = require('express');
const app = express();
const cors = require('cors');

let corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));


// convert json file use express
app.use(express.json());

// link router file(auth) from router folder
app.use(require("./router/auth"));

app.listen(5000, () => {
    console.log('Server is running on 5000 port.')
})