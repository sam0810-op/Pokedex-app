//sam08
//S@marthsam28v

console.log("hello world");

//import react from "react" we will use =>

//const react = require('react');
//const {useState} = require("react");


//commom js module => uses require()

console.log(__dirname); //working dirctory
const os = require("os"); 
console.log(os.userInfo());
console.log(os.arch());
console.log(os.cpus());
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.networkInterfaces());

const fs = require("fs"); //fs is a file system module use for handling files
const path = require('path');


//third party modules => which are not inbuilt modules(whatever u install from outside)

//http module
const http = require('http');

/*to talk with your browser u have to follow certain methods=>
(GET , POST , PUT , DELETE ) */

//we will make a server with http module to talk with 
const server = http.createServer((request,response)=>{
    if(request.url === "/"){
        response.end("this is a HOME page");
    }else if(request.url === "/about"){
        response.end("this is ABOUT page");
    }else if(request.url === '/career'){
    response.end("this is a CAREER job page");
    }else{
        response.end("404 error");
    }
});

//we want to run it on local system port
const PORT = 5000;
//server will be running on port 5000
server.listen(PORT,()=>{
    console.log("server is running on http://localhost:" + PORT);
});
//http://localhost:5000 => API


