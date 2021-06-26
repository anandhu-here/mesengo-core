const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routes/api/users");
const messages = require("./routes/api/messages");

const app =  express();

const port = process.env.PORT || 5000;

const server = app.listen(port, ()=>{
    console.log('server running')
})
const io = require("socket.io")(server);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json());

app.use(cors());

const db = process.env.MONGO_URI || 'mongodb://localhost:27017/mesengo'

mongoose.connect(db,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongo connected')
}).catch(e=>console.log(e))

app.use(function (req, res, next) {
    req.io = io;
    next();
  });

app.use("/api/users", users);
app.use("/api/messages", messages);
