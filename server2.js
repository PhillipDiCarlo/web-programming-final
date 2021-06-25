var http = require('http');  
var url = require('url');  
var fs = require('fs');

//var __dirname = "_FinalSite";
const path = require('path');

var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

const router = express.Router();
server = require('http').createServer(app)
const io = require('socket.io')(server)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})



var smtpTransport = nodemailer.createTransport({
     service: "gmail",
     host: "smtp.gmail.com",
     auth: {
         user: "iantesting7@gmail.com",
         pass: "Extermin8"
     }
});

app.get('/chat/index.html',function(req,res){
    res.sendFile('./chat/index.html', { root: __dirname });
});
app.get('/Default.htm',function(req,res){
    res.sendFile('./Default.htm', { root: __dirname });
});
app.get('/Default.htm',function(req,res){
    res.sendFile('./Default.htm', { root: __dirname });
});
app.get('/',function(req,res){
     res.sendFile('/Default.htm', { root: __dirname });
});
app.get('/home',function(req,res){
    res.sendFile('/Default.htm', { root: __dirname });
});
app.get('/aboutPage/aboutPhillip.html',function(req,res){
    res.sendFile('./aboutPage/aboutPhillip.html', { root: __dirname });
});
app.get('/aboutPage/aboutIan.html',function(req,res){
    res.sendFile('./aboutPage/aboutIan.html', { root: __dirname });
});
app.get('/EmailStuff/pages/contact.html',function(req,res){
    res.sendFile('./pages/contact.html', { root: __dirname });
});
app.get('/pages/contact.html',function(req,res){
    res.sendFile('./pages/contact.html', { root: __dirname });
});
app.get('/index.html',function(req,res){
    res.sendFile('./pages/index.html', { root: __dirname });
});
app.get('/send',function(req,res){
     var mailOptions={
         to : "iantesting7@gmail.com",
         subject : req.query.subject,
         text : req.query.text
     }
     console.log(mailOptions);
     smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
             console.log(error);
         res.end("error");
      }else{
             console.log("Message sent: " + response.message);
         res.end("sent");
          }
});
});







app.listen(3001,function(){
     console.log("Express Started on Port 3001");    
}); 

/*var server = http.createServer(function(request, response) {  
    var path = url.parse(request.url).pathname;  
    switch (path) {  
        case '/':  
           response.writeHead(200, {  
                'Content-Type': 'text/plain'  
            });  
            response.write("This is Test Message.");  
            response.end();  
            break;  
        case '/pages/index.html':  
            fs.readFile(__dirname + path, function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write("error");  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                   });  
                    response.write(data);  
                    response.end();  
               }  
           });  
           break;  
        case '/pages/about.html':  
            fs.readFile(__dirname + path, function(error, data) {  
               if (error) {  
                   response.writeHead(404);  
                   response.write(error);  
                  response.end();  
               } else {  
                   response.writeHead(200, {  
                       'Content-Type': 'text/html'  
                   });  
                   response.write(data);  
                   response.end();  
              }  
           });  
           break;
        case '/pages/contact.html':  
            fs.readFile(__dirname + path, function(error, data) {  
               if (error) {  
                   response.writeHead(404);  
                   response.write(error);  
                  response.end();  
               } else {  
                   response.writeHead(200, {  
                       'Content-Type': 'text/html'  
                   });  
                   response.write(data);  
                   response.end();  
              }  
           });  
           break;   
        default:  
           response.writeHead(404);  
           response.write("opps this doesn't exist - 404");  
            response.end();  
            break;  
    }  
}); 

server.listen(3000);*/


 
