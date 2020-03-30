let socket=require("./socket");

let users={};

let opt={
    getData : (obj)=>{
        console.log("data through listener : ",obj);
        let objIs = {
            token : obj.token,
            data : [
                {
                    id : 1,
                    userName : "a121"
                }
            ]
        }
        opt.sendMessage(objIs);
    },
    getUsers : ()=>{
        return users;
    },
    showResult : (obj)=>{
        console.log("showResult : ",obj);
    },
    sendMessage : (obj)=>{
        opt.getUsers()[obj.token].emit("message",JSON.stringify(obj.data));
    },
    //not working when i calling this from socket.js , why?
    // sendData : ()=>{
        
    // }
}

module.exports=opt;