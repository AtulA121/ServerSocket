const socketIO = require('socket.io'); 
const socketOpt = require('./socketOperations'); 
let jsonWebToken=require("jsonwebtoken");

let users={};

let sock={
    createConnection : (server)=>{
        let io=socketIO(server);
        io.of("/event").on("connection",(socket)=>{
            console.log("connection opened : ");
            secureSocket.onOpen(socket);
            secureSocket.onClose(socket);
            secureSocket.onMessage(socket);
        });
    },
    removeUser : (userId)=>{
        delete users[userId];
    }
}

let secureSocket={
    onOpen : (socket)=>{
        secureSocket.addUser(socket);
        socket.emit("open","opened : ");
    },
    onClose : (socket)=>{
        socket.on("disconnect",(data)=>{
            console.log("onClose : ",socket.handshake.query.token);
        });
    },
    onMessage : (socket)=>{
        socket.on("message",(data)=>{
            console.log("onMessage : ",data);
            socketOpt.getData(JSON.parse(data));
        });
    },
    addUser : (socket)=>{
        let token=socket.handshake.query.token;
        socketOpt.getUsers()[token]=socket;
    }
}

module.exports=sock;