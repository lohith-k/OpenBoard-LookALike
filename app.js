const express=require("express");
const socket=require("socket.io");

const app=express();

app.use(express.static("public"));

let server=app.listen(3000,function()
{
    console.log("server started on 3000");
})

let io=socket(server);

io.on("connection",(socket)=>
{
    console.log("Made socket connection");
    socket.on("beginpath",(data)=>
	{
        io.sockets.emit("beginpath",data);
	})
    socket.on("drawpath",(data)=>
	{
        io.sockets.emit("drawpath",data);
	})
    socket.on("trackobj",(data)=>
	{
        console.log(data);
        io.sockets.emit("trackobj",data);
	})
})