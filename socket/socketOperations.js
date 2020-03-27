let socket=require("./socket");

let users={};

let opt={
    getData : (obj)=>{
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
    sendMessage : (obj)=>{
        opt.getUsers()[obj.token].emit("message",JSON.stringify(obj.data));
    }
}

module.exports=opt;