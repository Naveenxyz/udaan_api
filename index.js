var app = require("express")();
const express = require("express");
app.use(express.json());
var cors = require("cors");
var server = require("http").Server(app);
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: false
    })
);
setInterval(() => {
    test()
}, 1000000);
let test = () => console.log(`running on ${PORT}`)
app.get('/test',(req,res)=>{
    res.json({
        message:"welcome to test"
    })
    }
)
app.use('/api',require("./api/flight"))
app.use('/api/users',require("./api/users"))
const PORT = process.env.PORT || 8080;
server.listen(PORT, "0.0.0.0", () =>
    console.log(`server started on port ${[PORT]}`)
);