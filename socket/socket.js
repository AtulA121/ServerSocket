const socketIO = require('socket.io'); 
const socketOpt = require('./socketOperations');

let listeners=[];

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
    removeUser : (token)=>{
        delete socketOpt.getUsers()[token];
    },
    addListener : (obj)=>{
        listeners.push(obj);
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
            let token=secureSocket.getToken(socket);
            sock.removeUser(token);
        });
    },
    onMessage : (socket)=>{
        socket.on("message",(data)=>{
            console.log("onMessage : ",data);
            let sockObj=JSON.parse(data);
            // socketOpt.getData(JSON.parse(data));
            listeners.forEach(obj=>{
                if(obj.type === sockObj.data.type){
                    obj.callback(sockObj);
                }
            })
        });
    },
    addUser : (socket)=>{
        let token=secureSocket.getToken(socket);
        socketOpt.getUsers()[token]=socket;
    },
    getToken : (socket)=>{
        return socket.handshake.query.token;
    }
}

sock.addListener({type : 1, callback : socketOpt.getData});
sock.addListener({type : 2, callback : socketOpt.showResult});

module.exports=sock;