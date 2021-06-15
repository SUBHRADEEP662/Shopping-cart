const dotenv = require('dotenv')
const mongoose = require('mongoose');


// dotenv path setup
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(() => {
    console.log("Connected to MongoDB Successfully.");
}).catch((err) => {
    console.log(err);
});