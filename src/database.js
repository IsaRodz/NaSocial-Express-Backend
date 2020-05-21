const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongo DB"))
    .catch(error => console.error(error));

// const connection = mongoose.connection;

// connection.once("open", () => console.log("Connected to Mongo DB"));
