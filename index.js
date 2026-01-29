// Server Dependencies and modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Environment Setup
require('dotenv').config();

// Server Setup
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: ['http://localhost:4000'], 
    credentials: true, 
    optionsSuccessStatus: 200 
};


// Database connection
mongoose.set("runValidators", true);
mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.on("error", console.error.bind(console,"connection error"));
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));


//Routes Middleware

const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment")

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = {app,mongoose};